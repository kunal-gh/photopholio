# Photopholio — The Complete Open-Source Photography CMS 📷

[![Next.js](https://img.shields.io/badge/Next.js_14-black?logo=next.js&style=for-the-badge)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&style=for-the-badge)](https://prisma.io/)
[![Database](https://img.shields.io/badge/Database-SQLite_/_Postgres-000?style=for-the-badge)](#)
[![ImageKit](https://img.shields.io/badge/ImageKit.io-CDN-blue?style=for-the-badge)](https://imagekit.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&style=for-the-badge)](https://tailwindcss.com/)

Welcome to **Photopholio**! A fully featured, production-grade photography portfolio and content management system (CMS) designed specifically for visual artists. 

If you're a developer looking for a comprehensive template to build a client portfolio, or a photographer wanting to self-host an elegant gallery, you have found the ultimate starting point.

---

## 🌟 Table of Contents
1. [Overview & Features](#-overview--features)
2. [Tech Stack Breakdown](#-tech-stack-breakdown)
3. [System Architecture](#-system-architecture)
4. [Folder Structure](#-folder-structure)
5. [Installation & Setup Guide](#-installation--setup-guide)
6. [Environment Variables Dictionary](#-environment-variables-dictionary)
7. [The Admin CMS Workflow](#-the-admin-cms-workflow)
8. [Database Schema](#-database-schema)
9. [Deployment Guide](#-deployment-guide)
10. [Contribution Guidelines](#-contribution-guidelines)

---

## 📸 Overview & Features

Photopholio is split into two perfectly synced applications within one Next.js project:

### 1. The Public Portfolio
- **Cinematic Hero Display:** An animated focal-pull slider showcasing featured images.
- **Adaptive Mosaic Grid:** The portfolio gallery intelligently reshapes itself based on how many categories/sections exist.
- **Mobile-First Excellence:** Flawless touch experiences, hidden horizontal overflows, and swipeable carousels.
- **Client Testimonials:** A verified review section that builds trust.
- **Interactive Contact Flow:** A stunning contact form wired directly to the backend database.

### 2. The Admin CMS Portal (`/admin`)
- **Real-Time Uploads:** Post photos directly from your smartphone or desktop securely to an ImageKit CDN.
- **Google Drive Integration:** Bulk import photos effortlessly.
- **Categorization:** Build dynamic sections (e.g., "Weddings", "Portraits", "AI Art").
- **Inbox Management:** Read and reply to client inquiries natively.
- **Site-wide Settings Engine:** Change your email, phone, and social links instantly across the entire public site.

---

## 🚀 Tech Stack Breakdown

This project utilizes the bleeding edge of the React ecosystem:

| Technology | Role | Why It Was Chosen |
|---|---|---|
| **Next.js 14 (App Router)** | Full-Stack Framework | Provides unparalleled SSR performance, seamless API routes, and Server Components for shipping zero JS where possible. |
| **Prisma ORM** | Database Toolkit | Incredible type-safety. Changing a column in the DB instantly reflects throughout the entire TypeScript codebase. |
| **SQLite / Postgres** | Database Engine | Configured out of the box for lightweight SQLite development, but entirely compatible with Vercel Postgres or Supabase for production. |
| **ImageKit.io** | Media Delivery Network | Serves heavily unoptimized RAW/JPEG uploads as compressed, next-gen WebP/AVIF formats on the fly via global edge servers. |
| **NextAuth.js v4** | Security | Handles session management and protects the `/admin` routes via edge-compatible middleware. |
| **TailwindCSS & Shadcn UI** | Design System | Enables rapid, beautiful UI construction with a dark-mode first, glassmorphic aesthetic. |

---

## 🏗 System Architecture

Photopholio implements a robust edge-to-database upload pipeline:

1. **Authentication:** The client requests a secure signature from `/api/imagekit/auth`.
2. **Direct Upload:** The browser pushes the heavy image file directly to the ImageKit edge, bypassing the Next.js server entirely (saving bandwidth and preventing timeouts).
3. **Metadata Storage:** ImageKit responds with a permanent URL and `fileId`, which Next.js immediately commits to the SQL database using Prisma.
4. **Data Syncing:** The public UI relies on an aggressive 30-second polling `DataProvider` so uploads on mobile instantly appear on the desktop gallery without refreshing.

---

## 📂 Folder Structure

```
photopholio/
├── prisma/
│   └── schema.prisma         # Database models and schema definition
├── scripts/                  # Standalone node scripts
│   ├── seed-full.js          # Massive mock-data generation script
│   └── seed-script.js        # Basic setup script
├── docs/                     # Additional documentation
│   └── ui_analysis.md        # Design system rationale
├── public/                   # Static assets
└── src/
    ├── app/                  # Next.js App Router root
    │   ├── admin/            # CMS Dashboard routes
    │   ├── api/              # Backend serverless functions
    │   ├── portfolio/        # Dynamic gallery routes
    │   ├── layout.tsx        # Global HTML shell & context providers
    │   └── page.tsx          # The public homepage
    ├── components/           # Reusable React components (Shadcn UI + Custom)
    └── lib/                  # Utilities, Prisma Client, and Data Providers
```

---

## ⚙️ Installation & Setup Guide

Want to run this yourself? Follow these steps exactly:

### Prerequisites
- Node.js 18+ installed
- Git installed
- An [ImageKit.io](https://imagekit.io) free account

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/photopholio.git
cd photopholio
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Setup
Duplicate the example environment file:
```bash
cp .env.example .env.local
```
*(Open `.env.local` and fill in your ImageKit credentials, NextAuth Secret, and Admin login preferences. See the Dictionary below.)*

### Step 4: Initialize the Database
By default, the project uses SQLite, so you don't need a heavy database server. Just push the schema:
```bash
npx prisma db push
```

*(Optional) If you want to see the UI immediately with beautiful sample data:*
```bash
node scripts/seed-full.js
```

### Step 5: Start Development
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the site, and `http://localhost:3000/admin` to log in!

---

## 🗝️ Environment Variables Dictionary

Your `.env.local` file requires the following keys:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Connection string. Set to `file:./dev.db` for SQLite, or a standard Postgres URL. |
| `NEXTAUTH_SECRET` | A random 32-character string used to encrypt JWT tokens. Generate with `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | The base URL of your site (e.g., `http://localhost:3000`). |
| `ADMIN_USERNAME` | The username you will use to log into `/admin`. |
| `ADMIN_PASSWORD` | The password you will use to log into `/admin`. |
| `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY` | Available in your ImageKit Developer dashboard. |
| `IMAGEKIT_PRIVATE_KEY` | Available in your ImageKit Developer dashboard. Never share this! |
| `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` | E.g., `https://ik.imagekit.io/your-unique-id`. |

---

## 🎛️ The Admin CMS Workflow

1. **Login:** Head to `/admin/login`.
2. **Settings:** Navigate to the "Settings" tab first. Update the Photographer name, email, and social links. This instantly populates the site footer and contact form.
3. **Sections:** Create categories like "Wedding", "Editorial", or "Black & White".
4. **Upload:** Go to "Gallery" and upload a new photo. Assign it to a Section, give it tags, and tick "Featured" if you want it in the Homepage Hero Slider.
5. **Testimonials:** Add glowing reviews from clients to populate the rotating carousel.

---

## 🗺️ Database Schema

The Prisma database uses the following core entities:

- **Photo:** Central entity tracking image URLs, `ImageKitFileId` (for deletion), resolution, and relationships to Sections.
- **Section:** Grouping entity for Photos.
- **Testimonial:** Client reviews and star ratings.
- **Contact:** Messages sent from the public form.
- **Setting:** A singleton table storing site-wide configuration.

---

## ☁️ Deployment Guide

Photopholio is optimized for zero-config deployment on Vercel.

1. **Database Conversion:** Before deploying, switch the database provider in `prisma/schema.prisma` from `"sqlite"` to `"postgresql"`.
2. **Vercel Postgres:** Create a Vercel Postgres database in the Vercel dashboard and link it to your project.
3. **Environment Variables:** Copy all your ImageKit, Admin, and NextAuth variables into the Vercel environment settings.
4. **Deploy:** Push your code to GitHub, connect the repository to Vercel, and click deploy! The `build` script in `package.json` will automatically generate the Prisma client and push your schema to Postgres.

---

## 🤝 Contribution Guidelines

This project is fully open source. We welcome issues, bug fixes, and feature additions!

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes.
4. Open a Pull Request!

When contributing, please ensure:
- You run `npm run lint` before committing.
- Do not commit `.env` files or API secrets.
- Test your layout changes on mobile viewports.

---

*Engineered with precision for photographers who demand excellence.*
