"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, Calculator, Building2, Smartphone, TrendingUp, Shield } from "lucide-react";
import { ThemeToggle } from './theme-toggle'; // Import the new component

export function Sidebar() {
  const pathname = usePathname();
  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "Documents", href: "/documents", icon: FileText },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo"></div>
        <h2>Turtlemint</h2>
      </div>
      <nav className="sidebar-nav">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} className={pathname === item.href ? 'active' : ''}>
            <item.icon size={20} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="avatar">V</div>
        <div>
            <p>Vijay Kumar</p>
            <p style={{fontSize: '0.8rem', color: '#9ca3af'}}>Expert Advisor</p>
        </div>
        <div style={{marginLeft: 'auto'}}>
            <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
