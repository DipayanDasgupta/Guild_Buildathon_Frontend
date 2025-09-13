"use client";
import { useState } from "react";
import { Upload } from "lucide-react";

export function DocumentUpload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("");
  const RENDER_BACKEND_URL = 'https://guild-buildathon.onrender.com';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const processDocuments = async () => {
    // This is where you would add your API call logic
    setIsProcessing(true);
    console.log("Processing documents...");
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
  };

  return (
    <div className="card">
      <h3>Intelligent Document Upload</h3>
      <p>Upload policy documents, claims, and other files for AI-powered processing</p>
      
      <div className="drop-zone">
        <Upload />
        <p>Drop files here or click to browse</p>
        <p style={{ fontSize: '0.8rem' }}>Supports PDF, DOC, DOCX, and image files up to 10MB</p>
        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" />
        <label htmlFor="file-upload" className="btn btn-primary" style={{marginTop: '1rem', display: 'inline-block'}}>Choose Files</label>
        {fileName && <p style={{marginTop: '1rem', fontSize: '0.9rem'}}>Selected: {fileName}</p>}
      </div>

      <div className="button-group">
        <button onClick={processDocuments} disabled={isProcessing} className="btn btn-primary">
          {isProcessing ? "Processing..." : "Process Documents"}
        </button>
        <button className="btn btn-secondary">View History</button>
      </div>
    </div>
  );
}
