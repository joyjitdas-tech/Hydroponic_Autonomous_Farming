import { useState } from "react";
import { AlertCircle } from "lucide-react";

import SensorForm from "./SensorForm";
import SensorCards from "./SensorCards";
import ConditionCard from "./ConditionCard";
import AnomalyCard from "./AnomalyCard";
import SensorChecks from "./SensorChecks";
import EnvironmentSimulator from "./EnvironmentSimulator";
import PredictionTimeline from "./PredictionTimeline";

import { analyzeEnvironment } from "../../services/api";

const initialValues = {
  pH: "6.5",
  TDS: "1100",
  water_level: "1",
  DHT_temp: "25",
  DHT_humidity: "75",
  water_temp: "21",
};

export default function EnvironmentPage() {
  // -------------------------
  // Manual analysis state
  // -------------------------

  const [manualValues, setManualValues] = useState(initialValues);

  const [manualResult, setManualResult] = useState(null);

  const [manualLoading, setManualLoading] = useState(false);

  const [manualError, setManualError] = useState("");

  // -------------------------
  // Simulation state
  // -------------------------

  const [currentValues, setCurrentValues] = useState(initialValues);

  const [simulationResult, setSimulationResult] = useState(null);

  const [simulationHistory, setSimulationHistory] = useState([]);

  // -------------------------
  // Manual input change
  // -------------------------
  const activeResult = manualResult || simulationResult;
  const change = (key, value) => {
    setManualValues((current) => ({
      ...current,
      [key]: value,
    }));
  };

  // -------------------------
  // Manual analysis
  // -------------------------

  const analyze = async () => {
    setManualLoading(true);
    setManualError("");

    try {
      const payload = {
        ...manualValues,

        pH: Number(manualValues.pH),
        TDS: Number(manualValues.TDS),
        water_level: Number(manualValues.water_level),
        DHT_temp: Number(manualValues.DHT_temp),
        DHT_humidity: Number(manualValues.DHT_humidity),
        water_temp: Number(manualValues.water_temp),
      };

      const data = await analyzeEnvironment(payload);

      setManualResult(data?.environment || data);
    } catch (e) {
      setManualError(e.message || "Unable to analyze environment.");
    } finally {
      setManualLoading(false);
    }
  };

  // -------------------------
  // Simulation result
  // -------------------------

  const handleSimulationResult = (environment) => {
    if (!environment) {
      return;
    }

    const sensorData = environment.sensor_data;
    const analysis = environment.analysis;

    if (!sensorData || !analysis) {
      return;
    }

    // Update ONLY simulated/current sensor values
    setCurrentValues({
      pH: String(sensorData.pH ?? ""),
      TDS: String(sensorData.TDS ?? ""),
      water_level: String(sensorData.water_level ?? ""),
      DHT_temp: String(sensorData.DHT_temp ?? ""),
      DHT_humidity: String(sensorData.DHT_humidity ?? ""),
      water_temp: String(sensorData.water_temp ?? ""),
    });

    // Update ONLY simulation result
    setSimulationResult({
      ...analysis,
      sensor_values: sensorData,
      source: environment.source,
      row_index: environment.row_index,
    });

    // Add simulation prediction to timeline
    const historyItem = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString(),

      rowIndex: environment.row_index,

      condition: analysis.condition?.label || "Unknown",

      confidence: analysis.condition?.confidence ?? 0,

      isAnomaly: analysis.anomaly?.is_anomaly ?? false,

      anomalyScore: analysis.anomaly?.score ?? 0,
    };

    setSimulationHistory((current) => [historyItem, ...current].slice(0, 30));
  };

  return (
    <div className="page environment-page">
      {/* =========================
          PAGE INTRO
      ========================= */}

      <section className="page-intro">
        <div>
          <span className="eyebrow">Environment agent</span>

          <h2>Hydroponic Environment</h2>

          <p>Analyze six sensor values for condition and anomaly status.</p>
        </div>
      </section>

      {/* =========================
          CURRENT SIMULATION RESULT
      ========================= */}

      {/* <div className="condition-grid">
        <ConditionCard condition={simulationResult?.condition} />

        <AnomalyCard anomaly={simulationResult?.anomaly} />
      </div> */}
      <div className="condition-grid">
        <ConditionCard condition={activeResult?.condition} />
        <AnomalyCard anomaly={activeResult?.anomaly} />
      </div>
      {/* =========================
          CURRENT SENSOR VALUES
      ========================= */}

      <section className="panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Current values</span>

            <h2>Sensor Values</h2>

            {simulationResult?.source === "dataset_simulation" && (
              <p>Live values from the recorded IoT dataset.</p>
            )}
          </div>
        </div>

        <SensorCards values={currentValues} />
      </section>

      {/* =========================
          MANUAL ANALYSIS
      ========================= */}

      <section className="panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Manual input</span>

            <h2>Environment Analysis</h2>

            <p>Enter the current sensor readings.</p>
          </div>
        </div>

        <SensorForm
          values={manualValues}
          onChange={change}
          onSubmit={analyze}
          loading={manualLoading}
        />

        {manualError && (
          <div className="error-box">
            <AlertCircle size={17} />

            <span>{manualError}</span>
          </div>
        )}

        {/* Manual result */}

        {/* {manualResult && (
          <div className="manual-result">
            <div className="manual-result-header">
              <span className="eyebrow">Manual analysis result</span>

              <strong>{manualResult.condition?.label || "Unknown"}</strong>
            </div>

            <div className="manual-result-details">
              <span>Confidence</span>

              <strong>
                {((manualResult.condition?.confidence || 0) * 100).toFixed(2)}%
              </strong>

              <span>Anomaly</span>

              <strong>
                {manualResult.anomaly?.is_anomaly ? "Detected" : "Normal"}
              </strong>
            </div>
          </div>
        )} */}
      </section>

      {/* =========================
          MANUAL SENSOR CHECKS
      ========================= */}

      <SensorChecks checks={manualResult?.sensor_checks} />

      {/* =========================
          SIMULATOR
      ========================= */}

      <EnvironmentSimulator onResult={handleSimulationResult} />

      {/* =========================
          SIMULATION TIMELINE
      ========================= */}

      <PredictionTimeline history={simulationHistory} />
    </div>
  );
}
