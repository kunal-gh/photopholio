# Admin Panel Guide

## Overview

Your photography portfolio includes a complete backend system with an easy-to-use admin panel for managing all content. This guide will walk you through everything from quick start basics to advanced features.

## 🚀 Quick Start (5 Minutes)

### 1. Start Your Website

Open your terminal and run:
```bash
npm run dev
```

Your website will be available at: **http://localhost:9002**

### 2. Access Admin Panel

Open your browser and navigate to:
```
http://localhost:9002/admin
```

You'll see your admin dashboard with three management options.

## 📸 Managing Photographs

### Accessing Photograph Management

Navigate to: **http://localhost:9002/admin/photographs**

Or click **"Manage Photos"** on the admin dashboard.

### Adding New Photographs

**Step-by-Step:**

1. **Fill in the photograph details** on the left side:
   - **Title**: Give your photo a name (e.g., "Sunset Wedding")
   - **Category**: Choose from dropdown:
     - Weddings
     - Portraits
     - Street
     - Fashion
     - Live Events
     - AI Generated
   - **Description**: Optional details about the photo
   - **Image Alt Text**: Describe the image for accessibility (e.g., "Bride and groom at sunset")

2. **Upload Your Image**:
   - Click "Choose File" or drag and drop
   - Select an image from your computer
   - Wait for upload (you'll see a preview)
   - **Supported formats**: JPG, PNG, WEBP, GIF
   - **Max size**: 5MB

3. **Click "Add Photograph"**

4. **Done!** Your photo appears on the right side and on your website immediately

### Managing Existing Photographs

- **View All**: Scroll through the list on the right panel
- **Delete**: Click the trash icon next to any photo
- **Organize**: Photos automatically group by category on your website

### Where Photographs Appear

- **Home Page**: Featured in portfolio grid
- **Portfolio Pages**: Filtered by category at `/portfolio/[category]`
- **Example URLs**:
  - `http://localhost:9002/portfolio/weddings`
  - `http://localhost:9002/portfolio/portraits`
  - `http://localhost:9002/portfolio/street`

## 💬 Managing Testimonials

### Accessing Testimonial Management

Navigate to: **http://localhost:9002/admin/testimonials**

Or click **"Manage Reviews"** on the admin dashboard.

### Adding New Testimonials

**Step-by-Step:**

1. **Enter client information**:
   - **Client Name**: Full name (e.g., "Jessica & Tom")
   - **Role/Title**: Their relationship to you (e.g., "Wedding Client", "Fashion Designer")
   - **Testimonial Text**: Their review or feedback
   - **Avatar URL**: Use one of these placeholder services:
     ```
     https://i.pravatar.cc/150?img=1
     https://i.pravatar.cc/150?img=2
     https://i.pravatar.cc/150?img=3
     ```
     (Change the number 1-70 for different avatars)
   - **Rating**: Click the stars to set rating (1-5)

2. **Click "Add Testimonial"**

3. **Done!** Review appears on your website immediately

### Managing Existing Testimonials

- **View All**: See all testimonials in the right panel
- **Delete**: Click the trash icon next to any testimonial

### Where Testimonials Appear

- **Home Page**: Carousel in "Client Voices" section
- **Testimonials Page**: Full list with carousel at `/testimonials`
- **URL**: `http://localhost:9002/testimonials`

## 📧 Managing Contact Messages

### Accessing Contact Messages

Navigate to: **http://localhost:9002/admin/contacts**

Or click **"View Messages"** on the admin dashboard.

### Viewing Messages

- All contact form submissions appear here
- **New messages** are highlighted
- Shows: Name, Email, Message, and Timestamp
- **Click email** to open in your mail client and reply directly

### Managing Messages

- **Delete**: Click trash icon to remove messages
- Messages are saved automatically when visitors use your contact form
- Contact messages are **not shown publicly** - only visible in admin panel

## 🎨 Where Your Content Appears

### Content Display Summary

| Content Type | Home Page | Dedicated Page | Admin Only |
|-------------|-----------|----------------|------------|
| Photographs | ✅ Portfolio Grid | ✅ `/portfolio/[category]` | ❌ |
| Testimonials | ✅ Carousel | ✅ `/testimonials` | ❌ |
| Contact Messages | ❌ | ❌ | ✅ Admin Panel |

## 💾 Data Storage

### Your Data Location

All your content is saved in these files:

```
data/
├── photographs.json      ← Your portfolio images
├── testimonials.json     ← Client reviews
└── contacts.json         ← Contact form submissions

public/uploads/           ← Your uploaded images
```

### Backing Up Your Data

**Manual Backup (Windows):**
```bash
xcopy data data-backup /E /I
xcopy public\uploads public\uploads-backup /E /I
```

**Manual Backup (Mac/Linux):**
```bash
cp -r data/ data-backup/
cp -r public/uploads/ public/uploads-backup/
```

**Backup Tip**: Copy the `data/` and `public/uploads/` folders regularly!

### Automated Backup (Optional)

Add to your deployment script:
```bash
# Before deploying
tar -czf backup-$(date +%Y%m%d).tar.gz data/ public/uploads/
```

## 🔧 Backend Architecture

### File-Based Database

- Data stored in JSON files in the `data/` directory
- Three files: `photographs.json`, `testimonials.json`, `contacts.json`
- Automatically created on first run
- Easy to backup and version control
- No external database required

### RESTful API

All CRUD operations available via REST API:

**Photographs:**
- `GET /api/photographs` - List all photographs
- `POST /api/photographs` - Create new photograph
- `GET /api/photographs/[id]` - Get one photograph
- `PATCH /api/photographs/[id]` - Update photograph
- `DELETE /api/photographs/[id]` - Delete photograph

**Testimonials:**
- `GET /api/testimonials` - List all testimonials
- `POST /api/testimonials` - Create new testimonial
- `PATCH /api/testimonials/[id]` - Update testimonial
- `DELETE /api/testimonials/[id]` - Delete testimonial

**Contacts:**
- `GET /api/contacts` - List all contacts
- `POST /api/contacts` - Create new contact
- `PATCH /api/contacts/[id]` - Mark as read
- `DELETE /api/contacts/[id]` - Delete contact

**Upload:**
- `POST /api/upload` - Upload images

### Image Upload System

**Features:**
- Automatic file validation (type and size)
- Unique filename generation (timestamp-based)
- Stored in `public/uploads/` directory
- Accessible via `/uploads/[filename]`
- Max file size: 5MB
- Supported formats: JPG, PNG, WEBP, GIF

**Upload Location:**
```
public/uploads/
  ├── 1234567890-image1.jpg
  ├── 1234567891-image2.png
  └── ...
```

## 🔄 Daily Workflow

### Adding New Content

1. Go to `/admin`
2. Click the section you want to update
3. Fill the form
4. Upload images if needed
5. Click "Add"
6. Check your website - changes are instant!

### Updating Content

Currently, you can:
- ✅ Add new items
- ✅ Delete items
- 🔜 Edit items (coming soon - or delete and re-add for now)

## 🆘 Common Questions

### Q: How do I edit a photo/testimonial?
**A**: For now, delete it and add it again with the new information. (Edit feature can be added if needed)

### Q: Can I upload multiple photos at once?
**A**: Currently one at a time. Bulk upload can be added if needed.

### Q: What if I make a mistake?
**A**: Just delete the item and add it again. Your data is safe in the `data/` folder.

### Q: Can someone else manage this?
**A**: Yes! Just share:
1. How to run `npm run dev`
2. The admin URL: `http://localhost:9002/admin`
3. This guide!

### Q: Does the admin panel work on mobile?
**A**: Yes! Open `/admin` on your phone and all features work the same. You can even upload photos from your phone's camera.

## 🚀 Going Live

When you're ready to deploy:

1. **Build your site**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel** (Recommended):
   - Push to GitHub
   - Connect to Vercel
   - Deploy automatically
   - Your admin panel works the same way!

3. **Your live admin URL**:
   ```
   https://yourdomain.com/admin
   ```

**Security Note**: In production, you should add password protection to `/admin`. See the Security section below.

## 🔒 Security Considerations

### Current Setup

- No authentication (admin panel is open)
- Suitable for local development or trusted environments
- File uploads validated for type and size

### Adding Authentication for Production

**Option 1: Simple Password Protection**

Add environment variable:
```env
ADMIN_PASSWORD=your-secure-password
```

**Option 2: NextAuth.js (Recommended)**

```bash
npm install next-auth
```

Configure providers (Google, GitHub, Email, etc.)

**Option 3: Clerk**

```bash
npm install @clerk/nextjs
```

Full authentication solution with UI components.

### Production Security Checklist

1. **Add Authentication**
   - Use NextAuth.js or Clerk
   - Protect all `/admin` routes
   - Add user roles if needed

2. **Environment Variables**
   - Store sensitive config in `.env.local`
   - Never commit secrets to git

3. **Rate Limiting**
   - Add rate limiting to API routes
   - Prevent abuse of upload endpoint

4. **HTTPS**
   - Always use HTTPS in production
   - Secure cookie settings

## 📈 Upgrading to a Real Database

The current file-based system works great for small to medium portfolios. To upgrade:

### Option 1: PostgreSQL

```bash
npm install pg
```

Update `src/lib/db.ts` to use PostgreSQL instead of JSON files.

### Option 2: MongoDB

```bash
npm install mongodb
```

Update `src/lib/db.ts` to use MongoDB instead of JSON files.

### Option 3: Prisma (Recommended)

```bash
npm install prisma @prisma/client
npx prisma init
```

Create schema and migrate. Prisma works with PostgreSQL, MySQL, SQLite, etc.

**No changes needed to:**
- API routes
- Admin panel
- Frontend components
- User interface

## 🐛 Troubleshooting

### Images Not Uploading

- Check `public/uploads/` directory exists
- Verify file size is under 5MB
- Ensure file format is supported (JPG, PNG, WEBP, GIF)
- Check browser console for errors (F12)

### Data Not Saving

- Check `data/` directory exists
- Verify write permissions
- Check browser console for errors
- Check terminal where `npm run dev` is running

### API Errors

- Check dev server is running (`npm run dev`)
- Verify API route paths
- Check browser network tab for details (F12 → Network)
- Review terminal logs for server errors

### Website Not Loading

- Ensure dev server is running on port 9002
- Check for port conflicts
- Try restarting the dev server
- Clear browser cache

## 🎯 Best Practices

1. **Regular Backups**: Backup `data/` and `public/uploads/` regularly (weekly recommended)
2. **Image Optimization**: Compress images before uploading for faster loading
3. **Alt Text**: Always provide descriptive alt text for accessibility and SEO
4. **Categories**: Keep category names consistent
5. **Testing**: Test on mobile devices after adding content
6. **Consistent Naming**: Use clear, descriptive titles for photos
7. **Mobile Check**: Verify how photos look on different devices

## 📞 Support

For issues or questions:

1. Check browser console for errors (F12)
2. Check dev server logs in terminal
3. Review API responses in network tab (F12 → Network)
4. Check file permissions on `data/` and `public/uploads/`
5. Refer to the main [README.md](./README.md) for project overview
6. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help

## ✨ Summary

Managing your portfolio is now as easy as:

1. Go to `/admin`
2. Click what you want to manage
3. Fill the form
4. Done!

**No coding required. Anyone can do it!** 🎉

---

**Made with ❤️ for photographers who want full control over their portfolio**
