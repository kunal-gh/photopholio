# Photopholio — Web Engineering Showcase 📸

[![Live](https://img.shields.io/badge/Live_on-Vercel-black?logo=vercel&style=for-the-badge)](https://photopholio-omega.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js_14-black?logo=next.js&style=for-the-badge)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&style=for-the-badge)](https://prisma.io/)
[![Vercel Postgres](https://img.shields.io/badge/Vercel_Postgres-000?logo=vercel&style=for-the-badge)](https://vercel.com/storage/postgres)

> A production-grade photography portfolio engineered to demonstrate elite front-end mechanics, serverless data pipelines, fluid typography, and dynamic CMS architecture — all live at [photopholio-omega.vercel.app](https://photopholio-omega.vercel.app/).

---

## 📸 Live Screenshots

### Homepage — Cinematic Hero
![Homepage Hero](./docs/screenshots/homepage-hero.png)

### Portfolio Grid — Adaptive Editorial Layout
![Portfolio Grid](./docs/screenshots/portfolio-grid.png)

### Footer
![Homepage Footer](./docs/screenshots/homepage-footer.png)

### Admin Portal — Secure Dark Mode Dashboard
![Admin Login](./docs/screenshots/admin-login.png)

---

## ✨ Engineering Vision

Modern web applications suffer from sluggish DOM re-flows, layout shifts (CLS), and rigid, uninspired aesthetics. This application was built to challenge those norms — operating at the intersection of complex typography mathematics, serverless data pipelines, and fluid responsive design.

---

## 🚀 Typography Innovation — `@chenglou/pretext`

Traditional responsive typography forces developers to choose between brittle `vw` units or heavy JavaScript DOM measurements (`getBoundingClientRect`) — both of which trigger **Layout Reflows**, the most expensive browser bottleneck.

**The solution:** This application completely bypasses the DOM for layout calculation.

Using `@chenglou/pretext`, the frontend leverages the browser's own hidden Canvas Font Engine as ground truth — measuring textual bounds **in memory**, before a single pixel is painted.

| Technique | Traditional CSS | `@chenglou/pretext` |
|---|---|---|
| Layout calculation | DOM reflow (expensive) | In-memory canvas arithmetic |
| Word-wrap | Unpredictable orphans | Mathematically precise |
| Animation support | Static, rigid | Line-by-line stagger possible |
| CLS score | High (shifts after paint) | Zero (calculates before DOM touch) |

---

## 🛠 Core Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | SSR + SSG, edge routing, file-based API |
| **Database** | Vercel Postgres + Prisma ORM | Type-safe serverless queries |
| **Media CDN** | ImageKit.io | On-the-fly WebP/AVIF, edge caching |
| **Typography** | `@chenglou/pretext` | Canvas-computed fluid headline layout |
| **Auth** | next-auth v4 + Edge Middleware | JWT session, server-side route protection |
| **Styling** | TailwindCSS + Shadcn UI | Token-based CSS, glassmorphism effects |
| **Testing** | Playwright E2E | Headless auth boundary tests |

---

## 🏗 Key Architecture Features

### Dynamic CMS — Admin Portal
A fully dark-mode, secure admin portal accessible at `/admin`:
- **Section Manager** — add, rename, delete photography sections; the public grid auto-adapts its mosaic layout to match
- **Photo Upload** — metadata-rich uploads (title, section, tags, event date, featured flag) via ImageKit CDN
- **Contact Inbox** — view messages from the contact form
- **Archive System** — deleted sections move photos to archive instead of destroying them
- **Edge Auth** — NextAuth middleware blocks unauthenticated dashboard requests before the page renders

### Adaptive Portfolio Grid
The frontend grid uses an **algorithmic layout engine** that reshapes itself based on section count:
- 1–2 sections → full-width editorial rows
- 3–4 sections → balanced wide/narrow split
- 5–6 sections → cinema-scale mosaic (flagship look)
- 7+ sections → clean uniform 3-column grid

### Glassmorphism Navigation
The header transitions from fully transparent at the top of the page to a live `backdrop-blur` translucent glass effect as the user scrolls — implemented via a scroll event listener and Tailwind conditional classes.

---

## 📱 Mobile Architecture
A custom masonry grid hook intercepts the client window object, dynamically degrading complex grid alignments into a thumb-accessible flow for localized touch targets. Instead of hiding desktop complexity, the layout is mathematically reconstructed per device.

---

*Developed as a strict display of modern full-stack web capabilities, layout mathematics, and edge computing.*
