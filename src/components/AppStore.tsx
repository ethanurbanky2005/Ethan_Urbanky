"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ExternalLink, Github, Play, X } from "lucide-react";
import { portfolio } from "@/config/portfolio";
import { getLogo } from "@/config/logos";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  tech: string[];
  icon: string;
  github?: string;
  demo?: string;
}

export default function AppStore() {
  const [selectedApp, setSelectedApp] = useState<Project | null>(null);

  const projects = portfolio.projects as Project[];

  return (
    <LayoutGroup>
    <div className="w-full">
      {/* App Store Header - Matching Journey section */}
      <div className="text-center mb-12">
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
          Products built from concept to deployment.
        </motion.p>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <AppTile
            key={project.id}
            project={project}
            index={index}
            onOpen={() => setSelectedApp(project)}
          />
        ))}
      </div>

      {/* App Modal */}
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

interface AppTileProps {
  project: Project;
  index: number;
  onOpen: () => void;
}

function AppTile({ project, index, onOpen }: AppTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative cursor-pointer"
      data-cursor-hover
      onClick={onOpen}
    >
      <div className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 transition-all duration-300 hover:bg-white/8 hover:border-blue-400/20 hover:shadow-[0_0_24px_rgba(59,130,246,0.08),0_20px_40px_rgba(0,0,0,0.3)] active:scale-[0.99] touch-manipulation">

        {/* Header row: icon + title */}
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            layoutId={`project-icon-${project.id}`}
            className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-white/10 flex items-center justify-center flex-shrink-0 p-2"
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
          <div className="min-w-0">
            <motion.h3
              layoutId={`project-title-${project.id}`}
              className="text-white font-semibold text-base group-hover:text-blue-300 transition-colors leading-tight"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {project.title}
            </motion.h3>
            <p className="text-slate-400 text-xs mt-0.5">{project.role}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-md bg-white/8 text-slate-400 border border-white/8"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-white/8 text-slate-500 border border-white/8">
              +{project.tech.length - 4} more
            </span>
          )}
        </div>

        {/* Hover arrow */}
        <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ExternalLink size={14} className="text-blue-400" />
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
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-white/20 flex items-center justify-center flex-shrink-0 p-3"
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
              <p className="text-blue-400 mb-3">{project.role}</p>
              <p className="text-slate-300 leading-relaxed">{project.description}</p>
            </div>
          </div>
        </div>

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
        <div className="flex gap-4">
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-12 rounded-xl bg-blue-600/80 hover:bg-blue-600 active:bg-blue-700 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-cyan-400/30 touch-manipulation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play size={18} />
              <span>Run App</span>
            </motion.a>
          )}
          
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-12 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-white/20 touch-manipulation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github size={18} />
              <span>Source Code</span>
            </motion.a>
          )}
          
          <motion.a
            href={project.github || project.demo || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-6 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-medium transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/20 touch-manipulation"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink size={18} />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}
