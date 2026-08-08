"use client";

import {
  Sparkles,
  Code2,
  Server,
  LayoutDashboard,
  BriefcaseBusiness,
  Database,
  Cloud,
  GitBranch,
} from "lucide-react";

const categories = [
  { name: "All", icon: Sparkles },
  { name: "DSA", icon: Code2 },
  { name: "Backend", icon: Server },
  { name: "Frontend", icon: LayoutDashboard },
  { name: "Career", icon: BriefcaseBusiness },
  { name: "Database", icon: Database },
  { name: "Cloud", icon: Cloud },
  { name: "DevOps", icon: GitBranch },
];

export default function CategoryCards() {
  return (
    <section className="mt-8 w-full">
      <div
        className="
          flex w-full items-center gap-3
          overflow-x-auto pb-2
          scrollbar-none
          sm:overflow-visible sm:pb-0
        "
      >
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isActive = index === 0;

          return (
            <button
              key={category.name}
              type="button"
              className={`
                group
                flex
                h-12
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                text-sm
                font-medium
                transition-all
                duration-300
                ease-out

                /* Mobile */
                min-w-[72px]
                gap-2
                px-4

                /* Desktop */
                sm:w-12
                sm:min-w-0
                sm:gap-0
                sm:px-0
                sm:hover:w-32

                ${
                  isActive
                    ? "border-purple-700 bg-purple-700 text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-700 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                }
              `}
            >
              {/* Icon */}
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <Icon
                  size={18}
                  strokeWidth={1.8}
                />
              </span>

              {/* Mobile label */}
              <span className="whitespace-nowrap sm:hidden">
                {category.name}
              </span>

              {/* Desktop label */}
              <span
                className="
                  hidden
                  whitespace-nowrap
                  overflow-hidden
                  opacity-0
                  transition-all
                  duration-200
                  sm:block
                  sm:max-w-0
                  sm:group-hover:ml-2
                  sm:group-hover:max-w-[90px]
                  sm:group-hover:opacity-100
                "
              >
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}