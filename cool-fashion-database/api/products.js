const express = require("express")
const productRouter = express.Router()
const Product = require("../models/Product")

productRouter.post("/newproduct", (req, res) => {
	console.log("Product to add: ", req.body);

	const newProduct = new Product({
		name: req.body.name,
		inStock: req.body.inStock,
		description: req.body.description,
		price: req.body.price,
		pictures: req.body.pictures,
		category: req.body.category,
		isFeatured: req.body.isFeatured,
	});
	newProduct.save((err) => {
		if (err) {
			res.status(500).json({
				msg: {
					msgBody: "Nah man! Some kind of error occured while saving product",
					msgError: true,
				},
			});
		} else {
			res.status(201).json({
				msg: {
					msgBody: "Alright alright alright! Product was saved successfully.",
					msgError: false,
				},
			});
		}
	});
});

productRouter.get('/getproducts', (req, res) => {
	Product.find({}, (err, documents) => {
		if (err) {
			res.status(500).json({
				msg: {
					msgBody: 'Oops! Error! Something went wrong while getting the products.',
					msgError: true
				}
			})
		} else {
			res.status(200).json({ products: documents })
		}
	})
})

productRouter.get('/getproducts/:id', (req, res) => {
	Product.findById((req.params.id), (err, documents) => {
		if (err) {
			res.status(500).json({
				msg: {
					msgBody: 'Oops! Error! Something went wrong while getting the product by id.', err,
					msgError: true
				}
			})
		} else {
			res.status(200).json(documents)
		}
	})
})

productRouter.put('/updateproduct/:id', (req, res) => {
	Product.findByIdAndUpdate(
		req.params.id,
		{
			_id: req.body._id,
			name: req.body.name,
			inStock: req.body.inStock,
			description: req.body.description,
			price: req.body.price,
			pictures: req.body.pictures,
			category: req.body.category,
			isFeatured: req.body.isFeatured,
		},
		(err, documents) => {
			if (err) {
				res.status(500).json({
					msg: {
						msgBody: 'Oh no! An error happened while updating product.',
						msgError: true
					}
				})
			} else {
				res.status(200).json({
					msg: {
						msgBody: 'Yes sir! Product was updated.',
						msgError: false,
						data: documents
					}
				})
			}
		}
	)
})

productRouter.delete('/deleteproduct/:id', (req, res) => {
	Product.findByIdAndDelete(req.params.id, (err) => {
		if (err) {
			res.status(500).json({
				msg: {
					msgBody: 'Dang it! Error trying to delete product.',
					msgError: true
				}
			})
		} else {
			res.status(200).json({
				msg: {
					msgBody: 'You did it! Product was deleted.',
					msgError: false
				}
			})
		}
	})
})


module.exports = productRouter
