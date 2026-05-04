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
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] bg-neutral-900/60"
      aria-hidden
    >
      {/* CSS scroll-driven when supported (compositor thread); JS fallback otherwise.
         3px tall + amber gold ramp + soft glow keeps it visible without
         dominating; track is dark slate so the bar reads on light backdrops too. */}
      <div
        className="scroll-progress-js h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.55)]"
        style={{
          width: `${progress * 100}%`,
          transition: "width 0.12s ease-out",
        }}
      />
      <div
        className="scroll-progress-css h-full w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.55)]"
      />
    </div>
  );
}
