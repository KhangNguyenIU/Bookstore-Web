
const express = require('express')
const { adminLogin,requiredLogin } = require('../controllers/auth');
const { confirmOrder } = require('../controllers/mail');
const { addOrder,checkOrder,deleteOrder,userCheckOrder,getOrderDetail, confirmMailOrder} = require('../controllers/Order')
const router = express.Router()

router.post('/addOrder',requiredLogin,addOrder);
router.delete('/deleteOrder',adminLogin,deleteOrder);
router.post('/checkOrder',adminLogin,checkOrder);
router.get('/userCheckOrder',requiredLogin,userCheckOrder);
router.get('/getOrderDetail/:_id',requiredLogin,getOrderDetail);
router.get('/confirmOrder', requiredLogin, confirmOrder)
router.put('/verified/:token', requiredLogin, confirmMailOrder)

module.exports = router