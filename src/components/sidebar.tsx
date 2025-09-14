"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// --- THIS IS THE FIX: Import the 'Repeat' icon ---
import { LayoutDashboard, Users, FileText, ChevronLeft, Shield, Car, Bike, Heart, ChevronDown, Repeat } from "lucide-react";
import { ThemeToggle } from './theme-toggle';

export function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: (c: boolean) => void }) {
  const pathname = usePathname();
  const [productsOpen, setProductsOpen] = useState(false);

  // The navigation array now correctly includes the new Reconciliation item
  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "Documents", href: "/documents", icon: FileText },
    { name: "Reconciliation", href: "/reconciliation", icon: Repeat },
  ];

  const productLinks = [
      { name: "Health Insurance", icon: Heart, href: "https://app.turtlemintinsurance.com/health-insurance/health-profile/AHQ17W7SV2Q" },
      { name: "Car Insurance", icon: Car, href: "https://app.turtlemintinsurance.com/car-insurance/car-profile/car-registration-info" },
      { name: "Bike Insurance", icon: Bike, href: "https://app.turtlemintinsurance.com/two-wheeler-insurance/two-wheeler-profile/tw-registration-info" },
      { name: "Life Insurance", icon: Shield, href: "https://app.turtlemintinsurance.com/life-insurance/profile/term/about-insured" },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <Image src="/turtlemint-logo.png" alt="Turtlemint Logo" width={140} height={26} priority />
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="sidebar-toggle">
          <ChevronLeft size={16} />
        </button>
      </div>
      <nav className="sidebar-nav">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} className={pathname === item.href ? 'active' : ''}>
            <item.icon size={20} />
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
        
        <div>
            <button onClick={() => setProductsOpen(!productsOpen)} className="sidebar-dropdown-toggle">
                <Shield size={20} />
                {!collapsed && <span>Products</span>}
                {!collapsed && <ChevronDown size={16} className={`dropdown-arrow ${productsOpen ? 'rotated' : ''}`} />}
            </button>
            {productsOpen && !collapsed && (
                <div className="sidebar-dropdown-menu">
                    {productLinks.map(link => (
                        <a href={link.href} key={link.name} target="_blank" rel="noopener noreferrer">
                            <link.icon size={16} />
                            <span>{link.name}</span>
                        </a>
                    ))}
                </div>
            )}
        </div>
      </nav>
      <div className="sidebar-footer">
        <div className="avatar">V</div>
        {!collapsed && (
            <div>
                <p>Vijay Kumar</p>
                <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Expert Advisor</p>
            </div>
        )}
        <div style={{marginLeft: 'auto'}}>
            <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}