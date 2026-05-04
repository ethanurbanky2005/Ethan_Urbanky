"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLogo } from "@/config/logos";
import Image from "next/image";

const skills = [
  { name: "Python", level: 95, category: "core" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "Java", level: 85, category: "core" },
  { name: "React", level: 90, category: "frontend" },
  { name: "Django", level: 88, category: "backend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "HTML5", level: 95, category: "frontend" },
  { name: "CSS", level: 92, category: "frontend" },
  { name: "Tailwind CSS", level: 92, category: "frontend" },
  { name: "SQL", level: 88, category: "data" },
  { name: "PostgreSQL", level: 80, category: "data" },
  { name: "Snowflake", level: 78, category: "data" },
  { name: "C++", level: 78, category: "core" },
  { name: "Docker", level: 78, category: "devops" },
  { name: "Pandas", level: 88, category: "data" },
  { name: "Git", level: 95, category: "devops" },
  { name: "NumPy", level: 85, category: "data" },
  { name: "SQR", level: 70, category: "data" },
  { name: "scikit-learn", level: 80, category: "data" },
  { name: "SAP S/4HANA", level: 65, category: "backend" },
];

const categoryConfig: Record<string, { label: string; color: string }> = {
  core:     { label: "Languages",   color: "bg-blue-500" },
  frontend: { label: "Frontend",    color: "bg-indigo-500" },
  backend:  { label: "Backend",     color: "bg-violet-500" },
  data:     { label: "Data & ML",   color: "bg-sky-500" },
  devops:   { label: "DevOps",      color: "bg-slate-400" },
};

const skillDescriptions: Record<string, string> = {
  "Python": "Core language across all 3 CI Financial internships — ETL pipelines, data validation at 99.9% accuracy, and Jira sprint automation",
  "JavaScript": "Used at CI Financial to build real-time financial dashboards integrating 5+ live data APIs for 900+ advisors",
  "Java": "University algorithms and data structures coursework; foundational for understanding enterprise system design patterns",
  "React": "Built the 900+ advisor financial advisory platform at CI Financial (2024); also powers the CONQ marketing site",
  "Django": "Delivered two full production web apps at CI Financial — 2023 (8 weeks) and 2024 (6 Agile sprints)",
  "TypeScript": "Type-safe frontend across Next.js projects — FinanceTrack, this portfolio, and CONQ's web presence",
  "HTML5": "Semantic markup across all CI Financial web projects and personal builds; accessibility-conscious structure",
  "CSS": "Custom styling for CI Financial dashboards alongside component libraries; animation and responsive layout work",
  "Tailwind CSS": "Utility-first styling used across CONQ, FinanceTrack, and this portfolio — rapid iteration without design drift",
  "SQL": "Production queries across Sybase, PostgreSQL, and Snowflake at CI Financial — financial record joins, validation, and pipeline logic",
  "PostgreSQL": "Database for the 2023 CI Financial internal app; structured financial records and multi-stakeholder data requirements",
  "Snowflake": "Led the $103B AUM Snowflake migration at CI Financial (2025) — 50+ pipelines mapped, 2M+ client records validated",
  "C++": "University systems programming; low-level memory management and performance thinking that shapes how I reason about production systems",
  "Docker": "Containerized CI Financial project environments for consistent dev-to-prod parity across team deployments",
  "Pandas": "Data processing backbone of CONQ's multi-modal ML pipeline — handling 5 concurrent biometric sensor streams in real time",
  "Git": "Version control across all 3 CI Financial internships and every personal project; branching strategy in 6-sprint Agile cycles",
  "NumPy": "Numerical core for CONQ's recovery classification model and UPick's feature engineering against live odds data",
  "SQR": "Read and mapped 50+ legacy SQR batch pipelines to future-state Snowflake architecture at CI Financial (2025)",
  "scikit-learn": "ML model development for CONQ's biometric recovery classifier and UPick's probability-calibrated parlay predictions",
  "SAP S/4HANA": "ERP fundamentals trained via SAP Learning; applied cloud implementation methodology in SAP BTP certification coursework",
};

export default function SkillConstellation() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const categories = Object.keys(categoryConfig);

  const visibleSkills = selectedCategory
    ? skills.filter(s => s.category === selectedCategory)
    : skills;

  // Group visible skills by category for display
  const grouped = categories.reduce((acc, cat) => {
    const catSkills = visibleSkills.filter(s => s.category === cat);
    if (catSkills.length > 0) acc[cat] = catSkills;
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
      {/* Heading */}
      <div className="text-center mb-8 lg:mb-10">
        <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-4 text-white">
          Skills
        </h2>
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
          Applied across 3 internships, 2 startups, and independent projects.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => { setSelectedCategory(null); setSelectedSkill(null); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            !selectedCategory
              ? "bg-blue-600 text-white"
              : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 border border-white/10"
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(selectedCategory === cat ? null : cat);
              setSelectedSkill(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 border border-white/10"
            }`}
          >
            {categoryConfig[cat].label}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(grouped).map(([cat, catSkills]) => (
          <motion.div
            key={cat}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-5"
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
              {categoryConfig[cat].label}
            </h3>
            <div className="space-y-3">
              {catSkills.map((skill, i) => (
                <motion.button
                  key={skill.name}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
                  className={`w-full flex items-center gap-3 text-left group transition-colors duration-150 rounded-lg px-2 py-1.5 -mx-2 ${
                    selectedSkill === skill.name ? "bg-white/5" : "hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 p-1.5">
                    <Image
                      src={getLogo(skill.name)}
                      alt={skill.name}
                      width={20}
                      height={20}
                      className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70"
                      unoptimized={true}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium transition-colors ${
                        selectedSkill === skill.name ? "text-white" : "text-slate-300 group-hover:text-white"
                      }`}>
                        {skill.name}
                      </span>
                      <span className="text-xs text-slate-600 ml-2">{skill.level}%</span>
                    </div>
                    <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${categoryConfig[cat].color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.7, delay: i * 0.04, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected skill description */}
      <div className="mt-6 min-h-[3.5rem] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {selectedSkill && skillDescriptions[selectedSkill] && (
            <motion.p
              key={selectedSkill}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-slate-400 max-w-2xl text-center leading-relaxed"
            >
              <span className="font-medium text-blue-400">{selectedSkill}</span>
              {" — "}
              {skillDescriptions[selectedSkill]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
