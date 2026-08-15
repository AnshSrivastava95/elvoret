"use client";
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Mail,
  MessageSquare,
  ArrowLeft,
  Send,
} from "lucide-react";

export default function ContactPage() {
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
    const subject = String(formData.get("subject") || "");
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
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Failed to send your message."
        );
      }

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-white text-slate-800">

      {/* Hero */}
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
              Get in touch
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Contact Elvoret
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Have a question, found a bug, have feedback, or simply want
              to talk about what we&apos;re building? We&apos;d love to hear
              from you.
            </p>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Left Side */}
          <div className="space-y-6 lg:col-span-1">

            {/* Email Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                <Mail size={21} />
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                Email us
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                For general questions, feedback, partnerships, or support,
                reach out to us directly.
              </p>

              <a
                href="mailto:contact@elvoret.in"
                className="mt-4 inline-block font-semibold text-purple-700 transition hover:text-purple-900 hover:underline"
              >
                contact@elvoret.in
              </a>

            </div>

            {/* Feedback Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-purple-700 shadow-sm">
                <MessageSquare size={21} />
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                Feedback matters
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Elvoret is being built continuously. If something doesn&apos;t
                work well or you have an idea that could make the platform
                better, let us know.
              </p>

            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-8">

                <h2 className="text-2xl font-bold text-slate-900">
                  Send us a message
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Fill out the form below and we&apos;ll get back to you at
                  the email address you provide.
                </p>

              </div>

              {/* Success Message */}
              {submitted && (
                <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5">

                  <h3 className="font-bold text-green-900">
                    Message sent successfully!
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-green-800">
                    Thanks for contacting Elvoret. We&apos;ve received your
                    message and will get back to you as soon as possible.
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

                {/* Subject */}
                <div>

                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="How can we help?"
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

                {/* Message */}
                <div>

                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={7}
                    placeholder="Tell us what's on your mind..."
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
                    : "Send Message"}
                </button>

              </form>

            </div>
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-slate-200 bg-slate-50">

        <div className="mx-auto max-w-5xl px-6 py-12 text-center">

          <h2 className="text-2xl font-bold text-slate-900">
            Building Elvoret with the community
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Whether you&apos;re learning software engineering, preparing
            for your next opportunity, or simply have an idea for Elvoret,
            your feedback helps us build a better platform.
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
    <Footer/>
    </>
  );
}