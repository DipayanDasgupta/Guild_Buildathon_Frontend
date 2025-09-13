"use client";
import { useState, useEffect } from 'react';

interface Client { id: number; name: string; policyType: string; status: string; }

export function ClientsTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  useEffect(() => {
    const fetchRecentClients = async () => {
      try {
        setLoading(true);
        // Call the new, specific endpoint for the dashboard
        const response = await fetch(`${RENDER_BACKEND_URL}/api/dashboard/recent-clients`);
        const data = await response.json();
        setClients(data);
      } catch (error) { console.error("Failed to fetch recent clients:", error); }
      finally { setLoading(false); }
    };
    fetchRecentClients();
  }, [RENDER_BACKEND_URL]);

  return (
    <div className="card">
      <div className="clients-header">
        <div><h3>Recent Clients</h3><p>Manage your client portfolio and policy status</p></div>
        <button className="btn btn-primary" onClick={() => alert('Add New Client form would open here!')}>Add New Client</button>
      </div>
      <table className="clients-table">
        <thead><tr><th>Client Name</th><th>Policy Type</th><th>Status</th></tr></thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={3}>Loading...</td></tr>
          ) : (
            clients.map(client => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.policyType || 'N/A'}</td>
                <td><span className={`status-badge ${client.status === 'Active' ? 'status-active' : 'status-pending'}`}>{client.status}</span></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
