"use client";
import { useState } from "react";
import { Upload } from "lucide-react";

export function DocumentUpload() {
  return (
    <div className="card">
      <h3>Intelligent Document Upload</h3>
      <p>Upload policy documents, claims, and other files for AI-powered processing</p>
      <div className="drop-zone">
        <Upload />
        <p>Drop files here or click to browse</p>
      </div>
      <div style={{marginTop: '1.5rem'}}><button className="btn btn-primary">Process Documents</button></div>
    </div>
  );
}
