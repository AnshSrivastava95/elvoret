"use client";

import {
  Sparkles,
  Code2,
  Server,
  PanelsTopLeft,
  BriefcaseBusiness,
  Database,
  Cloud,
  GitBranch,
} from "lucide-react";

const categories = [
  {
    name: "All",
    icon: Sparkles,
  },
  {
    name: "DSA",
    icon: Code2,
  },
  {
    name: "Backend",
    icon: Server,
  },
  {
    name: "Frontend",
    icon: PanelsTopLeft,
  },
  {
    name: "Career",
    icon: BriefcaseBusiness,
  },
  {
    name: "Databases",
    icon: Database,
  },
  {
    name: "Cloud",
    icon: Cloud,
  },
  {
    name: "DevOps",
    icon: GitBranch,
  },
];

export default function CategoryCards() {
  return (
    <section className="mt-8 w-full sm:mt-10">
      <div
        className="
          flex
          w-full
          gap-3
          overflow-x-auto
          pb-2
          sm:gap-4
          md:overflow-visible
          md:pb-0
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isActive = index === 0;

          return (
            <div
              key={category.name}
              className="group relative shrink-0"
            >
              {/* Category Button */}

              <button
                type="button"
                aria-label={category.name}
                className={`
                  flex
                  h-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  transition-colors
                  duration-200

                  md:h-12
                  md:w-12
                  md:px-0

                  ${
                    isActive
                      ? `
                        w-auto
                        gap-2
                        border-purple-700
                        bg-purple-700
                        px-4
                        text-white
                        shadow-md
                      `
                      : `
                        w-auto
                        gap-2
                        border-gray-200
                        bg-white
                        px-4
                        text-gray-700
                        hover:border-purple-200
                        hover:bg-purple-50
                        hover:text-purple-700

                        md:gap-0
                      `
                  }
                `}
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                {/* Mobile label + All desktop label */}

                <span
                  className={`
                    whitespace-nowrap
                    text-sm
                    font-medium

                    ${
                      isActive
                        ? "block"
                        : "block md:hidden"
                    }
                  `}
                >
                  {category.name}
                </span>
              </button>

              {/* Desktop Tooltip */}

              {!isActive && (
                <div
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-full
                    z-50
                    mt-2
                    hidden
                    -translate-x-1/2
                    whitespace-nowrap
                    rounded-lg
                    bg-gray-900
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-white
                    opacity-0
                    shadow-lg
                    transition-opacity
                    duration-150
                    group-hover:opacity-100
                    md:block
                  "
                >
                  {category.name}

                  <div
                    className="
                      absolute
                      -top-1
                      left-1/2
                      h-2
                      w-2
                      -translate-x-1/2
                      rotate-45
                      bg-gray-900
                    "
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}