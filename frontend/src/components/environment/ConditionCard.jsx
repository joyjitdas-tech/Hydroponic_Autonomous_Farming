import { CheckCircle2 } from "lucide-react";
export default function ConditionCard({ condition }) {
  return (
    <div className="condition-card">
      <div className="condition-icon">
        <CheckCircle2 size={20} />
      </div>
      <div>
        <span className="eyebrow">Overall condition</span>
        <h3>{condition?.label || "Awaiting analysis"}</h3>
        {condition?.confidence != null && (
          <p>Model confidence · {(condition.confidence * 100).toFixed(1)}%</p>
        )}
      </div>
    </div>
  );
}
