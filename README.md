# Photopholio — The Ultimate Open-Source Photography CMS 📷

[![Next.js](https://img.shields.io/badge/Next.js_14-black?logo=next.js&style=for-the-badge)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&style=for-the-badge)](https://prisma.io/)
[![Database](https://img.shields.io/badge/Database-SQLite_/_Postgres-000?style=for-the-badge)](#)
[![ImageKit](https://img.shields.io/badge/ImageKit.io-CDN-blue?style=for-the-badge)](https://imagekit.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&style=for-the-badge)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

Welcome to **Photopholio**, the definitive, production-ready photography portfolio and content management system (CMS). Built from the ground up to empower visual artists, photographers, and creatives, Photopholio provides a seamless, beautiful, and highly performant way to showcase your work to the world.

Whether you are a developer looking for an advanced full-stack Next.js template to build a client's website, or a photographer wanting to self-host an elegant, fast, and secure gallery without paying monthly subscription fees, you have found the ultimate starting point. This repository provides everything you need—from a stunning frontend to a robust, fully-featured backend admin panel.

---

## 🌟 Visual Showcase

A picture is worth a thousand words. Here is a glimpse of what Photopholio looks like right out of the box:

### The Cinematic Hero Section
An elegant, full-screen focal-pull slider showcasing your featured images with gorgeous typography.
![Hero Section](img/Screenshot%202026-06-13%20000156.png)

### The Adaptive Portfolio Grid
An intelligent mosaic gallery that reshapes itself based on the number of categories you create.
![My Work Section](img/Screenshot%202026-06-13%20000207.png)

### Client Testimonials Carousel
Build trust with your prospective clients using a swipeable, mobile-friendly review carousel.
![Client Voices](img/Screenshot%202026-06-13%20000215.png)

### Interactive Contact Flow
A beautifully designed contact form wired directly to your secure backend database.
![Get in Touch](img/Screenshot%202026-06-13%20000224.png)

### The Secure Admin Dashboard
A private, NextAuth-protected portal to manage your entire website from any device.
![Admin Login](img/Screenshot%202026-06-12%20235247.png)

---

## 🚀 Core Features & Capabilities

Photopholio is not just a static template; it is a living, breathing application separated into two perfectly synchronized surfaces.

### 1. The Public Frontend Gallery
- **Cinematic Hero Display:** An animated focal-pull slider showcasing featured images. Images slowly zoom and come into sharp focus, mimicking a cinema camera lens.
- **Adaptive Mosaic Grid:** The portfolio gallery intelligently reshapes itself. Whether you have 1 category or 10, the CSS Grid layout adapts to create a perfectly balanced masonry or editorial layout.
- **Mobile-First Excellence:** Flawless touch experiences, hidden horizontal overflows, and swipeable Embla carousels ensure mobile users get a premium experience.
- **Client Testimonials:** A verified review section that builds trust, complete with star ratings and client avatars.
- **Interactive Contact Flow:** A stunning contact form wired directly to the backend database, allowing clients to reach out for bookings seamlessly.
- **Dynamic Routing:** Case-insensitive, SEO-friendly URLs for your portfolio categories (e.g., `/portfolio/wedding`, `/portfolio/black-and-white`).

### 2. The Private Admin CMS (`/admin`)
- **Real-Time Uploads:** Post photos directly from your smartphone or desktop securely to an ImageKit CDN. The CDN compresses and serves them in next-gen formats automatically.
- **Google Drive Integration:** Use the built-in Google Drive Picker to bulk import gigabytes of RAW or JPEG photos effortlessly without downloading them to your computer first.
- **Dynamic Categorization:** Build dynamic sections on the fly (e.g., "Weddings", "Portraits", "AI Art", "Street Photography").
- **Inbox Management:** Read and reply to client inquiries natively within the dashboard. You never have to check a separate email inbox.
- **Site-wide Settings Engine:** Change your email, phone number, and social links instantly. Updating them in the admin panel propagates the changes across the entire public site's footer and contact pages.
- **Cross-Device Sync:** Upload a photo on your phone while on a shoot, and watch it appear on your desktop browser within 30 seconds without refreshing the page.

---

## 🛠️ Deep Dive: The Technology Stack

This project utilizes the bleeding edge of the React and JavaScript ecosystem to guarantee maximum performance and developer experience.

| Technology | Role | Why It Was Chosen |
|---|---|---|
| **Next.js 14 (App Router)** | Full-Stack Framework | Provides unparalleled SSR (Server-Side Rendering) performance, seamless API routes, and React Server Components for shipping zero JavaScript to the client where possible. |
| **Prisma ORM** | Database Toolkit | Incredible type-safety. Changing a column in the database schema instantly reflects throughout the entire TypeScript codebase, preventing runtime errors. |
| **SQLite / Postgres** | Database Engine | Configured out of the box for lightweight SQLite development (perfect for local testing), but entirely compatible with Vercel Postgres or Supabase for massive production scaling. |
| **ImageKit.io** | Media Delivery Network | Serves heavily unoptimized RAW/JPEG uploads as highly compressed, next-gen WebP/AVIF formats on the fly via global edge servers. |
| **NextAuth.js v4** | Security | Handles session management securely using encrypted JWT tokens and protects the `/admin` routes via edge-compatible middleware. |
| **TailwindCSS & Shadcn UI** | Design System | Enables rapid, beautiful UI construction with a dark-mode first, glassmorphic aesthetic. Tailwind ensures CSS bundles remain incredibly small. |
| **React Hook Form & Zod** | Form Validation | Provides robust, type-safe schema validation for the contact form and the admin upload portals, ensuring bad data never reaches your database. |
| **Framer Motion & CSS** | Animations | Delivers butter-smooth, 60fps micro-interactions, page transitions, and the stunning hero focal-pull effect. |

---

## 🏗️ System Architecture & Data Flow

Understanding how data moves through Photopholio is crucial for developers who want to extend its capabilities. Photopholio implements a robust edge-to-database upload pipeline to ensure server stability.

1. **Authentication Handshake:** When the admin selects an image to upload, the client requests a secure signature from the Next.js API route (`/api/imagekit/auth`).
2. **Direct-to-Edge Upload:** Armed with the secure signature, the browser pushes the heavy image file *directly* to the ImageKit edge network. It **bypasses the Next.js server entirely**. This saves your server bandwidth, prevents Vercel timeout limits (which restrict functions to 10-60 seconds), and ensures uploads are blazingly fast.
3. **Metadata Storage:** Once the image is safely on the CDN, ImageKit responds to the browser with a permanent URL and a unique `fileId`.
4. **Database Commit:** The Next.js frontend immediately takes that URL and metadata (title, description, category) and POSTs it to the Next.js API, which commits it to the SQL database using Prisma.
5. **Real-Time Polling:** The public UI relies on an aggressive 30-second polling `DataProvider`. This means the moment the database commit finishes, any user viewing the public gallery will see the new image appear almost instantly without refreshing.

---

## 💻 Extensive Step-by-Step Installation Guide

Are you ready to run this masterpiece on your own machine? Follow these instructions exactly. We have designed this process to be as frictionless as possible.

### Prerequisites
Before you begin, ensure your system has the following installed:
1. **Node.js**: Version 18.17.0 or higher. (Check with `node -v`)
2. **Git**: Version control system. (Check with `git --version`)
3. **An IDE**: We highly recommend Visual Studio Code.
4. **ImageKit Account**: Create a free account at [ImageKit.io](https://imagekit.io). The free tier is incredibly generous and perfect for this project.

### Step 1: Clone the Repository
Open your terminal and run the following command to pull the code to your local machine:
```bash
git clone https://github.com/kunal-gh/photopholio.git
cd photopholio
```

### Step 2: Install NPM Dependencies
Next, install all the required packages:
```bash
npm install
```
*Note: This may take a minute or two depending on your internet connection.*

### Step 3: Set Up Your Environment Variables
Photopholio requires several secret keys to function (like your admin password and ImageKit keys). We have provided a template file called `.env.example`. 

You must copy this template to a new file named `.env.local` (which is git-ignored, keeping your secrets safe):

**On macOS/Linux:**
```bash
cp .env.example .env.local
```

**On Windows (PowerShell):**
```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` in your code editor and carefully fill in the values. (See the [Environment Variables Deep Dive](#-environment-variables-deep-dive) section below for detailed instructions on what each value means).

### Step 4: Initialize the Database
By default, this repository is configured to use **SQLite**, which is a lightweight, file-based database. This means you do not need to install Postgres or run Docker to test this locally!

Run the following command to instruct Prisma to read your schema and generate your local SQLite database file (`dev.db`):
```bash
npx prisma db push
```

### Step 5: (Optional) Seed the Database with Sample Data
Starting with a blank website can be boring. If you want to see the UI immediately populated with beautiful placeholder images, testimonials, and contact messages, run our custom massive seeding script:
```bash
node scripts/seed-full.js
```
*This will wipe the current database and fill it with dozens of high-quality AI-generated photography placeholders.*

### Step 6: Start the Development Server
You are finally ready! Boot up the Next.js development server:
```bash
npm run dev
```

Open your browser and navigate to:
- **Public Portfolio**: `http://localhost:3000`
- **Admin Dashboard**: `http://localhost:3000/admin`

*(Log in using the `ADMIN_USERNAME` and `ADMIN_PASSWORD` you set in your `.env.local` file).*

---

## 🔐 Environment Variables Deep Dive

Your `.env.local` file is the heart of your application's security and configuration. Here is a detailed breakdown of every required variable:

### Authentication & Security
- `NEXTAUTH_SECRET`: A highly secure, random 32-character string used to encrypt your session cookies. **DO NOT GUESS THIS.** Generate a real one by running `openssl rand -base64 32` in your terminal.
- `NEXTAUTH_URL`: The base URL of your site. Locally, this is `http://localhost:3000`. In production, this will be your actual domain name.
- `ADMIN_USERNAME`: The username you will type into the login screen to access the CMS (e.g., `admin`, `hardik`, `studio`).
- `ADMIN_PASSWORD`: The highly secure password you will use to log in. Make it complex.

### Database Configuration
- `DATABASE_URL`: The connection string for Prisma. Since we default to SQLite locally, this must remain `file:./dev.db`. When you deploy to production, you will change this to your Postgres URL.

### ImageKit Media CDN Configuration
To get these keys, log into ImageKit.io, navigate to the "Developer" tab in the sidebar, and look for "API Keys".
- `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`: Your public API key (starts with `public_...`). It is safe for this to be exposed to the browser.
- `IMAGEKIT_PRIVATE_KEY`: Your private API key (starts with `private_...`). **NEVER SHARE THIS.** This stays securely on the Next.js server to generate upload signatures.
- `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`: Your unique ImageKit URL endpoint (e.g., `https://ik.imagekit.io/your_unique_id`).

### Google Drive Integration (Optional)
If you want to use the Google Drive Picker to bulk import photos in the Admin CMS:
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google Cloud Console OAuth Client ID.
- `NEXT_PUBLIC_GOOGLE_API_KEY`: Your Google Cloud Console API Key with Google Picker API enabled.

---

## 🗄️ Database Management & Prisma Guide

Prisma makes managing your database incredibly simple. Here are the core commands you need to know as a developer or administrator.

### 1. Viewing Your Live Data
Want to see exactly what is inside your database without writing SQL? Prisma comes with a beautiful, built-in GUI called Prisma Studio.
```bash
npx prisma studio
```
This will open a browser window at `http://localhost:5555` where you can view, edit, delete, and add records to your `Photo`, `Testimonial`, `Contact`, and `Setting` tables directly.

### 2. Modifying the Database Schema
If you want to add a new feature—for example, adding a `price` column to your photos to sell prints—you would:
1. Open `prisma/schema.prisma`.
2. Add the field: `price Float?` to the `Photo` model.
3. Apply the changes to your database by running:
```bash
npx prisma db push
```
4. Regenerate the TypeScript client so your code knows about the new field:
```bash
npx prisma generate
```

### The Core Schema Models
Understanding the database structure is key to mastering this project:
- **`Photo`**: The central entity. Tracks image URLs, `ImageKitFileId` (critical for API deletion), resolution width/height, and relationships to Sections.
- **`Section`**: The grouping entity for Photos (e.g., "Weddings").
- **`Testimonial`**: Stores client reviews, author names, and star ratings (1-5).
- **`Contact`**: Stores messages sent from the public "Get in Touch" form. Includes an `isRead` boolean for inbox management.
- **`Setting`**: A singleton table (only ever contains one row) storing site-wide configuration like the photographer's master email, phone number, and social media links.

---

## 🎛️ The Admin Dashboard Workflow

Once you are logged into `/admin`, here is the recommended workflow to manage your portfolio:

1. **Initial Setup (Settings Tab):** 
   Navigate to the "Settings" tab first. Update the Photographer name, master email, phone number, and all social media links. The moment you click save, these details instantly populate the footer and contact pages of the public site.
2. **Build Your Taxonomy (Sections Tab):** 
   Go to the "Sections" tab. Create the categories you shoot in. For example: "Wedding", "Editorial", "Black & White", "Commercial".
3. **Populate Your Gallery (Upload Tab):** 
   Head to the Upload tab. Drag and drop a high-resolution image. Assign it a title, a description, and select a Section from the dropdown. 
   - *Pro-Tip:* Toggle the **"Mark as Featured"** switch if you want this photo to appear in the massive, full-screen Hero Slider on the homepage.
4. **Curate Voices (Testimonials Tab):** 
   Add glowing reviews from past clients. Ensure you select 5 stars! These will instantly appear in the rotating carousel on the public site.
5. **Manage Inquiries (Inbox Tab):** 
   When a client fills out your public contact form, a red notification badge will appear here. Click to read their message, view their email, and reach out to book the shoot.

---

## ☁️ Vercel Deployment & Postgres Setup Guide

Ready to share your portfolio with the world? Photopholio is heavily optimized for zero-config deployment on Vercel.

Because Vercel is a serverless environment, local SQLite databases will not persist data between server restarts. You **must** upgrade to a true cloud database like Vercel Postgres before deploying.

### Step 1: Switch Prisma to Postgres
Open `prisma/schema.prisma` in your code editor. Change the provider block at the top of the file:
```prisma
// Change this:
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

// To this:
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Step 2: Create a Vercel Postgres Database
1. Log into your [Vercel Dashboard](https://vercel.com).
2. Go to the "Storage" tab and create a new **Postgres** database.
3. Once created, Vercel will provide you with a `POSTGRES_PRISMA_URL` string.

### Step 3: Deploy the Code
1. Push your latest code (with the `schema.prisma` change) to your GitHub repository.
2. In Vercel, click "Add New Project" and import your GitHub repository.
3. Before clicking deploy, open the **Environment Variables** section in Vercel.
4. Copy-paste ALL the variables from your local `.env.local` file into Vercel.
   - **CRITICAL:** Change `DATABASE_URL` to the Postgres URL Vercel gave you in Step 2.
   - **CRITICAL:** Change `NEXTAUTH_URL` to your actual production domain name (e.g., `https://my-portfolio.vercel.app`).
5. Click **Deploy**.

Vercel will automatically run `npm run build`, which triggers the `prisma db push` command to build your Postgres schema, and within 2 minutes, your site will be live!

---

## 🎨 Customization Guide

Photopholio was designed to be highly extensible. Here is how you can make it your own:

### Changing the Color Palette
The entire website is themed using Tailwind CSS variables located in `src/app/globals.css`.
To change the background color or primary accents, simply modify the HSL values in the `:root` pseudo-class.

### Changing the Typography
The project uses Next.js `next/font/google` for optimal performance without layout shifts.
To change the fonts:
1. Open `src/app/layout.tsx`.
2. Find the `Playfair_Display` and `Montserrat` imports at the top.
3. Swap them for any font from Google Fonts (e.g., `Inter`, `Roboto_Mono`, `Oswald`).
4. Update the Tailwind variables in `tailwind.config.ts` to reference your new fonts.

### Adjusting the Hero Animation Speed
Want the focal-pull effect on the homepage to be faster or slower?
Open `src/components/animated-hero.tsx` and adjust the `transition={{ duration: 12 }}` values in the Framer Motion `motion.div` elements.

---

## 📡 API Route Documentation

For developers looking to build mobile apps or external integrations, Photopholio provides a robust set of RESTful API routes under the `/api` directory.

- `GET /api/photographs` - Fetches all photos. Accepts `?section=name` to filter by category.
- `POST /api/photographs` - (Protected) Creates a new photo record. Requires `imageUrl` and `imageKitFileId`.
- `DELETE /api/photographs/[id]` - (Protected) Deletes a photo from the Postgres database AND calls the ImageKit SDK to delete the asset from the CDN to prevent ghost storage.
- `GET /api/testimonials` - Fetches all approved testimonials.
- `GET /api/settings` - Fetches the singleton settings row for the footer.
- `GET /api/contact` - (Protected) Fetches all inbox messages.
- `POST /api/contact` - (Public) Endpoint for the public contact form to submit inquiries.

---

## 🙋 Frequently Asked Questions (FAQ)

**Q: Can I host this on AWS, Render, or DigitalOcean instead of Vercel?**
A: Absolutely! Because it is a standard Next.js application, you can containerize it using Docker or run it on any Node.js server. Just ensure you provide a valid Postgres/MySQL database URL.

**Q: Do I have to pay for ImageKit?**
A: No! ImageKit's free tier provides 20GB of bandwidth per month, which is more than enough for a standard photography portfolio.

**Q: My images are uploading sideways. How do I fix this?**
A: This is an EXIF data issue common with smartphone uploads. ImageKit automatically handles EXIF orientation rotation on the fly, so ensure you aren't stripping EXIF data before upload.

**Q: I forgot my Admin Password. What do I do?**
A: Your password is not stored in the database; it is strictly an environment variable. Simply open your Vercel dashboard or your local `.env.local` file, change the `ADMIN_PASSWORD` variable, and restart the server.

---

## 🤝 Contribution Guidelines

Photopholio is fully open source. We welcome issues, bug fixes, and feature additions from the community!

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request!

When contributing, please ensure:
- You run `npm run lint` before committing to adhere to our code quality standards.
- Do not commit `.env` files, API secrets, or `.sqlite` database files.
- Test your layout changes on mobile viewports using Chrome DevTools.

---

## 📄 License & Credits

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
You are completely free to use this template for your own personal portfolio or to build websites for your clients.

*Photopholio was engineered with extreme precision, built specifically for photographers who demand that their website be as polished, elegant, and timeless as their actual photography.*
