# Torren Technical — 3D Web Experience

A cinematic, immersive 3D website for **Torren Technical** — engineer-led technical
sourcing for Australian industry. Built to feel like entering a defence-technology
control centre, not a recruitment site.

> *"Engineer-led sourcing for the roles other recruiters can't fill."*

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **React Three Fiber** + **Three.js** + **@react-three/drei** + **@react-three/postprocessing** (Bloom / Vignette)
- **GSAP** + **ScrollTrigger** (scroll-driven camera + section choreography)
- **Lenis** (smooth scroll, synced to the GSAP ticker)
- **Framer Motion** (UI motion)
- **Tailwind CSS** (dark-luxury design system)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Experience map

| Section | What happens |
| --- | --- |
| **Hero** | Rotating holographic Australian industrial network (R3F). Camera dollies through the network on scroll; headline assembles from blueprint wireframes. |
| **01 · The Problem** | Thousands of candidate particles drift as noise, then collapse into a focused signal column as you scroll. |
| **02 · The Method** | A 5-stage pipeline that physically builds itself — the conduit fills and nodes light up with scroll progress. |
| **03 · Disciplines** | Six interactive sectors, each with discipline-specific animated technical schematics. |
| **04 · Why Torren** | Holographic comparison — Traditional vs Torren across five metrics. |
| **05 · National Network** | A 3D map of Australia (R3F) with pulsing industry hubs and parallax tilt. |
| **06 · Technical Authority** | HUD metric cards with scan-line and bracket framing. |
| **Engage** | Brief-a-role / register-CV channels. |
| **Final CTA** | The network converges into a single glowing core (R3F). |

## Design system

Defined in `tailwind.config.ts` and `src/app/globals.css`:

- **Palette** — matte black / charcoal / graphite / gunmetal / titanium with electric-cyan and signal-blue accents.
- **Surfaces** — frosted glass panels, blueprint grid overlays, corner brackets, radial fades.
- **Type** — Inter (display) + JetBrains Mono (technical/eyebrow).

## Performance & accessibility

- `usePerformanceTier()` scales particle counts, DPR, and post-processing for mobile / low-core devices.
- `prefers-reduced-motion` is honoured: Lenis smoothing is disabled and 3D animation is calmed.
- All 3D canvases are dynamically imported (`ssr: false`) so the document renders and is crawlable without WebGL.
- `AdaptiveDpr` and capped device pixel ratio protect the frame budget.

## Structure

```
src/
  app/            layout, page, globals, robots, sitemap
  components/
    three/        HeroNetwork, SignalField, AustraliaMap, ConvergingCore
    sections/     Problem, Method, Disciplines, WhyTorren, AustraliaMap, Authority, Engage, FinalCTA
    ui/           SectionHeading, Schematic
    Navbar, Footer, SmoothScroll, Hero
  lib/            content (copy + data), hooks, gsap
```
