"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, ChevronDown, Shield, Car, Bike, Heart } from "lucide-react";
import { ThemeToggle } from './theme-toggle';

export function Sidebar() {
  const pathname = usePathname();
  const [productsOpen, setProductsOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "Documents", href: "/documents", icon: FileText },
  ];

  // This is the updated list with the correct external URLs
  const productLinks = [
      { name: "Health Insurance", icon: Heart, href: "https://app.turtlemintinsurance.com/health-insurance/health-profile/AHQ17W7SV2Q" },
      { name: "Car Insurance", icon: Car, href: "https://app.turtlemintinsurance.com/car-insurance/car-profile/car-registration-info" },
      { name: "Bike Insurance", icon: Bike, href: "https://app.turtlemintinsurance.com/two-wheeler-insurance/two-wheeler-profile/tw-registration-info" },
      { name: "Life Insurance", icon: Shield, href: "https://app.turtlemintinsurance.com/life-insurance/profile/term/about-insured" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header"><Image src="/turtlemint-logo.png" alt="Turtlemint Logo" width={140} height={26} priority={true} /></div>
      <nav className="sidebar-nav">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} className={pathname === item.href ? 'active' : ''}><item.icon size={20} /><span>{item.name}</span></Link>
        ))}
        {/* Products Dropdown */}
        <div>
            <button onClick={() => setProductsOpen(!productsOpen)} className="sidebar-dropdown-toggle">
                <Shield size={20} /><span>Products</span><ChevronDown size={16} className={productsOpen ? 'rotated' : ''} />
            </button>
            {productsOpen && (
                <div className="sidebar-dropdown-menu">
                    {productLinks.map(link => (
                        // This is now a functional external link that opens in a new tab
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
        <div><p>Vijay Kumar</p><p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Expert Advisor</p></div>
        <div style={{marginLeft: 'auto'}}><ThemeToggle /></div>
      </div>
    </aside>
  );
}
