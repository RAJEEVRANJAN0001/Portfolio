import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-12 bg-gradient-to-r from-gray-950 via-blue-950 to-gray-950 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4">
              Rajeev Ranjan Pratap Singh
            </h3>
            <p className="text-gray-400 mb-4">
              Crafting intelligent solutions with AI & ML. Always exploring the frontier of technology.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-cyan-300 mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Projects', 'Skills', 'Achievements', 'Contact'].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-cyan-300 mb-4">Let's Connect</h4>
            <div className="space-y-3">
              {[
                { name: 'GitHub', icon: '💻', href: 'https://github.com/RAJEEVRANJAN0001' },
                { name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/in/rajeev-ranjan-pratap-singh/' },
                { name: 'Email', icon: '📧', href: 'mailto:rajeevranjanpratapsingh@gmail.com' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  className="flex items-center space-x-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">{social.icon}</span>
                  <span>{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="pt-8 border-t border-cyan-500/20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Rajeev Ranjan Pratap Singh. 
            <span className="text-cyan-400"> Crafted with passion and AI</span> ✨
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
