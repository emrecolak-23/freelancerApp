// Import Models
const Category = require('../models/Category');
const Project = require('../models/Project');
exports.getHomePage = async (req, res) => {
  try {
    const projects = await Project.find().sort('-createdAt').populate('category')
    res.status(200).render('index', {
      projects
    });
  } catch (error) {
    res.status(400).json({
      status: 'Home Page not loaded',
      error,
    });
  }
};

exports.getAboutPage = (req, res) => {
  try {
    res.status(200).render('about');
  } catch (error) {
    res.status(400).json({
      status: 'About Page not loaded',
      error,
    });
  }
};

exports.getContactPage = (req, res) => {
  try {
    res.status(200).render('contact');
  } catch (error) {
    res.status(400).json({
      status: 'Contact Page not loaded',
      error,
    });
  }
};

exports.getAddPage = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).render('add', {
      categories
    });
  } catch (error) {
    res.status(400).json({
      status: 'Add Page not loaded',
      error,
    });
  }
};

exports.getEditPage = async (req, res) => {
  try {
    const project = await Project.findOne({slug:req.params.slug});
    res.status(200).render('edit', {
      project
    });
  } catch(error) {
    res.status(400).json({
      status: 'Edit Page not loaded',
      error
    })
  }
};
