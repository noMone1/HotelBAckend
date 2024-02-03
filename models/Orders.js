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
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a Room model
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled','cancel_request','completed'],
    default: 'pending',
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
