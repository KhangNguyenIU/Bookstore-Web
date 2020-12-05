const express = require('express');
const { getAllProductTest } = require('../controllers/productController');

const router = express.Router()
const {addShipping,getAllShipping} =require('../controllers/Shipping')

router.post('/addShipping', addShipping);
router.get('/getAllShipping', getAllShipping)
router.get('/test', getAllProductTest)
module.exports = router