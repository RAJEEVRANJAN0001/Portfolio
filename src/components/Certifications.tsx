import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import dynamic from 'next/dynamic';

const SimpleStarField = dynamic(() => import('./SimpleStarField'), { ssr: false });

export default function Certifications() {
  const { isDark } = useTheme();

  const certifications = [
    {
      title: "Applied Machine Learning in Python",
      issuer: "Coursera",
      year: "2023",
      description: "Comprehensive course covering machine learning algorithms, data preprocessing, and model evaluation using Python.",
      skills: ["Python", "Scikit-learn", "Data Analysis", "ML Algorithms"],
      icon: "🐍"
    },
    {
      title: "Google Analytics Certification",
      issuer: "Google",
      year: "2026",
      score: "86%",
      description: "Professional certification in web analytics, data interpretation, and performance measurement.",
      skills: ["Analytics", "Data Interpretation", "Performance Metrics", "Reporting"],
      icon: "📊"
    },
    {
      title: "Google Ads AI-Powered Performance",
      issuer: "Google",
      year: "2026",
      score: "91.3%",
      description: "Advanced certification in AI-powered advertising strategies and performance optimization.",
      skills: ["AI Marketing", "Performance Optimization", "Campaign Management", "Data-Driven Insights"],
      icon: "🎯"
    },
    {
      title: "Blockchain Developer",
      issuer: "IBM Cognitive Class",
      year: "2025",
      description: "Comprehensive blockchain development course covering distributed ledger technology and smart contracts.",
      skills: ["Blockchain", "Smart Contracts", "Distributed Systems", "Cryptography"],
      icon: "⛓️"
    },
    {
      title: "Generative AI using IBM Watsonx",
      issuer: "IBM Cognitive Class",
      year: "2025",
      description: "Advanced course on generative AI models, prompt engineering, and enterprise AI solutions.",
      skills: ["Generative AI", "Watson AI", "Prompt Engineering", "Enterprise AI"],
      icon: "🤖"
    },
    {
      title: "2nd Place - Robotics and Coding Workshop",
      issuer: "VIT Bhopal",
      year: "2024",
      description: "Secured 2nd place in competitive robotics and coding workshop, demonstrating technical excellence.",
      skills: ["Robotics", "Programming", "Problem Solving", "Team Collaboration"],
      icon: "🏆"
    },
    {
      title: "KPMG AU Data Analytics",
      issuer: "Forage",
      year: "2024",
      description: "Worked on customer segmentation and dashboard design for enterprise-level data analytics.",
      skills: ["Data Analytics", "Dashboards", "Customer Segmentation", "Business Intelligence"],
      icon: "📈"
    },
    {
      title: "Accenture Nordics Software Engineering",
      issuer: "Forage",
      year: "2024",
      description: "Applied Agile and SSDLC methodologies in real-world software development scenarios.",
      skills: ["Agile", "SSDLC", "Debugging", "Code Reading", "Software Development"],
      icon: "⚡"
    },
    {
      title: "Walmart USA Software Engineering",
      issuer: "Forage",
      year: "2024",
      description: "Applied software engineering concepts in enterprise-scale development environment.",
      skills: ["Python", "Java", "SQL", "UML", "Software Architecture"],
      icon: "🏪"
    }
  ];

  return (
    <section 
      id="certifications" 
      className={`py-20 px-4 relative overflow-hidden transition-all duration-500`}
    >
      <SimpleStarField opacity={0.25} />
      
      {/* Enhanced Background Effects */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-15'}`}>
        <div className={`absolute top-1/4 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse ${
          isDark ? 'bg-cyan-400' : 'bg-blue-400'
        }`}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-3000 ${
          isDark ? 'bg-purple-400' : 'bg-indigo-400'
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-5xl font-bold mb-4 ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
          }`}>
            Certifications & Achievements
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-400 to-purple-600'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600'
          }`}></div>
          <p className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Professional certifications and achievements in AI, ML, and emerging technologies
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div 
              key={cert.title}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Enhanced Glow Effect */}
              <div className={`absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600'
                  : 'bg-gradient-to-r from-blue-400 to-indigo-500'
              }`}></div>
              
              <div className={`relative backdrop-blur-sm rounded-2xl p-8 shadow-2xl border h-full transform transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gray-800/50 border-cyan-500/20 hover:bg-gray-800/70'
                  : 'bg-white/70 border-blue-300/30 hover:bg-white/90'
              }`}>
                {/* Certificate Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                    isDark 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                  }`}>
                    {cert.icon}
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className={`text-xl font-semibold mb-2 transition-colors ${
                      isDark ? 'text-cyan-300 group-hover:text-cyan-200' : 'text-blue-700 group-hover:text-blue-600'
                    }`}>
                      {cert.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {cert.issuer}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDark 
                          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300'
                          : 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-300/30 text-blue-700'
                      }`}>
                        {cert.year}
                      </span>
                      {cert.score && (
                        <>
                          <span className="text-gray-500">•</span>
                          <motion.span
                            className={`px-3 py-1 rounded-full text-sm font-bold ${
                              isDark 
                                ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-300'
                                : 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 text-orange-700'
                            }`}
                            whileHover={{ scale: 1.1 }}
                          >
                            Score: {cert.score}
                          </motion.span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Certificate Description */}
                <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {cert.description}
                </p>

                {/* Skills Tags */}
                <div className="space-y-3">
                  <h4 className={`text-sm font-semibold ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                    Key Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          isDark 
                            ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/30'
                            : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 border border-gray-300/30'
                        }`}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (index * 0.2) + (skillIndex * 0.1), duration: 0.3 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="mt-6 pt-4 border-t border-opacity-30">
                  <div className={`flex items-center justify-center py-2 px-4 rounded-lg ${
                    isDark 
                      ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20'
                      : 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-300/20'
                  }`}>
                    <span className={`text-sm font-medium ${isDark ? 'text-cyan-300' : 'text-blue-600'}`}>
                      ✨ Professional Certification
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Certifications', value: '5+', icon: '🎖️' },
            { label: 'Achievement Score', value: '91.3%', icon: '🏆' },
            { label: 'Specialized Areas', value: '4+', icon: '🚀' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`backdrop-blur-sm rounded-2xl p-6 text-center border transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gray-800/30 border-cyan-500/20 hover:bg-gray-800/50'
                  : 'bg-white/50 border-blue-300/30 hover:bg-white/70'
              }`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + (index * 0.1), duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-cyan-300' : 'text-blue-600'}`}>
                {stat.value}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Professional certifications validating expertise in AI, ML, and emerging technologies
          </p>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block px-8 py-3 rounded-full transition-all duration-300 shadow-lg font-medium ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Complete Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
