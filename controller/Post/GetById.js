const Design = require('../../models/Post');
const { ObjectId } = require("mongoose").Types;
const getDesignById = async (req, res,next) => {
    try {
      const post = await Design.findOne({_id:new ObjectId(req.params.id)});
      res.status(200).json(post);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  module.exports = getDesignById;