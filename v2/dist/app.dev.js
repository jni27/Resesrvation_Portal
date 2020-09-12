"use strict";

var express = require("express"),
    app = express();

bodyParser = require("body-parser"), mongoose = require("mongoose"), passport = require("passport"), LocalStrategy = require("passport-local"), User = require("./models/user");
app.use(bodyParser.urlencoded({
  extended: true
})); //app.use(express.static (__dirname + "/public"));

app.set("view engine", "ejs"); //PASSPORT CONFIGURATION

app.use(require("express-session")({
  secret: "First Project",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get("/", function (req, res) {
  res.render("home");
});
app.get("/reservation/index", function (req, res) {
  res.render("reservation/index");
}); //=======
//AUTH routes
//=======
//***Sign up ****/
//show sign up form

app.get("/register", function (req, res) {
  res.render("register");
}); //handle sign up logic

app.post("/register", function (req, res) {
  var newUser = new User({
    username: req.body.username,
    email: req.bosy.email
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

app.get("/login", function (req, res) {
  res.render("login");
}); //handle login logic

app.post("/login", passport.authenticate("local", {
  successRedirect: "/reservation/index",
  failureRedirect: "/login"
}), function (req, res) {});
app.listen(process.env.PORT, process.env.IP, function () {
  console.log("Server is running!");
});