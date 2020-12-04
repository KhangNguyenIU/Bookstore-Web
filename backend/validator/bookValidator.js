const { check } = require('express-validator')

exports.bookValidator = [
    check('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    check('cost')
        .not()
        .isEmpty()
        .withMessage('Cost is required'),
    check('amount')
        .not()
        .isEmpty()
        .withMessage('amount is required'),
    check('description')
        .not()
        .isEmpty()
        .isLength({ min: 20 })
        .withMessage('Description must be at least 20 character in length'),
    check('genre')
        .not()
        .isEmpty()
        .withMessage('Genre is required'),
    check('writtenby')
        .not()
        .isEmpty()
        .withMessage('Author is required'),
]