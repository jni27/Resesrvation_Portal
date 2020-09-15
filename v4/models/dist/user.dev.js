"use strict";

var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var beautifyUnique = require('mongoose-beautiful-unique-validation');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: String,
  password: String
});
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(beautifyUnique);
module.exports = mongoose.model("User", UserSchema);