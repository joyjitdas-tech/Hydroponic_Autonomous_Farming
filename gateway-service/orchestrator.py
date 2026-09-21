import httpx


DISEASE_SERVICE_URL = "http://127.0.0.1:8001"
ENVIRONMENT_SERVICE_URL = "http://127.0.0.1:8002"


# -------------------------
# Disease Service
# -------------------------

async def disease_prediction(
    file_bytes: bytes,
    filename: str,
    content_type: str,
    model: str,
    confidence: float,
) -> dict:

    files = {
        "file": (
            filename,
            file_bytes,
            content_type,
        )
    }

    data = {
        "model": model,
        "confidence": str(confidence),
    }

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            f"{DISEASE_SERVICE_URL}/predict",
            files=files,
            data=data,
        )

    response.raise_for_status()

    return response.json()


# -------------------------
# Environment Analysis
# -------------------------

async def environment_analysis(sensor_data: dict) -> dict:

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            f"{ENVIRONMENT_SERVICE_URL}/analyze",
            json=sensor_data,
        )

    response.raise_for_status()

    return response.json()


# -------------------------
# Environment Simulation
# -------------------------

async def environment_simulation(simulation_data: dict) -> dict:

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            f"{ENVIRONMENT_SERVICE_URL}/simulate",
            json=simulation_data,
        )

    response.raise_for_status()

    return response.json()