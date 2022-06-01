const express = require("express")
const categoryRouter = express.Router()
const Category = require("../models/Category")

categoryRouter.post("/newcategory", (req, res) => {
	console.log("Category to add: ", req.body);
	
	const newCategory = new Category({
		name: req.body.name,
	});
	newCategory.save((err) => {
		if (err) {
			res.status(500).json({
				msg: {
					msgBody: "Nah man! Some kind of error occured while saving category",
					msgError: true,
				},
			});
		} else {
			res.status(201).json({
				msg: {
					msgBody: "Alright alright alright! Category was saved successfully.",
					msgError: false,
				},
			});
		}
	});
});

categoryRouter.get('/getcategories', (req, res) => {
	Category.find({}, (err, documents) => {
		if (err) {
			res.status(500).json({
				msg: {
					msgBody: 'Oops! Error! Something went wrong while getting the categories.',
					msgError: true
				}
			})
		} else {
			res.status(200).json({ categories: documents })
		}
	})
})

categoryRouter.put('/updatecategory/:id', (req, res) => {
	Category.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			inStock: req.body.inStock,
			description: req.body.description
		},
		(err) => {
			if (err) {
				res.status(500).json({
					msg: {
						msgBody: 'Oh no! An error happened while updating category.',
						msgError: true
					}
				})
			} else {
				res.status(200).json({
					msg: {
						msgBody: 'Yes sir! Category was updated.',
						msgError: false
					}
				})
			}
		}
	)
})

categoryRouter.delete('/deletecategory/:id', (req, res) => {
	Category.findByIdAndDelete(req.params.id, (err) => {
		if (err) {
			res.status(500).json({
				msg: {
					msgBody: 'Dang it! Error trying to delete category.',
					msgError: true
				}
			})
		} else {
			res.status(200).json({
				msg: {
					msgBody: 'You did it! Category was deleted.',
					msgError: false
				}
			})
		}
	})
})


module.exports = categoryRouter