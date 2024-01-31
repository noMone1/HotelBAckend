const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: Date, default: Date.now, required: true },
  userId: { type: String, required: true }
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description1: { type: String, required: false },
  description2: { type: String, required: false },
  image1: { type: String, required: false },
  image2: { type: String, required: false },
  likes: { type: Number, default: 0 },
  createdBy: { type: String, default: 0 },
  createrName: { type: String, default: 0 },
  comments: [commentSchema]
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
