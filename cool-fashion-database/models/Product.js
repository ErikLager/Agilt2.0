const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	inStock: {
		type: Boolean,
		required: true
	},
	description: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Product', ProductSchema)