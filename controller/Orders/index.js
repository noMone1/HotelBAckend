const mongoose = require('mongoose');
const Order = require('../../models/Orders');
const Rooms = require('../../models/Rooms');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, checkInDate, checkOutDate, roomId,userId,roomType,amountToBePaid } = req.body;

    const obj = {
      customerName,
      customerEmail,
      checkInDate,
      roomType, // Assuming roomType is already defined in your code
      checkOutDate,amountToBePaid
    };
    if(roomId){
      let room = await Rooms.findOne({_id: new mongoose.Types.ObjectId(roomId),status:"Active"});
      if(!room){return res.status(400).json({message:"Room is not available"})}

      obj.roomId = new  mongoose.Types.ObjectId(roomId);
    }
    obj.userId = new mongoose.Types.ObjectId(userId);
    const newOrder = new Order(obj);

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


const getAllOrders = async (req, res) => {
    const {userId,start=0,limit=10} = req.query;
    try {
        let filter={};
        if(userId){
            filter.userId= mongoose.Types.ObjectId(req.user.id)
        }
      const orders = await Order.find(filter).skip(+start).limit(+limit);
      const totalCount = await Order.countDocuments(filter);
      res.json({totalCount,data:orders});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  const getOrderById = async (req, res) => {
    try {
        id= req.params.id
      const order = await Order.findOne({
        _id: new mongoose.Types.ObjectId(id),
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
      const { customerName, customerEmail, checkInDate, checkOutDate, roomId,status,roomType } = req.body;
      const obj = {
        customerName,
        customerEmail,
        checkInDate,
        roomType, // Assuming roomType is already defined in your code
        checkOutDate,
        status
      };
      if(roomId){
        let room = await Rooms.findOne({_id: new mongoose.Types.ObjectId(roomId),status:"Active"});
        if(!room){return res.status(400).json({message:"Room is not available"})}
  
        obj.roomId = new  mongoose.Types.ObjectId(roomId);
      }
      const updatedOrder = await Order.findOneAndUpdate(
        {
          _id:new mongoose.Types.ObjectId(req.params.id)
        },
        obj,
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(400).json({ message: 'Order not found' });
      }
  
      res.json(updatedOrder);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };

  const cancelOrder = async (req, res) => {
    try {
      const deletedOrder = await Order.findOneAndUpdate({
        _id:new  mongoose.Types.ObjectId(req.params.id)
      },{status:'cancel_request'});
  
      if (!deletedOrder) {
        return res.status(400).json({ message: 'Order not found' });
      }
  
      res.json({ message: 'Order cancelled successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  const deletedOrder = async (req, res) => {
    try {
      const deletedOrder = await Order.findOneAndDelete({
        _id:new  mongoose.Types.ObjectId(req.params.id)
      });

      res.json({ message: 'Order deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  module.exports = { createOrder, getAllOrders, getOrderById, updateOrder, cancelOrder, deletedOrder };