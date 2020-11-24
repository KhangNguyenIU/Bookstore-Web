
const express = require('express')
const { adminLogin,requiredLogin } = require('../controllers/auth')
const { showAllUser,deleteUser,register,login,
    getLikedBook ,makeComment,userUpdate, googleLogin } = require('../controllers/User')
const router = express.Router()

router.get('/showAllUser',adminLogin,showAllUser);
router.delete('/deleteUser',adminLogin,deleteUser);
router.post('/register',register);
router.post('/login',login);
router.get('/likedBook',requiredLogin,getLikedBook)
router.put('/makeComment/:slug',requiredLogin, makeComment)
router.put('/updateInfor',requiredLogin, userUpdate)
router.post('/google-login', googleLogin)
module.exports = router