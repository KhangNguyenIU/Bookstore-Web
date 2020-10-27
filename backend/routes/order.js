
const express = require('express')
const { adminLogin,requiredLogin } = require('../controllers/auth')
const { addOrder,checkOrder,deleteOrder } = require('../controllers/Order')
const router = express.Router()

router.post('/addOrder',requiredLogin,addOrder);
router.delete('/deleteOrder',adminLogin,deleteOrder);
router.post('/checkOrder',adminLogin,checkOrder);


module.exports = router