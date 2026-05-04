import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import { portfolio } from "@/config/portfolio";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const SITE_URL = "https://ethanurbanky.dev";
const TITLE = `${portfolio.identity.name} — Data Science & Software Engineering`;
const DESCRIPTION =
  "Data Science & Software Engineering student at Western University. 3× CI Financial intern. Co-Founder of CONQ. Bilingual EN/FR.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${portfolio.identity.name}`,
  },
  description: DESCRIPTION,
  applicationName: portfolio.identity.name,
  authors: [{ name: portfolio.identity.name, url: SITE_URL }],
  creator: portfolio.identity.name,
  keywords: [
    "Ethan Urbanky",
    "Data Science",
    "Software Engineering",
    "CI Financial",
    "Western University",
    "Machine Learning",
    "Python",
    "TypeScript",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: portfolio.identity.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@ethanurbanky",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/ethan-brand-logo.svg",
    shortcut: "/ethan-brand-logo.svg",
    apple: "/ethan-brand-logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // allow zoom for a11y (WCAG)
  themeColor: "#0a0a0a",
  viewportFit: "cover", // required for env(safe-area-inset-*) on notched devices
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased bg-neutral-950 text-slate-100`}>
        <a
          href="#main-content"
          className="absolute -left-[9999px] top-4 z-[300] px-4 py-2 bg-amber-500 text-white rounded-lg font-medium focus:left-4 focus:outline focus:outline-2 focus:outline-amber-400 focus:outline-offset-2"
        >
          Skip to main content
        </a>
        {children}
        <Cursor />
        <Analytics 
          mode="production"
          debug={process.env.NODE_ENV === 'development'}
        />
      </body>
    </html>
  );
}
