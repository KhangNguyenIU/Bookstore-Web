const express=require('express');
const mongoose=require('mongoose');
const Author=require('../models/Author.js');
const Book=require('../models/Book.js');
var bodyParser = require('body-parser');

exports.addAuthor=async (req, res)=> {
    let author={};
    author.name=req.body.name;
    author.work=[];
    var temp=req.body.list;
    if(temp!=null)
    {
        author.work=[];
        for (i = 0; i < temp.length; i++) {
            await Book.find({title:temp} ).exec().then(book=>author.work.push(book[i]._id));
          }
    }
    let authorModel=new Author(author);
    await authorModel.save(function (err,data){
      if(err)
     {
         console.log(err);
         return res.status(404).json({msg:"Have error,can not add author"});
      }
      else
        return res.status(201).json({msg:"Add successly"});
    });
    
    
  };
exports.showAllAuthor=async(req,res)=>{
    await Author.find({} ).exec().then(authors=>res.json({data:authors}));
  
};
exports.showAuthorWithBook=async(req,res)=>{
    await Author.find({name:req.body.name} ).populate('work').then(data=>res.json(data));
  
};
