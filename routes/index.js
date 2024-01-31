const router = require("express").Router();
const createError = require("http-errors");

const apiRoutes = require("./api");

router.use("/api", apiRoutes);
router.use("/ping", (req,res)=>{
    res.status(200).send("pong")
});

module.exports=router