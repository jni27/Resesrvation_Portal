"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/user");

var passport = require("passport");

router.get("/", function (req, res) {
  res.render("home");
}); //=======
//AUTH routes
//=======
//***Sign up ****/
//show sign up form

router.get("/register", function (req, res) {
  res.render("register");
}); //handle sign up logic

router.post("/register", function (req, res) {
  var newUser = new User({
    username: req.body.username,
    email: req.body.email
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }

    passport.authenticate("local")(req, res, function () {
      res.redirect("/reservation");
    });
  });
}); //***Sign in ****/
//show login form

router.get("/login", function (req, res) {
  res.render("login");
}); // app.get('/auth/google/secrets',
// passport.authenticate('google', { failureRedirect: '/login' }),
// function(req, res) {
// // Successful authentication, redirect home.
// console.log("successful");
// res.redirect('/secrets');
// });
//handle login logic

router.post("/login", passport.authenticate("local", {
  successRedirect: "/reservation",
  failureRedirect: "/login"
}), function (req, res) {});
module.exports = router;