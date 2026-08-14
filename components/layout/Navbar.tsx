"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  Search,
  BookOpen,
  Brain,
  Network,
  Wrench,
  Newspaper,
  Menu,
  X,
  Trophy,
  Code2,
  Map,
  LogIn, // Added an icon for the login button
} from "lucide-react";

const navItems = [
  {
    name: "Articles",
    href: "/articles",
    icon: BookOpen,
  },
  {
    name: "AI",
    href: "/ai",
    icon: Brain,
  },
  {
    name: "System Design",
    href: "/system-design",
    icon: Network,
  },
  {
    name: "CP",
    href: "/cp",
    icon: Trophy,
  },
  {
    name: "Roadmaps",
    href: "/roadmaps",
    icon: Map,
  },
  {
    name: "Tools",
    href: "/tools",
    icon: Wrench,
  },
  {
    name: "News",
    href: "/news",
    icon: Newspaper,
  },
  {
    name: "Playground",
    href: "/playground",
    icon: Code2,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="Elvoret Logo"
            width={36}
            height={36}
            priority
          />
          <span className="text-lg font-bold tracking-wide text-purple-900 sm:text-xl">
            ELVORET
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  px-3
                  py-2.5
                  text-sm
                  font-medium
                  text-gray-700
                  transition-all
                  duration-200
                  hover:bg-purple-50
                  hover:text-purple-700
                  lg:px-4
                "
              >
                <Icon
                  size={17}
                  strokeWidth={1.8}
                  className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5"
                />
                <span className="whitespace-nowrap">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Side: Search + Login Button */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/search"
            aria-label="Search Elvoret"
            className="
              rounded-xl
              p-2.5
              text-gray-700
              transition-colors
              duration-200
              hover:bg-purple-50
              hover:text-purple-700
            "
          >
            <Search
              size={21}
              strokeWidth={1.8}
            />
          </Link>

          {/* Desktop Login Button */}
          <Link
            href="/login"
            className="
              rounded-xl
              bg-purple-900
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition-colors
              duration-200
              hover:bg-purple-800
            "
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={
            isOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isOpen}
          onClick={() => setIsOpen((previous) => !previous)}
          className="
            flex
            rounded-xl
            p-2
            text-gray-700
            transition-colors
            duration-200
            hover:bg-purple-50
            hover:text-purple-700
            md:hidden
          "
        >
          {isOpen ? (
            <X
              size={27}
              strokeWidth={2}
            />
          ) : (
            <Menu
              size={27}
              strokeWidth={2}
            />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`
          overflow-hidden
          border-t
          border-gray-100
          bg-white
          transition-all
          duration-300
          ease-in-out
          md:hidden
          ${
            isOpen
              ? "max-h-[800px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="px-4 py-3 sm:px-6">

          {/* Navigation Links */}
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3.5
                    text-base
                    font-medium
                    text-gray-700
                    transition-colors
                    duration-200
                    hover:bg-purple-50
                    hover:text-purple-700
                  "
                >
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    className="shrink-0"
                  />
                  <span>
                    {item.name}
                  </span>
                </Link>
              );
            })}

            {/* Mobile Search */}
            <Link
              href="/search"
              onClick={closeMenu}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3.5
                text-base
                font-medium
                text-gray-700
                transition-colors
                duration-200
                hover:bg-purple-50
                hover:text-purple-700
              "
            >
              <Search
                size={20}
                strokeWidth={1.8}
              />
              <span>
                Search
              </span>
            </Link>

            {/* Mobile Login Button */}
            <Link
              href="/login"
              onClick={closeMenu}
              className="
                mt-2
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-purple-900
                px-4
                py-3.5
                text-base
                font-semibold
                text-white
                transition-colors
                duration-200
                hover:bg-purple-800
              "
            >
              <LogIn size={20} strokeWidth={1.8} />
              <span>Sign In</span>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}