import Link from "next/link";
import {
  Newspaper,
  Cpu,
  BriefcaseBusiness,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react";

const newsItems = [
  {
    title: "AI & Technology",
    description:
      "Follow important developments across AI, software, and emerging technologies.",
    icon: Sparkles,
  },
  {
    title: "Developer News",
    description:
      "Stay updated on frameworks, tools, platforms, and technologies developers use.",
    icon: Cpu,
  },
  {
    title: "Career & Industry",
    description:
      "Keep up with hiring trends, engineering careers, and changes across the tech industry.",
    icon: BriefcaseBusiness,
  },
];

export default function NewsSection() {
  return (
    <section className="w-full py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
              <Newspaper size={16} strokeWidth={1.8} />
              STAY INFORMED
            </div>

            <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Know what&apos;s
              <br />
              <span className="text-purple-700">
                happening.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Stay up to date with the latest developments in technology,
              AI, software engineering, and the developer ecosystem.
            </p>
          </div>

          {/* Desktop CTA */}

          <Link
            href="/news"
            className="
              hidden
              shrink-0
              items-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-white
              px-5
              py-3
              font-semibold
              text-gray-900
              shadow-sm
              transition-all
              duration-200
              hover:border-purple-200
              hover:text-purple-700
              hover:shadow-md
              sm:inline-flex
            "
          >
            View All News
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* News Categories */}

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {newsItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href="/news"
                className="
                  group
                  relative
                  overflow-hidden
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
                {/* Decorative background */}

                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}

                <div
                  className="
                    relative
                    flex
                    h-12
                    w-12
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
                    size={22}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Content */}

                <h3 className="relative mt-6 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="relative mt-2 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>

                <div className="relative mt-6 flex items-center gap-2 text-sm font-semibold text-purple-700">
                  Explore News

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile CTA */}

        <div className="mt-8 sm:hidden">
          <Link
            href="/news"
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-purple-700
              px-6
              py-3.5
              font-semibold
              text-white
              shadow-lg
              transition-colors
              duration-200
              hover:bg-purple-800
            "
          >
            View All News
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Small bottom note */}

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Clock size={15} strokeWidth={1.8} />
          <span>Fresh technology updates, all in one place.</span>
        </div>
      </div>
    </section>
  );
}