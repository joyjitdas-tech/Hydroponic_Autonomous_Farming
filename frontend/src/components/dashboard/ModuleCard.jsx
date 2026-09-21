import { ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
export default function ModuleCard({
  title,
  description,
  status = "Ready",
  details,
  to,
  icon: Icon,
}) {
  const ready = status === "Ready";
  return (
    <div className="module-card">
      <div className="module-icon">
        <Icon size={20} />
      </div>
      <div className="module-body">
        <div className="module-top">
          <h3>{title}</h3>
          <span className={`pill ${ready ? "pill-ready" : "pill-soon"}`}>
            {ready ? <CheckCircle2 size={13} /> : <Clock3 size={13} />} {status}
          </span>
        </div>
        <p>{description}</p>
        {details && <span className="module-detail">{details}</span>}
        {to && (
          <a className="text-action" href={to}>
            Open module <ArrowRight size={15} />
          </a>
        )}
      </div>
    </div>
  );
}
