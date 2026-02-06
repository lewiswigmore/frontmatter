import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "frontmatter.cc - Free GitHub README Generator & Profile Builder",
    template: "%s | frontmatter.cc",
  },
  description:
    "Create stunning GitHub profile READMEs in minutes. Free, open source README generator with 9 templates, 20+ components, live preview, and one-click copy. No sign-up required.",
  keywords: [
    "GitHub README generator",
    "GitHub profile README",
    "README builder",
    "GitHub profile builder",
    "README template",
    "GitHub README maker",
    "developer profile",
    "GitHub stats",
    "README design",
    "open source",
    "free README generator",
    "markdown generator",
  ],
  authors: [{ name: "Lewis Wigmore", url: "https://github.com/lewiswigmore" }],
  creator: "Lewis Wigmore",
  metadataBase: new URL("https://frontmatter.cc"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "frontmatter.cc — Free GitHub README Generator",
    description:
      "Create stunning GitHub profile READMEs in minutes. Free, open source with 9 templates, 20+ components, and live preview.",
    url: "https://frontmatter.cc",
    siteName: "frontmatter.cc",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "frontmatter.cc — Free GitHub README Generator",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "frontmatter.cc — Free GitHub README Generator",
    description:
      "Create stunning GitHub profile READMEs in minutes. Free, open source with 9 templates, 20+ components, and live preview.",
    creator: "@lewiswigmore",
    images: ["/og-image.png"],
  },
  category: "developer-tools",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} antialiased bg-paper text-ink`}
      >
        {children}
      </body>
    </html>
  );
}
