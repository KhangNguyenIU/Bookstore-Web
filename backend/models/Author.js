const mongoose=require('mongoose');
const author=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        work:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'book'
            }
        ],
        slug: {
            type: String
        }
    }
);
module.exports=Author=mongoose.model('author',author);