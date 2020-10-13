const mongoose=require('mongoose');
const jwt=require("jsonwebtoken");
const User=require('../models/User.js');

exports.adminLogin=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
     return res.status(401).json({error:"you must be loggin "})
    }
     const token=authorization.replace("kiet ","")
     jwt.verify(token,"kiet2606070",(err,payload)=>{
         if(err)
        { 
              return res.status(401).json({error:"you must be loggin"})
        }
          const {_id}=payload;
          console.log(_id);
          User.find({_id:_id,role:1}).then(userdata=>{
              if(userdata.length==0)
               return res.status(404).json({error:"login failed"})
              else
              {
                req.user=userdata
                next()
              }
          })
    
     })
}
exports.requiredLogin=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
     return res.status(401).json({error:"you must be loggin "})
    }
     const token=authorization.replace("kiet ","")
     jwt.verify(token,"kiet2606070",(err,payload)=>{
         if(err)
        { 
              return res.status(401).json({error:"you must be loggin"})
        }
          const {_id}=payload
          User.findById(_id).then(userdata=>{
              if(userdata==null)
               return res.status(404).json({error:"login failed"})
              else
              {
                req.user=userdata
                next()
              }
          })
    
     })
}

exports.signout = (req, res) => {
  res.clearCookie('token')
  res.json({ msg: "Sign out success" })
};
