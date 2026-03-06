import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import { portfolio } from "@/config/portfolio";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: `${portfolio.identity.name}`,
  description: `${portfolio.identity.tagline}`,
  icons: {
    icon: '/ethan-brand-logo.svg',
    shortcut: '/ethan-brand-logo.svg',
    apple: '/ethan-brand-logo.svg',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // allow zoom for a11y (WCAG)
  themeColor: "#0A0B10",
  viewportFit: "cover", // required for env(safe-area-inset-*) on notched devices
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased bg-slate-950 text-slate-100`}>
        <a
          href="#main-content"
          className="absolute -left-[9999px] top-4 z-[300] px-4 py-2 bg-cyan-500 text-white rounded-lg font-medium focus:left-4 focus:outline focus:outline-2 focus:outline-cyan-400 focus:outline-offset-2"
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
