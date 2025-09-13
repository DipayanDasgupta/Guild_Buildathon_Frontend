"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'; // Import the router
import { Upload } from "lucide-react";

export function DocumentUpload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileToProcess, setFileToProcess] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const router = useRouter(); // Initialize the router
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileToProcess(e.target.files[0]);
      setStatusMessage(`Selected: ${e.target.files[0].name}`);
    }
  };

  const processDocument = async () => {
      if (!fileToProcess) { setStatusMessage("Please select a file."); return; }
      setIsProcessing(true);
      setStatusMessage(`Processing with AI...`);
      
      const formData = new FormData();
      formData.append('document', fileToProcess);

      try {
        const response = await fetch(`${RENDER_BACKEND_URL}/api/documents/process`, {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();
        if (!response.ok) { throw new Error(result.message || 'API error'); }

        // --- THIS IS THE KEY CHANGE ---
        // Encode the extracted data and pass it as a URL parameter to the new page
        const extractedData = result.data?.extracted_data || {};
        const queryString = encodeURIComponent(JSON.stringify(extractedData));
        router.push(`/onboarding?data=${queryString}`);
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error.";
        setStatusMessage(`Error: ${errorMessage}`);
      } finally {
        setIsProcessing(false);
      }
  };

  return (
    <div className="card">
      <h3>Intelligent Document Upload</h3>
      <p>Upload an ID (Aadhaar/PAN) or policy document to auto-fill the client form.</p>
      
      <div className="drop-zone">
        <Upload />
        <p>Drop files here or click to browse</p>
        <input type="file" onChange={handleFileSelect} style={{ display: 'none' }} id="file-upload" />
        <label htmlFor="file-upload" className="btn btn-primary" style={{marginTop: '1rem', display: 'inline-block'}}>Choose File</label>
      </div>

      {statusMessage && <p style={{marginTop: '1rem', textAlign: 'center'}}>{statusMessage}</p>}
      
      <div className="button-group">
        <button onClick={processDocument} disabled={isProcessing || !fileToProcess} className="btn btn-primary">
          {isProcessing ? "Processing..." : "Start Onboarding"}
        </button>
      </div>
    </div>
  );
}
