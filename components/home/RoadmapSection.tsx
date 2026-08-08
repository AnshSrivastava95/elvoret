import Link from "next/link";
import {
  Monitor,
  Server,
  Layers3,
  Brain,
  Code2,
  Network,
  ArrowRight,
} from "lucide-react";

const roadmaps = [
  {
    title: "Frontend Developer",
    description:
      "Learn how to build modern, responsive interfaces from the ground up.",
    path: "HTML → CSS → JavaScript → React → Next.js",
    icon: Monitor,
    href: "/roadmaps/frontend",
  },
  {
    title: "Backend Developer",
    description:
      "Build APIs, databases, authentication systems, and production backends.",
    path: "Node.js → APIs → Databases → Auth → Deployment",
    icon: Server,
    href: "/roadmaps/backend",
  },
  {
    title: "Full Stack Developer",
    description:
      "Bring frontend and backend skills together to build complete applications.",
    path: "Frontend → Backend → Database → DevOps",
    icon: Layers3,
    href: "/roadmaps/full-stack",
  },
  {
    title: "AI / ML Engineer",
    description:
      "Build a strong foundation in machine learning and modern AI systems.",
    path: "Python → Math → ML → Deep Learning → AI",
    icon: Brain,
    href: "/roadmaps/ai-ml",
  },
  {
    title: "Software Engineer",
    description:
      "Develop the core skills needed to become a strong software engineer.",
    path: "Programming → DSA → Projects → CS Fundamentals",
    icon: Code2,
    href: "/roadmaps/software-engineer",
  },
  {
    title: "System Design",
    description:
      "Learn how to design reliable, scalable, and distributed software systems.",
    path: "Fundamentals → Architecture → Scalability → Distributed Systems",
    icon: Network,
    href: "/roadmaps/system-design",
  },
];

export default function RoadmapSection() {
  return (
    <section className="mt-20 sm:mt-24 lg:mt-28">
      <div className="rounded-3xl bg-purple-50 px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm">
            LEARN WITH A PLAN
          </div>

          <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Choose your path.
            <br />
            <span className="text-purple-700">Build your skills.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Follow structured learning paths designed to take you from
            fundamentals to building real-world software.
          </p>
        </div>

        {/* Roadmap Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map((roadmap) => {
            const Icon = roadmap.icon;

            return (
              <Link
                key={roadmap.title}
                href={roadmap.href}
                className="group flex min-h-[270px] flex-col rounded-2xl border border-purple-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 transition-colors duration-300 group-hover:bg-purple-700 group-hover:text-white">
                  <Icon size={23} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <h3 className="mt-5 text-xl font-bold tracking-tight text-gray-900">
                  {roadmap.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {roadmap.description}
                </p>

                {/* Learning Path */}
                <div className="mt-5 rounded-xl bg-gray-50 px-4 py-3">
                  <p className="text-xs font-medium leading-5 text-gray-500">
                    {roadmap.path}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-purple-700">
                  View Roadmap
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl bg-white px-6 py-6 shadow-sm sm:flex-row sm:items-center sm:px-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Not sure where to start?
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              Start with the Software Engineer roadmap and build from there.
            </p>
          </div>

          <Link
            href="/roadmaps"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-purple-700 px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-purple-800"
          >
            Explore All Roadmaps
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}