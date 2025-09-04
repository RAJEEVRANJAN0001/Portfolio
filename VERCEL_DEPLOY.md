# Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### Method 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# For production deployment
vercel --prod
```

### Method 2: GitHub + Vercel Dashboard
1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/RAJEEVRANJAN0001/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Configure and deploy

## ⚙️ Environment Variables Setup

### Required Environment Variables:
Add these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_ADMIN_PASSWORD` | `your_secure_password` | Admin panel access |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `your_service_id` | EmailJS service (optional) |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `your_template_id` | EmailJS template (optional) |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `your_public_key` | EmailJS public key (optional) |

### Setting Environment Variables:
```bash
# Via Vercel CLI
vercel env add NEXT_PUBLIC_ADMIN_PASSWORD production
# Enter your secure password when prompted

# Or via Dashboard
# Vercel Dashboard → Project → Settings → Environment Variables
```

## 🔧 Project Configuration

### Build Settings (Auto-detected):
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Custom Domains:
```bash
# Add custom domain via CLI
vercel domains add yourdomain.com

# Or via Dashboard
# Vercel Dashboard → Project → Settings → Domains
```

## 📁 File Structure for Deployment:
```
portfolio/
├── public/
│   ├── Certifcate/        # Certificate files
│   ├── textures/          # 3D Earth textures
│   └── resume.pdf         # Your resume
├── src/
│   ├── components/        # React components
│   ├── pages/            # Next.js pages
│   └── styles/           # CSS styles
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies
└── .env.local           # Local environment variables
```

## 🛡️ Security Features Configured:
- Security headers (XSS protection, frame options)
- Certificate file caching
- PDF content type handling
- Clean URLs
- Trailing slash handling

## 🔍 Deployment Verification:
After deployment, test these features:
- ✅ Main portfolio loads
- ✅ Certificates page works
- ✅ 3D Earth background renders
- ✅ Admin panel (with environment password)
- ✅ Contact form functionality
- ✅ Resume download works

## 🚨 Troubleshooting:
- **Build fails**: Check `npm run build` locally first
- **Environment variables**: Ensure all required vars are set
- **3D textures not loading**: Check file paths in public folder
- **Admin access**: Verify NEXT_PUBLIC_ADMIN_PASSWORD is set

## 📞 Support:
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
