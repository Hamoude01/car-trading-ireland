"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Car, MessageCircle } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Car className="w-7 h-7 text-accent" />
            <span>
              <span className="text-accent">Hamoude</span> Car Trade
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="hover:text-accent transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/cars"
              className="hover:text-accent transition-colors font-medium"
            >
              Browse Cars
            </Link>
            <Link
              href="/sell-your-car"
              className="hover:text-accent transition-colors font-medium"
            >
              Sell Your Car
            </Link>
            <Link
              href="/about"
              className="hover:text-accent transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-accent transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/353877110508"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block py-2 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/cars"
              className="block py-2 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Cars
            </Link>
            <Link
              href="/sell-your-car"
              className="block py-2 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sell Your Car
            </Link>
            <Link
              href="/about"
              className="block py-2 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block py-2 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <a
              href="https://wa.me/353877110508"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] px-4 py-2 rounded-lg font-semibold transition-colors mt-2"
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
