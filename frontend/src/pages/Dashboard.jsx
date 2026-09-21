import { useEffect, useState } from "react";
import { ArrowRight, Droplets, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getHealth } from "../services/api";
import ModuleCard from "../components/dashboard/ModuleCard";
import ServiceStatus from "../components/dashboard/ServiceStatus";
export default function Dashboard() {
  const [health, setHealth] = useState(null),
    [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getHealth()
      .then(setHealth)
      .catch(() => setHealth(null))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="page dashboard-page">
      <section className="hero">
        <div>
          <span className="eyebrow">Hydroponic cultivation</span>
          <h2>Strawberry AI System</h2>
          <p>
            AI-powered monitoring and analysis for healthier strawberry
            cultivation.
          </p>
        </div>
        <div className={`hero-status ${health ? "online" : "offline"}`}>
          <span className="status-dot"></span>
          {health ? "Gateway connected" : "Gateway unavailable"}
        </div>
      </section>
      <div className="dashboard-grid">
        <div className="overview">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Workspace</span>
              <h2>Available modules</h2>
            </div>
          </div>
          <div className="module-grid">
            <ModuleCard
              title="Disease Detection"
              description="Analyze strawberry images and identify visible diseases."
              details="YOLOv8s · RT-DETR-L"
              to="/disease-detection"
              icon={Leaf}
            />
            <ModuleCard
              title="Environment"
              description="Analyze hydroponic sensor conditions and anomalies."
              details="6 sensor inputs"
              to="/environment"
              icon={Droplets}
            />
            <ModuleCard
              title="Growth"
              description="Growth monitoring and planning will be added later."
              status="Coming soon"
              icon={Leaf}
            />
          </div>
        </div>
        <ServiceStatus health={health} loading={loading} />
      </div>
      <section className="quick-panel">
        <div>
          <span className="eyebrow">Quick access</span>
          <h2>Start an analysis</h2>
          <p>Go directly to the workflow you want to use.</p>
        </div>
        <div className="quick-actions">
          <button
            onClick={() => navigate("/disease-detection")}
            className="primary-button"
          >
            Analyze strawberry image <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate("/environment")}
            className="secondary-button"
          >
            Analyze environment <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
