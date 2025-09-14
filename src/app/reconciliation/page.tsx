"use client";
import { useState } from 'react';
import { Sidebar } from "@/components/sidebar";

// Define interfaces for our data structures
interface Transaction { id: number; date: string; amount: number; referenceId: string; description: string; }
interface Result {
  batchId: number;
  matchedCount: number;
  exceptions: { bank: Transaction[]; policy: Transaction[]; };
}

export default function ReconciliationPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [bankFile, setBankFile] = useState<File | null>(null);
  const [policyFile, setPolicyFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  const handleRunReconciliation = async () => {
    if (!bankFile || !policyFile) {
      setError('Please select both a bank statement and a policy log file.');
      return;
    }
    setIsLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('bank_statement', bankFile);
    formData.append('policy_log', policyFile);

    try {
      const response = await fetch(`${RENDER_BACKEND_URL}/api/reconciliation/run`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) { throw new Error(data.message || 'Failed to run reconciliation.'); }

      const resultResponse = await fetch(`${RENDER_BACKEND_URL}/api/reconciliation/batches/${data.batchId}`);
      const resultData = await resultResponse.json();
      setResult(resultData);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
        <div className="dashboard-header"><h1>Automatic Reconciliation</h1></div>

        <div className="card">
          <h3>Upload Data for Reconciliation</h3>
          {/* --- THIS IS THE KEY CHANGE --- */}
          <p>Upload a bank statement and an internal policy payment log (in PDF format) to begin.</p>
          <div className="upload-grid">
            <div className="file-input-wrapper">
              <label>1. Bank Statement (PDF)</label>
              {/* This now accepts PDF files */}
              <input type="file" accept=".pdf" onChange={(e) => setBankFile(e.target.files ? e.target.files[0] : null)} />
            </div>
            <div className="file-input-wrapper">
              <label>2. Policy Log (PDF)</label>
              {/* This now accepts PDF files */}
              <input type="file" accept=".pdf" onChange={(e) => setPolicyFile(e.target.files ? e.target.files[0] : null)} />
            </div>
          </div>
          <button onClick={handleRunReconciliation} disabled={isLoading || !bankFile || !policyFile} className="btn btn-primary" style={{marginTop: '1.5rem'}}>
            {isLoading ? 'Processing...' : 'Run Reconciliation'}
          </button>
          {error && <p className="error-message" style={{marginTop: '1rem'}}>{error}</p>}
        </div>

        {result && (
          // ... The result display section remains exactly the same ...
          <div className="card">
            <h3>Reconciliation Results (Batch #{result.batchId})</h3>
            <div className="result-summary">
              <p><strong>Matched Transactions:</strong> {result.matchedCount}</p>
              <p><strong>Bank Exceptions:</strong> {result.exceptions.bank.length}</p>
              <p><strong>Policy Log Exceptions:</strong> {result.exceptions.policy.length}</p>
            </div>
            <div className="exception-workflow">
              <div className="exception-column">
                <h4>Unmatched Bank Transactions</h4>
                <table className="clients-table">
                  <thead><tr><th>Date</th><th>Description</th><th>Amount</th></tr></thead>
                  <tbody>
                    {result.exceptions.bank.map(t => <tr key={`b-${t.id}`}><td>{t.date}</td><td>{t.description}</td><td>{t.amount}</td></tr>)}
                  </tbody>
                </table>
              </div>
              <div className="exception-column">
                <h4>Unmatched Policy Log Transactions</h4>
                <table className="clients-table">
                  <thead><tr><th>Date</th><th>Reference ID</th><th>Amount</th></tr></thead>
                  <tbody>
                    {result.exceptions.policy.map(t => <tr key={`p-${t.id}`}><td>{t.date}</td><td>{t.referenceId}</td><td>{t.amount}</td></tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
