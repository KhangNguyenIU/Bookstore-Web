const Shipping = require("../models/Shipping")
const slugify = require('slugify')
exports.addShipping =(req, res)=>{
    const {name,pricePerDistance, description,speed} = req.body
    let slug = slugify(name)
    let shipping = new Shipping({
        name,pricePerDistance,speed,description,slug
    })

    shipping.save((err, data)=>{
        if(err){
            return res.status(401).json({
                error:err
            })
        }
        res.json(data)
    })
}

exports.getAllShipping =(req, res)=>{
    Shipping.find({}).exec((err, data)=>{
        if(err){
            return res.status(401).json({
                error:err
            })
        }
        res.json({data: data})
    })
}