
const express = require('express')
const router = express.Router()

const { getAllProduct} = require('../controllers/productController')

router.get('/product', getAllProduct)

module.exports = router;
