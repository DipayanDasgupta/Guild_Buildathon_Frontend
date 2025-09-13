"use client";
import { Menu, X } from 'lucide-react';

export function MenuButton({ isOpen, onClick }: { isOpen: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className="menu-button">
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}
