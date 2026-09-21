from pydantic import BaseModel, Field


class SensorInput(BaseModel):
    pH: float = Field(..., description="Water pH")
    TDS: float = Field(..., description="Total dissolved solids")
    water_level: float = Field(..., description="Water level")
    DHT_temp: float = Field(..., description="Air temperature")
    DHT_humidity: float = Field(..., description="Air humidity")
    water_temp: float = Field(..., description="Water temperature")


class ConditionResult(BaseModel):
    label: str
    confidence: float


class SensorCheck(BaseModel):
    value: float
    status: str | None = None


class AnomalyResult(BaseModel):
    is_anomaly: bool
    score: float
    reason: str | None = None
    indicators: list[str] = []


class EnvironmentResponse(BaseModel):
    condition: ConditionResult
    sensor_checks: dict[str, SensorCheck]
    anomaly: AnomalyResult