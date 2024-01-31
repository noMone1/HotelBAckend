const Design = require('../../models/Post');
const getAll = async (req, res, next) => {
  let { start } = req.query || 0;
  let { limit } = req.query || 10;
  let { search } = req.query;
  let filter={};
  if(search ){
    filter.title = { $regex: new RegExp(search, 'i') };
  }

  try {
    const posts = await Design.find(filter, { title: 1, category: 1, _id: 1, image1: 1, image2: 1, createrName: 1, title: 1, likes: 1, created_at: 1, description1: 1, description2: 1 }).sort({ created_at: -1 }).skip(start).limit(limit);
    const count = await Design.countDocuments(filter);
    res.status(200).json({ count, data: posts });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
module.exports = getAll;