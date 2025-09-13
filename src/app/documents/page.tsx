"use client";
import { useState, useEffect } from 'react';
import { Sidebar } from "@/components/sidebar";
import { Trash2 } from 'lucide-react'; // Import Trash icon

interface Document { /* ... interface remains the same ... */ }

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  const fetchDocuments = async () => { /* ... remains the same ... */ };
  useEffect(() => { fetchDocuments(); }, [RENDER_BACKEND_URL]);
  
  const handleDeleteDocument = async (docId: number) => {
    if (confirm("Are you sure you want to delete this document record?")) {
      try {
        const response = await fetch(`${RENDER_BACKEND_URL}/api/documents/${docId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete document');
        }
        // Refresh the document list after deletion
        fetchDocuments();
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Failed to delete document.");
      }
    }
  };

  return (
    <>
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header"><h1>Document Analytics</h1></div>
        <div className="card">
          <p>View all processed documents and their AI-powered insights.</p>
          <table className="clients-table">
            <thead><tr><th>Filename</th><th>Category</th><th>Upload Date</th><th>Sentiment</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5}>Loading...</td></tr>
              ) : (
                documents.map(doc => (
                  <tr key={doc.id}>
                    <td>{doc.filename}</td>
                    <td>{doc.ai_category}</td>
                    <td>{new Date(doc.upload_date).toLocaleDateString()}</td>
                    <td><span className={`status-badge`}>{doc.ai_sentiment}</span></td>
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
      {selectedDoc && ( /* ... modal code remains the same ... */ )}
    </>
  );
}
