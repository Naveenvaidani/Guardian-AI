# Model 4 — Predictive Action Forecasting (Temporal Fusion Transformer)

## What this model is
Forecasts future load/activity per group using a genuinely **custom-trained**
Temporal Fusion Transformer (`pytorch-forecasting`), trained for 3 epochs on
a 2-group synthetic time series.

## Training data note
The dataset is **synthetically generated** — two seasonal/trending load
series (`group_A`, `group_B`) with injected noise — not real platform
telemetry. The 3-epoch run here is enough to prove the pipeline trains and
exports correctly end-to-end; before production use, retrain on real
historical metrics with a longer schedule .

## Files
- `artifacts/tft_checkpoint.ckpt` — full PyTorch Lightning checkpoint (use this for inference).
- `artifacts/tft_state_dict.pth` — raw model weights only.
- `inference.py` — loads the checkpoint and forecasts the next 10 steps per group.
- `train_and_export.py` — regenerates the dataset + retrains + re-exports
  the artifacts above (for reproducibility).
- `dataset/synthetic_load_timeseries.csv` — the exact data used for training/validation.
- `requirements.txt` — pinned dependency versions.

## Run
```
pip install -r requirements.txt
python inference.py
```
