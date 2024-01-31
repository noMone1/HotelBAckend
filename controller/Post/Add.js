const multer = require('multer');
const Post = require('../../models/Post');
const path = require('path');
const formidable = require('formidable');
const {validatePost} = require('../../Validation/post')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename for each file
  }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit
});

// Controller for creating a new post
const createPost = async (req, res) => {
 
  try {
     formidable({ multiples: true });
     upload.fields([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 }
    ])
    (req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Handle Multer errors
        return res.status(500).json({ error: 'An error occurred during file upload' });
      } else if (err) {
        console.log(err)
        return res.status(500).json({ error: 'An error occurred' });
      }
      const { error, value } = validatePost.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details });
      }

      const { title, category, description1, description2 } = req.body;
      // console.log("========",{ title, category, description1, description2 })
      const images = [];
      if (req.files['image1']) {
        images.push(req.files['image1'][0].filename);
      }
      if (req.files['image2']) {
        images.push(req.files['image2'][0].filename);
      }

      const newPost = new Post({
        title,
        category,
        description1,
        description2,
        image1: images[0],
        image2: images[1],
        createdBy: req.user.name,
        createrName: req.user.name
      });

      await newPost.save();

      // Save the new post to the database or perform any other necessary operations

      res.status(200).json({ message: 'Post created successfully' });
    });
  } catch (err) {
    console.log("error ",err.message)
   return res.status(500).json(err.message);
  }
  // res.status(200).json({message:"saved"})
};


module.exports = {
  createPost,
  upload
};
