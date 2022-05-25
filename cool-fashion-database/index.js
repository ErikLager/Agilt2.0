const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const productRouter = require('./api/products')
const customerMessageRouter = require('./api/customerMessages')

require('dotenv').config()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/api', productRouter)
app.use('/api', customerMessageRouter)

mongoose.connect(
	process.env.MONGODB_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
	console.log('Success! You are connected to the database my friend.')
)

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server is running on port ${PORT}, very cool!`))
