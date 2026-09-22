const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function getHealth() {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error("Failed to get system health");
  }
  // console.log(response.json()," health api");
  return response.json();
}

export async function analyzeDisease({ file, model, confidence }) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("model", model);
  formData.append("confidence", confidence);

  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Disease analysis failed");
  }

  return response.json();
}

export async function analyzeEnvironment(values) {
  const response = await fetch(`${API_BASE_URL}/environment/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Environment analysis failed");
  }

  return response.json();
}

export async function simulateEnvironment({ mode, rowIndex }) {
  const response = await fetch(`${API_BASE_URL}/environment/simulate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mode,
      row_index: rowIndex,
    }),
  });

  if (!response.ok) {
    throw new Error("Environment simulation failed");
  }

  return response.json();
}

// This is for LLM advisory results.
export async function analyzeWithAI(detections) {
  const response = await fetch(
    "http://127.0.0.1:8000/advisory/multiple",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        detections: detections.map((d) => ({
          disease: d.disease,
          confidence: Number(d.confidence),
        })),
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.detail || "Unable to generate AI advisory."
    );
  }

  return response.json();
}