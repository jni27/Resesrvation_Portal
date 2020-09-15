"use strict";

var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var beautifyUnique = require('mongoose-beautiful-unique-validation');

var customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  portal: String,
  date: {
    type: Date,
    "default": Date.now()
  },
  time: String
});
customerSchema.plugin(passportLocalMongoose);
customerSchema.plugin(beautifyUnique);
module.exports = mongoose.model("Customer", customerSchema);