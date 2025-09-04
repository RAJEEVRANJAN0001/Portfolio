#!/bin/bash

echo "🔧 Setting up Vercel Environment Variables..."

# Make sure you're logged in to Vercel
echo "Please make sure you're logged in to Vercel CLI"
echo "If not logged in, run: vercel login"
echo ""

# Set environment variables for production
echo "Setting environment variables for PRODUCTION..."

vercel env add NEXT_PUBLIC_EMAILJS_SERVICE_ID production <<< "service_mcbqlsf"
vercel env add NEXT_PUBLIC_EMAILJS_TEMPLATE_ID production <<< "template_lhiub4f"  
vercel env add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY production <<< "HwbbULAf-nyY0E9EW"

echo "Setting environment variables for PREVIEW..."

vercel env add NEXT_PUBLIC_EMAILJS_SERVICE_ID preview <<< "service_mcbqlsf"
vercel env add NEXT_PUBLIC_EMAILJS_TEMPLATE_ID preview <<< "template_lhiub4f"
vercel env add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY preview <<< "HwbbULAf-nyY0E9EW"

echo "Setting environment variables for DEVELOPMENT..."

vercel env add NEXT_PUBLIC_EMAILJS_SERVICE_ID development <<< "service_mcbqlsf"
vercel env add NEXT_PUBLIC_EMAILJS_TEMPLATE_ID development <<< "template_lhiub4f"
vercel env add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY development <<< "HwbbULAf-nyY0E9EW"

echo "✅ Environment variables set successfully!"
echo "Now redeploy your project: vercel --prod"
