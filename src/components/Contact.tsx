import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../config/emailjs';
import dynamic from 'next/dynamic';

const SimpleStarField = dynamic(() => import('./SimpleStarField'), { ssr: false });

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { isDark } = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Check if EmailJS credentials are properly configured
      if (emailjsConfig.SERVICE_ID === 'service_portfolio' || emailjsConfig.SERVICE_ID === 'service_abc123') {
        throw new Error('EmailJS Service ID not configured. Please set up your EmailJS service.');
      }
      
      if (emailjsConfig.TEMPLATE_ID === 'template_contact' || emailjsConfig.TEMPLATE_ID === 'template_xyz789') {
        throw new Error('EmailJS Template ID not configured. Please set up your EmailJS template.');
      }
      
      if (emailjsConfig.PUBLIC_KEY === 'your_public_key_here') {
        throw new Error('EmailJS Public Key not configured.');
      }
      
      // Initialize EmailJS with public key
      emailjs.init(emailjsConfig.PUBLIC_KEY);
      
      // Send email using EmailJS
      const result = await emailjs.send(
        emailjsConfig.SERVICE_ID,
        emailjsConfig.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'microsoftrajeevranjan@gmail.com',
          reply_to: formData.email,
          timestamp: new Date().toISOString(),
        }
      );
      
      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      
      // Log detailed error for debugging
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section 
      id="contact" 
      className={`py-20 px-4 relative overflow-hidden transition-all duration-500`}
    >
      <SimpleStarField opacity={0.2} />
      
      {/* Enhanced Background Effects */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-15'}`}>
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse ${
          isDark ? 'bg-cyan-400' : 'bg-blue-400'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000 ${
          isDark ? 'bg-purple-400' : 'bg-indigo-400'
        }`}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          className={`text-5xl font-bold mb-6 text-center ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Let's Build Something Amazing Together
        </motion.h2>
        
        <motion.p 
          className={`mb-12 text-center text-lg max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Ready to craft intelligent solutions with AI & ML? Let's connect and turn your ideas into reality!
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Enhanced Contact Form */}
          <motion.div
            className={`backdrop-blur-sm rounded-2xl p-8 border shadow-2xl ${
              isDark 
                ? 'bg-gray-800/30 border-cyan-500/20' 
                : 'bg-white/80 border-blue-300/30'
            }`}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-700/50 border-cyan-500/30 focus:border-cyan-400 placeholder-gray-400 text-white'
                      : 'bg-white/50 border-blue-300/50 focus:border-blue-500 placeholder-gray-500 text-gray-900'
                  }`}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-700/50 border-cyan-500/30 focus:border-cyan-400 placeholder-gray-400 text-white'
                      : 'bg-white/50 border-blue-300/50 focus:border-blue-500 placeholder-gray-500 text-gray-900'
                  }`}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Message *
                </label>
                <textarea
                  required
                  placeholder="Tell me about your project or idea..."
                  rows={5}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none transition-all duration-300 resize-none ${
                    isDark 
                      ? 'bg-gray-700/50 border-cyan-500/30 focus:border-cyan-400 placeholder-gray-400 text-white'
                      : 'bg-white/50 border-blue-300/50 focus:border-blue-500 placeholder-gray-500 text-gray-900'
                  }`}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
                } ${submitStatus === 'success' ? 'bg-green-500' : submitStatus === 'error' ? 'bg-red-500' : ''}`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : submitStatus === 'success' ? (
                  'Message Sent! ✅'
                ) : submitStatus === 'error' ? (
                  'Failed to Send ❌'
                ) : (
                  'Send Message 🚀'
                )}
              </motion.button>
              
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center text-sm"
                >
                  Thank you! I'll get back to you soon.
                </motion.p>
              )}
              
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-center text-sm"
                >
                  Failed to send message. Please check console or try emailing directly.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Enhanced Contact Options */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={`backdrop-blur-sm rounded-2xl p-8 border shadow-2xl ${
              isDark 
                ? 'bg-gray-800/30 border-cyan-500/20' 
                : 'bg-white/80 border-blue-300/30'
            }`}>
              <h3 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>
                Quick Connect
              </h3>
              <div className="space-y-4">
                {[
                  { 
                    icon: '📧', 
                    label: 'Email', 
                    value: 'microsoftrajeevranjan@gmail.com', 
                    href: 'mailto:microsoftrajeevranjan@gmail.com',
                    description: 'Send me an email directly'
                  },
                  { 
                    icon: '💼', 
                    label: 'LinkedIn', 
                    value: 'Professional Network', 
                    href: 'https://linkedin.com/in/rajeev-ranjan-pratap-singh/',
                    description: 'Connect on LinkedIn'
                  },
                  { 
                    icon: '💻', 
                    label: 'GitHub', 
                    value: 'View My Code', 
                    href: 'https://github.com/RAJEEVRANJAN0001',
                    description: 'Explore my projects'
                  },
                  { 
                    icon: '📍', 
                    label: 'Location', 
                    value: 'Dehri, Bihar', 
                    href: '#',
                    description: 'Based in India'
                  }
                ].map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? "_blank" : "_self"}
                    className={`block p-4 rounded-lg transition-all duration-300 group ${
                      isDark 
                        ? 'bg-gray-700/30 hover:bg-gray-600/40 border border-gray-600/30'
                        : 'bg-gray-100/50 hover:bg-gray-200/60 border border-gray-300/30'
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + (index * 0.1), duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                        isDark 
                          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20'
                          : 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20'
                      }`}>
                        {contact.icon}
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold transition-colors ${
                          isDark 
                            ? 'text-cyan-300 group-hover:text-cyan-200' 
                            : 'text-blue-700 group-hover:text-blue-600'
                        }`}>
                          {contact.label}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {contact.value}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {contact.description}
                        </div>
                      </div>
                      {contact.href.startsWith('http') && (
                        <div className={`text-sm ${isDark ? 'text-cyan-400' : 'text-blue-500'}`}>
                          ↗
                        </div>
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Response Time Info */}
            <motion.div
              className={`backdrop-blur-sm rounded-2xl p-6 border ${
                isDark 
                  ? 'bg-gray-800/30 border-cyan-500/20' 
                  : 'bg-white/80 border-blue-300/30'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h4 className={`font-semibold mb-3 ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>
                💬 Response Time
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                I typically respond within <span className={isDark ? 'text-cyan-400' : 'text-blue-600'}>24 hours</span>. 
                For urgent matters, feel free to reach out via LinkedIn.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Availability Status */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${
            isDark 
              ? 'bg-gray-800/30 border-green-500/30 text-green-400'
              : 'bg-green-50/80 border-green-300/50 text-green-700'
          }`}>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Available for new projects</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
