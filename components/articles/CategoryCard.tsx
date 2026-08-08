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
            /*
             * Fixed slot.
             *
             * The slot NEVER changes width when the button expands.
             * This prevents the vibration/jitter problem.
             */
            <div
              key={category.name}
              className={`
                relative
                h-11
                shrink-0

                ${isActive ? "w-20" : "w-11"}

                md:h-12
                ${isActive ? "md:w-20" : "md:w-12"}
              `}
            >
              <button
                type="button"
                aria-label={category.name}
                className={`
                  group
                  absolute
                  left-0
                  top-0
                  z-10

                  flex
                  h-11
                  items-center
                  justify-center

                  overflow-hidden
                  rounded-full
                  border

                  transition-[width,padding,background-color,border-color,color,box-shadow]
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
                      `
                      : `
                        w-11
                        border-gray-200
                        bg-white
                        px-0
                        text-gray-700

                        hover:w-auto
                        hover:min-w-[110px]
                        hover:border-purple-200
                        hover:bg-purple-50
                        hover:px-4
                        hover:text-purple-700
                        hover:shadow-md

                        md:w-12
                        md:hover:min-w-[110px]
                      `
                  }
                `}
              >
                {/* Icon */}

                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                {/* Mobile label */}

                <span className="ml-2 whitespace-nowrap text-sm font-medium md:hidden">
                  {category.name}
                </span>

                {/* Desktop label */}

                {!isActive && (
                  <span
                    className="
                      hidden
                      whitespace-nowrap
                      text-sm
                      font-medium

                      md:ml-0
                      md:block
                      md:max-w-0
                      md:overflow-hidden
                      md:opacity-0

                      md:transition-[max-width,margin,opacity]
                      md:duration-200

                      md:group-hover:ml-2
                      md:group-hover:max-w-[100px]
                      md:group-hover:opacity-100
                    "
                  >
                    {category.name}
                  </span>
                )}

                {/* Desktop All label */}

                {isActive && (
                  <span className="ml-2 hidden whitespace-nowrap text-sm font-medium md:block">
                    {category.name}
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