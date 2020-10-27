import Cookies from 'js-cookie';
import React from 'react';
import {CartContext} from '../App.js'
import { Alert } from 'reactstrap';
var axios=require('axios');
export const addOrder =(items,total)=>{
   if(items.length==0)
   {
       alert("Cart is empty,Please order");
   }
   else{
    axios({
        method:"post",
        mode:"no cors",
        url:"/order/addOrder",
        headers:{
          "Access-Control-Allow-Origin":"*",
          "Content-Type":"application/json",
          "Authorization":"kiet "+Cookies.get("token")
        },
        data:{
            //"items":[{"book_id":"5f86bc5a95ecc33ec40fdc8c","amount":10,"title":"Abc"},{"book_id":"5f86c57b9bbb23470cf58e24","amount":1}],
            //var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);
            items:items,
            total:parseFloat(total.toFixed(2))
        }
      })
      .then(res=>{
        if(!res.error)
         {
          // M.toast({html:"Add Order Successly,thank you for your order",classes:"#b71c1c red darken-4"});
          alert('Add order success')
         }
      })
      .catch(err=>{console.log(err)}); 
    }
   }

