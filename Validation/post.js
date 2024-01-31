const Joi = require('joi');
const commentJoiSchema = Joi.object({
  name: Joi.string().required(),
  time: Joi.date().default(Date.now()).required(),
  userId: Joi.string().required()
});

// Joi validation schema for the postSchema
const validatePost = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  description1: Joi.string().required(),
  description2: Joi.string().allow(''),
  image1: Joi.string().allow(''),
  image2: Joi.string().allow(''),
  likes: Joi.number().default(0),
  createdBy: Joi.string().default(''),
  createrName: Joi.string().default(''),
  comments: Joi.array().items(commentJoiSchema).optional()
});


module.exports = {
  validatePost
};
