const express = require('express');
const router = express.Router();

//importing middlewares.
const validateToken=require('../../middlewares/JwtValidation')
const authorizeCreator=require('../../middlewares/AuthorizeDesign')


// importing controllers...
const {createPost}  =require('../../controller/Post/Add')
const getPOst  =require('../../controller/Post/Get')
const getById  =require('../../controller/Post/GetById')
const update  =require('../../controller/Post/Update')
const deleteById  =require('../../controller/Post/Remove')

// defining routes.
router.post('/',validateToken,createPost);
router.get('/',getPOst);
router.get('/:id',getById);
router.put('/:id',update);
router.delete('/:id',deleteById);



module.exports = router;
