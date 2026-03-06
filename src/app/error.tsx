"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log server-side or to monitoring; do not expose to client in production
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-xl font-semibold text-slate-100 mb-2">
        Something went wrong
      </h2>
      <p className="text-slate-400 mb-4">
        {isDev ? error.message : "Please try again later."}
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg bg-cyan-500/80 hover:bg-cyan-500 text-white font-medium"
      >
        Try again
      </button>
    </div>
  );
}
