# Guardian AI — Submission Package

This package responds for, per model: serialized model artifacts, an inference script, pinned dependencies,
and the dataset used for training/validation.

## Quick status table

| Model | Custom-trained? | Artifact provided | Dataset provided |
|---|---|---|---|
| 1. Unified Representation & Search | No — frozen pretrained CLIP + BERT | Pinned checkpoint names (see model README) | Sample doc corpus |
| 2. Topic & Semantic Intelligence | No — frozen pretrained DistilBERT + T5 | Pinned checkpoint names | Sample doc corpus |
| 3. Anomaly & Risk Detection | **Yes** | `autoencoder.pth`, `isolation_forest.pkl`, `scaler.pkl` | `anomaly_detection_dataset.csv` (synthetic) |
| 4. Predictive Action Forecasting | **Yes** | `tft_checkpoint.ckpt`, `tft_state_dict.pth` | `synthetic_load_timeseries.csv` (synthetic) |
| 5. Graph & Network Intelligence | **Yes** | `graphsage_model.pth` | `graph_data.json` (synthetic toy graph) |
| 6. Insight Generation & Explainability | No — frozen pretrained MiniLM + DistilBERT-QA | Pinned checkpoint names | Sample report corpus |

## Structure
```
guardian_ai_submission/
  guardian_ai_orchestrator.py   <- runs all 6 services together end-to-end
  requirements.txt              <- combined dependencies for the orchestrator
  model1_unified_representation/
  model2_topic_intelligence/
  model3_anomaly_detection/
  model4_predictive_forecasting/
  model5_graph_intelligence/
  model6_rag_explainability/
```
Each model folder is self-contained: `inference.py`, `requirements.txt`,
`dataset/`, `README.md`, and `artifacts/` where applicable.

## Running the full system

`guardian_ai_orchestrator.py` is the updated version of the original
orchestrator script — same Kafka/DataLake/VectorDB simulation and the same
event-driven demo flow, but every model service now calls the **real**
inference code in the folders above instead of `np.random` placeholders.

```
pip install -r requirements.txt
python guardian_ai_orchestrator.py
```

Notes:
- Models 3, 4, and 5 (the custom-trained ones) work fully offline using the
  bundled artifacts.
- Models 1, 2, and 6 need a one-time internet connection on first run to
  download their pretrained Hugging Face checkpoints into `./hf_cache`
  inside each model folder (see each model's README). If a checkpoint or an
  optional dependency isn't available, that service prints a clear warning
  and the orchestrator keeps running the rest of the pipeline — it won't
  crash the whole demo.
- Kafka, the S3 data lake, and the vector DB are still simulated in-memory.
  That's deployment infrastructure, not a model, so it's out of scope for
  this package — swap in real Kafka/S3/Milvus clients at deploy time.
