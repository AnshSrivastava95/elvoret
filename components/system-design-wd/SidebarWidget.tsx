"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

interface Article {
  slug: string;
  title: string;
  description: string;
  image: string;
  level: string;
  category: string;
  time: string;
}

interface ProgressData {
  article_slug: string;
  progress: number;
  updated_at?: string;
}

interface ArticleWithProgress extends Article {
  progress: number;
  updated_at?: string;
}

export default function SidebarWidget() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);

  // ==========================================================
  // Fetch articles + user progress
  // ==========================================================

  useEffect(() => {
    async function fetchSidebarData() {
      try {
        const [articlesResponse, progressResponse] =
          await Promise.all([
            fetch("/api/system-design", {
              cache: "no-store",
            }),

            fetch("/api/user/progress", {
              cache: "no-store",
            }),
          ]);

        // ------------------------------------------------------
        // Articles
        // ------------------------------------------------------

        if (articlesResponse.ok) {
          const articlesData =
            await articlesResponse.json();

          if (
            articlesData.success &&
            Array.isArray(articlesData.articles)
          ) {
            setArticles(articlesData.articles);
          }
        }

        // ------------------------------------------------------
        // Progress
        // ------------------------------------------------------

        if (progressResponse.ok) {
          const progressResult =
            await progressResponse.json();

          if (
            progressResult.success &&
            Array.isArray(progressResult.progress)
          ) {
            setProgressData(
              progressResult.progress
            );
          }
        }
      } catch (error) {
        console.error(
          "Failed to load sidebar progress:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchSidebarData();
  }, []);

  // ==========================================================
  // Combine articles with progress
  // ==========================================================

  const articlesWithProgress =
    useMemo<ArticleWithProgress[]>(() => {
      return articles.map((article) => {
        const savedProgress =
          progressData.find(
            (item) =>
              item.article_slug === article.slug
          );

        return {
          ...article,
          progress: savedProgress?.progress || 0,
          updated_at:
            savedProgress?.updated_at,
        };
      });
    }, [articles, progressData]);

  // ==========================================================
  // Overall progress
  // ==========================================================

  const overallProgress = useMemo(() => {
    if (articlesWithProgress.length === 0) {
      return 0;
    }

    const total = articlesWithProgress.reduce(
      (sum, article) =>
        sum + article.progress,
      0
    );

    return Math.round(
      total / articlesWithProgress.length
    );
  }, [articlesWithProgress]);

  // ==========================================================
  // Completed articles
  // ==========================================================

  const completedArticles = useMemo(() => {
    return articlesWithProgress.filter(
      (article) => article.progress >= 100
    );
  }, [articlesWithProgress]);

  // ==========================================================
  // Articles that have been started
  // ==========================================================

  const startedArticles = useMemo(() => {
    return articlesWithProgress.filter(
      (article) =>
        article.progress > 0 &&
        article.progress < 100
    );
  }, [articlesWithProgress]);

  // ==========================================================
  // Determine what the user should continue reading
  //
  // Prefer the most recently updated article.
  // If updated_at isn't available, use the article with
  // the highest progress that isn't completed.
  // ==========================================================

  const continueArticle = useMemo(() => {
    if (startedArticles.length === 0) {
      return null;
    }

    const articlesWithDates =
      startedArticles.filter(
        (article) => article.updated_at
      );

    if (articlesWithDates.length > 0) {
      return [...articlesWithDates].sort(
        (a, b) => {
          return (
            new Date(
              b.updated_at!
            ).getTime() -
            new Date(
              a.updated_at!
            ).getTime()
          );
        }
      )[0];
    }

    return [...startedArticles].sort(
      (a, b) =>
        b.progress - a.progress
    )[0];
  }, [startedArticles]);

  // ==========================================================
  // Articles to display in sidebar
  //
  // Show all articles, but cap the visible list so the
  // sidebar doesn't become enormous.
  // ==========================================================

  const visibleArticles = useMemo(() => {
    return articlesWithProgress.slice(0, 8);
  }, [articlesWithProgress]);

  return (
    <aside className="sticky top-24 space-y-6">

      {/* ==================================================== */}
      {/* 1. Advertisement */}
      {/* ==================================================== */}

      <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/40 p-6 text-center shadow-sm">

        <span className="mb-2 inline-block rounded-full bg-purple-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-800">
          Sponsored / Ad Space
        </span>

        <h4 className="mb-1 text-sm font-bold text-slate-800">
          Your Ad Banner Here
        </h4>

        <p className="mb-4 text-xs leading-relaxed text-slate-500">
          Embed your ad network snippet, custom
          image, or promotional banner easily.
        </p>

        <div className="flex h-32 items-center justify-center rounded-xl border border-purple-100 bg-white/80 text-xs font-medium text-slate-400 shadow-inner">
          Ad Slot Ready (300x250)
        </div>
      </div>

      {/* ==================================================== */}
      {/* 2. Your Learning Progress */}
      {/* ==================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        {/* Header */}

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Your Progress
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              System Design
            </p>
          </div>

          <div className="h-2 w-2 animate-pulse rounded-full bg-purple-600" />

        </div>

        {/* ================================================== */}
        {/* Loading */}
        {/* ================================================== */}

        {loading ? (
          <div className="space-y-4">

            <div className="h-7 w-20 animate-pulse rounded bg-slate-100" />

            <div className="h-2 w-full animate-pulse rounded-full bg-slate-100" />

            <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />

            <div className="h-12 w-full animate-pulse rounded-xl bg-slate-100" />

          </div>
        ) : (

          <div className="space-y-6">

            {/* ================================================= */}
            {/* Overall Progress */}
            {/* ================================================= */}

            <div>

              <div className="mb-2 flex items-end justify-between">

                <div>
                  <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                    {overallProgress}%
                  </span>

                  <span className="ml-1 text-xs text-slate-400">
                    complete
                  </span>
                </div>

                <span className="text-xs font-medium text-slate-400">
                  {completedArticles.length}/
                  {articles.length}
                </span>

              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-purple-600 transition-all duration-500"
                  style={{
                    width: `${overallProgress}%`,
                  }}
                />

              </div>

              <p className="mt-2 text-[11px] text-slate-400">
                {completedArticles.length}{" "}
                {completedArticles.length === 1
                  ? "article"
                  : "articles"}{" "}
                completed
              </p>

            </div>

            {/* ================================================= */}
            {/* Continue Reading */}
            {/* ================================================= */}

            {continueArticle && (
              <div className="border-t border-slate-100 pt-5">

                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Continue Learning
                </p>

                <Link
                  href={`/system-design/${continueArticle.slug}`}
                  className="group block rounded-xl border border-purple-100 bg-purple-50/50 p-3 transition-colors hover:bg-purple-50"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <p className="line-clamp-2 text-xs font-bold text-slate-800 transition-colors group-hover:text-purple-700">
                        {continueArticle.title}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        {continueArticle.progress}% complete
                      </p>

                    </div>

                    <span className="shrink-0 text-sm text-purple-600">
                      →
                    </span>

                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-purple-100">

                    <div
                      className="h-full rounded-full bg-purple-600"
                      style={{
                        width: `${continueArticle.progress}%`,
                      }}
                    />

                  </div>

                </Link>

              </div>
            )}

            {/* ================================================= */}
            {/* No Started Articles */}
            {/* ================================================= */}

            {!continueArticle &&
              articles.length > 0 && (
                <div className="border-t border-slate-100 pt-5">

                  <p className="text-xs leading-5 text-slate-500">
                    You haven't started a system
                    design article yet.
                  </p>

                  <Link
                    href="/system-design"
                    className="mt-3 block w-full rounded-xl border border-purple-100 bg-purple-50 py-2.5 text-center text-xs font-semibold text-purple-700 transition hover:bg-purple-100"
                  >
                    Start Learning →
                  </Link>

                </div>
              )}

            {/* ================================================= */}
            {/* Article List */}
            {/* ================================================= */}

            {visibleArticles.length > 0 && (
              <div className="border-t border-slate-100 pt-5">

                <div className="mb-3 flex items-center justify-between">

                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    System Design
                  </p>

                  <Link
                    href="/system-design"
                    className="text-[11px] font-semibold text-purple-600 hover:text-purple-800"
                  >
                    View all
                  </Link>

                </div>

                <div className="space-y-2">

                  {visibleArticles.map(
                    (article) => {

                      const isCompleted =
                        article.progress >= 100;

                      const isStarted =
                        article.progress > 0 &&
                        article.progress < 100;

                      return (
                        <Link
                          key={article.slug}
                          href={`/system-design/${article.slug}`}
                          className="group block rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-50"
                        >

                          <div className="flex items-center gap-3">

                            {/* Status */}

                            <div
                              className={`
                                flex
                                h-6
                                w-6
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                text-[10px]
                                font-bold
                                ${
                                  isCompleted
                                    ? "bg-emerald-100 text-emerald-700"
                                    : isStarted
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-slate-100 text-slate-400"
                                }
                              `}
                            >
                              {isCompleted
                                ? "✓"
                                : isStarted
                                ? "→"
                                : "○"}
                            </div>

                            {/* Title + Progress */}

                            <div className="min-w-0 flex-1">

                              <div className="flex items-center justify-between gap-2">

                                <p
                                  className={`
                                    line-clamp-1
                                    text-xs
                                    font-semibold
                                    transition-colors
                                    ${
                                      isCompleted
                                        ? "text-slate-500"
                                        : "text-slate-700 group-hover:text-purple-700"
                                    }
                                  `}
                                >
                                  {article.title}
                                </p>

                                <span className="shrink-0 text-[10px] font-medium text-slate-400">
                                  {article.progress}%
                                </span>

                              </div>

                              {/* Small Progress Bar */}

                              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100">

                                <div
                                  className={`
                                    h-full
                                    rounded-full
                                    transition-all
                                    ${
                                      isCompleted
                                        ? "bg-emerald-500"
                                        : "bg-purple-500"
                                    }
                                  `}
                                  style={{
                                    width: `${article.progress}%`,
                                  }}
                                />

                              </div>

                            </div>

                          </div>

                        </Link>
                      );
                    }
                  )}

                </div>

              </div>
            )}

          </div>
        )}

      </div>

      {/* ==================================================== */}
      {/* 3. Popular Topics */}
      {/* ==================================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-900">
          Popular Topics
        </h3>

        <div className="flex flex-wrap gap-2">

          <Link
            href="/system-design"
            className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-purple-50 hover:text-purple-700"
          >
            #Scalability
          </Link>

          <Link
            href="/system-design"
            className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-purple-50 hover:text-purple-700"
          >
            #LoadBalancing
          </Link>

          <Link
            href="/system-design"
            className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-purple-50 hover:text-purple-700"
          >
            #Caching
          </Link>

          <Link
            href="/system-design"
            className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-purple-50 hover:text-purple-700"
          >
            #Databases
          </Link>

        </div>

      </div>

    </aside>
  );
}