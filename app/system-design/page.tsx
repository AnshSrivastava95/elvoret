"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Network,
  Play,
  Sparkles,
} from "lucide-react";

interface Article {
  slug: string;
  title: string;
  description: string;
  image?: string;
  level: string;
  category: string;
  time: string;
}

interface ProgressRecord {
  article_slug: string;
  progress: number;
  updated_at?: string;
}

interface ArticleWithProgress extends Article {
  progress: number;
  updated_at?: string;
}

export default function SystemDesignPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [progressRecords, setProgressRecords] = useState<
    ProgressRecord[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [progressLoading, setProgressLoading] =
    useState(true);

  const [error, setError] = useState("");

  // ==========================================================
  // Fetch articles
  // ==========================================================

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch(
          "/api/system-design",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch system design articles"
          );
        }

        const data = await response.json();

        if (
          data.success &&
          Array.isArray(data.articles)
        ) {
          setArticles(data.articles);
        } else {
          throw new Error(
            "Invalid article response"
          );
        }
      } catch (error) {
        console.error(
          "Failed to load system design articles:",
          error
        );

        setError(
          "Unable to load system design articles."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  // ==========================================================
  // Fetch logged-in user's progress
  // ==========================================================

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await fetch(
          "/api/user/progress",
          {
            cache: "no-store",
          }
        );

        /*
         * A 401 means the visitor isn't logged in.
         *
         * That's not an error for this page.
         * We simply show all articles at 0%.
         */
        if (response.status === 401) {
          setProgressRecords([]);
          return;
        }

        if (!response.ok) {
          throw new Error(
            "Failed to fetch progress"
          );
        }

        const data = await response.json();

        if (
          data.success &&
          Array.isArray(data.progress)
        ) {
          setProgressRecords(
            data.progress
          );
        }
      } catch (error) {
        console.error(
          "Failed to load progress:",
          error
        );

        /*
         * Don't break the entire System Design page
         * if progress has a temporary problem.
         */
        setProgressRecords([]);
      } finally {
        setProgressLoading(false);
      }
    }

    fetchProgress();
  }, []);

  // ==========================================================
  // Combine articles with progress
  // ==========================================================

  const articlesWithProgress =
    useMemo<ArticleWithProgress[]>(() => {
      return articles.map((article) => {
        const savedProgress =
          progressRecords.find(
            (record) =>
              record.article_slug ===
              article.slug
          );

        return {
          ...article,

          /*
           * If there is no database record,
           * the article hasn't been started.
           */
          progress:
            savedProgress?.progress ?? 0,

          updated_at:
            savedProgress?.updated_at,
        };
      });
    }, [articles, progressRecords]);

  // ==========================================================
  // Completed articles
  // ==========================================================

  const completedArticles =
    useMemo(() => {
      return articlesWithProgress.filter(
        (article) =>
          article.progress >= 100
      );
    }, [articlesWithProgress]);

  // ==========================================================
  // Started articles
  // ==========================================================

  const startedArticles =
    useMemo(() => {
      return articlesWithProgress.filter(
        (article) =>
          article.progress > 0 &&
          article.progress < 100
      );
    }, [articlesWithProgress]);

  // ==========================================================
  // Overall progress
  //
  // Example:
  //
  // Article 1 = 100
  // Article 2 = 50
  // Article 3 = 0
  //
  // Overall = 50%
  // ==========================================================

  const overallProgress =
    useMemo(() => {
      if (
        articlesWithProgress.length ===
        0
      ) {
        return 0;
      }

      const totalProgress =
        articlesWithProgress.reduce(
          (total, article) =>
            total + article.progress,
          0
        );

      return Math.round(
        totalProgress /
          articlesWithProgress.length
      );
    }, [articlesWithProgress]);

  // ==========================================================
  // Find article to continue
  // ==========================================================

  const continueArticle =
    useMemo(() => {
      if (startedArticles.length === 0) {
        return null;
      }

      /*
       * If updated_at exists, use the most
       * recently updated article.
       */
      const withDates =
        startedArticles.filter(
          (article) =>
            article.updated_at
        );

      if (withDates.length > 0) {
        return [...withDates].sort(
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

      /*
       * Fallback: article with highest progress.
       */
      return [...startedArticles].sort(
        (a, b) =>
          b.progress - a.progress
      )[0];
    }, [startedArticles]);

  // ==========================================================
  // Loading state
  // ==========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-white">

        {/* Hero Skeleton */}

        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

            <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />

            <div className="mt-5 h-12 w-3/4 animate-pulse rounded bg-slate-200" />

            <div className="mt-4 h-5 w-2/3 animate-pulse rounded bg-slate-200" />

          </div>
        </section>

        {/* Cards Skeleton */}

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-2xl bg-slate-100"
                />
              )
            )}

          </div>

        </section>

      </main>
    );
  }

  // ==========================================================
  // Error state
  // ==========================================================

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-white px-4">

        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            !
          </div>

          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="mt-5 rounded-xl bg-purple-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-800"
          >
            Try Again
          </button>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">

      {/* ==================================================== */}
      {/* HERO */}
      {/* ==================================================== */}

      <section className="border-b border-slate-200 bg-slate-50">

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

          {/* Small Label */}

          <div className="flex items-center gap-2 text-sm font-semibold text-purple-700">

            <Network
              size={18}
              strokeWidth={1.8}
            />

            <span>
              SYSTEM DESIGN
            </span>

          </div>

          {/* Heading */}

          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">

            Master System Design
          </h1>

          {/* Description */}

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">

            Learn how scalable, reliable systems are
            designed — from the fundamentals of
            scaling to distributed databases,
            caching, messaging, and beyond.
          </p>

          {/* ================================================= */}
          {/* Progress Card */}
          {/* ================================================= */}

          <div className="mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              {/* Progress */}

              <div className="flex-1">

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Your Progress
                    </p>

                    <div className="mt-1 flex items-baseline gap-1">

                      <span className="text-3xl font-extrabold text-slate-900">
                        {overallProgress}%
                      </span>

                      <span className="text-xs text-slate-400">
                        complete
                      </span>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-sm font-bold text-slate-700">
                      {
                        completedArticles.length
                      }{" "}
                      / {articles.length}
                    </p>

                    <p className="text-xs text-slate-400">
                      completed
                    </p>

                  </div>

                </div>

                {/* Progress Bar */}

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-purple-600 transition-all duration-700"
                    style={{
                      width: `${overallProgress}%`,
                    }}
                  />

                </div>

              </div>

              {/* ================================================= */}
              {/* Continue Button */}
              {/* ================================================= */}

              {continueArticle && (
                <Link
                  href={`/system-design/${continueArticle.slug}`}
                  className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
                >
                  <Play
                    size={16}
                    fill="currentColor"
                  />

                  Continue
                </Link>
              )}

              {!continueArticle &&
                articles.length > 0 &&
                completedArticles.length ===
                  0 && (
                  <Link
                    href={`/system-design/${articles[0].slug}`}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
                  >
                    <Play
                      size={16}
                      fill="currentColor"
                    />

                    Start Learning
                  </Link>
                )}

            </div>

          </div>

        </div>

      </section>

      {/* ==================================================== */}
      {/* MAIN CONTENT */}
      {/* ==================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Section Header */}

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
              Learning Path
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              System Design Fundamentals
            </h2>

          </div>

          <p className="text-sm text-slate-500">
            {articles.length}{" "}
            {articles.length === 1
              ? "guide"
              : "guides"}
          </p>

        </div>

        {/* ================================================= */}
        {/* Continue Learning Highlight */}
        {/* ================================================= */}

        {continueArticle && (
          <div className="mb-8 rounded-2xl border border-purple-100 bg-purple-50/60 p-5 sm:p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="min-w-0">

                <div className="flex items-center gap-2">

                  <Sparkles
                    size={17}
                    className="text-purple-600"
                  />

                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                    Continue Learning
                  </span>

                </div>

                <h3 className="mt-2 line-clamp-1 text-lg font-bold text-slate-900">
                  {continueArticle.title}
                </h3>

                <div className="mt-3 flex items-center gap-3">

                  <div className="h-2 w-40 overflow-hidden rounded-full bg-purple-100">

                    <div
                      className="h-full rounded-full bg-purple-600"
                      style={{
                        width: `${continueArticle.progress}%`,
                      }}
                    />

                  </div>

                  <span className="text-xs font-semibold text-purple-700">
                    {continueArticle.progress}%
                  </span>

                </div>

              </div>

              <Link
                href={`/system-design/${continueArticle.slug}`}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
              >
                Resume

                <ArrowRight size={16} />

              </Link>

            </div>

          </div>
        )}

        {/* ================================================= */}
        {/* Article Grid */}
        {/* ================================================= */}

        {articlesWithProgress.length === 0 ? (

          <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">

            <BookOpen
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No guides yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              System design guides will appear here
              once they're published.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {articlesWithProgress.map(
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
                    className="group"
                  >

                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg">

                      {/* ================================================= */}
                      {/* Article Image / Visual */}
                      {/* ================================================= */}

                      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-slate-50">

                        {article.image ? (
                          <img
                            src={article.image}
                            alt={article.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <Network
                            size={48}
                            strokeWidth={1.2}
                            className="text-purple-200 transition-transform duration-300 group-hover:scale-110"
                          />
                        )}

                        {/* Completion Badge */}

                        {isCompleted && (
                          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">

                            <Check
                              size={12}
                              strokeWidth={3}
                            />

                            Completed

                          </div>
                        )}

                        {/* Progress Badge */}

                        {isStarted &&
                          !isCompleted && (
                            <div className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-purple-700 shadow-sm backdrop-blur">
                              {article.progress}%
                              complete
                            </div>
                          )}

                      </div>

                      {/* ================================================= */}
                      {/* Card Content */}
                      {/* ================================================= */}

                      <div className="flex flex-1 flex-col p-5">

                        {/* Category */}

                        <div className="flex items-center gap-2">

                          <span className="rounded-full bg-purple-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-purple-700">
                            {article.category}
                          </span>

                          <span className="text-[10px] font-medium text-slate-400">
                            {article.level}
                          </span>

                        </div>

                        {/* Title */}

                        <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-purple-700">
                          {article.title}
                        </h3>

                        {/* Description */}

                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                          {article.description}
                        </p>

                        {/* Spacer */}

                        <div className="flex-1" />

                        {/* ================================================= */}
                        {/* Meta */}
                        {/* ================================================= */}

                        <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4">

                          <div className="flex items-center gap-1.5 text-xs text-slate-400">

                            <Clock
                              size={14}
                              strokeWidth={1.8}
                            />

                            {article.time}

                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-slate-400">

                            <BookOpen
                              size={14}
                              strokeWidth={1.8}
                            />

                            Guide

                          </div>

                        </div>

                        {/* ================================================= */}
                        {/* Progress */}
                        {/* ================================================= */}

                        <div className="mt-4">

                          <div className="mb-1.5 flex items-center justify-between">

                            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                              {isCompleted
                                ? "Completed"
                                : isStarted
                                ? "In Progress"
                                : "Not Started"}
                            </span>

                            <span className="text-[10px] font-bold text-slate-500">
                              {article.progress}%
                            </span>

                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                            <div
                              className={`
                                h-full
                                rounded-full
                                transition-all
                                duration-500
                                ${
                                  isCompleted
                                    ? "bg-emerald-500"
                                    : "bg-purple-600"
                                }
                              `}
                              style={{
                                width: `${article.progress}%`,
                              }}
                            />

                          </div>

                        </div>

                        {/* ================================================= */}
                        {/* Action */}
                        {/* ================================================= */}

                        <div className="mt-4 flex items-center justify-between">

                          <span
                            className={`
                              text-xs
                              font-semibold
                              ${
                                isCompleted
                                  ? "text-emerald-600"
                                  : "text-purple-700"
                              }
                            `}
                          >
                            {isCompleted
                              ? "Review Guide"
                              : isStarted
                              ? "Continue Reading"
                              : "Start Guide"}
                          </span>

                          <ArrowRight
                            size={16}
                            className="text-purple-600 transition-transform duration-200 group-hover:translate-x-1"
                          />

                        </div>

                      </div>

                    </article>

                  </Link>
                );
              }
            )}

          </div>

        )}

      </section>

      {/* ==================================================== */}
      {/* Bottom CTA */}
      {/* ==================================================== */}

      {articles.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Keep building your system design
                  knowledge.
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Learn the fundamentals first, then
                  move into distributed systems and
                  large-scale architectures.
                </p>

              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-purple-700">

                <Network size={18} />

                {completedArticles.length} /{" "}
                {articles.length} completed

              </div>

            </div>

          </div>

        </section>
      )}

    </main>
  );
}