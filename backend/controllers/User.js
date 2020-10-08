const express=require('express');
const mongoose=require('mongoose');
const cors=require("cors");
const User=require('../models/User.js');
const route=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
exports.showAllUser=async(req,res)=>{ 
    await User.find({} ).exec().then(user=>res.json(user));
  
   };
exports.deleteUser=async(req,res)=>{
    await User.deleteMany({username: req.body.username,role:0}).then(res.status(201).json({deleted:true}));

  };
exports.register=async (req, res)=> {
  const{email,password,username}=req.body;
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!email||!password||!username)
   return res.status(422).json({msg:"Please enter all field"});
  if(re.test(String(email).toLowerCase())==false)
   return res.status(422).json({msg:"Invalid email"});
    let user={};
    user.email=email;
    user.password=bcrypt.hashSync(password, 10);
    user.username=username;
    //.catch(err=>console.log(err));
    let userModel=new User(user);
    await userModel.save(function (err,data){
      if(err)
        return res.status(422).json({msg:"Have error,try again"});
      else
        return res.status(201).json({msg:"Register successly"});
    });
    
    
  };
  exports.login= async (req, res)=> {
    let user={};
    user.email=req.body.email;
    let hash = bcrypt.hashSync(req.body.password, 10);
    let userModel=new User(user);
   const result=await User.findOne({
     email:user.email

   });
   if(result&&bcrypt.compareSync(req.body.password, result.password))
   { 
    const token=jwt.sign({_id:result._id},"kiet2606070");
    const{_id,email,username,role}=result
    res.json({token:token,user:{_id,email,username,role}});

    }
   else
    res.status(404).send({msg:"Failed"})
  
    
    
  };