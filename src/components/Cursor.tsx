"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const reduceMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      state.current.tx = e.clientX;
      state.current.ty = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const frame = () => {
      const s = state.current;
      const t = reduceMotion ? 0.3 : 0.18;
      s.x += (s.tx - s.x) * t;
      s.y += (s.ty - s.y) * t;
      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else { raf = requestAnimationFrame(frame); }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div ref={ref} className="fixed z-[200] pointer-events-none h-5 w-5 rounded-full bg-cyan-300/40 ring-2 ring-cyan-400/60 hidden md:block" />
  );
}
