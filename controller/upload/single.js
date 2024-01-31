const fs = require('fs');
const path = require('path');

const uploadSingle = async (req, res) => {
  try {
    const file = req.file;
    
    let ext = file.originalname.split('.').pop();
    const name = new Date().getTime() +'.'+ext;
    if (!file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const uploadPath = './uploads';
    const filePath = path.join(uploadPath, name);

    // Use fs to save the file
    fs.writeFileSync(filePath, file.buffer);

    return res.status(200).json({ message: 'File uploaded successfully', name });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal server error', error: e.message });
  }
};

module.exports = uploadSingle;
