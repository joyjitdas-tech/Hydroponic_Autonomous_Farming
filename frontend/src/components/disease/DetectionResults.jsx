import { useState } from "react";
import {
  LoaderCircle,
  ScanSearch,
  Sparkles,
} from "lucide-react";

import { analyzeWithAI } from "../../services/api";
import LLMResult from "./LLMResult";

export default function DetectionResults({
  detections = [],
  inferenceTimeMs,
  energyJoules,
  carbonFootprint,
}) {
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const handleAIAnalysis = async () => {
    if (!detections.length) return;

    setAiLoading(true);
    setAiError("");
    setAiResult(null);

    try {
      const data = await analyzeWithAI(detections);

      setAiResult(data);
    } catch (error) {
      setAiError(
        error.message || "Unable to generate AI recommendations."
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      <section className="panel results-panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Analysis</span>
            <h2>Detection Results</h2>
          </div>

          <span className="result-count">
            {detections.length}{" "}
            {detections.length === 1
              ? "detection"
              : "detections"}
          </span>
        </div>

        {detections.length ? (
          <div className="detection-list">
            {detections.map((d, i) => (
              <div
                className="detection-row"
                key={`${d.disease}-${i}`}
              >
                <div className="disease-mark">
                  <ScanSearch size={17} />
                </div>

                <div className="disease-name">
                  <strong>{d.disease}</strong>
                  <span>Detected region {i + 1}</span>
                </div>

                <strong className="confidence">
                  {(Number(d.confidence) * 100).toFixed(2)}%
                </strong>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-results">
            No disease detected in the submitted image.
          </div>
        )}

        {(inferenceTimeMs !== undefined ||
          energyJoules !== undefined ||
          carbonFootprint !== undefined) && (
          <div className="analysis-metrics">
            {inferenceTimeMs !== undefined && (
              <div className="metric-item">
                <span className="metric-label">
                  Inference Time
                </span>

                <strong className="metric-value">
                  {Number(inferenceTimeMs).toFixed(2)} ms
                </strong>
              </div>
            )}

            {energyJoules !== undefined && (
              <div className="metric-item">
                <span className="metric-label">
                  Energy Consumption
                </span>

                <strong className="metric-value">
                  {Number(energyJoules).toFixed(2)} J
                </strong>
              </div>
            )}

            {carbonFootprint !== undefined && (
              <div className="metric-item">
                <span className="metric-label">
                  Carbon Footprint
                </span>

                <strong className="metric-value">
                  {Number(carbonFootprint).toFixed(6)} gCO₂e
                </strong>
              </div>
            )}
          </div>
        )}

        {/* AI BUTTON */}
        {detections.length > 0 && (
          <div className="ai-analysis-action">
            <button
              className="primary-button"
              onClick={handleAIAnalysis}
              disabled={aiLoading}
            >
              {aiLoading ? (
                <>
                  <LoaderCircle
                    size={17}
                    className="spin_llm_button"
                  />
                  Generating AI Analysis…
                </>
              ) : (
                <>
                  <Sparkles size={17} />
                  Analyze with AI
                </>
              )}
            </button>
          </div>
        )}

        {aiError && (
          <div className="error-box">
            <span>{aiError}</span>
          </div>
        )}
      </section>

      {/* LLM RESULT */}
      {aiResult && (
        <LLMResult
          advisories={aiResult.advisories || []}
        />
      )}
    </>
  );
}