// EmailJS Configuration
// You need to set up EmailJS account and replace these values

export const emailjsConfig = {
  // Get these from your EmailJS dashboard
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_portfolio',
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_contact',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key_here',
};

// Template variables for EmailJS
export const emailTemplateParams = {
  from_name: '{{from_name}}',
  from_email: '{{from_email}}',
  message: '{{message}}',
  to_email: 'microsoftrajeevranjan@gmail.com',
  reply_to: '{{from_email}}',
};
