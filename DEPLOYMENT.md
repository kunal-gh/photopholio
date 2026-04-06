# Deployment Guide

This project is a fully independent Next.js application with no external dependencies. You can deploy it to any static hosting platform.

## Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy"

## Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy"

## GitHub Pages

1. Install the gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
"scripts": {
  "export": "next build && next export",
  "deploy": "gh-pages -d out"
}
```

3. Update next.config.mjs:
```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // ... rest of config
};
```

4. Deploy:
```bash
npm run export
npm run deploy
```

## Self-Hosted (VPS/Server)

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

3. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

4. Configure nginx as reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:9002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Variables

This project doesn't require any environment variables by default. If you add any in the future, create a `.env.local` file and add them to your hosting platform's environment settings.

## Custom Domain

After deployment, you can add a custom domain through your hosting platform's dashboard:
- Vercel: Project Settings → Domains
- Netlify: Site Settings → Domain Management
- GitHub Pages: Repository Settings → Pages → Custom Domain
