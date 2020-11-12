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
        },
        photo:{
            type: String,
            default: "https://png.pngtree.com/png-clipart/20190904/original/pngtree-hand-drawn-flat-wind-user-avatar-icon-png-image_4492039.jpg",
            minlength: 0,
            maxlength: 170
        },
        likes:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book'
        }],
        comments:[{
            comment: String,
            commentedBook: { type: mongoose.Schema.Types.ObjectId, ref: 'book' },
            date: {
                type: Date,
                default: Date.now()
            }
        }]
    },{
        timestamps:true
    }
);
module.exports=User=mongoose.model('user',user);