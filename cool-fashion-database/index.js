const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose')

const productRouter = require('./api/products')
const userRouter = require("./api/user");
const customerMessageRouter = require('./api/customerMessages')
const categoryRouter = require('./api/categories')

require('dotenv').config()

app.use(cookieParser());
app.use(cors())
app.use(express.json())
app.use('/api', productRouter)
app.use('/api', customerMessageRouter)
app.use("/api", userRouter);
app.use('/api', categoryRouter)

mongoose.connect(
	process.env.MONGODB_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
	console.log('Success! You are connected to the database my friend.')
)

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server is running on port ${PORT}, very cool!`))
