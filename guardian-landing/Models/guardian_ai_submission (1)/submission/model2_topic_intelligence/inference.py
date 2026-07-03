

import os
import torch
import hdbscan
from transformers import pipeline, AutoTokenizer, AutoModel

MODEL_ID_EMBEDDING = "distilbert-base-uncased"
MODEL_ID_SUMMARIZATION = "t5-small"

os.environ.setdefault('HF_HOME', './hf_cache')
os.environ.setdefault('TRANSFORMERS_CACHE', './hf_cache')


def get_bert_embeddings(text_list, tokenizer, model):
    inputs = tokenizer(text_list, return_tensors="pt", padding=True, truncation=True, max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1).numpy()


def cluster_embeddings(embeddings):
    clusterer = hdbscan.HDBSCAN(min_cluster_size=3, min_samples=1, gen_min_span_tree=True)
    clusterer.fit(embeddings)
    return clusterer.labels_


def summarize_text(text, summarizer):
    if not text.strip():
        return "No content to summarize."
    input_text = f"summarize: {text}"
    if len(input_text) > 500:
        input_text = input_text[:500]
    try:
        summary = summarizer(input_text, max_length=50, min_length=10, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        return f"Error in summarization: {e}"


def run_pipeline(documents):
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID_EMBEDDING, cache_dir=os.environ['HF_HOME'])
    model = AutoModel.from_pretrained(MODEL_ID_EMBEDDING, cache_dir=os.environ['HF_HOME'])
    embeddings = get_bert_embeddings(documents, tokenizer, model)

    labels = cluster_embeddings(embeddings)

    clusters = {}
    for i, label in enumerate(labels):
        clusters.setdefault(label, []).append(documents[i])

    summarizer = pipeline("summarization", model=MODEL_ID_SUMMARIZATION,
                           tokenizer=MODEL_ID_SUMMARIZATION, cache_dir=os.environ['HF_HOME'])

    results = {}
    for label, docs in clusters.items():
        if label == -1:
            results["noise"] = docs
        else:
            summary = summarize_text(" ".join(docs), summarizer)
            results[f"cluster_{label}"] = {"documents": docs, "summary": summary}
    return results


if __name__ == "__main__":
    import json
    with open("dataset/sample_documents.json") as f:
        documents = json.load(f)["documents"]

    output = run_pipeline(documents)
    print(json.dumps(output, indent=2))
