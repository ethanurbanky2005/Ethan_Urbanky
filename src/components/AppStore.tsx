"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Download, ExternalLink, Github, Play, X, ArrowUpRight } from "lucide-react";
import { portfolio } from "@/config/portfolio";
import { getLogo } from "@/config/logos";
import Image from "next/image";

type StatusTone = "active" | "shipped" | "live";

interface Project {
  id: string;
  title: string;
  role: string;
  tagline?: string;
  description: string;
  tech: string[];
  icon: string;
  github?: string;
  demo?: string;
  download?: string;
  downloadNote?: string;
  screenshot?: string;
  featured?: boolean;
  status?: { label: string; tone: StatusTone };
}

export default function AppStore() {
  const [selectedApp, setSelectedApp] = useState<Project | null>(null);

  const projects = portfolio.projects as Project[];
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const others = projects.filter((p) => p.id !== featured.id);

  return (
    <LayoutGroup>
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-block">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight text-white mb-4 lg:mb-6"
          >
            Projects
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto"
        >
          Four builds, each shipped end-to-end.
        </motion.p>
      </div>

      {/* Bento grid: featured = full left half (2 cols × 3 rows on lg);
         three secondary tiles stack on the right column.
         Mobile/tablet: single column for legibility. */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-4 sm:gap-5 auto-rows-fr lg:auto-rows-auto">
        <FeaturedTile
          project={featured}
          index={0}
          onOpen={() => setSelectedApp(featured)}
        />
        {others.map((project, index) => (
          <SecondaryTile
            key={project.id}
            project={project}
            index={index + 1}
            onOpen={() => setSelectedApp(project)}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedApp && (
          <AppModal
            project={selectedApp}
            onClose={() => setSelectedApp(null)}
          />
        )}
      </AnimatePresence>
    </div>
    </LayoutGroup>
  );
}

/* ───────────── Status pill ───────────── */

function StatusPill({ status }: { status?: Project["status"] }) {
  if (!status) return null;
  const isActive = status.tone === "active";
  const dotClass =
    status.tone === "active"
      ? "bg-emerald-400"
      : status.tone === "live"
      ? "bg-violet-400"
      : "bg-slate-500";
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-[10px] font-mono uppercase tracking-[0.12em] text-slate-300">
      <span className="relative flex h-1.5 w-1.5">
        {isActive && (
          <span className={`absolute inline-flex h-full w-full rounded-full ${dotClass} opacity-70 motion-safe:animate-ping`} />
        )}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dotClass}`} />
      </span>
      {status.label}
    </div>
  );
}

/* ───────────── Cursor-following inner glow (parallax) ───────────── */

/**
 * Tracks pointer position over the tile and moves a soft radial bloom toward
 * the cursor. Spring-smoothed; CSS variables drive the gradient stop. Falls
 * back gracefully on touch / reduced-motion (no listeners attached).
 */
function useCursorGlow<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });
  const bg = useMotionTemplate`radial-gradient(420px circle at ${sx}% ${sy}%, rgba(167,139,250,0.18), transparent 55%)`;

  const onMove = (e: React.PointerEvent<T>) => {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const onLeave = () => {
    mx.set(50);
    my.set(50);
  };

  return { ref, bg, onMove, onLeave };
}

/* ───────────── Featured (headline) tile ───────────── */

function FeaturedTile({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const glow = useCursorGlow<HTMLDivElement>();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative cursor-pointer lg:col-span-2 lg:row-span-3"
      data-cursor-hover
      onClick={onOpen}
      ref={glow.ref}
      onPointerMove={glow.onMove}
      onPointerLeave={glow.onLeave}
    >
      <div className="relative h-full rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-violet-400/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.12),0_24px_60px_rgba(0,0,0,0.35)] active:scale-[0.995] touch-manipulation">

        {/* Cursor-driven inner bloom */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glow.bg }}
        />

        {/* Static signature gradient (always present, hover-amplified) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_60%_50%_at_85%_-10%,rgba(139,92,246,0.18),transparent_60%)]"
        />

        <div className="relative h-full p-6 sm:p-8 flex flex-col">
          {/* Top row */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <motion.div
              layoutId={`project-icon-${project.id}`}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-violet-400/20 to-violet-500/20 border border-white/10 flex items-center justify-center flex-shrink-0 p-3"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Image
                src={getLogo(project.icon)}
                alt={project.title}
                width={80}
                height={80}
                className="max-w-full max-h-full object-contain filter brightness-0 invert"
                unoptimized={true}
              />
            </motion.div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-violet-400/80">
                Featured
              </span>
              <StatusPill status={project.status} />
            </div>
          </div>

          {/* Title + role */}
          <motion.h3
            layoutId={`project-title-${project.id}`}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.05] mb-2"
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {project.title}
          </motion.h3>
          <p className="text-violet-300/90 text-sm sm:text-base mb-5">{project.role}</p>

          {/* Tagline (in-tile, no click required) */}
          {project.tagline && (
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-4 max-w-2xl">
              {project.tagline}
            </p>
          )}

          {/* Description preview */}
          <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 max-w-2xl">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.tech.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs rounded-md bg-white/[0.06] text-slate-300 border border-white/10 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA arrow */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300 hidden sm:block">
            <div className="w-10 h-10 rounded-full bg-violet-500/15 ring-1 ring-violet-400/30 flex items-center justify-center">
              <ArrowUpRight size={16} className="text-violet-300" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────── Secondary tile ───────────── */

function SecondaryTile({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const glow = useCursorGlow<HTMLDivElement>();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="group relative cursor-pointer"
      data-cursor-hover
      onClick={onOpen}
      ref={glow.ref}
      onPointerMove={glow.onMove}
      onPointerLeave={glow.onLeave}
    >
      <div className="relative h-full rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-violet-400/25 hover:shadow-[0_0_24px_rgba(139,92,246,0.10),0_16px_40px_rgba(0,0,0,0.3)] active:scale-[0.99] touch-manipulation">

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glow.bg }}
        />

        <div className="relative p-5 sm:p-6 flex flex-col h-full">
          {/* Top: icon + title */}
          <div className="flex items-start gap-4 mb-3">
            <motion.div
              layoutId={`project-icon-${project.id}`}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400/20 to-violet-500/20 border border-white/10 flex items-center justify-center flex-shrink-0 p-2"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Image
                src={getLogo(project.icon)}
                alt={project.title}
                width={48}
                height={48}
                className="max-w-full max-h-full object-contain filter brightness-0 invert"
                unoptimized={true}
              />
            </motion.div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <motion.h3
                  layoutId={`project-title-${project.id}`}
                  className="text-white font-semibold text-base group-hover:text-violet-200 transition-colors truncate"
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                  {project.title}
                </motion.h3>
                <ArrowUpRight
                  size={14}
                  className="text-slate-500 group-hover:text-violet-300 transition-colors flex-shrink-0"
                />
              </div>
              <p className="text-slate-500 text-xs truncate">{project.role}</p>
            </div>
          </div>

          {/* Tagline / brief */}
          <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
            {project.tagline ?? project.description}
          </p>

          {/* Bottom row: top techs + status */}
          <div className="mt-auto flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5 min-w-0">
              {project.tech.slice(0, 2).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[11px] rounded-md bg-white/[0.06] text-slate-400 border border-white/10 font-mono whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 2 && (
                <span className="text-[11px] text-slate-500 self-center font-mono">
                  +{project.tech.length - 2}
                </span>
              )}
            </div>
            <StatusPill status={project.status} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface AppModalProps {
  project: Project;
  onClose: () => void;
}

function AppModal({ project, onClose }: AppModalProps) {
  // Prevent body scroll and fix iOS viewport issues
  useEffect(() => {
    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;
    
    // Store original styles
    const originalBodyStyle = body.style.cssText;
    const originalHtmlStyle = html.style.cssText;
    
    // Lock scroll position for iOS
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    
    return () => {
      // Restore original styles
      body.style.cssText = originalBodyStyle;
      html.style.cssText = originalHtmlStyle;
      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain p-4 bg-black/50 backdrop-blur-sm"
      style={{
        width: '100dvw',
        minHeight: '100dvh',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-2xl my-auto max-h-[calc(100dvh-2rem)] overflow-y-auto bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl backdrop-blur-md p-6 sm:p-8 touch-manipulation"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 flex items-center justify-center transition-all duration-200 touch-manipulation z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} className="text-white" />
          </motion.button>
          
          <div className="flex items-start gap-6 mb-6">
            <motion.div
              layoutId={`project-icon-${project.id}`}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-400/20 to-violet-500/20 border border-white/20 flex items-center justify-center flex-shrink-0 p-3"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Image
                src={getLogo(project.icon)}
                alt={project.title}
                width={80}
                height={80}
                className="max-w-full max-h-full object-contain filter brightness-0 invert"
                unoptimized={true}
              />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <motion.h2
                layoutId={`project-title-${project.id}`}
                className="font-display text-2xl font-medium text-white mb-2"
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                {project.title}
              </motion.h2>
              <p className="text-violet-400 mb-3">{project.role}</p>
              <p className="text-slate-300 leading-relaxed">{project.description}</p>
            </div>
          </div>
        </div>

        {/* Optional screenshot — anchored after the header so the visual sits inline with copy */}
        {project.screenshot && (
          <div className="mb-6 rounded-xl overflow-hidden border border-white/10 bg-black/30">
            <Image
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              unoptimized
            />
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-6">
          <h3 className="text-white font-medium mb-3">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm rounded-full bg-white/10 text-slate-300 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[160px] h-12 rounded-xl bg-violet-600/80 hover:bg-violet-600 active:bg-violet-700 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-violet-400/30 touch-manipulation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play size={18} />
              <span>Run App</span>
            </motion.a>
          )}

          {project.download && (
            <motion.a
              href={project.download}
              download
              className="flex-1 min-w-[160px] h-12 rounded-xl bg-violet-600/80 hover:bg-violet-600 active:bg-violet-700 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-violet-400/30 touch-manipulation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={18} />
              <span>Download to Play</span>
            </motion.a>
          )}

          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[160px] h-12 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-white/20 touch-manipulation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github size={18} />
              <span>Source Code</span>
            </motion.a>
          )}

          {/* Fallback open-in-new-tab — only shows if there's somewhere to point it */}
          {(project.github || project.demo) && (
            <motion.a
              href={project.github || project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-6 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-medium transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/20 touch-manipulation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Open in new tab"
            >
              <ExternalLink size={18} />
            </motion.a>
          )}
        </div>

        {/* Optional helper note — credentials, requirements, etc. */}
        {project.downloadNote && (
          <p className="mt-3 text-xs text-slate-500 leading-relaxed">
            {project.downloadNote}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
