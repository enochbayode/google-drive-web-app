const express = require("express");
const authrouter = express.Router();
const { Auth } = require("../middlewares/auth");
const auth = new Auth();

const aauth = require('../controllers/auth');
const {userValidation,logInValidate} = require('../middlewares/user.validation')

authrouter.post("/signout", aauth.logoutUser);
authrouter.post("/signup", userValidation, aauth.signup);
authrouter.post("/login", logInValidate, aauth.login);

// authrouter.put("/userProfile", auth.tokenRequired, aauth.updateUserProfile);


module.exports = { authrouter };