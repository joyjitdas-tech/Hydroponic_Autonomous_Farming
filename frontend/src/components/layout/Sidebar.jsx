import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Leaf,
  Droplets,
  Sprout,
  BookOpen,
  BrainCircuit,
  X,
} from "lucide-react";

const primary = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/disease-detection", label: "Disease Detection", icon: Leaf },
  { to: "/environment", label: "Environment", icon: Droplets },
];
const future = [
  { label: "Growth", icon: Sprout },
  { label: "Knowledge", icon: BookOpen },
  { label: "Decision", icon: BrainCircuit },
];

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-mark"></div>
        <div>
          <strong>Strawberry AI</strong>
          <span>Hydroponic System</span>
        </div>
        <button className="icon-button mobile-close" onClick={onClose}>
          <X size={19} />
        </button>
      </div>
      <nav className="nav-section">
        <span className="nav-label">Workspace</span>
        {primary.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <nav className="nav-section future-nav">
        <span className="nav-label">Coming soon</span>
        {future.map(({ label, icon: Icon }) => (
          <div className="nav-link disabled" key={label}>
            <Icon size={18} />
            <span>{label}</span>
            <em>Soon</em>
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="status-dot"></div>
        <div>
          <strong>System online</strong>
          <span>Gateway workspace</span>
        </div>
      </div>
    </aside>
  );
}
