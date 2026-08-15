"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Bug,
  UserRound,
  BookOpen,
  Send,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setError("");
    setSubmitted(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const issue = String(formData.get("issue") || "");
    const message = String(formData.get("message") || "");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject: `Support: ${issue}`,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Failed to send your support request."
        );
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error("Support form error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Navbar stays at the top */}
      <Navbar />

      <main className="min-h-screen bg-white text-slate-800">

        {/* =========================
            HERO
        ========================== */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">

            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-purple-700 transition hover:text-purple-900"
            >
              <ArrowLeft size={16} />
              Back to Elvoret
            </Link>

            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-700">
                Help & Support
              </p>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                How can we help?
              </h1>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Having trouble with Elvoret? Whether it&apos;s an account
                problem, reading progress issue, or something that simply
                isn&apos;t working as expected, we&apos;re here to help.
              </p>
            </div>

          </div>
        </section>

        {/* =========================
            SUPPORT CONTENT
        ========================== */}
        <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">

          {/* 
            items-stretch makes both columns take the same height.
            The left cards then use flex-1 to distribute that height.
          */}
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">

            {/* =========================
                LEFT SUPPORT CATEGORIES
            ========================== */}
            <div className="flex h-full flex-col gap-4">

              {/* Account */}
              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                  <UserRound size={19} />
                </div>

                <h2 className="font-bold text-slate-900">
                  Account problems
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Problems signing in, creating an account, or maintaining
                  your session?
                </p>
              </div>

              {/* Learning Progress */}
              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                  <BookOpen size={19} />
                </div>

                <h2 className="font-bold text-slate-900">
                  Learning progress
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Is your reading progress not saving or displaying correctly?
                </p>
              </div>

              {/* Bug */}
              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                  <Bug size={19} />
                </div>

                <h2 className="font-bold text-slate-900">
                  Report a bug
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Found something broken? Tell us what happened and where you
                  encountered the problem.
                </p>
              </div>

              {/* General Help */}
              <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-purple-700 shadow-sm">
                  <MessageCircle size={19} />
                </div>

                <h2 className="font-bold text-slate-900">
                  General help
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Not sure what category your issue falls into? Just describe
                  the problem and we&apos;ll take it from there.
                </p>
              </div>

            </div>

            {/* =========================
                SUPPORT FORM
            ========================== */}
            <div className="lg:col-span-2">

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Submit a support request
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Give us as much information as possible so we can
                    understand and resolve the issue.
                  </p>
                </div>

                {/* Success Message */}
                {submitted && (
                  <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5">
                    <h3 className="font-bold text-green-900">
                      Support request sent!
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-green-800">
                      Thanks for letting us know. We&apos;ve received your
                      request and will get back to you as soon as possible.
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                    <h3 className="font-semibold text-red-900">
                      Something went wrong
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-red-700">
                      {error}
                    </p>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="
                        mt-2
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3
                        text-sm
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-purple-500
                        focus:bg-white
                        focus:ring-2
                        focus:ring-purple-100
                      "
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="
                        mt-2
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3
                        text-sm
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-purple-500
                        focus:bg-white
                        focus:ring-2
                        focus:ring-purple-100
                      "
                    />
                  </div>

                  {/* Issue */}
                  <div>
                    <label
                      htmlFor="issue"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      What do you need help with?
                    </label>

                    <select
                      id="issue"
                      name="issue"
                      required
                      defaultValue=""
                      className="
                        mt-2
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3
                        text-sm
                        text-slate-900
                        outline-none
                        transition
                        focus:border-purple-500
                        focus:bg-white
                        focus:ring-2
                        focus:ring-purple-100
                      "
                    >
                      <option value="" disabled>
                        Select an issue
                      </option>

                      <option value="Account / Sign In">
                        Account / Sign In
                      </option>

                      <option value="Reading Progress">
                        Reading Progress
                      </option>

                      <option value="Website Bug">
                        Website Bug
                      </option>

                      <option value="Content Issue">
                        Content Issue
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Describe the problem
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={7}
                      placeholder="Tell us what happened, what you expected to happen, and any other details that might help..."
                      className="
                        mt-2
                        w-full
                        resize-y
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3
                        text-sm
                        leading-6
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-purple-500
                        focus:bg-white
                        focus:ring-2
                        focus:ring-purple-100
                      "
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="
                      inline-flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-purple-900
                      px-6
                      py-3.5
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-purple-800
                      active:scale-[0.99]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <Send size={17} />

                    {submitting
                      ? "Sending..."
                      : "Submit Support Request"}
                  </button>

                </form>

              </div>
            </div>

          </div>
        </section>

        {/* =========================
            EMAIL SUPPORT
        ========================== */}
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-6 py-12 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-purple-700 shadow-sm">
              <Mail size={21} />
            </div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              Prefer email?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              You can also contact our support team directly. Include the
              email associated with your Elvoret account and a description of
              the problem.
            </p>

            <a
              href="mailto:contact@elvoret.in"
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                text-purple-700
                shadow-sm
                ring-1
                ring-slate-200
                transition
                hover:bg-purple-50
              "
            >
              <Mail size={17} />
              contact@elvoret.in
            </a>

          </div>
        </section>

      </main>

      {/* Footer stays at the bottom */}
      <Footer />
    </>
  );
}