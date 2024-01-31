const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const upload = multer({ });
const uploadSingle = require('../../controller/upload/single')
// defining routes.
router.post('/single',upload.single('file'),uploadSingle);




module.exports = router;
