"use client";
import { useState, useEffect } from 'react';
import { Sidebar } from "@/components/sidebar";
import { AddClientModal } from "@/components/AddClientModal";
import { PlusCircle, Trash2 } from 'lucide-react';

interface Client { id: number; name: string; email: string; phone: string; policyType: string; status: string; }

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  const fetchClients = async () => { /* ... (code remains the same) ... */ };
  useEffect(() => { fetchClients(); }, [RENDER_BACKEND_URL]);

  const handleDeleteClient = async (clientId: number) => { /* ... (code remains the same) ... */ };
  
  return (
    <>
      {isModalOpen && <AddClientModal onClose={() => setIsModalOpen(false)} onClientAdded={fetchClients} />}
      <Sidebar />
      <main className="main-content">
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
                    <td><span className={`status-badge`}>{client.status}</span></td>
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
