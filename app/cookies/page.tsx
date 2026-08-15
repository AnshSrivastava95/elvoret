"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function CookiePolicyPage() {
  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-white text-slate-800">
      {/* Header */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-purple-700 transition hover:text-purple-900"
          >
            <ArrowLeft size={16} />
            Back to Elvoret
          </Link>

          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-700">
            Legal
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Cookie Policy
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: August 15, 2026
          </p>

          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600">
            This Cookie Policy explains how Elvoret uses cookies and similar
            technologies when you visit or use our website.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-12 leading-7">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              1. What Are Cookies?
            </h2>

            <p className="mt-4">
              Cookies are small text files that websites may store on your
              device when you visit them. They allow websites to remember
              information about your visit and can help provide functionality,
              security, analytics, and personalized experiences.
            </p>

            <p className="mt-4">
              Elvoret may also use technologies that operate similarly to
              cookies, including local storage, pixels, tags, and other
              identifiers.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              2. How Elvoret Uses Cookies
            </h2>

            <p className="mt-4">
              Cookies and similar technologies may be used for several
              purposes, including:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Keeping users signed in</li>
              <li>Maintaining account sessions</li>
              <li>Supporting security</li>
              <li>Remembering preferences</li>
              <li>Understanding website usage</li>
              <li>Improving website performance</li>
              <li>Detecting errors and technical problems</li>
              <li>Measuring advertising performance</li>
              <li>Displaying relevant advertisements where applicable</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              3. Types of Cookies We May Use
            </h2>

            {/* Essential */}
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              3.1 Essential Cookies
            </h3>

            <p className="mt-3">
              These cookies are necessary for certain parts of Elvoret to
              function correctly.
            </p>

            <p className="mt-3">
              They may be used for authentication, session management,
              security, and other essential website functionality.
            </p>

            {/* Functional */}
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              3.2 Functional Cookies
            </h3>

            <p className="mt-3">
              Functional cookies may allow Elvoret to remember preferences and
              provide features that improve your experience.
            </p>

            {/* Analytics */}
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              3.3 Analytics Cookies
            </h3>

            <p className="mt-3">
              Analytics technologies may help us understand how visitors use
              Elvoret, such as which pages are visited, how users navigate the
              website, and whether technical problems occur.
            </p>

            {/* Advertising */}
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              3.4 Advertising Cookies
            </h3>

            <p className="mt-3">
              If Elvoret displays advertisements through services such as
              Google AdSense or other advertising providers, those providers
              may use cookies and similar technologies to serve, measure, and
              personalize advertisements.
            </p>

            <p className="mt-3">
              Third-party advertising providers may have their own privacy
              policies and cookie controls.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              4. Third-Party Cookies
            </h2>

            <p className="mt-4">
              Some cookies or similar technologies may be placed by third
              parties whose services are integrated into Elvoret.
            </p>

            <p className="mt-4">
              Depending on which features are active, these third parties may
              include providers of:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Analytics</li>
              <li>Advertising</li>
              <li>Authentication</li>
              <li>Payment processing</li>
              <li>Security</li>
              <li>Embedded content or external services</li>
            </ul>

            <p className="mt-4">
              Third parties may process information according to their own
              privacy policies and terms.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              5. Google Advertising
            </h2>

            <p className="mt-4">
              Elvoret may use Google advertising services, including Google
              AdSense, to display advertisements.
            </p>

            <p className="mt-4">
              When advertising services are active, Google and its advertising
              partners may use cookies or similar technologies to serve and
              measure advertisements.
            </p>

            <p className="mt-4">
              Users may have options for managing personalized advertising
              through Google&apos;s advertising settings and other applicable
              controls.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              6. Managing Cookies
            </h2>

            <p className="mt-4">
              Most modern web browsers allow you to control cookies through
              their settings.
            </p>

            <p className="mt-4">
              Depending on your browser, you may be able to:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>View stored cookies</li>
              <li>Delete existing cookies</li>
              <li>Block certain cookies</li>
              <li>Block all cookies</li>
              <li>Receive notifications when cookies are created</li>
            </ul>

            <p className="mt-4">
              Blocking or deleting certain cookies may cause some Elvoret
              features, including authentication or preferences, to function
              incorrectly.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              7. Do Not Track
            </h2>

            <p className="mt-4">
              Some browsers provide a &quot;Do Not Track&quot; setting.
              Because there is currently no universally accepted standard for
              responding to these signals, Elvoret may not respond to every
              browser-based Do Not Track signal.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              8. Changes to This Cookie Policy
            </h2>

            <p className="mt-4">
              We may update this Cookie Policy when our website, technologies,
              advertising services, analytics providers, or legal requirements
              change.
            </p>

            <p className="mt-4">
              When we make changes, we may update the &quot;Last updated&quot;
              date shown at the beginning of this policy.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              9. Contact Us
            </h2>

            <p className="mt-4">
              If you have questions about our use of cookies or similar
              technologies, please contact us.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">
                Elvoret
              </p>

              <p className="mt-2 text-slate-600">
                Website:{" "}
                <a
                  href="https://www.elvoret.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-purple-700 hover:underline"
                >
                  www.elvoret.in
                </a>
              </p>

              <p className="mt-2 text-slate-600">
                Email:{" "}
                <a
                  href="mailto:contact@elvoret.in"
                  className="font-medium text-purple-700 hover:underline"
                >
                  contact@elvoret.in
                </a>
              </p>
            </div>
          </section>

          {/* Legal Notice */}
          <section className="border-t border-slate-200 pt-8">
            <p className="text-sm leading-6 text-slate-500">
              This Cookie Policy is provided for general informational
              purposes. The specific cookies and technologies used by Elvoret
              may change as features and third-party services are added or
              removed. The policy should be updated when material changes are
              made to the website&apos;s data and cookie practices.
            </p>
          </section>

        </div>
      </article>
    </main>
    <Footer/>
    </>
  );
}