"use client";
import { useState } from "react";
import Link from 'next/link'; // Import the Link component for navigation
import { Upload } from "lucide-react";

export function DocumentUpload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileToProcess, setFileToProcess] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileToProcess(e.target.files[0]);
      setStatusMessage(`Selected: ${e.target.files[0].name}`);
    }
  };

  const processDocument = async () => {
      if (!fileToProcess) {
        setStatusMessage("Please select a file to process.");
        return;
      }
      setIsProcessing(true);
      setStatusMessage(`Processing ${fileToProcess.name}...`);
      
      const formData = new FormData();
      formData.append('document', fileToProcess);

      try {
        const response = await fetch(`${RENDER_BACKEND_URL}/api/documents/process`, {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'An API error occurred');
        }

        setStatusMessage(`Success! Document processed for client: ${result.data?.extracted_data?.customer_name || 'N/A'}`);
        setFileToProcess(null);
        // In a real app with state management, you would now trigger a refresh of the clients/documents tables.
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        setStatusMessage(`Error processing document: ${errorMessage}`);
      } finally {
        setIsProcessing(false);
      }
  };

  return (
    <div className="card">
      <h3>Intelligent Document Upload</h3>
      <p>Upload policy documents, claims, and other files for AI-powered processing</p>
      
      <div className="drop-zone">
        <Upload />
        <p>Drop files here or click to browse</p>
        <input type="file" onChange={handleFileSelect} style={{ display: 'none' }} id="file-upload" />
        <label htmlFor="file-upload" className="btn btn-primary" style={{marginTop: '1rem', display: 'inline-block'}}>
            Choose File
        </label>
      </div>

      {statusMessage && <p style={{marginTop: '1rem', textAlign: 'center'}}>{statusMessage}</p>}
      
      <div className="button-group">
        <button onClick={processDocument} disabled={isProcessing || !fileToProcess} className="btn btn-primary">
          {isProcessing ? "Processing..." : "Process Document"}
        </button>
        {/* The "View History" button is now a Link to the documents page */}
        <Link href="/documents" className="btn btn-secondary">
          View History
        </Link>
      </div>
    </div>
  );
}
