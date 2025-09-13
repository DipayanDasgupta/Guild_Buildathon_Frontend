"use client";
import { LayoutDashboard, Users, FileText, Calculator, Building2, Smartphone, TrendingUp, Shield } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo"></div>
        <h2>Turtlemint</h2>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="active"><LayoutDashboard size={20} /><span>Dashboard</span></a>
        <a href="#"><Calculator size={20} /><span>Get Quote</span></a>
        <a href="#"><Users size={20} /><span>Advisors</span></a>
        <a href="#"><Shield size={20} /><span>Products</span></a>
        <a href="#"><Smartphone size={20} /><span>TurtlemintPro</span></a>
        <a href="#"><Building2 size={20} /><span>B2B Solutions</span></a>
        <a href="#"><TrendingUp size={20} /><span>Analytics</span></a>
        <a href="#"><FileText size={20} /><span>Documents</span></a>
      </nav>
      <div className="sidebar-footer">
        <div className="avatar">V</div>
        <div><p>Vijay Kumar</p><p style={{fontSize: '0.8rem', color: '#9ca3af'}}>Expert Advisor</p></div>
      </div>
    </aside>
  );
}
