const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book.js');
const Author = require('../models/Author.js');
const Genre = require('../models/Genre.js');


const slugify = require('slugify')
exports.addBook = async (req, res) => {
  let book={};
  book.writtenby=[];
  book.genre=[];
  book.title=req.body.title;
  if(req.body.writtenby!=null&&req.body.writtenby.length>0)
  {
      for (i = 0; i < req.body.writtenby.length; i++) {
          await Author.findOne({name:req.body.writtenby[i]} ).exec().then(author=>
            {book.writtenby=book.writtenby.concat({"author_id":author._id})});

        }
  }
  if(req.body.genre.length>0)
  {
    for (i = 0; i < req.body.genre.length; i++) {
      book.genre=book.genre.concat({"genre_id":req.body.genre[i]});
    }

  }
   book.year = req.body.year;
   if (req.body.price.length > 0) { book.price = req.body.price; }
   book.discount = req.body.discount;
   book.amount = req.body.amount;
   book.sold = req.body.sold;
   book.finalprice=book.price*(1-book.discount/100).toFixed(2);
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
   await Book.find({}).populate('genre.genre_id',"name").populate('writtenby.author_id',"name").exec().then(books=>res.json({data:books}));
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

   Book.findOne({slug}).populate('genre.genre_id',"name").populate('writtenby.author_id',"name").exec((err, book)=>{
      if(err){
         return res.status(401).json({
            error: err
         })
      }
      res.json({book})
   })
}
exports.updateBook=async(req,res)=>{
   var newgenre=[]
   var newauthor=[]
   for (i = 0; i < req.body.newGenre.length; i++) {
     newgenre=newgenre.concat({"genre_id":req.body.newGenre[i]});
   }
   await Book.findByIdAndUpdate(req.body._id,{title:req.body.title,price:req.body.price,discount:req.body.discount,finalprice:parseFloat(req.body.price*(1-req.body.discount/100).toFixed(2)),genre:newgenre,amount:req.body.amount,year:req.body.year,slug:slugify(req.body.title).toLowerCase()},{new:true}).exec((err,result)=>{if(err){return res.status(402).json({error:"update unsuucess"})}else{return res.status(201).json({msg:"update success"})}})
 
 };
 exports.showBookWithPrice=async(req,res)=>{
   Book.find({ "finalprice": {$lt: req.body.price }} ).exec().then(books=>res.json({data:books}));
 
 };