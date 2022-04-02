// Import Packages
const express = require('express');

// Import Controllers
const PageController = require('../controllers/PageController');

// Create Express Router
const router = express.Router();

router.route('/').get(PageController.getHomePage);

module.exports = router;
