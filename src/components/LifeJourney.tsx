"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLogo } from "@/config/logos";
import Image from "next/image";
import { MapPin } from "lucide-react";

const experiences = [
  {
    id: "ucc",
    tab: "Upper Canada College",
    tabShort: "UCC",
    company: "Upper Canada College",
    logo: "Upper Canada College",
    title: "IB Diploma",
    period: "Sept 2019 — Jun 2023",
    location: "Toronto, ON",
    bullets: [
      "Co-founded the school's first Quantum Computing Club — recruited 20+ members and facilitated 8 educational sessions on emerging computing paradigms",
      "Co-organized a Mt. Kilimanjaro expedition fundraising $6,440 for The George Hull Centre for Children and Families",
      "Competed in Varsity Rugby and JV Football; graduated with International Baccalaureate Diploma",
    ],
    tech: ["IB Diploma", "Leadership", "Quantum Computing", "Athletics"],
  },
  {
    id: "western",
    tab: "Western University",
    tabShort: "Western",
    company: "University of Western Ontario",
    logo: "University of Western Ontario",
    title: "BSc Honours Data Science",
    period: "Sept 2023 — Apr 2027",
    location: "London, ON",
    bullets: [
      "Honours Specialization in Data Science — core coursework spanning machine learning, statistical analysis, algorithm design, and database systems",
      "Business for Science (BUIS 2295F/G) through Ivey Business School's case method — financial management and decision-making under ambiguity alongside technical depth",
    ],
    tech: ["Machine Learning", "Statistical Analysis", "Python", "SQL", "Ivey Case Method"],
  },
  {
    id: "ci-2023",
    tab: "CI Financial '23",
    tabShort: "CI '23",
    company: "CI Financial",
    logo: "CI Financial",
    title: "Software Developer Intern",
    period: "Jun 2023 — Aug 2023",
    location: "Toronto, ON",
    bullets: [
      "Delivered an end-to-end internal web application in 8 weeks — from structured requirements analysis across 3 stakeholder groups through to production deployment",
      "Built financial dashboards integrating real-time data APIs; contributed to 10+ Agile ceremonies ensuring on-time delivery",
    ],
    tech: ["Django", "Python", "PostgreSQL", "JavaScript", "HTML5"],
  },
  {
    id: "ci-2024",
    tab: "CI Financial '24",
    tabShort: "CI '24",
    company: "CI Financial",
    logo: "CI Financial",
    title: "Full-Stack Developer Intern",
    period: "May 2024 — Aug 2024",
    location: "Toronto, ON",
    bullets: [
      "Built financial advisory platform serving 900+ advisors managing $46B in assets — integrated 5+ financial APIs into real-time dashboards across 6 Agile sprints",
      "Facilitated cross-functional sprint reviews between business and technical teams; produced audience-tailored presentations for non-technical stakeholders",
    ],
    tech: ["Django", "React.js", "Python", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "ci-2025",
    tab: "CI Financial '25",
    tabShort: "CI '25",
    company: "CI Financial",
    logo: "CI Financial",
    title: "Application Architecture Intern",
    period: "May 2025 — Aug 2025",
    location: "Toronto, ON",
    bullets: [
      "Led Snowflake cloud platform integration across $103B wealth management division — mapped 50+ Sybase/SQR pipelines to future-state cloud architecture",
      "Validated 2M+ client records across 4 transformation stages at 99.9% accuracy; automated Jira workflows eliminating 10+ hrs of manual overhead per sprint",
    ],
    tech: ["Python", "Snowflake", "SQL", "Bash", "Jira"],
  },
  {
    id: "conq",
    tab: "CONQ",
    tabShort: "CONQ",
    company: "CONQ",
    logo: "CONQ",
    title: "Co-Founder & ML/AI Lead",
    period: "2025 — Present",
    location: "London, ON",
    bullets: [
      "Co-founded health-tech startup building AI-powered smart glasses for concussion recovery monitoring in contact sports — currently in active development",
      "Built multi-modal ML pipeline processing 5 concurrent biometric sensor streams (accelerometer, gyroscope, ECG, SpO₂, skin temperature) for real-time recovery classification",
      "Competed in UWO Presidents Challenge 2026; go-to-market strategy targets OHL teams at $12K–$20K per team-season within the $6.58B global concussion market",
    ],
    tech: ["Python", "scikit-learn", "pandas", "React.js", "Next.js"],
  },
] as const;

type Experience = (typeof experiences)[number];

const TAB_HEIGHT = 44;

export default function LifeJourney() {
  const [activeTab, setActiveTab] = useState(0);

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
            className="absolute left-0 w-0.5 bg-blue-400 rounded-full z-10"
            style={{ height: TAB_HEIGHT }}
            animate={{ y: activeTab * TAB_HEIGHT }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />

          {experiences.map((exp, i) => (
            <button
              key={exp.id}
              role="tab"
              id={`tab-${i}`}
              aria-selected={activeTab === i}
              aria-controls={`panel-${i}`}
              tabIndex={activeTab === i ? 0 : -1}
              onClick={() => setActiveTab(i)}
              className={`relative w-full text-left pl-5 pr-3 text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 rounded-r-sm ${
                activeTab === i
                  ? "text-blue-300 font-medium"
                  : "text-slate-500 hover:text-slate-300"
              }`}
              style={{ height: TAB_HEIGHT, fontFamily: "var(--font-mono, monospace)" }}
            >
              <span className="block truncate text-xs">{exp.tab}</span>
            </button>
          ))}
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
          {experiences.map((exp, i) => (
            <button
              key={exp.id}
              role="tab"
              id={`tab-m-${i}`}
              aria-selected={activeTab === i}
              aria-controls={`panel-m-${i}`}
              tabIndex={activeTab === i ? 0 : -1}
              onClick={() => setActiveTab(i)}
              className={`flex-shrink-0 px-4 py-3 text-xs whitespace-nowrap border-b-2 -mb-px transition-colors duration-200 focus:outline-none ${
                activeTab === i
                  ? "border-blue-400 text-blue-300 font-medium"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              {exp.tabShort}
            </button>
          ))}
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
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
            {exp.title}
            <span className="text-blue-400 font-normal"> · {exp.company}</span>
          </h3>
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

      {/* Bullets */}
      <ul className="space-y-3 mb-5">
        {exp.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
            <span className="text-blue-400 mt-[3px] flex-shrink-0 text-xs">▹</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5">
        {exp.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-xs rounded-md bg-blue-500/10 text-blue-300/80 border border-blue-500/15"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
