
const express = require('express')
const { adminLogin } = require('../controllers/auth.js')
const { addBook,showAllBook,showGenreWithBook } = require('../controllers/Book.js')
const router = express.Router()

router.post('/addBook', adminLogin,addBook);
router.post('/showAllBook',showAllBook);


module.exports = router