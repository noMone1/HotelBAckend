const mongoose = require('mongoose');

// Define Room Schema
const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Standard', 'Deluxe', 'Suite'],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['Active', 'Active', 'Booked'],
    required: true,
    default:'Active'
  },
  price: {
    type: Number,
    required: true,
  },
  images:{
    type:Array,
    required:false,
  },
  created_by:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
