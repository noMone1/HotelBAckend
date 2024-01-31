const express = require('express');
const router = express.Router();
const validateToken =  require('../../middlewares/JwtValidation');
const {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
  } = require('../../controller/Rooms/index');

router.post('/',validateToken,createRoom);
router.get('/',getAllRooms);
router.get('/:id',getRoomById);
router.put('/:id',validateToken,updateRoom);
router.delete('/:id',validateToken,deleteRoom);

module.exports = router