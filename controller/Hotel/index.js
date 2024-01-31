const Hotel = require('../../models/Hotels'); // Update the path accordingly

// Create a new hotel
const createHotel = async (req, res) => {
  try {
    const {name,address} = req.body
    const newHotel = await Hotel.create({name,address});
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all hotels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific hotel by ID
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById({_id:new ObjectId(req.user.id)});
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a hotel by ID
const updateHotel = async (req, res) => {
  try {
    const {id} = req.params;
    const {name,address} = req.body;
    const updatedHotel = await Hotel.findByIdAndUpdate(
      {_id:new ObjectId(id)},
      {name,address},
      { new: true }
    );
    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a hotel by ID
const deleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete({_id:new ObjectId(req.user.id)});
    if (!deletedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
};
