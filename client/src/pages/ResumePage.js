import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import EducationCard from '../components/Education/EducationCard';
import { FaDownload, FaBriefcase, FaGraduationCap, FaCertificate, FaTrophy, FaChevronRight } from 'react-icons/fa';
import AOS from 'aos';
import { motion } from 'framer-motion';
import 'aos/dist/aos.css';

const ResumePage = () => {
  const { darkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('education');
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    // Initialize AOS with once: true to prevent animations from repeating on scroll
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, []);

  const education = [
    {
      id: 1,
      institution: 'SRKR Engineering College',
      degree: 'Bachelor of Technology',
      field: 'CSE(Artificial Intelligence & Data Science)',
      year: '2022 - 2026 (Currently Pursuing)',
      description: 'Currently in 3rd year with a CGPA of 9.1 Focusing on web development, data structures, and algorithms.',
      courses: ['Data Structures & Algorithms', 'Web Development', 'Database Management', 'Computer Networks']
    },
    {
      id: 2,
      institution: 'Sasi Junior College',
      degree: 'Higher Secondary',
      field: 'MPC(groups)',
      year: '2020 - 2022',
      description: 'Completed with 92% marks, focusing on Physics, Chemistry, and Mathematics.',
      courses: ['Physics', 'Chemistry', 'Mathematics']
    }
  ];

  const experience = [
    {
      id: 1,
      company: 'Blackbuck Engineers',
      position: 'Full Stack Development Intern',
      duration: 'Jun 2024 - Jul 2024',
      location: 'Remote (Bhimavaram)',
      description: 'Developed a weather forecasting website using Django, providing real-time data on weather conditions, including temperature, wind speed and humidity.',
      technologies: ['Python', 'Django', 'RESTful API', 'Front-end Integration'],
      achievements: ['Gained hands-on experience in Python and Django, focusing on RESTful API development', 'Improved application responsiveness and user interaction by 25%']
    },
    {
      id: 2,
      company: 'Brain O Vision Solutions India',
      position: 'MERN Stack Development 5-day BootCamp',
      duration: 'April 2024',
      location: 'Remote (Bhimavaram)',
      description: 'Performed CRUD operations on a car management system, utilizing React for dynamic user interfaces and Node.js and MongoDB for backend-processing and data storage.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      achievements: ['Enhanced skills in MERN stack', 'Improved project delivery time by 20%']
    }
  ];

  const skills = {
    technical: [
      { name: 'HTML/CSS', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Django', level: 60 },
      { name: 'ReactJS', level: 85 },
      { name: 'MongoDB', level: 70 },
      { name: 'MySQL', level: 75 },
      { name: 'GitHub', level: 90 },
      { name: 'RESTful APIs', level: 80 }
    ],
    soft: [
      { name: 'Team Collaboration', level: 95 },
      { name: 'Problem Solving', level: 90 },
      { name: 'Time Management', level: 85 },
      { name: 'Communication', level: 90 },
      { name: 'Leadership', level: 80 }
    ]
  };

  const achievements = [
    {
      id: 1,
      title: 'Successfully completed Full Stack Development Internship',
      description: 'Completed a comprehensive internship program at The Blackbuck Engineers, focusing on weather forecasting website development using Django and improving application responsiveness.',
      date: 'July 2024'
    },
    {
      id: 2,
      title: 'Azure Fundamentals Cloud Skill Challenge',
      description: 'Earned certification from Microsoft for Azure Fundamentals, demonstrating proficiency in cloud computing concepts and Microsoft Azure services.',
      date: 'May 2024'
    },
    {
      id: 3,
      title: 'Prajwalan 24-hr Hackathon',
      description: 'Participated in an intensive 24-hour hackathon at Prajwalan, successfully developing an e-commerce website from concept to implementation within the time constraint.',
      date: 'March 2024'
    }
  ];

  const certifications = [
    { 
      id: 1,
      name: 'Full Stack Development Internship', 
      issuer: 'The Blackbuck Engineers', 
      date: 'July 2024',
      pdf: '/assets/Blackbucks Internship.pdf'
    },
    { 
      id: 2,
      name: 'Azure Fundamentals Cloud Skill Challenge', 
      issuer: 'Microsoft', 
      date: 'May 2024',
      pdf: '/assets/Azure Fundamentals.pdf'
    },
    { 
      id: 3,
      name: 'FSD Intern', 
      issuer: 'Pantech Solutions', 
      date: 'November 2024',
      pdf: '/assets/FSD Intern.pdf'
    }
  ];

  // Certificate modal component
  const CertificateModal = () => {
    if (!selectedCertificate) return null;
    
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={() => setSelectedCertificate(null)}
      >
        <div 
          className={`relative max-w-4xl w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl overflow-hidden shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`p-4 flex justify-between items-center border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className="text-xl font-bold">{selectedCertificate.name}</h3>
            <button 
              onClick={() => setSelectedCertificate(null)}
              className={`p-2 ${darkMode ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'} rounded-full transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <div className="relative">
              <iframe 
                src={selectedCertificate.pdf} 
                title={`${selectedCertificate.name} Certificate`} 
                className="w-full h-[70vh] border-0"
                onLoad={(e) => {
                  // Find the closest loading indicator and hide it
                  e.target.parentNode.querySelector('.loading-indicator').style.display = 'none';
                }}
              />
              <div className={`loading-indicator absolute inset-0 flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-medium">{selectedCertificate.issuer}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedCertificate.date}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode 
      ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
      : 'bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-900'}`}
    >
      {/* Background Particles - Static instead of animated */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-300'} opacity-10`}
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      <style jsx global>{`
        .skill-bar {
          transition: width 1.5s ease-in-out;
        }
        
        .timeline-dot::before {
          content: '';
          position: absolute;
          top: 0;
          left: -8px;
          width: 16px;
          height: 16px;
          background-color: #2563eb;
          border-radius: 50%;
          z-index: 1;
        }
        
        .active-tab::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          border-radius: 3px;
        }
      `}</style>

      {/* Header Section with Download Button */}
      <div className="pt-24 pb-12 container mx-auto px-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              My Resume
            </span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500" />
          </h1>
          
          <p className="max-w-2xl mx-auto mb-10 text-lg">
            A showcase of my academic journey, professional experiences, and technical expertise.
          </p>
          
          <a
            href="/assets/NandiniResume.pdf"
            className={`inline-flex items-center ${darkMode 
              ? 'bg-gradient-to-r from-blue-600 to-blue-500' 
              : 'bg-gradient-to-r from-blue-600 to-blue-400'} 
              text-white font-medium py-3 px-8 rounded-full shadow-lg transition-colors hover:shadow-xl`}
          >
            <FaDownload className="mr-2" /> Download Resume
          </a>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 mb-8">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {['education', 'experience', 'skills', 'achievements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-lg font-medium rounded-lg relative ${
                activeTab === tab 
                  ? `${darkMode ? 'text-blue-400' : 'text-blue-600'} active-tab` 
                  : `${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'}`
              } transition-colors capitalize`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-6 pb-16">
        <div key={activeTab} className="max-w-5xl mx-auto">
          {/* Education Section */}
          {activeTab === 'education' && (
            <div>
              <div className="flex items-center mb-8">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-600/30' : 'bg-blue-100'} mr-4`}>
                  <FaGraduationCap className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} text-2xl`} />
                </div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  Educational Background
                </h2>
              </div>
              
              <div className={`rounded-3xl ${darkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'} shadow-2xl overflow-hidden`}>
                <div className="p-1">
                  <div className={`p-8 rounded-3xl ${darkMode ? 'bg-gray-800/80' : 'bg-white/90'}`}>
                    {education.map((item, index) => (
                      <div key={item.id} data-aos="fade-up">
                        <EducationCard
                          institution={item.institution}
                          degree={item.degree}
                          field={item.field}
                          year={item.year}
                          description={item.description}
                        />
                        
                        <div className="ml-8 md:ml-32 mt-3 mb-6">
                          <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                            RELEVANT COURSEWORK
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {item.courses.map((course, i) => (
                              <span key={i} className={`px-3 py-1 rounded-full text-sm ${
                                darkMode 
                                  ? 'bg-blue-900/40 text-blue-200' 
                                  : 'bg-blue-50 text-blue-700'
                              }`}>
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {index < education.length - 1 && (
                          <div className="border-b border-blue-600/20 my-8"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Experience Section */}
          {activeTab === 'experience' && (
            <div>
              <div className="flex items-center mb-8">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-600/30' : 'bg-blue-100'} mr-4`}>
                  <FaBriefcase className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} text-2xl`} />
                </div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  Professional Experience
                </h2>
              </div>
              
              <div className={`rounded-3xl ${darkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'} shadow-2xl overflow-hidden`}>
                <div className="p-1">
                  <div className={`p-8 rounded-3xl ${darkMode ? 'bg-gray-800/80' : 'bg-white/90'}`}>
                    {experience.map((item, index) => (
                      <div key={item.id} data-aos="fade-up">
                        <div className="relative pl-8 md:pl-0">
                          <div className="timeline-dot"></div>
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 mb-4 md:mb-0">
                              <div className={`inline-block px-4 py-2 rounded-lg ${
                                darkMode 
                                  ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50' 
                                  : 'bg-blue-50 text-blue-700 border border-blue-100'
                              }`}>
                                {item.duration}
                              </div>
                            </div>
                            
                            <div className="md:w-3/4 md:pl-8">
                              <h3 className="text-2xl font-bold mb-1">{item.position}</h3>
                              <p className={`text-lg font-medium mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                {item.company}
                              </p>
                              
                              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {item.description}
                              </p>
                              
                              <div className="mb-4">
                                <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                  TECHNOLOGIES USED
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.technologies.map((tech, i) => (
                                    <span key={i} className={`px-3 py-1 rounded-full text-sm ${
                                      darkMode 
                                        ? 'bg-blue-900/40 text-blue-200' 
                                        : 'bg-blue-50 text-blue-700'
                                    }`}>
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                  KEY ACHIEVEMENTS
                                </h4>
                                <ul className="space-y-1">
                                  {item.achievements.map((achievement, i) => (
                                    <li key={i} className="flex items-start">
                                      <FaChevronRight className={`mt-1 mr-2 text-xs ${
                                        darkMode ? 'text-blue-400' : 'text-blue-600'
                                      }`} />
                                      <span>{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {index < experience.length - 1 && (
                          <div className="border-b border-blue-600/20 my-8"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Skills Section */}
          {activeTab === 'skills' && (
            <div>
              <div className="flex items-center mb-8">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-600/30' : 'bg-blue-100'} mr-4`}>
                  <FaCertificate className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} text-2xl`} />
                </div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  Professional Skills
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Technical Skills */}
                <div 
                    data-aos="fade-right" 
                    className={`rounded-3xl ${darkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'} shadow-2xl overflow-hidden`}
                  >
                    <div className="p-1">
                      <div className={`p-8 rounded-3xl ${darkMode ? 'bg-gray-800/80' : 'bg-white/90'}`}>
                        <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          Technical Skills
                        </h3>
                        
                        <div className="space-y-6">
                          {skills.technical.map((skill, index) => (
                            <div key={index} data-aos="fade-right" data-aos-delay={index * 50}>
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">{skill.name}</span>
                                <span className={`${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>{skill.level}%</span>
                              </div>
                              <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                <motion.div 
                                  className={`h-full rounded-full skill-bar ${
                                    darkMode 
                                      ? 'bg-gradient-to-r from-blue-600 to-blue-400' 
                                      : 'bg-gradient-to-r from-blue-500 to-blue-300'
                                  }`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ duration: 1, delay: 0.1 * index }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                
                {/* Soft Skills & Certifications */}
                <div className="space-y-8">
                <div 
                      data-aos="fade-left" 
                      className={`rounded-3xl ${darkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'} shadow-2xl overflow-hidden`}
                    >
                      <div className="p-1">
                        <div className={`p-8 rounded-3xl ${darkMode ? 'bg-gray-800/80' : 'bg-white/90'}`}>
                          <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                            Soft Skills
                          </h3>
                          
                          <div className="space-y-6">
                            {skills.soft.map((skill, index) => (
                              <div key={index} data-aos="fade-left" data-aos-delay={index * 50}>
                                <div className="flex justify-between mb-2">
                                  <span className="font-medium">{skill.name}</span>
                                  <span className={`${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>{skill.level}%</span>
                                </div>
                                <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                  <motion.div 
                                    className={`h-full rounded-full skill-bar ${
                                      darkMode 
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-400' 
                                        : 'bg-gradient-to-r from-purple-500 to-blue-300'
                                    }`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1, delay: 0.1 * index }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  
                  <div 
                    data-aos="fade-up"
                    className={`rounded-3xl ${darkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'} shadow-2xl overflow-hidden`}
                  >
                    <div className="p-1">
                      <div className={`p-8 rounded-3xl ${darkMode ? 'bg-gray-800/80' : 'bg-white/90'}`}>
                        <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          Certifications
                        </h3>
                        
                        <ul className="space-y-4">
                          {certifications.map((cert, index) => (
                            <li 
                              key={index} 
                              className={`flex items-start cursor-pointer p-2 rounded-lg ${darkMode ? 'hover:bg-blue-900/20' : 'hover:bg-blue-50'} transition-colors`}
                              onClick={() => setSelectedCertificate(cert)}
                            >
                              <div className={`min-w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                                darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                              }`}>
                                <FaCertificate className={`${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
                              </div>
                              <div>
                                <h4 className="font-semibold">{cert.name}</h4>
                                <div className="flex items-center text-sm mt-1">
                                  <span className={`${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>{cert.issuer}</span>
                                  <span className={`mx-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{cert.date}</span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Achievements Section */}
          {activeTab === 'achievements' && (
            <div>
              <div className="flex items-center mb-8">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-600/30' : 'bg-blue-100'} mr-4`}>
                  <FaTrophy className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} text-2xl`} />
                </div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  Awards & Achievements
                </h2>
              </div>
              
              <div className={`rounded-3xl ${darkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'} shadow-2xl overflow-hidden`}>
                <div className="p-1">
                  <div className={`p-8 rounded-3xl ${darkMode ? 'bg-gray-800/80' : 'bg-white/90'}`}>
                    <div className="space-y-10">
                      {achievements.map((achievement, index) => (
                        <div key={achievement.id} data-aos="fade-up" className="relative pl-8">
                          <div className="timeline-dot"></div>
                          <div className="border-l-2 border-blue-600 pl-6 pb-8">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm mb-3 ${
                              darkMode ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-50 text-blue-700'
                            }`}>
                              {achievement.date}
                            </span>
                            <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-10" data-aos="fade-up">
                <p className={`inline-block px-6 py-3 rounded-xl ${
                  darkMode ? 'bg-blue-900/30 text-blue-200' : 'bg-blue-50 text-blue-700'
                }`}>
                  <span className="font-semibold">Pro Tip:</span> I continue to pursue professional growth through coursework, personal projects, and industry involvement.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Certificate Modal */}
      <CertificateModal />
    </div>
  );
};

export default ResumePage;