"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ExternalLink, Github, Play } from "lucide-react";
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
  const [downloadingApps, setDownloadingApps] = useState<Set<string>>(new Set());

  const handleDownload = (project: Project) => {
    setDownloadingApps(prev => new Set(prev).add(project.id));
    
    // Simulate download animation
    setTimeout(() => {
      setDownloadingApps(prev => {
        const newSet = new Set(prev);
        newSet.delete(project.id);
        return newSet;
      });
      setSelectedApp(project);
    }, 2000);
  };

  const projects = portfolio.projects as Project[];

  return (
    <div className="w-full">
      {/* App Store Header - Matching Journey section */}
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-transparent bg-gradient-to-br from-white via-cyan-100 to-cyan-300 bg-clip-text mb-8"
        >
          Project <span className="text-cyan-400">Store</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-300/90 max-w-4xl mx-auto leading-relaxed mb-12"
        >
          Download and explore my latest applications—each project crafted with passion, 
          innovation, and attention to detail.
        </motion.p>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <AppTile
            key={project.id}
            project={project}
            index={index}
            isDownloading={downloadingApps.has(project.id)}
            onDownload={() => handleDownload(project)}
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
  );
}

interface AppTileProps {
  project: Project;
  index: number;
  isDownloading: boolean;
  onDownload: () => void;
}

function AppTile({ project, index, isDownloading, onDownload }: AppTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      {/* App Icon Container */}
      <div className="relative aspect-square rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
        
        {/* App Icon */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Icon Background */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 p-2">
            <Image
              src={getLogo(project.icon)}
              alt={project.title}
              width={80}
              height={80}
              className="max-w-full max-h-full object-contain filter brightness-0 invert"
              unoptimized={true}
            />
          </div>
          
          {/* App Info */}
          <div className="text-center">
            <h3 className="text-white font-medium text-lg mb-1 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm mb-3">
              {project.role}
            </p>
            
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap justify-center gap-1 mb-4">
              {project.tech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-full bg-white/10 text-slate-300 border border-white/10"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-slate-300 border border-white/10">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Download Button */}
        <motion.button
          onClick={onDownload}
          disabled={isDownloading}
          className="absolute bottom-4 left-4 right-4 h-10 rounded-xl bg-cyan-500/80 hover:bg-cyan-500 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-cyan-400/30 disabled:opacity-50"
          whileHover={{ scale: isDownloading ? 1 : 1.02 }}
          whileTap={{ scale: isDownloading ? 1 : 0.98 }}
        >
          {isDownloading ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Installing...</span>
            </>
          ) : (
            <>
              <Download size={16} />
              <span>GET</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

interface AppModalProps {
  project: Project;
  onClose: () => void;
}

function AppModal({ project, onClose }: AppModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-2xl bg-white/10 border border-white/20 rounded-3xl backdrop-blur-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-6 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-white/20 flex items-center justify-center flex-shrink-0 p-3">
            <Image
              src={getLogo(project.icon)}
              alt={project.title}
              width={80}
              height={80}
              className="max-w-full max-h-full object-contain filter brightness-0 invert"
              unoptimized={true}
            />
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-light text-white mb-2">{project.title}</h2>
            <p className="text-cyan-400 mb-3">{project.role}</p>
            <p className="text-slate-300 leading-relaxed">{project.description}</p>
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
              className="flex-1 h-12 rounded-xl bg-cyan-500/80 hover:bg-cyan-500 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-cyan-400/30"
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
              className="flex-1 h-12 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-white/20"
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
            className="h-12 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/20"
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
