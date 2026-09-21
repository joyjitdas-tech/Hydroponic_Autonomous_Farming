import joblib
import numpy as np

from config import (
    ANOMALY_MODEL_PATH,
    ANOMALY_SCALER_PATH,
    ANOMALY_FEATURES,
    HEALTH_THRESHOLDS,
)


class AnomalyDetector:
    def __init__(self):
        self.model = joblib.load(ANOMALY_MODEL_PATH)
        self.scaler = joblib.load(ANOMALY_SCALER_PATH)

    def detect(self, sensor_data: dict) -> dict:
        values = [
            sensor_data[feature]
            for feature in ANOMALY_FEATURES
        ]

        X = np.array(values, dtype=np.float32).reshape(1, -1)

        X_scaled = self.scaler.transform(X)

        prediction = int(self.model.predict(X_scaled)[0])
        score = float(self.model.decision_function(X_scaled)[0])

        is_anomaly = prediction == -1

        indicators = []

        # Reference-based indicators
        for sensor, limits in HEALTH_THRESHOLDS.items():
            value = sensor_data[sensor]

            if value < limits["min"]:
                indicators.append(
                    f"{sensor} is below the configured reference range"
                )
            elif value > limits["max"]:
                indicators.append(
                    f"{sensor} is above the configured reference range"
                )

        # Statistical indicator
        if is_anomaly:
            indicators.append(
                "The multivariate sensor combination is uncommon "
                "in the training data"
            )

        if is_anomaly:
            reason = (
                "The combination of environmental sensor values is "
                "statistically unusual compared with the training data."
            )
        else:
            reason = None

        return {
            "is_anomaly": is_anomaly,
            "score": round(score, 4),
            "reason": reason,
            "indicators": indicators,
        }