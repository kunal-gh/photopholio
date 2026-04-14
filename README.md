# Photopholio — Web Engineering Showcase 📷

[![Live](https://img.shields.io/badge/Live_on-Vercel-black?logo=vercel&style=for-the-badge)](https://photopholio-omega.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js_14-black?logo=next.js&style=for-the-badge)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&style=for-the-badge)](https://prisma.io/)
[![Vercel Postgres](https://img.shields.io/badge/Vercel_Postgres-000?logo=vercel&style=for-the-badge)](https://vercel.com/storage/postgres)

> A production-grade photography portfolio engineered to demonstrate elite front-end mechanics, serverless data pipelines, fluid typography, a fully-responsive mobile-first layout, and dynamic CMS architecture — all live at [photopholio-omega.vercel.app](https://photopholio-omega.vercel.app/).

---

## 🌐 Engineering Vision

Modern web applications suffer from sluggish DOM re-flows, layout shifts (CLS), horizontal overflow on mobile, and rigid uninspired aesthetics. This application was built to challenge those norms — operating at the intersection of complex typography mathematics, serverless data pipelines, bulletproof responsive design, and editorial brutalism-inspired UI.

---

## 📱 Mobile-First Responsive Architecture

One of the most critical engineering decisions in this rebuild was achieving **pixel-perfect layout integrity across all mobile aspect ratios** — from compact Samsung A-series devices to iPhone Pro Max screens.

### Problems Solved
- **Horizontal overflow / sideways scrolling** — Eliminated globally via `box-sizing: border-box`, `overflow-x: hidden` on root, and auditing all fixed-width layout containers
- **Viewport zoom-out bug** — Fixed by exporting a proper `Viewport` config in `layout.tsx` (`width: device-width`, `initialScale: 1`, `userScalable: false`)
- **Admin portal white-right-void** — The `grid-cols-[380px,1fr]` fixed column caused a horizontal overflow on small screens; replaced with responsive `grid-cols-1 lg:grid-cols-[380px,1fr]`
- **Header overlap on mobile** — Replaced scroll+hover visibility logic with screen-width detection (`window.innerWidth < 768`) so the header is always visible on mobile (no hover events on touchscreens)
- **Back button overlap on portfolio pages** — Removed absolute-positioned back button; rebuilt as a document-flow inline element below the fixed header

### Immersive Mobile Navigation (Brutalist Editorial Style)

The mobile hamburger menu was completely redesigned, inspired by the editorial minimalism of [isadeburgh.com](https://isadeburgh.com/):

- **React Portal Injection**: The overlay is injected directly into `document.body` via `createPortal()`, completely bypassing layout containers that would otherwise clip `position: fixed` children through CSS transform containment
- **Explicit inline background** rather than CSS variables (which fail to cascade into portal-mounted nodes in mobile Chrome's rendering pass)
- **Massive right-aligned typography** — each nav link is rendered in `font-black` ultra-heavy grotesque at `56px+`, tightly stacked (`leading-[0.9]`, `tracking-tighter`), flushed to the right edge
- **Top-left CTA** — `TOUCH → GET IN` anchors to the contact section, mirroring the editorial portfolio style
- **Body scroll lock** — `document.body.style.overflow = "hidden"` while the menu is open prevents background jitter
- **Social footer row** — "Follow" label + icon row anchored to the bottom of the viewport

---

## 🔬 Typography & Cinematic Animations

Traditional responsive web typography relies on brittle `vw` math or rigid breakpoints.

**The Solution:** CSS `text-wrap: balance`, native line-height optics, and programmatic staggered React delays achieving mathematically perfect text-wrapping locally on the user's browser.

Paired with a **Focal-Pull Animation System** on hero images: an ultra-premium visual transition used by luxury brands to simulate camera-lens depth-of-field movement — un-blurring and scaling the image as it locks into focus.

---

## 🚀 Core Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | SSR + SSG, edge routing, file-based API |
| **Database** | Vercel Postgres + Prisma ORM | Type-safe serverless queries |
| **Media CDN** | ImageKit.io | On-the-fly WebP/AVIF, edge caching |
| **Typography/Animation** | Native CSS + React | `text-wrap: balance` & Focal-pull algorithms |
| **Auth** | next-auth v4 + Edge Middleware | JWT session, server-side route protection |
| **Styling** | TailwindCSS + Shadcn UI | Token-based CSS, glassmorphism effects |
| **Third-Party APIs** | Google Drive API | Direct OAuth Client-to-ImageKit bulk uploads |

---

## 🧩 Key Architecture Features

### Dynamic CMS — Admin Portal
A fully dark-mode, secure admin portal accessible at `/admin`:
- **Section Manager** — add, rename, delete photography sections; the public grid auto-adapts its mosaic layout to match
- **Photo Upload** — metadata-rich uploads (title, section, tags, event date, featured flag) via ImageKit CDN
- **Google Drive Integration** — stream assets directly from Google Drive to ImageKit via OAuth picker (no local download needed)
- **Contact Inbox** — view and manage messages from the contact form with unread indicators
- **Archive System** — deleted sections move photos to archive rather than destroying them
- **Edge Auth** — NextAuth middleware blocks unauthenticated dashboard access before the page renders
- **Fully Mobile Responsive** — sticky header, scrollable tab navigation, and responsive grid layout for on-the-go content management

### Intelligent Navigation Routing
Single-page anchor navigation (e.g., `#portfolio`) inherently litters UX history states and creates ugly URLs. This application features a sophisticated anchor-intercept wrapper that:
- Bypasses Next.js's memory router to execute smooth programmatic DOM scrolls
- Applies custom y-axis offsets so fixed headers never obscure section titles
- Sanitizes the URL bar (removes hash) for a clean browsing experience
- Tracks active section on scroll to highlight the correct nav link automatically

### Adaptive Portfolio Grid
The frontend uses an **algorithmic layout engine** that reshapes itself based on section count:
- 1–2 sections → full-width editorial rows
- 3–4 sections → balanced wide/narrow split
- 5–6 sections → cinema-scale mosaic (flagship look)
- 7+ sections → clean uniform 3-column grid

### Viewport-Safe Header
The header implements a hybrid show/hide strategy:
- **On desktop** — transparent at page top, reveals via `backdrop-blur` glass effect on scroll or when the cursor approaches the top of the viewport
- **On mobile** — always visible (no hover events on touchscreens), solid opaque background to prevent content bleed-through

---

## 📝 Recent Changelog

### v1.3 — Mobile Overhaul & Brutalist Navigation
- Fixed global horizontal overflow with `box-sizing` and `overflow-x` resets
- Added Next.js `Viewport` export to prevent mobile zoom-out bugs
- Admin dashboard: responsive header + scrollable tab bar
- Portfolio page: new document-flow back button replacing absolute positioning
- Rebuilt mobile navigation as full-screen editorial overlay via React Portal
- Fixed CSS variable cascade failure in portal context (mobile Chrome)
- Implemented body scroll lock on mobile menu open
- Header always shows on mobile to prevent layout gaps

### v1.2 — Editorial Grid & Typography
- Implemented algorithmic portfolio grid layout engine (1–7+ sections)
- Focal-pull hero animation system with blur + scale transitions
- PretextHeading component for staggered animated large text
- Testimonials carousel with Embla

### v1.1 — CMS & Admin Portal
- Admin dashboard: photo upload, sections, messages, testimonials management
- Google Drive OAuth picker integration
- Archive system for deleted sections
- NextAuth edge middleware for route protection

---

*Developed as a strict display of modern full-stack web capabilities, production-grade responsiveness, layout mathematics, and edge computing.*
