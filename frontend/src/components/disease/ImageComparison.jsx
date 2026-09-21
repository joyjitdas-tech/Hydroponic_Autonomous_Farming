export default function ImageComparison({ original, result }) {
  if (!original && !result) return null;
  return (
    <div className="image-comparison">
      {original && (
        <div className="image-card">
          <div className="image-card-head">
            <strong>Original</strong>
          </div>
          <img src={original} alt="Original strawberry" />
        </div>
      )}
      {result && (
        <div className="image-card">
          <div className="image-card-head">
            <strong>Detection result</strong>
            <span>AI annotated</span>
          </div>
          <img src={result} alt="Annotated strawberry detection" />
        </div>
      )}
    </div>
  );
}
