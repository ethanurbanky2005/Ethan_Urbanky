"use client";
import { motion } from "framer-motion";
import { getLogo } from "@/config/logos";
import Image from "next/image";

const skillGroups = [
  {
    label: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "C++"],
  },
  {
    label: "Frontend",
    skills: ["React", "Next.js", "HTML5", "Tailwind CSS", "CSS"],
  },
  {
    label: "Data & ML",
    skills: ["Pandas", "NumPy", "scikit-learn", "Snowflake", "PostgreSQL", "Matplotlib"],
  },
  {
    label: "Backend & Tools",
    skills: ["Django", "Flask", "Docker", "Git", "SAP S/4HANA"],
  },
] as const;

export default function SkillConstellation() {
  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 w-full">
      {/* Heading */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-4"
        >
          Skills
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto"
        >
          Applied across 3 internships at CI Financial, a co-founded startup, and Western coursework.
        </motion.p>
      </div>

      {/* Skill groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: gi * 0.08 }}
          >
            {/* Category label */}
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 mb-4 pb-2 border-b border-white/[0.06]">
              {group.label}
            </h3>

            {/* Icon grid */}
            <div className="grid grid-cols-3 gap-2">
              {group.skills.map((skill, si) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: gi * 0.08 + si * 0.03 }}
                  whileHover={{ y: -2 }}
                  className="flex flex-col items-center gap-2 py-4 px-2 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/15 transition-colors duration-200 group cursor-default"
                >
                  <div className="w-7 h-7 flex items-center justify-center">
                    <Image
                      src={getLogo(skill)}
                      alt={skill}
                      width={26}
                      height={26}
                      className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-50 group-hover:opacity-80 transition-opacity duration-200"
                      unoptimized
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 group-hover:text-slate-300 transition-colors text-center leading-tight">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certifications strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-10 pt-8 border-t border-white/[0.06]"
      >
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 mb-4">
          Certifications
        </h3>
        <div className="flex flex-wrap gap-3">
          {/* Completed */}
          <a
            href="https://badger.learning.sap.com/verify/xymor-pytig-lavyg-samuc-mibas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07] max-w-sm hover:bg-white/[0.06] hover:border-white/15 transition-colors duration-200 cursor-pointer"
          >
            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
              <Image src={getLogo("SAP S/4HANA")} alt="SAP" width={24} height={24}
                className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-50" unoptimized />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-300 font-medium leading-tight">Exploring SAP Business Technology Platform</p>
              <p className="text-[11px] text-slate-500 mt-0.5">SAP Learning · May 4, 2026 <span className="text-violet-400/70 ml-1">· Verify ↗</span></p>
            </div>
          </a>

          {/* In Progress */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] max-w-sm opacity-70">
            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
              <Image src={getLogo("SAP S/4HANA")} alt="SAP" width={24} height={24}
                className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-40" unoptimized />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs text-slate-400 font-medium leading-tight">Discovering SAP Activate: Implementation Methodology</p>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                SAP Learning
                <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-amber-500/15 text-amber-400/80 border border-amber-500/20 font-medium">In Progress</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
