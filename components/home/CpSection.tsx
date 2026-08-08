import Link from "next/link";
import {
  Code2,
  Target,
  Trophy,
  BriefcaseBusiness,
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
  {
    title: "Interview Prep",
    description:
      "Sharpen your problem-solving skills for technical interviews and coding rounds.",
    icon: BriefcaseBusiness,
  },
];

export default function CPSection() {
  return (
    <section className="w-full py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Content */}

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          {/* Left */}

          <div>
            <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              PRACTICE & IMPROVE
            </div>

            <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Turn knowledge into
              <br />
              <span className="text-purple-700">
                problem-solving skills.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Practice competitive programming, master DSA patterns, and
              prepare for coding interviews with structured problem-solving
              resources.
            </p>

            <Link
              href="/cp"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-purple-700 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-purple-800 hover:shadow-xl"
            >
              Start Practicing

              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Right - Feature Cards */}

          <div className="grid gap-4 sm:grid-cols-2">
            {cpFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <Link
                  key={feature.title}
                  href="/cp"
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

                  <h3 className="mt-5 text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {feature.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-purple-700">
                    Explore
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}