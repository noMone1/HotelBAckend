const express = require('express');
const router = express.Router(); 
const {getAllUsers,
  } = require('../../controller/Users/index')
router.get('/',getAllUsers);


module.exports = router