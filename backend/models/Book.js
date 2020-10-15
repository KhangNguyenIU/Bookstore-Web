const mongoose=require('mongoose');
const book=mongoose.Schema(
    {
        title:{
            type:String,
            required: true,
            unique:true 
        },
        writtenBy:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Author" 
        }],
        genre:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Genre",
        }],
        year:{
            type:Number,
            default:2018, 
            min:1990 
        },
        price:{
            type:Number,
            min:0,
            default:3.0,
            sparse: true,
            require:true 
        },
        discount:{
            type:Number,
            min:0,
            max:100,
            default:0
        },
        amount:{
            type:Number,
            min:0,
            default:100 
        },
        sold:{
            type:Number,
            min:0,
            default:0 
        },
        description:{
            type:String,
            default:"No description",
        },
        comments:[{
            type:String,
            postby:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
        }],
        likes:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
    }],
        photo:{
            type:String,
            default:"no image",
            minlength: 0,
            maxlength: 170 
        },
        slug:{
            type:String,
            default:"pro"
        }
            
    }
);

book.virtual('realprice').get(function() {
    return this.price*(1-this.discount/100);
  });

module.exports=Book=mongoose.model('book',book);