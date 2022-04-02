// Import Packages
const mongoose = require('mongoose');
const slugify = require('slugify');

// Create Schema Object
const Schema = mongoose.Schema;

// Create Project Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  link: {
    type: String
  },
  slug: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

ProjectSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

// Create Project Model
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
