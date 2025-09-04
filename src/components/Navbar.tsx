import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close mobile menu when clicking on nav items
  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#certifications' },
    { name: 'Contact', href: '#contact' }
  ];

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${
        isDark 
          ? 'bg-gray-950/80 backdrop-blur-md border-cyan-500/20' 
          : 'bg-white/80 backdrop-blur-md border-gray-200/50'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-responsive">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <motion.span 
            className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Rajeev
          </motion.span>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`transition-colors duration-300 relative group font-medium ${
                  isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-cyan-600'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}

            {/* Theme Toggle - Desktop */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center space-x-3 lg:hidden">
            {/* Theme Toggle - Mobile */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>

            {/* Hamburger Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-11 h-11 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 flex items-center justify-center ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              <div className="w-5 h-4 relative">
                <motion.span
                  className={`absolute left-0 w-5 h-0.5 rounded-full transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-gray-800'
                  }`}
                  animate={{
                    top: isOpen ? '50%' : '0%',
                    rotate: isOpen ? '45deg' : '0deg',
                    y: isOpen ? '-50%' : '0%'
                  }}
                />
                <motion.span
                  className={`absolute left-0 top-1/2 w-5 h-0.5 rounded-full transform -translate-y-1/2 transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-gray-800'
                  }`}
                  animate={{ opacity: isOpen ? 0 : 1 }}
                />
                <motion.span
                  className={`absolute left-0 w-5 h-0.5 rounded-full transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-gray-800'
                  }`}
                  animate={{
                    bottom: isOpen ? '50%' : '0%',
                    rotate: isOpen ? '-45deg' : '0deg',
                    y: isOpen ? '50%' : '0%'
                  }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ top: '70px' }}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className={`fixed left-0 right-0 lg:hidden shadow-xl border-t ${
                isDark 
                  ? 'bg-gray-950/95 backdrop-blur-md border-cyan-500/20' 
                  : 'bg-white/95 backdrop-blur-md border-gray-200'
              }`}
              style={{ top: '70px' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-4">
                <div className="flex flex-col space-y-1">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={handleNavClick}
                      className={`px-4 py-3 rounded-lg font-medium transition-colors duration-300 min-h-[44px] flex items-center ${
                        isDark 
                          ? 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50' 
                          : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-100'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
