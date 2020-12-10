
const express = require('express')
const { adminLogin, requiredLogin } = require('../controllers/auth.js')
const { addBook, showAllBook, showGenreWithBook, getBookDetail, updateBook,
    likeBook ,unlikeBook, listRelatedBook, 
    showBookByPrice, getBestSellerBook,getSearchBook,
    showBookAboutGenre,deleteBook, getBookByAuthor, getBookBestSeller} = require('../controllers/Book.js');
const { bookValidator } = require('../validator/bookValidator.js');
const router = express.Router()

router.post('/addBook', adminLogin,bookValidator, addBook);
router.post('/showAllBook', showAllBook);
// router.post('/showBookByPrice', showBookByPrice);

router.get('/getBookDetail/:slug', getBookDetail)
router.put('/updateBook/:slug', updateBook);
router.put('/likeBook/:slug',requiredLogin, likeBook)
router.put('/unlikeBook/:slug',requiredLogin, unlikeBook)
router.post('/relatedBook', listRelatedBook)
router.get('/bestSold', getBestSellerBook)
router.get('/getSearchBook/:infor', getSearchBook)
router.post('/showBookAboutGenre', showBookAboutGenre)
router.get('/getBookByAuthor/:slug',getBookByAuthor)
router.delete('/deleteBook/:slug',adminLogin, deleteBook)
router.get('/getBookBestSeller',getBookBestSeller)
module.exports = router