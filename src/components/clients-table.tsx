const mockClients = [
    { id: "1", name: "John Smith", policyType: "Auto Insurance", status: "Active" },
    { id: "2", name: "Sarah Johnson", policyType: "Home Insurance", status: "Pending" },
];
export function ClientsTable() {
  return (
    <div className="card">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h3>Recent Clients</h3>
        <button className="btn btn-primary">Add New Client</button>
      </div>
      <p>Manage your client portfolio and policy status</p>
      <table className="clients-table">
        <thead><tr><th>Client Name</th><th>Policy Type</th><th>Status</th></tr></thead>
        <tbody>
          {mockClients.map(client => (
            <tr key={client.id}><td>{client.name}</td><td>{client.policyType}</td><td><span className={client.status === 'Active' ? 'status-active' : 'status-pending'}>{client.status}</span></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
