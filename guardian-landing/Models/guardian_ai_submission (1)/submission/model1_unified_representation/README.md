# Model 1 — Unified Representation & Search

## What this model is
Generates text/image embeddings (CLIP) and text embeddings (BERT), then runs
nearest-neighbour search over them with FAISS. Used as the "search backbone"
for the rest of the Guardian AI pipeline.

## Important note on "trained artifacts"
This model uses two **frozen, publicly pretrained checkpoints** — it does not
involve custom training on our own labeled data:
- `openai/clip-vit-base-patch32`
- `bert-base-uncased`

There is no custom `.pth`/`.pkl` weight file to hand over, because nothing
was fine-tuned. The standard, correct way to "ship" this kind of model is:
1. Pin the exact checkpoint name + library versions (see `requirements.txt`).
2. Let the inference script download the checkpoint once into `./hf_cache`
   on the server (or pre-bake `./hf_cache` into the deployment image).




## Files
- `inference.py` — loads the two pretrained models and exposes
  `get_clip_embeddings`, `get_bert_embeddings`, `create_faiss_index`,
  `search_index`.
- `dataset/sample_documents.json` — the small demo text corpus used to
  exercise the BERT + FAISS path in `__main__`.
- `requirements.txt` — pinned dependency versions.

## Run
```
pip install -r requirements.txt
python inference.py
```
