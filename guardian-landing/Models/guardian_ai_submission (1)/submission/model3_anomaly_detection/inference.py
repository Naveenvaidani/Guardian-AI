

import numpy as np
import torch
import torch.nn as nn
import joblib

ARTIFACT_DIR = "artifacts"


class Autoencoder(nn.Module):
    def __init__(self, input_dim=4):
        super().__init__()
        self.encoder = nn.Sequential(nn.Linear(input_dim, 2), nn.ReLU())
        self.decoder = nn.Sequential(nn.Linear(2, input_dim))

    def forward(self, x):
        return self.decoder(self.encoder(x))


def load_artifacts():
    scaler = joblib.load(f"{ARTIFACT_DIR}/scaler.pkl")
    if_model = joblib.load(f"{ARTIFACT_DIR}/isolation_forest.pkl")
    ae_model = Autoencoder(input_dim=4)
    ae_model.load_state_dict(torch.load(f"{ARTIFACT_DIR}/autoencoder.pth", map_location="cpu"))
    ae_model.eval()
    return scaler, if_model, ae_model


def predict(records, scaler=None, if_model=None, ae_model=None):
    """
    records: list[list[float]] of shape (n, 4) -> [post_count, report_count, like_ratio, comment_count]
    Returns a list of dicts with anomaly verdicts from both models.
    """
    if scaler is None or if_model is None or ae_model is None:
        scaler, if_model, ae_model = load_artifacts()

    data = np.asarray(records, dtype=np.float32)
    data_scaled = scaler.transform(data).astype(np.float32)

    # Isolation Forest verdict
    if_labels = if_model.predict(data_scaled)          # -1 = anomaly, 1 = normal
    if_scores = if_model.score_samples(data_scaled)     # lower = more anomalous

    # Autoencoder reconstruction-error verdict
    with torch.no_grad():
        tensor_in = torch.tensor(data_scaled)
        reconstructed = ae_model(tensor_in)
        recon_errors = ((reconstructed - tensor_in) ** 2).mean(dim=1).numpy()

    results = []
    for i in range(len(records)):
        results.append({
            "input": records[i],
            "isolation_forest_is_anomaly": bool(if_labels[i] == -1),
            "isolation_forest_score": float(if_scores[i]),
            "autoencoder_reconstruction_error": float(recon_errors[i]),
        })
    return results


if __name__ == "__main__":
    sample_records = [
        [3.2, 0.4, 0.85, 2.1],     # looks normal
        [95.0, 0.2, 0.03, 1.5],    # looks anomalous (bot-like pattern)
    ]
    scaler, if_model, ae_model = load_artifacts()
    output = predict(sample_records, scaler, if_model, ae_model)
    for r in output:
        print(r)
