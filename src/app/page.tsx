"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, ChevronLeft, Shield, Car, Bike, Heart, ChevronDown, Repeat, CheckCircle, Clock, UserPlus } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { DocumentUpload } from "@/components/document-upload";
import { ClientsTable } from "@/components/clients-table";
import { StatsCards } from "@/components/stats-cards";
import { QuickActions } from "@/components/quick-actions";
import { ThemeToggle } from '@/components/theme-toggle';

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    // Fetch dashboard stats from your new backend endpoint
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="page-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
        <div className="dashboard-header">
          <h1>Turtlemint Dashboard</h1>
          <p>Welcome back, Vijay</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-main-column">
            {/* Stats Cards */}
            <StatsCards />

            {/* Quick Actions */}
            <QuickActions />

            {/* Conversions Pie Chart (Placeholder) */}
            <div className="card">
              <h3>Conversions (Monthly Target)</h3>
              <p>{stats.conversions || 0} / {stats.monthlyTarget || 50}</p>
              {/* A real chart library like Recharts would go here */}
            </div>

            {/* Follow-ups */}
            <div className="card">
              <h3>Today's Follow-ups</h3>
              <p>You have {stats.followUpsToday || 0} calls scheduled for today.</p>
            </div>
          </div>

          <div className="dashboard-side-column">
            {/* Notifications */}
            <div className="card">
              <h3>Notifications</h3>
              <ul>
                <li>{stats.renewalsDue || 0} policies up for renewal soon.</li>
                <li>{stats.claimsNeedDocs || 0} claims need document submission.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <DocumentUpload />

        {/* Clients Table */}
        <ClientsTable />
      </main>
    </div>
  );
}