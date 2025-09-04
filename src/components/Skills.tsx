import skills from '../data/skills';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories = {
    'Programming Languages': skills.filter(s => ['Python', 'Java', 'JavaScript', 'HTML', 'CSS'].includes(s.name)),
    'AI/ML & Data Science': skills.filter(s => ['TensorFlow', 'Keras', 'Scikit-learn', 'NumPy', 'Pandas', 'NLP'].includes(s.name)),
    'Computer Vision & Deep Learning': skills.filter(s => ['OpenCV', 'DenseNet', 'ResNet', 'CNNs', 'CBAM'].includes(s.name)),
    'Web Development': skills.filter(s => ['Next.js', 'Node.js', 'REST APIs', 'Tailwind CSS', 'Framer Motion'].includes(s.name)),
    'Cloud & Databases': skills.filter(s => ['AWS', 'GCP', 'MySQL'].includes(s.name)),
    'Development Tools': skills.filter(s => ['Git', 'GitHub', 'Jupyter Notebook', 'VS Code', 'PyCharm'].includes(s.name)),
    'Core CS & Methodologies': skills.filter(s => ['DSA', 'OOP', 'Operating Systems', 'DBMS', 'API Automation', 'Agile', 'SSDLC'].includes(s.name)),
    'Soft Skills': skills.filter(s => ['Team Collaboration', 'Technical Communication', 'Presentation', 'Self-Learning'].includes(s.name))
  };

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      {/* 3D Earth Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/textures/clouds-earth.png')`,
              backgroundSize: '100% 100%',
              filter: 'blur(1px)'
            }}
          />
        </div>
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Technical Expertise
        </motion.h2>

        {Object.entries(skillCategories).map(([category, categorySkills], categoryIndex) => (
          <motion.div
            key={category}
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-cyan-300">{category}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categorySkills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  className="group relative"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1), duration: 0.6 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                  
                  <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center hover:bg-gray-700/80 transition-all duration-300 border border-cyan-500/20 h-32">
                    <motion.span 
                      className="text-3xl mb-3"
                      animate={{ 
                        rotate: hoveredSkill === skill.name ? 360 : 0,
                        scale: hoveredSkill === skill.name ? 1.2 : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {skill.icon}
                    </motion.span>
                    <span className="font-semibold text-center text-sm text-white">{skill.name}</span>
                    
                    {/* Progress Bar */}
                    <motion.div
                      className="w-full bg-gray-700 rounded-full h-1 mt-2 overflow-hidden"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.5, duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-600"
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${85 + Math.random() * 15}%` }}
                        transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.7, duration: 1 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Skills Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <h3 className="text-2xl font-semibold mb-4 text-cyan-300">Continuous Learning</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Always exploring cutting-edge technologies and methodologies in AI/ML. 
              Currently diving deeper into transformer architectures, MLOps, and edge computing solutions.
            </p>
            
            {/* Animated Tech Icons Flow */}
            <div className="flex justify-center mt-6 space-x-4 overflow-hidden">
              {[
                { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', name: 'TensorFlow' },
                { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', name: 'Python' },
                { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', name: 'React' },
                { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', name: 'AWS' },
                { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', name: 'Docker' },
                { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', name: 'Git' }
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  <img 
                    src={tech.icon} 
                    alt={tech.name}
                    className="w-8 h-8 filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(180deg)' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
