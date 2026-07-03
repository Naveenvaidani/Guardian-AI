

import torch
import torch.nn.functional as F
import json

from torch_geometric.data import Data
from torch_geometric.nn import SAGEConv

ARTIFACT_PATH = "artifacts/graphsage_model.pth"
DATASET_PATH = "dataset/graph_data.json"


class GraphSAGEModel(torch.nn.Module):
    def __init__(self, in_channels, hidden_channels, out_channels):
        super().__init__()
        self.conv1 = SAGEConv(in_channels, hidden_channels)
        self.conv2 = SAGEConv(hidden_channels, out_channels)

    def forward(self, x, edge_index):
        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = F.dropout(x, p=0.5, training=self.training)
        x = self.conv2(x, edge_index)
        return F.log_softmax(x, dim=1)


def load_model(in_channels=2, hidden_channels=16, out_channels=2):
    model = GraphSAGEModel(in_channels, hidden_channels, out_channels)
    model.load_state_dict(torch.load(ARTIFACT_PATH, map_location="cpu"))
    model.eval()
    return model


def load_graph(path=DATASET_PATH):
    with open(path) as f:
        d = json.load(f)
    x = torch.tensor(d["x"], dtype=torch.float)
    edge_index = torch.tensor(d["edge_index"], dtype=torch.long)
    return Data(x=x, edge_index=edge_index)


def predict(graph_data, model=None):
    """
    graph_data: a torch_geometric.data.Data object with .x and .edge_index
    Returns predicted class (0/1) for every node.
    """
    if model is None:
        model = load_model(in_channels=graph_data.num_node_features)
    with torch.no_grad():
        out = model(graph_data.x, graph_data.edge_index)
        preds = out.argmax(dim=1)
    return preds.tolist()


if __name__ == "__main__":
    graph_data = load_graph()
    model = load_model(in_channels=graph_data.num_node_features)
    predictions = predict(graph_data, model)
    for i, p in enumerate(predictions):
        print(f"Node {i}: predicted class = {p}")
