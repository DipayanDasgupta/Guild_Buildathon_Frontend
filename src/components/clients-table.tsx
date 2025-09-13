"use client";
import { useState, useEffect } from 'react';

interface Client {
  id: string;
  name: string;
  policyType: string;
  status: "Active" | "Pending" | "Expired" | "Cancelled";
}

export function ClientsTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${RENDER_BACKEND_URL}/api/clients`);
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [RENDER_BACKEND_URL]); // Re-run if URL changes

  return (
    <div className="card">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h3>Recent Clients</h3>
        <button className="btn btn-primary" onClick={() => alert('Add New Client form would open here!')}>Add New Client</button>
      </div>
      <p>Manage your client portfolio and policy status</p>
      <table className="clients-table">
        <thead><tr><th>Client Name</th><th>Policy Type</th><th>Status</th></tr></thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={3}>Loading clients...</td></tr>
          ) : (
            clients.map(client => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.policyType}</td>
                <td><span className={`status-badge ${client.status === 'Active' ? 'status-active' : 'status-pending'}`}>{client.status}</span></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
