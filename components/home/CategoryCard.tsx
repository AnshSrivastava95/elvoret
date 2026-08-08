import Link from "next/link";
import {
  BookOpen,
  Brain,
  Map,
  Trophy,
  Network,
  Wrench,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    name: "Articles",
    description: "Practical software engineering guides and deep dives.",
    href: "/articles",
    icon: BookOpen,
  },
  {
    name: "AI",
    description: "AI, machine learning, LLMs, and practical AI development.",
    href: "/ai",
    icon: Brain,
  },
  {
    name: "Roadmaps",
    description: "Structured paths to learn and build real engineering skills.",
    href: "/roadmaps",
    icon: Map,
  },
  {
    name: "CP",
    description: "Competitive programming, problem solving, and practice.",
    href: "/cp",
    icon: Trophy,
  },
  {
    name: "System Design",
    description: "Learn how scalable real-world systems are designed.",
    href: "/system-design",
    icon: Network,
  },
  {
    name: "Tools",
    description: "Useful developer and AI tools in one place.",
    href: "/tools",
    icon: Wrench,
  },
];

export default function CategoryCards() {
  return (
    <section className="w-full py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}

        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            Explore Elvoret
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Everything you need to level up
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Learn, practice, and build your software engineering skills with
            resources designed for the modern developer.
          </p>
        </div>

        {/* Category Grid */}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={category.href}
                className="
                  group
                  relative
                  flex
                  min-h-[210px]
                  flex-col
                  justify-between
                  overflow-hidden
                  rounded-3xl
                  border
                  border-gray-200
                  bg-white
                  p-7
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-purple-200
                  hover:shadow-xl
                "
              >
                {/* Icon */}

                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
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

                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.8}
                    className="
                      text-gray-400
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-purple-700
                    "
                  />

                </div>

                {/* Content */}

                <div className="mt-8">

                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-purple-700">
                    {category.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                    {category.description}
                  </p>

                </div>

              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
}