"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/events", label: "Events" },
  { href: "/videos", label: "Videos" },
  { href: "/donations", label: "Donations" },
];

export default function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-green-700 tracking-tight"
          onClick={closeMenu}
        >
          Masjid
        </Link>

        <button
          type="button"
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <nav className="hidden md:flex gap-6 text-sm font-semibold text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-green-700 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <nav
        id="mobile-navigation"
        className={`md:hidden overflow-hidden border-t border-gray-100 bg-white text-sm font-semibold text-gray-700 transition-[max-height,opacity] duration-200 ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="min-h-11 rounded-lg px-2 py-3 hover:bg-gray-50 hover:text-green-700 transition"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
