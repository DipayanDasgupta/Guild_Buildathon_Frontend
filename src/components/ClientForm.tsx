"use client";
import { useState, useEffect } from 'react';

interface ClientData {
  name?: string; dob?: string; gender?: string; email?: string;
  phone?: string; address?: string; aadhaarNumber?: string; panNumber?: string;
  policyId?: string; policyType?: string; premiumAmount?: number;
  premiumFrequency?: string; expirationDate?: string; dueDate?: string;
}

interface ClientFormProps {
  initialData: ClientData;
  onSubmit: (data: ClientData) => void;
}

export function ClientForm({ initialData, onSubmit }: ClientFormProps) {
  const [formData, setFormData] = useState<ClientData>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="client-form">
      <h3>Personal Details (Extracted by AI)</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input name="name" value={formData.name || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input name="dob" type="date" value={formData.dob || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Aadhaar Number</label>
          <input name="aadhaarNumber" value={formData.aadhaarNumber || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>PAN Number</label>
          <input name="panNumber" value={formData.panNumber || ''} onChange={handleChange} />
        </div>
      </div>
      <h3>Policy Details</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Policy Type</label>
          <input name="policyType" value={formData.policyType || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Policy ID</label>
          <input name="policyId" value={formData.policyId || ''} onChange={handleChange} />
        </div>
         <div className="form-group">
          <label>Premium Amount</label>
          <input name="premiumAmount" type="number" value={formData.premiumAmount || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Premium Frequency</label>
           <select name="premiumFrequency" value={formData.premiumFrequency || 'Yearly'} onChange={handleChange}>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Half-Yearly</option>
              <option>Yearly</option>
           </select>
        </div>
      </div>
      <div className="button-group" style={{justifyContent: 'flex-end'}}>
        <button type="submit" className="btn btn-primary">Create Client Profile</button>
      </div>
    </form>
  );
}
