"use client";
import { portfolio } from "@/config/portfolio";
import AmbientNav from "@/components/AmbientNav";
import AppStore from "@/components/AppStore";
import ConstellationNav from "@/components/ConstellationNav";
import LifeJourney from "@/components/LifeJourney";
import SkillConstellation from "@/components/SkillConstellation";
import QuantumField from "@/components/QuantumField";
import { motion } from "framer-motion";
import React, { useEffect } from "react";


const Home = () => {
  useEffect(() => {
    // Page loaded - Vercel Analytics will automatically track this
  }, []);

  return (
    <>
      {/* Ambient backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-slate-900 to-slate-950 opacity-80"></div>
        <div className="noise"></div>
        <QuantumField />
      </div>


      <main className="relative z-10 md:snap-y md:snap-mandatory h-screen-safe w-full overflow-y-auto overflow-x-hidden">
        {/* HERO */}
        <section id="hero" className="h-screen-safe md:snap-start flex items-center justify-center px-4 sm:px-6">
          <div className="max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mx-auto mb-8 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 ring-2 ring-cyan-300/30 shadow-[0_0_80px_rgba(34,211,238,.25)] flex items-center justify-center"
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.span 
                className="block bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                {portfolio.identity.name.split(" ")[0]}
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                {portfolio.identity.name.split(" ")[1]}
              </motion.span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-cyan-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-base sm:text-lg md:text-xl text-slate-300/90 font-medium">
                  {portfolio.identity.tagline}
                </p>
                <motion.div 
                  className="w-2 h-2 rounded-full bg-purple-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </div>
              
              <motion.p 
                className="text-slate-400 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Building interfaces that breathe, architecting data that tells stories, 
                and creating digital experiences that bridge imagination and reality.
              </motion.p>
            </motion.div>
            
            <motion.p 
              className="mt-12 text-slate-500 text-sm hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Edge-hover or ArrowDown to continue • Press g for Constellation
            </motion.p>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="relative h-screen-safe md:snap-start flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <AppStore />
          </div>
        </section>

        {/* LIFE JOURNEY - Immersive scroll-driven story */}
        <section id="about" className="relative md:snap-start min-h-screen-safe">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center pt-20 pb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight"
              >
                The Journey
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed"
              >
                Scroll through my story—from academic foundations to leading teams, 
                each step building toward the future I&apos;m creating.
              </motion.p>
            </div>
            
            <LifeJourney />
          </div>
        </section>

        {/* SKILLS - Interactive constellation */}
        <section id="skills" className="relative h-screen-safe md:snap-start flex items-center justify-center">
          <SkillConstellation />
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative h-screen-safe md:snap-start flex items-center justify-center px-4 sm:px-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 lg:mb-6 leading-tight">
                Let&apos;s Connect
              </h2>
              <p className="text-lg sm:text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
                Ready to build something extraordinary? Let&apos;s turn ideas into reality and create the future together.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/20 backdrop-blur-xl p-6 sm:p-8 lg:p-12 shadow-2xl">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                <a 
                  href="https://ethanurbanky.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-xl lg:rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-400/20 ring-1 ring-purple-300/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg sm:text-2xl">🌐</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Portfolio</div>
                    <div className="text-slate-400 text-xs sm:text-sm">ethanurbanky.dev</div>
                  </div>
                </a>
                
                <a 
                  href="mailto:ethan.urbanky@gmail.com"
                  className="group flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-xl lg:rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-cyan-400/20 ring-1 ring-cyan-300/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg sm:text-2xl">📧</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Email</div>
                    <div className="text-slate-400 text-xs sm:text-sm">ethan.urbanky@gmail.com</div>
                  </div>
                </a>
                
                <a 
                  href="https://linkedin.com/in/ethan-urbanky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-xl lg:rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-400/20 ring-1 ring-blue-300/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg sm:text-2xl">💼</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">LinkedIn</div>
                    <div className="text-slate-400 text-xs sm:text-sm">Professional network</div>
                  </div>
                </a>
                
                <a 
                  href="https://github.com/ethanurbanky2005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-xl lg:rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-slate-400/20 ring-1 ring-slate-300/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg sm:text-2xl">💻</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">GitHub</div>
                    <div className="text-slate-400 text-xs sm:text-sm">Code repositories</div>
                  </div>
                </a>
                
                <a 
                  href="tel:(647) 710-2061"
                  className="group flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-xl lg:rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-green-400/20 ring-1 ring-green-300/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-lg sm:text-2xl">📱</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Phone</div>
                    <div className="text-slate-400 text-xs sm:text-sm">(647) 710-2061</div>
                  </div>
                </a>
              </div>

              <form
                id="contact-form"
                className="grid grid-cols-1 gap-4 sm:gap-6"
                action="#"
                method="post"
                onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) => {
                  const targetTag = (e.target as HTMLElement).tagName;
                  if (e.key === 'Enter' && targetTag !== 'TEXTAREA') {
                    (e.currentTarget as HTMLFormElement).requestSubmit();
                  }
                }}
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const data = Object.fromEntries(new FormData(form).entries());
                  console.log('submit', data);
                  form.reset();
                }}
              >
                <label className="block group">
                  <span className="sr-only">Your name</span>
                  <input name="name" autoComplete="name" aria-label="Your name" placeholder="Name" className="peer w-full bg-transparent placeholder:text-slate-500/70 outline-none border-b border-white/10 focus:border-cyan-400/60 py-3 text-sm sm:text-base" />
                </label>
                <label className="block group">
                  <span className="sr-only">Your email</span>
                  <input name="email" type="email" autoComplete="email" aria-label="Your email" placeholder="Email" className="peer w-full bg-transparent placeholder:text-slate-500/70 outline-none border-b border-white/10 focus:border-cyan-400/60 py-3 text-sm sm:text-base" />
                </label>
                <label className="block group">
                  <span className="sr-only">Your message</span>
                  <textarea name="message" rows={3} aria-label="Your message" placeholder="Message" className="peer w-full bg-transparent placeholder:text-slate-500/70 outline-none border-b border-white/10 focus:border-cyan-400/60 py-3 text-sm sm:text-base" />
                </label>
                <div className="mt-2 text-slate-500 text-xs sm:text-sm">Press Enter to send • No buttons here</div>
              </form>
            </div>
    </div>
        </section>
      </main>
      <ConstellationNav />
      <AmbientNav />
    </>
  );
};

export default Home;
