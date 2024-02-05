
const router = require("express").Router();

// importing controllers
const signup = require("../../controller/Auth/signup")
const login = require("../../controller/Auth/login")
const me = require("../../controller/Auth/me")
const validateToken = require('../../middlewares/JwtValidation')
router.post('/signup',signup);
router.get('/me',validateToken,me);
router.post('/login',login);

module.exports = router;
