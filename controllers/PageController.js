// Import Packages
const nodemailer = require('nodemailer');
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
      .skip((page - 1) * projectPerPage)
      .limit(projectPerPage)
      .populate('category');

    res.status(200).render('index', {
      projects,
      current: page,
      pages: Math.ceil(totalProject / projectPerPage),
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
      categories,
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
    const project = await Project.findOne({ slug: req.params.slug });
    res.status(200).render('edit', {
      project,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Edit Page not loaded',
      error,
    });
  }
};

exports.sendEmail = async (req, res) => {
  try {
    let outputMessage = `
    <h1>Message Datails</h1>
    <ul>
      <li>Name:${req.body.name}</li>
      <li>Email:${req.body.email}</li>
      <li>Phone:${req.body.phone}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `;
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'nodejs.app.test61@gmail.com', // generated ethereal user
        pass: 'Emco123321', // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Freelancer Contact Form 👻" <emre@gmail.com>', // sender address
      to: 'colakkemre@gmail.com', // list of receivers
      subject: 'Freelancer WebApp New Message ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash('success', 'Your message has been sent successfuly');

    res.status(201).redirect('/contact');
  } catch (error) {
    req.flash('error', 'Your message not delivered. Please try again!');
    res.status(400).redirect('/contact');
  }
};
