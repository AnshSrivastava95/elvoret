"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useParams } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import SidebarWidget from "@/components/system-design-wd/SidebarWidget";
import CodeBlock from "@/components/articles/CodeBlock";

import { MDXRemote } from "next-mdx-remote";

interface Article {
  slug: string;
  title: string;
  description: string;
  source: any;
  level: string;
  category: string;
  time: string;
}

interface ProgressRecord {
  article_slug: string;
  progress: number;
  updated_at?: string;
}

export default function SystemDesignArticlePage() {
  const params = useParams();

  const slug = params.slug as string;

  // ==========================================================
  // Article state
  // ==========================================================

  const [article, setArticle] =
    useState<Article | null>(null);

  const [loading, setLoading] =
    useState(true);

  // ==========================================================
  // Reading progress state
  // ==========================================================

  const [readingProgress, setReadingProgress] =
    useState(0);

  const [isCompleted, setIsCompleted] =
    useState(false);

  const [progressLoaded, setProgressLoaded] =
    useState(false);

  // ==========================================================
  // Prevent multiple completion requests
  // ==========================================================

  const completionSaved =
    useRef(false);

  // Last progress value saved to backend
  const lastSavedProgress =
    useRef(0);

  // Prevent multiple requests at the same time
  const savingProgress =
    useRef(false);

  // ==========================================================
  // Fetch article
  // ==========================================================

  useEffect(() => {
    if (!slug) return;

    async function fetchArticleContent() {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/system-design/${slug}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load article"
          );
        }

        const data =
          await response.json();

        if (
          data.success &&
          data.article
        ) {
          setArticle(data.article);
        } else {
          setArticle(null);
        }
      } catch (error) {
        console.error(
          "Failed to load article:",
          error
        );

        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    fetchArticleContent();
  }, [slug]);

  // ==========================================================
  // Load existing user progress
  //
  // This is extremely important.
  //
  // If the user previously completed the article,
  // scrolling back up should NOT make it incomplete.
  // ==========================================================

  useEffect(() => {
    if (!slug) return;

    async function fetchExistingProgress() {
      try {
        const response = await fetch(
          "/api/user/progress",
          {
            cache: "no-store",
          }
        );

        /*
         * User isn't logged in.
         *
         * That's okay. The article can still
         * be read normally.
         */
        if (response.status === 401) {
          setProgressLoaded(true);
          return;
        }

        if (!response.ok) {
          console.error(
            "Failed to fetch existing progress"
          );

          setProgressLoaded(true);
          return;
        }

        const data =
          await response.json();

        if (
          data.success &&
          Array.isArray(data.progress)
        ) {
          const currentArticle =
            data.progress.find(
              (item: ProgressRecord) =>
                item.article_slug === slug
            );

          if (currentArticle) {
            const savedProgress =
              Math.max(
                0,
                Math.min(
                  100,
                  Number(
                    currentArticle.progress
                  ) || 0
                )
              );

            /*
             * If already completed, permanently
             * lock this article at 100%.
             */
            if (savedProgress >= 100) {
              completionSaved.current =
                true;

              lastSavedProgress.current =
                100;

              setIsCompleted(true);
              setReadingProgress(100);
            } else {
              /*
               * If partially completed,
               * start from the saved progress.
               *
               * We don't automatically scroll the
               * browser there. The user can continue
               * from wherever they are.
               */
              lastSavedProgress.current =
                savedProgress;

              setReadingProgress(
                savedProgress
              );
            }
          }
        }
      } catch (error) {
        console.error(
          "Failed to load existing progress:",
          error
        );
      } finally {
        setProgressLoaded(true);
      }
    }

    fetchExistingProgress();
  }, [slug]);

  // ==========================================================
  // Save progress
  // ==========================================================

  const syncProgressToBackend = async (
    progressPercent: number,
    currentTitle: string
  ) => {
    /*
     * Don't send duplicate requests.
     */
    if (savingProgress.current) {
      return;
    }

    /*
     * Don't save if the value hasn't meaningfully
     * changed.
     */
    if (
      progressPercent ===
      lastSavedProgress.current
    ) {
      return;
    }

    savingProgress.current = true;

    try {
      const response = await fetch(
        "/api/user/progress",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            slug,
            title: currentTitle,
            progress:
              progressPercent,
          }),
        }
      );

      /*
       * 401 simply means the visitor isn't
       * logged in.
       */
      if (response.status === 401) {
        return;
      }

      if (!response.ok) {
        console.error(
          "Failed to save reading progress"
        );

        return;
      }

      lastSavedProgress.current =
        progressPercent;
    } catch (error) {
      console.error(
        "Failed to sync progress:",
        error
      );
    } finally {
      savingProgress.current = false;
    }
  };

  // ==========================================================
  // Reading progress calculation
  // ==========================================================

  useEffect(() => {
    /*
     * Don't calculate anything until the article
     * and the existing database progress have loaded.
     *
     * This prevents an already-completed article
     * from temporarily becoming 0%.
     */
    if (
      !article ||
      !progressLoaded
    ) {
      return;
    }

    const handleScroll = () => {
      /*
       * COMPLETED ARTICLES ARE PERMANENTLY 100%.
       *
       * This is the key fix for your problem.
       */
      if (completionSaved.current) {
        setReadingProgress(100);
        return;
      }

      const documentHeight =
        document.documentElement
          .scrollHeight;

      const viewportHeight =
        window.innerHeight;

      const totalScrollableHeight =
        documentHeight -
        viewportHeight;

      if (
        totalScrollableHeight <= 0
      ) {
        return;
      }

      const currentScroll =
        window.scrollY;

      const percentage = Math.min(
        100,
        Math.max(
          0,
          Math.round(
            (currentScroll /
              totalScrollableHeight) *
              100
          )
        )
      );

      setReadingProgress(
        percentage
      );

      // ======================================================
      // Check whether the user reached the bottom
      // ======================================================

      const reachedBottom =
        window.innerHeight +
          window.scrollY >=
        document.documentElement
          .scrollHeight -
          50;

      if (reachedBottom) {
        /*
         * Permanently mark as completed.
         */
        completionSaved.current =
          true;

        setIsCompleted(true);

        setReadingProgress(100);

        /*
         * Force 100% into the database.
         */
        syncProgressToBackend(
          100,
          article.title
        );

        return;
      }

      // ======================================================
      // Save partial progress
      //
      // Only save every 5%.
      // ======================================================

      const lastSaved =
        lastSavedProgress.current;

      const difference =
        Math.abs(
          percentage - lastSaved
        );

      if (
        percentage > 0 &&
        difference >= 5
      ) {
        syncProgressToBackend(
          percentage,
          article.title
        );
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    /*
     * Calculate immediately in case the user
     * is already scrolled down.
     */
    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [
    article,
    progressLoaded,
  ]);

  // ==========================================================
  // Custom MDX components
  // ==========================================================

  const mdxComponents = {
    /*
     * Tables
     */

    table: (props: any) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table
          className="w-full border-collapse text-left text-sm"
          {...props}
        />
      </div>
    ),

    thead: (props: any) => (
      <thead
        className="border-b border-slate-200 bg-slate-50 font-bold text-slate-900"
        {...props}
      />
    ),

    th: (props: any) => (
      <th
        className="border-r border-slate-200 px-4 py-3 last:border-r-0"
        {...props}
      />
    ),

    td: (props: any) => (
      <td
        className="border-r border-t border-slate-200 px-4 py-3 text-slate-600 last:border-r-0"
        {...props}
      />
    ),

    /*
     * Code blocks
     */

    pre: (props: any) => {
      const children =
        props.children;

      if (
        children &&
        children.props
      ) {
        const {
          className,
          children: codeContent,
        } = children.props;

        const match =
          /language-(\w+)/.exec(
            className || ""
          );

        const language =
          match
            ? match[1]
            : "text";

        return (
          <div className="my-6">
            <CodeBlock
              language={language}
              code={String(
                codeContent
              ).trim()}
            />
          </div>
        );
      }

      return (
        <pre {...props} />
      );
    },
  };

  // ==========================================================
  // Loading
  // ==========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">

        <Navbar />

        <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-10 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">

            <article className="lg:col-span-3">

              <div className="animate-pulse space-y-5">

                <div className="h-5 w-24 rounded bg-slate-100" />

                <div className="h-12 w-3/4 rounded bg-slate-100" />

                <div className="h-5 w-full rounded bg-slate-100" />

                <div className="h-5 w-5/6 rounded bg-slate-100" />

                <div className="h-64 rounded-2xl bg-slate-100" />

              </div>

            </article>

            <aside className="hidden lg:block">

              <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />

            </aside>

          </div>

        </main>

      </div>
    );
  }

  // ==========================================================
  // Article not found
  // ==========================================================

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col bg-white">

        <Navbar />

        <main className="flex flex-grow items-center justify-center px-4">

          <div className="text-center">

            <h1 className="text-3xl font-bold text-slate-900">
              Article Not Found
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              The system design guide you're
              looking for doesn't exist.
            </p>

            <Link
              href="/system-design"
              className="mt-6 inline-flex rounded-xl bg-purple-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
            >
              ← Back to System Design
            </Link>

          </div>

        </main>

      </div>
    );
  }

  // ==========================================================
  // Main page
  // ==========================================================

  return (
    <div className="flex min-h-screen flex-col bg-white">

      {/* ==================================================== */}
      {/* Navbar */}
      {/* ==================================================== */}

      <Navbar />

      {/* ==================================================== */}
      {/* Reading Progress Bar */}
      {/* ==================================================== */}

      <div className="fixed left-0 top-0 z-[60] h-1 w-full bg-slate-100">

        <div
          className={`
            h-full
            transition-all
            duration-150
            ${
              isCompleted
                ? "bg-emerald-500"
                : "bg-purple-600"
            }
          `}
          style={{
            width: `${readingProgress}%`,
          }}
        />

      </div>

      {/* ==================================================== */}
      {/* Main */}
      {/* ==================================================== */}

      <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-10 sm:px-6 lg:px-8">

        {/* ================================================== */}
        {/* Back Link */}
        {/* ================================================== */}

        <div className="mb-6">

          <Link
            href="/system-design"
            className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 transition hover:text-purple-800"
          >
            ← Back to System Design
          </Link>

        </div>

        {/* ================================================== */}
        {/* Article + Sidebar */}
        {/* ================================================== */}

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-4">

          {/* ================================================= */}
          {/* ARTICLE */}
          {/* ================================================= */}

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:col-span-3">

            {/* =============================================== */}
            {/* Header */}
            {/* =============================================== */}

            <header className="mb-8 border-b border-slate-100 pb-6">

              {/* Category */}

              <span className="mb-3 inline-block rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                {article.category}
              </span>

              {/* Title */}

              <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {article.title}
              </h1>

              {/* Description */}

              {article.description && (
                <p className="mb-5 max-w-3xl text-base leading-7 text-slate-500">
                  {article.description}
                </p>
              )}

              {/* Meta */}

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">

                <span>
                  {article.level}
                </span>

                <span>
                  •
                </span>

                <span>
                  {article.time}
                </span>

                {isCompleted && (
                  <>
                    <span>
                      •
                    </span>

                    <span className="font-semibold text-emerald-600">
                      ✓ Completed
                    </span>
                  </>
                )}

              </div>

            </header>

            {/* =============================================== */}
            {/* Completion Banner */}
            {/* =============================================== */}

            {isCompleted && (
              <div className="mb-8 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                  ✓
                </div>

                <div>

                  <p className="text-sm font-bold text-emerald-800">
                    Article completed
                  </p>

                  <p className="text-xs text-emerald-700">
                    You've finished this system
                    design guide.
                  </p>

                </div>

              </div>
            )}

            {/* =============================================== */}
            {/* MDX Content */}
            {/* =============================================== */}

            <div className="prose prose-slate max-w-none leading-relaxed">

              <MDXRemote
                {...article.source}
                components={
                  mdxComponents
                }
              />

            </div>

            {/* =============================================== */}
            {/* Bottom Completion */}
            {/* =============================================== */}

            {isCompleted && (
              <div className="mt-12 border-t border-slate-200 pt-8">

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-white">
                    ✓
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-slate-900">
                    You completed this guide!
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Your progress has been saved.
                  </p>

                  <Link
                    href="/system-design"
                    className="mt-5 inline-flex items-center rounded-xl bg-purple-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
                  >
                    Continue System Design →
                  </Link>

                </div>

              </div>
            )}

          </article>

          {/* ================================================= */}
          {/* SIDEBAR */}
          {/* ================================================= */}

          <div className="lg:col-span-1">

            <SidebarWidget />

          </div>

        </div>

      </main>

    </div>
  );
}