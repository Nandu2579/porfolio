import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { FaArrowRight, FaCode, FaLaptopCode, FaServer, FaMobileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  const { darkMode } = useContext(ThemeContext);
  const canvasRef = useRef(null);

  // Enhanced interactive particle effect background with modified opacity behavior
  useEffect(() => {
    if (!darkMode && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      setCanvasSize();
      
      let particlesArray = [];
      let hue = 210; // Start with blue hue
      const mouse = {
        x: undefined,
        y: undefined,
        radius: 150
      };
      
      // Handle mouse movement
      window.addEventListener('mousemove', function(e) {
        mouse.x = e.x;
        mouse.y = e.y;
      });
      
      // Create particles
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 1;
          this.speedX = Math.random() * 1 - 0.5;
          this.speedY = Math.random() * 1 - 0.5;
          // Modified to maintain minimum opacity
          this.color = `hsla(${hue}, 100%, 50%, ${Math.random() * 0.2 + 0.1})`;
        }
        
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          
          // Check for proximity to mouse
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;
            
            this.speedX -= force * Math.cos(angle) * 0.1;
            this.speedY -= force * Math.sin(angle) * 0.1;
          }
          
          // Boundary check
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
          
          // Modified to maintain a minimum size
          if (this.size > 0.5) this.size -= 0.01;
        }
        
        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Initialize particles
      function init() {
        particlesArray = [];
        for (let i = 0; i < (window.innerWidth < 768 ? 70 : 150); i++) {
          particlesArray.push(new Particle());
        }
      }
      
      // Connect nearby particles with lines - modified to maintain minimum opacity
      function connectParticles() {
        const maxDistance = 150;
        
        for (let a = 0; a < particlesArray.length; a++) {
          for (let b = a; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
              // Modified to maintain minimum opacity
              const opacity = Math.max(0.05, 1 - distance / maxDistance);
              ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${opacity * 0.15})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
              ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
              ctx.stroke();
            }
          }
        }
      }
      
      // Animation loop
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Slightly change hue over time
        hue = (hue + 0.1) % 360;
        
        // Update and draw particles
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
        }
        
        connectParticles();
        
        // Modified to maintain a minimum number of particles
        for (let i = 0; i < particlesArray.length; i++) {
          if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
            
            // Add a new particle
            if (Math.random() > 0.97 || particlesArray.length < 100) {
              particlesArray.push(new Particle());
            }
          }
        }
        
        requestAnimationFrame(animate);
      }
      
      // Handle window resize
      window.addEventListener('resize', function() {
        setCanvasSize();
        init();
      });
      
      init();
      animate();
      
      return () => {
        window.removeEventListener('mousemove', null);
        window.removeEventListener('resize', null);
        window.cancelAnimationFrame(animate);
      };
    }
  }, [darkMode]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const childVariants = {
    hidden: { y: 50, opacity: 0 },
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

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: `0px 8px 20px ${darkMode ? 'rgba(59, 130, 246, 0.6)' : 'rgba(37, 99, 235, 0.5)'}`,
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  // Updated tech skills with unique descriptions for each service
  const techSkills = [
    { 
      icon: <FaCode />, 
      text: "Frontend Development", 
      description: "Creating responsive UI/UX with React for seamless user experiences."
    },
    { 
      icon: <FaServer />, 
      text: "Backend Development", 
      description: "Building robust server-side applications with Node.js, Express, and database integration."
    },
    { 
      icon: <FaMobileAlt />, 
      text: "Responsive Design", 
      description: "Crafting adaptive layouts that provide optimal viewing across all devices and screen sizes."
    },
    { 
      icon: <FaLaptopCode />, 
      text: "Full Stack Development", 
      description: "Delivering end-to-end solutions that integrate frontend, backend, and database technologies."
    }
  ];

  return (
    <section className={`relative min-h-screen flex items-center pt-24 ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-blue-50 text-gray-900'
    }`}>
      {/* Interactive Particles background (only for light mode) */}
      {!darkMode && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      )}
      
      {/* Enhanced animated gradient for dark mode */}
      {darkMode && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -inset-[150px] opacity-40 bg-gradient-to-br from-blue-800 via-purple-900 to-blue-800 blur-3xl rounded-full animate-slow-spin"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 opacity-30 bg-blue-600 blur-3xl rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 opacity-20 bg-indigo-500 blur-3xl rounded-full animate-bounce" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-32 h-32 opacity-25 bg-purple-500 blur-3xl rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8"
            variants={childVariants}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold leading-tight mb-6"
              variants={childVariants}
            >
              Hi, I'm{' '}
              {/* Adjusted inline block container for text animation */}
              <motion.span 
                className="text-blue-600 relative inline-block whitespace-nowrap"
                animate={{ 
                  y: [0, -7, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
                style={{ minWidth: '300px' }}
              >
                <TypeAnimation
                  sequence={[
                    'Nandini Paluchuri',
                    2000,
                    'A Web Developer',
                    2000,
                    'A Designer',
                    
                    2000,
                    'A Problem Solver',
                    2000
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  style={{ fontSize: "0.9em" }}
                />
                
                <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-blue-600 rounded-full"></span>
              </motion.span>
            </motion.h1>
            
            <motion.h2 
              className="text-2xl md:text-3xl mb-6 font-medium"
              variants={childVariants}
            >
              BTech Student & Full Stack Developer
              <motion.span 
                className="ml-2 inline-block w-2 h-6 bg-blue-600"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.h2>
            
            <motion.p 
              className="text-xl mb-8 opacity-90 max-w-xl leading-relaxed"
              variants={childVariants}
            >
              I'm passionate about creating innovative solutions and learning new technologies.
              Currently in my 3rd year of BTech, specializing in MERN Stack Development.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap items-center gap-6"
              variants={childVariants}
            >
              <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/projects"
                  className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-lg transition-all flex items-center group text-lg ${
                    darkMode ? 'shadow-lg shadow-blue-700/20' : ''
                  }`}
                >
                  View My Work 
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  >
                    <FaArrowRight />
                  </motion.span>
                </Link>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                {/* Fixed contact button hover effect */}
                <Link
                  to="/contact"
                  className={`border-2 ${
                    darkMode 
                      ? 'border-blue-600 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30' 
                      : 'border-blue-600 text-blue-600 hover:bg-blue-100'
                  } font-medium py-4 px-8 rounded-lg transition-all text-lg`}
                >
                  Contact Me
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Tech Skills Pills - mobile only */}
            <motion.div 
              className="mt-10 flex flex-wrap gap-3 md:hidden"
              variants={childVariants}
              initial="hidden"
              animate="visible"
            >
              {techSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center px-4 py-2 rounded-full text-sm ${
                    darkMode 
                      ? 'bg-blue-900 bg-opacity-40 text-blue-300' 
                      : 'bg-blue-100 text-blue-800'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="mr-2">{skill.icon}</span>
                  {skill.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Profile Image Container */}
          <motion.div 
            className="md:w-1/2 flex justify-center"
            variants={childVariants}
          >
            <motion.div 
              className={`w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden relative ${
                darkMode ? 'border-blue-600' : 'border-blue-500'
              }`}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                boxShadow: `0 0 80px ${darkMode ? 'rgba(59, 130, 246, 0.5)' : 'rgba(37, 99, 235, 0.4)'}`
              }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              style={{
                borderWidth: '6px',
                borderStyle: 'solid',
              }}
            >
              {/* Pulsing ring effects */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    `0 0 0 0px ${darkMode ? 'rgba(37, 99, 235, 0.5)' : 'rgba(59, 130, 246, 0.4)'}`,
                    `0 0 0 15px ${darkMode ? 'rgba(37, 99, 235, 0)' : 'rgba(59, 130, 246, 0)'}`
                  ],
                  scale: [1, 1.08, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    `0 0 0 0px ${darkMode ? 'rgba(37, 99, 235, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`,
                    `0 0 0 25px ${darkMode ? 'rgba(37, 99, 235, 0)' : 'rgba(59, 130, 246, 0)'}`
                  ],
                  scale: [1, 1.12, 1]
                }}
                transition={{
                  duration: 3,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              {/* Profile Image */}
              <div className="w-full h-full overflow-hidden relative z-10">
                <img 
                  src="/assets/Me.jpeg" 
                  alt="Nandini Paluchuri" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <div className={`w-full h-full ${
                darkMode ? 'bg-gradient-to-br from-gray-800 to-blue-900' : 'bg-gradient-to-br from-blue-200 to-blue-100'
              } flex items-center justify-center relative z-10`}>
                <motion.span 
                  className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8] 
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity 
                  }}
                >
                  Me
                </motion.span>
              </div> */}
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Updated Tech Skills Cards with unique descriptions */}
        <motion.div
          className="hidden md:grid grid-cols-4 gap-6 mt-24"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          {techSkills.map((skill, index) => (
            <motion.div
              key={index}
              className={`rounded-lg p-6 ${
                darkMode 
                  ? 'bg-gray-800 bg-opacity-60 border border-gray-700 hover:bg-gray-700' 
                  : 'bg-white border border-gray-100 hover:bg-blue-50'
              } transition-all duration-300 shadow-lg hover:shadow-xl`}
              variants={cardVariants}
              custom={index}
              whileHover={{ y: -5 }}
            >
              <div 
                className={`text-3xl ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-4`}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                {skill.icon}
              </div>
              <h3 className="text-lg font-medium mb-2">{skill.text}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {skill.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Mobile optimizations */}
      <style jsx>{`
        @media (max-width: 400px) {
          .hero-container {
            padding-top: 1rem;
            padding-bottom: 2rem;
          }
          
          h1 {
            font-size: 2.25rem !important;
            line-height: 1.2 !important;
          }
          
          h2 {
            font-size: 1.5rem !important;
            margin-bottom: 1rem !important;
          }
          
          .profile-image {
            width: 200px !important;
            height: 200px !important;
            margin-bottom: 1.5rem !important;
          }
          
          .action-buttons {
            flex-direction: column;
            width: 100%;
          }
          
          .action-buttons a {
            width: 100%;
            margin-bottom: 0.75rem;
            text-align: center;
            justify-content: center;
          }
          
          .tech-skills-mobile {
            margin-top: 1.5rem;
          }
          
          .experience-cards {
            padding-bottom: 5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;