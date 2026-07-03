import contextlib
import importlib.util
import json
import os
import sys
import time

import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


@contextlib.contextmanager
def cd(path):
    """Temporarily chdir, because each model's inference.py uses paths like
    'artifacts/...' and 'dataset/...' relative to its own folder."""
    prev = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(prev)


def load_module(module_name, relative_path):
    """Import a model folder's inference.py under a unique module name."""
    full_path = os.path.join(BASE_DIR, relative_path)
    spec = importlib.util.spec_from_file_location(module_name, full_path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[module_name] = module
    spec.loader.exec_module(module)
    return module


class MockKafkaBus:
    """Simulates a Kafka Message Queue."""
    def __init__(self):
        self.topics = {
            "new_content_events": [],
            "anomaly_alerts": [],
            "coordination_alerts": [],
            "new_trends": []
        }
        print("[Infra] MockKafkaBus Initialized.")

    def publish(self, topic, message):
        if topic in self.topics:
            event = {"timestamp": time.time(), "message": message}
            self.topics[topic].append(event)
            print(f"[KAFKA > {topic}] {json.dumps(message, default=str)}")
        else:
            print(f"[KAFKA] ERROR: Topic '{topic}' does not exist.")

    def get_messages(self, topic):
        return self.topics.get(topic, [])


class MockDataLake:
    """Simulates an S3 Data Lake. Stores results as tables."""
    def __init__(self):
        self.tables = {
            "user_features": {},
            "content_metadata": {},
            "model_forecasts": []
        }
        print("[Infra] MockDataLake (S3) Initialized.")

    def write_record(self, table_name, key, value):
        if table_name in self.tables:
            if isinstance(self.tables[table_name], dict):
                self.tables[table_name][key] = value
            elif isinstance(self.tables[table_name], list):
                self.tables[table_name].append(value)
        else:
            print(f"[DataLake] ERROR: Table '{table_name}' does not exist.")

    def read_key(self, table_name, key):
        return self.tables.get(table_name, {}).get(key)

    def read_table(self, table_name):
        return self.tables.get(table_name, [])


class MockVectorDB:
    """Simulates a FAISS/Milvus Vector Database."""
    def __init__(self):
        self.vectors = {}
        print("[Infra] MockVectorDB (FAISS) Initialized.")

    def add(self, content_id, vector):
        self.vectors[content_id] = vector
        print(f"[VectorDB] Added embedding for '{content_id}'. Total size: {len(self.vectors)}")

    def search(self, query_vector, k=5):
        all_ids = list(self.vectors.keys())
        if not all_ids:
            return []
       
        sims = []
        for cid in all_ids:
            v = np.asarray(self.vectors[cid]).reshape(-1)
            q = np.asarray(query_vector).reshape(-1)
            denom = (np.linalg.norm(v) * np.linalg.norm(q)) or 1e-9
            sims.append((cid, float(np.dot(v, q) / denom)))
        sims.sort(key=lambda x: x[1], reverse=True)
        return [cid for cid, _ in sims[:k]]




class Model1_UnifiedService:
    """Model 1: Unified Representation & Search (pretrained BERT embeddings)."""
    def __init__(self, vector_db, data_lake):
        self.vector_db = vector_db
        self.data_lake = data_lake
        self.dir = os.path.join(BASE_DIR, "model1_unified_representation")
        self.ready = False
        try:
            self.mod = load_module("model1_inference", "model1_unified_representation/inference.py")
            with cd(self.dir):
                self.tokenizer = self.mod.BertTokenizer.from_pretrained(
                    self.mod.MODEL_ID_BERT, cache_dir=os.environ.setdefault('HF_HOME', './hf_cache'))
                self.model = self.mod.BertModel.from_pretrained(
                    self.mod.MODEL_ID_BERT, cache_dir=os.environ['HF_HOME'])
            self.ready = True
            print("[Model 1] UnifiedService Initialized (real pretrained BERT loaded).")
        except Exception as e:
            print(f"[Model 1] WARNING: could not load pretrained BERT ({e}). "
                  f"Falling back to a clearly-labeled random placeholder embedding.")

    def process_content(self, content_id, text, image_url=None):
        print(f"[Model 1] Processing '{content_id}'...")
        if self.ready:
            with cd(self.dir):
                embedding = self.mod.get_bert_embeddings([text], self.tokenizer, self.model)[0]
        else:
            embedding = np.random.rand(768).astype(np.float32)  # placeholder only

        self.vector_db.add(content_id, embedding)
        metadata = {'text': text, 'image_url': image_url, 'emb_dim': len(embedding)}
        self.data_lake.write_record('content_metadata', content_id, metadata)
        return embedding


class Model2_TopicService:
    """Model 2: Topic & Semantic Intelligence (pretrained DistilBERT + HDBSCAN + T5)."""
    def __init__(self, kafka_bus):
        self.kafka_bus = kafka_bus
        self.dir = os.path.join(BASE_DIR, "model2_topic_intelligence")
        self.ready = False
        try:
            self.mod = load_module("model2_inference", "model2_topic_intelligence/inference.py")
            self.ready = True
            print("[Model 2] TopicService Initialized (real pretrained pipeline available).")
        except Exception as e:
            print(f"[Model 2] WARNING: could not load topic pipeline ({e}). "
                  f"find_new_trends() will be skipped.")

    def find_new_trends(self, content_metadata_table):
        texts = [v["text"] for v in content_metadata_table.values() if v.get("text")]
        if len(texts) < 3 or not self.ready:
            print("[Model 2] Not enough data (or pipeline unavailable) to find trends yet.")
            return

        print("[Model 2] Running trend analysis on real content text via DistilBERT + HDBSCAN...")
        with cd(self.dir):
            results = self.mod.run_pipeline(texts)

        for label, payload in results.items():
            if label == "noise":
                continue
            trend = {
                "trend_id": label,
                "summary": payload["summary"],
                "doc_count": len(payload["documents"]),
                "type": "EMERGING_TOPIC"
            }
            self.kafka_bus.publish("new_trends", trend)
        print("[Model 2] Trend analysis complete.")


class Model3_AnomalyService:
    """Model 3: Anomaly & Risk Detection (custom-trained Autoencoder + IsolationForest)."""
    def __init__(self, kafka_bus):
        self.kafka_bus = kafka_bus
        self.dir = os.path.join(BASE_DIR, "model3_anomaly_detection")
        self.mod = load_module("model3_inference", "model3_anomaly_detection/inference.py")
        with cd(self.dir):
            self.scaler, self.if_model, self.ae_model = self.mod.load_artifacts()
        print("[Model 3] AnomalyService Initialized (real trained artifacts loaded).")

    def check_behavior(self, user_id, feature_vector):
        with cd(self.dir):
            result = self.mod.predict([feature_vector], self.scaler, self.if_model, self.ae_model)[0]

        is_anomaly = result["isolation_forest_is_anomaly"]
        print(f"[Model 3] User '{user_id}' -> IsolationForest score={result['isolation_forest_score']:.4f}, "
              f"AE recon error={result['autoencoder_reconstruction_error']:.4f}, anomaly={is_anomaly}")

        if is_anomaly:
            alert = {
                "user_id": user_id,
                "isolation_forest_score": result["isolation_forest_score"],
                "autoencoder_reconstruction_error": result["autoencoder_reconstruction_error"],
                "alert_type": "BEHAVIORAL_RISK"
            }
            self.kafka_bus.publish("anomaly_alerts", alert)
            return True
        return False


class Model4_ForecastingService:
    """Model 4: Predictive Forecasting (custom-trained Temporal Fusion Transformer)."""
    def __init__(self, data_lake):
        self.data_lake = data_lake
        self.dir = os.path.join(BASE_DIR, "model4_predictive_forecasting")
        self.ready = False
        try:
            self.mod = load_module("model4_inference", "model4_predictive_forecasting/inference.py")
            with cd(self.dir):
                self.model = self.mod.load_model()
            self.ready = True
            print("[Model 4] ForecastingService Initialized (real trained TFT checkpoint loaded).")
        except Exception as e:
            print(f"[Model 4] WARNING: could not load TFT checkpoint ({e}). Forecast will be skipped.")

    def generate_daily_forecast(self, historical_df=None):
        if not self.ready:
            print("[Model 4] Skipping forecast (model not available).")
            return None

        print("[Model 4] Running forecast with the trained Temporal Fusion Transformer...")
        with cd(self.dir):
            if historical_df is None:
                import pandas as pd
                historical_df = pd.read_csv(self.mod.DATASET_PATH)
            preds = self.mod.forecast(historical_df, self.model)

        forecast_object = {
            "model": "TemporalFusionTransformer",
            "generated_at": time.time(),
            "forecast_quantiles_shape": list(preds.shape),
            "forecast_median": preds[:, :, preds.shape[-1] // 2].tolist(),
        }
        self.data_lake.write_record("model_forecasts", None, forecast_object)
        print("[Model 4] New forecast saved to Data Lake.")
        return forecast_object


class Model5_GraphService:
    """Model 5: Graph & Network Intelligence (custom-trained GraphSAGE + IP heuristic)."""
    def __init__(self, kafka_bus):
        self.kafka_bus = kafka_bus
        self.dir = os.path.join(BASE_DIR, "model5_graph_intelligence")
        self.known_bot_ips = {"192.168.1.10", "10.0.0.5"}  # fast-path rule, not a model
        self.ready = False
        try:
            self.mod = load_module("model5_inference", "model5_graph_intelligence/inference.py")
            with cd(self.dir):
                self.graph_data = self.mod.load_graph()
                self.model = self.mod.load_model(in_channels=self.graph_data.num_node_features)
                self.predictions = self.mod.predict(self.graph_data, self.model)
            self.ready = True
            print("[Model 5] GraphService Initialized (real trained GraphSAGE checkpoint loaded).")
        except Exception as e:
            print(f"[Model 5] WARNING: could not load GraphSAGE checkpoint ({e}). "
                  f"Falling back to the IP-heuristic check only.")

    def check_connection(self, user_id, content_id, user_ip):
        print(f"[Model 5] Checking interaction: User {user_id} -> Content {content_id}")

        flagged = False
        reason = None

        if user_ip in self.known_bot_ips:
            flagged = True
            reason = f"IP match with known bot network: {user_ip}"
        elif self.ready and any(p == 1 for p in self.predictions):
        
            flagged = True
            reason = "GraphSAGE flagged a suspicious node in the current interaction graph"

        if flagged:
            alert = {
                "user_id": user_id,
                "content_id": content_id,
                "reason": reason,
                "alert_type": "COORDINATED_BEHAVIOR"
            }
            self.kafka_bus.publish("coordination_alerts", alert)
            return True
        return False


class Model6_RAGService:
    """Model 6: Insight Generation & Explainability (pretrained MiniLM + DistilBERT-QA RAG)."""
    def __init__(self, kafka_bus, data_lake, vector_db):
        self.kafka_bus = kafka_bus
        self.data_lake = data_lake
        self.vector_db = vector_db
        self.dir = os.path.join(BASE_DIR, "model6_rag_explainability")
        self.ready = False
        try:
            self.mod = load_module("model6_inference", "model6_rag_explainability/inference.py")
            self.ready = True
            print("[Model 6] RAGService Initialized (real pretrained RAG pipeline available).")
        except Exception as e:
            print(f"[Model 6] WARNING: could not load RAG pipeline ({e}). "
                  f"Falling back to a simple context summary (no generative answer).")

    def _build_live_context_docs(self):
        anomaly_alerts = self.kafka_bus.get_messages("anomaly_alerts")
        coordination_alerts = self.kafka_bus.get_messages("coordination_alerts")
        forecasts = self.data_lake.read_table("model_forecasts")
        latest_forecast = forecasts[-1] if forecasts else None

        docs = [
            f"There are {len(anomaly_alerts)} behavioral anomaly alerts in the system.",
            f"There are {len(coordination_alerts)} coordinated-behavior alerts in the system.",
            f"There are {len(self.vector_db.vectors)} content items indexed in the vector DB.",
        ]
        if latest_forecast:
            docs.append(f"The latest 7-day forecast (median) is: {latest_forecast.get('forecast_median')}.")
        if anomaly_alerts:
            docs.append(f"Most recent anomaly alert: {json.dumps(anomaly_alerts[-1]['message'], default=str)}")
        return docs, latest_forecast, anomaly_alerts

    def ask(self, query):
        print(f"\n[Model 6] Analyst Query: \"{query}\"")
        docs, latest_forecast, anomaly_alerts = self._build_live_context_docs()

        if self.ready:
            print("[Model 6] Retrieving + generating answer with real RAG pipeline...")
            with cd(self.dir):
                rag_chain = self.mod.build_rag_pipeline(docs)
                answer = self.mod.ask(rag_chain, query)
        else:
            if "forecast" in query.lower():
                answer = (f"The current 7-day forecast (median) is {latest_forecast['forecast_median']}."
                           if latest_forecast else "No forecast available yet.")
            elif "anomaly" in query.lower() or "spike" in query.lower():
                answer = (f"Yes, {len(anomaly_alerts)} anomaly alert(s) detected."
                           if anomaly_alerts else "No anomaly alerts currently.")
            else:
                answer = "RAG pipeline unavailable; cannot generate a free-form answer right now."

        print(f"[Model 6] Final Answer: {answer}")
        return answer, docs


# ---------------------------------------------------------------------------
# Orchestration
# ---------------------------------------------------------------------------

def main_orchestrator():
    print("--- [ Guardian AI System Orchestrator: STARTING ] ---")

    kafka_bus = MockKafkaBus()
    data_lake = MockDataLake()
    vector_db = MockVectorDB()

    print("\n--- [ 2. Initializing All Model Services ] ---")
    service_1_unified = Model1_UnifiedService(vector_db, data_lake)
    service_2_topic = Model2_TopicService(kafka_bus)
    service_3_anomaly = Model3_AnomalyService(kafka_bus)
    service_4_forecast = Model4_ForecastingService(data_lake)
    service_5_graph = Model5_GraphService(kafka_bus)
    service_6_rag = Model6_RAGService(kafka_bus, data_lake, vector_db)

    print("\n--- [ 3. Simulating Real-Time Events ] ---")

    print("\n--- EVENT 1: 'user_good' posts 'content_001' ---")
    user_id, content_id, user_ip = "user_good", "content_001", "192.168.1.50"
    user_features = [5, 1, 0.8, 3]
    service_1_unified.process_content(content_id, "This is a normal post about my cat.")
    service_3_anomaly.check_behavior(user_id, user_features)
    service_5_graph.check_connection(user_id, content_id, user_ip)

    print("\n--- EVENT 2: 'user_bot_1' posts 'content_002' from a bad IP ---")
    user_id, content_id, user_ip = "user_bot_1", "content_002", "10.0.0.5"
    user_features = [100, 0, 0.1, 0]
    service_1_unified.process_content(content_id, "buy my crypto now!!!")
    service_3_anomaly.check_behavior(user_id, user_features)
    service_5_graph.check_connection(user_id, content_id, user_ip)

    print("\n--- [ 4. Simulating Scheduled (Batch) Jobs ] ---")
    service_2_topic.find_new_trends(data_lake.read_table("content_metadata"))
    service_4_forecast.generate_daily_forecast()

    print("\n--- [ 5. Simulating Analyst (RAG) Query ] ---")
    service_6_rag.ask("What is the latest forecast?")
    service_6_rag.ask("Did we have any new anomaly spikes?")

    print("\n--- [ Guardian AI System Orchestrator: FINISHED ] ---")


if __name__ == "__main__":
    main_orchestrator()
