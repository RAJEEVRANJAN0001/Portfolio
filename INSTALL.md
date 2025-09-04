# Portfolio Installation Guide

## Quick Start

### 1. Prerequisites
- Node.js (version 18.0.0 or higher)
- npm or yarn package manager
- Git

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your secure password

# Start development server
npm run dev
```

### 3. Required Dependencies
```bash
npm install next@^14.0.0 react@^18.0.0 react-dom@^18.0.0
npm install framer-motion@^10.0.0 tailwindcss@^3.0.0 three@^0.160.0
npm install @emailjs/browser@^4.4.1
npm install -D typescript@^5.0.0 @types/node@^20.0.0 @types/react@^18.0.0
npm install -D @types/three@^0.179.0 autoprefixer@^10.0.0 postcss@^8.0.0
```

### 4. For Deployment
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy to Vercel
vercel
```

### 5. Environment Variables
Create `.env.local` file with:
```
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
```

### 6. Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting

## Features
- 3D Earth background with textures
- Interactive certificate showcase
- Admin panel for message management
- Responsive design with dark/light themes
- Contact form with EmailJS integration
- Optimized performance and SEO
