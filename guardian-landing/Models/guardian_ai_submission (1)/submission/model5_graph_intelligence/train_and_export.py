import torch
import torch.nn.functional as F
import json

from torch_geometric.data import Data
from torch_geometric.nn import SAGEConv

torch.manual_seed(42)

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


def get_graph_data():
    user_features = torch.tensor([
        [1, 365],
        [0, 10],
        [0, 5],
        [1, 730],
        [0, 20],
    ], dtype=torch.float)

    content_features = torch.tensor([
        [0, 1],
        [1, 2],
        [0, 2],
    ], dtype=torch.float)

    x = torch.cat([user_features, content_features], dim=0)

    edge_index = torch.tensor([
        [0, 1, 2, 3, 4, 4],
        [5, 6, 6, 7, 5, 7]
    ], dtype=torch.long)

    edge_index_reverse = torch.tensor([
        [5, 6, 6, 7, 5, 7],
        [0, 1, 2, 3, 4, 4]
    ], dtype=torch.long)
    edge_index = torch.cat([edge_index, edge_index_reverse], dim=1)

    y = torch.tensor([0, 1, 1, 0, 0, -1, -1, -1], dtype=torch.long)
    train_mask = torch.tensor([True, True, True, True, True, False, False, False])

    return Data(x=x, edge_index=edge_index, y=y, train_mask=train_mask)


if __name__ == "__main__":
    data = get_graph_data()

    # Save the graph dataset used for training/validation
    dataset_dict = {
        "x": data.x.tolist(),
        "edge_index": data.edge_index.tolist(),
        "y": data.y.tolist(),
        "train_mask": data.train_mask.tolist(),
        "node_description": "Nodes 0-4 = users [is_verified, account_age_days], Nodes 5-7 = content [is_flagged, report_count]",
    }
    with open("dataset/graph_data.json", "w") as f:
        json.dump(dataset_dict, f, indent=2)

    model = GraphSAGEModel(in_channels=data.num_node_features, hidden_channels=16, out_channels=2)
    optimizer = torch.optim.Adam(model.parameters(), lr=0.01, weight_decay=5e-4)

    model.train()
    for epoch in range(50):
        optimizer.zero_grad()
        out = model(data.x, data.edge_index)
        loss = F.nll_loss(out[data.train_mask], data.y[data.train_mask])
        loss.backward()
        optimizer.step()

    print(f"Final training loss: {loss.item():.4f}")

    torch.save(model.state_dict(), "artifacts/graphsage_model.pth")
    print("Saved: artifacts/graphsage_model.pth")
    print("Saved: dataset/graph_data.json")
