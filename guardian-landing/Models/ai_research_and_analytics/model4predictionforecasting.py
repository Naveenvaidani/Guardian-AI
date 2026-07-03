
import numpy as np
import pandas as pd
import torch

try:
    import pytorch_lightning as pl
    from pytorch_forecasting import TemporalFusionTransformer, TimeSeriesDataSet
    from pytorch_forecasting.data import GroupNormalizer
    from pytorch_forecasting.metrics import QuantileLoss
except ImportError:
    print("Pytorch-Forecasting not found. Please run: pip install pytorch-forecasting")
    exit()


def get_mock_data():
    
    print("\n[Phase 1: Generating Mock Time Series Data]")
    data = []
    for group in ['group_A', 'group_B']:
        for time_idx in range(100):
           
            base_load = 50 + (time_idx * 0.5) + (10 * np.sin(time_idx / 7))
            if group == 'group_B':
                base_load *= 1.5 
                
            
            mod_load = base_load + np.random.randn() * 5
            
          
            day_of_week = time_idx % 7
            
            data.append({
                "time_idx": time_idx,
                "group_id": group,
                "mod_load": mod_load,
                "day_of_week": day_of_week
            })
    
    df = pd.DataFrame(data)
    
    
    df["day_of_week"] = df["day_of_week"].astype(str).astype("category")
    df["group_id"] = df["group_id"].astype(str).astype("category")
    df["mod_load"] = df["mod_load"].astype(float)
    df["time_idx"] = df["time_idx"].astype(int)
    
    print(f"Generated {len(df)} rows of data.")
    return df


if __name__ == "__main__":
    print("--- Model 4: Predictive Forecasting (TFT) ---")
    
    df = get_mock_data()
    
   
    print("\n[Phase 2: Creating TimeSeriesDataSet]")
    
    
    max_prediction_length = 10 
    max_encoder_length = 30    
    training_cutoff = df["time_idx"].max() - max_prediction_length
    
    training_data = TimeSeriesDataSet(
        df[lambda x: x.time_idx <= training_cutoff],
        time_idx="time_idx",
        target="mod_load",
        group_ids=["group_id"],
       
        
        target_normalizer=GroupNormalizer(groups=["group_id"], transformation="softplus"),
        max_encoder_length=max_encoder_length,
        max_prediction_length=max_prediction_length,
        time_varying_known_categoricals=["day_of_week"],
        
        static_categoricals=["group_id"],
    )
    
    
    validation_data = TimeSeriesDataSet.from_dataset(
        training_data, df, predict=True, stop_randomization=True
    )
    
   
    batch_size = 16
    train_dataloader = training_data.to_dataloader(batch_size=batch_size, num_workers=0)
    val_dataloader = validation_data.to_dataloader(batch_size=batch_size * 2, num_workers=0)
    print("Data loaders created.")

    print("\n[Phase 3: Training Temporal Fusion Transformer]")
    print("This is a simplified training run. A real run would take much longer.")
    

    tft = TemporalFusionTransformer.from_dataset(
        training_data,
        learning_rate=0.03,
        hidden_size=16,
        attention_head_size=1,
        dropout=0.1,
        hidden_continuous_size=8,
        output_size=7,  
        loss=QuantileLoss(),
        reduce_on_plateau_patience=4,
    )
    
    print(f"Number of parameters in model: {tft.size()}\n")
    
   
    
    try:
       
        trainer = pl.Trainer(
            fast_dev_run=True, 
            logger=False,
            enable_checkpointing=False
        )
        
        trainer.fit(
            tft,
            train_dataloaders=train_dataloader,
            val_dataloaders=val_dataloader
        )
        print("\nConceptual training run (1 batch) complete.")
        
        print("\n[Phase 4: Generating Predictions]")
     
        raw_predictions = tft.predict(val_dataloader, return_index=True)
        
        print(f"Predictions generated for group: {raw_predictions.index.group_id.unique().tolist()}")
        print(f"Prediction output shape: {raw_predictions.output.shape}")
        
        
    except Exception as e:
        print(f"\nNOTE: Could not train model (likely in a CPU-only env). Error: {e}")
        print("This script demonstrates the *setup* of the TFT model.")