import React, { Component,useState } from 'react';
import M from 'materialize-css';
import { BrowserRouter as Router, Route, Link,useHistory } from 'react-router-dom';
import { getCookie } from '../actions/auth'
var cors = require('cors');
const axios = require('axios');
function Bookform() {
  const history=useHistory();
  const[title,settitle]=useState("");
  const[genre,setgenre]=useState("");
  const[price,setprice]=useState(-1);
  const[year,setyear]=useState(2020);
  const[discount,setdiscount]=useState(0);
  const[amount,setamount]=useState(100);
  const[description,setdes]=useState("");
  const[picture,setimage]=useState("");
 
      const post=()=>
      {
       const data=new FormData();
       data.append("file",picture);
       data.append("upload_preset","bookstore");
       data.append("cloud_name","dhorn9l86");
       fetch("https://api.cloudinary.com/v1_1/dhorn9l86/image/upload",{
           method:"post",
           body:data
      })
      .then(res=>res.json())
      .then(obj=>{
          console.log(obj.url);
        fetch({
            method:"post",
            mode:"no cors",
            url:"/book/addBook",
            headers:{
              "Access-Control-Allow-Origin":"*",
              "Content-Type":"application/json",
              "Authorization":"kiet "+ getCookie('token')
            },
            data:{
                title:title,
                price:price,
                discount:discount,
                genre:genre,
                year:year,
                amount:amount,
                description:description,
                photo:obj.url
            }
          })
          .then(res=>{
            if(!res.error)
             {
               M.toast({html:"Add Success",classes:"#b71c1c red darken-4"});
             }
          })
          .catch(err=>M.toast({html:"Invalid infor try again",classes:"#b71c1c red darken-4"})); 
      })
       }
  return (
    <div className="mycard">
        <div className="card auth-card">
            <h2>Login Form</h2>
            <input type="text" className="form-control"  onChange={(e)=>settitle(e.target.value)} placeholder="Enter title" />
            <input type="text" className="form-control" onChange={(e)=>setgenre(e.target.value)} placeholder="Enter genre"  />
            <input type="number" className="form-control" onChange={(e)=>setprice(e.target.value)} placeholder="Enter price"  />
            <input type="number" className="form-control" onChange={(e)=>setdiscount(e.target.value)} placeholder="Enter discount"  />
            <input type="text" className="form-control" onChange={(e)=>setdes(e.target.value)} placeholder="Enter description"  />
            <input type="number" className="form-control" onChange={(e)=>setyear(e.target.value)} placeholder="Enter year"  />
            <input type="number" className="form-control" onChange={(e)=>setamount(e.target.value)} placeholder="Enter amount"  />
            <div className="file-field input-field">
                <div className="btn waves-effect waves-light">
                    <span>Upload Image here</span>
                    <input type="file" onChange={(e)=>setimage(e.target.files[0])}/>
                </div>
            </div>
            <button className="btn waves-effect waves-light" style={{backgroundColor:'cadetblue'}} onClick={()=>post()}>
                Add new Book
            </button>
        </div>
    </div>
    
  );
    }


export default  Bookform;
