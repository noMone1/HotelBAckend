const express = require('express');
const router = express.Router();
const Design = require('../../models/Post');
const { ObjectId } = require('mongoose').Types;
const formidable = require('formidable');

const updateDesign = async (req, res, next) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: 'Error parsing form data' });
    }

    try {
      const { title, category, description1, description2, likes } = fields;
      const design = await Design.findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { title, category, description1, description2, likes },
        { new: true }
      );
      res.status(200).json(design);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};

module.exports = updateDesign;
