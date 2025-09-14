"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sidebar } from "@/components/sidebar";
import { PlusCircle, Trash2 } from 'lucide-react';

// Define Client interface (assumed from your note that it remains the same)
interface Client {
  id: number;
  name: string;
  policyId: string;
  policyType: string;
  status: string;
  // Add any other fields as needed from your Client interface
}

export default function ClientsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const router = useRouter();
  const searchParams = useSearchParams();
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  // Fetch clients with status filter
  const fetchClients = async () => {
    setLoading(true);
    try {
      const url = statusFilter === 'All' 
        ? `${RENDER_BACKEND_URL}/api/clients`
        : `${RENDER_BACKEND_URL}/api/clients?status=${statusFilter}`;
      const response = await fetch(url);
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update URL when statusFilter changes
  useEffect(() => {
    const currentStatus = searchParams.get('status') || 'All';
    setStatusFilter(currentStatus);
  }, [searchParams]);

  // Fetch clients when RENDER_BACKEND_URL or statusFilter changes
  useEffect(() => {
    fetchClients();
  }, [RENDER_BACKEND_URL, statusFilter]);

  const handleDeleteClient = async (clientId: number) => {
    try {
      await fetch(`${RENDER_BACKEND_URL}/api/clients/${clientId}`, {
        method: 'DELETE',
      });
      setClients(clients.filter(client => client.id !== clientId));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  // Handle status filter change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatusFilter(newStatus);
    // Update URL with new status
    const newSearchParams = new URLSearchParams(searchParams);
    if (newStatus === 'All') {
      newSearchParams.delete('status');
    } else {
      newSearchParams.set('status', newStatus);
    }
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="page-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
        <div className="dashboard-header">
          <h1>Client Management</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <select 
              value={statusFilter} 
              onChange={handleStatusChange}
              className="status-filter"
              style={{ padding: '0.5rem', borderRadius: '4px' }}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
              {/* Add more status options as needed */}
            </select>
            <button 
              className="btn btn-primary" 
              onClick={() => router.push('/onboarding')} 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <PlusCircle size={20} /> Add New Client
            </button>
          </div>
        </div>
        <div className="card">
          <p>This is your complete client portfolio.</p>
          <table className="clients-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Policy ID</th>
                <th>Policy Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5}>Loading...</td></tr>
              ) : (
                clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.policyId || 'N/A'}</td>
                    <td>{client.policyType || 'N/A'}</td>
                    <td><span className="status-badge">{client.status}</span></td>
                    <td>
                      <button 
                        onClick={() => handleDeleteClient(client.id)} 
                        className="btn-delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
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