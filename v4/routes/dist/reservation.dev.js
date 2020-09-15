"use strict";

var express = require("express");

var router = express.Router();

var Customer = require("../models/customer"); //INDEX- show reservation page


router.get("/", function (req, res) {
  Customer.find({}, function (err, allCustomer) {
    if (err) {
      console.log(err);
    } else {
      res.render("reservation", {
        customers: allCustomer
      });
    }
  }); //res.render("reservation");
});
router.post("/", function (req, res) {
  console.log("reservation called");
  console.log(req.body); //get data from form 

  var Custname = req.body.c_name;
  var portal = req.body.portal;
  var date = req.body.date;
  var time = req.body.time;
  var contact = req.body.contact;
  var newCustomer = new Customer({
    name: Custname,
    portal: portal,
    date: date,
    time: time,
    contact: contact
  }); //Create a new customer and save to DB

  Customer.create(newCustomer, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } //redirect to reservation page


    console.log("newly created :" + newlyCreated);

    var cId = newlyCreated._id.toString().substring(0, 8);

    console.log("Your Booking ID is: ", cId);
    res.redirect("/reservation");
  });
}); //NEW - show form to create a new reservation

router.get("/new", function (req, res) {
  res.render("new");
}); // READ/SHOW - read all reservation details 

router.get("/:id", function (req, res) {
  //find the customer with provided id
  Customer.findById((req.params.id, function (err, foundCustomer) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCustomer);
      res.render("reservation/show", {
        customer: foundCustomer
      });
    }
  }));
}); //EDIT Reservation

router.get("/:id/edit", function (req, res) {
  Customer.findById(req.params.id, function (err, foundCustomer) {
    console.log(foundCustomer);
    res.render("edit", {
      customer: foundCustomer
    });
  });
}); //UPDATE Reservation

router.put("/:id", function (req, res) {
  //find and update the correct reservation
  Customer.findByIdAndUpdate(req.params.id, req.params.customer, function (err, updatedCustomer) {});
}); //DELETE Reservation

router["delete"]("/:id", function (req, res) {
  Customer.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/reservation");
    } else {
      res.redirect("/reservation/show");
    }
  });
});
module.exports = router;