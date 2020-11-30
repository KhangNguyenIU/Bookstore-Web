
const express = require('express')
const { adminLogin,requiredLogin } = require('../controllers/auth')
const { showAllUser,deleteUser,register,login,
    getLikedBook ,makeComment,userUpdate, googleLogin ,takeUserById,getUserLikedBook} = require('../controllers/User')
const router = express.Router()

router.post('/showAllUser',adminLogin,showAllUser);
router.delete('/deleteUser',adminLogin,deleteUser);
router.post('/register',register);
router.post('/login',login);
router.get('/likedBook',requiredLogin,getLikedBook)
router.put('/makeComment/:slug',requiredLogin, makeComment)
router.put('/updateInfor',requiredLogin, userUpdate)
router.post('/google-login', googleLogin)
router.post('/takeUserById',adminLogin, takeUserById)
router.post('/getUserLikedBook',adminLogin, getUserLikedBook)
module.exports = router