// Import Packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');

// Import Routers
const PageRouter = require('./routes/PageRoutes');
const ProjectRouter = require('./routes/ProjectRoutes');
const CategoryRouter = require('./routes/CategoryRoutes');

// Create express app
const app = express();

// Middlewares
app.use(express.static('public'));
app.use(express.static('uploads'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(methodOverride('_method',{
  methods: ['GET','POST']
}));
// Template Engine
app.set('view engine', 'ejs');

// Routes
app.use('/', PageRouter);
app.use('/project', ProjectRouter);
app.use('/category', CategoryRouter);

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

