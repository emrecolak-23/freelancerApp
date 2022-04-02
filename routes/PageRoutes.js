// Import Packages
const express = require('express');

// Import Controllers
const PageController = require('../controllers/PageController');

// Create Express Router
const router = express.Router();

router.route('/').get(PageController.getHomePage);

// about page
router.route('/about').get(PageController.getAboutPage);

// contact page
router.route('/contact').get(PageController.getContactPage);

// add Page
router.route('/add').get(PageController.getAddPage);

module.exports = router;
