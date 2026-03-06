# Debug Mode (Cursor)

Use Cursor’s **Debug Mode** for bugs in this project so fixes are based on runtime evidence (instrumentation + logs), not code inspection alone.

## When to use

- Any bug you want to fix in **dreamos-galaxy** (Next.js app in this repo).
- Frontend bugs (e.g. Cursor, QuantumField, ConstellationNav, LifeJourney, contact form).
- Build/lint issues when behavior depends on runtime (e.g. env, paths).

## Project context

- **App:** `dreamos-galaxy` (Next.js 15, React 19, TypeScript, Framer Motion, Tailwind).
- **Run from:** `dreamos-galaxy` directory (e.g. `cd dreamos-galaxy` or use full path `/Users/ethanurbanky/Projects/EthanUrbanky.dev/dreamos-galaxy`).
- **Reproduce in browser:** `npm run dev` then open http://localhost:3000.
- **Reproduce in tests:** `npm run test` or `npm run test:watch`.
- **Build:** `npm run build`.

## Prompts to use

**When reporting a bug (so the agent uses Debug Mode):**

- *“Use Debug Mode: add instrumentation and give me reproduction steps before changing code. Reproduce in the browser (npm run dev) or via npm run test.”*
- Shorter: *“Debug Mode: instrument and give repro steps before fixing.”*

**Rule for the agent (e.g. in Cursor rules):**

- *“For bug reports in this project, use Debug Mode: hypotheses, instrumentation, repro steps, then fix from logs. Don’t fix from code inspection alone. Reproduce via browser (dreamos-galaxy: npm run dev) or tests (npm run test).”*

**One-line reminder:**

- *“Bugs: use Debug Mode—instrument first, then fix from log evidence.”*

## Reproducing

1. **Browser:** From repo root: `cd dreamos-galaxy && npm run dev`. Open http://localhost:3000 and follow the repro steps the agent gives you.
2. **Tests:** `cd dreamos-galaxy && npm run test` (or `npm run test:watch`). If the bug is in a test, the agent may add instrumentation and ask you to run the test again.
3. **Build:** `cd dreamos-galaxy && npm run build` if the bug only appears during build.

After reproducing, use “Proceed” / “Mark as fixed” in the Debug Mode UI so the agent can read the logs and only then propose or refine fixes.
