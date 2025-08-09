"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  energy: number;
}

export default function QuantumField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);



  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles with better distribution
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = isMobile ? 15 : 40; // Reduce particles on mobile
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          life: Math.random() * 100,
          maxLife: 200 + Math.random() * 100,
          energy: Math.random() * 0.4 + 0.2
        });
      }
    };

    initParticles();

    // Mouse tracking for quantum entanglement effects
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Quantum field animation
    const animate = () => {
      // Skip animation if user prefers reduced motion
      if (reduceMotion) {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.95)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }
      
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((particle, i) => {
        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Mouse interaction with better responsiveness
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200 && distance > 0) {
          const force = (200 - distance) / 200;
          const strength = force * 0.0002;
          particle.vx += (dx / distance) * strength;
          particle.vy += (dy / distance) * strength;
          particle.energy = Math.min(1, particle.energy + force * 0.02);
        }

        // Boundary conditions (quantum tunneling effect)
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Velocity damping
        particle.vx *= 0.998;
        particle.vy *= 0.998;

        // Energy decay
        particle.energy *= 0.995;

        // Respawn if life exceeded
        if (particle.life > particle.maxLife) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = 0;
          particle.energy = Math.random() * 0.5 + 0.2;
        }

        // Draw particle
        const alpha = particle.energy * (1 - particle.life / particle.maxLife);
        const hue = 180 + particle.energy * 60; // Cyan to blue spectrum
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.energy * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha * 0.6})`;
        ctx.fill();

        // Reduced quantum connections for performance
        if (!isMobile && i % 2 === 0) { // Skip connections entirely on mobile, only draw for every other particle on desktop
          particles.forEach((other, j) => {
            if (i >= j) return;
            
            const dx2 = other.x - particle.x;
            const dy2 = other.y - particle.y;
            const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            
            if (distance2 < 60 && distance2 > 0) { // Reduced connection range
              const opacity = (60 - distance2) / 60 * particle.energy * other.energy;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.15})`;
              ctx.lineWidth = 0.3;
              ctx.stroke();
            }
          });
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.8) 0%, rgba(2, 6, 23, 0.95) 100%)'
      }}
    />
  );
}
