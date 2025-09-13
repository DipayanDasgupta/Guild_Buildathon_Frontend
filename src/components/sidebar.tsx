"use client";
import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText } from "lucide-react";
import { ThemeToggle } from './theme-toggle';

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
        {/* Use the Next.js Image component for optimization */}
        <Image 
          src="/turtlemint-logo.png" 
          alt="Turtlemint Logo"
          width={140} 
          height={26}
          priority={true} 
        />
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
            <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Expert Advisor</p>
        </div>
        <div style={{marginLeft: 'auto'}}>
            <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
