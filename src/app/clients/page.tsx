"use client";
import { useState, useEffect } from 'react';
import { Sidebar } from "@/components/sidebar";
import { PlusCircle } from 'lucide-react';

interface Client { id: number; name: string; policyType: string; status: string; premium: number; }

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${RENDER_BACKEND_URL}/api/clients`);
      const data = await response.json();
      setClients(data);
    } catch (error) { console.error("Failed to fetch clients:", error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchClients(); }, [RENDER_BACKEND_URL]);

  const handleAddNewClient = async () => {
    const name = prompt("Enter new client's name:");
    if (name && name.trim() !== "") {
      try {
        const response = await fetch(`${RENDER_BACKEND_URL}/api/clients`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, status: 'Pending' }),
        });
        if (!response.ok) {
          throw new Error('Failed to create client');
        }
        // Refresh the client list to show the new client
        fetchClients();
      } catch (error) {
        console.error("Error adding new client:", error);
        alert("Failed to add new client.");
      }
    }
  };

  return (
    <>
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <h1>Client Management</h1>
          <button className="btn btn-primary" onClick={handleAddNewClient} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <PlusCircle size={20} /> Add New Client
          </button>
        </div>
        <div className="card">
          <p>View, search, and manage your entire client portfolio.</p>
          <table className="clients-table">
            <thead><tr><th>Client Name</th><th>Policy Type</th><th>Premium</th><th>Status</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4}>Loading...</td></tr>
              ) : (
                clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.policyType || 'N/A'}</td>
                    <td>${client.premium ? client.premium.toLocaleString() : 'N/A'}</td>
                    <td><span className={`status-badge ${client.status === 'Active' ? 'status-active' : 'status-pending'}`}>{client.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
