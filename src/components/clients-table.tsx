"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ... (Client interface remains the same) ...

export function ClientsTable() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  useEffect(() => {
    const fetchRecentClients = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${RENDER_BACKEND_URL}/api/dashboard/recent-clients`);
        const data = await response.json();
        setClients(Array.isArray(data) ? data : []);
      } catch (error) { setClients([]); }
      finally { setLoading(false); }
    };
    fetchRecentClients();
  }, [RENDER_BACKEND_URL]);

  return (
    <div className="card">
      <div className="clients-header">
        <div><h3>Recent Clients</h3><p>Manage your client portfolio and policy status</p></div>
        {/* This button now correctly navigates to the blank onboarding form */}
        <button className="btn btn-primary" onClick={() => router.push('/onboarding')}>Add New Client</button>
      </div>
      <table className="clients-table">
        <thead><tr><th>Client Name</th><th>Policy Type</th><th>Status</th></tr></thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={3}>Loading...</td></tr>
          ) : clients.length > 0 ? (
            clients.map(client => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.policyType || 'N/A'}</td>
                <td><span className="status-badge">{client.status}</span></td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={3} style={{textAlign: 'center', padding: '1rem'}}>No recent clients found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
