const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const ListingController = require("../controllers/user.js");

router.get("/signup",ListingController.rendersignupform);
router.post("/signup", wrapAsync(ListingController.signup));

router.get("/login", ListingController.renderlogin);

router.get("/logout",ListingController.logout);

router.post("/login",
saveRedirectUrl,
passport.authenticate("local",{failureRedirect:"/login" , failureFlash : true}),ListingController.login);
module.exports =router;