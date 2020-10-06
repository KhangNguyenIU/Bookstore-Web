const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const connectMongoDB = require('./config/DB')
const productRoute = require('./routes/productRoute')
// init app
const app = express()

app.use(morgan('dev'))

//config environment variables path to './'
require('dotenv').config()

// routes
app.use('/api', productRoute);

//connect database
connectMongoDB();

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})