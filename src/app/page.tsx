"use client";
import { useState } from 'react';
import { Sidebar } from "@/components/sidebar";
import { DocumentUpload } from "@/components/document-upload";
import { ClientsTable } from "@/components/clients-table";
import { StatsCards } from "@/components/stats-cards";
import { QuickActions } from "@/components/quick-actions";

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="page-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
        <div className="dashboard-header">
          <h1>Turtlemint Dashboard</h1>
          <p>Welcome back, Vijay</p>
        </div>
        <StatsCards />
        <QuickActions />
        <DocumentUpload />
        <ClientsTable />
      </main>
    </div>
  );
}