import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
export default function AppLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="app-shell">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="main-shell">
        <Header onMenu={() => setOpen(true)} />
        <main className="content">{children}</main>
      </div>
      {open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
