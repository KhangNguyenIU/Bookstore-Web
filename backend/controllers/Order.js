const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order.js');
const Book = require('../models/Book.js');
const User = require('../models/User.js');
const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken')
sgMail.setApiKey(process.env.SENDGRID_API)
var bodyParser = require('body-parser');
exports.addOrder = async (req, res) => {
    const { _id, email, username } = req.user;
    const items = req.body.items
   

    let order = {};
    order.items = [];
    for (i = 0; i < req.body.items.length; i++) {

        var obj = { "book_id": req.body.items[i].book_id, "amount": req.body.items[i].amount };
        Book.findByIdAndUpdate(req.body.items[i].book_id, {
            $inc: { sold: req.body.items[i].amount, amount: -req.body.items[i].amount }
        }, { new: true }).exec();
        order.items = order.items.concat(obj);
    }
    order.owner = req.user._id;
    order.total = req.body.total;
    let orderModel = new Order(order);
  

    
    await orderModel.save(function (err, data) {
        if (err) {
            return res.status(404).json({ msg: "Have error,Can not add order" });
        }
        else {
            let orderId = data._id
            let token = jwt.sign({ _id, email, username,orderId}, process.env.JWT_SECRET, { expiresIn: '1d' })
            const emailData = {
                to: email,
                from: process.env.EMAIL_FROM,
                subject: `BOOKSTORE confirm order email`,
                html: `
              <h4>Please use the following link to confirm your order</h4>
              ${items.map((o, i) => (
                    `<p>Product :${o.title}</p> <p>${o.amount}<p> <p>${o.photo}</p>` 
                ))}
              <span>Total: ${order.total} $</span>
              <p>${process.env.CLIENT_URL}/auth/order/confirm/${token}</p>
              <hr/>
              <p>This email contain sensitive information</p>
              <p>http</p>
              `
            }
            
            sgMail.send(emailData)
                .then(sent => {
                    return res.json({
                        message: `Email has been sent to ${email}, please follow the instruction`
                    })
                }).catch(err => {
                    return res.status(401).json({
                        error: "System error while making your order.Please try again."
                    })
                })
        }

    });


};

exports.confirmMailOrder = (req, res)=>{
    const token  = req.params.token;

    jwt.verify(token, process.env.JWT_SECRET, (err, payload)=>{
        if(!payload){ 
            return res.status(401).json({
                error: "Invalid token"
            })
        }else{
            const {_id,email, username, orderId } = payload
            if(err || _id!= req.user._id){
                return res.status(401).json({
                    error: "Verified link is expired."
                })
            }
           
            Order.findByIdAndUpdate(orderId,{
                $set :{confirmed: true}
            },{new:true},(err,data)=>{
                if(err){
                    return res.status(401).json({
                        error: "Something wrong. Please try again"
                    })
                }
                res.json({
                    msg:"Your order has been confirmed, Please wait to the delivery day",
                    data
                })
            })
        
        }
    })
        
       
}



exports.deleteOrder = async (req, res) => {
    Order.deleteOne({ _id: req.body._id }, function (err) {
        if (err) return res.status(402).json({ msg: "Delete not complete" });
        else return status(200).json({ msg: "delete completed" });
        // deleted at most one tank document
    });

};
exports.checkOrder = async (req, respond) => {
    Order.updateOne({ _id: req.body._id }, { delivered: true }, function (err, res) {
        // Updated at most one doc, `res.modifiedCount` contains the number
        // of docs that MongoDB updated
        if (err)
            return respond.status(402).json({ msg: "Update not complete" });
        else
            respond.status(200).json({ msg: "Update completed" });


    })
};
exports.userCheckOrder = async (req, res) => {
    let limit = parseInt(req.query.limit) || 5
    let page = parseInt(req.query.page) || 1
    await Order.find({ owner: req.user._id }).limit(limit).skip((page - 1) * limit)
    .sort({"createdAt": -1})
    .populate('items.book_id')
    .populate('owner').exec((err, order) => {
        if (err) {
            return res.status(401).json({
                error: err
            })
        }
        res.json({ data: order })
    })
};
exports.getOrderDetail = async (req, res) => {
    let _id = req.params._id;
    Order.findOne({ _id })
        .populate('items.book_id', "_id title photo finalprice slug")
        .populate('owner', "_id email username")
        .exec((err, order) => {
            if (err) {
                return res.status(401).json({
                    error: err
                })
            }
            return res.json(order)
        })
}
exports.showAllOrder = async (req, res) => {
    await Order.find({}).populate("items.book_id", "title price discount").exec().then(data => res.json(data));
};
exports.showAllOrderNotComplete = async (req, res) => {
    await Order.find({ delivered: false }).populate("items.book_id", "title price discount").exec().then(data => res.json(data));
}
exports.adminCheckOrderUser = async (req, res) => {
    let limit = parseInt(req.query.limit) || 5
    let page = parseInt(req.query.page) || 1
    await Order.find({ owner: req.body._id }).limit(limit).skip((page - 1) * limit)
    .sort({"createdAt": -1})
    .populate('items.book_id')
    .populate('owner').exec((err, order) => {
        if (err) {
            return res.status(401).json({
                error: err
            })
        }
        res.json({ data: order })
    })
}

