"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home as HomeIcon,
  LayoutGrid,
  UserCircle,
  Cpu,
  Mail,
  FileText,
  Briefcase,
  Github,
  Search,
  CornerDownLeft,
} from "lucide-react";

type Item = {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Actions" | "External";
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  run: () => void;
  keywords?: string;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const items: Item[] = useMemo(
    () => [
      {
        id: "nav-hero",
        label: "Home",
        hint: "Top of page",
        group: "Navigate",
        icon: HomeIcon,
        run: () => scrollTo("hero"),
        keywords: "top hero start",
      },
      {
        id: "nav-projects",
        label: "Projects",
        hint: "CONQ, UPick, BalloonTD…",
        group: "Navigate",
        icon: LayoutGrid,
        run: () => scrollTo("projects"),
        keywords: "work portfolio apps",
      },
      {
        id: "nav-experience",
        label: "Experience",
        hint: "CI Financial · Western · UCC",
        group: "Navigate",
        icon: UserCircle,
        run: () => scrollTo("about"),
        keywords: "about resume timeline career",
      },
      {
        id: "nav-skills",
        label: "Skills",
        hint: "Languages, frameworks, tools",
        group: "Navigate",
        icon: Cpu,
        run: () => scrollTo("skills"),
        keywords: "tech stack constellation",
      },
      {
        id: "nav-contact",
        label: "Contact",
        hint: "Get in touch",
        group: "Navigate",
        icon: Mail,
        run: () => scrollTo("contact"),
        keywords: "email hire reach",
      },
      {
        id: "act-resume",
        label: "Open résumé",
        hint: "PDF",
        group: "Actions",
        icon: FileText,
        run: () => window.open("/resume.pdf", "_blank", "noopener,noreferrer"),
        keywords: "cv resume pdf download",
      },
      {
        id: "act-email",
        label: "Email Ethan",
        hint: "ethan.urbanky@gmail.com",
        group: "Actions",
        icon: Mail,
        run: () => { window.location.href = "mailto:ethan.urbanky@gmail.com"; },
        keywords: "mail send message reach out",
      },
      {
        id: "ext-linkedin",
        label: "LinkedIn",
        hint: "/in/ethan-urbanky",
        group: "External",
        icon: Briefcase,
        run: () => window.open("https://linkedin.com/in/ethan-urbanky", "_blank", "noopener,noreferrer"),
      },
      {
        id: "ext-github",
        label: "GitHub",
        hint: "@ethanurbanky2005",
        group: "External",
        icon: Github,
        run: () => window.open("https://github.com/ethanurbanky2005", "_blank", "noopener,noreferrer"),
      },
    ],
    [scrollTo],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      `${i.label} ${i.hint ?? ""} ${i.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  // Group filtered while preserving order.
  const groups = useMemo(() => {
    const map = new Map<Item["group"], Item[]>();
    for (const item of filtered) {
      if (!map.has(item.group)) map.set(item.group, []);
      map.get(item.group)!.push(item);
    }
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  // Global keybindings: ⌘K / Ctrl-K opens; ? for hint not implemented to keep surface small.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isModK = (e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K");
      if (isModK) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => (a + 1) % Math.max(filtered.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[active];
        if (item) {
          item.run();
          close();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, close]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Track flat index across groups so arrow nav matches `filtered` order.
  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          className="fixed inset-0 z-[210] flex items-start justify-center px-4 pt-[14vh] sm:pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          role="dialog"
          aria-modal
          aria-label="Command palette"
        >
          <div
            className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="relative w-full max-w-xl rounded-2xl bg-neutral-900/95 ring-1 ring-white/10 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <Search className="w-4 h-4 text-slate-500" strokeWidth={2} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to section, open résumé, email…"
                className="flex-1 bg-transparent outline-none text-base text-slate-100 placeholder:text-slate-500"
                autoComplete="off"
                spellCheck={false}
                aria-label="Search commands"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white/5 ring-1 ring-white/10 rounded">
                ESC
              </kbd>
            </div>

            <div className="max-h-[55vh] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-slate-500">
                  No matches.
                </div>
              ) : (
                groups.map(([group, list]) => (
                  <div key={group} className="px-2 pb-2">
                    <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">
                      {group}
                    </div>
                    {list.map((item) => {
                      flatIndex += 1;
                      const isActive = flatIndex === active;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onMouseEnter={() => setActive(flatIndex)}
                          onClick={() => {
                            item.run();
                            close();
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                            isActive
                              ? "bg-amber-500/15 text-white"
                              : "text-slate-300 hover:bg-white/5"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-amber-300" : "text-slate-500"}`}
                            strokeWidth={1.75}
                          />
                          <span className="flex-1 truncate text-sm">{item.label}</span>
                          {item.hint && (
                            <span className="text-xs text-slate-500 truncate hidden sm:block max-w-[40%]">
                              {item.hint}
                            </span>
                          )}
                          {isActive && (
                            <CornerDownLeft className="w-3.5 h-3.5 text-amber-300" strokeWidth={2} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 text-[11px] text-slate-500">
              <span className="font-mono">
                <kbd className="px-1 py-0.5 bg-white/5 ring-1 ring-white/10 rounded mr-1">↑</kbd>
                <kbd className="px-1 py-0.5 bg-white/5 ring-1 ring-white/10 rounded mr-2">↓</kbd>
                navigate
              </span>
              <span className="font-mono">
                <kbd className="px-1 py-0.5 bg-white/5 ring-1 ring-white/10 rounded mr-2">↵</kbd>
                select
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
