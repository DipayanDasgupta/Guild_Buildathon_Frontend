// This is the placeholder page for the Clients route
import { Sidebar } from "@/components/sidebar";

export default function ClientsPage() {
  return (
    <>
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <h1>Clients</h1>
        </div>
        <div className="card">
          <p>This is where the full client management interface will go.</p>
        </div>
      </main>
    </>
  );
}
