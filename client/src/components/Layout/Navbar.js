import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionsCount, setSectionsCount] = useState(0);

  // Handle navbar visibility and scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(true);
      setPrevScrollPos(currentScrollPos);
      setScrolled(window.scrollY > 20);
      
      // Check if user is near bottom of page
      const isNearBottom = window.scrollY > document.body.scrollHeight - window.innerHeight - 200;
      setIsAtBottom(isNearBottom);
      
      // Find current section
      const sections = document.querySelectorAll('section');
      setSectionsCount(sections.length);
      
      if (sections.length > 0) {
        const currentPosition = window.scrollY + window.innerHeight / 3;
        
        for (let i = sections.length - 1; i >= 0; i--) {
          if (sections[i].offsetTop <= currentPosition) {
            setCurrentSectionIndex(i);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Run once to initialize
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScrollButton = () => {
    const sections = document.querySelectorAll('section');
    
    if (isAtBottom || currentSectionIndex === sections.length - 1) {
      // Scroll to top when at the bottom
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Scroll to next section
      const nextSectionIndex = currentSectionIndex + 1;
      if (nextSectionIndex < sections.length) {
        window.scrollTo({
          top: sections[nextSectionIndex].offsetTop - 80, // Adjust for navbar height
          behavior: 'smooth'
        });
      }
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1 
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.4,
        ease: "easeInOut" 
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.3,
        ease: "easeInOut" 
      }
    }
  };

  const navbarVisibilityVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 } 
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav 
        initial="visible"
        animate={visible ? "visible" : "hidden"}
        variants={navbarVisibilityVariants}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-3 shadow-lg' : 'py-5 shadow-md'
        } ${
          darkMode 
            ? 'bg-black text-white backdrop-blur-md bg-opacity-95 border-b border-gray-800' 
            : 'bg-white text-gray-900 backdrop-blur-md bg-opacity-95 border-b border-gray-100'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link to="/" className="text-2xl font-bold flex items-center">
              <motion.span 
                className="text-blue-600 font-bold mr-1"
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              >
                Nandini
              </motion.span>
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>Paluchuri</span>
              <motion.div 
                className="w-2 h-2 rounded-full bg-blue-600 ml-1"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.6, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity
                }}
              />
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="focus:outline-none"
            >
              {isMenuOpen ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTimes size={26} />
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars size={26} />
                </motion.div>
              )}
            </motion.button>
          </div>

          {/* Desktop Menu */}
          <motion.div 
            className="hidden md:flex items-center space-x-10"
            variants={navVariants}
          >
            {[
              { path: '/', name: 'Home' },
              { path: '/projects', name: 'Projects' },
              { path: '/resume', name: 'Resume' },
              { path: '/contact', name: 'Contact' }
            ].map((item, index) => (
              <motion.div key={index} variants={linkVariants}>
                <Link 
                  to={item.path} 
                  className={`relative overflow-hidden group py-2 text-lg font-medium transition-colors ${
                    isActive(item.path) ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
                  }`}
                >
                  {item.name}
                  <motion.span 
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform`}
                    initial={{ scaleX: isActive(item.path) ? 1 : 0 }}
                    animate={{ scaleX: isActive(item.path) ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            
            <motion.button 
              variants={linkVariants}
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme} 
              className="focus:outline-none transition-transform ml-4 relative"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <>
                  <FaSun size={24} className="text-yellow-400" />
                  <motion.div 
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(250, 204, 21, 0.4)",
                        "0 0 0 10px rgba(250, 204, 21, 0)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </>
              ) : (
                <>
                  <FaMoon size={24} className="text-blue-800" />
                  <motion.div 
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(30, 64, 175, 0.4)",
                        "0 0 0 10px rgba(30, 64, 175, 0)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </>
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} overflow-hidden shadow-lg`}
            >
              <div className="container mx-auto px-6 flex flex-col space-y-5 py-6">
                {[
                  { path: '/', name: 'Home' },
                  { path: '/projects', name: 'Projects' },
                  { path: '/resume', name: 'Resume' },
                  { path: '/contact', name: 'Contact' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      to={item.path}
                      className={`block py-2 text-lg ${isActive(item.path) ? 'text-blue-600 font-medium' : 'hover:text-blue-600'} transition-colors`}
                      onClick={toggleMenu}
                    >
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center"
                      >
                        <span>{item.name}</span>
                        {isActive(item.path) && (
                          <motion.div
                            className="w-1.5 h-1.5 bg-blue-600 rounded-full ml-2"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={toggleTheme}
                  className="focus:outline-none flex items-center py-2"
                >
                  {darkMode ? (
                    <>
                      <FaSun size={22} className="text-yellow-400" />
                      <span className="ml-2 text-lg">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <FaMoon size={22} className="text-blue-800" />
                      <span className="ml-2 text-lg">Dark Mode</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Scroll to Explore Button - Now separated from navbar and fixed at bottom center */}
       {/* Pill-shaped Scroll Button with Small Line Indicator */}
<motion.div 
  className="fixed bottom-8 right-8 z-40"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1, duration: 0.5 }}
>
  {/* Button Container */}
  <motion.div
    onClick={handleScrollButton}
    className={`
      flex flex-col items-center justify-center
      px-6 py-3
      rounded-full
      cursor-pointer
      relative
    `}
    whileHover={{ y: -2 }}
    whileTap={{ y: 2 }}
  >
    {/* Text Label */}
    <div className="text-sm font-medium text-gray-700 mb-2">
      {isAtBottom || currentSectionIndex === sectionsCount - 1 ? "Scroll Up" : "Scroll Down"}
    </div>
    
    {/* Pill-shaped Outline with Small Line Indicator */}
    <div className="w-6 h-12 border-2 border-blue-500 rounded-full flex items-center justify-center">
      <motion.div 
        className="w-1 h-2.5 bg-blue-500 rounded-full"
        animate={{
          y: [0, 4, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />
    </div>
  </motion.div>
</motion.div>
    </>
  );
};

export default Navbar;