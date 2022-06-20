const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    products:[
        {
            _id:{
                type: String,
                required: true
            },
            name:{
                type: String,
                required: true
            },
            price:{
                type: String,
                required: true
            },
            count:{
                type: String,
                required: true
            },
        },
    ],
    handled: {
        type: Boolean
    },
});

module.exports = mongoose.model("Order", OrderSchema);