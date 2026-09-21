import { Menu, Wifi } from "lucide-react";
import { useLocation } from "react-router-dom";
const titles = {
  "/dashboard": ["Dashboard", "Overview"],
  "/disease-detection": ["Disease Detection", "AI image analysis"],
  "/environment": ["Environment", "Hydroponic condition analysis"],
};
export default function Header({ onMenu }) {
  const { pathname } = useLocation();
  const [title, sub] = titles[pathname] || titles["/dashboard"];
  return (
    <header className="header">
      <button className="icon-button menu-button" onClick={onMenu}>
        <Menu size={20} />
      </button>
      <div>
        <div className="breadcrumb">
          Strawberry AI / <span>{title}</span>
        </div>
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
      <div className="gateway-badge">
        <span className="status-dot"></span>
        <Wifi size={15} />
        <span>Gateway</span>
      </div>
    </header>
  );
}
