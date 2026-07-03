# Model 3 — Anomaly & Risk Detection

## What this model is
Flags suspicious accounts/content using two genuinely **custom-trained**
models on behavioral features `[post_count, report_count, like_ratio, comment_count]`:
- A small Autoencoder (PyTorch) — flags by reconstruction error.
- An Isolation Forest (scikit-learn) — flags by isolation score.

## Training data note
The dataset is **synthetically generated** (`np.random`-based, seeded for
reproducibility) to simulate "normal" vs. "bot-like/anomalous" behavior
patterns.

## Files
- `artifacts/autoencoder.pth` — trained PyTorch Autoencoder weights.
- `artifacts/isolation_forest.pkl` — trained scikit-learn IsolationForest (joblib).
- `artifacts/scaler.pkl` — fitted StandardScaler (must be applied to new inputs).
- `inference.py` — loads all three artifacts and scores new records.
- `train_and_export.py` — regenerates the dataset + retrains + re-exports
  the artifacts above (for reproducibility).
- `dataset/anomaly_detection_dataset.csv` — the exact data used to fit the
  scaler, autoencoder, and isolation forest (includes ground-truth labels
  for evaluation).
- `requirements.txt` — pinned dependency versions.

## Run
```
pip install -r requirements.txt
python inference.py
```
