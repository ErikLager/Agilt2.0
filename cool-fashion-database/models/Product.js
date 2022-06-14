const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	inStock: {
		type: Boolean
	},
	description: {
		type: String,
		required: true
	},
	pictures: [
		{
			type: String
		}
	],
	category:{
		type: String
	},
	isFeatured: {
		type: Boolean
	},
	price: {
		type: Number,
		required: true
	}

})

module.exports = mongoose.model('Product', ProductSchema)