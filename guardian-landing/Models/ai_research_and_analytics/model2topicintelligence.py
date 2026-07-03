import numpy as np
import hdbscan
from transformers import pipeline, AutoTokenizer, AutoModel
import torch
import os

MODEL_ID_EMBEDDING = "distilbert-base-uncased"
MODEL_ID_SUMMARIZATION = "t5-small"
   


os.environ['HF_HOME'] = './hf_cache'
os.environ['TRANSFORMERS_CACHE'] = './hf_cache'
def get_bert_embeddings(text_list, tokenizer, model):
   
    inputs = tokenizer(text_list, return_tensors="pt", padding=True, truncation=True, max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)
    

    embeddings = outputs.last_hidden_state.mean(dim=1).numpy()
    return embeddings

def cluster_embeddings(embeddings):
 

    clusterer = hdbscan.HDBSCAN(min_cluster_size=3, min_samples=1,
                                gen_min_span_tree=True)
    
    clusterer.fit(embeddings)
    return clusterer.labels_
    
def summarize_text(text, summarizer):
   
    if not text.strip():
        return "No content to summarize."
        
    input_text = f"summarize: {text}"
    
    max_chunk_len = 500 
    if len(input_text) > max_chunk_len:
         input_text = input_text[:max_chunk_len]

    try:
        summary = summarizer(input_text, max_length=50, min_length=10, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        print(f"Summarization error: {e}")
        return "Error in summarization."


if __name__ == "__main__":
    print("--- Model 2: Topic & Semantic Intelligence ---")
    print("NOTE: This will download models from Hugging Face on first run.")

   
    documents = [
        "Just saw the new space movie, it was incredible!",
        "The rocket launch was a success! To the moon!",
        "My cat is stuck in a tree, help!",
        "I'm training for a marathon next month.",
        "The new sci-fi film about space travel is a must-see.",
        "What's the best food for my new kitten?",
        "Running 10 miles today. Marathon prep is hard.",
        "Another successful launch for the Artemis program.",
        "My dog just learned a new trick.",
        "I love watching my cat play with a laser."
    ]

    
    print(f"\n[Phase 1: Generating embeddings for {len(documents)} documents]")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID_EMBEDDING, cache_dir=os.environ['HF_HOME'])
    model = AutoModel.from_pretrained(MODEL_ID_EMBEDDING, cache_dir=os.environ['HF_HOME'])
    embeddings = get_bert_embeddings(documents, tokenizer, model)
    print(f"Embedding shape: {embeddings.shape}")

   
    print("\n[Phase 2: Clustering embeddings with HDBSCAN]")
    labels = cluster_embeddings(embeddings)
    
    
    clusters = {}
    for i, label in enumerate(labels):
        if label not in clusters:
            clusters[label] = []
        clusters[label].append(documents[i])

    print(f"Found {len(set(labels))} clusters (including noise cluster -1)")

    
    print("\n[Phase 3: Summarizing topics with T5 model]")
    summarizer = pipeline("summarization", model=MODEL_ID_SUMMARIZATION, tokenizer=MODEL_ID_SUMMARIZATION, cache_dir=os.environ['HF_HOME'])
            
    for label, docs in clusters.items():
        if label == -1:
            print("\n--- Cluster -1 (Noise) ---")
            for doc in docs:
                print(f"  - {doc}")
        else:
            print(f"\n--- Cluster {label} ---")
           
            text_block = " ".join(docs)
            summary = summarize_text(text_block, summarizer)
            print(f"Summary: {summary}")
            for doc in docs:
                print(f"  - {doc}")
    print("\n--- End of Model 2 Execution ---")
    
    
    