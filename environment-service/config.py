from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "models"


# CNN
HEALTH_MODEL_PATH = MODEL_DIR / "health_cnn.keras"
HEALTH_SCALER_PATH = MODEL_DIR / "health_scaler.pkl"
HEALTH_CONFIG_PATH = MODEL_DIR / "health_config.json"


# Isolation Forest
ANOMALY_MODEL_PATH = MODEL_DIR / "isolation_forest_environment.pkl"
ANOMALY_SCALER_PATH = MODEL_DIR / "environment_scaler.pkl"


# Sensor features used by the CNN
HEALTH_FEATURES = [
    "pH",
    "TDS",
    "water_level",
    "DHT_temp",
    "DHT_humidity",
    "water_temp",
]


# Features used by Isolation Forest
ANOMALY_FEATURES = [
    "pH",
    "TDS",
    "DHT_temp",
    "DHT_humidity",
    "water_temp",
]


# Reference ranges used only by the Rule Engine->used from kaggle notebook have to check later
HEALTH_THRESHOLDS = {
    "pH": {
        "min": 5.5,
        "max": 7.0,
    },
    "TDS": {
        "min": 800,
        "max": 1500,
    },
    "DHT_temp": {
        "min": 18,
        "max": 28,
    },
    "DHT_humidity": {
        "min": 50,
        "max": 90,
    },
    "water_temp": {
        "min": 16,
        "max": 26,
    },
}