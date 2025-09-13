"use client";
import { useState, useEffect } from 'react';
import { Sidebar } from "@/components/sidebar";
import { PlusCircle, Trash2 } from 'lucide-react'; // Import Trash icon

interface Client { id: number; name: string; policyType: string; status: string; premium: number; }

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  const fetchClients = async () => { /* ... remains the same ... */ };
  useEffect(() => { fetchClients(); }, [RENDER_BACKEND_URL]);

  const handleAddNewClient = async () => { /* ... remains the same ... */ };

  const handleDeleteClient = async (clientId: number) => {
    if (confirm("Are you sure you want to delete this client?")) {
      try {
        const response = await fetch(`${RENDER_BACKEND_URL}/api/clients/${clientId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete client');
        }
        // Refresh the client list after deletion
        fetchClients();
      } catch (error) {
        console.error("Error deleting client:", error);
        alert("Failed to delete client.");
      }
    }
  };

  return (
    <>
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header"><h1>Client Management</h1><button className="btn btn-primary" onClick={handleAddNewClient} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><PlusCircle size={20} /> Add New Client</button></div>
        <div className="card">
          <p>View, search, and manage your entire client portfolio.</p>
          <table className="clients-table">
            <thead><tr><th>Client Name</th><th>Policy Type</th><th>Premium</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5}>Loading...</td></tr>
              ) : (
                clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.policyType || 'N/A'}</td>
                    <td>${client.premium ? client.premium.toLocaleString() : 'N/A'}</td>
                    <td><span className={`status-badge ${client.status === 'Active' ? 'status-active' : 'status-pending'}`}>{client.status}</span></td>
                    <td><button onClick={() => handleDeleteClient(client.id)} className="btn-delete"><Trash2 size={16} /></button></td>
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
