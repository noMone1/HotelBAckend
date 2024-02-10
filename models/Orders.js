const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', // Assuming you have a Room model
    required: false,
  },
  roomNumber: {
    type: mongoose.Schema.Types.String,
    required: false,
  },
  roomType: {
    type: mongoose.Schema.Types.String,
    required: true,
    enum: ['Standard', 'Deluxe', 'Suite'],
  },
  amountToBePaid: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a Room model
    required: false,
  },
  status: {
    type: String,
    enum: ['room_allocated', 'confirmed', 'canceled','cancel_request','completed','payment_pending'],
    default: 'confirmed',
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
