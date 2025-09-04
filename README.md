# Portfolio - Rajeev Ranjan Pratap Singh

A modern, responsive portfolio showcasing AI/ML expertise with advanced contact management system.

## Key Features

###  **Modern Design**
- Day/Night theme toggle with smooth transitions
- 3D animated backgrounds (optimized performance)
- Responsive design for all devices
- Framer Motion animations

###  **AI/ML Project Showcase**
- Brain Tumor Detection (99.69% accuracy)
- Emotion Detection System (80% accuracy)
- Diabetic Retinopathy Detection (Cohen's Kappa 0.76)
- Detailed metrics and technology stacks

###  **Advanced Contact System**
- **Email Integration:** Direct to rajeevranjanpratapsingh7@gmail.com
- **Message Storage:** Local "dropbox" system for visitor messages
- **Admin Panel:** Password-protected message management
- **Export Feature:** Download messages as JSON
- **Form Validation:** Real-time validation and feedback

###  **Professional Certifications**
- Google Analytics (86%), Google Ads AI (91.3%)
- IBM Blockchain & Generative AI certifications
- Applied Machine Learning in Python

##  Tech Stack

- **Framework:** Next.js 14 + TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **3D Graphics:** Three.js
- **Email Service:** EmailJS
- **Storage:** LocalStorage + SessionStorage

##  Quick Start

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm run dev
```

##  Email Setup

1. Create account at [EmailJS.com](https://emailjs.com)
2. Configure email service and template
3. Copy `.env.example` to `.env.local`
4. Add your EmailJS credentials

See `EMAIL_SETUP_GUIDE.md` for detailed instructions.

##  Admin Panel

Access the admin panel by clicking the "Admin" button (bottom right):
- **Password:** Set via environment variable `NEXT_PUBLIC_ADMIN_PASSWORD`
- **Features:** View messages, mark as read, export data, direct email replies

##  Project Structure

```
src/
├── components/          # React components
│   ├── AdminPanel.tsx   # Message management
│   ├── Contact.tsx      # Contact form
│   └── ...
├── contexts/           # Theme context
├── utils/             # Message storage utilities
├── config/            # EmailJS configuration
└── pages/             # Next.js pages
```

##  Requirements

See `REQUIREMENTS.md` for comprehensive feature documentation and technical specifications.

##  Updates

This README and requirements are updated as new features are added. Last updated: September 3, 2025.

---