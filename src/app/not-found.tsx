import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lost in space",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen-safe w-full flex items-center justify-center px-6 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(245,158,11,0.18),transparent_60%)]"
      />
      <div className="max-w-xl w-full text-center">
        <p className="text-amber-400 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase mb-5">
          Error · 404
        </p>
        <h1 className="font-display text-7xl sm:text-8xl font-semibold tracking-tight leading-none mb-6">
          <span className="text-white">Lost</span>{" "}
          <span className="text-slate-500">in space.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-10">
          That page doesn&apos;t exist — or it drifted off the map. Head back to base.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium transition-colors duration-200"
          >
            Back home
          </Link>
          <Link
            href="/#projects"
            className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium border border-white/10 hover:border-white/20 transition-colors duration-200"
          >
            See projects
          </Link>
        </div>
      </div>
    </main>
  );
}
