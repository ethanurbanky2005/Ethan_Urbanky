import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import { portfolio } from "@/config/portfolio";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
  themeColor: "#0A0B10",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}>         
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
