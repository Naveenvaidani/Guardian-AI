# Model 2 — Topic & Semantic Intelligence

## What this model is
Embeds posts/documents with DistilBERT, clusters them with HDBSCAN, and
summarizes each cluster with T5-small.

## Important note on "trained artifacts"
Same situation as Model 1: `distilbert-base-uncased` and `t5-small` are
**frozen pretrained checkpoints**, not fine-tuned on our data. HDBSCAN has
no persisted model file either — it clusters whatever batch of documents you
give it at call time (that's how density-based clustering works; there's
nothing to "train" ahead of time).

What we can genuinely hand over:
- The exact checkpoint names + pinned versions (`requirements.txt`)
- A clean, reusable inference function (`inference.py`)
- The sample dataset used to validate the pipeline end-to-end

If a persisted artifact is required, run once with internet access and zip
the resulting `./hf_cache` directory.

## Files
- `inference.py` — `run_pipeline(documents)` returns clusters + summaries.
- `dataset/sample_documents.json` — demo corpus.
- `requirements.txt` — pinned dependency versions.

## Run
```
pip install -r requirements.txt
python inference.py
```
