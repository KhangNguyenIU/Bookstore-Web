const express=require('express');
const mongoose=require('mongoose');
const Order=require('../models/Order.js');
const Book=require('../models/Book.js');
const User=require('../models/User.js');
var bodyParser = require('body-parser');
exports.addOrder= async (req, res)=> {
    let order={};
    order.items=[];
    for (i = 0; i < req.body.items.length; i++) {
        await Book.find({title:req.body.items} ).exec().then(book=>order.items.push(book[i]._id));
      }
      order.owner=req.user._id;
    let orderModel=new Order(order);
    await orderModel.save(function (err,data){
      if(err)
     {
         return res.status(404).json({msg:"Have error,Can not add order"});
      }
      else
        return res.status(201).json({msg:"Add successly"});
    });
    
    
  };
exports.deleteOrder=async(req,res)=>{
    Order.deleteOne({ _id: req.body._id }, function (err) {
        if (err) return res.status(402).json({msg:"Delete not complete"});
        else return status(200).json({msg:"delete completed"});
        // deleted at most one tank document
      });
  
};
exports.checkOrder=async(req,respond)=>{
    Order.updateOne({ _id: req.body._id }, { delivered: true }, function(err, res) {
        // Updated at most one doc, `res.modifiedCount` contains the number
        // of docs that MongoDB updated
        if(err)
         return respond.status(402).json({msg:"Update not complete"});
         else
           respond.status(200).json({msg:"Update completed"});


      });
};