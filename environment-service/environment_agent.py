from health_predictor import HealthPredictor
from rule_engine import RuleEngine
from anomaly_detector import AnomalyDetector


class EnvironmentAgent:
    def __init__(self):
        self.health_predictor = HealthPredictor()
        self.rule_engine = RuleEngine()
        self.anomaly_detector = AnomalyDetector()

    def analyze(self, sensor_data: dict) -> dict:
        # 1. CNN → overall environmental condition
        condition = self.health_predictor.predict(sensor_data)

        # 2. Rule Engine → individual sensor checks
        sensor_checks = self.rule_engine.check(sensor_data)

        # 3. Isolation Forest → statistical anomaly detection
        anomaly = self.anomaly_detector.detect(sensor_data)

        return {
            "condition": condition,
            "sensor_checks": sensor_checks,
            "anomaly": anomaly,
        }