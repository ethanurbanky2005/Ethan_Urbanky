"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const main = document.getElementById("main-content") ?? document.documentElement;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = main;
      const total = scrollHeight - clientHeight;
      const pct = total <= 0 ? 0 : Math.min(1, scrollTop / total);
      setProgress(pct);
    };

    update();
    main.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      main.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[200] h-0.5 bg-slate-800/80"
      aria-hidden
    >
      {/* CSS scroll-driven when supported (compositor thread); JS fallback otherwise */}
      <div
        className="scroll-progress-js h-full bg-gradient-to-r from-[var(--accent)] to-cyan-400"
        style={{
          width: `${progress * 100}%`,
          transition: "width 0.12s ease-out",
        }}
      />
      <div
        className="scroll-progress-css h-full w-full bg-gradient-to-r from-[var(--accent)] to-cyan-400"
      />
    </div>
  );
}
