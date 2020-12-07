const express = require('express');
const mongoose = require('mongoose');
const Author = require('../models/Author.js');
const Book = require('../models/Book.js');
var bodyParser = require('body-parser');
const slugify = require('slugify')

exports.addAuthor = async (req, res) => {
    let author = {};
    author.name = req.body.name;
    author.slug = slugify(req.body.name).toLowerCase();
    author.work = [];
    var temp = req.body.list;
    if (temp != null) {
        author.work = [];
        for (i = 0; i < temp.length; i++) {
            author.work = author.work.concat(req.body.list[i]);
        }
    }
    let authorModel = new Author(author);
    await authorModel.save(function (err, data) {
        if (err) {
            console.log(err);
            return res.status(404).json({
                error: "Have error,can not add author"
            });
        }
        else
            return res.status(201).json({
                msg: "Add successly"
            });
    });


};
exports.deleteAuthor=async (req,res)=>{
    let name=req.params.name;
    Author.deleteOne({name:name})
    .exec((err,author)=>{
      if(err||!author)
      {
        return res.status(401).json({error:err})
      }
      else
      {
      Book.updateMany({writtenby: { $in: req.body.id }}, {
        $pull: { writtenby: req.body.id }
    }, { new: true }).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
       res.json({result});
    })
      }
  })
  };
exports.showAllAuthor = async (req, res) => {
    await Author.find({}).exec().then(authors => res.json({ data: authors }));

};
exports.showAuthorWithBook = async (req, res) => {
    await Author.find({ name: req.body.name }).populate('work').then(data => res.json(data));

};
