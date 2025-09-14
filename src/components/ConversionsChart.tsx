"use client";
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// Define the structure for the stats data
interface DashboardStats {
  conversions: number;
  monthlyTarget: number;
}

const COLORS = ['#10b981', '#374151']; // Turtlemint Green and a neutral gray

export function ConversionsChart() {
  const [stats, setStats] = useState<DashboardStats>({ conversions: 0, monthlyTarget: 50 });
  const [loading, setLoading] = useState(true);
  const RENDER_BACKEND_URL = process.env.NEXT_PUBLIC_RENDER_BACKEND_URL || 'https://guild-buildathon.onrender.com';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${RENDER_BACKEND_URL}/api/dashboard/stats`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [RENDER_BACKEND_URL]);

  const data = [
    { name: 'Conversions', value: stats.conversions },
    { name: 'Remaining', value: Math.max(0, stats.monthlyTarget - stats.conversions) },
  ];

  return (
    <div className="card conversion-card">
      <h3>Conversions (Monthly Target)</h3>
      {loading ? <p>Loading chart...</p> : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-label">
            <span className="chart-value">{stats.conversions}</span>
            <span className="chart-target">/ {stats.monthlyTarget}</span>
          </div>
        </div>
      )}
    </div>
  );
}