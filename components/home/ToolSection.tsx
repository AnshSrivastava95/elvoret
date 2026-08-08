import Link from "next/link";
import {
  Sparkles,
  Code2,
  FileText,
  Zap,
  Database,
  Wrench,
  ArrowRight,
} from "lucide-react";

const toolCategories = [
  {
    title: "AI Tools",
    description:
      "AI-powered tools to help you research, write, code, and work smarter.",
    icon: Sparkles,
    href: "/ai",
  },
  {
    title: "Developer Tools",
    description:
      "Practical utilities for coding, debugging, development, and everyday engineering.",
    icon: Code2,
    href: "/tools",
  },
  {
    title: "Career Tools",
    description:
      "Build better resumes, prepare for interviews, and improve your job search.",
    icon: FileText,
    href: "/tools",
  },
  {
    title: "Productivity",
    description:
      "Simple tools that help developers organize work and get more done.",
    icon: Zap,
    href: "/tools",
  },
  {
    title: "Code & Data",
    description:
      "Analyze, transform, test, and understand code and data more efficiently.",
    icon: Database,
    href: "/tools",
  },
  {
    title: "Utilities",
    description:
      "Useful everyday utilities gathered into one developer-friendly toolkit.",
    icon: Wrench,
    href: "/tools",
  },
];

export default function ToolsSection() {
  return (
    <section className="w-full py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}

        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            BUILT FOR DEVELOPERS
          </div>

          <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Everything you need
            <br />
            <span className="text-purple-700">
              to build.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Stop jumping between tabs. Discover practical developer, AI,
            productivity, and career tools designed to help you build faster.
          </p>
        </div>

        {/* Tool Categories */}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {toolCategories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={category.href}
                className="
                  group
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-purple-200
                  hover:shadow-xl
                "
              >
                {/* Icon + Arrow */}

                <div className="flex items-start justify-between">
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-purple-50
                      text-purple-700
                      transition-all
                      duration-300
                      group-hover:bg-purple-700
                      group-hover:text-white
                    "
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                    />
                  </div>

                  <ArrowRight
                    size={19}
                    className="
                      text-gray-400
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      group-hover:text-purple-700
                    "
                  />
                </div>

                {/* Content */}

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {category.description}
                </p>

                <div className="mt-5 text-sm font-semibold text-purple-700">
                  Explore →
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href="/tools"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-purple-700
              px-6
              py-3.5
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-200
              hover:bg-purple-800
              hover:shadow-xl
            "
          >
            Explore All Tools

            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}