const Project = require('../models/Project');

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get featured projects
const getFeaturedProjects = async (req, res) => {
  try {
    const featuredProjects = await Project.find({ featured: true });
    res.json(featuredProjects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add project
const addProject = async (req, res) => {
  try {
    const { title, description, image, technologies, githubLink, liveLink, featured } = req.body;
    
    const project = new Project({
      title,
      description,
      image,
      technologies,
      githubLink,
      liveLink,
      featured,
    });
    
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProjects,
  getFeaturedProjects,
  addProject,
};