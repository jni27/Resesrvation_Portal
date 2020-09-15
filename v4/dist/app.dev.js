"use strict";

var express = require("express"),
    app = express();

mongoose = require("mongoose"), bodyParser = require("body-parser"), passport = require("passport"), LocalStrategy = require("passport-local"), methodOverride = require("method-override"), User = require("./models/user"), Customer = require("./models/customer");
var mongoDB = "mongodb+srv://Anjani:morning@cluster0.apfzs.mongodb.net/local_library?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("CONNECTED TO DB");
})["catch"](function (error) {
  return console.log(error.message);
});
app.use(bodyParser.urlencoded({
  extended: true
})); //app.use(express.static("public"));

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
passport.deserializeUser(User.deserializeUser()); //requiring routes

var reservationRoutes = require("./routes/reservation");

var authRoutes = require("./routes/auth");

app.use("/reservation", reservationRoutes);
app.use("/", authRoutes);
app.listen(8000, process.env.IP, function () {
  console.log("Server is running!");
});