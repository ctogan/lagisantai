const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {body,validationResult} = require('express-validator');
const validate = require('../validation/user');

router.post("/register",validate.signup, userController.createUser);
module.exports = router;
