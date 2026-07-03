# Model 6 — Insight Generation & Explainability (RAG)

## What this model is
Retrieval-augmented QA over internal reports: chunks documents, embeds them
with a sentence-transformer, retrieves relevant chunks via FAISS, and
answers questions with an extractive QA model.

## Files
- `inference.py` — `build_rag_pipeline(documents)` + `ask(chain, question)`.
- `dataset/sample_reports.json` — demo report corpus.
- `requirements.txt` — pinned dependency versions.

## Run
```
pip install -r requirements.txt
python inference.py
```
