
const express = require('express')
const { adminLogin, requiredLogin } = require('../controllers/auth.js')
const { addBook, showAllBook, showGenreWithBook, getBookDetail, updateBook,
    likeBook ,unlikeBook, listRelatedBook} = require('../controllers/Book.js')
const router = express.Router()

router.post('/addBook', adminLogin, addBook);
router.post('/showAllBook', showAllBook);
router.get('/getBookDetail/:slug', getBookDetail)
router.put('/updateBook/:slug', updateBook);
router.put('/likeBook/:slug',requiredLogin, likeBook)
router.put('/unlikeBook/:slug',requiredLogin, unlikeBook)
router.post('/relatedBook', listRelatedBook)
module.exports = router