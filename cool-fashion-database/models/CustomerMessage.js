const mongoose = require('mongoose')

const CustomerMessageSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('CustomerMessage', CustomerMessageSchema)