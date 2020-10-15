
const express = require('express')
const { adminLogin } = require('../controllers/auth.js')
const { addBook,showAllBook,showGenreWithBook,getBookDetail } = require('../controllers/Book.js')
const router = express.Router()

router.post('/addBook', adminLogin,addBook);
router.get('/showAllBook',showAllBook);
router.get('/getBookDetail/:slug',getBookDetail)

module.exports = router