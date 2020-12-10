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
        },
        description:{
            type:String
        },
        photo:{
            type:String,
            default:'https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
        }
    }
);
module.exports=Author=mongoose.model('author',author);