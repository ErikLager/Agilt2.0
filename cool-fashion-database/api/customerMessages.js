const express = require("express")
const customerMessageRouter = express.Router()
const CustomerMessage = require("../models/CustomerMessage")

customerMessageRouter.post("/newcustomermessage", (req, res) => {
	console.log("New customer message: ", req.body);
	
	const newCustomerMessage = new CustomerMessage({
		name: req.body.name,
		email: req.body.email,
		message: req.body.message,
		timestamp: req.body.timestamp
	});
	newCustomerMessage.save((err) => {
		if (err) {
			res.status(500).json({
				msg: {
					msgBody: "Nah man! Some kind of error occured while saving message.",
					msgError: true,
				},
			});
		} else {
			res.status(201).json({
				msg: {
					msgBody: "Alright alright alright! Message was saved successfully.",
					msgError: false,
				},
			});
		}
	});
});


module.exports = customerMessageRouter