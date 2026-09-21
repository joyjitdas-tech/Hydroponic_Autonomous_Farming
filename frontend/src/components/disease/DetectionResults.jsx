import { ScanSearch } from "lucide-react";
export default function DetectionResults({ detections = [] }) {
  return (
    <section className="panel results-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Analysis</span>
          <h2>Detection Results</h2>
        </div>
        <span className="result-count">
          {detections.length}{" "}
          {detections.length === 1 ? "detection" : "detections"}
        </span>
      </div>
      {detections.length ? (
        <div className="detection-list">
          {detections.map((d, i) => (
            <div className="detection-row" key={`${d.disease}-${i}`}>
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
    </section>
  );
}
