# Vercel Deployment Guide for Portfolio

## Environment Variables Setup

To ensure your contact form works in production, you need to set up these environment variables in your Vercel dashboard:

### 1. Go to Vercel Dashboard
1. Visit [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your portfolio project
3. Go to **Settings** → **Environment Variables**

### 2. Add These Environment Variables

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `###########` | Production, Preview, Development |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `#############` | Production, Preview, Development |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `#############` | Production, Preview, Development |
| `CONTACT_EMAIL` | `#############` | Production, Preview, Development |

### 3. Alternative: Using Vercel CLI

You can also set environment variables using the Vercel CLI:

```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add NEXT_PUBLIC_EMAILJS_SERVICE_ID production
# Enter: service_mcbqlsf

vercel env add NEXT_PUBLIC_EMAILJS_TEMPLATE_ID production  
# Enter: template_lhiub4f

vercel env add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY production
# Enter: HwbbULAf-nyY0E9EW

vercel env add CONTACT_EMAIL production
# Enter: microsoftrajeevranjan@gmail.com
```

### 4. Deploy Your Project

After setting up environment variables:

```bash
# Deploy to Vercel
vercel --prod

# Or if you prefer automatic deployment
git add .
git commit -m "Add environment variables and update configuration"
git push origin main
```

### 5. Verify Deployment

1. Visit your deployed site
2. Test the contact form
3. Check if emails are being sent to `microsoftrajeevranjan@gmail.com`
4. Monitor Vercel function logs for any errors

## Security Notes

- ✅ `.env.local` is now in `.gitignore` - your local secrets are safe
- ✅ Environment variables are properly configured for production
- ✅ EmailJS public key is safe to expose (it's meant to be public)
- ✅ Contact form sends directly to your specified email

## Troubleshooting

If the contact form doesn't work in production:

1. **Check Environment Variables**: Ensure all variables are set in Vercel dashboard
2. **Check EmailJS Template**: Verify your template is active and correctly configured
3. **Check Browser Console**: Look for any JavaScript errors
4. **Check Vercel Function Logs**: Monitor for server-side errors
5. **Test EmailJS Directly**: Use EmailJS playground to test your service/template

## Current Configuration Status

- ✅ EmailJS Service ID: `service_mcbqlsf`
- ✅ EmailJS Template ID: `template_lhiub4f`  
- ✅ EmailJS Public Key: `HwbbULAf-nyY0E9EW`
- ✅ Target Email: `microsoftrajeevranjan@gmail.com`
- ✅ Local environment configured
- ✅ `.env.local` added to `.gitignore`
- ✅ `vercel.json` updated with proper configuration
