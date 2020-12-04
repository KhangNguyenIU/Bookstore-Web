
const Book = require('../models/Book.js');
const Author = require('../models/Author.js');
const Genre = require('../models/Genre.js');
const formidable = require('formidable')
const _ = require('lodash')
const slugify = require('slugify');
const User = require('../models/User.js');
const {validationResult} =require('express-validator')
exports.addBook = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(401).json({
            error: firstError
        })
    }
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
    book.cost =req.body.cost || 3.0
    book.amount = req.body.amount;
    book.sold = req.body.sold || 0;
    book.finalprice = (book.price * (1 - book.discount / 100)).toFixed(2);
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
                    { new: true }).exec((err, result)=>{
                        if(err){
                            return res.status(404).json({
                                error: "Something went wrong while adding new book! Please try again"
                            })
                        }
                        res.json({
                            msg: "Add new Book successfully"
                        })
                    })
            })


        }

    });
};

exports.showAllBook = async (req, res) => {
    let limit = parseInt(req.query.limit) || 8
    let page = parseInt(req.query.page) || 1
    let maxPrice = parseInt(req.body.maxPrice) || 1000
    let minPrice = parseInt(req.body.minPrice) || 0
    var sortObject = {};
    const { sortType, sortDir } = req.body.sortMethod
    sortObject[sortType] = sortDir;
    Book.find({})
        .where("price")
        .gte(minPrice)
        .lte(maxPrice)
        .exec(async (err, listBook) => {
            if (err) {
                return res.status(401).json({
                    error: err
                })
            }

            await Book.find({})
                .limit(limit)
                .sort(sortObject)
                .skip((page - 1) * limit)
                .populate('genre', "_id name slug")
                .populate('writtenby', "_id name slug")
                .where("price")
                .gte(minPrice)
                .lte(maxPrice)
                .exec((err, books) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        })
                    }
                    res.json({ data: books, sir: sortDir, type: sortType, booksNumber: listBook.length })
                    //res.json({sort, side})
                })
        })
    

};
exports.showBookAboutGenre=(req,res)=>{
    let limit = parseInt(req.query.limit) || 8
    let page = parseInt(req.query.page) || 1
    let maxPrice = parseInt(req.body.maxPrice) || 1000
    let minPrice = parseInt(req.body.minPrice) || 0
    let genre_id=req.body.genre_id||''
    var sortObject = {};
    const { sortType, sortDir } = req.body.sortMethod
    sortObject[sortType] = sortDir;
    Book.find({genre :{$in:genre_id}})
        .where("price")
        .gte(minPrice)
        .lte(maxPrice)
        .exec(async (err, listBook) => {
            if (err) {
                return res.status(401).json({
                    error: err
                })
            }

            await Book.find({genre :{$in:genre_id}})
                .limit(limit)
                .sort(sortObject)
                .skip((page - 1) * limit)
                .populate('genre', "_id name slug")
                .populate('writtenby', "_id name slug")
                .where("price")
                .gte(minPrice)
                .lte(maxPrice)
                .exec((err, books) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        })
                    }
                    res.json({ data: books, sir: sortDir, type: sortType, booksNumber: listBook.length })
                    //res.json({sort, side})
                })
        })
}
exports.getBookDetail = (req, res) => {
    let slug = req.params.slug;
    Book.findOne({ slug })

        .populate('genre', "_id name slug")
        .populate('writtenby', "_id name slug")
        .populate('likes', '_id username ')
        .populate('comments', 'comment postedby date')
        .populate('comments.postedby', '_id username photo')
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
            const { _id, username, likes, role, email, photo } = result

            res.json({ book, user: { _id, username, email, role, likes, photo } })
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
            const { _id, username, likes, role, email, photo } = result

            res.json({ book, user: { _id, username, email, role, likes, photo } })
        })
    })
}

exports.listRelatedBook = (req, res) => {
    const { _id, genre } = req.body

    Book.find({ _id: { $ne: _id }, genre: { $in: genre } })
        .limit(4)
        .populate('genre', "_id name slug")
        .populate('writtenby', "_id name slug")
        .exec((err, books) => {
            if (err) {
                return res.status(400).json({
                    error: "Can not load related books"
                })
            }

            res.json(books)
        })
}

exports.getBestSellerBook =(req,res)=>{
    Book.find({})
    .sort({sold:1})
    .limit(5)
    .select("photo slug").exec((err,books)=>{
        if(err){
            return res.status(401).json({
                error:err
            })
        }
        res.json(books)
    })
}
exports.getSearchBook=async(req,res)=>{
    const infor = String(req.params.infor).trim();
    Book.find(
        {
            $or: [{ title: { $regex: infor, $options: 'i' }}]
        })
        .populate('genre',"_id name slug")
        .populate('writtenby',"_id name slug")
        .exec((err, books) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({data:books});
        })
}