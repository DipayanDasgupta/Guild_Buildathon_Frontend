"use client";
import { useState, useEffect } from 'react';
import { Sidebar } from "@/components/sidebar";
import { MenuButton } from '@/components/MenuButton';
import { ConversionsChart } from '@/components/ConversionsChart'; // We will create this
import { FollowUpList } from '@/components/FollowUpList';   // We will create this
import { Notifications } from '@/components/Notifications'; // We will create this
import { DocumentUpload } from '@/components/document-upload';

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="page-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
        <header className="page-header">
          <MenuButton isOpen={sidebarCollapsed} onClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <div className="header-title">
            <h1>Insure-Agent AI</h1>
            <p className="header-subtitle">Your Intelligent Assistant Dashboard</p>
          </div>
          <p className="header-user-welcome">Welcome back, Vijay</p>
        </header>

        {/* This is the final layout from your notes */}
        <div className="dashboard-grid-final">
          <div className="dashboard-main-column">
            <ConversionsChart />
            <FollowUpList />
          </div>
          <div className="dashboard-side-column">
            <div className="card">
              <h3>Quick Actions</h3>
              <a href="https://app.turtlemintinsurance.com/life-insurance/profile/term/about-insured" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{width: '100%'}}>
                Get Insurance Quote
              </a>
            </div>
            <Notifications />
            <DocumentUpload />
          </div>
        </div>
      </main>
    </div>
  );
}