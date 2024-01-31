const router = require("express").Router();
const authRoutes = require("./Auth.route");
const postRoute = require("./Post.Route");
const uploadRoute = require("./upload");
const hotelRoutes = require("./Hotels");
const roomRoutes = require("./Rooms");

// const {validateToken} =  require('../../middlewares/JwtValidation');

router.use("/auth", authRoutes);
router.use("/post", postRoute);
router.use("/upload", uploadRoute);
router.use("/hotels", hotelRoutes);
router.use("/rooms", roomRoutes);



module.exports = router;