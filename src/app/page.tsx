import { Sidebar } from "@/components/sidebar";
import { DocumentUpload } from "@/components/document-upload";
import { ClientsTable } from "@/components/clients-table";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back, Agent Smith</p>
        </div>
        <DocumentUpload />
        <ClientsTable />
      </main>
    </div>
  );
}
