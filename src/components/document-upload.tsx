"use client";
import { useState, useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";

interface ProcessedData {
  customer_name?: string;
  policy_number?: string;
  policy_end_date?: string;
}

export function DocumentUpload() {
  const [fileToProcess, setFileToProcess] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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

        const data: ProcessedData = result.data;
        setStatusMessage(`Success! Processed ${fileToProcess.name}. Customer: ${data.customer_name || 'N/A'}`);
        setFileToProcess(null); // Clear file after processing
        // In a real app, you would now trigger a refresh of the clients table.
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        setStatusMessage(`Error processing ${fileToProcess.name}: ${errorMessage}`);
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
        <button className="btn btn-secondary">View History</button>
      </div>
    </div>
  );
}
