const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book.js');
const Author = require('../models/Author.js');
const Genre = require('../models/Genre.js');


const slugify = require('slugify')
exports.addBook = async (req, res) => {
   let book = {};
   book.title = req.body.title;
   if (req.body.list != null && req.body.list.length > 0) {
      book.writtenBy = [];
      for (i = 0; i < req.body.list.length; i++) {
         await Author.find({ name: req.body.list[i] }).exec().then(author => book.writtenBy.push(author[i]._id));
      }
   }
   if (req.body.genre != null) {
      await Genre.find({ name: req.body.genre }).exec()
      .then(genre => { book.genre = genre[0]._id })
      .catch(err=> console.log(err));
   }
   book.year = req.body.year;
   if (req.body.price.length > 0) { book.price = req.body.price; }
   book.discount = req.body.discount;
   book.amount = req.body.amount;
   book.sold = req.body.sold;
   book.description = req.body.description;
   book.photo = req.body.photo;
   book.slug = slugify(req.body.title).toLowerCase();

   let bookModel = new Book(book);
   await bookModel.save(function (err, data) {
      if (err) {
         console.log(err);
         return res.status(404).json({ error: err });
      }
      else
         return res.status(201).json({ msg: "Add new book successfully" });
   });
};

exports.showAllBook = async (req, res) => {
   await Book.find({})
      .exec()
      .then(books => res.json({ data: books }))
      .catch(err=>{
         return res.status(401).json({
            error: err
         })
      });
};

exports.showGenreWithBook = async (req, res) => {
   await Book.find({})
      .populate('genre')
      .exec()
      .then(data => {
         res.json(data);
      })

};

exports.getBookDetail =(req, res)=>{
   let slug = req.params.slug;

   Book.findOne({slug}).exec((err, book)=>{
      if(err){
         return res.status(401).json({
            error: err
         })
      }
      res.json({book})
   })
}