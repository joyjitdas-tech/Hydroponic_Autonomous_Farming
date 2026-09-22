export default function LLMResult({ advisories = [] }) {
  if (!advisories.length) {
    return null;
  }

  return (
    <section className="panel llm-result-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">AI Assistant</span>
          <h2>AI Recommendations</h2>
        </div>
      </div>

      <div className="llm-advisory-list">
        {advisories.map((item, index) => (
          <div
            className="llm-advisory"
            key={`${item.disease}-${index}`}
          >
            <div className="llm-disease-header">
              <h3>{item.disease}</h3>

              {item.confidence !== null &&
                item.confidence !== undefined && (
                  <span>
                    {(Number(item.confidence) * 100).toFixed(2)}%
                  </span>
                )}
            </div>

            <div className="advisory-section">
              <h4>Summary</h4>
              <p>{item.advisory?.summary}</p>
            </div>

            <div className="advisory-section">
              <h4>Symptoms</h4>

              <ul>
                {item.advisory?.symptoms?.map((symptom, i) => (
                  <li key={i}>{symptom}</li>
                ))}
              </ul>
            </div>

            <div className="advisory-section">
              <h4>Prevention</h4>

              <ul>
                {item.advisory?.prevention?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="advisory-section">
              <h4>Management</h4>

              <ul>
                {item.advisory?.management?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="advisory-section">
              <h4>Hydroponic Considerations</h4>

              <ul>
                {item.advisory?.hydroponic_considerations?.map(
                  (item, i) => (
                    <li key={i}>{item}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}