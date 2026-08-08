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
          gap-2
          overflow-x-auto
          pb-2
          sm:gap-3
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
            <button
              key={category.name}
              type="button"
              aria-label={category.name}
              className={`
                group
                flex
                h-11
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border
                transition-all
                duration-300
                ease-out

                ${
                  isActive
                    ? "border-purple-700 bg-purple-700 px-4 text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-700 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                }

                /* Mobile */

                max-w-none
                px-4

                /* Desktop */

                md:h-12
                ${
                  isActive
                    ? "md:w-20 md:px-0"
                    : "md:w-12 md:px-0 md:hover:w-auto md:hover:px-4"
                }
              `}
            >
              <Icon
                size={18}
                strokeWidth={1.8}
                className="shrink-0"
              />

              <span
                className={`
                  whitespace-nowrap
                  text-sm
                  font-medium

                  /* Mobile: always visible */

                  ml-2
                  max-w-[140px]
                  opacity-100

                  /* Desktop: hidden until hover */

                  md:ml-0
                  md:max-w-0
                  md:overflow-hidden
                  md:opacity-0
                  md:transition-all
                  md:duration-300

                  ${
                    !isActive
                      ? "md:group-hover:ml-2 md:group-hover:max-w-[120px] md:group-hover:opacity-100"
                      : ""
                  }
                `}
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