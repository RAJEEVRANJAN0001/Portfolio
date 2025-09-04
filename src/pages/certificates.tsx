'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  category: string;
  link?: string;
}

const allCertificates: Certificate[] = [
  {
    title: 'AWS Innovate - Every Application Edition',
    issuer: 'Amazon Web Services',
    year: '2022',
    category: 'Cloud & AI',
    link: '/Certifcate/aws innovate.png'
  },
  {
    title: 'AWS Machine Learning Foundations',
    issuer: 'Amazon Web Services',
    year: '2024',
    category: 'Cloud & AI',
    link: '/Certifcate/aws-educate-machine-learning-foundations.png'
  },
  {
    title: 'Microsoft Learn Course - AI Fundamentals',
    issuer: 'Microsoft',
    year: '2024',
    category: 'AI & ML',
    link: '/Certifcate/Achievements - rajeevranjanpratapsingh-0607 _ Microsoft Learn.pdf'
  },
  {
    title: 'MATLAB Programming Course',
    issuer: 'MathWorks',
    year: '2024',
    category: 'Programming',
    link: '/Certifcate/-MATLAB-certificate.pdf'
  },
  {
    title: 'Artificial Intelligence Foundations - Neural Networks',
    issuer: 'LinkedIn Learning',
    year: '2024',
    category: 'AI & ML',
    link: '/Certifcate/CertificateOfCompletion_Artificial Intelligence Foundations Neural Networks.pdf'
  },
  {
    title: 'Game Development using PyGame',
    issuer: 'GUVI',
    year: '2023',
    category: 'Programming',
    link: '/Certifcate/GuviCertification - A0516nNCiw91901W76.png'
  },
  {
    title: 'Communication Foundations',
    issuer: 'LinkedIn Learning',
    year: '2024',
    category: 'Soft Skills',
    link: '/Certifcate/CertificateOfCompletion_Communication Foundations.pdf'
  },
  {
    title: 'Communication Foundations - Advanced',
    issuer: 'LinkedIn Learning',
    year: '2024',
    category: 'Soft Skills',
    link: '/Certifcate/CertificateOfCompletion_Communication Foundations-2.pdf'
  },
  {
    title: 'Microsoft Bot Framework Development - Part 1',
    issuer: 'LinkedIn Learning',
    year: '2024',
    category: 'Development',
    link: '/Certifcate/CertificateOfCompletion_Creating Bots with the Microsoft Bot Framework Part 1.pdf'
  },
  {
    title: 'Time Management & Life Organization',
    issuer: 'LinkedIn Learning',
    year: '2024',
    category: 'Soft Skills',
    link: '/Certifcate/CertificateOfCompletion_How to Organize Your Time and Your Life.pdf'
  },
  {
    title: 'TCS Virtual Internship Program (on platform Forage)',
    issuer: 'Tata Consultancy Services',
    year: '2023',
    category: 'Industry Experience',
    link: '/Certifcate/N8Muuhk6XsXgMTeu2_Tata Consultancy Services_fPXEHqCz5evS8ekFm_1690914604330_completion_certificate.pdf'
  },
  {
    title: 'KPMG Virtual Internship (on platform Forage)',
    issuer: 'KPMG Australia',
    year: '2023',
    category: 'Industry Experience',
    link: '/Certifcate/m7W4GMqeT3bh9Nb2c_KPMG AU_fPXEHqCz5evS8ekFm_1690923504201_completion_certificate.pdf'
  },
  {
    title: 'Walmart USA Virtual Experience (on platform Forage)',
    issuer: 'Walmart',
    year: '2023',
    category: 'Industry Experience',
    link: '/Certifcate/Walmart USA_completion_certificate.pdf'
  },
  {
    title: 'Crowdsource Learning Community Program',
    issuer: 'Google',
    year: '2023',
    category: 'Community Learning',
    link: '/Certifcate/Crowdsource Learning Community Program completion certificate.pdf'
  },
  {
    title: 'GITEX Global 2022 - Digital Universe Badge',
    issuer: 'GITEX',
    year: '2022',
    category: 'Events & Workshops & Conference',
    link: '/Certifcate/GITEX22DU_Badge_2295104532 (1).pdf'
  },
  {
    title: 'Programming Workshop Certificate',
    issuer: 'Workshop Provider',
    year: '2023',
    category: 'Events & Workshops & Conference',
    link: '/Certifcate/certificate.jpg'
  },
  {
    title: 'Specialized Course Certificate',
    issuer: 'Specialized Training Center',
    year: '2023',
    category: 'Technical Skills',
    link: '/Certifcate/Rajeev.pdf'
  },
  {
    title: 'Workshop Participation Certificate',
    issuer: 'Workshop Organizer',
    year: '2022',
    category: 'Events & Workshops & Conference',
    link: '/Certifcate/Screenshot_2022-10-12-07-39-30-14_e307a3f9df9f380ebaf106e1dc980bb6.jpg'
  },
  {
    title: 'Technical Training Completion',
    issuer: 'Training Institute',
    year: '2023',
    category: 'Technical Skills',
    link: '/Certifcate/Rajeev_singh_2858406.pdf'
  },
  {
    title: 'Online Course Completion - Technical Skills',
    issuer: 'Udemy',
    year: '2023',
    category: 'Technical Skills',
    link: '/Certifcate/UC-3a78146d-5dcd-43d0-8ff4-c205412ac802.pdf'
  }
];

const categories = ['All', 'AI & ML', 'Programming', 'Cloud & AI', 'Soft Skills', 'Development', 'Industry Experience', 'Community Learning', 'Events & Workshops & Conference', 'Technical Skills'];

export default function CertificatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredCertificates = selectedCategory === 'All' 
    ? allCertificates 
    : allCertificates.filter(cert => cert.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Learning Journey - Rajeev Ranjan Pratap Singh</title>
        <meta name="description" content="Complete collection of courses, workshops, and learning experiences" />
      </Head>
      
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Header */}
        <div className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Portfolio
            </Link>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Learning Journey
            </h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Complete Learning Journey
            </h1>
            <p className="text-cyan-300 text-lg mb-8">
              Comprehensive collection of courses, workshops, internships, and learning experiences
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Certificates Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filteredCertificates.map((cert, index) => (
              <motion.div
                key={`${cert.title}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-gray-800/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl hover:border-cyan-400/40 transition-all duration-300 h-full"
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          cert.category === 'AI & ML' ? 'bg-purple-500/20 text-purple-300' :
                          cert.category === 'Programming' ? 'bg-green-500/20 text-green-300' :
                          cert.category === 'Cloud & AI' ? 'bg-blue-500/20 text-blue-300' :
                          cert.category === 'Soft Skills' ? 'bg-pink-500/20 text-pink-300' :
                          cert.category === 'Development' ? 'bg-indigo-500/20 text-indigo-300' :
                          cert.category === 'Industry Experience' ? 'bg-yellow-500/20 text-yellow-300' :
                          cert.category === 'Community Learning' ? 'bg-emerald-500/20 text-emerald-300' :
                          cert.category === 'Events & Workshops & Conference' ? 'bg-violet-500/20 text-violet-300' :
                          cert.category === 'Technical Skills' ? 'bg-teal-500/20 text-teal-300' :
                          'bg-cyan-500/20 text-cyan-300'
                        }`}>
                          {cert.category}
                        </span>
                        <span className="text-gray-400 text-sm">{cert.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-cyan-300 mb-2">{cert.issuer}</p>
                    </div>
                    
                    <motion.div
                      className="mt-4 flex items-center text-cyan-400 text-sm"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0.7 }}
                    >
                      <span>View Document</span>
                      <motion.svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: hoveredIndex === index ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </motion.div>
                  </div>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-800/40 rounded-lg">
                <div className="text-2xl font-bold text-cyan-400">{allCertificates.length}</div>
                <div className="text-gray-400 text-sm">Total Certificates</div>
              </div>
              <div className="p-4 bg-gray-800/40 rounded-lg">
                <div className="text-2xl font-bold text-cyan-400">{categories.length - 1}</div>
                <div className="text-gray-400 text-sm">Categories</div>
              </div>
              <div className="p-4 bg-gray-800/40 rounded-lg">
                <div className="text-2xl font-bold text-cyan-400">2023-2024</div>
                <div className="text-gray-400 text-sm">Time Period</div>
              </div>
              <div className="p-4 bg-gray-800/40 rounded-lg">
                <div className="text-2xl font-bold text-cyan-400">Ongoing</div>
                <div className="text-gray-400 text-sm">Learning</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
