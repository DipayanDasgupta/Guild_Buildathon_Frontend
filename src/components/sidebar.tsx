"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, ChevronLeft, Shield, Car, Bike, Heart, ChevronDown, Repeat, CheckCircle, Clock, UserPlus } from "lucide-react";
import { ThemeToggle } from './theme-toggle';
import { ShieldCheck } from "lucide-react"; // Importing ShieldCheck icon

export function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: (c: boolean) => void }) {
  const pathname = usePathname();
  const [clientsOpen, setClientsOpen] = useState(true); // Changed to true for default open
  const [productsOpen, setProductsOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Reconciliation", href: "/reconciliation", icon: Repeat },
    { name: "Documents", href: "/documents", icon: FileText },
    { name: "Audit Logs", href: "/audits", icon: ShieldCheck }
  ];

  const clientLinks = [
    { name: "Active Clients", href: "/clients?status=Active", icon: CheckCircle },
    { name: "Engaged Clients", href: "/clients?status=Engaged", icon: Clock },
    { name: "Prospective Clients", href: "/clients?status=Prospective", icon: UserPlus },
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
          <>
            <Image src="/turtlemint-logo.png" alt="Turtlemint Logo" width={140} height={26} priority />
            
          </>
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

        {/* Clients Dropdown */}
        <div>
          <button onClick={() => setClientsOpen(!clientsOpen)} className="sidebar-dropdown-toggle">
            <Users size={20} />
            {!collapsed && <span>Clients</span>}
            {!collapsed && <ChevronDown size={16} className={`dropdown-arrow ${clientsOpen ? 'rotated' : ''}`} />}
          </button>
          {clientsOpen && !collapsed && (
            <div className="sidebar-dropdown-menu">
              {clientLinks.map(link => (
                <Link href={link.href} key={link.name} className={pathname === link.href ? 'active-child' : ''}>
                  <link.icon size={16} />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Products Dropdown */}
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
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Expert Advisor</p>
          </div>
        )}
        <div style={{ marginLeft: 'auto' }}>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}