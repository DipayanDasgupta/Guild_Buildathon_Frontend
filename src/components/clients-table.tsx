"use client";

const mockClients = [
    { id: "1", name: "John Smith", policyType: "Auto Insurance", status: "Active", premium: 1200 },
    { id: "2", name: "Sarah Johnson", policyType: "Home Insurance", status: "Pending", premium: 2400 },
];

export function ClientsTable() {
  return (
    <div className="card">
      <div className="clients-header">
        <div>
          <h3>Recent Clients</h3>
          <p>Manage your client portfolio and policy status</p>
        </div>
        <button className="btn btn-primary">Add New Client</button>
      </div>
      <input type="text" placeholder="Search clients..." className="search-input" />
      <table className="clients-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Policy Type</th>
            <th>Premium</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockClients.map(client => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.policyType}</td>
              <td>${client.premium.toLocaleString()}</td>
              <td>
                <span className={`status-badge ${client.status === 'Active' ? 'status-active' : 'status-pending'}`}>
                  {client.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
