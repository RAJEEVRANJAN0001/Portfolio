import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const SimpleEarthBackground = dynamic(() => import('./SimpleEarthBackground'), { ssr: false });

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className={`flex flex-col items-center justify-center h-screen relative overflow-hidden transition-all duration-500`}>
      
      <SimpleEarthBackground opacity={0.8} />

      {/* Enhanced Theme-aware Floating Geometric Shapes */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-15' : 'opacity-10'}`}>
        {mounted && [...Array(15)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute border transition-colors duration-500 ${
              isDark 
                ? 'border-cyan-400/30 shadow-lg shadow-cyan-400/10' 
                : 'border-blue-400/40 shadow-lg shadow-blue-400/10'
            }`}
            style={{
              width: Math.random() * 40 + 20 + 'px',
              height: Math.random() * 40 + 20 + 'px',
              borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '0%' : '25%',
              background: isDark 
                ? `linear-gradient(45deg, rgba(34, 211, 238, 0.05), rgba(168, 85, 247, 0.05))`
                : `linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(99, 102, 241, 0.05))`,
            }}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              rotate: 0,
              scale: 0
            }}
            animate={{ 
              rotate: 360,
              scale: [0, 1, 0.8, 1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* AI Neural Network Lines */}
      <div className="absolute inset-0 opacity-10">
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute bg-gradient-to-r from-cyan-400 to-purple-600"
            style={{
              width: Math.random() * 200 + 100 + 'px',
              height: '1px',
              transformOrigin: 'left center',
            }}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              rotate: Math.random() * 360,
              scaleX: 0
            }}
            animate={{ 
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.5 }} 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10"
      >
        <motion.h1 
          className={`text-5xl md:text-7xl font-bold mb-4 ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent'
          }`}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Exploring the Digital Universe
        </motion.h1>
        
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className={`text-xl md:text-2xl font-medium relative z-10 ${
            isDark ? 'text-cyan-300' : 'text-blue-700'
          }`}>
            Where AI meets innovation, and dreams become reality
          </p>
          {/* Theme-aware glowing text effect */}
          <div className={`absolute inset-0 text-xl md:text-2xl font-medium blur-sm opacity-50 ${
            isDark ? 'text-cyan-300' : 'text-blue-600'
          }`}>
            Where AI meets innovation, and dreams become reality
          </div>
        </motion.div>
        
        <motion.div 
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.a 
            href="#projects" 
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Discover My Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.a>
          <motion.a 
            href="/resume.pdf" 
            target="_blank" 
            className="px-8 py-3 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume
          </motion.a>
          <motion.a 
            href="https://github.com/RAJEEVRANJAN0001" 
            target="_blank" 
            className="px-8 py-3 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
          </motion.a>
          <motion.a 
            href="https://linkedin.com/in/rajeev-ranjan-pratap-singh/" 
            target="_blank" 
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LinkedIn
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
