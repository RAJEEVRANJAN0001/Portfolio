'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  link?: string;
}

const certificates: Certificate[] = [
  {
    title: 'AWS Innovate - Every Application Edition',
    issuer: 'Amazon Web Services',
    year: '2022',
    link: '/Certifcate/aws innovate.png'
  },
  {
    title: 'AWS Machine Learning Foundations',
    issuer: 'Amazon Web Services',
    year: '2024',
    link: '/Certifcate/aws-educate-machine-learning-foundations.png'
  },
  {
    title: 'MATLAB Course',
    issuer: 'MathWorks',
    year: '2024',
    link: '/Certifcate/-MATLAB-certificate.pdf'
  }
];

export default function CertificatesShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 bg-gray-900/30 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Learning Journey
          </h2>
          <p className="text-cyan-300 text-base mb-6">
            Courses, workshops, and events attended for continuous learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-800/40 backdrop-blur-sm border border-cyan-500/15 rounded-lg hover:border-cyan-400/30 transition-all duration-300 h-full"
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-cyan-300 text-sm mb-1">{cert.issuer}</p>
                    <p className="text-gray-400 text-xs">{cert.year}</p>
                  </div>
                  
                  <motion.div
                    className="mt-3 flex items-center text-cyan-400 text-xs"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0.6 }}
                  >
                    <span>View Document</span>
                    <motion.svg
                      className="w-3 h-3 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: hoveredIndex === index ? 3 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.div>
                </div>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link href="/certificates">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 font-semibold text-white">View All Certificates</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </Link>
          
          <motion.p
            className="text-gray-400 text-xs mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            20+ certificates and learning experiences available
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
