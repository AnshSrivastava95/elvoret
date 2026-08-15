import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

const columns = [
  {
    title: "EXPLORE",
    links: [
      { name: "Articles", href: "/articles" },
      { name: "AI", href: "/ai" },
      { name: "System Design", href: "/system-design" },
      { name: "Competitive Programming", href: "/cp" },
    ],
  },
  {
    title: "LEARN",
    links: [
      { name: "Roadmaps", href: "/roadmaps" },
      { name: "Playground", href: "/playground" },
      { name: "Developer Tools", href: "/tools" },
      { name: "Tech News", href: "/news" },
    ],
  },
  {
    title: "ELVORET",
    links: [
      { name: "About", href: "/about" },
      { name: "Refund", href: "/refund" },
      { name: "Contact", href: "/contact" },
      { name: "Support", href: "/support" },
    ],
  },
];

const socials = [
  {
    name: "GitHub",
    href: "https://github.com",
    label: "GH",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    label: "in",
  },
  {
    name: "X",
    href: "https://x.com",
    label: "𝕏",
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">

        {/* Main footer */}

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-16">

          {/* Brand */}

          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <Image
                src="/logo.png"
                alt="Elvoret"
                width={36}
                height={36}
              />

              <span className="text-xl font-bold tracking-wide text-purple-900">
                ELVORET
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-600 sm:text-base">
              Learn, practice, build, and grow with practical resources
              designed for the modern software engineer.
            </p>

            {/* Socials */}

            <div className="mt-7 flex items-center gap-2">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-lg border border-gray-200
                    text-xs font-bold text-gray-600
                    transition-all duration-200
                    hover:border-purple-200
                    hover:bg-purple-50
                    hover:text-purple-700
                  "
                >
                  {social.label}
                </Link>
              ))}

              <Link
                href="/contact"
                aria-label="Contact Elvoret"
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-lg border border-gray-200
                  text-gray-600
                  transition-all duration-200
                  hover:border-purple-200
                  hover:bg-purple-50
                  hover:text-purple-700
                "
              >
                <Mail size={17} strokeWidth={1.8} />
              </Link>
            </div>
          </div>

          {/* Navigation columns */}

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-bold tracking-[0.12em] text-gray-900">
                {column.title}
              </h3>

              <ul className="mt-5 space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="
                        text-sm text-gray-600
                        transition-colors duration-200
                        hover:text-purple-700
                      "
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}

        <div className="my-10 h-px w-full bg-gray-200" />

        {/* Bottom */}

        <div className="flex flex-col gap-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span>
              © {new Date().getFullYear()} Elvoret.
            </span>

            <span className="text-gray-300">•</span>

            <span>Built for developers.</span>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="hover:text-purple-700"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-purple-700"
            >
              Terms of Use
            </Link>

            <Link
              href="/cookies"
              className="hover:text-purple-700"
            >
              Cookie Policy
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}