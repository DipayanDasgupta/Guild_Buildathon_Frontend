"use client";
import { useState, useEffect } from 'react';
import { Sidebar } from "@/components/sidebar";
import { AddClientModal } from "@/components/AddClientModal";
import { PlusCircle, Trash2 } from 'lucide-react';

interface Client { id: number; name: string; email: string; phone: string; policyType: string; status: string; premium: number; }

export default function ClientsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${RENDER_BACKEND_URL}/api/clients`);
        const data = await response.json();
        setClients(Array.isArray(data) ? data : []);
      } catch (error) { 
          console.error("Failed to fetch clients:", error);
          setClients([]);
      } finally { setLoading(false); }
  };
  
  useEffect(() => { fetchClients(); }, [RENDER_BACKEND_URL]);

  const handleDeleteClient = async (clientId: number) => {
    if (confirm("Are you sure you want to delete this client?")) {
      try {
        const response = await fetch(`${RENDER_BACKEND_URL}/api/clients/${clientId}`, { method: 'DELETE' });
        if (!response.ok) { throw new Error('Failed to delete client'); }
        fetchClients();
      } catch (error) {
        console.error("Error deleting client:", error);
        alert("Failed to delete client.");
      }
    }
  };

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'status-active';
      case 'pending': return 'status-pending';
      default: return 'status-neutral';
    }
  };

  return (
    <div className="page-container">
      {isModalOpen && <AddClientModal onClose={() => setIsModalOpen(false)} onClientAdded={fetchClients} />}
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
        <div className="dashboard-header">
          <h1>Client Management</h1>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <PlusCircle size={20} /> Add New Client
          </button>
        </div>
        <div className="card">
          <p>View, search, and manage your entire client portfolio.</p>
          <table className="clients-table">
            <thead><tr><th>Client</th><th>Contact</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4}>Loading...</td></tr>
              ) : (
                clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.email || client.phone || 'N/A'}</td>
                    <td><span className={`status-badge ${getStatusClass(client.status)}`}>{client.status}</span></td>
                    <td><button onClick={() => handleDeleteClient(client.id)} className="btn-delete"><Trash2 size={16} /></button></td>
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