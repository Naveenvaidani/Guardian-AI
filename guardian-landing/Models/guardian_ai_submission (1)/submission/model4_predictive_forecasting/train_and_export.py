import numpy as np
import pandas as pd
import torch

import lightning.pytorch as pl
from pytorch_forecasting import TemporalFusionTransformer, TimeSeriesDataSet
from pytorch_forecasting.data import GroupNormalizer
from pytorch_forecasting.metrics import QuantileLoss

np.random.seed(42)
torch.manual_seed(42)

def get_mock_data():
    data = []
    for group in ['group_A', 'group_B']:
        for time_idx in range(100):
            base_load = 50 + (time_idx * 0.5) + (10 * np.sin(time_idx / 7))
            if group == 'group_B':
                base_load *= 1.5
            mod_load = base_load + np.random.randn() * 5
            data.append({"group": group, "time_idx": time_idx, "load": mod_load})
    df = pd.DataFrame(data)
    df["group"] = df["group"].astype(str).astype("category")
    return df

if __name__ == "__main__":
    df = get_mock_data()
    df.to_csv("dataset/synthetic_load_timeseries.csv", index=False)
    print("Saved dataset/synthetic_load_timeseries.csv")

    max_prediction_length = 10
    max_encoder_length = 30
    training_cutoff = df["time_idx"].max() - max_prediction_length

    training_data = TimeSeriesDataSet(
        df[lambda x: x.time_idx <= training_cutoff],
        time_idx="time_idx",
        target="load",
        group_ids=["group"],
        min_encoder_length=max_encoder_length // 2,
        max_encoder_length=max_encoder_length,
        min_prediction_length=1,
        max_prediction_length=max_prediction_length,
        static_categoricals=["group"],
        time_varying_known_reals=["time_idx"],
        time_varying_unknown_reals=["load"],
        target_normalizer=GroupNormalizer(groups=["group"]),
        add_relative_time_idx=True,
        add_target_scales=True,
        add_encoder_length=True,
    )

    validation_data = TimeSeriesDataSet.from_dataset(training_data, df, predict=True, stop_randomization=True)

    batch_size = 16
    train_dataloader = training_data.to_dataloader(train=True, batch_size=batch_size, num_workers=0)
    val_dataloader = validation_data.to_dataloader(train=False, batch_size=batch_size, num_workers=0)

    tft = TemporalFusionTransformer.from_dataset(
        training_data,
        learning_rate=0.03,
        hidden_size=8,
        attention_head_size=1,
        dropout=0.1,
        hidden_continuous_size=4,
        loss=QuantileLoss(),
        optimizer="adam",
    )

    trainer = pl.Trainer(
        max_epochs=3,
        accelerator="cpu",
        enable_progress_bar=True,
        logger=False,
        enable_checkpointing=False,
    )
    trainer.fit(tft, train_dataloaders=train_dataloader, val_dataloaders=val_dataloader)

    torch.save(tft.state_dict(), "artifacts/tft_state_dict.pth")
    trainer.save_checkpoint("artifacts/tft_checkpoint.ckpt")
    print("Saved artifacts/tft_state_dict.pth and artifacts/tft_checkpoint.ckpt")
