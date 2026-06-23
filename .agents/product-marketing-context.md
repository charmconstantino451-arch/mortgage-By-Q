# Product Marketing Context: Mortgage by Q

## Business Overview
Mortgage by Q is in the Mortgage Brokerage / Real Estate Finance industry.

### Core Value Proposition
- Primary goal: Connecting homebuyers and real estate investors with customized, low-cost home loans and flexible alternative financing options by shopping across 150+ lenders, with a heavy emphasis on making the mortgage process transparent, stress-free, and accessible for non-traditional or hard-to-approve buyers.

## Target Audience
- Inferred ICP: First-Time Homebuyers & Families, Non-Traditional Borrowers (The "Hard to Approve"), and Property Investors.

## Brand Identity & Tone
- Tone: Accessible, Transparent, Supportive, Authoritative yet Friendly.

---
## Session History (Last Updated: 2026-06-19)
*This section is automatically updated by the workstation manager at the end of each session.*

### Previous Session Summaries:
- Context initialized.

### Session Update: 2026-06-22 (Morning — Mortgage Marketing Workflow Init)
**Summary:**
Loaded Mortgage by Q project context for the first time in the AI workflow. Pulled and profiled two competitor sites — Tomo Mortgage and Better Mortgage — storing raw scrapes and structured profiles under `competitor-profiles/`. Worked on the homepage mockup (`outputs/homepage-mockup/index.html`), benchmarking design direction against competitors. A `modern-3d-design-inspiration.md` doc was also created to guide visual direction. Next session should continue refining the homepage mockup and integrate insights from the competitor profiles into copy and layout decisions.
---

### Session Update: 2026-06-22 (Ad Copywriting)
**Summary:**
Ad copywriting session for Mortgage by Q. Worked on developing copy likely tied to the homepage or campaign assets. Output files may be in `outputs/` — check for any new `.md` or `.html` files created on this date. Next session should review and connect ad copy to the homepage mockup for consistency.
---

### Session Update: 2026-06-23 (Dev Fixes & File Export)
**Summary:**
Fixed a critical bug in `src/components/PaymentCalculator.jsx` — the `AnimatedNumber` component was rendering blank spans on initial load because `useSpring`'s `on('change')` event doesn't fire on mount. Fixed by rendering the initial formatted value as JSX children so the span is populated from the very first render. Separated the homepage mockup's inline CSS (~966 lines) into a standalone `outputs/homepage-mockup/styles.css` file, and updated `index.html` to link to it externally. Upgraded the floating download button to trigger two sequential downloads: `styles.css` then `index.html`, so users get a working file pair. Attempted GitHub repo setup at `https://github.com/charmconstantino451-arch/mortgagebyq.git` but blocked by missing Git installation — Git for Windows needs to be installed before the push can happen. Next session: install Git, push the project to GitHub.
---

### Session Update: 2026-06-23 (V2 3D Scrollytelling Redesign)
**Summary:**
Successfully completed the Awwwards-level V2 redesign of the homepage layout. Integrated a Three.js / React Three Fiber scene with a custom procedural modern villa which updates its camera tracking, lighting, and night modes based on scroll progress. Rebuilt the Hero Section with a premium split-grid layout over a cover background image, and created a 3D cylindrical draggable lender carousel in MetricsMarquee. Added a dark-styled interactive Payment Calculator and a multi-step eligibility wizard inside the Contact Drawer. Cleared Next.js compilation caches and launched the production server on port 3000 to bypass Windows spacing path resolution bugs. All changes compiled cleanly and were documented in task lists and walkthroughs.
---
