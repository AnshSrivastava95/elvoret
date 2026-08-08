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
      <div className="flex w-full items-center gap-3 overflow-x-auto pb-2 sm:overflow-visible sm:pb-0">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isActive = index === 0;

          return (
            <button
              key={category.name}
              type="button"
              className={`
                group flex h-12 shrink-0 items-center justify-center
                gap-2 overflow-hidden rounded-full border
                text-sm font-medium
                transition-all duration-300 ease-out

                w-auto min-w-[72px] px-4

                sm:w-12 sm:min-w-0 sm:px-0
                sm:hover:w-32

                ${
                  isActive
                    ? "border-purple-700 bg-purple-700 text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-700 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                }
              `}
            >
              <Icon
                size={18}
                strokeWidth={1.8}
                className="shrink-0"
              />

              {/* Mobile */}
              <span className="whitespace-nowrap sm:hidden">
                {category.name}
              </span>

              {/* Desktop */}
              <span
                className="
                  hidden whitespace-nowrap
                  opacity-0
                  transition-opacity duration-200
                  sm:block sm:group-hover:opacity-100
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