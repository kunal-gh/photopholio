# Project Structure

## Root Configuration

- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration with `@/*` path alias
- `tailwind.config.ts` - Tailwind with custom theme (colors, fonts, animations)
- `components.json` - shadcn/ui configuration
- `package.json` - Dependencies and scripts

## Data Storage

- `data/` - JSON database files
  - `photographs.json` - Portfolio images data
  - `testimonials.json` - Client testimonials
  - `contacts.json` - Contact form submissions
- `public/uploads/` - Uploaded images

## Source Directory (`src/`)

### `src/app/` - Next.js App Router
- `layout.tsx` - Root layout
- `page.tsx` - Home page
- `globals.css` - Global styles with CSS variables
- `admin/` - Admin panel routes
  - `page.tsx` - Admin dashboard
  - `photographs/page.tsx` - Manage photographs
  - `testimonials/page.tsx` - Manage testimonials
  - `contacts/page.tsx` - View contact messages
- `api/` - API routes
  - `photographs/` - CRUD for photographs
  - `testimonials/` - CRUD for testimonials
  - `contacts/` - CRUD for contacts
  - `upload/` - Image upload endpoint
- `portfolio/` - Portfolio page routes
- `testimonials/` - Testimonials page routes

### `src/components/`
- `ui/` - shadcn/ui components (Button, Card, Form, Toast, etc.)
- `home/` - Home page components
- `portfolio/` - Portfolio-specific components
- `contact/` - Contact form components
- `layout/` - Layout components (header, footer, navigation)
- `FirebaseErrorListener.tsx` - Error handling
- `logo.tsx` - Logo component



### `src/hooks/`
- `use-mobile.tsx` - Mobile detection hook
- `use-scroll-progress.ts` - Scroll position tracking
- `use-toast.ts` - Toast notification hook

### `src/lib/`
- `utils.ts` - Utility functions (cn for class merging)
- `actions.ts` - Server actions (contact form submission)
- `db.ts` - Database operations (file-based JSON storage)
- `data-provider.tsx` - React Context provider for data
- `placeholder-images.ts` - Image placeholder utilities
- `placeholder-images.json` - Placeholder image data

## Documentation

- `docs/blueprint.md` - Product design and style guidelines
- `ADMIN_GUIDE.md` - Complete admin panel documentation
- `README.md` - Project setup and overview
- `DEPLOYMENT.md` - Deployment instructions
- `MIGRATION_SUMMARY.md` - Firebase to local migration notes



## Conventions

- Use App Router patterns (server components by default)
- Import from `@/` for src files
- UI components follow shadcn/ui patterns
- Data accessed through React Context providers
- Custom animations defined in Tailwind config
- HSL color variables for theming
- All data stored in-memory (can be extended to use localStorage or backend)
