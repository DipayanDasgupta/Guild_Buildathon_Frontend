// This is the placeholder page for the Documents route
import { Sidebar } from "@/components/sidebar";

export default function DocumentsPage() {
  return (
    <>
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <h1>Documents</h1>
        </div>
        <div className="card">
          <p>This is where the document history and management interface will go.</p>
        </div>
      </main>
    </>
  );
}
