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
        address:{
            type: String
        },
        total:{
            type:Number,
            min:0,
            require:true
        },
        distance:{
            type:Number,
            required:true
        },
        shortId:{
            type:String,
            default: shortid.generate()
        }  ,
        shipping:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'shipping',
        },
        shipprice:{
            type:Number,
            default: 0
        } ,
        finalprice:{
            type:Number,
            required:true
        } ,
        deliverday:{
            type:Date
        }    
    },
    {
        timestamps:true
    }
);

module.exports=Order=mongoose.model('order',order);