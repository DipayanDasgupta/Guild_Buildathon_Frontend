"use client";
import { useState, useEffect } from 'react';

// This is the full, detailed client data structure
interface ClientData {
  name?: string; dob?: string; gender?: string; email?: string;
  phone?: string; address?: string; aadhaarNumber?: string; panNumber?: string;
  policyId?: string; policyType?: string; premiumAmount?: number;
  premiumFrequency?: string; expirationDate?: string; dueDate?: string;
}

interface ClientFormProps {
  initialData: ClientData;
  onSuccess: () => void; // A callback to run on successful submission
}

export function ClientForm({ initialData, onSuccess }: ClientFormProps) {
  const [formData, setFormData] = useState<ClientData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  useEffect(() => { setFormData(initialData); }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) { setError('Client name is required.'); return; }
    
    setIsSubmitting(true);
    setError('');

    try {
      // This is the real API call to create the client
      const response = await fetch(`${RENDER_BACKEND_URL}/api/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Send the full form data
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to create client profile.');
      }
      onSuccess(); // Trigger the success callback (e.g., redirect)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="client-form">
      <h3>Personal Details (Extracted by AI)</h3>
      <div className="form-grid">
        <div className="form-group"><label>Full Name</label><input name="name" value={formData.name || ''} onChange={handleChange} /></div>
        <div className="form-group"><label>Date of Birth</label><input name="dob" type="date" value={formData.dob || ''} onChange={handleChange} /></div>
        <div className="form-group"><label>Aadhaar Number</label><input name="aadhaarNumber" value={formData.aadhaarNumber || ''} onChange={handleChange} /></div>
        <div className="form-group"><label>PAN Number</label><input name="panNumber" value={formData.panNumber || ''} onChange={handleChange} /></div>
      </div>
      <h3>Policy Details</h3>
      <div className="form-grid">
        <div className="form-group"><label>Policy Type</label><input name="policyType" value={formData.policyType || ''} onChange={handleChange} /></div>
        <div className="form-group"><label>Policy ID</label><input name="policyId" value={formData.policyId || ''} onChange={handleChange} /></div>
        <div className="form-group"><label>Premium Amount</label><input name="premiumAmount" type="number" value={formData.premiumAmount || ''} onChange={handleChange} /></div>
        <div className="form-group"><label>Premium Frequency</label><select name="premiumFrequency" value={formData.premiumFrequency || 'Yearly'} onChange={handleChange}><option>Monthly</option><option>Quarterly</option><option>Yearly</option></select></div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="button-group" style={{justifyContent: 'flex-end'}}>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Create Client Profile'}
        </button>
      </div>
    </form>
  );
}
