// Import Models
const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      image: req.file.filename,
      link: req.body.link
    });

    res.status(201).json({
      project: project,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong When project created',
      error,
    });
  }
};
