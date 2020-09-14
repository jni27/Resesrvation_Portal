var mongoose  = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var customerSchema = new mongoose.Schema({
    fullname: String,
    portal: String,
    date: 
    {
        type: Date,
        default: Date.now()
    },
    //time: new Date,
    customer_id: String
});

customerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Customer", customerSchema);