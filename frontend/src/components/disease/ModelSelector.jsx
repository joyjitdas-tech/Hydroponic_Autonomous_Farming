export default function ModelSelector({ model, onChange }) {
  return (
    <div className="model-selector">
      <button
        className={model === "yolov8s" ? "selected" : ""}
        onClick={() => onChange("yolov8s")}
      >
        <strong>YOLOv8s</strong>
        <span>Fast / Real-Time</span>
      </button>
      <button
        className={model === "rtdetr" ? "selected" : ""}
        onClick={() => onChange("rtdetr")}
      >
        <strong>RT-DETR-L</strong>
        <span>Higher Detection Accuracy</span>
      </button>
    </div>
  );
}
