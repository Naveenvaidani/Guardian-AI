# Guardian AI – Research & Analytics System

A multi-model AI pipeline for content moderation, trend intelligence, anomaly detection, forecasting, graph analysis, and explainability.

---

## Project Structure

```
ai_research_and_analytics/
├── guardian_ai_orchestrator.py     # Main entry point – ties all services together
├── model1unifiedrep.py             # Model 1: Unified Representation & Search (CLIP + BERT + FAISS)
├── model2topicintelligence.py      # Model 2: Topic & Semantic Intelligence (HDBSCAN + T5)
├── model3anomalydetection.py       # Model 3: Anomaly & Risk Detection (Autoencoder + Isolation Forest)
├── model4predictionforecasting.py  # Model 4: Predictive Forecasting (Temporal Fusion Transformer)
├── model5graphintelligence.py      # Model 5: Graph & Network Intelligence (GraphSAGE)
├── model6ragexplainability.py      # Model 6: Insight Generation & Explainability (RAG + SHAP)
├── requirements.txt                # All Python dependencies
└── README.md                       # This file
```

---

## Architecture Overview

```
[New Content Event]
        │
        ▼
  Model 1 – Unified Rep     →  Vector DB (FAISS)
  (CLIP + BERT embeddings)  →  Data Lake (metadata)
        │
        ├──▶  Model 3 – Anomaly Detection  →  Kafka: anomaly_alerts
        │     (Autoencoder + IsolationForest)
        │
        └──▶  Model 5 – Graph Intelligence →  Kafka: coordination_alerts
              (GraphSAGE bot/network checks)

[Scheduled Batch Jobs]
  Model 2 – Topic Intelligence  →  Kafka: new_trends
  Model 4 – Forecasting (TFT)   →  Data Lake: model_forecasts

[Analyst Query]
  Model 6 – RAG Explainability  ←  reads Kafka + Data Lake + Vector DB
  (LangChain + DistilBERT Q&A)  →  Natural language answers
```

---

## Setup

### Requirements
- Python 3.10 or higher
- pip

### Install dependencies

```bash
pip install -r requirements.txt
```

> **Note on torch-geometric:** Installation depends on your CUDA version.  
> Follow the official guide: https://pytorch-geometric.readthedocs.io/en/latest/install/installation.html

### Run the orchestrator (demo simulation)

```bash
python guardian_ai_orchestrator.py
```

### Run individual models (standalone demos)

Each model file can also be run on its own to test that component:

```bash
python model1unifiedrep.py       # Tests CLIP + BERT + FAISS
python model2topicintelligence.py
python model3anomalydetection.py
python model4predictionforecasting.py
python model5graphintelligence.py
python model6ragexplainability.py
```

> **Note:** Model files will download Hugging Face model weights on first run.  
> Set `HF_HOME` to control the cache directory (default: `./hf_cache`).

---

## Current Status: Proof of Concept

The orchestrator currently runs on **simulated infrastructure**:

| Component | Current (PoC) | Production Replacement |
|-----------|--------------|----------------------|
| Message queue | `MockKafkaBus` (in-memory) | Apache Kafka |
| Data storage | `MockDataLake` (Python dict) | AWS S3 + Parquet |
| Vector search | `MockVectorDB` (random) | FAISS / Milvus |
| Embeddings | `np.random.rand(512)` | Real CLIP / BERT inference |
| Forecasting | `np.random.randint()` | Trained TFT model |

---

## REST API (Web Integration)

The system is wrapped in a **FastAPI** server (`app.py`). Start it with:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

Then open **http://localhost:8000/docs** for the full interactive Swagger UI — no extra setup needed.

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/api/stats` | System overview (content count, alert counts) |
| `POST` | `/api/content/ingest` | Ingest content — runs Models 1 + 3 + 5 |
| `POST` | `/api/behavior/check` | Check a single user for anomalies (Model 3) |
| `GET` | `/api/anomalies` | Get all anomaly alerts |
| `GET` | `/api/coordination` | Get all bot / coordination alerts |
| `POST` | `/api/trends/analyze` | Trigger trend clustering (Model 2) |
| `GET` | `/api/trends` | Get all trend alerts |
| `POST` | `/api/forecast/generate` | Generate a new 7-day forecast (Model 4) |
| `GET` | `/api/forecast/latest` | Get the latest forecast |
| `POST` | `/api/query` | Ask the RAG system a natural-language question (Model 6) |

### Quick test (after starting the server)

```bash
# Ingest a suspicious post
curl -X POST http://localhost:8000/api/content/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Buy crypto now!!!",
    "user_id": "user_123",
    "user_ip": "10.0.0.5",
    "user_features": [100, 0, 0.05, 0]
  }'

# Ask the RAG system a question
curl -X POST http://localhost:8000/api/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Did we have any anomaly spikes today?"}'
```

---

## Known Limitations / Next Steps

1. Individual model files (`model1–6`) are currently standalone demos; they are not yet imported by the orchestrator.
2. No authentication or rate limiting is implemented.
3. Bot IP list in Model 5 is hardcoded — should be loaded from a dynamic database.
4. Hugging Face models are loaded fresh each call — should be loaded once at server startup.
