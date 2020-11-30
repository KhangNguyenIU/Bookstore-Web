
const express = require('express')
const { adminLogin,requiredLogin } = require('../controllers/auth')
const {  addGenre,getGenre,getGenreByName } = require('../controllers/Genre')
const router = express.Router()

router.post('/addGenre',adminLogin,addGenre);
router.get('/getGenre',getGenre);
router.get('/getGenreByName/:name',getGenreByName)


module.exports = router