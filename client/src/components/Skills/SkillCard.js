import React, { useContext, useRef, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaReact, 
  FaNodeJs,
  FaGithub,
  FaServer
} from 'react-icons/fa';
import { SiJavascript, SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si';

const SkillCard = () => {
  const { darkMode } = useContext(ThemeContext);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeTab, setActiveTab] = useState('frontend');
  
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
        staggerChildren: 0.1,
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

  // Organize skills by categories
  const skillCategories = {
    frontend: [
      { icon: <FaHtml5 size={28} />, name: "HTML5", proficiency: 95, color: "#E34F26" },
      { icon: <FaCss3Alt size={28} />, name: "CSS3", proficiency: 90, color: "#1572B6" },
      { icon: <SiJavascript size={28} />, name: "JavaScript", proficiency: 60, color: "#F7DF1E" },
      { icon: <FaReact size={28} />, name: "React", proficiency: 75, color: "#61DAFB" },
      { icon: <SiTailwindcss size={28} />, name: "Tailwind CSS", proficiency: 80, color: "#38B2AC" }
    ],
    backend: [
      { icon: <FaNodeJs size={28} />, name: "Node.js", proficiency: 60, color: "#339933" },
      { icon: <SiExpress size={28} />, name: "Express", proficiency: 60, color: "#000000" },
      { icon: <SiMongodb size={28} />, name: "MongoDB", proficiency: 85, color: "#47A248" },
      { icon: <FaServer size={28} />, name: "RESTful APIs", proficiency: 85, color: "#FF6B6B" }
    ],
    tools: [
      { icon: <FaGithub size={28} />, name: "Git/GitHub", proficiency: 85, color: "#181717" },
      { icon: <FaReact size={28} />, name: "React Native", proficiency: 60, color: "#61DAFB" },
      { icon: <SiTailwindcss size={28} />, name: "UI/UX Design", proficiency: 70, color: "#38B2AC" }
    ]
  };

  return (
    <motion.section
      id="skills"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={`py-24 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} relative overflow-hidden`}
    >
      {/* Unique background pattern - simplified and more subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute inset-0 grid grid-cols-12 gap-6">
          {/* Reduced array elements to prevent potential rendering issues */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className={`h-4 rounded-full ${
                i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-blue-400' : 'bg-blue-300'
              }`}
              style={{ 
                gridColumn: `span ${Math.floor(Math.random() * 3) + 1}`,
                opacity: Math.random() * 0.4 + 0.1
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16"
        >
          <div>
            <h2 className={`text-4xl font-bold relative inline-block ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              My Skills
              <span className={`absolute -bottom-2 left-0 h-1 w-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
            </h2>
            <p className={`mt-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Technologies I've been working with recently
            </p>
          </div>

          {/* Category tabs - improved styling */}
          <div className={`flex gap-2 p-1 rounded-lg ${darkMode ? 'bg-gray-800/80' : 'bg-gray-100'} backdrop-blur-sm shadow-sm`}>
            {Object.keys(skillCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === category
                    ? darkMode 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                      : 'bg-white text-blue-600 shadow-sm'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid gap-8"
          key={activeTab} // Force re-render on tab change
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skillCategories[activeTab].map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                variants={itemVariants}
                custom={index}
                whileHover={{ 
                  y: -5, 
                  boxShadow: darkMode 
                    ? '0 15px 30px -5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(59, 130, 246, 0.2)' 
                    : '0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 0 10px rgba(59, 130, 246, 0.1)'
                }}
                className={`relative overflow-hidden rounded-xl ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } border p-6 flex flex-col items-center justify-center transition-all duration-300`}
              >
                {/* Circular background for icon */}
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-5"
                  style={{ color: skill.color }}
                >
                  <div className="w-56 h-56 rounded-full">
                    {React.cloneElement(skill.icon, { size: 220 })}
                  </div>
                </div>
                
                {/* Skill content */}
                <div className="relative flex flex-col items-center">
                  {/* Icon with brand color */}
                  <div 
                    className="mb-4" 
                    style={{ color: skill.color }}
                  >
                    {skill.icon}
                  </div>
                  
                  {/* Improved text contrast with background shadow for better readability */}
                  <h3 className={`text-lg font-semibold mb-3 ${
                    darkMode ? 'text-white drop-shadow-sm' : 'text-gray-900'
                  }`}>
                    {skill.name}
                  </h3>
                  
                  {/* Circular progress - improved visibility */}
                  <div className="w-16 h-16 relative mb-2">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      {/* Background circle */}
                      <path
                        className={`stroke-current ${darkMode ? 'text-gray-700' : 'text-gray-200'}`}
                        fill="none"
                        strokeWidth="3"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      {/* Progress circle - stroke-dasharray is set to percentage of circumference */}
                      <path
                        className="stroke-current"
                        style={{ color: skill.color }}
                        fill="none"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${skill.proficiency}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      {/* Percentage text - improved visibility */}
                      <text
                        x="19"
                        y="19"
                        className={`fill-current ${darkMode ? 'text-white' : 'text-gray-900'} font-semibold text-5`}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {skill.proficiency}%
                      </text>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SkillCard;