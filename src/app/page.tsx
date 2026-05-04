"use client";
import { useState } from "react";
import { portfolio } from "@/config/portfolio";
import AmbientNav from "@/components/AmbientNav";
import AppStore from "@/components/AppStore";
import ConstellationNav from "@/components/ConstellationNav";
import LifeJourney from "@/components/LifeJourney";
import SkillConstellation from "@/components/SkillConstellation";
import ScrollProgress from "@/components/ScrollProgress";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Mail, Briefcase, Github, Check } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mojreowq";

function ContactFormBlock() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="thanks"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center gap-4 py-8 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
            <Check className="w-7 h-7 text-cyan-400" strokeWidth={2.5} />
          </div>
          <p className="text-slate-200 font-medium">Thanks — I&apos;ll get back to you.</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
          >
            Send another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          id="contact-form"
          className="grid grid-cols-1 gap-4 sm:gap-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) => {
            const targetTag = (e.target as HTMLElement).tagName;
            if (e.key === "Enter" && targetTag !== "TEXTAREA") {
              (e.currentTarget as HTMLFormElement).requestSubmit();
            }
          }}
          onSubmit={handleSubmit}
        >
          <label className="block group">
            <span className="sr-only">Your name</span>
            <input required name="name" autoComplete="name" aria-label="Your name" placeholder="Name" className="peer w-full bg-transparent placeholder:text-slate-500/70 outline-none border-b border-white/10 focus:border-cyan-400/60 py-3 text-base min-h-[44px]" />
          </label>
          <label className="block group">
            <span className="sr-only">Your email</span>
            <input required name="email" type="email" autoComplete="email" aria-label="Your email" placeholder="Email" className="peer w-full bg-transparent placeholder:text-slate-500/70 outline-none border-b border-white/10 focus:border-cyan-400/60 py-3 text-base min-h-[44px]" />
          </label>
          <label className="block group">
            <span className="sr-only">Your message</span>
            <textarea required name="message" rows={3} aria-label="Your message" placeholder="Message" className="peer w-full bg-transparent placeholder:text-slate-500/70 outline-none border-b border-white/10 focus:border-cyan-400/60 py-3 text-base min-h-[44px]" />
          </label>
          {status === "error" && (
            <p className="text-red-400 text-xs">Something went wrong. Try emailing me directly.</p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 h-11 rounded-xl bg-cyan-500/80 hover:bg-cyan-500 disabled:opacity-50 text-white font-medium transition-all duration-200 flex items-center justify-center gap-2"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

const Home = () => {
  return (
    <>
      {/* Ambient backdrop */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="noise" />
      </div>


      <main id="main-content" className="relative z-10 md:snap-y md:snap-mandatory h-screen-safe w-full overflow-y-auto overflow-x-hidden safe-area-padding">
        {/* HERO */}
        <section id="hero" className="h-screen-safe md:snap-start flex items-center justify-center px-4 sm:px-6">
          <div className="max-w-5xl text-center">
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
              Data Science · Software Engineering · Consulting
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-12"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {[
                { value: "3×", label: "CI Financial Intern" },
                { value: "$103B", label: "AUM Managed" },
                { value: "Co-Founder", label: "CONQ Health-Tech" },
                { value: "EN / FR", label: "Native Bilingual" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl sm:text-2xl font-semibold text-blue-400">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1 tracking-wide uppercase">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.p
              className="mt-10 text-slate-600 text-sm hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.65 }}
            >
              Scroll to explore
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
              <div className="inline-block">
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-4 lg:mb-6 text-white leading-tight"
                >
                  Experience
                </motion.h2>
              </div>
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
              <div className="inline-block">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white mb-4 lg:mb-6 leading-tight">
                  Contact
                </h2>
              </div>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
                Open to internship opportunities, consulting roles, and technical collaboration.
              </p>
            </div>
            
            <div className="glass-card max-w-4xl mx-auto rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12">
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

              <ContactFormBlock />
            </div>
    </div>
        </section>
      </main>
      <ScrollProgress />
      <ConstellationNav />
      <AmbientNav />
    </>
  );
};

export default Home;
