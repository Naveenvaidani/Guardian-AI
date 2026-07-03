

import pandas as pd
import torch
from pytorch_forecasting import TemporalFusionTransformer

CHECKPOINT_PATH = "artifacts/tft_checkpoint.ckpt"
DATASET_PATH = "dataset/synthetic_load_timeseries.csv"

MAX_ENCODER_LENGTH = 30
MAX_PREDICTION_LENGTH = 10


def load_model():
    return TemporalFusionTransformer.load_from_checkpoint(CHECKPOINT_PATH, map_location="cpu")


def forecast(df: pd.DataFrame, model: TemporalFusionTransformer = None):
    """
    df: a DataFrame with columns [group, time_idx, load] containing at least
        MAX_ENCODER_LENGTH rows of recent history per group.
    Returns the model's quantile forecasts for the next MAX_PREDICTION_LENGTH steps.
    """
    if model is None:
        model = load_model()

    df = df.copy()
    df["group"] = df["group"].astype(str).astype("category")

    predictions = model.predict(df, mode="quantiles", trainer_kwargs=dict(accelerator="cpu"))
    return predictions


if __name__ == "__main__":
    df = pd.read_csv(DATASET_PATH)
    model = load_model()
    preds = forecast(df, model)
    print("Forecast tensor shape (groups, prediction_steps, quantiles):", preds.shape)
    print(preds)
