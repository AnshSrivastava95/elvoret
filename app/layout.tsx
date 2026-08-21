import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elvoret.in"),

  title: {
    default: "Elvoret - Elevate Your Tomorrow",
    template: "%s | Elvoret",
  },

  icons: {
    icon: "/favicon.ico"
  },

  description:
    "Learn, build, and grow with in-depth software engineering articles, AI, Backend Development, DSA, System Design, Frontend, and practical developer roadmaps.",

  keywords: [
    "Elvoret",
    "Software Engineering",
    "Programming",
    "Backend Development",
    "Frontend Development",
    "Artificial Intelligence",
    "AI",
    "Machine Learning",
    "System Design",
    "Data Structures",
    "Algorithms",
    "DSA",
    "Redis",
    "Node.js",
    "Next.js",
    "React",
    "JavaScript",
    "TypeScript",
    "Career",
    "Developer Roadmap",
    "Coding",
  ],

  authors: [
    {
      name: "Ansh Srivastava",
      url: "https://elvoret.in",
    },
  ],

  creator: "Ansh Srivastava",
  publisher: "Elvoret",
  category: "Technology",

  

  openGraph: {
    title: "Elvoret - Elevate Your Tomorrow",

    description:
      "Practical software engineering tutorials, AI, Backend Development, DSA, System Design, and career guides.",

    url: "https://elvoret.in",

    siteName: "Elvoret",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/featured.png",
        width: 1200,
        height: 630,
        alt: "Elvoret",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Elvoret - Elevate Your Tomorrow",

    description:
      "Practical software engineering tutorials, AI, Backend Development, DSA, System Design, and career guides.",

    images: ["/featured.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  applicationName: "Elvoret",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        {children}

        {/* Vercel Analytics */}
        <Analytics />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1CR60QZKWH"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-1CR60QZKWH');
          `}
        </Script>
      </body>
    </html>
  );
}