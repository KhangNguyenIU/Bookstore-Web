const mongoose=require('mongoose');
const user=mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required: true 
        },
        role:{
            type:Number,
            default:0
        },
        username:{
          type:String,
          require:true,
          unique:true
        }
    }
);
module.exports=User=mongoose.model('user',user);