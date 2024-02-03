const express = require('express');
const router = express.Router(); 
const {
    createCms,
    getAllCms,
    getCmsById,
    updateCmsById,
    deleteCmsById,

  } = require('../../controller/Cms/index')

router.post('/',createCms);
router.get('/',getAllCms);
router.get('/:id',getCmsById);
router.put('/:id',updateCmsById);
router.delete('/:id',deleteCmsById);

module.exports = router