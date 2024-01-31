const Design = require('../../models/Post');
const { ObjectId } = require("mongoose").Types;
const removeDesign = async (req, res,next) => {
    try {
      const design = await Design.findOneAndDelete({_id:new ObjectId(req.params.id)});
      if(design){
      res.status(200).json(design);
      }
      else{
       res.status(400).json({"message":"Post not Found"})
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  module.exports = removeDesign;