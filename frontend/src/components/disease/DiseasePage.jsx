import { useEffect, useState } from "react";
import { AlertCircle, LoaderCircle, Sparkles } from "lucide-react";
import ModelSelector from "./ModelSelector";
import ImageUploader from "./ImageUploader";
import ImageComparison from "./ImageComparison";
import DetectionResults from "./DetectionResults";
import { analyzeDisease } from "../../services/api";
export default function DiseasePage() {
  const [file, setFile] = useState(null),
    [preview, setPreview] = useState(null),
    [model, setModel] = useState("yolov8s"),
    [confidence, setConfidence] = useState(0.25),
    [result, setResult] = useState(null),
    [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const u = URL.createObjectURL(file);
    setPreview(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);
  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await analyzeDisease({ file, model, confidence });
      setResult(data?.disease_detection || data);
    } catch (e) {
      setError(e.message || "Unable to analyze the image.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="page disease-page">
      <section className="page-intro">
        <div>
          <span className="eyebrow">Computer vision</span>
          <h2>Strawberry Disease Detection</h2>
          <p>Upload a strawberry image to identify visible disease regions.</p>
        </div>
      </section>
      <section className="panel analysis-panel">
        <div className="control-block">
          <div className="control-label">
            <div>
              <strong>Detection model</strong>
              <span>Choose the model for this analysis.</span>
            </div>
          </div>
          <ModelSelector
            model={model}
            onChange={(m) => {
              setModel(m);
              setResult(null);
            }}
          />
        </div>
        <div className="control-block">
          <div className="control-label">
            <div>
              <strong>Confidence threshold</strong>
              <span>Only detections above this threshold are returned.</span>
            </div>
            <span className="threshold-value">
              {Math.round(confidence * 100)}%
            </span>
          </div>
          <input
            className="range"
            type="range"
            min="0.1"
            max="0.9"
            step="0.05"
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
          />
        </div>
        <div className="control-block">
          <div className="control-label">
            <div>
              <strong>Image</strong>
              <span>Use a clear image of the strawberry plant or fruit.</span>
            </div>
          </div>
          <ImageUploader
            file={file}
            onFile={(f) => {
              setFile(f);
              setResult(null);
              setError("");
            }}
          />
        </div>
        <button
          className="primary-button analyze-button"
          disabled={!file || loading}
          onClick={analyze}
        >
          {loading ? (
            <>
              <LoaderCircle size={17} className="spin" />
              Analyzing image…
            </>
          ) : (
            <>
              <Sparkles size={17} />
              Analyze Image
            </>
          )}
        </button>
        {error && (
          <div className="error-box">
            <AlertCircle size={17} />
            <span>{error}</span>
          </div>
        )}
      </section>
      {!result && !loading && !preview && (
        <div className="empty-page">
          <Sparkles size={20} />
          <strong>No prediction yet</strong>
          <span>Upload a strawberry image to begin detection.</span>
        </div>
      )}
      {preview && (
        <ImageComparison original={preview} result={result?.annotated_image} />
      )}{" "}
      {loading && (
        <div className="loading-box">
          <LoaderCircle size={19} className="spin" />
          <span>Running the selected model…</span>
        </div>
      )}
      {result && (
        <DetectionResults
          detections={result.detections || []}
          inferenceTimeMs={result.inference_time_ms}
          energyJoules={result.energy_joules}
          carbonFootprint={result.carbon_footprint_gco2e}
        />
      )}
    </div>
  );
}
