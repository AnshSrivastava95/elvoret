"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-white text-slate-800">
      {/* Header */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link
            href="/"
            className="mb-6 inline-flex items-center text-sm font-medium text-purple-700 transition hover:text-purple-900"
          >
            ← Back to Elvoret
          </Link>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: August 15, 2026
          </p>

          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600">
            At Elvoret, we respect your privacy and are committed to being
            transparent about how information is collected, used, and
            protected when you use our website and services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-12 leading-7">

          {/* 1. About Elvoret */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              1. About Elvoret
            </h2>

            <p className="mt-4">
              Elvoret is an online platform focused on software engineering
              education, career development, developer resources, and
              practical tools for students and developers.
            </p>

            <p className="mt-4">
              This Privacy Policy explains how Elvoret handles information
              when you visit our website, create an account, use our learning
              resources, interact with our tools, or otherwise use services
              provided through Elvoret.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              2. Information We Collect
            </h2>

            <p className="mt-4">
              The information we collect depends on how you use Elvoret. We
              aim to collect only information reasonably necessary to provide
              and improve our services.
            </p>

            {/* Account Information */}
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              2.1 Account Information
            </h3>

            <p className="mt-3">
              If you create an Elvoret account, we may collect information
              associated with your account, such as:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Email address</li>
              <li>Authentication information</li>
              <li>Account identifiers</li>
              <li>Information required to maintain your account</li>
            </ul>

            <p className="mt-4">
              Authentication services may be provided using Supabase
              Authentication.
            </p>

            {/* Learning Information */}
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              2.2 Learning and Progress Information
            </h3>

            <p className="mt-3">
              When you use Elvoret&apos;s learning features, we may store
              information necessary to provide features such as learning
              progress tracking.
            </p>

            <p className="mt-3">
              This may include information such as:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Articles or learning resources you have accessed</li>
              <li>Completion status</li>
              <li>Learning progress percentages</li>
              <li>Learning-path progress</li>
            </ul>

            {/* Tools */}
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              2.3 Information You Provide Through Tools
            </h3>

            <p className="mt-3">
              Some Elvoret tools may allow you to voluntarily provide
              information or files, such as resumes, job descriptions, or
              other content required to operate a particular tool.
            </p>

            <p className="mt-3">
              The information required by a tool will depend on the specific
              tool and its functionality. We aim to collect only information
              reasonably necessary to provide the requested service.
            </p>

            <p className="mt-3">
              If a tool processes uploaded documents or other potentially
              sensitive information, we will provide additional information
              about how that information is processed where appropriate.
            </p>

            {/* Technical Information */}
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              2.4 Technical and Usage Information
            </h3>

            <p className="mt-3">
              When you visit Elvoret, certain technical information may be
              collected automatically by us or by service providers we use.
              This can include:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Referring pages</li>
              <li>General usage and interaction information</li>
            </ul>

            <p className="mt-3">
              This information may be used for security, analytics,
              troubleshooting, performance monitoring, and improving the
              website.
            </p>
          </section>

          {/* 3. How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              3. How We Use Information
            </h2>

            <p className="mt-4">
              We may use information collected through Elvoret for purposes
              including:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Creating and managing user accounts</li>
              <li>Providing learning and educational features</li>
              <li>Saving and displaying learning progress</li>
              <li>Providing requested tools and services</li>
              <li>Improving website functionality and user experience</li>
              <li>Understanding how users interact with Elvoret</li>
              <li>
                Detecting and preventing fraud, abuse, and security issues
              </li>
              <li>Maintaining and improving website performance</li>
              <li>Communicating important service-related information</li>
              <li>Complying with applicable legal obligations</li>
            </ul>
          </section>

          {/* 4. Authentication */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              4. Authentication and Supabase
            </h2>

            <p className="mt-4">
              Elvoret uses Supabase for certain backend and authentication
              functionality.
            </p>

            <p className="mt-4">
              When you create an account or sign in, information required for
              authentication may be processed through Supabase&apos;s services.
              Data stored through Supabase may be used to provide account
              functionality such as authentication and learning progress.
            </p>

            <p className="mt-4">
              Supabase may process information according to its own privacy
              policies and terms.
            </p>
          </section>

          {/* 5. Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              5. Cookies and Similar Technologies
            </h2>

            <p className="mt-4">
              Elvoret and certain third-party service providers may use
              cookies, local storage, or similar technologies to provide
              functionality, maintain sessions, understand usage, improve
              performance, and support security.
            </p>

            <p className="mt-4">
              If advertising services such as Google AdSense are enabled,
              advertising providers may use cookies or similar technologies
              to serve and measure advertisements.
            </p>

            <p className="mt-4">
              You can control certain cookies through your browser settings.
              Depending on the technology and service involved, disabling
              cookies may affect some functionality of the website.
            </p>
          </section>

          {/* 6. Advertising */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              6. Advertising
            </h2>

            <p className="mt-4">
              Elvoret may use third-party advertising services, including
              Google AdSense, to display advertisements on eligible pages.
            </p>

            <p className="mt-4">
              If Google or another advertising provider serves advertisements
              on Elvoret, those providers may use cookies, web beacons, IP
              addresses, or similar technologies in accordance with their own
              policies and applicable requirements.
            </p>

            <p className="mt-4">
              Advertising providers may use information collected through
              these technologies to provide, personalize, measure, and
              improve advertisements, subject to their applicable policies and
              user choices.
            </p>
          </section>

          {/* 7. Analytics */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              7. Analytics and Performance Services
            </h2>

            <p className="mt-4">
              Elvoret may use analytics and performance-monitoring services
              to understand website usage, identify technical problems, and
              improve the platform.
            </p>

            <p className="mt-4">
              These services may collect technical and usage information such
              as page views, device information, browser information, and
              general interaction data.
            </p>
          </section>

          {/* 8. Payments */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              8. Payments
            </h2>

            <p className="mt-4">
              Elvoret may offer paid products or tools. Payments may be
              processed through third-party payment providers such as
              Razorpay, Cashfree, or other providers selected by Elvoret.
            </p>

            <p className="mt-4">
              When a payment is made, payment providers may collect and
              process payment-related information necessary to complete the
              transaction, verify the payment, prevent fraud, and comply with
              applicable requirements.
            </p>

            <p className="mt-4">
              Elvoret does not intend to store complete payment-card
              information, such as full card numbers, on its own servers.
              Payment information is generally handled by the relevant
              payment provider.
            </p>

            <p className="mt-4">
              The specific payment provider used for a transaction may have
              its own privacy policy and terms that also apply to the
              transaction.
            </p>
          </section>

          {/* 9. Sharing Information */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              9. How We Share Information
            </h2>

            <p className="mt-4">
              Elvoret does not sell your personal information as a business
              practice.
            </p>

            <p className="mt-4">
              We may share or allow access to information with trusted service
              providers when reasonably necessary to operate Elvoret,
              including providers involved in:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Authentication and database infrastructure</li>
              <li>Website hosting and deployment</li>
              <li>Analytics and performance monitoring</li>
              <li>Advertising</li>
              <li>Payment processing</li>
              <li>Security and fraud prevention</li>
              <li>Customer support</li>
            </ul>

            <p className="mt-4">
              We may also disclose information when required by applicable
              law, legal process, court order, or governmental request, or
              when reasonably necessary to protect the rights, safety, and
              security of Elvoret, its users, or others.
            </p>
          </section>

          {/* 10. Security */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              10. Data Security
            </h2>

            <p className="mt-4">
              We take reasonable technical and organizational measures to
              protect information handled through Elvoret against unauthorized
              access, alteration, disclosure, or destruction.
            </p>

            <p className="mt-4">
              However, no internet-based service can guarantee absolute
              security. You should avoid submitting information that you do
              not want processed through an online service.
            </p>
          </section>

          {/* 11. Retention */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              11. Data Retention
            </h2>

            <p className="mt-4">
              We retain information for as long as reasonably necessary to
              provide the requested services, maintain user accounts, preserve
              learning progress, resolve disputes, maintain security, comply
              with legal obligations, and fulfill other legitimate operational
              purposes.
            </p>

            <p className="mt-4">
              Retention periods may differ depending on the type of information
              and the purpose for which it was collected.
            </p>
          </section>

          {/* 12. User Rights */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              12. Your Choices and Rights
            </h2>

            <p className="mt-4">
              Depending on applicable law and your location, you may have
              rights relating to your personal information, which can include
              rights to:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Request access to certain personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion where applicable</li>
              <li>
                Withdraw consent where processing is based on consent
              </li>
              <li>Raise concerns about data processing</li>
            </ul>

            <p className="mt-4">
              To make a privacy-related request, contact us using the details
              provided below. We may need to verify your identity before
              completing certain requests.
            </p>
          </section>

          {/* 13. Children */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              13. Children&apos;s Privacy
            </h2>

            <p className="mt-4">
              Elvoret is intended primarily for students, developers, and
              other individuals interested in software engineering and
              technology careers.
            </p>

            <p className="mt-4">
              Elvoret does not knowingly design its services to collect
              personal information from children in circumstances where such
              collection is prohibited by applicable law.
            </p>

            <p className="mt-4">
              If you believe that a child has provided personal information to
              Elvoret in violation of applicable requirements, please contact
              us so that we can review the situation.
            </p>
          </section>

          {/* 14. Third Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              14. Third-Party Links
            </h2>

            <p className="mt-4">
              Elvoret may contain links to third-party websites, services,
              documentation, tools, or other resources.
            </p>

            <p className="mt-4">
              We are not responsible for the privacy practices, security, or
              content of third-party websites. We encourage you to review
              their privacy policies before providing them with personal
              information.
            </p>
          </section>

          {/* 15. International Users */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              15. International Users
            </h2>

            <p className="mt-4">
              Elvoret may be accessed by users from different countries,
              including users in India and other jurisdictions.
            </p>

            <p className="mt-4">
              Depending on where you live and which services you use, your
              information may be processed by Elvoret or its service providers
              in countries other than your own.
            </p>

            <p className="mt-4">
              Where applicable, we will take reasonable steps to handle
              personal information in accordance with applicable privacy and
              data-protection requirements.
            </p>
          </section>

          {/* 16. Changes */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              16. Changes to This Privacy Policy
            </h2>

            <p className="mt-4">
              We may update this Privacy Policy from time to time to reflect
              changes to Elvoret, our services, technology, legal requirements,
              or privacy practices.
            </p>

            <p className="mt-4">
              When we make material changes, we may update the &quot;Last
              updated&quot; date displayed at the beginning of this policy and,
              where appropriate, provide additional notice.
            </p>
          </section>

          {/* 17. Contact */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              17. Contact Us
            </h2>

            <p className="mt-4">
              If you have questions, concerns, or requests relating to this
              Privacy Policy or the way Elvoret handles personal information,
              please contact us.
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
              This Privacy Policy is provided for informational purposes and
              describes Elvoret&apos;s intended privacy practices. It is not
              legal advice. As Elvoret expands its services, advertising,
              payment processing, resume-processing capabilities, and
              international operations, this Privacy Policy may be updated to
              reflect the specific services and legal requirements applicable
              at that time.
            </p>
          </section>
        </div>
      </article>
    </main>
    <Footer/>
    </>
  );
}