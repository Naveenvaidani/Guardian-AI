import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler


def get_mock_data():
    """
    Generate mock data.
    Features could be: [post_count, report_count, like_ratio, comment_count]
    """
    
    normal_data = np.random.rand(1000, 4)
    normal_data[:, 0] = normal_data[:, 0] * 10  
    normal_data[:, 1] = normal_data[:, 1] * 2   
    normal_data[:, 2] = 0.5 + normal_data[:, 2] * 0.5 
    normal_data[:, 3] = normal_data[:, 3] * 5  
    
   
    anomalous_data = np.random.rand(50, 4)
    anomalous_data[:, 0] = 50 + anomalous_data[:, 0] * 50 
    anomalous_data[:, 1] = anomalous_data[:, 1] * 1   
    anomalous_data[:, 2] = anomalous_data[:, 2] * 0.1 
    anomalous_data[:, 3] = anomalous_data[:, 3] * 2   
    
    data = np.vstack((normal_data, anomalous_data))
    
   
    scaler = StandardScaler()
    data_scaled = scaler.fit_transform(data).astype(np.float32)
    
    
    normal_data_scaled = data_scaled[:1000]
    all_data_scaled = data_scaled
    
    return normal_data_scaled, all_data_scaled


class Autoencoder(nn.Module):
    def __init__(self, input_dim):
        super(Autoencoder, self).__init__()
        # Encoder: 4 -> 2
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 2),
            nn.ReLU()
        )
        # Decoder: 2 -> 4
        self.decoder = nn.Sequential(
            nn.Linear(2, input_dim),
        )

    def forward(self, x):
        x = self.encoder(x)
        x = self.decoder(x)
        return x

def train_autoencoder(data):
    print("\n[Phase 1a: Training Autoencoder]")
    input_dim = data.shape[1]
    model = Autoencoder(input_dim)
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=1e-3)
    
    data_tensor = torch.tensor(data)
    
    for epoch in range(50):
        
        outputs = model(data_tensor)
        loss = criterion(outputs, data_tensor)
        
      
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        if (epoch+1) % 10 == 0:
            print(f'Epoch [{epoch+1}/50], Loss: {loss.item():.6f}')
    
    print("Autoencoder training complete.")
    return model

def get_reconstruction_errors(model, all_data):
    """Calculates MSE loss for each data point."""
    model.eval()
    with torch.no_grad():
        data_tensor = torch.tensor(all_data)
        reconstructed = model(data_tensor)
        criterion = nn.MSELoss(reduction='none')
        errors = criterion(reconstructed, data_tensor).mean(dim=1).numpy()
    return errors


def train_isolation_forest(data):
    print("\n[Phase 2a: Training Isolation Forest]")
   
    clf = IsolationForest(contamination=0.05, random_state=42)
    clf.fit(data)
    print("Isolation Forest training complete.")
    return clf


if __name__ == "__main__":
    print("--- Model 3: Anomaly & Risk Detection ---")
    
  
    normal_data, all_data = get_mock_data()

  
    ae_model = train_autoencoder(normal_data)
    
    print("\n[Phase 1b: Calculating Autoencoder Anomaly Scores]")
    recon_errors = get_reconstruction_errors(ae_model, all_data)
    
  
    top_5_ae_indices = np.argsort(recon_errors)[-5:]
    print("Top 5 anomalies detected by Autoencoder (by index):")
    print(top_5_ae_indices)
    print("Note: Indices > 999 are the 'true' anomalies we created.")

    
    if_model = train_isolation_forest(all_data)
    
    print("\n[Phase 2b: Calculating Isolation Forest Anomaly Scores]")
    
    if_scores = if_model.score_samples(all_data)
    
   
    top_5_if_indices = np.argsort(if_scores)[:5]
    print("Top 5 anomalies detected by Isolation Forest (by index):")
    print(top_5_if_indices)
    
   
    if_labels = if_model.predict(all_data)
    print(f"Total anomalies found by IF: {np.sum(if_labels == -1)}")