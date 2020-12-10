const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order.js');
const Book = require('../models/Book.js');
const User = require('../models/User.js');
const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken');
const Shipping = require('../models/Shipping.js');
sgMail.setApiKey(process.env.SENDGRID_API)

/*exports.showAllOrder = async (req, res) => {
    let limit = parseInt(req.query.limit) || 8
    let page = parseInt(req.query.page) || 1
    var sortObject = {};
    const { sortType, sortDir } = req.body.sortMethod
    sortObject[sortType] = sortDir;
    Order.find({})
        .exec(async (err, listOrder) => {
            if (err) {
                return res.status(401).json({
                    error: err
                })
            }

            await Order.find({})
                .limit(limit)
                .sort(sortObject)
                .skip((page - 1) * limit)
                .populate('items.book_id')
                .populate('shipping')
                .populate('owner')
                .exec((err,orders) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        })
                    }
                    res.json({ data: orders, sir: sortDir, type: sortType, ordersNumber: listOrder.length })
                    //res.json({sort, side})
                })
        })
    

};*/
exports.addOrder = async (req, res) => {
    const { _id, email, username } = req.user;
    const items = req.body.items
    const distance = req.body.distance
    const shipping = req.body.shipping
    const address = req.body.address
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
    order.distance = distance
    order.address = address
    Shipping.findOne({ slug: shipping }).exec((err, ship) => {
        if (err) {
            return res.status(401).json({
                error: "Error while match shipping unit"
            })
        }
        order.shipping = ship._id
        order.shipprice = distance * ship.pricePerDistance
        order.finalprice = distance * ship.pricePerDistance + req.body.total
        let now = new Date()
        let dayDelay = distance > 50 ? 5 : 3
        now.setDate(now.getDate() + dayDelay)
        order.deliverday = now
        let orderModel = new Order(order);
        orderModel.save(function (err, data) {
            if (err) {
                return res.status(404).json({ msg: "Have error,Can not add order" });
            }
            else {
                let orderId = data._id
                let token = jwt.sign({ _id, email, username, orderId }, process.env.JWT_SECRET, { expiresIn: '1d' })
                const emailData = {
                    to: email,
                    from: process.env.EMAIL_FROM,
                    subject: `BOOKSTORE confirm order email`,
                    html: `
              <h4>Please use the following link to confirm your order</h4>
              ${items.map((o, i) => (
                        `<p>Product :${o.title}</p> <p>${o.amount}<p> <p>${o.photo}</p>`
                    ))}
              <span>Total: ${order.finalprice} $</span>
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
    })



};

exports.confirmMailOrder = (req, res) => {
    const token = req.params.token;

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (!payload) {
            return res.status(401).json({
                error: "Invalid token"
            })
        } else {
            const { _id, email, username, orderId } = payload
            if (err || _id != req.user._id) {
                return res.status(401).json({
                    error: "Verified link is expired."
                })
            }

            Order.findByIdAndUpdate(orderId, {
                $set: { confirmed: true }
            }, { new: true }, (err, data) => {
                if (err) {
                    return res.status(401).json({
                        error: "Something wrong. Please try again"
                    })
                }
                Shipping.findByIdAndUpdate(data.shipping, {
                    $push: { order: data._id }
                }, { new: true }, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            error: err
                        })
                    }
            
                    User.findByIdAndUpdate(req.user._id, {
                        $push: { orders: orderId }
                    }, { new: true }, (err, user) => {
                        if (err) {
                            return res.status(401).json({
                                error: err
                            })
                        }
                        res.json({
                            msg: "Your order has been confirmed, Please wait to the delivery day"
                        })
                    })
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
        .sort({ "createdAt": -1 })
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
        .populate('shipping', " _id name description speed")
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
    await Order.find({})
        .populate("owner", '_id username email photo')
        .populate("items.book_id", "cost")
        .populate("items", "book_id")
        .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) {
                return res.status(401).json({
                    error: err
                })
            }
            res.json({ data })
        })

};
exports.showAllOrderConfirmed = async (req, res) => {
    await Order.find({ confirmed: true })
        .populate("owner", '_id username email photo')
        .populate("items.book_id", "cost")
        .populate("items", "book_id")
        .populate('shipping', "_id name")
        .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) {
                return res.status(401).json({
                    error: err
                })
            }
            res.json({ data })
        })

};
exports.showAllOrderNotComplete = async (req, res) => {
    await Order.find({ delivered: false }).populate("items.book_id", "title price discount").exec().then(data => res.json(data));
}
exports.adminCheckOrderUser = async (req, res) => {
    let _id = req.params._id;
    Order.updateOne({ _id: _id }, {
        delivered: true
    }, { new: true }).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({ result });
    })
}
exports.getOrderUser = async (req, res) => {
    let limit = parseInt(req.query.limit) || 5
    let page = parseInt(req.query.page) || 1
    await Order.find({ owner: req.body._id }).limit(limit).skip((page - 1) * limit)
        .sort({ "createdAt": -1 })
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

exports.getOrderProfitStat = (req, res) => {


    Order.find({})
        .populate("items.book_id", "cost")
        .populate("items", "book_id")
        .select("total items createdAt")

        .exec((err, data) => {
            if (err) {
                return res.status(401).json({
                    error: err
                })
            }
            res.json(data)

        })
}
exports.showAllOrderForAdmin = async (req, res) => {
    let limit = parseInt(req.query.limit) || 8
    let page = parseInt(req.query.page) || 1
    var sortObject = {};
    const { sortType, sortDir } = req.body.sortMethod
    sortObject[sortType] = sortDir;
    Order.find({})
        .exec(async (err, listOrder) => {
            if (err) {
                return res.status(401).json({
                    error: err
                })
            }

            await Order.find({})
                .limit(limit)
                .sort(sortObject)
                .skip((page - 1) * limit)
                .populate('items.book_id')
                .populate('owner')
                .populate('shipping')
                .exec((err, orders) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        })
                    }
                    res.json({ data: orders, sir: sortDir, type: sortType, ordersNumber: listOrder.length })
                    //res.json({sort, side})
                })
        })


};
