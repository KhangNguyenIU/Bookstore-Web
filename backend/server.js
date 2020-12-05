
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const connectMongoDB = require('./config/DB')
//const productRoute = require('./routes/productRoute')
// init app
const app = express()

//config environment variables path to './'
require('dotenv').config()
//cors
// if (process.env.NODE_ENV === 'development') {
//     app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
// }

app.use(morgan('dev'))

// routes
app.use(express.json());
app.use('/api/user',require('./routes/user.js'));
app.use('/api/book',require('./routes/book.js'));
app.use('/api/genre',require('./routes/genre.js'));
app.use('/api/author',require('./routes/author.js'));
app.use('/api/order',require('./routes/order.js'));
app.use('/api/shipping',require('./routes/shipping.js'));
app.use(cors());

//connect database
connectMongoDB();

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})