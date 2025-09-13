"use client";
import { useState } from 'react';

interface AddClientModalProps {
  onClose: () => void;
  onClientAdded: () => void; // Callback to refresh the client list
}

export function AddClientModal({ onClose, onClientAdded }: AddClientModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Client name is required.');
      return;
    }
    try {
      const response = await fetch(`${RENDER_BACKEND_URL}/api/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, status: 'Pending' }),
      });
      if (!response.ok) { throw new Error('Failed to create client'); }
      onClientAdded(); // Trigger refresh
      onClose(); // Close modal
    } catch (err) {
      setError('Failed to add client. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Add New Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Client Name</label>
            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="button-group" style={{justifyContent: 'flex-end'}}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Client</button>
          </div>
        </form>
      </div>
    </div>
  );
}
