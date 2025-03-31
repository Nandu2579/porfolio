import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <footer className={`py-8 border-t ${
      darkMode 
        ? 'bg-gray-900 text-white border-gray-800' 
        : 'bg-gray-50 text-gray-900 border-gray-200'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <p className="text-xl font-bold">
              <span className="text-blue-600">Nandini</span> Paluchuri
            </p>
            <p className="mt-1 text-sm opacity-75">BTech Student | Developer</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap justify-center space-x-8"
          >
            <motion.a 
              whileHover={{ scale: 1.2, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href="https://github.com/Nandu2579" 
              className="hover:text-blue-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href="https://www.linkedin.com/in/nandini-paluchuri-b16b81222" 
              className="hover:text-blue-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href="#twitter" 
              className="hover:text-blue-600 transition-colors"
            >
              <FaTwitter size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href="mailto:paluchurinandini@gmail.com" 
              className="hover:text-blue-600 transition-colors"
            >
              <FaEnvelope size={24} />
            </motion.a>
          </motion.div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-opacity-20 text-center md:text-right">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © {new Date().getFullYear()} Developer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;