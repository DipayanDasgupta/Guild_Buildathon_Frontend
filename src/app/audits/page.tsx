"use client";
import { useState, useEffect } from 'react';
import { Sidebar } from "@/components/sidebar";
import { MenuButton } from '@/components/MenuButton'; // Import the MenuButton for mobile
import { format } from 'date-fns'; // Import date-fns for formatting timestamps

// Define the structure of an Audit Log entry to match your backend model
interface AuditLog {
  id: number;
  event_type: string;
  details: any; // Can be any JSON object
  timestamp: string;
}

export default function AuditLogPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        // This endpoint will be created in the next step on your backend
        const response = await fetch(`${RENDER_BACKEND_URL}/api/audits`);
        if (!response.ok) {
          throw new Error('Failed to fetch audit logs');
        }
        const data = await response.json();
        setLogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch audit logs:", error);
        setLogs([]); // Set to empty array on error to prevent crashes
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [RENDER_BACKEND_URL]);

  return (
    <div className="page-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
        <header className="page-header">
          <MenuButton isOpen={sidebarCollapsed} onClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <div className="header-title">
            <h1>Audit Logs</h1>
          </div>
        </header>
        <div className="card">
          <p>A chronological record of all important system and user events for compliance and security.</p>
          <div className="table-wrapper">
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Timestamp (UTC)</th>
                  <th>Event Type</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={3} style={{ textAlign: 'center', padding: '1rem' }}>Loading audit trail...</td></tr>
                ) : logs.length > 0 ? (
                  logs.map(log => (
                    <tr key={log.id}>
                      <td>{format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}</td>
                      <td>{log.event_type}</td>
                      {/* We use <pre> to nicely format the JSON details */}
                      <td><pre>{JSON.stringify(log.details, null, 2)}</pre></td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={3} style={{ textAlign: 'center', padding: '1rem' }}>No audit events found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}