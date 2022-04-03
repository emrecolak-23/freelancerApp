// Import Models
const Category = require('../models/Category');
const Project = require('../models/Project');
exports.getHomePage = async (req, res) => {
  try {

    const page = req.query.page || 1;
    const projectPerPage = 3;
    const totalProject = await Project.find().countDocuments();

    const projects = await Project.find()
    .sort('-createdAt')
    .skip((page-1)*projectPerPage)
    .limit(projectPerPage)
    .populate('category')

    res.status(200).render('index', {
      projects,
      current: page,
      pages: Math.ceil(totalProject/projectPerPage)
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
