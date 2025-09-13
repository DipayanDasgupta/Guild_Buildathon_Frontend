"use client";
import { LayoutDashboard, Users, FileText } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>InsureAgent</h2>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>
        <a href="#">
          <Users size={20} />
          <span>Clients</span>
        </a>
        <a href="#">
          <FileText size={20} />
          <span>Documents</span>
        </a>
      </nav>
      <div className="sidebar-footer">
        <div className="avatar">AS</div>
        <div>
          <p>Agent Smith</p>
          <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>agent@insurance.com</p>
        </div>
      </div>
    </aside>
  );
}
