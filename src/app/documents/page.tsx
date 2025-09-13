"use client";
import { useState, useEffect } from 'react';
import { Sidebar } from "@/components/sidebar";

// Define the structure of our Document object
interface Document {
  id: number;
  filename: string;
  upload_date: string;
  extracted_data: {
    policy_number?: string;
    customer_name?: string;
    premium_amount?: number;
    policy_end_date?: string;
  };
  ai_summary: string;
  ai_category: string;
  ai_sentiment: string;
  ai_action_items: string[];
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`${RENDER_BACKEND_URL}/api/documents`);
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [RENDER_BACKEND_URL]);

  const getSentimentClass = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case 'urgent': return 'status-urgent';
      case 'negative': return 'status-negative';
      case 'positive': return 'status-positive';
      default: return 'status-neutral';
    }
  };

  return (
    <>
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <h1>Document Analytics</h1>
        </div>
        <div className="card">
          <p>View all processed documents and their AI-powered insights.</p>
          <table className="clients-table">
            <thead>
              <tr>
                <th>Filename</th>
                <th>Category</th>
                <th>Upload Date</th>
                <th>Sentiment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5}>Loading documents...</td></tr>
              ) : (
                documents.map(doc => (
                  <tr key={doc.id}>
                    <td>{doc.filename}</td>
                    <td>{doc.ai_category}</td>
                    <td>{new Date(doc.upload_date).toLocaleDateString()}</td>
                    <td><span className={`status-badge ${getSentimentClass(doc.ai_sentiment)}`}>{doc.ai_sentiment}</span></td>
                    <td><button className="btn btn-secondary" onClick={() => setSelectedDoc(doc)}>View Details</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* The Details Modal */}
      {selectedDoc && (
        <div className="modal-overlay" onClick={() => setSelectedDoc(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{selectedDoc.filename}</h2>
            
            <div className="modal-section">
              <h4>AI Summary</h4>
              <p>{selectedDoc.ai_summary}</p>
            </div>
            
            <div className="modal-section">
              <h4>Action Items</h4>
              <ul>
                {selectedDoc.ai_action_items?.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>

            <div className="modal-section-grid">
                <div><h4>Extracted Data</h4>
                    <p><strong>Policy #:</strong> {selectedDoc.extracted_data?.policy_number || 'N/A'}</p>
                    <p><strong>Customer:</strong> {selectedDoc.extracted_data?.customer_name || 'N/A'}</p>
                </div>
                <div><h4>Details</h4>
                    <p><strong>Category:</strong> {selectedDoc.ai_category}</p>
                    <p><strong>Sentiment:</strong> {selectedDoc.ai_sentiment}</p>
                </div>
            </div>

            <button className="btn btn-primary" style={{marginTop: '1.5rem'}} onClick={() => setSelectedDoc(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
