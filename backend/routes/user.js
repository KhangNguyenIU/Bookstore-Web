
const express = require('express')
const { adminLogin,requiredLogin } = require('../controllers/auth')
const { showAllUser,deleteUser,register,login } = require('../controllers/User')
const router = express.Router()

router.get('/showAllUser',adminLogin,showAllUser);
router.delete('/deleteUser',adminLogin,deleteUser);
router.post('/register',register);
router.post('/login',login);


module.exports = router