# Photopholio - Hardik's Eye 📸

[![Vercel Deploy](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://photopholio-omega.vercel.app/)

Welcome to **Photopholio**, a premium, cinematic web experience built for modern photography portfolios. Designed for visual impact, blazing-fast performance, and secure admin management.

**Live Demo:** [https://photopholio-omega.vercel.app/](https://photopholio-omega.vercel.app/)

## ✨ Key Features

-   **Cinematic Typography**: Utilizes `@chenglou/pretext` for advanced text mechanics, ensuring headers perfectly shrink-wrap and wrap without layout shift across all devices.
-   **Dynamic Admin Dashboard**: Secure authentication via `next-auth` to a private portal where you can upload, categorize, and manage portfolio photos.
-   **Edge Data**: Data driven by Prisma ORM backed by a powerful Vercel Postgres serverless database.
-   **Optimized Imagery**: Direct integration with `ImageKit.io` ensures perfect image delivery with automatic resizing, caching, and CDN distribution.
-   **Fully Responsive**: Perfectly orchestrated layouts leveraging masonry-style flexible grids that respect portrait vs landscape aspects natively on Mobile devices.
-   **E2E Authenticated Testing**: Built-in `Playwright` End-to-End tests ensuring the admin dashboard remains fortified and correctly redirects unauthenticated prying eyes.
-   **SEO Native**: Automatically configured sitemaps, OpenGraph image embeds, and metadata schema routing.

## 🛠 Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Styling**: TailwindCSS, `lucide-react`, Shadcn UI
-   **Database**: PostgreSQL via Prisma ORM
-   **Image Hosting**: ImageKit.io
-   **Authentication**: NextAuth.js
-   **Testing**: Playwright End-to-End
-   **Deployment**: Vercel Serverless Edge

## 🚀 Getting Started Locally

You will need a Vercel Postgres instance or local PostgreSQL string to run this platform locally.

**1. Clone the Source**
```bash
git clone https://github.com/kunal-gh/photopholio.git
cd photopholio
npm install
```

**2. Configure Environment Variables**
Create a `.env.local` file with the following setup (fill in your secrets!):
```env
# NextAuth
NEXTAUTH_SECRET="your_secret_key"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="secure_password"

# ImageKit
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_id/"
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="public_..."
IMAGEKIT_PRIVATE_KEY="private_..."

# Prisma Postgres (Vercel Integration Format)
POSTGRES_PRISMA_URL_PRISMA_DATABASE_URL="postgres://..."
POSTGRES_PRISMA_URL_POSTGRES_URL="postgres://..."
```

**3. Initialize Database**
```bash
npx prisma generate
npx prisma db push
```

**4. Run Development Server**
```bash
npm run dev
```

Navigate to `http://localhost:3000` to view the site. To test the secure photo-management flow navigate to `/admin/login`.

## 🧪 Running Tests

To verify that the administrative access controls are functioning successfully, run the automated Playwright E2E suite:
```bash
npx playwright test
```

## 📸 Developed for Hardik Studio
This codebase serves as a Next-Generation template specifically tailored to empower creative professionals with true digital asset control.
