"use client";
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface FollowUp {
  id: number;
  clientName: string;
  type: string;
  dueDate: string;
}

export function FollowUpList() {
    const [followUps, setFollowUps] = useState<FollowUp[]>([]);
    const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

    useEffect(() => {
        const fetchFollowUps = async () => {
            try {
                const response = await fetch(`${RENDER_BACKEND_URL}/api/dashboard/todays-follow-ups`);
                const data = await response.json();
                setFollowUps(Array.isArray(data) ? data : []);
            } catch (error) { console.error("Failed to fetch follow-ups:", error); }
        };
        fetchFollowUps();
    }, [RENDER_BACKEND_URL]);

    return (
        <div className="card">
            <h3>Today's Follow-ups</h3>
            <ul className="follow-up-list">
                {followUps.length > 0 ? (
                    followUps.map(fu => (
                        <li key={fu.id}>
                            <span className="follow-up-type">{fu.type}</span>
                            <span className="follow-up-client">for {fu.clientName}</span>
                            <span className="follow-up-time">{format(new Date(fu.dueDate), 'p')}</span>
                        </li>
                    ))
                ) : (
                    <li>No follow-ups scheduled for today.</li>
                )}
            </ul>
        </div>
    );
}