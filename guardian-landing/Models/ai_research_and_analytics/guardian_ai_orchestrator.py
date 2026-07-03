import numpy as np
import time
import json
from sklearn.ensemble import IsolationForest
import random


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
        """Publishes a message (as a JSON string) to a topic."""
        if topic in self.topics:
            event = {
                "timestamp": time.time(),
                "message": message
            }
            self.topics[topic].append(event)
          
            print(f"[KAFKA > {topic}] {json.dumps(message)}")
        else:
            print(f"[KAFKA] ERROR: Topic '{topic}' does not exist.")

    def get_messages(self, topic):
        """Lets a service read all messages from a topic."""
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
        """Writes a record to a 'table' (dictionary)."""
        if table_name in self.tables:
            if isinstance(self.tables[table_name], dict):
                self.tables[table_name][key] = value
            elif isinstance(self.tables[table_name], list):
                self.tables[table_name].append(value)
        else:
            print(f"[DataLake] ERROR: Table '{table_name}' does not exist.")
    
    def read_key(self, table_name, key):
        """Reads a specific key from a table."""
        return self.tables.get(table_name, {}).get(key)
        
    def read_table(self, table_name):
        """Reads an entire table."""
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
        """Simulates a search. In a real system, this uses FAISS."""
        
        print(f"[VectorDB] Searching for {k} nearest neighbors...")
       
        all_ids = list(self.vectors.keys())
        if not all_ids:
            return []
        return random.sample(all_ids, min(k, len(all_ids)))



class Model1_UnifiedService:
    """Model 1: Unified Representation & Search Model"""
    def __init__(self, vector_db, data_lake):
        self.vector_db = vector_db
        self.data_lake = data_lake
        
        print("[Model 1] UnifiedService Initialized.")

    def process_content(self, content_id, text, image_url=None):
        """Simulates creating an embedding for new content."""
        print(f"[Model 1] Processing '{content_id}'...")
       
        embedding = np.random.rand(512).astype(np.float32)
        
        
        self.vector_db.add(content_id, embedding)
        
       
        metadata = {'text': text, 'image_url': image_url, 'emb_dim': 512}
        self.data_lake.write_record('content_metadata', content_id, metadata)
        
        return embedding

class Model2_TopicService:
    """Model 2: Trend, Topic & Semantic Intelligence Model"""
    def __init__(self, kafka_bus):
        self.kafka_bus = kafka_bus
        
        print("[Model 2] TopicService Initialized.")

    def find_new_trends(self, all_content_vectors):
        """Simulates clustering vectors to find trends."""
        if len(all_content_vectors) < 10:
            print("[Model 2] Not enough data to find trends yet.")
            return

        print("[Model 2] Running hourly trend analysis...")
        
        labels = np.random.randint(0, 3, len(all_content_vectors))
        
      
        new_trend_id = 2
        trend_docs_count = np.sum(labels == new_trend_id)
        
        if trend_docs_count > 5:
            summary = f"New Topic Cluster (ID: {new_trend_id}) found with {trend_docs_count} items."
            trend = {
                "trend_id": new_trend_id,
                "summary": summary,
                "type": "EMERGING_TOPIC"
            }
            
            self.kafka_bus.publish("new_trends", trend)
        print("[Model 2] Trend analysis complete.")

class Model3_AnomalyService:
    """Model 3: Anomaly & Risk Detection Model"""
    def __init__(self, kafka_bus):
        self.kafka_bus = kafka_bus
        
        self.model = IsolationForest().fit(np.random.rand(100, 4))
        print("[Model 3] AnomalyService Initialized (with mock trained model).")

    def check_behavior(self, user_id, feature_vector):
        """Checks a new behavior (e.g., post, login) for anomalies."""
        
        
      
        score = self.model.score_samples(np.array(feature_vector).reshape(1, -1))[0]
        
        
        # IsolationForest scores are not strictly bounded to [-1, 0].
        # We clip to [0, 1] to prevent values going out of range.
        anomaly_score_0_1 = float(np.clip(1 - (score + 1) / 2, 0.0, 1.0))
        
        print(f"[Model 3] User '{user_id}' behavior score: {anomaly_score_0_1:.4f}")
        
        if anomaly_score_0_1 > 0.7: 
            alert = {
                "user_id": user_id,
                "anomaly_score": anomaly_score_0_1,
                "alert_type": "BEHAVIORAL_RISK"
            }
          
            self.kafka_bus.publish("anomaly_alerts", alert)
            return True
        return False

class Model4_ForecastingService:
    """Model 4: Predictive Forecasting & Causal Analysis Model"""
    def __init__(self, data_lake):
        self.data_lake = data_lake
       
        print("[Model 4] ForecastingService Initialized.")

    def generate_daily_forecast(self, historical_data):
        """Simulates running the TFT model to get the next 7 days."""
        print("[Model 4] Running daily forecast...")
        
        forecast = np.random.randint(1000, 1500, 7).tolist()
        
        forecast_object = {
            "model": "TemporalFusionTransformer",
            "generated_at": time.time(),
            "forecast_7_day": forecast
        }
        
     
        self.data_lake.write_record("model_forecasts", None, forecast_object)
        print("[Model 4] New forecast saved to Data Lake.")
        return forecast_object

class Model5_GraphService:
    """Model 5: Graph & Network Intelligence Model"""
    def __init__(self, kafka_bus):
        self.kafka_bus = kafka_bus

        self.known_bot_ips = {"192.168.1.10", "10.0.0.5"}
        print("[Model 5] GraphService Initialized.")

    def check_connection(self, user_id, content_id, user_ip):
        """Checks if a new interaction is linked to known bad networks."""
        print(f"[Model 5] Checking interaction: User {user_id} -> Content {content_id}")
        
        if user_ip in self.known_bot_ips:
            alert = {
                "user_id": user_id,
                "content_id": content_id,
                "reason": f"IP match with known bot network: {user_ip}",
                "alert_type": "COORDINATED_BEHAVIOR"
            }
          
            self.kafka_bus.publish("coordination_alerts", alert)
            return True
        return False

class Model6_RAGService:
    """Model 6: Insight Generation & Explainability (RAG-X) Model"""
    def __init__(self, kafka_bus, data_lake, vector_db):
        self.kafka_bus = kafka_bus
        self.data_lake = data_lake
        self.vector_db = vector_db
        
        print("[Model 6] RAGService Initialized.")

    def ask(self, query):
        """Simulates an analyst asking a natural-language question."""
        print(f"\n[Model 6] Analyst Query: \"{query}\"")
        
       
        
        print("[Model 6] Retrieving context from other services...")
        
        
        anomaly_alerts = self.kafka_bus.get_messages("anomaly_alerts")
        coordination_alerts = self.kafka_bus.get_messages("coordination_alerts")
        
       
        forecasts = self.data_lake.read_table("model_forecasts")
        latest_forecast = forecasts[-1] if forecasts else "No forecast available."
        
        
        vector_db_size = len(self.vector_db.vectors)

      
        context = f"""
        --- START SYSTEM CONTEXT ---
        Source 1 (Kafka): There are {len(anomaly_alerts)} anomaly alerts.
        Source 1 (Kafka): There are {len(coordination_alerts)} coordination alerts.
        Source 2 (DataLake): The latest 7-day forecast is: {latest_forecast}
        Source 3 (VectorDB): There are {vector_db_size} content items indexed.
        --- END SYSTEM CONTEXT ---
        
        Based *only* on the context above, answer the query: "{query}"
        """
        
        print("[Model 6] Generating answer...")
        #
        if "spike" in query or "anomaly" in query:
            if anomaly_alerts:
                latest_alert = anomaly_alerts[-1]['message']
                response = f"Yes, we've detected {len(anomaly_alerts)} high-risk behavioral anomalies."
                response += (f" The latest alert: user='{latest_alert.get('user_id', 'unknown')}',"
                             f" score={latest_alert.get('anomaly_score', 'N/A'):.4f},"
                             f" type={latest_alert.get('alert_type', 'N/A')}.")
            else:
                response = "No, system-wide anomaly alerts are currently clear."
        elif "forecast" in query:
            if isinstance(latest_forecast, dict) and "forecast_7_day" in latest_forecast:
                response = f"The current 7-day forecast is {latest_forecast['forecast_7_day']}."
            else:
                response = "No forecast data is available yet. The daily forecasting job may not have run."
        else:
            response = "I cannot answer that based on the current context."
        
        print(f"[Model 6] Final Answer: {response}")
        return response, context


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
    user_id = "user_good"
    content_id = "content_001"
    user_ip = "192.168.1.50"
    user_features = [5, 1, 0.8, 3] 
    

    service_1_unified.process_content(content_id, "This is a normal post about my cat.")
   
    service_3_anomaly.check_behavior(user_id, user_features)
   
    service_5_graph.check_connection(user_id, content_id, user_ip)

  
    print("\n--- EVENT 2: 'user_bot_1' posts 'content_002' from a bad IP ---")
    user_id = "user_bot_1"
    content_id = "content_002"
    user_ip = "10.0.0.5" 
    user_features = [100, 0, 0.1, 0] 
    
    
    service_1_unified.process_content(content_id, "buy my crypto now!!!")
    

    service_3_anomaly.check_behavior(user_id, user_features)
    
    
    service_5_graph.check_connection(user_id, content_id, user_ip)
    
    
    print("\n--- [ 4. Simulating Scheduled (Batch) Jobs ] ---")
    

    all_vectors = list(vector_db.vectors.values()) * 10

    service_2_topic.find_new_trends(all_vectors)


    service_4_forecast.generate_daily_forecast(historical_data=["..."])
    
    print("\n--- [ 5. Simulating Analyst (RAG) Query ] ---")
    

    service_6_rag.ask("What is the latest forecast?")

  
    service_6_rag.ask("Did we have any new anomaly spikes?")
    
    print("\n--- [ Guardian AI System Orchestrator: FINISHED ] ---")


if __name__ == "__main__":
    main_orchestrator()
    