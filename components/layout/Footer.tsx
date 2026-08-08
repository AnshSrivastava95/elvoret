import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

const footerColumns = [
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
      { name: "Newsletter", href: "/newsletter" },
      { name: "Contact", href: "/contact" },
      { name: "Support", href: "/support" },
    ],
  },
];

const socialLinks = [
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
    <footer className="mt-24 w-full border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">

        {/* =========================================
            MAIN FOOTER
        ========================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-12
            lg:grid-cols-[1.45fr_1fr_1fr_1fr]
            lg:gap-14
          "
        >

          {/* =========================================
              BRAND
          ========================================= */}

          <div className="flex h-full flex-col">

            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2"
            >
              <Image
                src="/logo.png"
                alt="Elvoret"
                width={38}
                height={38}
                priority
              />

              <span className="text-xl font-bold tracking-wide text-purple-900">
                ELVORET
              </span>
            </Link>

            <div className="mt-7">

              <h2 className="max-w-md text-3xl font-extrabold leading-[1.08] tracking-tight text-gray-900 sm:text-4xl">
                Everything you
                <br />
                need to
                <span className="block text-purple-700">
                  build better.
                </span>
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-6 text-gray-600 sm:text-base">
                Learn, practice, build, and grow with practical resources
                designed for the modern software engineer.
              </p>

            </div>

            {/* Newsletter */}

            <div className="mt-auto pt-8">

              <p className="text-sm font-bold text-gray-900">
                Get software engineering insights.
              </p>

              <div className="mt-3 flex max-w-lg flex-col gap-2 sm:flex-row">

                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="
                    h-11
                    min-w-0
                    flex-1
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-purple-500
                    focus:ring-2
                    focus:ring-purple-100
                  "
                />

                <button
                  type="button"
                  className="
                    inline-flex
                    h-11
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-purple-700
                    px-5
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition-all
                    duration-200
                    hover:bg-purple-800
                    hover:shadow-md
                  "
                >
                  Subscribe
                  <ArrowUpRight size={16} />
                </button>

              </div>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                No spam. Just useful software engineering content.
              </p>

            </div>

          </div>

          {/* =========================================
              NAVIGATION COLUMNS
          ========================================= */}

          {footerColumns.map((column) => (
            <div
              key={column.title}
              className="flex h-full min-h-[330px] flex-col"
            >

              <h3 className="text-xs font-bold tracking-[0.12em] text-gray-900">
                {column.title}
              </h3>

              <ul className="mt-6 space-y-4">

                {column.links.map((link) => (
                  <li key={link.name}>

                    <Link
                      href={link.href}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-1.5
                        text-sm
                        text-gray-600
                        transition-colors
                        duration-200
                        hover:text-purple-700
                      "
                    >
                      <span>{link.name}</span>

                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.8}
                        className="
                          -translate-x-1
                          opacity-0
                          transition-all
                          duration-200
                          group-hover:translate-x-0
                          group-hover:opacity-100
                        "
                      />

                    </Link>

                  </li>
                ))}

              </ul>

            </div>
          ))}

        </div>

        {/* =========================================
            DIVIDER
        ========================================= */}

        <div className="mt-12 h-px w-full bg-gray-200" />

        {/* =========================================
            BOTTOM ROW
        ========================================= */}

        <div className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Copyright */}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 sm:text-sm">

            <span>
              © {new Date().getFullYear()} Elvoret.
            </span>

            <span className="text-gray-300">
              •
            </span>

            <span>
              Built for developers.
            </span>

          </div>

          {/* Social */}

          <div className="flex items-center gap-2">

            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Elvoret on ${social.name}`}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-200
                  text-xs
                  font-bold
                  text-gray-600
                  transition-all
                  duration-200
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
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                border
                border-gray-200
                text-gray-600
                transition-all
                duration-200
                hover:border-purple-200
                hover:bg-purple-50
                hover:text-purple-700
              "
            >
              <Mail size={17} strokeWidth={1.8} />
            </Link>

          </div>

        </div>

        {/* =========================================
            LEGAL
        ========================================= */}

        <div className="mt-5 flex flex-col gap-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex flex-wrap gap-x-5 gap-y-2">

            <Link
              href="/privacy"
              className="transition-colors hover:text-purple-700"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-purple-700"
            >
              Terms of Use
            </Link>

            <Link
              href="/cookies"
              className="transition-colors hover:text-purple-700"
            >
              Cookie Policy
            </Link>

          </div>

          <span>
            Made for the next generation of engineers.
          </span>

        </div>

      </div>
    </footer>
  );
}