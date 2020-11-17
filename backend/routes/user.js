
const express = require('express')
const { adminLogin,requiredLogin } = require('../controllers/auth')
const { showAllUser,deleteUser,register,login,getLikedBook ,makeComment,userUpdate } = require('../controllers/User')
const router = express.Router()

router.get('/showAllUser',adminLogin,showAllUser);
router.delete('/deleteUser',adminLogin,deleteUser);
router.post('/register',register);
router.post('/login',login);
router.get('/likedBook',requiredLogin,getLikedBook)
router.post('/makeComment/:slug',requiredLogin, makeComment)
router.put('/updateInfor',requiredLogin, userUpdate)

module.exports = router