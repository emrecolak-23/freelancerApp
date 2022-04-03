// Import Packages
const fs = require('fs');
// Import Models
const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      image: req.file.filename,
      category: req.body.category,
      link: req.body.link,
    });
    res.status(201).redirect('/');
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong When project created',
      error,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
      }
    );
    project.save();
    res.status(201).redirect('/');
  } catch (error) {
    res.status(400).redirect('/');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });
    let deletedImage = __dirname + '/../uploads/' + project.image;
    fs.unlinkSync(deletedImage);

    await Project.findByIdAndDelete({ _id: req.params.id });
    res.status(200).redirect('/');
  } catch (error) {
    res.status(400).json({
      status: 'Project not successfully deleted',
      error,
    });
  }
};
