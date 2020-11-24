const mongoose=require('mongoose');
const shortid = require('shortid');
const order=mongoose.Schema(
    {
        items:[{
            book_id:{type:mongoose.Schema.Types.ObjectId,ref:'book'},
            amount:{type:Number,min:0}
        }],
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        },
        confirmed:{
            type:Boolean,
            default: false
        },
        delivered:{
            type:Boolean,
            default:false
        },
        total:{
            type:Number,
            min:0,
            require:true
        },
        shortId:{
            type:String,
            default: shortid.generate()
        }          
    },
    {
        timestamps:true
    }
);

module.exports=Order=mongoose.model('order',order);