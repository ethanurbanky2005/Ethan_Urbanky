"use client";
import { useEffect } from "react";

export default function AmbientNav() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section')) as HTMLElement[];
    const main = document.querySelector('main') as HTMLElement | null;
    if (!main) return;
    
    let currentIndex = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const navigate = (dir: number) => {
      // Special handling for Journey section (about)
      const currentSection = sections[currentIndex];
      
      if (currentSection && currentSection.id === 'about' && dir === 1) {
        // If we're in the Journey section and going forward, scroll within the section first
        const aboutSection = currentSection;
        const scrollContainer = main;
        const currentScrollTop = scrollContainer.scrollTop;
        const aboutTop = aboutSection.offsetTop;
        const aboutBottom = aboutTop + aboutSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Check if we can scroll more within the Journey section
        if (currentScrollTop + viewportHeight < aboutBottom - 200) { // 200px buffer
          // Scroll within the Journey section
          scrollContainer.scrollBy({ 
            top: viewportHeight * 0.8, // Scroll by 80% of viewport
            behavior: reduceMotion ? 'auto' : 'smooth' 
          });
          return;
        }
      }
      
      // Normal section navigation
      const newIndex = Math.min(Math.max(currentIndex + dir, 0), sections.length - 1);
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        sections[currentIndex].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown","PageDown","j"].includes(e.key)) { 
        e.preventDefault(); 
        navigate(1); 
      }
      if (["ArrowUp","PageUp","k"].includes(e.key)) { 
        e.preventDefault(); 
        navigate(-1); 
      }
    };
    window.addEventListener('keydown', onKey);

    const onScroll = () => {
      const top = main.scrollTop + window.innerHeight / 2; // Add offset for better detection
      
      // Find which section is currently in view
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (top >= sectionTop && top < sectionBottom) {
          currentIndex = i;
          break;
        }
      }
    };
    main.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('keydown', onKey);
      main.removeEventListener('scroll', onScroll);
    };
  }, []);
  
  return null;
}