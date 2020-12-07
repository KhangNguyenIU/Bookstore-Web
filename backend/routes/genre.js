
const express = require('express')
const { adminLogin,requiredLogin } = require('../controllers/auth')
const {  addGenre,getGenre,getGenreByName,deleteGenre} = require('../controllers/Genre')
const router = express.Router()

router.post('/addGenre',adminLogin,addGenre);
router.get('/getGenre',getGenre);
router.get('/getGenreByName/:name',getGenreByName)
router.delete('/deleteGenre/:name',adminLogin,deleteGenre)


module.exports = router