import { Activity } from "lucide-react";

export default function PredictionTimeline({ history }) {
  if (!history || history.length === 0) {
    return null;
  }

  return (
    <section className="panel prediction-history">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Simulation history</span>

          <h2>Prediction Timeline</h2>

          <p>Recent predictions generated from recorded IoT sensor data.</p>
        </div>

        <Activity size={20} />
      </div>

      <div className="prediction-table">
        <div className="prediction-header">
          <span>Time</span>
          <span>Condition</span>
          <span>Confidence</span>
          <span>Anomaly</span>
        </div>

        {history.map((item) => (
          <div className="prediction-row" key={item.id}>
            <span>{item.timestamp}</span>

            <span>{item.condition}</span>

            <span>{(item.confidence * 100).toFixed(2)}%</span>

            <span
              className={
                item.isAnomaly ? "prediction-anomaly" : "prediction-normal"
              }
            >
              {item.isAnomaly ? "Detected" : "Normal"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
