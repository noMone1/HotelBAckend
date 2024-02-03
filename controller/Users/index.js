const User = require('../../models/User.model');
const getAllUsers = async (req, res) => {
    try {
   const { start = 0, limit = 10, gender,search } = req.query;
   
   const filter = {};
   if (gender) {
     filter.gender = gender;
   }

   if(search){
    filter.$or=[
        { name: { $regex: new RegExp(search, 'i') } }, // 'i' for case-insensitive
        { email: { $regex: new RegExp(search, 'i') } },
      ]
   }
     const users = await User.find(filter)
       .skip(parseInt(start))
       .limit(parseInt(limit));
   
     // Count all rooms based on the filter (without pagination)
     const totalUsers = await User.countDocuments(filter);
   
     res.status(200).json({
       data:users,
       totalCount:totalUsers,
     })
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
     };

     module.exports={getAllUsers};