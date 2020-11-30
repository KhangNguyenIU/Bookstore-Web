const express=require('express');
const mongoose=require('mongoose');
const Genre=require('../models/Genre.js');
var bodyParser = require('body-parser');

exports.addGenre= async (req, res)=> {
    let genre={};
    genre.name=req.body.name;
    genre.slug=req.body.slug;
    let genreModel=new Genre(genre);
    await genreModel.save(function (err,data){
      if(err)
     {
         console.log(err);
         return res.status(404).json({msg:"Have error,can not add genre"});
      }
      else
        return res.status(201).json({msg:"Add successly"});
    });
    
    
  };
exports.getGenre=async(req,res)=>{
    await Genre.find({},"name")
    .exec().then(genres=>res.json({data:genres}));
};
exports.getGenreByName=async(req,res)=>{
  let name = req.params.name;
    Genre.findOne({ name })
        .exec((err, genre) => {
            if (err) {
                return res.status(401).json({
                    error: err
                })
            }
            res.json(genre)
        })
};

// exports.getAllGenre =(req, res)=>{
//   Genre.find({}).exec((err, genres)=>{
//       if(err){
//         return res.status(401).json({
//           error: err
//         })
//       }
//       res.json(genres)
//   })
// }
