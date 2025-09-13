"use client";

export function QuickActions() {
  const actions = [
    { title: "Get an Insurance Quote", buttonText: "Get Quote", href: "https://www.turtlemint.com/life-insurance/term-insurance" },
    { title: "Become a Turtlemint Advisor", buttonText: "Join Now", href: "https://www.turtlemintpro.com/?source_caller=ui&shortlink=4ld1d3gc&c=Become_Advisor_Tile&pid=Corporate_Website&af_xp=custom" },
    { title: "Discover Embedded Solutions", buttonText: "Learn More", href: "https://www.turtlefin.com/" },
  ];
  return (
    <div className="grid grid-cols-3">
      {actions.map((action) => (
        <div key={action.title} className="card">
          <h3>{action.title}</h3>
          {/* Use an anchor tag to link to external sites */}
          <a href={action.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{marginTop: '1rem', display: 'inline-block'}}>
            {action.buttonText}
          </a>
        </div>
      ))}
    </div>
  )
}
