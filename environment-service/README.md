# Hydroponic Strawberry Environment Service

Environment analysis microservice for the **Strawberry AI System**.

This service analyzes hydroponic environmental sensor data using three components:

* Health CNN
* Rule Engine
* Isolation Forest

It provides manual sensor analysis and dataset-based simulation through a FastAPI API.

---

## Architecture

```text
Gateway :8000
      │
      ▼
Environment Service :8002
      │
      ├── Health CNN
      ├── Rule Engine
      └── Isolation Forest
```

The frontend should communicate with the **Gateway**, not directly with this service.

---

## Project Structure

```text
environment-service/
│
├── data/
│   └── IoTData --Raw--.csv
│
├── models/
│   ├── health_cnn.keras
│   ├── health_scaler.pkl
│   ├── health_config.json
│   ├── isolation_forest_environment.pkl
│   └── environment_scaler.pkl
│
├── config.py
├── schemas.py
├── health_predictor.py
├── rule_engine.py
├── anomaly_detector.py
├── environment_agent.py
├── simulator.py
├── main.py
├── requirements.txt
├── .gitignore
└── README.md
```

The dataset and trained model files are ignored by Git and must be provided locally.

---

## Requirements

* Python 3.13
* FastAPI
* Uvicorn
* TensorFlow
* NumPy
* Pandas
* Scikit-learn
* Joblib
* Pydantic

Install dependencies:

```powershell
pip install -r requirements.txt
```

---

## Dataset

The simulator uses the recorded IoT dataset:

```text
IoTData --Raw--.csv
```

Place it at:

```text
data/IoTData --Raw--.csv
```

The dataset is intentionally excluded from GitHub through `.gitignore`.

Required sensor columns:

```text
pH
TDS
water_level
DHT_temp
DHT_humidity
water_temp
```

The simulator selects recorded sensor rows rather than generating synthetic random sensor values.

---

## Models

The service uses two trained ML pipelines.

### Health CNN

Input features:

```text
pH
TDS
water_level
DHT_temp
DHT_humidity
water_temp
```

Required files:

```text
models/health_cnn.keras
models/health_scaler.pkl
models/health_config.json
```

The CNN returns:

```text
Healthy
or
Unhealthy
```

with a confidence value.

### Isolation Forest

Input features:

```text
pH
TDS
DHT_temp
DHT_humidity
water_temp
```

Required files:

```text
models/isolation_forest_environment.pkl
models/environment_scaler.pkl
```

It identifies statistically unusual combinations of environmental sensor values.

---

## API

The service runs on:

```text
http://127.0.0.1:8002
```

### Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "healthy",
  "service": "environment-service"
}
```

---

### Environment Analysis

```http
POST /analyze
```

Example request:

```json
{
  "pH": 6.5,
  "TDS": 1100,
  "water_level": 1,
  "DHT_temp": 25,
  "DHT_humidity": 75,
  "water_temp": 21
}
```

The request is processed by:

```text
Sensor Input
     │
     ▼
EnvironmentAgent
     │
     ├── Health CNN
     ├── Rule Engine
     └── Isolation Forest
     │
     ▼
Environment Analysis
```

---

### Dataset Simulation

```http
POST /simulate
```

The simulator selects a recorded row from:

```text
IoTData --Raw--.csv
```

and sends the sensor values through the same `EnvironmentAgent` pipeline.

The simulator supports:

```text
random recorded row
specific dataset row
```

---

## Swagger Documentation

After starting the service, API documentation is available at:

```text
http://127.0.0.1:8002/docs
```

---

## Running the Service

Activate the virtual environment:

```powershell
.\.venv\Scripts\Activate.ps1
```

Start FastAPI:

```powershell
uvicorn main:app --host 127.0.0.1 --port 8002 --reload
```

The service will be available at:

```text
http://127.0.0.1:8002
```

---

## Integration

The intended architecture is:

```text
React Frontend
      │
      ▼
Gateway :8000
      │
      ▼
Environment Service :8002
```

The React frontend should **not directly call port 8002**.

The Gateway exposes the Environment API to the frontend.

---

## Environment Analysis Components

### Health CNN

Provides the overall environmental condition:

```text
Healthy
Unhealthy
```

### Rule Engine

Checks individual sensor values against the configured reference ranges.

Possible statuses include:

```text
within_range
below_range
above_range
```

### Isolation Forest

Detects statistically unusual multivariate sensor combinations.

Its anomaly result should be interpreted as a **statistical anomaly**, not automatically as proof of plant disease or an agricultural problem.

---

## Dataset and Model Files

The following files are intentionally excluded from GitHub:

```text
data/*.csv
models/*.keras
models/*.h5
models/*.pkl
models/*.joblib
```

Before running the service, make sure the required dataset and model artifacts exist locally.

---

## License

This service is part of the Strawberry AI System project.
