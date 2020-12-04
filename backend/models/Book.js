const mongoose = require('mongoose');
var book = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        writtenby: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "author"
            }
        ],
        genre: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'genre' }
        ],
        year: {
            type: Number,
            default: 2018,
            min: 1990
        },
        price: {
            type: Number,
            min: 0,
            default: 3.0,
            sparse: true,
            require: true
        },
        discount: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        finalprice: {
            type: Number,
            min: 0,
            max: this.price,
            default: 0
        },
        amount: {
            type: Number,
            min: 0,
            default: 100
        },
        sold: {
            type: Number,
            min: 0,
            default: 0
        },
        description: {
            type: String,
            default: "No description",
        },
        comments: [{
            comment: String,
            postedby: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            date: {
                type: Date,
                default: Date.now()
            }
        }],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }],
        photo: {
            type: String,
            default: "no image",
            minlength: 0,
            maxlength: 500
        },
        slug: {
            type: String,
            default: "pro"
        }

    },{
        timestamps:true
    });


module.exports = Book = mongoose.model('book', book);