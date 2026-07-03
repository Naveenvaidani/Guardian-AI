import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
import joblib
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

np.random.seed(42)
torch.manual_seed(42)

def get_mock_data():
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
    labels = np.array([0]*1000 + [1]*50)  # 0=normal, 1=anomalous (ground truth for export only)

    df = pd.DataFrame(data, columns=["post_count", "report_count", "like_ratio", "comment_count"])
    df["is_anomaly_ground_truth"] = labels

    scaler = StandardScaler()
    data_scaled = scaler.fit_transform(data).astype(np.float32)
    return data_scaled[:1000], data_scaled, scaler, df

class Autoencoder(nn.Module):
    def __init__(self, input_dim):
        super().__init__()
        self.encoder = nn.Sequential(nn.Linear(input_dim, 2), nn.ReLU())
        self.decoder = nn.Sequential(nn.Linear(2, input_dim))

    def forward(self, x):
        return self.decoder(self.encoder(x))

def train_autoencoder(data):
    model = Autoencoder(data.shape[1])
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=1e-3)
    data_tensor = torch.tensor(data)
    for epoch in range(50):
        outputs = model(data_tensor)
        loss = criterion(outputs, data_tensor)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
    return model

if __name__ == "__main__":
    normal_data, all_data, scaler, df = get_mock_data()

    print("Training autoencoder...")
    ae_model = train_autoencoder(normal_data)

    print("Training isolation forest...")
    if_model = IsolationForest(contamination=0.05, random_state=42)
    if_model.fit(all_data)

    
    df.to_csv("dataset/anomaly_detection_dataset.csv", index=False)

   
    torch.save(ae_model.state_dict(), "artifacts/autoencoder.pth")
    joblib.dump(if_model, "artifacts/isolation_forest.pkl")
    joblib.dump(scaler, "artifacts/scaler.pkl")

    print("Saved: artifacts/autoencoder.pth, artifacts/isolation_forest.pkl, artifacts/scaler.pkl")
    print("Saved: dataset/anomaly_detection_dataset.csv")
