"use client";
import { portfolio } from "@/config/portfolio";
import AmbientNav from "@/components/AmbientNav";
import AppStore from "@/components/AppStore";
import ConstellationNav from "@/components/ConstellationNav";
import LifeJourney from "@/components/LifeJourney";
import SkillConstellation from "@/components/SkillConstellation";
import QuantumField from "@/components/QuantumField";
import { motion } from "framer-motion";
import { Globe, Mail, Briefcase, Github } from "lucide-react";

const Home = () => {
  return (
    <>
      {/* Ambient backdrop: layered depth */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--accent-muted),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-slate-900 to-slate-950 opacity-90" />
        <div className="noise" />
        <QuantumField />
      </div>


      <main id="main-content" className="relative z-10 md:snap-y md:snap-mandatory h-screen-safe w-full overflow-y-auto overflow-x-hidden safe-area-padding">
        {/* HERO */}
        <section id="hero" className="h-screen-safe md:snap-start flex items-center justify-center px-4 sm:px-6">
          <div className="max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mb-8 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-slate-700/40 ring-1 ring-white/10 flex items-center justify-center"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[1.1] mb-6"
            >
              <span className="block bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                {portfolio.identity.name.split(" ")[0]}
              </span>
              <span className="block bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-cyan-300 bg-clip-text text-transparent">
                {portfolio.identity.name.split(" ")[1]}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-slate-400 font-medium"
            >
              {portfolio.identity.tagline}
            </motion.p>

            <motion.p
              className="mt-10 text-slate-500 text-sm hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.55 }}
            >
              Scroll or ↓ to continue · G for menu
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
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-4 lg:mb-6 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-cyan-300 bg-clip-text text-transparent leading-tight"
              >
                Experience
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto"
              >
                Education, experience, and projects.
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
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-cyan-300 bg-clip-text text-transparent mb-4 lg:mb-6 leading-tight">
                Contact
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
                Get in touch for projects or collaboration.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/20 backdrop-blur-xl p-6 sm:p-8 lg:p-12 shadow-2xl">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                <a
                  href="https://ethanurbanky.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl lg:rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-slate-300 group-hover:text-white transition-colors">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm sm:text-base text-slate-100">Website</div>
                    <div className="text-slate-400 text-xs sm:text-sm truncate">ethanurbanky.dev</div>
                  </div>
                </a>

                <a
                  href="mailto:ethan.urbanky@gmail.com"
                  className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl lg:rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-slate-300 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm sm:text-base text-slate-100">Email</div>
                    <div className="text-slate-400 text-xs sm:text-sm truncate">ethan.urbanky@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/ethan-urbanky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl lg:rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-slate-300 group-hover:text-white transition-colors">
                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm sm:text-base text-slate-100">LinkedIn</div>
                    <div className="text-slate-400 text-xs sm:text-sm">Profile</div>
                  </div>
                </a>

                <a
                  href="https://github.com/ethanurbanky2005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl lg:rounded-2xl bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-slate-300 group-hover:text-white transition-colors">
                    <Github className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm sm:text-base text-slate-100">GitHub</div>
                    <div className="text-slate-400 text-xs sm:text-sm">Repositories</div>
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
                  // Demo only: no backend. When adding one, add validation, rate limit, CSRF.
                  e.currentTarget.reset();
                }}
              >
                <label className="block group">
                  <span className="sr-only">Your name</span>
                  <input name="name" autoComplete="name" aria-label="Your name" placeholder="Name" className="peer w-full bg-transparent placeholder:text-slate-500/70 outline-none border-b border-white/10 focus:border-cyan-400/60 py-3 text-base min-h-[44px]" />
                </label>
                <label className="block group">
                  <span className="sr-only">Your email</span>
                  <input name="email" type="email" autoComplete="email" aria-label="Your email" placeholder="Email" className="peer w-full bg-transparent placeholder:text-slate-500/70 outline-none border-b border-white/10 focus:border-cyan-400/60 py-3 text-base min-h-[44px]" />
                </label>
                <label className="block group">
                  <span className="sr-only">Your message</span>
                  <textarea name="message" rows={3} aria-label="Your message" placeholder="Message" className="peer w-full bg-transparent placeholder:text-slate-500/70 outline-none border-b border-white/10 focus:border-cyan-400/60 py-3 text-base min-h-[44px]" />
                </label>
                <p className="mt-2 text-slate-500 text-xs">Demo only · form is not submitted.</p>
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
