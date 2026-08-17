import CPHero from "@/components/cp/cpHero";
import CPStats from "@/components/cp/Cpstats";
import ProblemFilters from "@/components/cp/ProblemFilter";
import ProblemList from "@/components/cp/ProblemList";

export default function CPPage() {
  return (
    <main className="min-h-screen bg-white">

      <CPHero />

      <CPStats />

      <section
        id="problems"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">

          {/* Filters */}

          <aside>
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-purple-700">
                FILTER PROBLEMS
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                Find your next problem
              </h2>

              <div className="mt-7">
                <ProblemFilters />
              </div>
            </div>
          </aside>

          {/* Problems */}

          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-purple-700">
                  PRACTICE
                </p>

                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-950">
                  Problems
                </h2>

                <p className="mt-2 text-gray-600">
                  Try the problem yourself before reaching for the hints.
                </p>
              </div>

              <span className="text-sm font-medium text-gray-500">
                3 problems
              </span>
            </div>

            <div className="mt-7">
              <ProblemList />
            </div>
          </div>

        </div>
      </section>

      {/* Philosophy */}

      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.12em] text-purple-700">
            THE ELVORET APPROACH
          </p>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
            Try first.
            <br />
            <span className="text-purple-700">
              Understand deeply.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            We don't want you to memorize another solution.
            Give every problem a real attempt, reveal hints only
            when you need them, and then learn from a detailed
            explanation based on actual problem-solving experience.
          </p>

        </div>
      </section>

    </main>
  );
}