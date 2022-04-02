// Import Packages
const express = require('express');
const mongoose = require('mongoose');

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

// Connect DB
const dbURI =
  'mongodb+srv://emco:emco3232@nodetuts.iuulr.mongodb.net/freelancerApp?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('database connected');
    // declare port number
    const PORT = process.env.PORT || 15000;
    // listen for request
    app.listen(PORT, () => {
      console.log(`Server listened in ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

