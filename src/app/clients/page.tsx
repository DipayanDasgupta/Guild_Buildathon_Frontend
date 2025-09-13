"use client";
import { useState, useEffect } from 'react';
import { Sidebar } from "@/components/sidebar";
import { PlusCircle } from 'lucide-react';

// The full client interface
interface Client { id: number; name: string; email: string; phone: string; policyId: string; policyType: string; status: string; }

export default function ClientsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${RENDER_BACKEND_URL}/api/clients`);
        const data = await response.json();
        setClients(Array.isArray(data) ? data : []);
      } catch (error) { console.error("Failed to fetch clients:", error); }
      finally { setLoading(false); }
    };
    fetchClients();
  }, [RENDER_BACKEND_URL]);

  return (
    <div className="page-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
        <div className="dashboard-header">
          <h1>Client Management</h1>
          <a href="/onboarding" className="btn btn-primary" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <PlusCircle size={20} /> Add New Client Manually
          </a>
        </div>
        <div className="card">
          <p>This is your complete client portfolio.</p>
          <table className="clients-table">
            <thead><tr><th>Client Name</th><th>Policy ID</th><th>Policy Type</th><th>Status</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4}>Loading...</td></tr>
              ) : (
                clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.policyId || 'N/A'}</td>
                    <td>{client.policyType || 'N/A'}</td>
                    <td><span className="status-badge">{client.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
