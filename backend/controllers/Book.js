<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book.js');
const Author = require('../models/Author.js');
const Genre = require('../models/Genre.js');
var bodyParser = require('body-parser');
const route = express.Router();
const jwt = require('jsonwebtoken');
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
    await Genre.find({ name: req.body.genre }).exec().then(genre => { book.genre = genre[0]._id });

  }
  book.year = req.body.year;
  if (req.body.price.length > 0) { book.price = req.body.price; }
  book.discount = req.body.discount;
  book.amount = req.body.amount;
  book.sold = req.body.sold;
  book.description = req.body.description;
  book.photo = req.body.photo;
  book.slug = req.body.slug;

  let bookModel = new Book(book);
  await bookModel.save(function (err, data) {
    if (err) {
      console.log(err);
      return res.status(404).json({ msg: err });
    }
    else
      return res.status(201).json({ msg: "Add successly" });
  });


};

exports.showAllBook = async (req, res) => {
  await Book.find({})
    .exec()
    .then(books => res.json({ data: books }));

};

exports.showGenreWithBook = async (req, res) => {
  await Book.find({}).populate('genre').exec().then(data => res.json(data));

};
=======
const express=require('express');
const mongoose=require('mongoose');
const Book=require('../models/Book.js');
const Author=require('../models/Author.js');
const Genre=require('../models/Genre.js');
var bodyParser = require('body-parser');
const route=express.Router();
const jwt=require('jsonwebtoken');
exports.addBook= async (req, res)=> {
    let book={};
    book.title=req.body.title;
    if(req.body.list!=null&&req.body.list.length>0)
    {
        book.writtenBy=[];
        for (i = 0; i < req.body.list.length; i++) {
            await Author.find({name:req.body.list[i]} ).exec().then(author=>book.writtenBy.push(author[i]._id));
          }
    }
    if(req.body.genre!=null)
    {
        await Genre.find({name:req.body.genre} ).exec().then(genre=>{book.genre=genre[0]._id});

    }
    book.year=req.body.year;
    if(req.body.price.length>0)
     {book.price=req.body.price;}
    book.discount=req.body.discount;
    book.amount=req.body.amount;
    book.sold=req.body.sold;
    book.description=req.body.description;
    book.photo=req.body.photo;
    book.slug=req.body.slug;

    let bookModel=new Book(book);
    await bookModel.save(function (err,data){
      if(err)
     {
         console.log(err);
         return res.status(404).json({msg:err});
      }
      else
        return res.status(201).json({msg:"Add successly"});
    });
    
    
  };
  exports.showAllBook=async(req,res)=>{
    await Book.find({} ).exec().then(books=>res.json({data:books}));
  
  };
  exports.showGenreWithBook=async(req,res)=>{
    await Book.find({}).populate('genre').exec().then(data=>res.json(data));
  
  };
>>>>>>> main

