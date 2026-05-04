"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { getLogo } from "@/config/logos";
import Image from "next/image";

const journeySteps = [
  {
    id: "foundation",
    year: "2023",
    title: "Upper Canada College",
    subtitle: "IB Diploma · Toronto",
    story: "Graduated with an International Baccalaureate Diploma from Upper Canada College. Co-founded the school's first Quantum Computing Club, recruiting 20+ members and running 8 educational sessions on emerging computing paradigms. Competed in Varsity Rugby and JV Football. Co-organized a summit of Mt. Kilimanjaro fundraising $6,440 for The George Hull Centre for Children and Families.",
    visual: "Upper Canada College",
    color: "from-blue-400 to-cyan-500",
    stats: [
      { label: "Achievement", value: "IB Diploma" },
      { label: "Club Founded", value: "Quantum Computing Club · 20+ members" },
      { label: "Fundraised", value: "$6,440 for children's mental health" }
    ]
  },
  {
    id: "university-growth",
    year: "2023 — 2027",
    title: "University of Western Ontario",
    subtitle: "BSc Honours Specialization in Data Science",
    story: "Pursuing a Bachelor of Science with Honours Specialization in Data Science at Western. Core coursework spans machine learning, statistical analysis, algorithm design, and database systems. Completed Business for Science (BUIS 2295F/G) through Ivey Business School's case method — developing financial acumen and decision-making under ambiguity alongside technical depth.",
    visual: "University of Western Ontario",
    color: "from-purple-600 to-purple-400",
    stats: [
      { label: "Program", value: "Honours Data Science" },
      { label: "Business Training", value: "Ivey Case Method (BUIS 2295)" },
      { label: "Expected", value: "2027" }
    ]
  },
  {
    id: "first-impact",
    year: "Summer 2023",
    title: "Software Developer Intern",
    subtitle: "CI Financial · Toronto",
    story: "First professional engineering role at CI Financial, Canada's largest independent wealth manager. Delivered an end-to-end internal web application in 8 weeks — from structured requirements analysis across three stakeholder groups through to production deployment. Contributed to 10+ Agile ceremonies and built financial dashboards integrating real-time data APIs.",
    visual: "CI Financial",
    color: "from-emerald-400 to-teal-500",
    stats: [
      { label: "Delivered", value: "Full web app in 8 weeks" },
      { label: "Stack", value: "Django · Python · PostgreSQL · JavaScript" },
      { label: "Process", value: "10+ Agile ceremonies" }
    ]
  },
  {
    id: "level-up",
    year: "Summer 2024",
    title: "Full-Stack Developer Intern",
    subtitle: "CI Financial · Toronto",
    story: "Returned to CI Financial with expanded scope, leading delivery of a financial advisory platform serving 900+ advisors managing $46B in assets. Integrated 5+ financial data APIs into real-time dashboards, facilitated cross-functional sprint reviews between business and technical teams, and produced stakeholder presentations communicating complex data to non-technical audiences.",
    visual: "CI Financial",
    color: "from-orange-400 to-red-500",
    stats: [
      { label: "Platform Scale", value: "900+ advisors · $46B AUM" },
      { label: "APIs Integrated", value: "5+ financial data sources" },
      { label: "Sprints Delivered", value: "6 Agile sprints on schedule" }
    ]
  },
  {
    id: "arch-2025",
    year: "Summer 2025",
    title: "Architecture at Scale",
    subtitle: "CI Financial — Third Return",
    story: "Returned to CI Financial for a third consecutive summer, this time leading cloud architecture work across a $103B wealth management division. Spearheaded the Snowflake integration replacing a legacy Sybase/SQR stack, mapping As-Is data pipelines to a future-state cloud architecture across 50+ pipelines and validating 2M+ client records at 99.9% accuracy.",
    visual: "CI Financial",
    color: "from-violet-400 to-purple-600",
    stats: [
      { label: "Scale", value: "$103B AUM · 50+ pipelines" },
      { label: "Data Validated", value: "2M+ client records" },
      { label: "Efficiency Gained", value: "10+ hrs saved per sprint" }
    ]
  },
  {
    id: "conq",
    year: "2025 — Present",
    title: "Co-Founding CONQ",
    subtitle: "AI-Powered Concussion Recovery",
    story: "Co-founded CONQ, a health-tech startup building AI-powered smart glasses for concussion recovery monitoring in contact sports. As ML/AI Technical Lead, I built a multi-modal machine learning pipeline processing 5 concurrent biometric sensor streams — accelerometer, gyroscope, ECG, SpO2, and skin temperature — for real-time recovery classification. Competed in the UWO Presidents Challenge 2026 and targeting the OHL at $12K–$20K per team-season.",
    visual: "CONQ",
    color: "from-cyan-400 to-blue-600",
    stats: [
      { label: "Market", value: "$6.58B global concussion market" },
      { label: "Sensors", value: "5 biometric streams · real-time ML" },
      { label: "Target", value: "OHL · $12K–$20K per team-season" }
    ]
  }
];

export default function LifeJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative">
      {/* Main timeline line running through the center */}
      <div className="absolute left-1/2 top-0 w-px h-full transform -translate-x-1/2 z-0">
        <motion.div
          className="w-full bg-gradient-to-b from-transparent via-white/15 to-transparent rounded-full"
          style={{ height: '100%' }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>



      {/* Journey steps */}
      <div className="space-y-16 sm:space-y-24 lg:space-y-32 py-10 sm:py-16 lg:py-20">
        {journeySteps.map((step, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'} px-4 sm:px-8 lg:px-16`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 ring-4 ring-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)] z-10" />

              {/* Content card */}
              <div className={`max-w-lg w-full ${isLeft ? 'mr-auto pr-8 lg:pr-16' : 'ml-auto pl-8 lg:pl-16'}`}>
                <motion.div
                  className={`relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/20 backdrop-blur-xl p-8 shadow-2xl`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Year badge */}
                  <div className="absolute -top-4 left-8">
                    <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${step.color} text-white text-sm font-semibold shadow-lg`}>
                      {step.year}
                    </div>
                  </div>

                  {/* Visual logo */}
                  <div className="absolute top-4 right-8 w-20 h-20 flex items-center justify-center">
                    <div className="relative w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2">
                      <Image
                        src={getLogo(step.visual)}
                        alt={step.visual}
                        width={48}
                        height={48}
                        className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-80"
                        unoptimized={true}
                      />
                    </div>
                  </div>

                  {/* Content: padding-right clears the top-right logo so title/subtitle don’t sit under it */}
                  <div className="relative z-10 pr-28 sm:pr-32">
                    <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      {step.title}
                    </h3>
                    <p className="text-blue-300/90 text-base sm:text-lg mb-4">{step.subtitle}</p>
                    <p className="text-slate-300/90 leading-relaxed mb-6">{step.story}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-3">
                      {step.stats.map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex justify-between items-center p-3 rounded-xl bg-white/5 ring-1 ring-white/10"
                        >
                          <span className="text-slate-400 text-sm">{stat.label}</span>
                          <span className="font-semibold text-blue-300 text-sm">{stat.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Connecting line to timeline */}
                  <div className={`absolute top-1/2 ${isLeft ? '-right-8 lg:-right-16' : '-left-8 lg:-left-16'} w-8 lg:w-16 h-px bg-gradient-to-r ${isLeft ? 'from-white/20 to-transparent' : 'from-transparent to-white/20'}`} />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Final message */}
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="font-display text-4xl font-semibold bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent mb-4">
          Ready for What&apos;s Next
        </h3>
        <p className="text-xl text-slate-300/90 max-w-2xl mx-auto">
          This journey is just the beginning. Ready to build the future together?
        </p>
      </motion.div>
    </div>
  );
}
