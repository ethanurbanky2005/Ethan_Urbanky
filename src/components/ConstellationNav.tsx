"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, LayoutGrid, UserCircle, Mail, Cpu } from "lucide-react";

const CONSTELLATION_PATH: string[] = ['hero', 'projects', 'about', 'contact', 'skills'];

const ACCENT = 'rgba(34, 211, 238, 0.5)'; // single accent, no rainbow

interface NavNode {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string; size?: number }>;
  x: number;
  y: number;
}

const nodes: NavNode[] = [
  { id: 'hero', label: 'Hero', Icon: Home, x: 20, y: 30 },
  { id: 'projects', label: 'Projects', Icon: LayoutGrid, x: 50, y: 20 },
  { id: 'about', label: 'About', Icon: UserCircle, x: 80, y: 35 },
  { id: 'skills', label: 'Skills', Icon: Cpu, x: 30, y: 75 },
  { id: 'contact', label: 'Contact', Icon: Mail, x: 70, y: 65 },
];

export default function ConstellationNav() {
  const [open, setOpen] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const starRefs = useRef<{ [key: string]: HTMLButtonElement }>({});

  // Draw constellation lines based on actual DOM positions
  const drawConstellation = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw lines between consecutive nodes (single accent)
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';

    // Instead of using DOM positions, use the same percentage calculation as the stars
    for (let i = 0; i < CONSTELLATION_PATH.length - 1; i++) {
      const currentStarId = CONSTELLATION_PATH[i];
      const nextStarId = CONSTELLATION_PATH[i + 1];
      
      // Get actual DOM positions instead of calculated ones
      const currentStarEl = starRefs.current[currentStarId];
      const nextStarEl = starRefs.current[nextStarId];
      
      if (currentStarEl && nextStarEl) {
        const currentRect = currentStarEl.getBoundingClientRect();
        const nextRect = nextStarEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Use actual DOM center positions relative to container
        const x1 = currentRect.left + currentRect.width / 2 - containerRect.left;
        const y1 = currentRect.top + currentRect.height / 2 - containerRect.top;
        const x2 = nextRect.left + nextRect.width / 2 - containerRect.left;
        const y2 = nextRect.top + nextRect.height / 2 - containerRect.top;
        
        // Calculate line direction and shorten it to stop at node edges
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const nodeRadius = 24; // Half of node size (48px)
        
        // Normalize direction vector
        const unitX = dx / distance;
        const unitY = dy / distance;
        
        // Adjust start and end points to stop at node edges
        const startX = x1 + unitX * nodeRadius;
        const startY = y1 + unitY * nodeRadius;
        const endX = x2 - unitX * nodeRadius;
        const endY = y2 - unitY * nodeRadius;

        // Draw the constellation line
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    }

  }, []);

  // Highlight path from hovered node to next
  const drawParticleTrace = useCallback(() => {
    if (!hoveredStar) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentIndex = CONSTELLATION_PATH.indexOf(hoveredStar);
    if (currentIndex === -1 || currentIndex === CONSTELLATION_PATH.length - 1) return;

    const nextStarId = CONSTELLATION_PATH[currentIndex + 1];
    
    // Get actual DOM positions instead of calculated ones
    const currentStarEl = starRefs.current[hoveredStar];
    const nextStarEl = starRefs.current[nextStarId];
    
    if (currentStarEl && nextStarEl) {
      const currentRect = currentStarEl.getBoundingClientRect();
      const nextRect = nextStarEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Use actual DOM center positions relative to container
      const x1 = currentRect.left + currentRect.width / 2 - containerRect.left;
      const y1 = currentRect.top + currentRect.height / 2 - containerRect.top;
      const x2 = nextRect.left + nextRect.width / 2 - containerRect.left;
      const y2 = nextRect.top + nextRect.height / 2 - containerRect.top;
      
      // Calculate line direction and shorten it to stop at node edges
      const dx = x2 - x1;
      const dy = y2 - y1;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const nodeRadius = 24; // Half of node size (48px)
      
      // Normalize direction vector
      const unitX = dx / distance;
      const unitY = dy / distance;
      
      // Adjust start and end points to stop at node edges
      const startX = x1 + unitX * nodeRadius;
      const startY = y1 + unitY * nodeRadius;
      const endX = x2 - unitX * nodeRadius;
      const endY = y2 - unitY * nodeRadius;
      
      // Highlight the path on hover (same accent, slightly stronger)
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  }, [hoveredStar]);

  // Animation loop for particle trace
  useEffect(() => {
    if (!open || !hoveredStar) return;
    
    let animationId: number;
    
    const animate = () => {
      drawConstellation();
      drawParticleTrace();
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [open, hoveredStar, drawConstellation, drawParticleTrace]);

  // Initial constellation draw
  useEffect(() => {
    if (!open) return;
    
    const timer = setTimeout(() => {
      drawConstellation();
    }, 300); // Wait for nodes to animate in
    
    const handleResize = () => {
      setTimeout(drawConstellation, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [open, drawConstellation]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'g') setOpen((v) => !v);
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('constellation-open', open);
    return () => { document.body.classList.remove('constellation-open'); };
  }, [open]);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[180] bg-black/60 backdrop-blur-lg"
          role="dialog"
          aria-modal="true"
          aria-label="Jump to section"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(95vw,900px)] h-[min(85dvh,600px)] max-h-[calc(100dvh-2rem)] mx-4 sm:mx-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-panel absolute inset-0 rounded-2xl overflow-hidden">
              
              {/* Header */}
              <div className="relative z-10 text-center pt-6 pb-4">
                <motion.h2
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                  className="font-display text-xl font-semibold text-white tracking-tight"
                >
                  Jump to section
                </motion.h2>
              </div>
              
              {/* Constellation map */}
              <div 
                ref={containerRef} 
                className="relative mx-4 sm:mx-8 lg:mx-12" 
                style={{ 
                  height: 'calc(100% - 180px)',
                  width: '100%',
                  maxWidth: 'calc(100% - 1.5rem)',
                }}
              >
                {/* Canvas for constellation lines */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 pointer-events-none"
                  style={{ width: '100%', height: '100%' }}
                />
                
                {/* Navigation nodes */}
                <div className="absolute inset-0">
                  {nodes.map((node, index) => (
                    <motion.button
                      key={node.id}
                      ref={(el) => {
                        if (el) starRefs.current[node.id] = el;
                      }}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.04, duration: 0.2, ease: "easeOut" }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => jump(node.id)}
                      onMouseEnter={() => setHoveredStar(node.id)}
                      onMouseLeave={() => setHoveredStar(null)}
                      className="absolute"
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        transform: 'translate(-50%, -50%)',
                        position: 'absolute'
                      }}
                      aria-label={`Go to ${node.label}`}
                    >
                      <div
                        className={`relative w-12 h-12 rounded-xl border flex items-center justify-center transition-colors duration-200 ${
                          hoveredStar === node.id
                            ? 'border-cyan-400/60 bg-cyan-500/15 text-cyan-300'
                            : 'border-white/15 bg-white/5 text-slate-300'
                        }`}
                      >
                        <node.Icon className="w-5 h-5" aria-hidden />
                      </div>
                      <AnimatePresence>
                        {hoveredStar === node.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap z-20"
                          >
                            <span className="px-2.5 py-1.5 rounded-md bg-slate-800 border border-white/10 text-slate-200 text-sm">
                              {node.label}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 z-10 text-center pb-6">
                <p className="text-slate-500 text-xs">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 font-mono text-[11px]">G</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 font-mono text-[11px]">Esc</kbd> to close
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}