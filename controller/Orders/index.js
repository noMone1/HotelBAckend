const mongoose = require('mongoose');
const Order = require('../../models/Orders');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, checkInDate, checkOutDate, roomId,userId } = req.body;

    const newOrder = new Order({
      customerName,
      customerEmail,
      checkInDate,
      checkOutDate,
      roomId :new mongoose.Types.ObjectId(roomId),
      userId :new mongoose.Types.ObjectId(userId),
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllOrders = async (req, res) => {
    try {
        let filter={};
        if(userId){
            filter.userId= mongoose.Types.ObjectId(req.user.id)
        }
      const orders = await Order.find(filter);
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  const getOrderById = async (req, res) => {
    try {
        id= req.params.id
      const order = await Order.findOne({
        _id: mongoose.Types.ObjectId(id),
      });
  
      if (!order) {
        return res.status(400).json({ message: 'Order not found' });
      }
  
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  const updateOrder = async (req, res) => {
    try {
      const { customerName, customerEmail, checkInDate, checkOutDate, roomId,status } = req.body;
  
      const updatedOrder = await Order.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(req.params.id)
        },
        {
            customerName,
            customerEmail,
            checkInDate,
            checkOutDate,
            roomId,status
          },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(400).json({ message: 'Order not found' });
      }
  
      res.json(updatedOrder);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const cancelOrder = async (req, res) => {
    try {
      const deletedOrder = await Order.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(req.params.id)
      },{status:'cancel_request'});
  
      if (!deletedOrder) {
        return res.status(400).json({ message: 'Order not found' });
      }
  
      res.json({ message: 'Order cancelled successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  module.exports = { createOrder, getAllOrders, getOrderById, updateOrder, cancelOrder };