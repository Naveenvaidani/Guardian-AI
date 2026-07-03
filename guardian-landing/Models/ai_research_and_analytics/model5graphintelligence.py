import torch
import torch.nn.functional as F


try:
    from torch_geometric.data import Data
    from torch_geometric.nn import SAGEConv 
except ImportError:
    print("PyTorch Geometric not found. Please run: pip install torch-geometric")
    print("You may also need: pip install pyg-lib")
    exit()


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


def get_mock_graph_data():
  
    print("\n[Phase 1: Generating Mock Graph Data]")
    
    num_nodes = 8
    
    
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

    data = Data(x=x, edge_index=edge_index, y=y, train_mask=train_mask)
    print(f"Graph created: {data}")
    print(f"Number of nodes: {data.num_nodes}")
    print(f"Number of edges: {data.num_edges}")
    return data


if __name__ == "__main__":
    print("--- Model 5: Graph & Network Intelligence (GraphSAGE) ---")
    
    data = get_mock_graph_data()
    
    
    model = GraphSAGEModel(
        in_channels=data.num_node_features,
        hidden_channels=16,
        out_channels=2 
    )
    print(f"\n[Phase 2: GraphSAGE Model Defined]\n{model}")
    
    optimizer = torch.optim.Adam(model.parameters(), lr=0.01, weight_decay=5e-4)

   
    print("\n[Phase 3: Conceptual Training Loop]")
    model.train()
    
    for epoch in range(50):
        optimizer.zero_grad()
        out = model(data.x, data.edge_index)
        
        loss = F.nll_loss(out[data.train_mask], data.y[data.train_mask])
        
        loss.backward()
        optimizer.step()
        
        if (epoch+1) % 10 == 0:
            print(f"Epoch {epoch+1:02d}, Loss: {loss.item():.4f}")

  
    print("\n[Phase 4: Final Node Predictions]")
    model.eval()
    final_out = model(data.x, data.edge_index)
    preds = final_out.argmax(dim=1)
    
    print("Note: These predictions are on tiny, mock data.")
    for i in range(5): 
        print(f"  User {i}: True Label = {data.y[i]}, Predicted = {preds[i]}")
        
        


