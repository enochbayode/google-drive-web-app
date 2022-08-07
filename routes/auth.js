const express = require("express");
const authrouter = express.Router();
const { Auth } = require("../middlewares/auth");
const auth = new Auth();

const aauth = require('../controllers/auth');
const {userValidation,logInValidate} = require('../middlewares/user.validation')

authrouter.post("/signout", aauth.logoutUser);
authrouter.post("/signup", aauth.signup);
authrouter.post("/login", logInValidate, aauth.login);



module.exports = { authrouter };