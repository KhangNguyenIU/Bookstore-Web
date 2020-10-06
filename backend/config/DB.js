const express = require('express')
const mongoose = require('mongoose')

const connectMongoDB = async () => {
    await mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    }).then(()=>{
        console.log('Connect to Mongo database success.');
    })
    .catch(err=>{
        console.log(err);
    })
    
}

module.exports = connectMongoDB;