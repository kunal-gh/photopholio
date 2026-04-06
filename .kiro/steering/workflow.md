# Development Workflow

## Running the Project

The development server is currently running at **http://localhost:9002**

### Start Development
```bash
npm run dev
```
Server runs on port 9002 (configured in package.json)

### Build for Production
```bash
npm run build
```

### Run Production Build
```bash
npm start
```

## Git Workflow

All changes are automatically committed and pushed to the remote repository.

### Current Repository
- Remote: https://github.com/kunal-gh/studio.git
- Branch: main

### Making Changes
1. Make your code changes
2. Test locally at http://localhost:9002
3. Stage changes: `git add .`
4. Commit: `git commit -m "Your message"`
5. Push: `git push origin main`

## Data Management

### Adding Photographs
Edit `src/lib/local-data.ts` and add to the `photographs` array in `initializeLocalData()`:

```typescript
{
  id: 'unique-id',
  category: 'weddings', // or 'portraits', 'street', 'fashion', 'live-events', 'ai-generated'
  title: 'Photo Title',
  description: 'Optional description',
  imageUrl: 'https://example.com/image.jpg',
  imageHint: 'Description for alt text',
  featured: true, // optional
  createdAt: new Date().toISOString(),
}
```

### Adding Testimonials
Edit `src/lib/local-data.ts` and add to the `testimonials` array in `initializeLocalData()`:

```typescript
{
  id: 'unique-id',
  author: 'Client Name',
  text: 'Testimonial text',
  role: 'Client Role',
  avatar: 'https://example.com/avatar.jpg',
  rating: 5,
  createdAt: new Date().toISOString(),
}
```

## Steering Rules

Steering rules are automatically included in AI assistance:
- `product.md` - Product overview and features
- `tech.md` - Tech stack and commands
- `structure.md` - Project organization
- `workflow.md` - This file

Update these files when making significant architectural changes.

## Testing Changes

1. Save your files
2. Next.js will auto-reload at http://localhost:9002
3. Check browser console for errors
4. Test all affected pages

## Common Tasks

### Add a New Page
1. Create file in `src/app/your-page/page.tsx`
2. Add navigation link in `src/components/layout/header.tsx`

### Add a New Component
1. Create in appropriate folder under `src/components/`
2. Follow existing patterns (use TypeScript, Tailwind CSS)

### Modify Styles
- Global styles: `src/app/globals.css`
- Theme colors: `tailwind.config.ts`
- Component styles: Use Tailwind utility classes

### Update Dependencies
```bash
npm install package-name
npm install --save-dev dev-package-name
```

Then commit the updated `package.json` and `package-lock.json`
