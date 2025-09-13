export function QuickActions() {
  const actions = [
    { title: "Get an Insurance Quote", buttonText: "Get Quote" },
    { title: "Become a Turtlemint Advisor", buttonText: "Join Now" },
    { title: "Discover Embedded Solutions", buttonText: "Learn More" },
  ];
  return (
    <div className="grid grid-cols-3">
      {actions.map((action) => (
        <div key={action.title} className="card">
          <h3>{action.title}</h3>
          <button className="btn btn-primary" style={{marginTop: '1rem'}}>{action.buttonText}</button>
        </div>
      ))}
    </div>
  )
}
