# EmailJS Setup Guide

Your contact form is failing because you need to set up EmailJS with real credentials. Here's how to fix it:

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (recommended)
4. Follow the setup process:
   - Connect your Gmail account (`microsoftrajeevranjan@gmail.com`)
   - Authorize EmailJS to send emails on your behalf
5. Note down your **Service ID** (e.g., `service_xyz123abc`)

## Step 3: Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

### Template Subject:
```
New Contact Form Message from {{from_name}}
```

### Template Body:
```
Hi there!

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Timestamp: {{timestamp}}

Message:
{{message}}

---
This message was sent via your portfolio contact form.
Reply directly to this email to respond to {{from_name}}.
```

4. **Important**: Set the template settings:
   - **To Email**: `microsoftrajeevranjan@gmail.com`
   - **From Email**: Use the service email (your connected Gmail)
   - **Reply To**: `{{reply_to}}`

5. Save the template and note down your **Template ID** (e.g., `##############`)

## Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (you already have this: `##############`)

## Step 5: Update Your Environment Variables
Update your `.env.local` file with the real values:

```bash
# Replace these with your actual EmailJS values:
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_your_actual_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_your_actual_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=#############
CONTACT_EMAIL=microsoftrajeevranjan@gmail.com
```

## Step 6: Test the Setup
1. Restart your development server: `npm run dev`
2. Try sending a test message through your contact form
3. Check the browser console for any error messages
4. Check your email inbox for the test message

## Current Issue
Your current configuration has placeholder values:
- ❌ `service_abc123` (needs to be your real service ID)
- ❌ `template_xyz789` (needs to be your real template ID)
- ✅ `HwbbULAf-nyY0E9EW` (your public key is correct)

## Troubleshooting
If it still fails after setup:
1. Check browser console for error messages
2. Verify your EmailJS service is active
3. Make sure your template variables match exactly
4. Check EmailJS dashboard for any delivery issues
5. Ensure your Gmail account allows EmailJS access

## Free Tier Limits
- 200 emails per month
- Should be sufficient for a portfolio contact form

Once you complete this setup with real EmailJS credentials, your contact form will work perfectly!
