# Photopholio — Photography Portfolio & CMS 📷

[![Live](https://img.shields.io/badge/Live_on-Vercel-black?logo=vercel&style=for-the-badge)](https://photopholio-omega.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js_14-black?logo=next.js&style=for-the-badge)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&style=for-the-badge)](https://prisma.io/)
[![Vercel Postgres](https://img.shields.io/badge/Vercel_Postgres-000?logo=vercel&style=for-the-badge)](https://vercel.com/storage/postgres)
[![ImageKit](https://img.shields.io/badge/ImageKit.io-CDN-blue?style=for-the-badge)](https://imagekit.io/)

> A production-grade photography portfolio and content management system built with Next.js 14, Prisma, Vercel Postgres, and ImageKit CDN. Supports real-time photo uploads from mobile and desktop, a full admin dashboard, testimonials, contact inbox, and a dynamic public gallery — all live at [photopholio-omega.vercel.app](https://photopholio-omega.vercel.app/).

---

## 🌐 What This Project Does

This is a full-stack photography website with two main surfaces:

1. **Public Portfolio** — A beautifully designed website with animated hero, editorial portfolio grid, testimonials carousel, and a contact form. The entire site is driven by data from a Postgres database — photos, testimonials, and contact info all update in real time from the admin panel.

2. **Admin CMS Portal** (`/admin`) — A private, password-protected dashboard where the photographer can upload photos from phone or desktop, manage sections, read client messages, manage testimonials, and update site-wide settings.

---

## 🚀 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | SSR, API routes, file-based routing |
| **Database** | Vercel Postgres + Prisma ORM | Type-safe serverless queries |
| **Media CDN** | ImageKit.io | On-the-fly image delivery, WebP/AVIF, edge caching |
| **Auth** | next-auth v4 + Middleware | JWT session, server-side route protection |
| **Styling** | TailwindCSS + Shadcn UI | Design system, dark mode, glassmorphism |
| **Animations** | Native CSS + React | Staggered entrances, focal-pull hero effect |
| **Google Drive** | Google Picker API | Direct OAuth asset imports from Drive to ImageKit |

---

## 📱 Mobile-First Architecture

Every page was designed and stress-tested on real mobile devices. Key engineering decisions:

- **No horizontal overflow** — `overflow-x: hidden` enforced at body level; all fixed-width containers use responsive breakpoints
- **Header always visible on mobile** — detects touch screens via `window.innerWidth < 768` so the nav never disappears on scroll
- **Viewport meta** — explicit `Viewport` export prevents mobile browsers from zooming out to "desktop mode" when any element overflows
- **Carousel arrows hidden on mobile** — Embla carousel prev/next arrows positioned outside the container were causing layout bleed; hidden on `< md` screens (mobile users swipe natively)
- **Admin tab scrolling** — horizontal tab bar in the admin dashboard uses `overflow-x-auto` with padding so all tabs are always reachable

### Mobile Menu (Editorial Overlay)

The full-screen mobile nav was designed in the style of editorial photography portfolios:

- Injected as a direct DOM sibling via the layout component (bypasses CSS containment clipping in nested components)
- Explicit `position: fixed; inset: 0` with inline background colour (CSS variables fail to cascade across certain render contexts in mobile Chrome)
- Navigation links rendered in heavy `font-black` uppercase, 40–56px, right-aligned
- Body scroll locked while menu is open
- Social icons pinned to the bottom of the viewport

---

## 🗄️ Database & Upload Pipeline

### Photo Upload Flow

```
User picks file (phone or desktop)
        ↓
Frontend calls /api/imagekit/auth  ←── Server generates signed token from IMAGEKIT_PRIVATE_KEY
        ↓
IKUpload component sends file directly to ImageKit CDN
        ↓
onUploadSuccess receives { url, fileId, width, height }
        ↓
Frontend POSTs metadata to /api/photographs  ←── Saves to Vercel Postgres via Prisma
        ↓
Gallery refreshes and shows new photo
```

### Cross-Device Sync

The `DataProvider` context polls `/api/photographs`, `/api/testimonials`, and `/api/settings` every **30 seconds**. This means a photo uploaded from a phone will appear on the desktop gallery automatically within 30 seconds — no refresh needed.

### Case-Insensitive Section Matching

Sections are stored in Postgres with their display name (e.g. `"Portrait"`, `"AI Art"`), but URL slugs are lowercase kebab-case (e.g. `/portfolio/portrait`, `/portfolio/ai-art`). Three layers of case-insensitive matching were added to prevent galleries from appearing empty:

1. **Prisma query** — uses `mode: 'insensitive'` so `WHERE section = 'portrait'` matches `"Portrait"`
2. **DataProvider filter** — compares both lowercased name and slugified name
3. **Homepage cover picker** — matches photos to sections using slug fallback

---

## 🧩 Admin Portal Features

Accessible at `/admin` (password protected via NextAuth):

| Feature | Details |
|---|---|
| **Photo Upload** | Upload from device or import from Google Drive; add title, section, description, tags, event date, featured flag |
| **Gallery Management** | Browse all photos by section; delete individual photos (also removes from ImageKit) |
| **Section Manager** | Create, rename, delete sections; grid layout auto-adapts to section count |
| **Contact Inbox** | View all contact form submissions with unread badge count |
| **Testimonials** | Add and manage client testimonials shown in the public carousel |
| **Site Settings** | Update photographer email, phone, social links (used across the public site) |
| **Mobile Responsive** | Admin portal fully usable on any phone — sticky header, scrollable tabs, touch-friendly inputs |

### Upload Form Improvements

- Form validation errors now display **inline inside the upload card**, not as floating corner toasts
- "Mark as Featured" uses a custom toggle button (not a native checkbox) for reliable mobile touch support
- ImageKit auth errors are surfaced with the exact API error message to aid debugging

---

## 🔐 Authentication

- `next-auth` with credentials provider (email + password)
- Middleware protects all `/admin/*` routes — unauthenticated requests redirect to `/admin/login`
- ImageKit auth endpoint (`/api/imagekit/auth`) validates session before returning signed upload tokens

---

## 🎨 Public Site Features

### Hero Section
- Full-screen image slideshow of **featured** photos pulled from the database
- Focal-pull animation: images scale and un-blur as they come into focus (cinema depth-of-field effect)
- Staggered animated heading with word-by-word slide-up entrance

### Portfolio Grid
- Algorithmic layout engine that reshapes based on section count:
  - 1–2 sections → full-width editorial rows
  - 3–4 sections → balanced wide/narrow split
  - 5–6 sections → cinema-scale mosaic (flagship look)
  - 7+ sections → clean uniform 3-column grid
- Cover image for each section auto-selects the first uploaded photo

### Testimonials
- Embla-powered carousel with drag-to-scroll on mobile
- Star ratings, author avatars, verified source link
- Fully managed from the admin panel

### Contact Form
- Submissions saved to Postgres and visible in the admin inbox
- Shows admin's real-time phone, email, and social links from the settings table

### Navigation
- Smooth anchor scrolling with programmatic y-offset (header height accounted for)
- Active section highlight updates as you scroll
- URL hash is sanitised after scroll to keep the address bar clean

---

## 📝 Changelog

### v1.5 — Mobile Logo & Section Visibility Fix
- Fixed "Through Hardik's Eye" subtitle hidden on all phones due to `hidden sm:inline-block` CSS class
- Logo now stacks vertically on mobile (THE / Through Hardik's Eye)

### v1.4 — Critical Gallery & Cross-Device Sync Fix
- Portfolio galleries were appearing empty due to case-sensitive section name matching
- Fixed at all three layers: Prisma query, DataProvider filter, homepage cover picker
- Added 30-second polling to DataProvider for automatic cross-device sync
- Photos uploaded from mobile now automatically appear on desktop gallery

### v1.3 — Mobile Viewport & Upload Pipeline Fixes
- ImageKit auth route now initialises inside request handler (not at module level) to prevent build crashes when environment variables are missing
- Added detailed error messages to ImageKit auth — exact API errors shown in the upload form
- Carousel prev/next arrows hidden on mobile to prevent layout bleed and viewport zoom
- `overflow-x: hidden` added to body to prevent mobile browser from switching to desktop mode
- Mobile menu font size capped to prevent text exceeding screen width
- Admin dashboard upload form validation errors moved from corner toasts to inline card errors
- "Mark as Featured" replaced with custom button toggle for reliable mobile touch
- Section dropdown re-syncs when switching between Gallery and Sections tabs

### v1.2 — Backend Data Persistence
- All API routes now export `dynamic = 'force-dynamic'` to disable Vercel's static cache
- Photos, testimonials, contacts, and settings now always reflect live database state
- Fixed silent data loss: `imageKitFileId` was being received and stored correctly; sections now persist after upload

### v1.1 — Mobile Navigation Overhaul
- Rebuilt mobile menu as a direct layout sibling (removed portal approach that caused Chrome render issues)
- Fixed header always showing on mobile devices
- Admin portal tab bar made horizontally scrollable with visible padding

### v1.0 — Initial Launch
- Full-stack portfolio site with Next.js 14, Prisma, Vercel Postgres, ImageKit CDN
- Admin CMS with photo upload, section management, testimonials, contact inbox
- Editorial portfolio grid with adaptive mosaic layout
- PretextHeading component with staggered word animations
- Google Drive OAuth integration for bulk imports
- NextAuth credential auth with middleware route protection

---

## 🛠️ Local Development

```bash
# Clone the repo
git clone https://github.com/kunal-gh/photopholio.git
cd photopholio

# Install dependencies
npm install

# Set up environment variables (see .env.example)
cp .env.example .env.local

# Push database schema
npx prisma db push

# Start dev server
npm run dev
```

### Required Environment Variables

```env
# Database
POSTGRES_PRISMA_URL_PRISMA_DATABASE_URL=...
POSTGRES_PRISMA_URL_POSTGRES_URL=...

# Auth
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://your-domain.vercel.app
ADMIN_EMAIL=...
ADMIN_PASSWORD=...

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-id

# Google Drive (optional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...
NEXT_PUBLIC_GOOGLE_API_KEY=...
```

---

*Built with care for photographers who deserve a website as polished as their work.*
