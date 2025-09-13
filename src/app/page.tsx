import { Sidebar } from "@/components/sidebar";
import { DocumentUpload } from "@/components/document-upload";
import { ClientsTable } from "@/components/clients-table";
import { StatsCards } from "@/components/stats-cards";
import { QuickActions } from "@/components/quick-actions";

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <h1>Turtlemint Dashboard</h1>
          <p>Welcome back, Vijay</p>
        </div>
        <StatsCards />
        <QuickActions />
        <DocumentUpload />
        <ClientsTable />
      </main>
    </>
  );
}
