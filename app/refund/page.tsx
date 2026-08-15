"use client";

import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function RefundPolicyPage() {
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
            Refund & Cancellation Policy
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: August 15, 2026
          </p>

          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600">
            This Refund & Cancellation Policy explains how refunds,
            cancellations, and payment-related requests are handled for
            paid products and services offered by Elvoret.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-12 leading-7">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              1. General Policy
            </h2>

            <p className="mt-4">
              Elvoret may offer digital tools, products, subscriptions,
              services, or other paid features from time to time.
            </p>

            <p className="mt-4">
              Because digital products and services may provide immediate
              access after purchase, refund eligibility may depend on the
              specific product, purchase terms, usage, and applicable law.
            </p>

            <p className="mt-4">
              Any product-specific refund terms displayed at the time of
              purchase will form part of the applicable purchase terms.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              2. Cancellation Before Access
            </h2>

            <p className="mt-4">
              If a paid product or service has not yet been delivered or
              access has not yet been provided, you may contact us to request
              cancellation.
            </p>

            <p className="mt-4">
              Where cancellation is permitted, any applicable refund will be
              processed according to the terms presented for the specific
              product or service.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              3. Digital Products and Tools
            </h2>

            <p className="mt-4">
              For digital products or tools that provide immediate access,
              refunds may not be available after the product has been
              accessed, downloaded, or substantially used, except where
              required by applicable law or where Elvoret determines that a
              refund is appropriate.
            </p>

            <p className="mt-4">
              If a purchased digital product has a material technical problem
              that prevents you from using it as described, please contact us
              so that we can investigate the issue and, where appropriate,
              provide a correction, replacement, alternative access, or
              refund.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              4. Subscriptions
            </h2>

            <p className="mt-4">
              If Elvoret introduces subscription-based services, you may
              cancel a subscription according to the cancellation options
              provided with the relevant service.
            </p>

            <p className="mt-4">
              Unless otherwise stated, cancellation will generally prevent
              future renewals but may not automatically result in a refund for
              a billing period that has already begun.
            </p>

            <p className="mt-4">
              Any subscription-specific refund terms presented during
              checkout will apply to that subscription.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              5. Duplicate or Incorrect Charges
            </h2>

            <p className="mt-4">
              If you believe you have been charged more than once for the
              same purchase or have been charged an incorrect amount, contact
              us as soon as possible.
            </p>

            <p className="mt-4">
              After reviewing the transaction, we may issue an appropriate
              correction or refund where a duplicate or incorrect charge is
              confirmed.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              6. Failed or Interrupted Transactions
            </h2>

            <p className="mt-4">
              Sometimes a payment may appear to have been deducted from your
              bank account or payment method even though the transaction did
              not successfully complete.
            </p>

            <p className="mt-4">
              In such cases, the payment provider may automatically reverse or
              settle the transaction according to its processing procedures.
            </p>

            <p className="mt-4">
              If an amount has been deducted but your Elvoret purchase was not
              successfully completed, contact us with the relevant transaction
              information so that we can investigate.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              7. How to Request a Refund
            </h2>

            <p className="mt-4">
              To request a refund or report a payment issue, contact us at:
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">
                Email
              </p>

              <a
                href="mailto:contact@elvoret.in"
                className="mt-2 inline-block font-medium text-purple-700 hover:underline"
              >
                contact@elvoret.in
              </a>
            </div>

            <p className="mt-6">
              Please include, where possible:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Your name</li>
              <li>Email address associated with your Elvoret account</li>
              <li>Product or service purchased</li>
              <li>Date of purchase</li>
              <li>Transaction or order reference</li>
              <li>Reason for the refund request</li>
              <li>Any relevant screenshots or supporting information</li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              8. Refund Review
            </h2>

            <p className="mt-4">
              Refund requests will be reviewed based on the applicable
              product terms, transaction details, usage or access information,
              technical circumstances, and applicable law.
            </p>

            <p className="mt-4">
              We may request additional information when necessary to verify
              the transaction or understand the issue.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              9. Approved Refunds
            </h2>

            <p className="mt-4">
              If a refund is approved, it will generally be processed through
              the original payment method or through the applicable payment
              provider.
            </p>

            <p className="mt-4">
              The time required for the refunded amount to appear in your
              account may depend on your bank, card issuer, payment provider,
              or other financial institution.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              10. Payment Providers
            </h2>

            <p className="mt-4">
              Elvoret may use third-party payment processors such as Razorpay,
              Cashfree, or other payment providers to process transactions.
            </p>

            <p className="mt-4">
              Payment providers may have their own terms, transaction
              procedures, fraud-prevention systems, and processing timelines.
            </p>

            <p className="mt-4">
              Where applicable, you may also be subject to the terms and
              policies of the payment provider used for your transaction.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              11. Unauthorized Transactions
            </h2>

            <p className="mt-4">
              If you believe a transaction was made without your authorization,
              contact us immediately and also contact your bank, card issuer,
              or payment provider where appropriate.
            </p>

            <p className="mt-4">
              We may investigate suspected unauthorized transactions and take
              appropriate action to protect users and Elvoret.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              12. Changes to This Policy
            </h2>

            <p className="mt-4">
              Elvoret may update this Refund & Cancellation Policy when our
              products, payment methods, business practices, or legal
              requirements change.
            </p>

            <p className="mt-4">
              The latest version will be published on this page together with
              the updated date.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              13. Your Legal Rights
            </h2>

            <p className="mt-4">
              Nothing in this policy is intended to remove or restrict any
              consumer rights or other rights that cannot legally be excluded
              or limited under the laws applicable to you.
            </p>

            <p className="mt-4">
              Where applicable law provides a mandatory right to a refund,
              cancellation, withdrawal, or other consumer protection, that
              right will continue to apply.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              14. Contact Elvoret
            </h2>

            <p className="mt-4">
              For questions about refunds, cancellations, or payment issues,
              contact us:
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-3">
                <Mail
                  size={20}
                  className="text-purple-700"
                />

                <div>
                  <p className="font-semibold text-slate-900">
                    Elvoret
                  </p>

                  <a
                    href="mailto:contact@elvoret.in"
                    className="text-sm font-medium text-purple-700 hover:underline"
                  >
                    contact@elvoret.in
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Notice */}
          <section className="border-t border-slate-200 pt-8">
            <p className="text-sm leading-6 text-slate-500">
              This policy is provided for general informational purposes and
              does not constitute legal advice. Refund and cancellation rights
              can vary depending on the product, transaction, payment method,
              and applicable jurisdiction. We recommend obtaining professional
              legal advice before launching paid products if you require
              jurisdiction-specific terms.
            </p>
          </section>

        </div>
      </article>
    </main>
    <Footer/>
    </>

  );
}