"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from "@/components/sidebar";
import { PlusCircle, Trash2 } from 'lucide-react';
// ... (Client interface remains the same) ...

export default function ClientsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  const fetchClients = async () => { /* ... (code remains the same) ... */ };
  useEffect(() => { fetchClients(); }, [RENDER_BACKEND_URL]);
  const handleDeleteClient = async (clientId: number) => { /* ... (code remains the same) ... */ };
  
  return (
    <div className="page-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
        <div className="dashboard-header">
          <h1>Client Management</h1>
          {/* This button now correctly navigates to the blank onboarding form */}
          <button className="btn btn-primary" onClick={() => router.push('/onboarding')} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <PlusCircle size={20} /> Add New Client
          </button>
        </div>
        <div className="card">
          <p>This is your complete client portfolio.</p>
          <table className="clients-table">
            <thead><tr><th>Client Name</th><th>Policy ID</th><th>Policy Type</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? ( <tr><td colSpan={5}>Loading...</td></tr> ) : (
                clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.policyId || 'N/A'}</td>
                    <td>{client.policyType || 'N/A'}</td>
                    <td><span className="status-badge">{client.status}</span></td>
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
