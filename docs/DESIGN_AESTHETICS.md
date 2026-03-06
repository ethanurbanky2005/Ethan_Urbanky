# Frontend design direction

Use this as reference when changing UI/UX so the site stays **distinctive and polished**, not generic or “AI slop.”

## Compliance (all changes)

All UI/UX and front-end work must also comply with:

- **Security** — Headers and CSP in `src/middleware.ts`; no secrets in client code; safe forms/backend when added; `npm audit` and patched deps.
- **Compatibility** — Responsive at all viewports; iOS-safe (safe-area, 16px inputs, 44px touch targets, dvh/svh); `prefers-reduced-motion` respected.
- **Accessibility** — Skip link, focus styles, semantic HTML, external links `rel="noopener noreferrer"`, WCAG contrast.

See **docs/FRONTEND_PINNACLE_RESEARCH.md** for the full compliance checklist when adding new features.

## Principles

- **Typography** — Prefer distinctive, well-paired type. Avoid defaulting to Inter, Roboto, Arial, or system stacks. This app uses Geist (sans + mono); if changing, consider display + monospace or strong weight contrast (e.g. 200 vs 800), and state the choice before changing.
- **Color & theme** — One cohesive palette with clear dominance and sharp accents. Use CSS variables for consistency. Avoid timid, evenly spread color; commit to a clear primary + accent. Draw from IDE themes or cultural aesthetics when it fits.
- **Motion** — Prefer a few high-impact moments (e.g. one orchestrated load with staggered reveals) over many small micro-interactions. Use CSS where possible; use Motion (Framer Motion) in React where it adds clarity. Reduce motion for users who prefer it.
- **Backgrounds** — Add atmosphere and depth (gradients, subtle pattern, or context-aware effects) instead of flat solid fills. Keep performance in mind (e.g. particle count, repaints).

## What to avoid

- Overused fonts (Inter, Roboto, Open Sans, Lato, generic system).
- Clichéd schemes (e.g. purple gradients on white; if using purple, commit to it in a deliberate palette).
- Predictable, template-like layouts and components.
- Copy that sounds generic (“passion,” “innovation,” “extraordinary,” “bridge X and Y”).
- Scattered, samey animations everywhere instead of one or two clear motion moments.

## For this codebase

- **Theme:** Dark-first, cyan/blue accent, cosmic/tech feel. Keep that commitment; refine rather than dilute.
- **Typography:** Geist (sans + mono) for body and UI; Outfit for section headings and hero (`.font-display`). One clear display/sans pairing. **Variable fonts:** Geist and Outfit from next/font support variable axes (e.g. weight); use `font-variation-settings` or Tailwind arbitrary weights (e.g. `font-[550]`) for fine steps; section titles use semibold (600), body regular (400).
- **Color system:** Use CSS variables in `globals.css` (`--accent`, `--accent-secondary`, `--accent-muted`, `--bg-primary`, `--text-primary`, `--text-muted`) for consistency. Section title gradient: `from-[var(--accent)] via-[var(--accent-secondary)] to-cyan-300`.
- **Motion:** One orchestrated hero entrance (short stagger); section headers use `whileInView` once. Avoid adding scattered hover animations.
- **Backgrounds:** Layered radial gradients + noise + QuantumField; no flat fills.
- **Sections:** Hero, Projects, Experience, Skills, Contact. Headings and body copy should be concise and specific.
- **Icons:** Lucide for UI; no emoji in primary UI. External links: `rel="noopener noreferrer"`.
- **Responsive & display sizes:** Target all viewports; every value has a rationale. **Viewport:** `viewportFit: cover` so safe-area insets apply; `maximumScale: 5` for a11y zoom. **Height:** `h-screen-safe` / `min-h-screen-safe` use `100dvh` (fallback `100vh` / `-webkit-fill-available`). **Safe area:** Only on scrollable content (`main.safe-area-padding`), not body, so fixed backdrops stay full-bleed; modals get safe-area padding via `.fixed.inset-0.z-50`. **Touch:** 44×44px minimum (Apple HIG) for buttons and form controls on mobile. **Inputs:** `text-base` (16px) minimum to prevent iOS zoom on focus. **Breakpoints:** 400px = narrow phones (≤375–400px width); 768px = Tailwind `md`. **Spacing:** 2rem section padding (8px grid); hero 4rem top (status bar clearance). **Skills box:** `max(280px, min(400px, 72dvh))` on mobile so height scales with viewport. **Constellation overlay:** `max-h: calc(100dvh - 2rem)` for 1rem gutter. Don’t add magic numbers; document or derive from viewport/standards.
- When adding or redesigning: ask whether the change makes the app feel *more* specific to this portfolio and less like a generic template.
