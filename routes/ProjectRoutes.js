// Import Packages
const express = require('express');
const multer = require('multer');

// Import Controllers
const ProjectController = require('../controllers/ProjectController');

// Create express router
const router = express.Router();

// middleware
// Multer Middlewares
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "/../uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
let upload = multer({
  storage: storage,
}).single("image");

// Routes
router.route('/').post(upload, ProjectController.createProject);

module.exports = router

