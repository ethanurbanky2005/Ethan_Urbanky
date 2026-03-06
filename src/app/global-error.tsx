"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
        <p className="text-slate-400 mb-4">
          {isDev ? error.message : "Please refresh the page or try again later."}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-cyan-500/80 hover:bg-cyan-500 text-white font-medium"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
