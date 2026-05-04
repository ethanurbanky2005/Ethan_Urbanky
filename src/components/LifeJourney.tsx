"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLogo } from "@/config/logos";
import Image from "next/image";
import { MapPin } from "lucide-react";

/**
 * Exported so SkillConstellation can cross-reference which roles use each
 * skill (`tech` array). Single source of truth: edit here, reflects both
 * places automatically.
 */
export const experiences = [
  {
    id: "ucc",
    tab: "Upper Canada College",
    tabShort: "UCC",
    yearRange: "2019 — 2023",
    company: "Upper Canada College",
    logo: "Upper Canada College",
    title: "IB Diploma",
    period: "Sept 2019 to Jun 2023",
    location: "Toronto, ON",
    bullets: [
      "Co-founded the school's first Quantum Computing Club, recruited 20+ members and ran 8 educational sessions on emerging computing paradigms",
      "Co-organized a Mt. Kilimanjaro expedition that raised $6,440 for The George Hull Centre for Children and Families",
      "Competed in Varsity Rugby and JV Football; graduated with the International Baccalaureate Diploma",
    ],
    metrics: [
      { value: "20+", label: "Club members" },
      { value: "$6,440", label: "Charity raised" },
    ],
    tech: ["IB Diploma", "Leadership", "Quantum Computing", "Athletics"],
  },
  {
    id: "western",
    tab: "Western University",
    tabShort: "Western",
    yearRange: "2023 — 2027",
    company: "University of Western Ontario",
    logo: "University of Western Ontario",
    title: "BSc Honours Data Science",
    period: "Sept 2023 to Apr 2027",
    location: "London, ON",
    bullets: [
      "Honours Specialization in Data Science with coursework in machine learning, statistical analysis, algorithm design, and database systems",
      "Business for Science (BUIS 2295F/G) through Ivey Business School's case method, covering financial management and decision-making under ambiguity",
    ],
    tech: ["Machine Learning", "Statistical Analysis", "Python", "SQL", "Ivey Case Method"],
  },
  {
    id: "ci-2023",
    tab: "CI Financial '23",
    tabShort: "CI '23",
    yearRange: "Summer 2023",
    company: "CI Financial",
    logo: "CI Financial",
    title: "Software Developer Intern",
    period: "Jun 2023 to Aug 2023",
    location: "Toronto, ON",
    bullets: [
      "Built an internal web application in 8 weeks, from requirements analysis across 3 stakeholder groups through to production deployment",
      "Built financial dashboards integrating real-time data APIs; contributed to 10+ Agile ceremonies ensuring on-time delivery",
    ],
    metrics: [
      { value: "8 wks", label: "End-to-end ship" },
      { value: "10+", label: "Agile ceremonies" },
      { value: "3", label: "Stakeholder groups" },
    ],
    tech: ["Django", "Python", "PostgreSQL", "JavaScript", "HTML5"],
  },
  {
    id: "ci-2024",
    tab: "CI Financial '24",
    tabShort: "CI '24",
    yearRange: "Summer 2024",
    company: "CI Financial",
    logo: "CI Financial",
    title: "Full-Stack Developer Intern",
    period: "May 2024 to Aug 2024",
    location: "Toronto, ON",
    bullets: [
      "Built a financial advisory platform serving 900+ advisors managing $46B in assets, integrating 5+ financial APIs into real-time dashboards across 6 Agile sprints",
      "Ran cross-functional sprint reviews between business and technical teams and presented findings to non-technical stakeholders",
    ],
    metrics: [
      { value: "$46B", label: "Assets supported" },
      { value: "900+", label: "Advisors" },
      { value: "5+", label: "APIs integrated" },
      { value: "6", label: "Agile sprints" },
    ],
    tech: ["Django", "React.js", "Python", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "ci-2025",
    tab: "CI Financial '25",
    tabShort: "CI '25",
    yearRange: "Summer 2025",
    company: "CI Financial",
    logo: "CI Financial",
    title: "Application Architecture Intern",
    period: "May 2025 to Aug 2025",
    location: "Toronto, ON",
    bullets: [
      "Led Snowflake cloud platform integration across the $103B wealth management division, mapping 50+ Sybase/SQR pipelines to future-state cloud architecture",
      "Validated 2M+ client records across 4 transformation stages at 99.9% accuracy; automated Jira workflows cutting 10+ hrs of manual overhead per sprint",
    ],
    metrics: [
      { value: "$103B", label: "Division AUM" },
      { value: "2M+", label: "Records validated" },
      { value: "50+", label: "Pipelines mapped" },
      { value: "99.9%", label: "Accuracy" },
    ],
    tech: ["Python", "Snowflake", "SQL", "Bash", "Jira"],
  },
  {
    id: "conq",
    tab: "CONQ",
    tabShort: "CONQ",
    yearRange: "2025 — Now",
    company: "CONQ",
    logo: "CONQ",
    title: "Co-Founder & ML/AI Lead",
    period: "2025 to Present",
    location: "London, ON",
    current: true,
    bullets: [
      "Co-founding a health-tech startup building AI-powered smart glasses for concussion recovery monitoring in contact sports, in active development",
      "Built a multi-modal ML pipeline processing 5 concurrent biometric sensor streams (accelerometer, gyroscope, ECG, SpO₂, skin temperature) for real-time recovery classification",
      "Competed in UWO Presidents Challenge 2026; targeting OHL teams at $12K–$20K per team-season within the $6.58B global concussion market",
    ],
    metrics: [
      { value: "5", label: "Sensor streams" },
      { value: "$6.58B", label: "Market (TAM)" },
      { value: "OHL", label: "Target league" },
    ],
    tech: ["Python", "scikit-learn", "pandas", "React.js", "Next.js"],
  },
] as const;

type Experience = (typeof experiences)[number];

const TAB_HEIGHT = 56; // Increased to fit name + year range on two lines.

export default function LifeJourney() {
  // Open on most-recent senior role (CI Financial '25). High school last keeps
  // chronology visible; opening there forces the manager to scroll past it.
  const DEFAULT_TAB = experiences.findIndex((e) => e.id === "ci-2025");
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB === -1 ? 0 : DEFAULT_TAB);

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setActiveTab((prev) => (prev + 1) % experiences.length);
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveTab((prev) => (prev - 1 + experiences.length) % experiences.length);
      }
    },
    []
  );

  const active = experiences[activeTab];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* ── Desktop layout ────────────────────────────────────────── */}
      <div className="hidden sm:flex gap-0">
        {/* Tab sidebar */}
        <div
          className="relative flex-shrink-0 w-40 lg:w-48"
          role="tablist"
          aria-label="Experience tabs"
          onKeyDown={handleKey}
        >
          {/* Track line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

          {/* Sliding indicator */}
          <motion.div
            className="absolute left-0 w-0.5 bg-amber-400 rounded-full z-10"
            style={{ height: TAB_HEIGHT }}
            animate={{ y: activeTab * TAB_HEIGHT }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />

          {experiences.map((exp, i) => {
            const isCurrent = "current" in exp && exp.current;
            return (
              <button
                key={exp.id}
                role="tab"
                id={`tab-${i}`}
                aria-selected={activeTab === i}
                aria-controls={`panel-${i}`}
                tabIndex={activeTab === i ? 0 : -1}
                onClick={() => setActiveTab(i)}
                className={`relative w-full text-left pl-5 pr-3 transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-r-sm ${
                  activeTab === i
                    ? "text-amber-300"
                    : "text-slate-500 hover:text-slate-300"
                }`}
                style={{ height: TAB_HEIGHT }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`block truncate text-xs ${activeTab === i ? "font-semibold" : "font-medium"}`}
                  >
                    {exp.tab}
                  </span>
                  {isCurrent && (
                    <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                  )}
                </div>
                <span className="block text-[10px] text-slate-600 mt-0.5 font-mono tracking-wide">
                  {exp.yearRange}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div className="flex-1 pl-10 lg:pl-14 min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id={`panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <ExperienceContent exp={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile layout ─────────────────────────────────────────── */}
      <div className="sm:hidden">
        {/* Horizontal scrollable tabs */}
        <div
          className="relative flex overflow-x-auto border-b border-white/10 mb-6 scrollbar-none"
          role="tablist"
          aria-label="Experience tabs"
        >
          {experiences.map((exp, i) => {
            const isCurrent = "current" in exp && exp.current;
            return (
              <button
                key={exp.id}
                role="tab"
                id={`tab-m-${i}`}
                aria-selected={activeTab === i}
                aria-controls={`panel-m-${i}`}
                tabIndex={activeTab === i ? 0 : -1}
                onClick={() => setActiveTab(i)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-3 text-xs whitespace-nowrap border-b-2 -mb-px transition-colors duration-200 focus:outline-none ${
                  activeTab === i
                    ? "border-amber-400 text-amber-300 font-medium"
                    : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {exp.tabShort}
                {isCurrent && (
                  <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`m-${active.id}`}
            id={`panel-m-${activeTab}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <ExperienceContent exp={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ExperienceContent({ exp }: { exp: Experience }) {
  const metrics = "metrics" in exp ? exp.metrics : undefined;
  const isCurrent = "current" in exp && exp.current;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 p-1.5 mt-0.5">
          <Image
            src={getLogo(exp.logo)}
            alt={exp.company}
            width={24}
            height={24}
            className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-75"
            unoptimized
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
              {exp.title}
              <span className="text-amber-400 font-normal"> · {exp.company}</span>
            </h3>
            {isCurrent && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/30 text-[10px] font-mono uppercase tracking-[0.12em] text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Active
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
            <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-mono, monospace)" }}>
              {exp.period}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-600">
              <MapPin size={10} />
              {exp.location}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics strip — pulled out of bullet prose so a recruiter scanning gets
         the key numbers at a glance without reading. */}
      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5 p-3 rounded-xl bg-white/[0.025] ring-1 ring-white/5">
          {metrics.map((m) => (
            <div key={m.label} className="px-1">
              <div className="font-display text-lg sm:text-xl font-semibold text-white tabular-nums leading-tight">
                {m.value}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 tracking-wide uppercase font-mono">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bullets */}
      <ul className="space-y-3 mb-5">
        {exp.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
            <span className="text-amber-400 mt-[3px] flex-shrink-0 text-xs">▹</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5">
        {exp.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-xs rounded-md bg-amber-500/10 text-amber-300/80 border border-amber-500/15"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
