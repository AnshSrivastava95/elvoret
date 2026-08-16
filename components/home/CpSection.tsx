import Link from "next/link";
import {
  Code2,
  Target,
  Trophy,
  ArrowRight,
} from "lucide-react";

const cpFeatures = [
  {
    title: "DSA Patterns",
    description:
      "Master the problem-solving patterns that appear again and again in coding problems.",
    icon: Code2,
  },
  {
    title: "Problem Sets",
    description:
      "Practice curated problems organized by topic and difficulty.",
    icon: Target,
  },
  {
    title: "Contests",
    description:
      "Prepare for competitive programming contests and improve your speed.",
    icon: Trophy,
  },
];

export default function CPSection() {
  return (
    <section className="w-full py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="max-w-4xl">
          <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            PRACTICE & IMPROVE
          </div>

          <h2 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            <span className="whitespace-nowrap">
              Turn knowledge into
            </span>
            <br />
            <span className="whitespace-nowrap text-purple-700">
              problem-solving skills.
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Practice competitive programming, master DSA patterns, and
            prepare for coding interviews with structured problem-solving
            resources.
          </p>
        </div>

        {/* Feature Cards */}

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cpFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
                key={feature.title}
                href="/cp"
                className="
                  group
                  flex
                  min-h-[240px]
                  flex-col
                  justify-between
                  rounded-2xl
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
                <div>
                  {/* Icon */}

                  <div
                    className="
                      flex
                      h-11
                      w-11
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
                      size={21}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Title */}

                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  {/* Description */}

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {feature.description}
                  </p>
                </div>

                {/* Explore */}

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-purple-700">
                  Explore

                  <ArrowRight
                    size={16}
                    className="
                      transition-transform
                      duration-200
                      group-hover:translate-x-1
                    "
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}

        <div className="mt-8">
          <Link
            href="/cp"
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
            Start Practicing

            <ArrowRight
              size={18}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

      </div>
    </section>
  );
}