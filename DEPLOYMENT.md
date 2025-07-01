# TaskFlow Deployment Guide

This guide covers multiple deployment options for the TaskFlow Task Management Dashboard.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/taskflow-dashboard)

**Steps:**
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"
6. Your app will be live in minutes!

**Vercel CLI Method:**
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
\`\`\`

### Option 2: Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/taskflow-dashboard)

**Steps:**
1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### Option 3: GitHub Pages (Static Export)

First, update your `next.config.js`:

\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
\`\`\`

Then deploy:
\`\`\`bash
npm run build
# Push the 'out' folder to gh-pages branch
\`\`\`

## 🐳 Docker Deployment

### Local Docker
\`\`\`bash
# Build the image
docker build -t taskflow .

# Run the container
docker run -p 3000:3000 taskflow
\`\`\`

### Docker Compose
\`\`\`bash
docker-compose up -d
\`\`\`

### Deploy to Railway
1. Connect your GitHub repo to [Railway](https://railway.app)
2. Railway will auto-detect the Dockerfile
3. Deploy automatically

### Deploy to Render
1. Connect your GitHub repo to [Render](https://render.com)
2. Choose "Web Service"
3. Use Docker deployment
4. Deploy

## ☁️ Cloud Platform Deployments

### AWS (Amplify)
\`\`\`bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
\`\`\`

### Google Cloud Platform
\`\`\`bash
# Install gcloud CLI
# Create app.yaml file
gcloud app deploy
\`\`\`

### Microsoft Azure
\`\`\`bash
# Install Azure CLI
az webapp up --name taskflow-dashboard --resource-group myResourceGroup
\`\`\`

## 🔧 Environment Variables

For production deployments, you may want to add these environment variables:

\`\`\`env
# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optional: Error tracking
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn

# Optional: Custom domain
NEXT_PUBLIC_DOMAIN=yourdomain.com
\`\`\`

## 📱 PWA Configuration (Optional)

To make your app installable as a PWA, add these files:

**public/manifest.json:**
\`\`\`json
{
  "name": "TaskFlow - Task Management",
  "short_name": "TaskFlow",
  "description": "Streamline your workflow and boost productivity",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
\`\`\`

## 🚀 Performance Optimization

Before deploying, consider these optimizations:

1. **Image Optimization**: All images are already optimized with Next.js
2. **Bundle Analysis**: Run `npm run build` to see bundle sizes
3. **Caching**: Vercel/Netlify handle this automatically
4. **CDN**: Static assets are served from CDN automatically

## 🔍 Monitoring & Analytics

After deployment, consider adding:

- **Google Analytics** for user tracking
- **Sentry** for error monitoring  
- **Vercel Analytics** for performance insights
- **Hotjar** for user behavior analysis

## 📋 Pre-Deployment Checklist

- [ ] All features working locally
- [ ] Dark mode toggle functional
- [ ] Data persists in localStorage
- [ ] Responsive design tested
- [ ] All forms validate properly
- [ ] Drag & drop works smoothly
- [ ] Search and filters functional
- [ ] No console errors
- [ ] Build completes successfully (`npm run build`)

## 🆘 Troubleshooting

**Build Errors:**
- Check Node.js version (use 18+)
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors: `npm run type-check`

**Runtime Errors:**
- Check browser console for errors
- Verify localStorage is available
- Test in incognito mode

**Performance Issues:**
- Use Lighthouse to audit performance
- Check bundle size with `npm run build`
- Optimize images if needed

## 🎉 Post-Deployment

After successful deployment:

1. **Test all features** on the live site
2. **Share the URL** with team members
3. **Set up monitoring** and analytics
4. **Create backups** of your data export feature
5. **Document any custom configurations**

Your TaskFlow dashboard is now live and ready to help teams manage their tasks efficiently! 🚀
