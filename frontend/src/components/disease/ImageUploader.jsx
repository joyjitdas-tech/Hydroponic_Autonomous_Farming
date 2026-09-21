import { useRef, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
export default function ImageUploader({ file, onFile }) {
  const ref = useRef(null),
    [drag, setDrag] = useState(false);
  const select = (f) => {
    if (!f) return;
    if (!f.type.startsWith("image/"))
      return alert("Please select an image file.");
    if (f.size > 10 * 1024 * 1024)
      return alert("Image must be 10 MB or smaller.");
    onFile(f);
  };
  return (
    <div className="upload-wrap">
      {!file ? (
        <div
          className={`dropzone ${drag ? "dragging" : ""}`}
          onClick={() => ref.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            select(e.dataTransfer.files?.[0]);
          }}
        >
          <div className="upload-icon">
            <Upload size={21} />
          </div>
          <strong>Drop a strawberry image here</strong>
          <span>or click to browse · JPG, PNG, WEBP · max 10 MB</span>
          <input
            ref={ref}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => select(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div className="selected-file">
          <div className="file-icon">
            <ImagePlus size={20} />
          </div>
          <div>
            <strong>{file.name}</strong>
            <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
          <button className="icon-button" onClick={() => onFile(null)}>
            <X size={17} />
          </button>
        </div>
      )}
    </div>
  );
}
