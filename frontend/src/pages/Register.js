import React, { Component,useState } from 'react';
import M from 'materialize-css';
import { BrowserRouter as Router, Route, Link,useHistory } from 'react-router-dom';
var cors = require('cors');
const axios = require('axios');
function Signup() {
  const history=useHistory();
  const[email,setemail]=useState("");
  const[password,setpass]=useState("");
  const[username,setname]=useState("");
 
      const signup=()=>
      {
        axios({
          method:"post",
          mode:"no cors",
          url:"/user/register",
          headers:{
            "Access-Control-Allow-Origin":"*",
            "Content-Type":"application/json"
          },
          data:{
            email:email,
            password:password,
            username:username
          }
        })
        .then(res=>{
          if(!res.error)
           {
             M.toast({html:"Register success"});
             history.push('/signin');
            
           }
        })
        .catch(err=>M.toast({html:"Invalid try again",classes:"#b71c1c red darken-4"})); 
      }
  return (
    <div className="mycard">
        <div className="card auth-card">
            <h2>Signup Form</h2>
            <input type="text" className="form-control"  onChange={(e)=>setemail(e.target.value)} placeholder="Register email" />
            <input type="password" className="form-control" onChange={(e)=>setpass(e.target.value)} placeholder="Register password"  />
            <input type="text" className="form-control" onChange={(e)=>setname(e.target.value)} placeholder="Register username"  />
            <button className="btn waves-effect waves-light" style={{backgroundColor:'cadetblue'}} onClick={()=>signup()}>
                Sign Up
            </button>
            <Link to="/signin">Already have Account</Link>
        </div>
    </div>
    
  );
    }


export default  Signup;
