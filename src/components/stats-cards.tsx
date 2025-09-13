export function StatsCards() {
  const stats = [
    { title: "Policies Sold", value: "1.6Cr+" },
    { title: "Advisors", value: "5L+" },
    { title: "Insurers", value: "42" },
  ];
  return (
    <div className="grid grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.title} className="card">
          <p style={{color: '#9ca3af', fontSize: '0.9rem'}}>{stat.title}</p>
          <h3 style={{fontSize: '2rem', marginTop: '0.5rem'}}>{stat.value}</h3>
        </div>
      ))}
    </div>
  )
}
