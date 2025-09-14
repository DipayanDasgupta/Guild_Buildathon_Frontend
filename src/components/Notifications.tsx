"use client";
import { useState, useEffect } from 'react';

interface DashboardStats {
  renewalsDueCount: number;
  claimsNeedDocsCount: number;
}

export function Notifications() {
    const [stats, setStats] = useState<DashboardStats>({ renewalsDueCount: 0, claimsNeedDocsCount: 0 });
    const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';
    
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${RENDER_BACKEND_URL}/api/dashboard/stats`);
                const data = await response.json();
                setStats(data);
            } catch (error) { console.error('Error fetching notification stats:', error); }
        };
        fetchStats();
    }, [RENDER_BACKEND_URL]);

    return (
        <div className="card">
            <h3>Notifications</h3>
            <ul className="notification-list">
                <li>
                    <strong>{stats.renewalsDueCount} policies</strong> up for renewal in the next 30 days.
                </li>
                <li>
                    <strong>{stats.claimsNeedDocsCount} claims</strong> need document submission.
                </li>
            </ul>
        </div>
    );
}