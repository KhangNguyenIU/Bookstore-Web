const mongoose=require('mongoose');
const author=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        work:[{book_id:{type:mongoose.Schema.Types.ObjectId,ref:'book'}}]
    }
);
module.exports=Author=mongoose.model('author',author);