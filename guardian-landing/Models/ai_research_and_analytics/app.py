"""
Guardian AI Analytics — REST API
=================================
Start the server:
    uvicorn app:app --reload --host 0.0.0.0 --port 8000

Interactive docs:
    http://localhost:8000/docs         (Swagger UI)
    http://localhost:8000/redoc        (ReDoc)
"""

import uuid
import time
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ── Import services from the orchestrator ────────────────────────────────────
from guardian_ai_orchestrator import (
    MockKafkaBus,
    MockDataLake,
    MockVectorDB,
    Model1_UnifiedService,
    Model2_TopicService,
    Model3_AnomalyService,
    Model4_ForecastingService,
    Model5_GraphService,
    Model6_RAGService,
)

# ── App setup ─────────────────────────────────────────────────────────────────
app = FastAPI(
    title="Guardian AI Analytics API",
    description=(
        "Multi-model AI pipeline for content moderation, trend intelligence, "
        "anomaly detection, forecasting, graph analysis, and explainability."
    ),
    version="1.0.0",
)

# Allow all origins so the website front-end can call this API freely.
# Restrict allow_origins to your actual domain in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Infrastructure (initialised once at startup) ──────────────────────────────
kafka_bus  = MockKafkaBus()
data_lake  = MockDataLake()
vector_db  = MockVectorDB()

# ── Services ──────────────────────────────────────────────────────────────────
svc1_unified   = Model1_UnifiedService(vector_db, data_lake)
svc2_topic     = Model2_TopicService(kafka_bus)
svc3_anomaly   = Model3_AnomalyService(kafka_bus)
svc4_forecast  = Model4_ForecastingService(data_lake)
svc5_graph     = Model5_GraphService(kafka_bus)
svc6_rag       = Model6_RAGService(kafka_bus, data_lake, vector_db)

print("\n[API] All services ready. Server is up.\n")


# ── Request / Response schemas ────────────────────────────────────────────────
class ContentIngestionRequest(BaseModel):
    text: str = Field(..., example="Check out this amazing deal!!")
    image_url: Optional[str] = Field(None, example="https://example.com/img.jpg")
    user_id: str = Field(..., example="user_abc123")
    user_ip: str = Field(..., example="203.0.113.42")
    user_features: list[float] = Field(
        ...,
        min_length=4,
        max_length=4,
        description="[post_count, report_count, like_ratio, comment_count]",
        example=[12, 1, 0.75, 4],
    )

class BehaviorCheckRequest(BaseModel):
    user_id: str = Field(..., example="user_abc123")
    user_features: list[float] = Field(
        ...,
        min_length=4,
        max_length=4,
        description="[post_count, report_count, like_ratio, comment_count]",
        example=[100, 0, 0.05, 0],
    )

class QueryRequest(BaseModel):
    query: str = Field(..., example="Did we have any anomaly spikes today?")


# ═════════════════════════════════════════════════════════════════════════════
# ROUTES
# ═════════════════════════════════════════════════════════════════════════════

# ── Health ────────────────────────────────────────────────────────────────────
@app.get("/", tags=["Health"], summary="Health check")
def health():
    """Returns service status and current timestamp."""
    return {
        "status": "ok",
        "service": "Guardian AI Analytics API",
        "timestamp": time.time(),
    }


# ── System Stats ──────────────────────────────────────────────────────────────
@app.get("/api/stats", tags=["Stats"], summary="System overview")
def get_stats():
    """
    Returns a live snapshot of the whole system:
    content indexed, alert counts, forecasts generated.
    """
    return {
        "content_items_indexed": len(vector_db.vectors),
        "anomaly_alerts":        len(kafka_bus.get_messages("anomaly_alerts")),
        "coordination_alerts":   len(kafka_bus.get_messages("coordination_alerts")),
        "trend_alerts":          len(kafka_bus.get_messages("new_trends")),
        "forecasts_generated":   len(data_lake.read_table("model_forecasts")),
    }


# ── Content Ingestion (Models 1 + 3 + 5) ─────────────────────────────────────
@app.post("/api/content/ingest", tags=["Content"], summary="Ingest new content")
def ingest_content(req: ContentIngestionRequest):
    """
    Full ingestion pipeline for a new piece of content:
    1. **Model 1** — generates an embedding and stores it in the vector DB.
    2. **Model 3** — checks whether the user's behaviour looks anomalous.
    3. **Model 5** — checks whether the user's IP is linked to a bot network.

    Returns the new `content_id`, anomaly flag, and bot-network flag.
    """
    content_id = str(uuid.uuid4())

    # Model 1 – embed + store
    embedding = svc1_unified.process_content(content_id, req.text, req.image_url)

    # Model 3 – anomaly check
    is_anomaly = svc3_anomaly.check_behavior(req.user_id, req.user_features)

    # Model 5 – graph / bot-network check
    is_bot_network = svc5_graph.check_connection(req.user_id, content_id, req.user_ip)

    return {
        "content_id":           content_id,
        "user_id":              req.user_id,
        "embedding_dimensions": len(embedding),
        "anomaly_detected":     is_anomaly,
        "bot_network_detected": is_bot_network,
        "flags": {
            "review_recommended": is_anomaly or is_bot_network,
        },
    }


# ── Behaviour Check (Model 3 only) ────────────────────────────────────────────
@app.post("/api/behavior/check", tags=["Anomaly"], summary="Check a single user's behaviour")
def check_behavior(req: BehaviorCheckRequest):
    """
    Runs only **Model 3** (Isolation Forest) to score a user's
    behaviour without processing any content.
    Useful for checking existing users on login or profile-update events.
    """
    is_anomaly = svc3_anomaly.check_behavior(req.user_id, req.user_features)
    return {
        "user_id":          req.user_id,
        "anomaly_detected": is_anomaly,
    }


# ── Anomaly Alerts (Model 3 output) ───────────────────────────────────────────
@app.get("/api/anomalies", tags=["Anomaly"], summary="Get all anomaly alerts")
def get_anomalies():
    """Returns every behavioural anomaly alert published by Model 3."""
    raw = kafka_bus.get_messages("anomaly_alerts")
    return {
        "count":  len(raw),
        "alerts": [item["message"] for item in raw],
    }


# ── Coordination / Bot Alerts (Model 5 output) ───────────────────────────────
@app.get("/api/coordination", tags=["Graph"], summary="Get bot / coordination alerts")
def get_coordination():
    """Returns every coordinated-behaviour alert published by Model 5."""
    raw = kafka_bus.get_messages("coordination_alerts")
    return {
        "count":  len(raw),
        "alerts": [item["message"] for item in raw],
    }


# ── Trend Analysis (Model 2) ──────────────────────────────────────────────────
@app.post("/api/trends/analyze", tags=["Trends"], summary="Run trend analysis")
def analyze_trends():
    """
    Triggers **Model 2** (HDBSCAN clustering) over all currently indexed
    content vectors to detect emerging topics.
    Publishes results to the `new_trends` Kafka topic.

    Call this on a schedule (e.g. every hour) in production.
    """
    all_vectors = list(vector_db.vectors.values())
    if not all_vectors:
        raise HTTPException(
            status_code=400,
            detail="No content has been ingested yet. Call POST /api/content/ingest first.",
        )
    svc2_topic.find_new_trends(all_vectors)
    return {
        "message":       "Trend analysis complete.",
        "vectors_used":  len(all_vectors),
    }


@app.get("/api/trends", tags=["Trends"], summary="Get trend alerts")
def get_trends():
    """Returns every emerging-topic alert published by Model 2."""
    raw = kafka_bus.get_messages("new_trends")
    return {
        "count":  len(raw),
        "trends": [item["message"] for item in raw],
    }


# ── Forecast (Model 4) ────────────────────────────────────────────────────────
@app.post("/api/forecast/generate", tags=["Forecast"], summary="Generate a new 7-day forecast")
def generate_forecast():
    """
    Triggers **Model 4** (Temporal Fusion Transformer) to produce
    a 7-day forecast and saves it to the data lake.

    Call this on a daily schedule in production.
    """
    result = svc4_forecast.generate_daily_forecast(historical_data=["..."])
    return {
        "message":  "Forecast generated and saved.",
        "forecast": result,
    }


@app.get("/api/forecast/latest", tags=["Forecast"], summary="Get the latest forecast")
def get_latest_forecast():
    """
    Returns the most recently generated 7-day forecast from the data lake.
    Returns a 404 if no forecast has been generated yet.
    """
    forecasts = data_lake.read_table("model_forecasts")
    if not forecasts:
        raise HTTPException(
            status_code=404,
            detail="No forecast available yet. Call POST /api/forecast/generate first.",
        )
    return forecasts[-1]


# ── RAG Query (Model 6) ───────────────────────────────────────────────────────
@app.post("/api/query", tags=["RAG"], summary="Ask a natural-language question")
def rag_query(req: QueryRequest):
    """
    Routes a free-text analyst question through **Model 6** (RAG-X).

    The model retrieves live context from Kafka (anomaly + coordination
    alerts) and the data lake (forecasts + vector DB size), then
    generates a natural-language answer.

    Example questions:
    - *"Did we have any anomaly spikes today?"*
    - *"What is the latest forecast?"*
    """
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="Query must not be empty.")

    answer, context = svc6_rag.ask(req.query)
    return {
        "query":        req.query,
        "answer":       answer,
        "context_used": context.strip(),
    }


# ── Run directly ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
