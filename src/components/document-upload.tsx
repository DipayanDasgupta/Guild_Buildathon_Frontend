"use client";
import { useState, useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";

// Define an interface for the structured data we expect from Gemini
interface ProcessedData {
  customer_name?: string;
  policy_number?: string;
  policy_end_date?: string;
  // Add any other fields Gemini might return
}

export function DocumentUpload() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [filesToProcess, setFilesToProcess] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // =========================================================================
  // THIS IS THE GUARANTEED CORRECT URL
  // =========================================================================
  const RENDER_BACKEND_URL = 'https://guild-buildathon.onrender.com';

  const handleFileChange = (newFiles: File[]) => {
    setFilesToProcess(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileChange(Array.from(e.dataTransfer.files));
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileChange(Array.from(e.target.files));
    }
  };

  const removeFile = (fileName: string) => {
    setFilesToProcess(files => files.filter(file => file.name !== fileName));
  };
  
  const processDocuments = async () => {
      if (filesToProcess.length === 0) {
        setStatusMessage("Please select at least one file to process.");
        return;
      }
      setIsProcessing(true);
      setStatusMessage(`Processing ${filesToProcess.length} document(s)...`);

      // In a real app, you might upload and process all, but for the demo, we process one by one.
      const file = filesToProcess[0];
      const formData = new FormData();
      formData.append('document', file);

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
        setStatusMessage(`Success! Processed ${file.name}. Customer: ${data.customer_name || 'N/A'}`);
        setFilesToProcess([]); // Clear files after processing
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        setStatusMessage(`Error processing ${file.name}: ${errorMessage}`);
      } finally {
        setIsProcessing(false);
      }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold">Intelligent Document Upload</h3>
      <p className="text-gray-400 mb-4">Upload policy documents, claims, and other files for AI-powered processing</p>

      <div onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }} onDragLeave={() => setIsDragOver(false)} onDrop={handleDrop}
        className={"relative border-2 border-dashed rounded-lg p-10 text-center transition-colors " + (isDragOver ? "border-purple-500 bg-purple-500/10" : "border-gray-600")}>
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="font-semibold">Drop files here or click to browse</p>
        <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX, and image files up to 10MB</p>
        <input type="file" multiple onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
      </div>
      
      {filesToProcess.length > 0 && (
          <div className="mt-4 space-y-2">
              {filesToProcess.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded-md">
                      <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <span className="text-sm">{file.name}</span>
                      </div>
                      <button onClick={() => removeFile(file.name)} className="p-1 hover:bg-gray-600 rounded-full">
                          <X className="h-4 w-4" />
                      </button>
                  </div>
              ))}
          </div>
      )}

      {statusMessage && <p className="mt-4 text-center text-sm">{statusMessage}</p>}

      <div className="mt-6 flex gap-4">
        <button onClick={processDocuments} disabled={isProcessing} className="bg-purple-600 text-white px-6 py-2 rounded-lg disabled:bg-gray-500">
            {isProcessing ? "Processing..." : "Process Documents"}
        </button>
        <button className="bg-gray-700 px-6 py-2 rounded-lg">View History</button>
      </div>
    </div>
  );
}
