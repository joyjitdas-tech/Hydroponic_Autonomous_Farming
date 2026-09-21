import { Activity, Droplets, Thermometer, Waves } from "lucide-react";
const meta = [
  ["pH", "pH", ""],
  ["TDS", "TDS", "ppm"],
  ["water_level", "Water level", ""],
  ["DHT_temp", "Air temperature", "°C"],
  ["DHT_humidity", "Humidity", "%"],
  ["water_temp", "Water temperature", "°C"],
];
const icons = {
  pH: Activity,
  TDS: Waves,
  water_level: Droplets,
  DHT_temp: Thermometer,
  DHT_humidity: Activity,
  water_temp: Thermometer,
};
export default function SensorCards({ values }) {
  return (
    <div className="sensor-grid">
      {meta.map(([key, label, unit]) => {
        const Icon = icons[key];
        return (
          <div className="sensor-card" key={key}>
            <div className="sensor-icon">
              <Icon size={17} />
            </div>
            <span>{label}</span>
            <strong>
              {values?.[key] ?? "—"} {unit && <small>{unit}</small>}
            </strong>
          </div>
        );
      })}
    </div>
  );
}
