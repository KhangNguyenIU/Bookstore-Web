const mongoose = require('mongoose');
const shipping = mongoose.Schema(
    {
        order: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order'
        }],
        name: {
            type: String,
            required: true
        },slug:{
            type:String
        },
        pricePerDistance: {
            type: Number,
            required: true
        },
        speed: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            require: true
        }
    }
);
module.exports = Shipping = mongoose.model('shipping', shipping);