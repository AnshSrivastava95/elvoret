import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";

export default function CPHero() {
  return (
    <section className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-4xl">
          <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
            PROBLEM SOLVING
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
            Don't memorize.
            <br />
            <span className="text-purple-700">
              Learn to solve.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
            Solve carefully selected coding problems, think through
            the solution yourself, and use progressive hints and
            deep explanations when you get stuck.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#problems"
              className="
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
                shadow-purple-200
                transition
                hover:bg-purple-800
              "
            >
              Start Solving
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/playground"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-gray-200
                bg-white
                px-6
                py-3.5
                font-semibold
                text-gray-900
                transition
                hover:border-purple-200
                hover:bg-purple-50
              "
            >
              Open Playground
              <Code2 size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}