import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ProjectCard from '../components/Projects/ProjectCard';
import axios from 'axios';

const ProjectsPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
      }
    };
    
    // For development/testing, use dummy data if API is not available
    const useDummyData = true; // Set to false when your API is ready
    
    if (useDummyData) {
      setProjects([
        {
          _id: 1,
          title: 'E-commerce Platform',
          description: 'A full-stack e-commerce platform with user authentication, product catalog, and payment integration.',
          image: '',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
          githubLink: 'https://github.com/yourusername/ecommerce',
          liveLink: 'https://your-ecommerce.vercel.app/',
        },
        {
          _id: 2,
          title: 'Task Management App',
          description: 'A productivity application to manage daily tasks with reminders and categories.',
          image: '',
          technologies: ['HTML', 'CSS', 'JavaScript'],
          githubLink: 'https://github.com/Nandu2579/todolist-project',
          liveLink: 'https://todolist-sand-seven.vercel.app/',
        },
        {
          _id: 3,
          title: 'Weather Dashboard',
          description: 'A weather application that displays current weather and forecasts for any location.',
          image: '',
          technologies: ['JavaScript', 'HTML', 'CSS', 'API'],
          githubLink: 'https://github.com/Nandu2579/weather-forecast-app',
          liveLink: 'https://weatherprediction-iota.vercel.app/',
        },
        {
          _id: 4,
          title: 'PetCozi - Premium Pet Products',
          description: 'An e-commerce platform that offers high-quality products and services for dogs and cats.',
          image: '',
          technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
          githubLink: '#',
          liveLink: 'https://petcozi.com/',
        },
      ]);
      setLoading(false);
    } else {
      fetchProjects();
    }
  }, []);
  
  if (loading) return <div className="text-center py-10">Loading projects...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  
  return (
    <section id="projects" className={`py-24 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
        
        {projects.length === 0 ? (
          <p className="text-center">No projects available.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;