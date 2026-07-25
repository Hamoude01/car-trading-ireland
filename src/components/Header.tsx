"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/cars" },
  { label: "Sell Your Car", href: "/sell-your-car" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link
            href="/"
            data-testid="logo-link"
            className="font-display text-2xl tracking-tight text-white"
          >
            Hamoude<span className="text-accent">CarTrade</span>
          </Link>

          <nav className="hidden md:flex items-center gap-9">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-gray-300 hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/353877110508"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="header-whatsapp-btn"
              className="inline-flex items-center gap-2 border border-accent/60 text-accent hover:bg-accent hover:text-black px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-5 space-y-1 bg-black/90 backdrop-blur-xl -mx-4 px-4 border-t border-border">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-gray-200 hover:text-accent transition-colors border-b border-border/60"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://wa.me/353877110508"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-black px-5 py-2.5 rounded-full text-sm font-semibold mt-3"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
