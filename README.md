# PulseFit — Coach Alex Rivera

A conversion-focused portfolio and lead-acquisition site for an elite 1-on-1 fitness coach. It functions as a direct-response funnel: establish authority (hero) → engage (interactive assessment + fitness calculators) → prove (transformations) → qualify (pricing tiers) → convert (application + booking).

Built to be **rebranded by editing two files** — no copy, images, links, or colors are hardcoded in components.

---

## Highlights

- **Light + dark theme** — warm, organic palette (terracotta accent, warm charcoal dark mode). Persists across reloads, follows the OS by default, no flash on load.
- **No gradients, glow, or glassmorphism** — solid surfaces, 1px borders, soft micro-shadows only.
- **Multipage** (React Router) with per-page titles and smooth in-page anchors.
- **Interactive 3-step assessment** that estimates a calorie/frequency/timeline "blueprint."
- **BMI, BMR & TDEE calculators** with a metric ⇄ imperial toggle and live results.
- **Filterable transformation gallery** with a draggable before/after slider.
- **Accessibility & motion polish** — keyboard-navigable, visible focus rings, semantic landmarks, and full `prefers-reduced-motion` support.

---

## Tech stack

| Concern | Choice |
| :-- | :-- |
| Build / dev | Vite |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v3 (class-based dark mode, CSS-variable tokens) |
| Routing | React Router v7 |
| Animation | Framer Motion |
| Fonts | `@fontsource` — Anton (display) + Inter (body) |

---

## Getting started

Requires **Node ≥ 20.19** (or ≥ 22.12) and npm.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check (tsc) + production build to dist/
npm run preview  # preview the production build locally
```

---

## Routes

| Path | Page |
| :-- | :-- |
| `/` | Hero + 3-step assessment + BMI calculator |
| `/philosophy` | Coaching philosophy & certifications |
| `/transformations` | Filterable before/after gallery |
| `/coaching` | Pricing tiers + feature comparison |
| `/apply` | Pre-screening form + calendar booking slot |
| `/tools` | BMR & TDEE calculators |
| `*` | 404 |

---

## Project structure

```
src/
  main.tsx            # entry: ThemeProvider + MotionConfig + App
  App.tsx             # router only (routes → pages)
  index.css           # Tailwind layers + :root/.dark design tokens + base focus styles
  config/
    siteContent.ts    # ALL copy, images, pricing, quiz & tool content (single source of truth)
    themeConfig.ts    # token values + fonts/radius/shadow (source of truth for theme)
  context/
    ThemeProvider.tsx # light/dark/system state, persistence, class on <html>
  hooks/
    useTheme.ts        usePageTitle.ts
  lib/
    motion.ts         # shared Framer variants
    quiz.ts           # pure assessment calculator (selections → blueprint)
    calculators.ts    # pure BMI / BMR / TDEE math + unit conversions
    cx.ts             # className join helper
  components/
    layout/           # Container, Section, Navbar, Footer, ThemeToggle, RootLayout
    ui/               # Button, Badge, Card, RotatingSeal, AnimatedCounter, BeforeAfter, CertIcon
    sections/         # Hero, Assessment, Philosophy, Transformations, Pricing, Booking,
                      #   SectionHeading, BmiTool, FitnessTools
    tools/            # SegmentedControl, MeasureField, BodyInputs, PersonInputs, ToolResult,
                      #   BmiCalculator, BmrCalculator, TdeeCalculator
  pages/              # HomePage, PhilosophyPage, TransformationsPage, CoachingPage,
                      #   ApplyPage, ToolsPage, NotFoundPage
```

---

## Architecture: content & theme decoupling

Two files drive the entire site.

### 1. `src/config/siteContent.ts`

Every string, image URL, link, price, quiz option, and tool label lives here, behind the typed `SiteContent` interface. Components consume it — they never embed copy. Rebranding the business is a matter of editing this one file (and swapping image URLs).

### 2. `src/config/themeConfig.ts` + CSS variables

Design tokens are defined as CSS custom properties in `src/index.css` under `:root` (light) and `.dark`, and mapped into Tailwind (`tailwind.config.ts`) so utilities like `bg-canvas`, `text-primary`, `bg-accent`, `border-border`, and `shadow-card` auto-swap with the theme. `themeConfig.ts` mirrors those values as the exported source of truth.

| Token | Light | Dark |
| :-- | :-- | :-- |
| `canvas` | `#F7F6F2` | `#141611` |
| `surface` | `#FFFFFF` | `#1D201A` |
| `text-primary` | `#1C1E1B` | `#F2F1EC` |
| `text-secondary` | `#5A6059` | `#A7ADA2` |
| `accent` (terracotta) | `#C25A33` | `#D77247` |
| `accent-support` (pine) | `#2D4030` | `#4C6B50` |
| `border` | `#E5E3DC` | `#2C2F27` |

To re-skin, edit the token values in `index.css` (and `themeConfig.ts`); every component updates automatically.

---

## Calculations (pure & testable)

Numeric logic is isolated in `src/lib/` as pure functions — no React, no side effects:

- **`quiz.ts`** — `computeBlueprint(selections)` → `{ calorieBaseline, frequency, timeline }`.
- **`calculators.ts`** — `calculateBMI`, `classifyBMI`, `calculateBMR` (Mifflin–St Jeor), `calculateTDEE`, plus `poundsToKilograms` / `feetInchesToCentimeters` for the imperial boundary.

Copy and option labels for these live in `siteContent.ts`; only the formula constants live in the lib.

---

## Integration points (stubbed)

No backend is included — these are the clearly marked hooks to wire up:

- **Assessment lead capture** — `captureLead()` in `components/sections/Assessment.tsx` logs the payload; replace with a CRM/webhook call.
- **Application form** — `captureApplication()` in `components/sections/Booking.tsx`; replace with your submission endpoint.
- **Calendar booking** — set `booking.calendlyUrl` in `siteContent.ts` to embed a scheduler; empty shows a graceful placeholder.

---

## Accessibility & motion

- Keyboard-navigable throughout with a consistent `:focus-visible` ring.
- Semantic landmarks (`header` / `main` / `footer`) and one `h1` per page.
- `prefers-reduced-motion` honored globally via `MotionConfig` — the seal freezes, counters jump to value, the before/after slider falls back to side-by-side, and section reveals are quiet (content is never gated behind an animation).

---

## Notes

- Placeholder imagery uses swappable Unsplash URLs defined in `siteContent.ts`.
- Dark mode is a warm charcoal by design — never pitch black.
