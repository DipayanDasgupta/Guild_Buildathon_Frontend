import { Sidebar } from "@/components/sidebar";
import { DocumentUpload } from "@/components/document-upload";
import { ClientsTable } from "@/components/clients-table";

// This component will be served at the root URL ("/")
export default function DashboardPage() {
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
