#!/bin/bash

# Portfolio Deployment Script
echo "🚀 Starting Portfolio Deployment Process..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "🔐 Setting up environment variables..."

# Set environment variables in Vercel
echo "Setting NEXT_PUBLIC_EMAILJS_SERVICE_ID..."
echo "service_mcbqlsf" | vercel env add NEXT_PUBLIC_EMAILJS_SERVICE_ID production

echo "Setting NEXT_PUBLIC_EMAILJS_TEMPLATE_ID..."
echo "template_lhiub4f" | vercel env add NEXT_PUBLIC_EMAILJS_TEMPLATE_ID production

echo "Setting NEXT_PUBLIC_EMAILJS_PUBLIC_KEY..."
echo "HwbbULAf-nyY0E9EW" | vercel env add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY production

echo "Setting CONTACT_EMAIL..."
echo "microsoftrajeevranjan@gmail.com" | vercel env add CONTACT_EMAIL production

echo "✅ Environment variables set successfully!"

# Deploy to production
echo "🚀 Deploying to production..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your portfolio should now be live with working contact form!"
echo "📧 Contact form will send emails to: microsoftrajeevranjan@gmail.com"
