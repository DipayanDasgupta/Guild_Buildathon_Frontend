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
        const response = await fetch(`${RENDER_BACKEND_URL}/api/dashboard/recent-clients`);
        const data = await response.json();
        
        // --- THIS IS THE FIX ---
        // We now check if the data is an array before trying to set it.
        // If it's not, we default to an empty array to prevent the .map() crash.
        if (Array.isArray(data)) {
          setClients(data);
        } else {
          setClients([]); // Default to empty array on unexpected response
        }

      } catch (error) { 
        console.error("Failed to fetch recent clients:", error);
        setClients([]); // Also default to empty array on fetch error
      }
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
            // Now, even if clients is empty, the .map will not crash.
            clients.length > 0 ? (
                clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.policyType || 'N/A'}</td>
                    <td><span className={`status-badge ${client.status === 'Active' ? 'status-active' : 'status-pending'}`}>{client.status}</span></td>
                  </tr>
                ))
            ) : (
                <tr><td colSpan={3} style={{textAlign: 'center', padding: '1rem'}}>No recent clients found.</td></tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
