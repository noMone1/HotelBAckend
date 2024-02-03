const router = require("express").Router();
const authRoutes = require("./Auth.route");
const uploadRoute = require("./upload");
const hotelRoutes = require("./Hotels");
const roomRoutes = require("./Rooms");
const userRoutes = require("./User");
const orderRoute = require("./Order");
const cmsRoutes = require("./Cms");
// const {validateToken} =  require('../../middlewares/JwtValidation');

router.use("/auth", authRoutes);
router.use("/upload", uploadRoute);
router.use("/hotels", hotelRoutes);
router.use("/rooms", roomRoutes);
router.use("/users", userRoutes);
router.use("/orders", orderRoute);
router.use("/cms", cmsRoutes);



module.exports = router;