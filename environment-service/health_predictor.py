import json
import joblib
import numpy as np
import tensorflow as tf

from config import (
    HEALTH_MODEL_PATH,
    HEALTH_SCALER_PATH,
    HEALTH_CONFIG_PATH,
    HEALTH_FEATURES,
)


class HealthPredictor:
    def __init__(self):
        self.model = tf.keras.models.load_model(HEALTH_MODEL_PATH)
        self.scaler = joblib.load(HEALTH_SCALER_PATH)

        with open(HEALTH_CONFIG_PATH, "r") as f:
            self.config = json.load(f)

        self.threshold = self.config.get("threshold", 0.5)

    def predict(self, sensor_data: dict) -> dict:
        values = [
            sensor_data[feature]
            for feature in HEALTH_FEATURES
        ]

        X = np.array(values, dtype=np.float32).reshape(1, -1)

        X_scaled = self.scaler.transform(X)

        # CNN expects: (batch, 6, 1)
        X_cnn = X_scaled.reshape(1, len(HEALTH_FEATURES), 1)

        probability = float(self.model.predict(X_cnn, verbose=0)[0][0])

        if probability >= self.threshold:
            label = "Healthy"
            confidence = probability
        else:
            label = "Unhealthy"
            confidence = 1.0 - probability

        return {
            "label": label,
            "confidence": round(confidence, 4),
        }