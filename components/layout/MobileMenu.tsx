"use client";

import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#about", label: "About" },
  { href: "/#Experience", label: "Experience" },
];

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute left-0 right-0 top-full z-50 mt-2 py-4 px-4 rounded-2xl border border-brand300 bg-brand100/95 backdrop-blur-sm shadow-lg flex flex-col gap-2"
      role="menu"
    >
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onClose}
          className="text-primary py-2 px-3 rounded-lg hover:bg-brand200/50 transition-colors"
          role="menuitem"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
