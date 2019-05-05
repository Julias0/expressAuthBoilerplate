const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const AuthController = require("../controllers/authController");

router.post("/signUp", AuthController.postSignUp);

router.post("/logIn", AuthController.postLogin);

router.post("/logOut", AuthController.postLogout);

module.exports = router;
