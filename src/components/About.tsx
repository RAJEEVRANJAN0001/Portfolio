import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import dynamic from 'next/dynamic';

const SimpleStarField = dynamic(() => import('./SimpleStarField'), { ssr: false });

export default function About() {
  const { isDark } = useTheme();
  
  const timeline = [
    { 
      year: '2025', 
      title: 'Advanced AI Certifications', 
      desc: 'Completed Generative AI using IBM Watsonx and Blockchain Developer certifications, expanding expertise in cutting-edge technologies.',
      icon: '🤖'
    },
    { 
      year: '2024', 
      title: 'Brain Tumor Detection Project', 
      desc: 'Built deep learning classification pipeline using ResNet50 and DenseNet121, achieving 99.69% accuracy in identifying brain tumors.',
      icon: '🧠'
    },
    { 
      year: '2023', 
      title: 'Emotion Detection System', 
      desc: 'Developed real-time emotion recognition system using CNNs, achieving 80% accuracy across 7 emotion classes with 25% latency reduction.',
      icon: '🎭'
    },
    { 
      year: '2022', 
      title: 'VIT Bhopal University', 
      desc: 'Started B.Tech in Computer Science & Engineering (AI&ML) with current CGPA of 8.53/10.',
      icon: '🎓'
    }
  ];

  const skills = [
    { name: 'Python', category: 'Programming', level: 95 },
    { name: 'TensorFlow', category: 'AI/ML', level: 92 },
    { name: 'Keras', category: 'AI/ML', level: 90 },
    { name: 'Deep Learning', category: 'AI/ML', level: 88 },
    { name: 'Computer Vision', category: 'AI/ML', level: 85 },
    { name: 'OpenCV', category: 'Computer Vision', level: 83 },
    { name: 'ResNet/DenseNet', category: 'Deep Learning', level: 82 },
    { name: 'CNNs', category: 'Deep Learning', level: 85 },
    { name: 'Scikit-learn', category: 'AI/ML', level: 88 },
    { name: 'NumPy', category: 'Data Science', level: 90 },
    { name: 'Pandas', category: 'Data Science', level: 88 },
    { name: 'Java', category: 'Programming', level: 75 },
    { name: 'JavaScript', category: 'Programming', level: 65 },
    { name: 'Node.js', category: 'Backend', level: 70 },
    { name: 'REST APIs', category: 'Backend', level: 80 },
    { name: 'GCP', category: 'Cloud', level: 75 },
    { name: 'AWS', category: 'Cloud', level: 70 },
    { name: 'MySQL', category: 'Database', level: 78 },
    { name: 'Git/GitHub', category: 'Tools', level: 85 }
  ];

  return (
    <section 
      id="about" 
      className={`py-20 px-4 relative overflow-hidden transition-all duration-500`}
    >
      <SimpleStarField opacity={0.4} />
      
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute top-20 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-pulse ${
          isDark ? 'bg-cyan-400' : 'bg-blue-400'
        }`}></div>
        <div className={`absolute top-40 right-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000 ${
          isDark ? 'bg-purple-400' : 'bg-indigo-400'
        }`}></div>
        <div className={`absolute bottom-20 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000 ${
          isDark ? 'bg-pink-400' : 'bg-purple-400'
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
            About Me
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-400 to-purple-600'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600'
          }`}></div>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          {/* About Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className={`absolute inset-0 rounded-3xl blur opacity-30 ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-600'
                  : 'bg-gradient-to-r from-blue-400 to-indigo-600'
              }`}></div>
              <div className={`relative backdrop-blur-sm p-8 rounded-3xl border transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800/50 border-cyan-500/30 text-gray-100'
                  : 'bg-white/70 border-blue-300/30 text-gray-800'
              }`}>
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 ${
                    isDark 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                  }`}>
                  </div>
                  <h3 className={`text-2xl font-bold ${
                    isDark ? 'text-cyan-300' : 'text-blue-600'
                  }`}>
                    AI & ML Developer
                  </h3>
                </div>
                
                <p className="text-lg mb-6 leading-relaxed">
                  I'm a passionate <span className={`font-semibold ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`}>AI & ML Enthusiast</span> from Dehri, Bihar, dedicated to building intelligent solutions that make a real difference. 
                  With expertise in <span className={`font-semibold ${
                    isDark ? 'text-purple-400' : 'text-indigo-600'
                  }`}>deep learning, computer vision, and neural networks</span>, 
                  I focus on creating practical applications that solve complex real-world problems.
                </p>
                
                <p className="text-lg mb-8 leading-relaxed">
                  Currently pursuing <span className={`font-semibold ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`}>B.Tech in Computer Science & Engineering (AI&ML)</span> at VIT Bhopal University 
                  with a CGPA of <span className={`font-semibold ${
                    isDark ? 'text-purple-400' : 'text-indigo-600'
                  }`}>8.53/10</span>. My achievements include developing 
                  high-accuracy AI models like a <span className={`font-semibold ${
                    isDark ? 'text-cyan-400' : 'text-blue-600'
                  }`}>99.69% accurate brain tumor detection system</span> and 
                  securing recognition in competitive robotics and coding workshops.
                </p>

                {/* Profile Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: 'CGPA', value: '8.53/10' },
                    { label: 'Projects', value: '15+' },
                    { label: 'Certifications', value: '5+' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className={`text-center p-4 rounded-xl ${
                        isDark 
                          ? 'bg-gray-700/30 border border-cyan-500/20'
                          : 'bg-white/50 border border-blue-200'
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className={`text-2xl font-bold ${
                        isDark ? 'text-cyan-400' : 'text-blue-600'
                      }`}>
                        {stat.value}
                      </div>
                      <div className={`text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Skills Word Cloud */}
                <div className="space-y-4">
                  <h4 className={`text-lg font-semibold ${
                    isDark ? 'text-cyan-300' : 'text-blue-600'
                  }`}>
                    Core Technologies
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className={`group relative px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 ${
                          isDark 
                            ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300 hover:from-cyan-500/30 hover:to-purple-500/30'
                            : 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-300/30 text-blue-700 hover:from-blue-500/30 hover:to-indigo-500/30'
                        }`}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill.name}
                        <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                          isDark ? 'bg-gray-800 text-white' : 'bg-gray-700 text-white'
                        }`}>
                          {skill.level}%
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Journey Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className={`text-3xl font-bold mb-10 ${
              isDark ? 'text-cyan-300' : 'text-blue-600'
            }`}>
              Journey Timeline
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${
                isDark ? 'bg-gradient-to-b from-cyan-500 to-purple-600' : 'bg-gradient-to-b from-blue-500 to-indigo-600'
              }`}></div>
              
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative flex items-start space-x-6 pb-8"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline Icon */}
                  <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                    isDark 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                  } text-white shadow-lg`}>
                    {item.icon}
                  </div>
                  
                  {/* Timeline Content */}
                  <div className={`flex-grow backdrop-blur-sm p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-gray-800/30 border-cyan-500/20 hover:bg-gray-800/50'
                      : 'bg-white/50 border-blue-200 hover:bg-white/70'
                  }`}>
                    <div className={`text-sm font-semibold mb-1 ${
                      isDark ? 'text-cyan-400' : 'text-blue-600'
                    }`}>
                      {item.year}
                    </div>
                    <h4 className={`font-bold text-lg mb-2 ${
                      isDark ? 'text-cyan-300' : 'text-blue-700'
                    }`}>
                      {item.title}
                    </h4>
                    <p className={`${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    } leading-relaxed`}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative group">
            <div className={`absolute inset-0 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity z-0 ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-400 to-purple-600'
                : 'bg-gradient-to-r from-blue-400 to-indigo-600'
            }`}></div>
            <img 
              src="/myphoto.png" 
              alt="Rajeev Ranjan Pratap Singh"
              className={`relative z-10 w-48 h-48 rounded-full object-cover shadow-2xl border-4 transition-transform duration-300 group-hover:scale-105 ${
                isDark ? 'border-white/20' : 'border-blue-200'
              }`} 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
