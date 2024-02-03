const mongoose = require('mongoose');

const cmsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content1: {
    type: String,
    required: false,
  },
  content2: {
    type: String,
    required: false,
  },
  images: [{
    type: String, 
  }],
});

const Cms = mongoose.model('Cms', cmsSchema);

module.exports = Cms;
