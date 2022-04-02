// Import Packages
const mongoose = require('mongoose');

// Create Schema Object
const Schema = mongoose.Schema;

// Create Project Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Project Model
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
