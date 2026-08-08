import Image from "next/image";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Brain,
  Network,
  Wrench,
  Newspaper,
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
    name: "Tools",
    href: "/tools",
    icon: Wrench,
  },
  {
    name: "News",
    href: "/news",
    icon: Newspaper,
  },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
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
                className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-purple-50 hover:text-purple-700"
              >
                <Icon
                  size={17}
                  strokeWidth={1.8}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5"
                />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Search */}
        <Link
          href="/search"
          aria-label="Search Elvoret"
          className="hidden rounded-xl p-2.5 text-gray-700 transition-colors duration-200 hover:bg-purple-50 hover:text-purple-700 md:flex"
        >
          <Search size={21} strokeWidth={1.8} />
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Open navigation menu"
          className="flex rounded-xl p-2 text-gray-700 transition-colors duration-200 hover:bg-purple-50 hover:text-purple-700 md:hidden"
        >
          <svg
            width="27"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>

      </div>
    </nav>
  );
}