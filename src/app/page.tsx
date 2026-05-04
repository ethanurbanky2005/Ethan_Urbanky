"use client";
import { useState, useRef, useEffect } from "react";
import { portfolio } from "@/config/portfolio";
import AmbientNav from "@/components/AmbientNav";
import AppStore from "@/components/AppStore";
import ConstellationNav from "@/components/ConstellationNav";
import LifeJourney from "@/components/LifeJourney";
import SkillConstellation from "@/components/SkillConstellation";
import ScrollProgress from "@/components/ScrollProgress";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Globe, Mail, Briefcase, Github, Check, FileText } from "lucide-react";
import Image from "next/image";

function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timeout = setTimeout(() => {
      const id = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(id);
      }, 55);
      return () => clearInterval(id);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, text, delay]);

  return (
    <span ref={ref}>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-0.5 h-[1em] bg-blue-400 ml-0.5 align-middle animate-pulse" />
      )}
    </span>
  );
}

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const duration = 1600;
    let raf: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) { raf = requestAnimationFrame(step); }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, to]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

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
          <p className="text-slate-200 font-medium">Thanks, I&apos;ll get back to you soon.</p>
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
          <div className="max-w-5xl w-full flex flex-col-reverse sm:flex-row items-center gap-10 sm:gap-16">

            {/* Left: text */}
            <div className="flex-1 min-w-0">
              {/* Greeting — typewriter */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="text-blue-400 text-sm sm:text-base mb-4 font-mono"
              >
                <Typewriter text="Hi, I'm" delay={0.15} />
              </motion.p>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] mb-4"
              >
                <span className="block text-white">
                  {portfolio.identity.name.split(" ")[0]}
                </span>
                <span className="block text-slate-400">
                  {portfolio.identity.name.split(" ")[1]}.
                </span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xl mb-8 leading-relaxed"
              >
                Data Science & Software Engineering student at Western University. 3× CI Financial intern. Co-founder of CONQ. Bilingual EN/FR.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-3 mb-14"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors duration-200"
                >
                  Get in touch
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-100 text-sm font-medium border border-white/15 hover:border-white/25 transition-colors duration-200 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" strokeWidth={1.75} />
                  Résumé
                </a>
                <a
                  href="https://linkedin.com/in/ethan-urbanky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium border border-white/10 hover:border-white/20 transition-colors duration-200"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/ethanurbanky2005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium border border-white/10 hover:border-white/20 transition-colors duration-200"
                >
                  GitHub
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex flex-wrap gap-x-10 gap-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.55 }}
              >
                <div>
                  <div className="text-lg sm:text-xl font-semibold text-white tabular-nums">
                    <CountUp to={3} suffix="×" />
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 tracking-wide">CI Financial Intern</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-semibold text-white tabular-nums">
                    $<CountUp to={103} suffix="B" />
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 tracking-wide">Division AUM · CI</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-semibold text-white">Co-Founder</div>
                  <div className="text-xs text-slate-500 mt-0.5 tracking-wide">CONQ</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-semibold text-white">EN / FR</div>
                  <div className="text-xs text-slate-500 mt-0.5 tracking-wide">Bilingual</div>
                </div>
              </motion.div>
            </div>

            {/* Right: avatar with ambient glow + gentle float */}
            <motion.div
              className="flex-shrink-0 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {/* Soft radial glow behind avatar (decorative, aria-hidden) */}
              <div
                aria-hidden
                className="avatar-glow absolute inset-0 -z-10 pointer-events-none rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(59,130,246,0.35), rgba(129,140,248,0.18) 60%, transparent 75%)",
                  filter: "blur(28px)",
                }}
              />
              <div className="avatar-float">
                <Image
                  src="/avatar.png"
                  alt="Portrait of Ethan Urbanky"
                  width={256}
                  height={256}
                  className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain drop-shadow-2xl select-none"
                  priority
                  unoptimized
                />
              </div>
            </motion.div>

          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="relative h-screen-safe md:snap-start flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <AppStore />
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="about" className="relative md:snap-start min-h-screen-safe flex items-center justify-center py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-12"
            >
              Experience
            </motion.h2>
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

            {/* Footer — small, professional, no clutter */}
            <footer className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 px-2">
              <p>© {new Date().getFullYear()} {portfolio.identity.name} · {portfolio.identity.location}</p>
              <p className="font-mono text-[11px]">
                Built with Next.js · React · Tailwind
              </p>
            </footer>
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
