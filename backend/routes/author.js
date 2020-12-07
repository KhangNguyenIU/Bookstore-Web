
const express = require('express')
const { adminLogin,requiredLogin } = require('../controllers/auth.js')
const {  addAuthor,showAllAuthor,showAuthorWithBook,deleteAuthor } = require('../controllers/Author.js')
const router = express.Router()

router.post('/addAuthor',addAuthor);
router.get('/showAllAuthor',showAllAuthor);
router.get('/showAuthorWithBook',showAuthorWithBook);
router.delete('/deleteAuthor/:name',adminLogin,deleteAuthor);


module.exports = router