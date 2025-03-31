import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Hero from '../components/Home/Hero';
import About from '../components/Home/About';
import SkillCard from '../components/Skills/SkillCard';
import ProjectCard from '../components/Projects/ProjectCard';
// import { FaReact, FaNodeJs, FaDatabase, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { darkMode } = useContext(ThemeContext);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch featured projects
  useEffect(() => {
    const getFeaturedProjects = async () => {
      try {
        // In development, you might not have API yet, so using dummy data
        // const response = await axios.get('/api/projects/featured');
        // setFeaturedProjects(response.data);
        
        // Dummy data
        setFeaturedProjects([
          {
            id: 1,
            title: 'E-commerce Platform',
            description: 'A full-stack e-commerce platform with user authentication, product catalog, and payment integration.',
            image: '',
            technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
            githubLink: '#',
            liveLink: '#',
          },
          {
            id: 2,
            title: 'Task Management App',
            description: 'A productivity application to manage daily tasks with reminders and categories.',
            image: '',
            technologies: ['React', 'Firebase', 'Tailwind CSS'],
            githubLink: 'https://github.com/Nandu2579/todolist-project',
            liveLink: 'https://todolist-sand-seven.vercel.app/',
          },
        ]);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    getFeaturedProjects();
  }, []);

  return (
    <div>
      <Hero />
      <About />

      {/* Skills Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <div className="container mx-auto px-6">
        {/* Replace everything in this section with just the SkillsSection component */}
          <SkillCard />
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="loader">Loading...</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link
                  to="/projects"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
                >
                  View All Projects
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;