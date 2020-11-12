const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book.js');
const Author = require('../models/Author.js');
const Genre = require('../models/Genre.js');
const formidable = require('formidable')
const _ = require('lodash')
const slugify = require('slugify');
const User = require('../models/User.js');
exports.addBook = async (req, res) => {

    let book = new Book();
    //handle genre array
    var genres = req.body.genre;
    genres.map((gen, index) => {
        book.genre.push(gen)
    })

    //handle author array
    var authors = req.body.writtenby;
    authors.map((author, index) => {
        book.writtenby.push(author)
    })

    book.year = req.body.year;
    if (req.body.price.length > 0) { book.price = req.body.price; }
    book.discount = req.body.discount;
    book.amount = req.body.amount;
    book.sold = req.body.sold;
    book.finalprice = book.price * (1 - book.discount / 100).toFixed(2);
    book.description = req.body.description;
    book.photo = req.body.photo;
    book.slug = slugify(req.body.title).toLowerCase();
    book.title = req.body.title

    await book.save(function (err, data) {
        if (err) {
            console.log(err);
            return res.status(404).json({ error: err });
        }
        else {
            authors.map((author, index) => {
                Author.findByIdAndUpdate(author, {
                    $push: {
                        work: data._id
                    }
                },
                    { new: true }).then(result => {
                        return res.status(201).json({
                            msg: "Add new book successfully"
                        });
                    }).catch(err => {
                        return res.status(404).json({
                            error: err
                        });
                    })
            })


        }

    });
};

exports.showAllBook = async (req, res) => {
    let limit = parseInt(req.query.limit) || 8
    let page = parseInt(req.query.page) || 1
    var sortObject = {};
    const { sortType, sortDir } = req.body
    sortObject[sortType] = sortDir;

    await Book.find({})
        .limit(limit)
        .sort(sortObject)
        .skip((page - 1) * limit)
        .populate('genre', "_id name slug")
        .populate('writtenby', "_id name slug")
       
        .exec((err, books) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json({ data: books,sir:sortDir,type: sortType })
            //res.json({sort, side})
        })

};

exports.showGenreWithBook = async (req, res) => {
    await Book.find({})
        .populate('genre')
        .exec()
        .then(data => {
            res.json(data)
        })

};

exports.getBookDetail = (req, res) => {
    let slug = req.params.slug;
    Book.findOne({ slug })

        .populate('genre', "_id name slug")
        .populate('writtenby', "_id name slug")
        .populate('likes', '_id username ')
        .populate('comments', 'comment postedby date')
        .populate('comments.postedby','_id username photo')
        .exec((err, book) => {
            if (err) {
                return res.status(401).json({
                    error: err
                })
            }
            res.json(book)
        })
}
exports.updateBook = async (req, res) => {
    var slug = req.params.slug;
    Book.findOne({ slug }).exec((err, oldBook) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        let form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({ error: "Something wrong while updating data, Please try again later" })
            }
            //let bookSlugBeforeMerge = oldBook.slug
            oldBook = _.merge(oldBook, fields)

            var { title, description, amount, price, genre, discount } = fields
            if (genre) {
                oldBook.genre = genre.split(',')

            }
            oldBook.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })
                }
                res.json({ msg: 'Update book sucessfully' })
            })

        })
    })

};


exports.showBookWithPrice = async (req, res) => {
    Book.find({ "finalprice": { $lt: req.body.price } }).exec().then(books => res.json({ data: books }));

};

exports.likeBook = (req, res) => {
    const slug = req.params.slug
    Book.findOneAndUpdate({ slug }, {
        $push: { likes: req.user._id }
    }, { new: true }).exec((err, book) => {
        if (err || !book) {
            return res.status(400).json({
                error: "Something went wrong, please try later."
            })
        }

        User.findByIdAndUpdate(req.user._id, {
            $push: { likes: book._id }
        }, { new: true }).exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: "Something went wrong, please try later."
                })
            }
            const { _id, username, likes, role, email } = result

            res.json({ book, user: { _id, username, email, role, likes } })
        })
    })
}

exports.unlikeBook = (req, res) => {
    const slug = req.params.slug
    Book.findOneAndUpdate({ slug }, {
        $pull: { likes: req.user._id }
    }, { new: true }).exec((err, book) => {
        if (err || !book) {
            return res.status(400).json({
                error: "Something went wrong, please try later."
            })
        }

        User.findByIdAndUpdate(req.user._id, {
            $pull: { likes: book._id }
        }, { new: true }).exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: "Something went wrong, please try later."
                })
            }
            const { _id, username, likes, role, email } = result

            res.json({ book, user: { _id, username, email, role, likes } })
        })
    })
}

exports.listRelatedBook =(req, res)=>{
    const { _id, genre} = req.body

    Book.find({_id :{$ne:_id}, genre :{$in: genre}})
        .limit(4)
        .populate('genre', "_id name slug")
        .populate('writtenby', "_id name slug")
        .exec((err, books)=>{
            if(err){
                return res.status(400).json({
                    error: "Can not load related books"
                })
            }

            res.json(books)
        })
}