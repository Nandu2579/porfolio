import React, { useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaGraduationCap, FaCode, FaLaptopCode, FaQuoteLeft } from 'react-icons/fa';
import { MdOutlineWavingHand } from 'react-icons/md';

const About = () => {
  const { darkMode } = useContext(ThemeContext);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };


  return (
    <motion.section
      id="about"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={`py-24 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} relative overflow-hidden`}
    >
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Top decorative lines with improved styling */}
        <div className={`absolute top-0 left-0 w-full h-1 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}></div>
        <div className={`absolute top-4 left-0 w-3/4 h-0.5 ${darkMode ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
        <div className={`absolute top-8 left-0 w-1/2 h-0.5 ${darkMode ? 'bg-blue-400' : 'bg-blue-300'}`}></div>
        
        {/* Bottom decorative lines */}
        <div className={`absolute bottom-0 right-0 w-full h-1 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}></div>
        <div className={`absolute bottom-4 right-0 w-3/4 h-0.5 ${darkMode ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
        <div className={`absolute bottom-8 right-0 w-1/2 h-0.5 ${darkMode ? 'bg-blue-400' : 'bg-blue-300'}`}></div>
        
        {/* Animated geometric shapes */}
        <motion.div 
          animate={{ 
            rotate: 360,
            transition: { duration: 40, repeat: Infinity, ease: "linear" }
          }}
          className="absolute top-1/4 left-10 w-64 h-64 rounded-full border-2 border-dashed border-blue-400/10"
        ></motion.div>
        <motion.div 
          animate={{ 
            rotate: -360,
            transition: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
          className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full border border-blue-500/10"
        ></motion.div>
        
        {/* Additional decorative elements */}
        <div className={`absolute top-1/2 left-0 w-2 h-20 ${darkMode ? 'bg-blue-500/20' : 'bg-blue-400/20'}`}></div>
        <div className={`absolute top-1/3 right-0 w-2 h-20 ${darkMode ? 'bg-blue-500/20' : 'bg-blue-400/20'}`}></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Improved heading with animation and icon */}
        <motion.div variants={itemVariants} className="mb-16 relative flex items-center">
          <h2 className={`text-4xl md:text-5xl font-bold relative ${darkMode ? 'text-white' : 'text-gray-900'} pr-4`}>
            About Me
            <span className={`absolute -bottom-2 left-0 h-1 w-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} rounded-full`}></span>
          </h2>
          <motion.span 
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 15, 0, -15, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 5, duration: 1.5 }}
            className="ml-2 text-blue-500"
          >
            <MdOutlineWavingHand size={32} />
          </motion.span>
        </motion.div>
        
        {/* Bio section with enhanced styling */}
        <div className="flex flex-col gap-12">
          <motion.div variants={containerVariants} className="space-y-8 relative">
            <div className="absolute -left-6 top-0 text-blue-400/20">
              <FaQuoteLeft size={40} />
            </div>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl leading-relaxed pl-4 border-l-2 border-blue-500/30">
              I'm a 3rd year BTech student specializing in <span className={`font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Full Stack Development</span>. My academic journey has equipped me with a strong foundation in web technologies, data structures, and algorithms, and I'm passionate about leveraging technology to solve real-world problems.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl leading-relaxed pl-4 border-l-2 border-blue-500/30">
              What makes me unique? My eye for detail, creativity, and commitment to delivering pixel-perfect designs. I thrive on turning ideas into functional and visually appealing websites. When I'm not coding, you'll find me exploring new design trends, experimenting with color palettes, and staying up-to-date with the latest industry developments.
            </motion.p>
          </motion.div>
          
          {/* Enhanced cards with consistent styling and improved animations */}
          <div variants={containerVariants} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <FaGraduationCap size={28} />, 
                  title: "Education", 
                  details: [
                    "BTech in Computer Science", 
                    "SRKR Engineering College", 
                    "2022-2026"
                  ],
                  color: "from-blue-600 to-blue-400",
                  bgGradient: darkMode ? "from-gray-800 to-gray-900" : "from-white to-gray-50"
                },
                { 
                  icon: <FaCode size={28} />, 
                  title: "Core Skills", 
                  details: [
                    "MERN Stack", 
                    "API Development", 
                    "Responsive Design"
                  ],
                  color: "from-purple-600 to-blue-500",
                  bgGradient: darkMode ? "from-gray-800 to-gray-900" : "from-white to-gray-50"
                },
                { 
                  icon: <FaLaptopCode size={28} />, 
                  title: "Interests", 
                  details: [
                    "Designing", 
                    "Experimenting", 
                    "Learning"
                  ],
                  color: "from-blue-500 to-cyan-400",
                  bgGradient: darkMode ? "from-gray-800 to-gray-900" : "from-white to-gray-50"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8, 
                    boxShadow: darkMode ? '0 20px 30px -12px rgba(0, 0, 0, 0.7)' : '0 20px 30px -12px rgba(0, 0, 0, 0.2)',
                    transition: { type: 'spring', stiffness: 300, damping: 15 }
                  }}
                  className={`relative overflow-hidden rounded-lg transition-all duration-300 bg-gradient-to-br ${item.bgGradient} border ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  } backdrop-blur-sm p-8`}
                >
                  {/* Colorful accent bar on left side */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${item.color} rounded-l`}></div>
                  
                  {/* Glow effect in the background */}
                  <div className={`absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br ${item.color} opacity-10 blur-xl`}></div>
                  
                  {/* Icon and title with enhanced styling */}
                  <div className="flex items-center mb-6 gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white`}>
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-xl">{item.title}</h3>
                  </div>
                  
                  {/* List items with improved styling */}
                  <ul className="space-y-4 ml-1">
                    {item.details.map((detail, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`}></div>
                        <span className="text-lg">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;