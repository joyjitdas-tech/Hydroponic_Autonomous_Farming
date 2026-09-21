import { useEffect, useRef, useState } from "react";
import { Play, Square } from "lucide-react";

import { simulateEnvironment } from "../../services/api";

export default function EnvironmentSimulator({ onResult }) {
  const [running, setRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const timerRef = useRef(null);
  const runningRef = useRef(false);

  // Run one recorded dataset row
  const fetchSimulation = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await simulateEnvironment({
        mode: "random",
      });

      const environment = data?.environment || data;

      if (onResult) {
        onResult(environment);
      }

      return true;
    } catch (e) {
      setError(
        e.message || "Simulator endpoint is unavailable through the Gateway.",
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  // Continuous simulation
  const runNext = async () => {
    if (!runningRef.current) {
      return;
    }

    const success = await fetchSimulation();

    if (!success) {
      runningRef.current = false;
      setRunning(false);
      return;
    }

    if (!runningRef.current) {
      return;
    }

    timerRef.current = setTimeout(runNext, 3000);
  };

  // Start
  const startSimulation = async () => {
    if (runningRef.current) {
      return;
    }

    setError("");

    runningRef.current = true;
    setRunning(true);

    await runNext();
  };

  // Stop
  const stopSimulation = () => {
    runningRef.current = false;
    setRunning(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      runningRef.current = false;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <section className="panel simulator">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Recorded data</span>

          <h2>Environment Simulator</h2>

          <p>
            Replays recorded IoT dataset values through the Environment AI
            pipeline.
          </p>
        </div>

        {running && (
          <div className="simulation-status">
            <span className="status-dot" />
            Simulation running
          </div>
        )}
      </div>

      <div className="simulator-controls">
        {!running ? (
          <button
            className="primary-button"
            onClick={startSimulation}
            disabled={loading}
          >
            <Play size={16} />

            {loading ? "Starting..." : "Start simulation"}
          </button>
        ) : (
          <button className="secondary-button" onClick={stopSimulation}>
            <Square size={15} />
            Stop simulation
          </button>
        )}
      </div>

      {running && (
        <p className="simulator-note">
          Reading a new recorded dataset row every 3 seconds.
        </p>
      )}

      {error && (
        <div className="error-box">
          <span>{error}</span>
        </div>
      )}
    </section>
  );
}
