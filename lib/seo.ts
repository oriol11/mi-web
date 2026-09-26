import type { Metadata } from "next";

/* ------------------------------------------------------------------ */
/*  Site constants                                                     */
/* ------------------------------------------------------------------ */

const SITE = {
  name: "Aurora",
  url: "https://aurora.dev",
  description:
    "Aurora is a premium Next.js landing template featuring glassmorphism, dark-mode-first design, and refined motion.",
  image: "/og/aurora.jpg",
};

/* ------------------------------------------------------------------ */
/*  SEO metadata                                                       */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Next.js",
    "Tailwind CSS",
    "glassmorphism",
    "landing page",
    "template",
    "dark mode",
    "react",
  ],
  authors: [{ name: "Aurora Team" }],
  creator: "@aurora",

  /* robots */
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* canonical */
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },

  /* open graph */
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: [
      {
        url: SITE.image,
        width: 1200,
        height: 630,
        alt: "Aurora landing page preview",
      },
    ],
  },

  /* twitter cards */
  twitter: {
    card: "summary_large_image",
    site: "@aurora",
    creator: "@aurora",
    title: SITE.name,
    description: SITE.description,
    images: [SITE.image],
  },

  /* favicons / icons */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
  },

  manifest: "/site.webmanifest",
  themeColor: "#0f172a",
  backgroundColor: "#020617",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

/* ------------------------------------------------------------------ */
/*  JSON-LD structured data (WebSite)                                  */
/* ------------------------------------------------------------------ */

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  publisher: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/logo.png`,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};
