const fields = [
  ["pH", "pH", "Water pH", "6.5"],
  ["TDS", "TDS", "Total dissolved solids", "1100"],
  ["water_level", "Water level", "Water level indicator", "1"],
  ["DHT_temp", "Air temperature", "DHT temperature · °C", "25"],
  ["DHT_humidity", "Air humidity", "DHT humidity · %", "75"],
  ["water_temp", "Water temperature", "Water temperature · °C", "21"],
];
export default function SensorForm({ values, onChange, onSubmit, loading }) {
  return (
    <div className="sensor-form">
      {fields.map(([key, label, help, placeholder]) => (
        <label className="field" key={key}>
          <span>{label}</span>
          <small>{help}</small>
          <input
            type="number"
            step="any"
            value={values[key]}
            placeholder={placeholder}
            onChange={(e) => onChange(key, e.target.value)}
          />
        </label>
      ))}
      <button
        className="primary-button form-submit"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Analyzing…" : "Analyze Environment"}
      </button>
    </div>
  );
}
