const express = require('express')

const router = express.Router()
const {addShipping,getAllShipping} =require('../controllers/Shipping')

router.post('/addShipping', addShipping);
router.get('/getAllShipping', getAllShipping)
module.exports = router