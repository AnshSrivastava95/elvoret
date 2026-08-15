"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: August 15, 2026
          </p>

          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600">
            These Terms of Service govern your access to and use of the
            Elvoret website, learning resources, tools, and related services.
            By accessing or using Elvoret, you agree to these Terms.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-12 leading-7">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              1. About Elvoret
            </h2>

            <p className="mt-4">
              Elvoret is an online platform focused on software engineering
              education, career development, developer resources, learning
              materials, and practical tools.
            </p>

            <p className="mt-4">
              Elvoret may provide both free and paid services. Features,
              products, pricing, and availability may change over time.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              2. Acceptance of These Terms
            </h2>

            <p className="mt-4">
              By accessing or using Elvoret, you acknowledge that you have
              read, understood, and agree to be bound by these Terms of
              Service and our Privacy Policy.
            </p>

            <p className="mt-4">
              If you do not agree with these Terms, you should not use
              Elvoret or its services.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              3. Eligibility
            </h2>

            <p className="mt-4">
              You must be legally capable of entering into an agreement under
              the laws applicable to you in order to use services that require
              a legally binding contract.
            </p>

            <p className="mt-4">
              If you use Elvoret on behalf of another person or organization,
              you represent that you have authority to accept these Terms on
              their behalf.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              4. User Accounts
            </h2>

            <p className="mt-4">
              Certain features of Elvoret may require you to create an
              account.
            </p>

            <p className="mt-4">
              You are responsible for:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Providing accurate account information</li>
              <li>Maintaining the security of your account</li>
              <li>Keeping your login credentials confidential</li>
              <li>Activities performed through your account</li>
            </ul>

            <p className="mt-4">
              You should notify Elvoret if you believe that your account has
              been accessed without authorization.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              5. Acceptable Use
            </h2>

            <p className="mt-4">
              You agree to use Elvoret only for lawful purposes and in a way
              that does not interfere with the operation or security of the
              platform.
            </p>

            <p className="mt-4">
              You must not:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Use Elvoret for unlawful, fraudulent, or abusive activities
              </li>
              <li>
                Attempt to gain unauthorized access to systems or accounts
              </li>
              <li>
                Interfere with or disrupt the website or its infrastructure
              </li>
              <li>
                Introduce malicious code, malware, or harmful content
              </li>
              <li>
                Scrape or systematically copy substantial portions of the
                platform without permission
              </li>
              <li>
                Circumvent access restrictions or security mechanisms
              </li>
              <li>
                Resell or redistribute paid Elvoret products without permission
              </li>
              <li>
                Impersonate Elvoret, its employees, or other users
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              6. Educational Content
            </h2>

            <p className="mt-4">
              Elvoret provides educational and informational content relating
              to software engineering, technology, careers, programming,
              system design, and related subjects.
            </p>

            <p className="mt-4">
              Educational content is provided for general informational and
              learning purposes. We do not guarantee that completing any
              course, article, roadmap, or learning resource will result in
              employment, a particular salary, an internship, or any other
              specific outcome.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              7. Career and AI-Powered Tools
            </h2>

            <p className="mt-4">
              Elvoret may provide tools that analyze resumes, job
              descriptions, cover letters, or other career-related information.
            </p>

            <p className="mt-4">
              Results generated by these tools are intended to provide
              assistance and suggestions. They should not be considered a
              guarantee of employment, interview selection, ATS performance,
              or any other career outcome.
            </p>

            <p className="mt-4">
              Users are responsible for reviewing generated content before
              using it in applications or other professional contexts.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              8. User-Submitted Content
            </h2>

            <p className="mt-4">
              Certain Elvoret features may allow you to submit text,
              documents, resumes, job descriptions, feedback, or other
              information.
            </p>

            <p className="mt-4">
              You remain responsible for the content you submit and must have
              the necessary rights and permissions to provide it to Elvoret.
            </p>

            <p className="mt-4">
              You must not upload content that is unlawful, malicious,
              infringing, deceptive, or otherwise prohibited by applicable
              law.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              9. Intellectual Property
            </h2>

            <p className="mt-4">
              Unless otherwise stated, Elvoret and its licensors own or
              control the intellectual property rights associated with the
              Elvoret website, branding, design, software, original written
              content, graphics, and other materials.
            </p>

            <p className="mt-4">
              You may access and use Elvoret content for your personal,
              non-commercial learning purposes unless otherwise permitted.
            </p>

            <p className="mt-4">
              You may not reproduce, distribute, modify, sell, publicly
              display, or commercially exploit substantial portions of
              Elvoret&apos;s proprietary content without prior written
              permission.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              10. Free Content and Services
            </h2>

            <p className="mt-4">
              Elvoret may provide certain articles, learning resources,
              features, and tools free of charge.
            </p>

            <p className="mt-4">
              Free features may be changed, suspended, or discontinued at any
              time.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              11. Paid Products and Services
            </h2>

            <p className="mt-4">
              Elvoret may offer paid products, tools, subscriptions, or other
              services.
            </p>

            <p className="mt-4">
              Before completing a purchase, the applicable price, payment
              terms, and product description will be presented to you.
            </p>

            <p className="mt-4">
              Payment processing may be handled by third-party payment
              providers such as Razorpay, Cashfree, or other providers
              selected by Elvoret.
            </p>

            <p className="mt-4">
              Additional terms relating to refunds or cancellations may be
              provided through Elvoret&apos;s Refund Policy.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              12. Payments and Transactions
            </h2>

            <p className="mt-4">
              You agree to provide accurate information when making a
              purchase.
            </p>

            <p className="mt-4">
              Elvoret may refuse, cancel, or limit a transaction where there
              is a reasonable indication of fraud, unauthorized activity,
              pricing errors, abuse, or other circumstances that require
              investigation.
            </p>

            <p className="mt-4">
              Payment providers may apply their own terms, privacy policies,
              fees, verification procedures, and transaction requirements.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              13. Third-Party Services
            </h2>

            <p className="mt-4">
              Elvoret may rely on third-party services to provide parts of
              the platform, including hosting, authentication, analytics,
              email delivery, payment processing, advertising, AI services,
              and other infrastructure.
            </p>

            <p className="mt-4">
              Third-party services may have their own terms and privacy
              policies. Elvoret is not responsible for the independent
              practices of third-party providers.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              14. Third-Party Links
            </h2>

            <p className="mt-4">
              Elvoret may contain links to websites, tools, documentation,
              services, or other resources operated by third parties.
            </p>

            <p className="mt-4">
              These links are provided for convenience and informational
              purposes. Elvoret does not control or guarantee the content,
              availability, security, or policies of third-party websites.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              15. Availability and Changes
            </h2>

            <p className="mt-4">
              We aim to keep Elvoret available and reliable, but we do not
              guarantee uninterrupted or error-free access.
            </p>

            <p className="mt-4">
              We may modify, update, suspend, or discontinue features,
              services, content, or portions of the website at any time.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              16. Disclaimer of Warranties
            </h2>

            <p className="mt-4">
              Elvoret is provided on an &quot;as is&quot; and &quot;as
              available&quot; basis to the extent permitted by applicable law.
            </p>

            <p className="mt-4">
              We do not guarantee that the website, content, tools, or
              services will always be accurate, complete, available, secure,
              or free from errors.
            </p>

            <p className="mt-4">
              You are responsible for evaluating information and results
              provided through the platform before relying on them.
            </p>
          </section>

          {/* 17 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              17. Limitation of Liability
            </h2>

            <p className="mt-4">
              To the maximum extent permitted by applicable law, Elvoret and
              its operators will not be responsible for indirect, incidental,
              consequential, special, or punitive damages arising from or
              related to your use of the platform.
            </p>

            <p className="mt-4">
              Nothing in these Terms is intended to exclude or limit
              liability where such exclusion or limitation is prohibited by
              applicable law.
            </p>
          </section>

          {/* 18 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              18. Account Suspension or Termination
            </h2>

            <p className="mt-4">
              We may suspend or terminate access to an account or service if
              we reasonably believe that a user has violated these Terms,
              engaged in fraudulent or abusive activity, created a security
              risk, or otherwise misused Elvoret.
            </p>

            <p className="mt-4">
              Users may stop using Elvoret at any time.
            </p>
          </section>

          {/* 19 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              19. Changes to These Terms
            </h2>

            <p className="mt-4">
              We may update these Terms from time to time as Elvoret evolves,
              new services are introduced, or legal requirements change.
            </p>

            <p className="mt-4">
              When material changes are made, we may update the
              &quot;Last updated&quot; date and, where appropriate, provide
              additional notice.
            </p>
          </section>

          {/* 20 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              20. Governing Law
            </h2>

            <p className="mt-4">
              These Terms are intended to be governed by the laws applicable
              to Elvoret and its operations, subject to any mandatory rights
              and protections that apply to users under the laws of their
              jurisdiction.
            </p>

            <p className="mt-4">
              Any dispute will be handled in accordance with applicable law
              and the jurisdiction legally applicable to the parties.
            </p>
          </section>

          {/* 21 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              21. Contact Us
            </h2>

            <p className="mt-4">
              If you have questions about these Terms, please contact Elvoret:
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
              These Terms are provided for general informational purposes and
              are not legal advice. Because Elvoret is evolving and may serve
              users in multiple jurisdictions, we recommend obtaining
              professional legal advice before relying on these Terms as the
              final legal agreement for the business.
            </p>
          </section>

        </div>
      </article>
    </main>
    <Footer/>
    </>
  );
}