# Model 5 — Graph & Network Intelligence (GraphSAGE)

## What this model is
Classifies users/content nodes (e.g. trustworthy vs. suspicious) in a
user-content graph using a genuinely **custom-trained** 2-layer GraphSAGE
network (`torch_geometric`), trained for 50 epochs.

## Training data note
The graph is a **small synthetic toy graph** (5 user nodes + 3 content
nodes, hand-built edges/labels) used to prove the architecture trains end
to end.

## Files
- `artifacts/graphsage_model.pth` — trained GraphSAGE weights.
- `inference.py` — loads the weights and predicts a class for every node in a graph.
- `train_and_export.py` — regenerates the graph + retrains + re-exports the artifact above.
- `dataset/graph_data.json` — the exact node features / edges / labels used for training.
- `requirements.txt` — pinned dependency versions.

## Run
```
pip install -r requirements.txt
python inference.py
```
