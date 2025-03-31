import React, { useState, useContext, useRef, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import axios from 'axios';

const ContactSection = () => {
  const { darkMode } = useContext(ThemeContext);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [loading, setLoading] = useState(false);

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
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Send data to your backend API
      const API_URL = process.env.NODE_ENV === 'production' 
        ? '/api/contact' 
        : 'http://localhost:5000/api/contact';
  
      // Remove the "response" variable assignment
      await axios.post(API_URL, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      setStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent successfully!'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        submitted: true,
        success: false,
        message: 'There was an error sending your message. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'paluchurinandini@gmail.com',
      link: 'mailto:paluchurinandini@gmail.com'
    },
    {
      icon: <FaPhoneAlt />,
      label: 'Phone',
      value: '+91 0000000011',
      link: 'tel:+910000000011'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'Bhimavaram, A.P, India',
      link: null
    }
  ];

  const socialLinks = [
    { icon: <FaGithub />, label: 'GitHub', link: 'https://github.com/Nandu2579?tab=repositories', color: '#333' },
    { icon: <FaLinkedinIn />, label: 'LinkedIn', link: 'https://www.linkedin.com/in/nandini-paluchuri-b16b81222/', color: '#0077B5' },
    { icon: <FaTwitter />, label: 'Twitter', link: 'https://twitter.com/yourusername', color: '#1DA1F2' }
  ];

  return (
    <motion.section
      id="contact"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={`relative py-24 overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 to-blue-900/30 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900'}`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={darkMode ? "white" : "blue"} strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div 
          variants={itemVariants}
          className="text-center mb-20"
        >
          <h2 className={`text-5xl font-bold mb-6 inline-block relative ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Get In Touch
            <div className="absolute -bottom-4 left-1/4 right-1/4">
              <svg height="8" width="100%" className="overflow-visible">
                <path
                  d="M 0 0 Q 50 15 100 0"
                  fill="none"
                  strokeWidth="4"
                  stroke={darkMode ? "#3B82F6" : "#2563EB"}
                  className="transition-all duration-300"
                />
              </svg>
            </div>
          </h2>
          <p className={`max-w-2xl mx-auto text-xl ${darkMode ? 'text-blue-100' : 'text-blue-800'}`}>
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Left column - Contact Info & Social Links */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-5"
          >
            <div 
              className={`relative p-8 md:p-10 rounded-3xl shadow-2xl transform transition-all duration-500 overflow-hidden group ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700/50 backdrop-blur-sm' 
                  : 'bg-white/90 border border-blue-100 backdrop-blur-sm'
              }`}
              style={{
                transform: 'perspective(1000px) rotateY(-2deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Background glow effect */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-400'} blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              <h3 className="text-2xl font-bold mb-8 relative inline-block">
                Contact Information
                <span className={`absolute -bottom-2 left-0 h-1 w-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} rounded-full`}></span>
              </h3>
              
              <div className="space-y-8 mb-10 relative">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start group/item">
                    <div className={`flex-shrink-0 p-4 rounded-xl mr-5 transform transition-transform group-hover/item:scale-110 group-hover/item:-rotate-6 ${
                      darkMode ? 'bg-gradient-to-br from-blue-600 to-blue-800' : 'bg-gradient-to-br from-blue-500 to-blue-600'
                    } text-white shadow-lg`}>
                      <span className="text-xl">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>{item.label}</h4>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          className={`text-lg font-medium transition-all hover:underline ${
                            darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                          }`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-5 relative inline-block">
                  Connect With Me
                  <span className={`absolute -bottom-2 left-0 h-1 w-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} rounded-full`}></span>
                </h3>
                <div className="flex gap-5">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg ${
                        darkMode 
                          ? 'bg-gray-800 hover:bg-gray-700 shadow-blue-900/20' 
                          : 'bg-white hover:bg-gray-50 shadow-blue-300/30'
                      }`}
                      aria-label={social.label}
                    >
                      <span className="text-xl" style={{ color: social.color }}>
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Abstract geometric shape background */}
              <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10 pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    fill={darkMode ? "#3B82F6" : "#2563EB"} 
                    d="M45.7,-49.2C58.9,-34.7,69.3,-17.3,70.6,1.4C71.9,20,64.2,40.1,50.9,51.5C37.7,62.9,18.8,65.6,0.2,65.4C-18.5,65.2,-36.9,62,-48.8,50.5C-60.7,39,-66,19.5,-66.3,-0.3C-66.6,-20.1,-61.9,-40.2,-49.4,-54.8C-36.9,-69.4,-18.5,-78.5,-0.1,-78.3C18.3,-78.2,36.6,-68.7,45.7,-49.2Z" 
                    transform="translate(100 100)" 
                  />
                </svg>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Contact Form */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-7"
          >
            <div 
              className={`relative p-8 md:p-10 rounded-3xl shadow-2xl transform transition-all duration-500 overflow-hidden group ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700/50 backdrop-blur-sm' 
                  : 'bg-white/90 border border-blue-100 backdrop-blur-sm'
              }`}
              style={{
                transform: 'perspective(1000px) rotateY(2deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Background glow effect */}
              <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-400'} blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              <h3 className="text-2xl font-bold mb-8 relative inline-block">
                Send Message
                <span className={`absolute -bottom-2 left-0 h-1 w-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} rounded-full`}></span>
              </h3>
              
              {status.submitted && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-8 p-5 rounded-xl ${
                    status.success 
                      ? darkMode ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-green-100 text-green-800' 
                      : darkMode ? 'bg-red-900/30 text-red-400 border border-red-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium mb-2 transition-all group-focus-within:text-blue-500">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Nandini Paluchuri"
                        className={`w-full px-5 py-4 rounded-xl border transition-all ${
                          darkMode 
                            ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700 focus:border-blue-500' 
                            : 'bg-gray-50/50 border-gray-300 focus:bg-white focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                      />
                      <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-focus-within:w-full`}></div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium mb-2 transition-all group-focus-within:text-blue-500">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="paluchurinandini@gmail.com"
                        className={`w-full px-5 py-4 rounded-xl border transition-all ${
                          darkMode 
                            ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700 focus:border-blue-500' 
                            : 'bg-gray-50/50 border-gray-300 focus:bg-white focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                      />
                      <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-focus-within:w-full`}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 group">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 transition-all group-focus-within:text-blue-500">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project Discussion"
                      className={`w-full px-5 py-4 rounded-xl border transition-all ${
                        darkMode 
                          ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700 focus:border-blue-500' 
                          : 'bg-gray-50/50 border-gray-300 focus:bg-white focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                    />
                    <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-focus-within:w-full`}></div>
                  </div>
                </div>
                
                <div className="mb-6 group">
                  <label htmlFor="message" className="block text-sm font-medium mb-2 transition-all group-focus-within:text-blue-500">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Hello, I'd like to talk about..."
                      className={`w-full px-5 py-4 rounded-xl border transition-all ${
                        darkMode 
                          ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700 focus:border-blue-500' 
                          : 'bg-gray-50/50 border-gray-300 focus:bg-white focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                    ></textarea>
                    <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-focus-within:w-full`}></div>
                  </div>
                </div>
                
                <div className="flex items-center mb-8">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="w-5 h-5 rounded text-blue-600 border-gray-400 focus:ring-blue-500"
                    />
                    <span className={`absolute w-full h-full inset-0 pointer-events-none ${darkMode ? "bg-gray-800" : "bg-gray-100"} opacity-0`}></span>
                  </div>
                  <label htmlFor="privacy" className={`ml-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    I agree to the <a href="/privacy-policy" className={`relative inline-block ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      privacy policy
                      <span className={`absolute left-0 right-0 bottom-0 h-px ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} transform origin-bottom-right scale-x-0 transition-transform duration-300 hover:scale-x-100`}></span>
                    </a>
                  </label>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-lg rounded-xl transition-all ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  } relative overflow-hidden shadow-xl shadow-blue-600/20`}
                >
                  <span className="absolute inset-0 w-full h-full">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  </span>
                  <span className="relative flex items-center justify-center">
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </span>
                </motion.button>
              </form>
              
              {/* Abstract decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    fill={darkMode ? "#3B82F6" : "#2563EB"} 
                    d="M38.5,-65.3C52.9,-60.2,69.4,-54.6,75.9,-43.4C82.4,-32.1,79,-15.1,74.9,0.2C70.8,15.6,66.1,31.1,57.4,42.7C48.8,54.3,36.2,61.9,23.2,65.8C10.3,69.7,-3,69.9,-14.9,66.5C-26.7,63.1,-37,56.2,-44.1,46.7C-51.2,37.2,-55.1,25,-60.3,12.1C-65.6,-0.8,-72.3,-14.3,-71.5,-27.9C-70.7,-41.4,-62.3,-54.9,-50.1,-61.4C-37.9,-67.9,-22,-67.4,-7.6,-64.7C6.8,-62,24,-70.3,38.5,-65.3Z" 
                    transform="translate(100 100)" 
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;