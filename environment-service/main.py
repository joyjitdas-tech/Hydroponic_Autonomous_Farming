from fastapi import FastAPI, HTTPException

from environment_agent import EnvironmentAgent
from simulator import EnvironmentSimulator
from schemas import SensorInput, EnvironmentResponse


app = FastAPI(
    title="Hydroponic Strawberry Environment Service",
    description="Environment analysis service for the Strawberry AI System",
    version="1.0.0",
)


# Load models and dataset once when the service starts
agent = EnvironmentAgent()
simulator = EnvironmentSimulator()


@app.get("/")
def root():
    return {
        "service": "environment-service",
        "status": "running",
        "port": 8002,
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "environment-service",
    }


@app.post("/analyze", response_model=EnvironmentResponse)
def analyze(sensor_data: SensorInput):
    return agent.analyze(sensor_data.model_dump())


@app.post("/simulate")
def simulate(
    mode: str = "random",
    row_index: int | None = None,
):
    try:
        if mode == "random":
            sensor_data = simulator.simulate_random()

        elif mode == "row":
            if row_index is None:
                raise HTTPException(
                    status_code=400,
                    detail="row_index is required when mode='row'",
                )

            sensor_data = simulator.simulate_row(row_index)

        else:
            raise HTTPException(
                status_code=400,
                detail="mode must be 'random' or 'row'",
            )

        analysis = agent.analyze(sensor_data)

        return {
            "source": "dataset_simulation",
            "row_index": row_index,
            "sensor_data": sensor_data,
            "analysis": analysis,
        }

    except HTTPException:
        raise

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )