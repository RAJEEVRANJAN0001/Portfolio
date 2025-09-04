import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import dynamic from 'next/dynamic';

const EarthBackgroundLight = dynamic(() => import('./EarthBackgroundLight'), { ssr: false });

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { isDark } = useTheme();

  const projects = [
    {
      title: "Brain Tumor Detection Using AI",
      year: "2024",
      description: "Built a deep learning classification pipeline using ResNet50 and DenseNet121, achieving 99.69% accuracy in identifying brain tumors across multiple MRI scan types.",
      technologies: ["Python", "TensorFlow", "ResNet50", "DenseNet121", "OpenCV", "NumPy"],
      achievements: [
        "99.69% accuracy in tumor classification",
        "Processed 3,264 annotated MRI images",
        "18% reduction in model overfitting",
        "Enhanced diagnostic speed for clinical workflows"
      ],
      category: "AI/ML",
      github: "https://github.com",
      icon: "🧠"
    },
    {
      title: "Emotion Detection System",
      year: "2023",
      description: "Developed a real-time emotion recognition system using Convolutional Neural Networks (CNNs), achieving 80% accuracy across 7 emotion classes.",
      technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "CNNs", "Computer Vision"],
      achievements: [
        "80% accuracy across 7 emotion classes",
        "Processed over 10,000 facial images",
        "25% reduction in latency",
        "Real-time video streaming integration"
      ],
      category: "Computer Vision",
      github: "https://github.com",
      icon: "🎭"
    },
    {
      title: "Diabetic Retinopathy Detection",
      year: "2025",
      description: "Designed a CNN-based diagnostic pipeline using DenseNet-121 with CBAM attention mechanism to detect 5 DR stages, achieving 80% test accuracy on APTOS 2019 dataset.",
      technologies: ["Python", "DenseNet-121", "CBAM", "OpenCV", "Data Augmentation"],
      achievements: [
        "80% test accuracy on APTOS 2019 dataset",
        "Cohen's Kappa Score of 0.76",
        "Processed 3,662 retinal fundus images",
        "Balanced class distribution through augmentation"
      ],
      category: "Medical AI",
      github: "https://github.com",
      icon: "👁️"
    }
  ];

  return (
    <section 
      id="projects" 
      className={`py-20 px-4 relative overflow-hidden transition-all duration-500`}
    >
      <EarthBackgroundLight opacity={0.4} />
      
      {/* Enhanced Background Effects */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-15'}`}>
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse ${
          isDark ? 'bg-cyan-400' : 'bg-blue-400'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000 ${
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
            Featured Projects
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-400 to-purple-600'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600'
          }`}></div>
          <p className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Innovative AI/ML solutions solving real-world problems with cutting-edge technology
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              {/* Enhanced Glow Effect */}
              <div className={`absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600'
                  : 'bg-gradient-to-r from-blue-400 to-indigo-500'
              }`}></div>
              
              <div className={`relative backdrop-blur-sm rounded-2xl shadow-2xl p-8 border h-full flex flex-col transform transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-gray-900/80 border-cyan-500/20 hover:bg-gray-900/90'
                  : 'bg-white/80 border-blue-300/30 hover:bg-white/90'
              }`}>
                {/* Project Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-3xl ${
                      isDark 
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                    }`}>
                      {project.icon}
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDark 
                          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300'
                          : 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-300/30 text-blue-700'
                      }`}>
                        {project.year}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className={`text-2xl font-semibold mb-3 transition-colors ${
                    isDark ? 'text-cyan-300 group-hover:text-cyan-200' : 'text-blue-700 group-hover:text-blue-600'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                </div>

                {/* Key Achievements */}
                <div className="mb-6">
                  <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                    Key Achievements:
                  </h4>
                  <ul className="space-y-2">
                    {project.achievements.slice(0, 3).map((achievement, achIndex) => (
                      <motion.li
                        key={achIndex}
                        className={`text-sm flex items-start ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.2) + (achIndex * 0.1), duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <span className={`mr-2 ${isDark ? 'text-cyan-400' : 'text-blue-500'}`}>•</span>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          isDark 
                            ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600/30'
                            : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 border border-gray-300/30'
                        }`}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (index * 0.2) + (techIndex * 0.1), duration: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto">
                  <motion.a 
                    href={project.github} 
                    target="_blank"
                    className={`w-full block px-6 py-3 rounded-lg text-center text-sm font-medium transition-all duration-300 ${
                      isDark 
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      📂 View Project Details
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'AI Projects', value: '15+', icon: '' },
            { label: 'Accuracy Rate', value: '99.69%', icon: '' },
            { label: 'Images Processed', value: '17K+', icon: '' },
            { label: 'Technologies', value: '12+', icon: '' }
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
            Explore more projects and contributions on my GitHub profile
          </p>
          <motion.button
            className={`px-8 py-3 rounded-full transition-all duration-300 shadow-lg font-medium ${
              isDark 
                ? 'bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 hover:bg-gray-700/50 text-cyan-300'
                : 'bg-white/50 backdrop-blur-sm border border-blue-300/30 hover:bg-gray-100/50 text-blue-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://github.com/RAJEEVRANJAN0001', '_blank', 'noopener,noreferrer')}
          >
            View More on GitHub
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
