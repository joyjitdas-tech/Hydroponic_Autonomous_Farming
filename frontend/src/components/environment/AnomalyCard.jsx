import { ShieldAlert, ShieldCheck } from "lucide-react";
export default function AnomalyCard({ anomaly }) {
  const bad = anomaly?.is_anomaly;
  return (
    <div className={`anomaly-card ${bad ? "anomaly" : ""}`}>
      <div className="anomaly-icon">
        {bad ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
      </div>
      <div>
        <span className="eyebrow">Anomaly detection</span>
        <h3>
          {anomaly
            ? bad
              ? "Anomaly detected"
              : "No anomaly detected"
            : "Awaiting analysis"}
        </h3>
        {anomaly && (
          <p>
            {anomaly.reason ||
              `Score · ${Number(anomaly.score || 0).toFixed(3)}`}
          </p>
        )}
      </div>
    </div>
  );
}
