const Cms = require('../../models/Cms');

// Create a new CMS content
const createCms = async (req, res) => {
    try {
      const { title, content1,content2, type, images } = req.body;
      
      // Validate the required fields
    
  
      const newCms = await Cms.create({
        title,
        content1,content2,
        type,
        images, // Assuming images is an array of image URLs
      });
  
      return res.status(200).json(newCms);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


// Get all CMS content
const getAllCms = async (req,res) => {
  try {
    const {type,start = 0, limit = 10,} = req.query;
    let filter = {};
    if(type){
        filter.type = type
    }
    const allCms = await Cms.find(filter).skip(+start).limit(+limit);
    const total = await Cms.countDocuments(filter);
    res.status(200).json({data:allCms,totalCount:total})
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"internal server error"})
  }
};

// Get a specific CMS content by ID
const getCmsById = async (req,res) => {
  try {
    const {id} = req.params;
    const cms = await Cms.findById(id);

     res.status(200).json(cms)
  } catch (error) {
    console.error(error);
     response.status(500).json({message:'Internal Server Error'});
  }
};

// Update a specific CMS content by ID
const updateCmsById = async (req, res) => {
    try {
      const { title, content1,content2, type, images } = req.body;
      const { id } = req.params;
  
      // Validate the required fields
      if (!title || !content || !type) {
        return res.status(400).json({ error: 'Title, content, and type are required fields' });
      }
  
      const updatedCms = await Cms.findByIdAndUpdate(id, {
        title,
        content1,content2,
        type,
        images, // Assuming images is an array of image URLs
      }, { new: true });
  
      if (!updatedCms) {
        return res.status(404).json({ error: 'CMS content not found' });
      }
  
      return res.json(updatedCms);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Delete a specific CMS content by ID
const deleteCmsById = async (req,res) => {
  const {id} = req.params;
  try {
    const deletedCms = await Cms.findByIdAndDelete(id);
    if (!deletedCms) {
      throw new Error('CMS content not found');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  createCms,
  getAllCms,
  getCmsById,
  updateCmsById,
  deleteCmsById,
};
