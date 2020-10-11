
const express = require('express')
const { adminLogin,requiredLogin } = require('../controllers/auth')
const {  addGenre,getGenre } = require('../controllers/Genre')
const router = express.Router()

router.post('/addGenre',adminLogin,addGenre);
router.get('/getGenre',getGenre);


module.exports = router