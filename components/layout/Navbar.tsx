"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";

const navItems = [
  { name: "Articles", href: "/articles" },
  { name: "AI", href: "/ai" },
  { name: "System Design", href: "/system-design" },
  { name: "Tools", href: "/tools" },
  { name: "News", href: "/news" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt="Elvoret Logo"
            width={40}
            height={40}
            priority
          />

          <span className="text-lg font-bold tracking-wide text-purple-900 sm:text-xl">
            ELVORET
          </span>
        </Link>

        {/* Desktop Nav */}

        <nav className="hidden items-center gap-8 lg:flex">

          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 transition-colors hover:text-purple-700"
            >
              {item.name}
            </Link>
          ))}

        </nav>

        {/* Desktop Search */}

        <button className="hidden rounded-lg p-2 transition hover:bg-gray-100 lg:flex">
          <Search size={20} />
        </button>

        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden border-t border-gray-200 bg-white transition-all duration-300 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col">

          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-6 py-4 text-gray-700 transition hover:bg-purple-50 hover:text-purple-700"
            >
              {item.name}
            </Link>
          ))}

          <button className="flex items-center gap-3 px-6 py-4 text-left text-gray-700 hover:bg-purple-50">
            <Search size={18} />
            Search
          </button>

        </nav>
      </div>
    </header>
  );
}