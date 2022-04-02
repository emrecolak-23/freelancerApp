// Import Packages
const express = require('express');

// Import Routers
const PageRouter = require('./routes/PageRoutes');

// Create express app
const app = express();

// Middlewares
app.use(express.static('public'));

// Template Engine
app.set('view engine', 'ejs');

// Routes
app.use('/', PageRouter);

// Decleare Port
const PORT = 15000;
app.listen(PORT, () => {
  console.log(`Server listened in ${PORT}`);
});
