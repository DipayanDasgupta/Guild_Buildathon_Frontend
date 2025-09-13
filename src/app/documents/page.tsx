"use client";
import { useState, useEffect } from 'react';
import { Sidebar } from "@/components/sidebar";
import { Trash2 } from 'lucide-react';

interface Document {
  id: number;
  filename: string;
  upload_date: string;
  extracted_data: {
    policy_number?: string;
    customer_name?: string;
  };
  ai_summary: string;
  ai_category: string;
  ai_sentiment: string;
  ai_action_items: string[];
}

export default function DocumentsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  const fetchDocuments = async () => {
    try {
        setLoading(true);
        const response = await fetch(`${RENDER_BACKEND_URL}/api/documents`);
        const data = await response.json();
        setDocuments(Array.isArray(data) ? data : []);
      } catch (error) { 
          console.error("Failed to fetch documents:", error);
          setDocuments([]);
      } finally { setLoading(false); }
  };
  
  useEffect(() => { fetchDocuments(); }, [RENDER_BACKEND_URL]);

  const handleDeleteDocument = async (docId: number) => {
    if (confirm("Are you sure you want to delete this document record?")) {
      try {
        const response = await fetch(`${RENDER_BACKEND_URL}/api/documents/${docId}`, { method: 'DELETE' });
        if (!response.ok) { throw new Error('Failed to delete document'); }
        fetchDocuments();
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Failed to delete document.");
      }
    }
  };

  const getSentimentClass = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case 'urgent': return 'status-urgent';
      case 'negative': return 'status-negative';
      case 'positive': return 'status-positive';
      default: return 'status-neutral';
    }
  };

  return (
    <div className="page-container">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
        <div className="dashboard-header"><h1>Document Analytics</h1></div>
        <div className="card">
          <p>View all processed documents and their AI-powered insights.</p>
          <table className="clients-table">
            <thead><tr><th>Filename</th><th>Category</th><th>Upload Date</th><th>Sentiment</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? ( <tr><td colSpan={5}>Loading...</td></tr> ) : (
                documents.map(doc => (
                  <tr key={doc.id}>
                    <td>{doc.filename}</td>
                    <td>{doc.ai_category}</td>
                    <td>{new Date(doc.upload_date).toLocaleDateString()}</td>
                    <td><span className={`status-badge ${getSentimentClass(doc.ai_sentiment)}`}>{doc.ai_sentiment}</span></td>
                    <td style={{display: 'flex', gap: '0.5rem'}}>
                        <button className="btn btn-secondary" onClick={() => setSelectedDoc(doc)}>View Details</button>
                        <button onClick={() => handleDeleteDocument(doc.id)} className="btn-delete"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      {selectedDoc && (
        <div className="modal-overlay" onClick={() => setSelectedDoc(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{selectedDoc.filename}</h2>
            <div className="modal-section"><h4>AI Summary</h4><p>{selectedDoc.ai_summary}</p></div>
            <div className="modal-section"><h4>Action Items</h4><ul>{selectedDoc.ai_action_items?.map((item, index) => <li key={index}>{item}</li>)}</ul></div>
            <div className="modal-section-grid">
                <div><h4>Extracted Data</h4><p><strong>Policy #:</strong> {selectedDoc.extracted_data?.policy_number || 'N/A'}</p><p><strong>Customer:</strong> {selectedDoc.extracted_data?.customer_name || 'N/A'}</p></div>
                <div><h4>Details</h4><p><strong>Category:</strong> {selectedDoc.ai_category}</p><p><strong>Sentiment:</strong> {selectedDoc.ai_sentiment}</p></div>
            </div>
            <button className="btn btn-primary" style={{marginTop: '1.5rem'}} onClick={() => setSelectedDoc(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}