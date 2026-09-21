import { CheckCircle2, CircleAlert } from "lucide-react";
export default function SensorChecks({ checks }) {
  if (!checks) return null;
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Validation</span>
          <h2>Sensor Checks</h2>
        </div>
      </div>
      <div className="checks-list">
        {Object.entries(checks).map(([key, item]) => {
          const ok =
            item?.status === "within_range" || item?.status === "normal";
          return (
            <div className="check-row" key={key}>
              <span className={ok ? "check-ok" : "check-bad"}>
                {ok ? <CheckCircle2 size={16} /> : <CircleAlert size={16} />}
              </span>
              <strong>{key.replaceAll("_", " ")}</strong>
              <span>{item?.status?.replaceAll("_", " ") || "Recorded"}</span>
              <b>{item?.value ?? "—"}</b>
            </div>
          );
        })}
      </div>
    </section>
  );
}
