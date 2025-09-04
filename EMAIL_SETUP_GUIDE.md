# Email Setup Guide for Portfolio Contact Form

## Overview
Your contact form is now configured to send emails directly to your mailbox using EmailJS service. Follow these steps to make it fully operational.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Configure Email Service

1. **Add Email Service:**
   - Go to "Email Services" in your EmailJS dashboard
   - Click "Add New Service"
   - Choose "Gmail" (recommended) or your preferred email provider
   - Follow the setup instructions to connect your email
   - Note down the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. **Create Template:**
   - Go to "Email Templates" in your dashboard
   - Click "Create New Template"
   - Use this template content:

```html
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply-To: {{from_email}}
```

2. **Template Variables:**
   - Make sure these variables are included: `{{from_name}}`, `{{from_email}}`, `{{message}}`
   - Note down the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to "Account" → "General" in your EmailJS dashboard
2. Find your **Public Key** (e.g., `user_abcdef123456`)

## Step 5: Configure Environment Variables

1. **Create `.env.local` file** in your project root:
```bash
cp .env.example .env.local
```

2. **Edit `.env.local`** with your actual values:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_abcdef123456
```

## Step 6: Test the Setup

1. Restart your development server:
```bash
npm run dev
```

2. Go to your contact form
3. Fill out the form and submit
4. Check your email inbox for the message

## Features Included

✅ **Email Delivery:** Messages sent directly to rajeevranjanpratapsingh7@gmail.com
✅ **Message Storage:** Local "dropbox" system for visitor messages
✅ **Admin Panel:** View and manage messages with password protection (password: portfolio2025)
✅ **Form Validation:** Required fields with proper validation
✅ **Loading States:** Visual feedback during submission
✅ **Success/Error Messages:** User feedback on submission status
✅ **Theme Support:** Adapts to your day/night mode
✅ **Mobile Responsive:** Works on all devices
✅ **Spam Protection:** EmailJS includes basic spam protection
✅ **Message Export:** Download messages as JSON files
✅ **Direct Reply:** Email integration for quick responses

## Security Features

- Public key is safe to expose (it's meant to be public)
- EmailJS handles rate limiting and spam protection
- No backend required - works entirely client-side
- Form data is sent securely via HTTPS

## Free Tier Limits

- 200 emails per month
- EmailJS branding in emails (removable with paid plan)
- Basic support

## Troubleshooting

**If emails aren't sending:**
1. Check browser console for errors
2. Verify all environment variables are set correctly
3. Make sure EmailJS service is connected to your email
4. Check EmailJS dashboard for error logs

**If you see configuration errors:**
1. Make sure `.env.local` file exists
2. Restart the development server after changing environment variables
3. Verify the public key format is correct

## Alternative Solutions

If you prefer other email services:
- **Formspree:** Simple form backend service
- **Netlify Forms:** If hosting on Netlify
- **SendGrid:** More advanced email API
- **Custom Backend:** Node.js with nodemailer

Your contact form is now ready to receive messages directly in your email inbox! 🚀
