# Sebastian Coteanu — Personal Portfolio

A single-page, portfolio built with **Next.js 14 App Router**, **TypeScript**, **TailwindCSS**, and **Framer Motion**. Includes an optional 3D morphing blob accent powered by React Three Fiber.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run in development mode
npm run dev
# → open http://localhost:3000

# 3. Build for production (static export for GitHub Pages)
npm run export
# → creates /out directory with static HTML/CSS/JS

# 4. Deploy to GitHub Pages
# See DEPLOY.md for full instructions (automatic via GitHub Actions)
```

---

## 🚀 Deployment

This site is configured for **GitHub Pages** deployment. See **[DEPLOY.md](./DEPLOY.md)** for:

- Automatic deployment via GitHub Actions (push to `main` → auto-deploy)
- Manual deployment options
- Custom domain setup
- Troubleshooting

**TL;DR:** Push to GitHub, enable GitHub Pages with "GitHub Actions" as the source, done.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — dark-mode hydration script, metadata
│   └── page.tsx            # Main page — composes all sections
├── components/
│   ├── BackgroundBlobs.tsx # Fixed animated gradient blobs (background layer)
│   ├── ContactSection.tsx  # Contact CTA + social links
│   ├── EducationSection.tsx# Education, certifications, hackathons
│   ├── ExperienceSection.tsx# Timeline with role cards (also exports shared helpers)
│   ├── Footer.tsx          # Minimal footer
│   ├── Hero.tsx            # Hero: name, title, summary, CTAs, 3D blob
│   ├── HeroBlob.tsx        # 3D scene (lazy-loaded, Three.js + R3F)
│   ├── HighlightsSection.tsx# Achievement cards grid
│   ├── Navbar.tsx          # Sticky nav with active-section indicator + theme toggle
│   ├── SkillsSection.tsx   # Skill buckets with animated chips
│   └── WorkSection.tsx     # GitHub repo cards
├── hooks/
│   ├── useActiveSection.ts # Tracks which section is scrolled into view
│   ├── useScrollReveal.ts  # IntersectionObserver → triggers Framer Motion
│   └── useTheme.ts         # Dark/light toggle, persisted in localStorage
├── content.ts              # ★ SINGLE SOURCE OF TRUTH — edit all text here
└── globals.css             # Global styles, CSS variables, utility classes
```

---

## How to Edit Content

**All site text lives in `src/content.ts`.**  Open it and update the exported objects:

| Object            | What it controls                                        |
|-------------------|---------------------------------------------------------|
| `hero`            | Name, title, location, summary, CTA buttons             |
| `experience`      | Timeline roles — add/remove/reorder entries             |
| `highlights`      | Achievement cards (icon emoji + title + description)    |
| `skills`          | Skill buckets and their chip lists                      |
| `repos`           | GitHub repo cards (name, description, language, URL)    |
| `education`       | Degree entries                                          |
| `certifications`  | Cert entries                                            |
| `hackathons`      | Hackathon entries                                       |
| `contact`         | Email, GitHub URL, LinkedIn URL, optional phone         |

### Adding a new experience role

```ts
// In src/content.ts → experience array:
{
  company: 'New Company',
  role: 'Your Title',
  period: 'Jan 2024 – Present',
  startYear: 2024,
  endYear: 2025,
  isCurrentRole: true,
  bullets: [
    'First achievement...',
    'Second achievement...',
  ],
  tags: ['React', 'TypeScript'],
},
```

---

## Changing the Theme / Accent Colors

Open `src/globals.css` and edit the CSS custom properties under `:root` (light) and `.dark` (dark).

Key variables:

| Variable              | Default                | Role                              |
|-----------------------|------------------------|-----------------------------------|
| `--accent`            | `#3b82f6` (blue)       | Primary accent — buttons, links   |
| `--accent-purple`     | `#8b5cf6`              | Secondary accent — gradients      |
| `--amber`             | `#f59e0b`              | Tertiary accent — used sparingly  |
| `--bg-base`           | Light / dark surface   | Page background                   |
| `--bg-card`           | Card surface           | Glass card backgrounds            |

For a different accent palette, just change `--accent` and `--accent-purple`. The gradient borders and glow effects will update automatically.

---

## Toggling / Replacing the 3D Element

The 3D blob lives in `src/components/HeroBlob.tsx` and is **lazy-loaded** via `React.lazy()` in `Hero.tsx`.

### To disable it entirely

In `src/components/Hero.tsx`, find the `useEffect` that sets `use3D`:

```ts
// Simply never set use3D to true:
useEffect(() => { /* remove the setUse3D(true) call */ }, []);
```

The site will automatically show the static SVG fallback instead.

### To swap in a different 3D scene

Replace the contents of `HeroBlob.tsx` with your own `<Canvas>` scene. The export must be a default-exported React component. The lazy-loading and fallback logic in `Hero.tsx` handles everything else.

### Graceful degradation (automatic)

- If `prefers-reduced-motion` is enabled → static SVG fallback shown
- If WebGL is not supported → static SVG fallback shown
- The 3D canvas is `position: absolute` inside a sized container, so it never affects layout

---

## Animation Reference

| Pattern                    | Where                        | Implementation                                      |
|----------------------------|------------------------------|-----------------------------------------------------|
| Scroll reveal              | All sections                 | `useScrollReveal` hook → Framer Motion `animate`    |
| Staggered children         | Highlights, Skills, Repos    | `delay: i * 0.1` per child                          |
| Card hover lift + shadow   | All glass cards              | CSS `.glass-card:hover` — `translateY(-2px) scale`  |
| Spotlight cursor effect    | Experience + Highlights cards| `onMouseMove` → CSS custom properties → radial-gradient |
| Nav active pill            | Navbar                       | Framer Motion `layoutId` animated indicator         |
| Theme icon spin            | Navbar toggle                | Framer Motion `AnimatePresence` rotate transition   |
| Skill chip pop             | Skills section               | Spring-eased scale + translateY per chip            |
| `prefers-reduced-motion`   | Global CSS + Hero            | Replaces transforms with opacity-only fades         |

---

## Performance Notes

- 3D blob is code-split via `React.lazy` — zero cost if WebGL is unavailable
- Background blobs use CSS animations (GPU-composited `transform` only)
- Noise overlay is a tiny inline SVG pattern — zero JS cost
- All scroll animations fire once (`observer.unobserve` after trigger)
- Fonts are loaded via Google Fonts `&display=swap` for CLS safety
