# Codebara 3D - Portfolio Website

## Project Overview
Codebara is a scroll-driven portfolio website for a code craftsman from Niš, Serbia. The site features 3 scroll-synced video clips with 4 distinct themed chapters, each with unique visual identity. Built with Next.js 14, GSAP ScrollTrigger, Framer Motion, and Tailwind CSS.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3.4
- **Animation:** Framer Motion 12 + GSAP ScrollTrigger
- **Fonts:** Syne (headings), JetBrains Mono (code/mono)
- **Language:** TypeScript

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run lint` - Run ESLint

## Architecture

### Scroll System
The entire site is a single `ScrollCapybaraStage` component with a tall container (`1200vh`) and a sticky viewport. GSAP ScrollTrigger tracks scroll progress (0-1) and drives:
- **Video playback:** 3 video clips mapped to progress ranges (0-0.333, 0.333-0.666, 0.666-1)
- **Chapter transitions:** 4 chapters with scroll ranges (0-0.25, 0.25-0.5, 0.5-0.75, 0.75-1)
- **Element animations:** Per-element enter/exit via `useScrollElement` hook

### Key Files
```
src/
├── app/
│   ├── page.tsx              # Root page (Navbar + ScrollCapybaraStage)
│   ├── layout.tsx            # Font loading (Syne + JetBrains Mono)
│   └── globals.css           # CSS vars, chapter backgrounds, masks, animations
├── components/
│   ├── ScrollCapybaraStage.tsx  # Main scroll controller, video system, progress bar
│   ├── Navbar.tsx               # Fixed nav with music player
│   ├── MusicPlayer.tsx          # Audio player with volume slider
│   ├── useScrollElement.ts      # Scroll-driven animation hook
│   ├── CapybaraSVG.tsx          # SVG capybara illustration
│   └── chapters/
│       ├── ChapterVoid.tsx      # Section 1: Hero (capybara brand colors)
│       ├── ChapterBuild.tsx     # Section 2: Services (hacker/terminal green)
│       ├── ChapterWork.tsx      # Section 3: Portfolio (coffee/chill warm tones)
│       └── ChapterConnect.tsx   # Section 4: Contact form (clean, capybara accent)
├── data/
│   └── chapters.ts           # Chapter config, services, portfolio data
public/
├── videos/                   # 1-2.mp4, 2-3.mp4, 3-4.mp4 (scroll-driven clips)
└── audio/
    └── jazz.mp3              # Background music (loops, autoplay at 8% volume)
```

### useScrollElement Hook
Central animation hook at `src/components/useScrollElement.ts`. Drives opacity, x/y position, scale, and blur based on scroll progress.

**Parameters:** `(progress, direction, enter, full, exitStart, exitEnd)`
- `enter` → `full`: Element fades/slides in
- `full` → `exitStart`: Element stays visible
- `exitStart` → `exitEnd`: Element fades/slides out

**Critical patterns:**
- Use `enter=-1, full=-0.5` for elements that should be visible immediately (ChapterVoid)
- Use `exitStart=2, exitEnd=3` for elements that should never exit (ChapterConnect - last section)
- NEVER use identical values for enter/full or exitStart/exitEnd — this creates degenerate `useTransform` behavior causing flash bugs
- Each chapter has its OWN MotionValue (chapterProgress0-3). Inactive chapters are set to a value that puts elements at opacity 0

### Chapter Themes & Colors
| Section | Name | Component | Accent Color | Style |
|---------|------|-----------|-------------|-------|
| 1 | VOID | ChapterVoid | `capybara` (#C4813A) | Brand intro, clean |
| 2 | BUILD | ChapterBuild | `hacker` (#00FF41) | Terminal/hacker, monospace |
| 3 | WORK | ChapterWork | `coffee` (#A67C52) | Warm, chill, Syne font |
| 4 | CONNECT | ChapterConnect | `capybara` (#C4813A) | Clean form, subtle |

### Color Palette (Tailwind + CSS vars)
- `onyx`: #0D0B09 (background)
- `capybara`: #C4813A (brand primary)
- `cream`: #F0E6D2 (text)
- `terminal`: #4EC99A (green accent)
- `hacker`: #00FF41 (matrix green - section 2)
- `coffee`: #A67C52 (warm brown - section 3)
- `latte`: #D4A574 (light coffee)
- `gold`: #E8A84E (gold accent)
- `orange`: #FF8C42 (unused, was section 4)
- `aqua`: #5BC0EB (unused, was section 4)

## Known Issues & Patterns

### Flash on Chapter Switch
The biggest recurring bug. When switching chapters, elements from the old chapter can flash for 1 frame. Root causes:
1. **Shared MotionValue** — Fixed by giving each chapter its own MotionValue
2. **Degenerate useTransform** — `[..., 1, 1]` or `[0, 0, ...]` input ranges cause undefined interpolation. Use values that are slightly different or unreachable (e.g., `2, 3`)
3. **Container visibility** — Using `opacity: active ? 1 : 0` (instant, no CSS transition) instead of `visibility: hidden`
4. **Wrong reset value** — ChapterVoid has `enter=-1` so resetting to 0 leaves elements visible. Reset to 1 instead (past exitEnd)

### Video Transitions
Videos switch instantly (no fade/transition) to avoid black frame during crossfade. Background glow also switches instantly.

### Nav Anchor Positions
Anchors are offset forward from chapter start so navigation lands when content is already visible:
- hero: 0%, services: 34%, work: 58%, contact: 98%

### Scrollbar
Browser scrollbar is hidden. Custom progress bar on the right side shows scroll position with color-coded fill per chapter.

### Nav Scroll with Lenis
Lenis smooth scroll intercepts `scrollIntoView` and `window.scrollTo({behavior: "smooth"})`. Use instant `window.scrollTo(0, top)` and let Lenis handle smoothing. Also use `requestAnimationFrame` to defer scroll after React re-renders (e.g., closing mobile menu).

### Responsive Layout
- **ChapterVoid (Hero):** On mobile, tech tags ("Code Craftsman" + Spring Boot/React/DevOps) stack below the title instead of floating right. Tagline and CTA button are vertically separated (bottom-[24%] and bottom-[12%]).
- **ChapterWork (Portfolio):** Header "Recent Work" uses smaller font on mobile (text-3xl vs text-7xl). Cards start at top-[28%] on sm+ to avoid overlap with description text.
- **ChapterConnect (Contact):** On mobile (below lg), left column is hidden and the form includes its own title + subtitle + status. On lg+, two-column layout with left info + right form.
- **Navbar:** Active nav item is colored per chapter theme. Gap reduces on tablet (gap-4 vs gap-8). CTA button has min-w-[130px] to prevent layout shift on label change.

## Style Guidelines
- Cards use `bg-[#1a1714]/90 backdrop-blur-md border-white/15` (sections 2-3) or `bg-white/[0.03] backdrop-blur-md` (section 4)
- Section 2 (BUILD) uses monospace font everywhere, terminal-style cards with title bars
- Section 3 (WORK) uses Syne font, warm coffee palette, italic descriptions
- Section 4 (CONNECT) is clean/minimal with underline-style labels and capybara send button
- Text contrast: labels `cream/90-cream`, body `cream/70`, subtle `cream/50`, placeholder `cream/50`
- No floating particles or scroll indicators
