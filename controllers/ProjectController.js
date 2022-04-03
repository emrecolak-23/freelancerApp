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
    req.flash('success', `${project.name} has been successfully created`);
    res.status(201).redirect('/');
  } catch (error) {
    req.flash('error', 'Something went wrong');
    res.status(400).redirect('/');
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
    req.flash('success', `${project.name} has been updated successfully`);
    res.status(201).redirect('/');
  } catch (error) {
    req.flash('error', 'Something went wrong!');
    res.status(400).redirect('/');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });
    let deletedImage = __dirname + '/../uploads/' + project.image;
    fs.unlinkSync(deletedImage);

    await Project.findByIdAndDelete({ _id: req.params.id });
    req.flash('success', `${project.name} has been deleted successfully`);
    res.status(200).redirect('/');
  } catch (error) {
    req.flash('error', 'Something went wrong!');
    res.status(400).redirect('/');
  }
};
