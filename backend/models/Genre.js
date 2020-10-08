const mongoose=require('mongoose');
const genre=mongoose.Schema(
    {
        name:{
            type:String,
            unique:true,
            require:true

        },
        slug:{
            type:String,
            default:"programming" 
        }
        
    }
);
module.exports=Genre=mongoose.model('genre',genre);