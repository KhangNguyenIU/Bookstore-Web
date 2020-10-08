import React, { Component,useState } from 'react';
import M from 'materialize-css';
import { BrowserRouter as Router, Route, Link,useHistory } from 'react-router-dom';
var cors = require('cors');
const axios = require('axios');
function Login() {
  const history=useHistory();
  const[email,setemail]=useState("");
  const[password,setpass]=useState("");
 
      const login=()=>
      {
        axios({
          method:"post",
          mode:"no cors",
          url:"/user/login",
          headers:{
            "Access-Control-Allow-Origin":"*",
            "Content-Type":"application/json"
          },
          data:{
            email:email,
            password:password
          }
        })
        .then(res=>{
          if(!res.error)
           {
             localStorage.setItem("jwt",res.data.token);
             localStorage.setItem("user",JSON.stringify(res.data.user));
             M.toast({html:"Login success",classes:"#b71c1c red darken-4"});
             history.push('/');
            
           }
        })
        .catch(err=>M.toast({html:"Invalid try again",classes:"#b71c1c red darken-4"})); 
      }
  return (
    <div className="mycard">
        <div className="card auth-card">
            <h2>Login Form</h2>
            <input type="text" className="form-control"  onChange={(e)=>setemail(e.target.value)} placeholder="Enter email" />
            <input type="password" className="form-control" onChange={(e)=>setpass(e.target.value)} placeholder="Enter password"  />
            <button className="btn waves-effect waves-light" style={{backgroundColor:'cadetblue'}} onClick={()=>login()}>
                Login
            </button>
            <br></br>
            <Link to="/signup">Register New Account</Link>
        </div>
    </div>
    
  );
    }


export default  Login;
