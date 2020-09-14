"use strict";

var express = require("express");

var router = express.Router();

var Customer = require("../models/customer"); //INDEX- show reservation page


router.get("/", function (req, res) {
  res.render("reservation");
});
router.post("/", function (req, res) {
  //get data form form 
  var name = req.body.fullname;
  var portal = req.body.portal;
  var date = req.body.date;
  var time = req.body.time; // var customer_id = 

  var newCustomer = new Customer({
    fullname: name,
    portal: portal,
    date: date,
    time: time
  }); //Create a new customer and save to DB

  Customer.create(newCustomer, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } //redirect to reservation page


    console.log(newlyCreated);
    res.redirect("/reservation");
  });
}); //NEW - show form to create a new reservation

router.get("/new", function (req, res) {
  res.render("new");
}); // READ/SHOW - read all reservation details 

module.exports = router;