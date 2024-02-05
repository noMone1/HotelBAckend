const User = require('../../models/User.model');

const me= async (req, res) => {
    try {
      const {userId } = req.user;
        // console.log(req.user)
      // Check if the email is already in use
      const existingUser = await User.findOne({ _id:userId });

  
      res.status(200).json({ user:existingUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  module.exports=me