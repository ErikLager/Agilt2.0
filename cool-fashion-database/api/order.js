const express = require("express");
const passport = require("passport");
const orderRouter = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const { orderFailed, orderConfirmed } = require("../services/emailService");


// Add a new Order - anyone
orderRouter.post("/neworder", (req, res) => {
    const newOrder = new Order(req.body);
    newOrder.save((e) => {
        if (e) {
            res.status(500).json(
                {
                    message: {
                        msgBody:"An error occurd while adding order",
                        msgError: true,
                        error: e
                    }
                }
            );
            orderFailed(req.body);
        }else{
            res.status(200).json({
                message:{
                    msgBody: "Order was successfully created",
                    msgError: false
                }
            });
            orderConfirmed(req.body);
        };
    });
});



// Get all orders - Admin
orderRouter.get("/getallorders", passport.authenticate("jwt", {session: false}), (req, res) => {
    Order.find({}, (e, orders) => {
        if(e){
            res.status(500).json({
                message:{
                    msgBody: "There was an error while getting all orders",
                    msgError: true,
                    error: e
                },
            });
        }else{
            res.status(200).json(
                {
                    orders,
                    message: {
                        msgBody: "Successfully retrieved all orders",
                        msgError: false,
                    },
                },
            );
        };
    });
});


// Handle all orders - admin
orderRouter.put("/handleorder/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    Order.findByIdAndUpdate({_id: req.params.id}, {handled: req.body.handled}, (e) => {
        if(e){
            res.status(500).json(
                {
                    message: {
                        msgBody: "An error occured while handling order",
                        msgError: true,
                        error: e
                    }
                },
            );
        }else{
            res.status(200).json(
                {
                    message: {
                        msgBody: "Successfully updated handler",
                        msgError: false,
                    }
                }
            );
        }
    });
});


// Delete order - Admin
orderRouter.delete("/deleteorder/:id", passport.authenticate("jwt", {session:false}), (req, res) => {
    Order.findByIdAndDelete({_id: req.params.id}, (e) => {
        if(e){
            res.status(500).json(
                {
                    message: {
                        msgBody: "An error occured while deleting order",
                        msgError: true,
                        error: e
                    }
                },
            );
        }else{
            res.status(200).json(
                {
                    message: {
                        msgBody: "Successfully deleted order",
                        msgError: false,
                    }
                }
            );
        };
    });
});


module.exports = orderRouter;
