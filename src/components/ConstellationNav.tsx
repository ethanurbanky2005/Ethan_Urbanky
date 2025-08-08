"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StarPoint {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  color: string;
}

export default function ConstellationNav() {
  const [open, setOpen] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const starRefs = useRef<{ [key: string]: HTMLButtonElement }>({});

  const stars: StarPoint[] = [
    { id: 'hero', label: 'Origin Point', icon: '🌟', x: 20, y: 30, color: '#fbbf24' },
    { id: 'projects', label: 'Project Nexus', icon: '🚀', x: 50, y: 20, color: '#22d3ee' },
    { id: 'about', label: 'Life Pathway', icon: '✨', x: 80, y: 35, color: '#a78bfa' },
    { id: 'skills', label: 'Tech Galaxy', icon: '⚡', x: 30, y: 75, color: '#34d399' },
    { id: 'contact', label: 'Connection Hub', icon: '🌌', x: 70, y: 65, color: '#f472b6' },
  ];

  // Define the constellation path
  const constellationPath = ['hero', 'projects', 'about', 'contact', 'skills'];

  // Draw constellation lines based on actual DOM positions
  const drawConstellation = () => {
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

    // Draw lines between consecutive stars in the path
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.6)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    // Instead of using DOM positions, use the same percentage calculation as the stars
    for (let i = 0; i < constellationPath.length - 1; i++) {
      const currentStarId = constellationPath[i];
      const nextStarId = constellationPath[i + 1];
      
      // Find the star data
      const currentStar = stars.find(s => s.id === currentStarId);
      const nextStar = stars.find(s => s.id === nextStarId);
      
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
        
        console.log(`Drawing perfect line from ${currentStarId} to ${nextStarId}`);
        
        // Draw the constellation line
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    }

    // Draw subtle background stars (reduced)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    for (let i = 0; i < 8; i++) {
      const x = (i * 67 + 89) % rect.width;
      const y = (i * 73 + 127) % rect.height;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Draw animated particle trace from hovered star to next star
  const drawParticleTrace = () => {
    if (!hoveredStar) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentIndex = constellationPath.indexOf(hoveredStar);
    if (currentIndex === -1 || currentIndex === constellationPath.length - 1) return;

    const nextStarId = constellationPath[currentIndex + 1];
    
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
      
      // Highlight the path
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.8)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // Draw animated particle
      const time = Date.now() * 0.003;
      const progress = (Math.sin(time) + 1) / 2; // 0 to 1
      const particleX = startX + (endX - startX) * progress;
      const particleY = startY + (endY - startY) * progress;
      
      ctx.fillStyle = 'rgba(34, 211, 238, 0.9)';
      ctx.shadowColor = 'rgba(34, 211, 238, 0.8)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(particleX, particleY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  };

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
  }, [open, hoveredStar]);

  // Initial constellation draw
  useEffect(() => {
    if (!open) return;
    
    const timer = setTimeout(() => {
      drawConstellation();
    }, 300); // Wait for stars to animate in
    
    const handleResize = () => {
      setTimeout(drawConstellation, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [open]);

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
          aria-label="Constellation navigation"
          onClick={() => setOpen(false)}
        >
          {/* Subtle holographic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/3 via-transparent to-purple-500/3" />
          
          {/* Main constellation container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "easeOut", duration: 0.4 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(95vw,900px)] h-[min(85vh,600px)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Holographic border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/8 via-cyan-500/3 to-purple-500/5 backdrop-blur-xl border border-white/15 shadow-[0_0_60px_rgba(34,211,238,0.2)] overflow-hidden">
              
              {/* Header */}
              <div className="relative z-10 text-center pt-6 pb-6">
                <motion.h2
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-light text-white mb-3 tracking-wide"
                >
                  Cosmic Navigation
                </motion.h2>
                <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-slate-400 text-sm"
                >
                  Chart your course through the digital universe
                </motion.p>
              </div>
              
              {/* Constellation map */}
              <div 
                ref={containerRef} 
                className="relative mx-12" 
                style={{ 
                  height: 'calc(100% - 180px)', // Full height minus header (120px) and footer (60px)
                  width: 'calc(100% - 96px)' // Full width minus margins (48px each side)
                }}
              >
                {/* Canvas for constellation lines */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 pointer-events-none"
                  style={{ width: '100%', height: '100%' }}
                />
                
                {/* Navigation stars */}
                <div className="absolute inset-0">
                  {stars.map((star, index) => (
                    <motion.button
                      key={star.id}
                      ref={(el) => {
                        if (el) starRefs.current[star.id] = el;
                      }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: 0.2 + index * 0.05,
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => jump(star.id)}
                      onMouseEnter={() => setHoveredStar(star.id)}
                      onMouseLeave={() => setHoveredStar(null)}
                      className="absolute group"
                      style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        transform: 'translate(-50%, -50%)',
                        position: 'absolute'
                      }}
                    >
                      {/* Star glow */}
                      <div 
                        className="absolute inset-0 rounded-full blur-xl transition-all duration-300"
                        style={{
                          background: `radial-gradient(circle, ${star.color}30 0%, ${star.color}15 50%, transparent 70%)`,
                          transform: hoveredStar === star.id ? 'scale(2)' : 'scale(1)',
                          opacity: hoveredStar === star.id ? 1 : 0.5
                        }}
                      />
                      
                      {/* Star core */}
                      <div 
                        className="relative w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${star.color}25, ${star.color}10, transparent 70%)`,
                          boxShadow: hoveredStar === star.id 
                            ? `0 0 30px ${star.color}60, inset 0 1px 0 rgba(255,255,255,0.2)`
                            : `0 0 15px ${star.color}40, inset 0 1px 0 rgba(255,255,255,0.1)`
                        }}
                      >
                        <span className="text-xl filter drop-shadow-sm">
                          {star.icon}
                        </span>
                      </div>
                      
                      {/* Label tooltip */}
                      <AnimatePresence>
                        {hoveredStar === star.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap z-20"
                          >
                            <div className="px-3 py-2 rounded-lg bg-black/80 border border-white/20 backdrop-blur-sm">
                              <span className="text-white text-sm font-medium">
                                {star.label}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 z-10 text-center pb-8">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-slate-500 text-xs"
                >
                  Press <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 text-cyan-400">G</kbd> again or <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20 text-cyan-400">ESC</kbd> to close
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}