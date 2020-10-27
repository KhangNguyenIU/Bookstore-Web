const mongoose=require('mongoose');
const order=mongoose.Schema(
    {
        items:[{
            book_id:{type:mongoose.Schema.Types.ObjectId,ref:'book'} ,
            amount:{type:Number,min:0}
        }],
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        },
        delivered:{
            type:Boolean,
            default:false
        },
        total:{
            type:Number,
            min:0,
            require:true
        }
       
            
    },
);
module.exports=Order=mongoose.model('order',order);