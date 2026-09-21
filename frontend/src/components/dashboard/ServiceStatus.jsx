import { CheckCircle2, CircleAlert, Server } from "lucide-react";
export default function ServiceStatus({ health, loading }) {
  const gateway = !!health;
  
  const services = health?.services || {};
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">System status</span>
          <h2>Services</h2>
        </div>
        <Server size={19} />
      </div>
      <div className="service-list">
        <Service name="Gateway" ok={gateway} loading={loading} />
        <Service
          name="Disease Detection"
          ok={gateway && !!services.disease_detection}
          loading={loading}
        />
        <Service
          name="Environment"
          ok={gateway && !!services.environment}
          loading={loading}
        />
      </div>
    </section>
  );
}
function Service({ name, ok, loading }) {
    
  return (
    <div className="service-row">
      <span className={`service-indicator ${ok ? "ok" : "bad"}`}>
        {ok ? <CheckCircle2 size={16} /> : <CircleAlert size={16} />}
      </span>
      <span>{name}</span>
      <span className={`service-state ${ok ? "" : "offline"}`}>
        {loading ? "Checking…" : ok ? "Available" : "Unavailable"}
      </span>
    </div>
  );
}
