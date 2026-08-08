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
  { name: "All", icon: Sparkles },
  { name: "DSA", icon: Code2 },
  { name: "Backend", icon: Server },
  { name: "Frontend", icon: PanelsTopLeft },
  { name: "Career", icon: BriefcaseBusiness },
  { name: "Databases", icon: Database },
  { name: "Cloud", icon: Cloud },
  { name: "DevOps", icon: GitBranch },
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
          md:gap-4
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
              className="
                relative
                h-11
                w-11
                shrink-0
                md:h-12
                md:w-12
              "
            >
              <button
                type="button"
                aria-label={category.name}
                className={`
                  group
                  absolute
                  left-0
                  top-0
                  z-20
                  flex
                  h-11
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border
                  whitespace-nowrap
                  transition-[width,padding,background-color,border-color,box-shadow]
                  duration-200
                  ease-out
                  md:h-12

                  ${
                    isActive
                      ? `
                        w-20
                        border-purple-700
                        bg-purple-700
                        px-4
                        text-white
                        shadow-md
                        md:w-20
                      `
                      : `
                        w-11
                        border-gray-200
                        bg-white
                        px-0
                        text-gray-700

                        hover:w-[120px]
                        hover:border-purple-200
                        hover:bg-purple-50
                        hover:text-purple-700
                        hover:shadow-md

                        md:w-12
                        md:hover:w-[125px]
                      `
                  }
                `}
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                {/* Mobile label */}
                <span className="ml-2 text-sm font-medium md:hidden">
                  {category.name}
                </span>

                {/* Desktop label */}
                {!isActive && (
                  <span
                    className="
                      ml-2
                      hidden
                      text-sm
                      font-medium
                      md:block
                    "
                  >
                    {category.name}
                  </span>
                )}

                {/* Desktop active label */}
                {isActive && (
                  <span
                    className="
                      ml-2
                      hidden
                      text-sm
                      font-medium
                      md:block
                    "
                  >
                    All
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}