const express = require('express');
const router = express.Router();
const { getProjects, getFeaturedProjects, addProject } = require('../controllers/projectController');

router.route('/').get(getProjects);
router.route('/featured').get(getFeaturedProjects);
router.route('/').post(addProject);

module.exports = router;