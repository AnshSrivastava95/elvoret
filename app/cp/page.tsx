import Link from "next/link";

import {
  ArrowRight,
  Clock3,
  Code2,
  Layers3,
  Target,
  Trophy,
} from "lucide-react";

import CPHero from "@/components/cp/cpHero";
import CPStats from "@/components/cp/Cpstats";

import {
  getAllCPProblems,
  type CPProblem,
} from "@/lib/problem";

/* =========================================================
   PAGE
   ========================================================= */

export default async function CPPage() {
  const problems =
    await getAllCPProblems();

  /* =======================================================
     DSA PATTERNS
     ======================================================= */

  const patternMap =
    new Map<
      string,
      CPProblem[]
    >();

  for (
    const problem of problems
  ) {
    /*
     * Problems without a pattern
     * don't appear in DSA Patterns.
     *
     * They can still appear in problem
     * sets or contests.
     */
    if (!problem.pattern) {
      continue;
    }

    if (
      !patternMap.has(
        problem.pattern
      )
    ) {
      patternMap.set(
        problem.pattern,
        []
      );
    }

    patternMap
      .get(
        problem.pattern
      )!
      .push(problem);
  }

  const patterns =
    Array.from(
      patternMap.entries()
    ).sort(
      ([a], [b]) =>
        a.localeCompare(b)
    );

  /* =======================================================
     PROBLEM SETS
     ======================================================= */

  const problemSetMap =
    new Map<
      string,
      CPProblem[]
    >();

  for (
    const problem of problems
  ) {
    if (!problem.problemSet) {
      continue;
    }

    if (
      !problemSetMap.has(
        problem.problemSet
      )
    ) {
      problemSetMap.set(
        problem.problemSet,
        []
      );
    }

    problemSetMap
      .get(
        problem.problemSet
      )!
      .push(problem);
  }

  const problemSets =
    Array.from(
      problemSetMap.entries()
    ).sort(
      ([a], [b]) =>
        a.localeCompare(b)
    );

  /* =======================================================
     CONTESTS
     ======================================================= */

  const contestMap =
    new Map<
      string,
      CPProblem[]
    >();

  for (
    const problem of problems
  ) {
    if (!problem.contest) {
      continue;
    }

    if (
      !contestMap.has(
        problem.contest
      )
    ) {
      contestMap.set(
        problem.contest,
        []
      );
    }

    contestMap
      .get(
        problem.contest
      )!
      .push(problem);
  }

  const contests =
    Array.from(
      contestMap.entries()
    ).sort(
      ([a], [b]) =>
        a.localeCompare(b)
    );

  /* =======================================================
     DIFFICULTY STATS
     ======================================================= */

  const easyCount =
    problems.filter(
      (problem) =>
        problem.difficulty
          .toLowerCase() ===
        "easy"
    ).length;

  const mediumCount =
    problems.filter(
      (problem) =>
        problem.difficulty
          .toLowerCase() ===
        "medium"
    ).length;

  const hardCount =
    problems.filter(
      (problem) =>
        problem.difficulty
          .toLowerCase() ===
        "hard"
    ).length;

  return (
    <main className="min-h-screen bg-white">

      {/* ===================================================
          HERO
      =================================================== */}

      <CPHero />

      {/* ===================================================
          EXISTING STATS
      =================================================== */}

      <CPStats />

      {/* ===================================================
          LEARNING MODEL
      =================================================== */}

      <section className="border-y border-gray-100 bg-gray-50/70">

        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-xs font-bold uppercase tracking-[0.14em] text-purple-700">
              COMPETITIVE PROGRAMMING
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
              Learn. Practice. Compete.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Build strong problem-solving skills through
              DSA patterns, curated competitive programming
              problem sets, and contest-focused practice.
            </p>

          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">

            {/* Learn */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                <Target size={20} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-950">
                Learn patterns
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Recognize techniques such as two pointers,
                sliding window, binary search, greedy,
                graphs, and dynamic programming.
              </p>

            </div>

            {/* Practice */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                <Code2 size={20} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-950">
                Practice problems
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Work through curated collections from
                Codeforces, CodeChef, AtCoder, and other
                competitive programming sources.
              </p>

            </div>

            {/* Compete */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                <Trophy size={20} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-950">
                Train for contests
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Improve speed and decision-making with
                timed sets, previous contest problems,
                and fast-solving challenges.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          QUICK STATS
      =================================================== */}

      <section className="border-b border-gray-100 bg-white">

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-gray-100 sm:grid-cols-4">

          <StatItem
            value={problems.length}
            label="Problems"
          />

          <StatItem
            value={easyCount}
            label="Easy"
          />

          <StatItem
            value={mediumCount}
            label="Medium"
          />

          <StatItem
            value={hardCount}
            label="Hard"
          />

        </div>

      </section>

      {/* ===================================================
          MAIN
      =================================================== */}

      <section
        id="problems"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
      >

        <div className="space-y-20">

          {/* =================================================
              DSA PATTERNS
          ================================================= */}

          <section>

            <SectionHeader
              icon={
                <Layers3 size={20} />
              }
              eyebrow="BUILD THE FOUNDATION"
              title="DSA Patterns"
              description="Master recurring problem-solving techniques and learn to recognize when each pattern should be used."
              count={patterns.length}
              countLabel={
                patterns.length === 1
                  ? "pattern"
                  : "patterns"
              }
            />

            {patterns.length > 0 ? (

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {patterns.map(
                  ([
                    pattern,
                    patternProblems,
                  ]) => (

                    <CollectionCard
                      key={pattern}
                      type="Pattern"
                      title={pattern}
                      problems={
                        patternProblems
                      }
                    />

                  )
                )}

              </div>

            ) : (

              <EmptyState
                title="No patterns yet"
                description="Problems with a pattern field will automatically appear here."
              />

            )}

          </section>

          {/* =================================================
              PROBLEM SETS
          ================================================= */}

          <section>

            <SectionHeader
              icon={
                <Code2 size={20} />
              }
              eyebrow="SOLVE MORE"
              title="Problem Sets"
              description="Practice curated collections of competitive programming problems from platforms such as Codeforces, CodeChef, and AtCoder."
              count={
                problemSets.length
              }
              countLabel={
                problemSets.length ===
                1
                  ? "set"
                  : "sets"
              }
            />

            {problemSets.length > 0 ? (

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {problemSets.map(
                  ([
                    problemSet,
                    setProblems,
                  ]) => (

                    <CollectionCard
                      key={
                        problemSet
                      }
                      type="Problem Set"
                      title={
                        problemSet
                      }
                      problems={
                        setProblems
                      }
                    />

                  )
                )}

              </div>

            ) : (

              <EmptyState
                title="No problem sets yet"
                description="Add a problemSet field to an MDX problem and the collection will automatically appear here."
              />

            )}

          </section>

          {/* =================================================
              CONTESTS
          ================================================= */}

          <section>

            <SectionHeader
              icon={
                <Clock3 size={20} />
              }
              eyebrow="PERFORM UNDER PRESSURE"
              title="Contests & Prep"
              description="Train for competitive programming with timed practice, previous contest problems, and speed-solving collections."
              count={contests.length}
              countLabel={
                contests.length === 1
                  ? "collection"
                  : "collections"
              }
            />

            {contests.length > 0 ? (

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {contests.map(
                  ([
                    contest,
                    contestProblems,
                  ]) => (

                    <CollectionCard
                      key={contest}
                      type="Contest"
                      title={contest}
                      problems={
                        contestProblems
                      }
                    />

                  )
                )}

              </div>

            ) : (

              <EmptyState
                title="No contest practice yet"
                description="Add a contest field to an MDX problem and the contest collection will automatically appear here."
              />

            )}

          </section>

        </div>

      </section>

      {/* ===================================================
          PHILOSOPHY
      =================================================== */}

      <section className="border-t border-gray-800 bg-gray-950">

        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 lg:px-8">

          <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-400">
            THE ELVORET APPROACH
          </p>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">

            Try first.
            <br />

            <span className="text-purple-400">
              Understand deeply.
            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">

            Competitive programming isn't about
            memorizing hundreds of solutions. Learn
            the patterns, solve unfamiliar problems,
            and develop the speed required to perform
            when the clock is running.

          </p>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   SECTION HEADER
   ========================================================= */

function SectionHeader({
  icon,
  eyebrow,
  title,
  description,
  count,
  countLabel,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  count: number;
  countLabel: string;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

      <div className="max-w-3xl">

        <div className="flex items-center gap-2 text-purple-700">

          {icon}

          <p className="text-xs font-bold uppercase tracking-[0.14em]">
            {eyebrow}
          </p>

        </div>

        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
          {title}
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          {description}
        </p>

      </div>

      <span className="shrink-0 rounded-full bg-gray-100 px-4 py-2 text-xs font-bold text-gray-600">

        {count} {countLabel}

      </span>

    </div>
  );
}

/* =========================================================
   COLLECTION CARD
   ========================================================= */

function CollectionCard({
  type,
  title,
  problems,
}: {
  type:
    | "Pattern"
    | "Problem Set"
    | "Contest";

  title: string;

  problems: CPProblem[];
}) {
  return (
    <div
      className="
        group
        flex
        h-full
        flex-col
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        transition
        hover:-translate-y-0.5
        hover:border-purple-200
        hover:shadow-lg
      "
    >

      {/* Card header */}

      <div className="flex items-start justify-between gap-4">

        <div>

          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-purple-700">
            {type}
          </p>

          <h3 className="mt-2 text-xl font-extrabold text-gray-950">
            {title}
          </h3>

        </div>

        <span className="shrink-0 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">

          {problems.length}

        </span>

      </div>

      {/* Problems */}

      <div className="mt-6 flex-1 space-y-2">

        {problems
          .slice(
            0,
            5
          )
          .map(
            (problem) => (

              <ProblemLink
                key={
                  problem.slug
                }
                problem={
                  problem
                }
              />

            )
          )}

      </div>

      {/* More indicator */}

      {problems.length > 5 && (

        <div className="mt-5 border-t border-gray-100 pt-4">

          <p className="text-xs font-bold text-purple-700">

            +
            {
              problems.length -
              5
            }{" "}
            more problems

          </p>

        </div>

      )}

    </div>
  );
}

/* =========================================================
   PROBLEM LINK
   ========================================================= */

function ProblemLink({
  problem,
}: {
  problem: CPProblem;
}) {
  const difficulty =
    problem.difficulty
      .toLowerCase();

  const difficultyClass =
    difficulty === "easy"
      ? "bg-emerald-50 text-emerald-700"
      : difficulty ===
          "medium"
        ? "bg-amber-50 text-amber-700"
        : difficulty ===
            "hard"
          ? "bg-red-50 text-red-700"
          : "bg-gray-100 text-gray-600";

  return (
    <Link
      href={`/cp/${problem.slug}`}
      className="
        group/problem
        flex
        items-center
        justify-between
        gap-3
        rounded-xl
        border
        border-transparent
        px-3
        py-3
        transition
        hover:border-purple-100
        hover:bg-purple-50/50
      "
    >

      <div className="min-w-0">

        <p className="truncate text-sm font-bold text-gray-900">
          {problem.title}
        </p>

        <div className="mt-1.5 flex flex-wrap items-center gap-2">

          <span
            className={`
              rounded-md
              px-2
              py-0.5
              text-[10px]
              font-bold
              uppercase
              ${difficultyClass}
            `}
          >
            {problem.difficulty}
          </span>

          {problem.source && (

            <span className="truncate text-[11px] text-gray-400">

              {problem.source}

              {problem.sourceId
                ? ` #${problem.sourceId}`
                : ""}

            </span>

          )}

        </div>

      </div>

      <ArrowRight
        size={16}
        className="
          shrink-0
          text-gray-300
          transition
          group-hover/problem:translate-x-1
          group-hover/problem:text-purple-700
        "
      />

    </Link>
  );
}

/* =========================================================
   STAT ITEM
   ========================================================= */

function StatItem({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="bg-white px-5 py-7 text-center">

      <p className="text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl">
        {value}
      </p>

      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>

    </div>
  );
}

/* =========================================================
   EMPTY STATE
   ========================================================= */

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">

      <h3 className="font-bold text-gray-900">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>

    </div>
  );
}