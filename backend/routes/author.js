
const express = require('express')
const { adminLogin,requiredLogin } = require('../controllers/auth.js')
const {  addAuthor,showAllAuthor,showAuthorWithBook } = require('../controllers/Author.js')
const router = express.Router()

router.post('/addAuthor',adminLogin,addAuthor);
router.get('/showAllAuthor',showAllAuthor);
router.get('/showAuthorWithBook',showAuthorWithBook);


module.exports = router