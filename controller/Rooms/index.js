const Room = require('../../models/Rooms');
const {ObjectId} = require('mongoose').Types
// Create a new room
const createRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, images, hotel,status,description } = req.body;

    const newRoom = await Room.create({
      roomNumber,
      type,
      price,
      images,description,
      created_by: new ObjectId(req.user.id),
      hotel:new ObjectId(hotel),status
    });
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a room by ID
const updateRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, images, hotel,status,description } = req.body;
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        roomNumber,
        type,
        price,
        images,description,
        created_by: new ObjectId(req.user.id),
        hotel:new ObjectId(hotel),status
      },
      { new: true }
    );
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRooms = async (req, res) => {
 try {
const { start = 0, limit = 10, roomNumber,minPrice,maxPrice,type,status } = req.query;

const filter = {};
if (roomNumber) { 
  const regexRoomNumber = new RegExp('.*' + roomNumber + '.*');
  filter.roomNumber = regexRoomNumber;
}
if (type) {
  filter.type = type;
}
if (status) {
  filter.status = status;
}
if(minPrice && maxPrice){
    filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
}
  const rooms = await Room.find(filter)
    .skip(parseInt(start))
    .limit(parseInt(limit));

  // Count all rooms based on the filter (without pagination)
  const totalRooms = await Room.countDocuments(filter);

  res.status(200).json({
    rooms,
    totalCount:totalRooms,
  })
} catch (error) {
  res.status(500).json({ error: error.message });
}
  };

  const getRoomById = async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteRoom = async (req, res) => {
    try {
      const deletedRoom = await Room.findByIdAndDelete(req.params.id);
      if (!deletedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
  };
