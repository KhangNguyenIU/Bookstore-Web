
const express = require('express')
const { adminLogin,requiredLogin } = require('../controllers/auth.js')
const {  addAuthor,showAllAuthor,showAuthorWithBook,
    deleteAuthor,updateAuthor,getBestAuthor } = require('../controllers/Author.js')
const router = express.Router()

router.post('/addAuthor',addAuthor);
router.get('/showAllAuthor',showAllAuthor);
router.get('/showAuthorWithBook',showAuthorWithBook);
router.delete('/deleteAuthor/:name',adminLogin,deleteAuthor);
router.put('/update',updateAuthor)
router.get('/bestAuthor', getBestAuthor)
module.exports = router