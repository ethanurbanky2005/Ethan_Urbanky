"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { getLogo } from "@/config/logos";
import Image from "next/image";

const journeySteps = [
  {
    id: "foundation",
    year: "2023",
    title: "The Foundation",
    subtitle: "Upper Canada College",
    story: "Built my academic foundation at Upper Canada College, graduating with an IB Diploma. Co-founded the Quantum Computing Club because emerging technology fascinated me. Rugby taught me teamwork and perseverance—skills that translate directly to collaborative development and pushing through complex coding challenges.",
    visual: "Upper Canada College",
    color: "from-blue-400 to-cyan-500",
    stats: [
      { label: "Academic Achievement", value: "IB Diploma" },
      { label: "Athletic Commitment", value: "Varsity Rugby" },
      { label: "Leadership Initiative", value: "Club Co-Founder" }
    ]
  },
  {
    id: "university-growth",
    year: "2023-2027",
    title: "Academic Evolution",
    subtitle: "University of Western Ontario",
    story: "Pursuing a Bachelor of Science with Honors Specialization in Data Science at Western. Diving deep into data analysis with Python, Pandas, and NumPy. Mastering object-oriented programming in Java, advanced data structures, and algorithm analysis. Building the analytical foundation that bridges mathematics, statistics, and real-world problem solving.",
    visual: "University of Western Ontario",
    color: "from-purple-600 to-purple-400",
    stats: [
      { label: "Institution", value: "University of Western Ontario" },
      { label: "Program", value: "Data Science (Honors)" },
      { label: "Graduation", value: "2027" }
    ]
  },
  {
    id: "first-impact",
    year: "Summer 2023",
    title: "First Real Impact",
    subtitle: "CI Financial",
    story: "My first internship at CI Financial. Designed and developed the initial version of their internal web application using Django, HTML, CSS, and JavaScript. Built back-end logic for financial data retrieval, optimized database queries, and created interactive dashboards. Participated in agile development processes with daily stand-ups and sprint planning.",
    visual: "CI Financial",
    color: "from-emerald-400 to-teal-500",
    stats: [
      { label: "Tech Stack", value: "Django + HTML/CSS + JavaScript" },
      { label: "Project Impact", value: "Internal web app foundation" },
      { label: "Development Process", value: "Agile methodology" }
    ]
  },
  {
    id: "level-up",
    year: "Summer 2024",
    title: "Leadership & Growth",
    subtitle: "CI Financial Return",
    story: "They brought me back with significantly more responsibility. Developed fully responsive front-end with Tailwind CSS, integrated data pipelines from internal APIs, and optimized Django ORM for data-heavy endpoints. Led agile sprints, daily stand-ups, and cross-functional meetings. Streamlined DevOps practices and automated deployments.",
    visual: "CI Financial",
    color: "from-orange-400 to-red-500",
    stats: [
      { label: "Leadership Role", value: "Led agile sprints & meetings" },
      { label: "Technical Stack", value: "Django + Tailwind + APIs" },
      { label: "DevOps Impact", value: "Automated deployments" }
    ]
  },
  {
    id: "entrepreneur",
    year: "2024-Present",
    title: "Building the Future",
    subtitle: "UPick & FinanceTrack",
    story: "Founding and developing multiple applications including UPick (college football ML platform) and FinanceTrack (comprehensive financial management app). Managing full product lifecycles from concept to deployment, implementing advanced features like ML models, real-time analytics, secure authentication, and interactive dashboards using modern tech stacks.",
    visual: "UPick",
    color: "from-cyan-400 to-blue-600",
    stats: [
      { label: "Projects", value: "UPick + FinanceTrack" },
      { label: "Tech Stack", value: "Next.js + Python + ML + Supabase" },
      { label: "Features", value: "ML Models + Financial Analytics" }
    ]
  }
];

export default function LifeJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Main timeline line running through the center */}
      <div className="absolute left-1/2 top-0 w-1 h-full transform -translate-x-1/2 z-0">
        <motion.div 
          className="w-full bg-gradient-to-b from-transparent via-cyan-400/60 via-cyan-400/60 to-transparent rounded-full"
          style={{ height: '100%' }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
        
        {/* Animated pulse traveling along the line */}
        <motion.div
          className="absolute top-0 left-1/2 w-2 h-8 bg-gradient-to-b from-cyan-300 to-blue-500 rounded-full transform -translate-x-1/2 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
          animate={{ 
            y: [0, 600, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Progress indicator */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <div className="relative h-80 w-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
            }}
          />
        </div>
        <div className="absolute -left-2 top-0 w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
      </div>

      {/* Journey steps */}
      <div className="space-y-32 py-20">
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

                  {/* Visual logo with themed background */}
                  <div className="mb-6 absolute top-4 right-8 w-24 h-24 flex items-center justify-center">
                    {/* Animated background orb */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-10 blur-sm`}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1] 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    
                    {/* Secondary glow effect */}
                    <motion.div
                      className={`absolute inset-2 rounded-full bg-gradient-to-br ${step.color} opacity-5`}
                      animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.05, 0.15, 0.05] 
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: 1 
                      }}
                    />
                    
                    {/* Logo container with subtle background */}
                    <div className={`relative w-20 h-20 rounded-xl bg-gradient-to-br ${step.color} bg-opacity-5 border border-white/10 backdrop-blur-sm flex items-center justify-center p-2 shadow-lg`}>
                      {step.visual === "UPick" ? (
                        // Custom text for UPick instead of logo
                        <div className="text-white font-bold text-sm leading-tight text-center opacity-90">
                          UPick
                        </div>
                      ) : (
                        <Image
                          src={getLogo(step.visual)}
                          alt={step.visual}
                          width={56}
                          height={56}
                          className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-90"
                          unoptimized={true}
                        />
                      )}
                      
                      {/* Subtle inner glow */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.color} opacity-10 mix-blend-soft-light`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className={`text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      {step.title}
                    </h3>
                    <p className="text-cyan-300/90 text-lg mb-4">{step.subtitle}</p>
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
                          <span className="font-semibold text-cyan-300 text-sm">{stat.value}</span>
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
        <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
          Ready for What&apos;s Next
        </h3>
        <p className="text-xl text-slate-300/90 max-w-2xl mx-auto">
          This journey is just the beginning. Ready to build the future together?
        </p>
      </motion.div>
    </div>
  );
}
