"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getLogo } from "@/config/logos";
import Image from "next/image";


const skills = [
  { name: "Python", level: 95, category: "core", x: 50, y: 25 },
  { name: "JavaScript", level: 90, category: "frontend", x: 25, y: 35 },
  { name: "Java", level: 85, category: "core", x: 75, y: 30 },
  { name: "React", level: 90, category: "frontend", x: 20, y: 55 },
  { name: "Django", level: 88, category: "backend", x: 80, y: 45 },
  { name: "TypeScript", level: 85, category: "frontend", x: 35, y: 75 },
  { name: "HTML5", level: 95, category: "frontend", x: 15, y: 20 },
  { name: "CSS", level: 92, category: "frontend", x: 65, y: 65 },
  { name: "Tailwind CSS", level: 92, category: "frontend", x: 45, y: 80 },
  { name: "SQL", level: 88, category: "data", x: 85, y: 25 },
  { name: "PostgreSQL", level: 80, category: "data", x: 15, y: 70 },
  { name: "Snowflake", level: 75, category: "data", x: 70, y: 80 },
  { name: "C++", level: 78, category: "core", x: 25, y: 80 },
  { name: "Docker", level: 78, category: "devops", x: 85, y: 70 },
  { name: "Pandas", level: 88, category: "data", x: 70, y: 15 },
  { name: "Git", level: 95, category: "devops", x: 40, y: 50 },
  { name: "NumPy", level: 85, category: "data", x: 60, y: 35 },
  { name: "SQR", level: 70, category: "data", x: 30, y: 60 },
];

const categories = {
  core: { color: "from-cyan-400 to-blue-500", glow: "rgba(34, 211, 238, 0.4)" },
  frontend: { color: "from-emerald-400 to-teal-500", glow: "rgba(16, 185, 129, 0.4)" },
  backend: { color: "from-purple-400 to-pink-500", glow: "rgba(147, 51, 234, 0.4)" },
  data: { color: "from-orange-400 to-red-500", glow: "rgba(249, 115, 22, 0.4)" },
  devops: { color: "from-yellow-400 to-amber-500", glow: "rgba(245, 158, 11, 0.4)" },
};

export default function SkillConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Draw connection lines between related skills
  const connections = [
    ["Python", "Django"],
    ["Python", "Pandas"],
    ["Python", "NumPy"],
    ["JavaScript", "React"],
    ["JavaScript", "TypeScript"],
    ["React", "TypeScript"],
    ["HTML", "CSS"],
    ["CSS", "Tailwind"],
    ["SQL", "PostgreSQL"],
    ["SQL", "Snowflake"],
    ["Docker", "Git"],
    ["Java", "C++"],
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-8 lg:mb-10">
        <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight">Tech Constellation</h3>
        <p className="text-lg sm:text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed">Each star represents a technology I&apos;ve mastered. Hover to explore connections and discover expertise levels.</p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-8 lg:mb-10">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 sm:px-4 py-2 rounded-full transition-all duration-300 text-sm sm:text-base ${
            selectedCategory === null 
              ? 'bg-white/20 ring-2 ring-white/40' 
              : 'bg-white/5 ring-1 ring-white/10 hover:bg-white/10'
          }`}
        >
          All Skills
        </button>
        {Object.entries(categories).map(([cat, config]) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            className={`px-3 sm:px-4 py-2 rounded-full transition-all duration-300 capitalize text-sm sm:text-base ${
              selectedCategory === cat 
                ? `bg-gradient-to-r ${config.color} text-white shadow-[0_0_20px_${config.glow}]`
                : 'bg-white/5 ring-1 ring-white/10 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div ref={containerRef} className="relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-2xl lg:rounded-3xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 ring-1 ring-white/10 backdrop-blur-sm overflow-hidden touch-manipulation">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map(([skill1, skill2], i) => {
            const s1 = skills.find(s => s.name === skill1);
            const s2 = skills.find(s => s.name === skill2);
            if (!s1 || !s2) return null;

            const isVisible = !selectedCategory || 
              s1.category === selectedCategory || 
              s2.category === selectedCategory ||
              hoveredSkill === s1.name ||
              hoveredSkill === s2.name;

            return (
              <motion.line
                key={`${skill1}-${skill2}`}
                x1={`${s1.x}%`}
                y1={`${s1.y}%`}
                x2={`${s2.x}%`}
                y2={`${s2.y}%`}
                stroke="rgba(34, 211, 238, 0.3)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: isVisible ? 1 : 0, 
                  opacity: isVisible ? 0.6 : 0.1 
                }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            );
          })}
        </svg>

        {/* Skills */}
        {skills.map((skill, i) => {
          const isVisible = !selectedCategory || skill.category === selectedCategory;
          const isHovered = hoveredSkill === skill.name;
          const categoryConfig = categories[skill.category as keyof typeof categories];

          // Simplified collision detection for better performance
          const getOptimalTooltipPosition = () => {
            // Simple position based on quadrant - much faster than full collision detection
            if (skill.y < 30) return { key: 'bottom', class: 'top-full mt-4 left-1/2 -translate-x-1/2' };
            if (skill.y > 70) return { key: 'top', class: 'bottom-full mb-4 left-1/2 -translate-x-1/2' };
            if (skill.x < 50) return { key: 'right', class: 'left-full ml-4 top-1/2 -translate-y-1/2' };
            return { key: 'left', class: 'right-full mr-4 top-1/2 -translate-y-1/2' };
          };

          const optimalPosition = getOptimalTooltipPosition();

          return (
            <motion.div
              key={skill.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isVisible ? 1 : 0.3, 
                opacity: isVisible ? 1 : 0.3 
              }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.1 }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              onTap={() => setHoveredSkill(hoveredSkill === skill.name ? null : skill.name)}
            >
              <div 
                className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${categoryConfig.color} ring-2 ring-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:ring-white/40 p-3`}
                style={{ 
                  boxShadow: isHovered ? `0 0 30px ${categoryConfig.glow}` : undefined 
                }}
              >
                <Image
                  src={getLogo(skill.name)}
                  alt={skill.name}
                  width={32}
                  height={32}
                  className="max-w-full max-h-full object-contain filter brightness-0 invert"
                  unoptimized={true}
                />
                
                {/* Skill level ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="28"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                  />
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="28"
                    fill="none"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="2"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    initial={{ strokeDashoffset: `${2 * Math.PI * 28}` }}
                    animate={{ 
                      strokeDashoffset: `${2 * Math.PI * 28 * (1 - skill.level / 100)}` 
                    }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </svg>
              </div>

              {/* Collision-aware tooltip with optimal positioning */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  scale: isHovered ? 1 : 0.8 
                }}
                className={`absolute pointer-events-none z-30 px-4 py-3 bg-slate-900/98 backdrop-blur-md rounded-xl text-sm whitespace-nowrap ring-1 ring-cyan-400/20 shadow-2xl shadow-cyan-500/20 ${optimalPosition.class}`}
              >
                <div className="font-semibold text-cyan-300">{skill.name}</div>
                <div className="text-xs text-slate-400 mt-1">{skill.level}% proficiency</div>
                {/* Small arrow indicator pointing to the skill */}
                <div className={`absolute w-2 h-2 bg-slate-900 rotate-45 ring-1 ring-cyan-400/20 ${
                  optimalPosition.key.includes('bottom') ? '-top-1 left-1/2 -translate-x-1/2' :
                  optimalPosition.key.includes('top') ? '-bottom-1 left-1/2 -translate-x-1/2' :
                  optimalPosition.key.includes('right') ? '-left-1 top-1/2 -translate-y-1/2' :
                  '-right-1 top-1/2 -translate-y-1/2'
                }`} />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Floating particles for ambiance - reduced for performance */}
        {mounted && Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Fixed height container to prevent layout shifts */}
      <div className="mt-8 h-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredSkill ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          {hoveredSkill && (
            <p className="text-slate-300 max-w-2xl">
              <span className="font-semibold text-cyan-300">{hoveredSkill}</span> — 
              {hoveredSkill === "Python" && " My core language for everything from web backends to ML pipelines"}
              {hoveredSkill === "JavaScript" && " Dynamic scripting language for interactive web experiences"}
              {hoveredSkill === "Java" && " Enterprise-grade object-oriented programming powerhouse"}
              {hoveredSkill === "React" && " Building dynamic, responsive user interfaces"}
              {hoveredSkill === "Django" && " Rapid web development with Python's most popular framework"}
              {hoveredSkill === "TypeScript" && " Type-safe JavaScript for robust applications"}
              {hoveredSkill === "HTML" && " The foundation of web structure and semantic markup"}
              {hoveredSkill === "CSS" && " Styling and layout mastery for beautiful interfaces"}
              {hoveredSkill === "Tailwind" && " Utility-first CSS for rapid, consistent styling"}
              {hoveredSkill === "SQL" && " Database querying and data manipulation expertise"}
              {hoveredSkill === "PostgreSQL" && " Robust relational database for complex applications"}
              {hoveredSkill === "Snowflake" && " Cloud data warehouse platform for analytics"}
              {hoveredSkill === "C++" && " Systems programming and performance optimization"}
              {hoveredSkill === "Docker" && " Containerization for consistent development and deployment"}
              {hoveredSkill === "Pandas" && " Data manipulation and analysis powerhouse"}
              {hoveredSkill === "Git" && " Version control and collaborative development"}
              {hoveredSkill === "NumPy" && " Numerical computing foundation for data science"}
              {hoveredSkill === "SQR" && " Structured Query Reporting for business intelligence"}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
