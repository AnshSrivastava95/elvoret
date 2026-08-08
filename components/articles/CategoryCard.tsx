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
    <section className="mt-8 w-full">
      <div
        className="
          flex
          gap-2
          overflow-x-auto
          pb-2
          scrollbar-none
          md:gap-3
          md:overflow-visible
          md:pb-0
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
                    ? "w-20 border-purple-700 bg-purple-700 text-white shadow-md"
                    : "w-11 border-gray-200 bg-white text-gray-700 hover:w-auto hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                }

                md:h-12
                ${
                  isActive
                    ? "md:w-20"
                    : "md:w-12 md:hover:px-4"
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
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "ml-2 opacity-100"
                      : "ml-0 max-w-0 overflow-hidden opacity-0 group-hover:ml-2 group-hover:max-w-[120px] group-hover:opacity-100"
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