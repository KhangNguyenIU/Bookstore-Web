import e from 'cors';
import fetch from 'isomorphic-fetch'
import {isAuth} from './auth'
import Cookies from 'js-cookie';
var axios=require('axios');
export const showAllBook =()=>{
    return fetch('/book/showAllBook',{
     method:'GET'   
    }).then(response=>{    
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}

export const getDetailBook =slug=>{
    return fetch(`/book/getBookDetail/${slug}`,{
        method:'GET'
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}
export const getAllGenre=()=>{
    fetch('/genre/getGenre',{
        headers:{
      
        }
    }).then(res=>res.json())
    .then(result=>{
        
        let allGenre=[];
        for (var i=0;i<result.data.length;i++)
        {
          allGenre=allGenre.concat({_id:result.data[i]._id,name:result.data[i].name})
        }
        return allGenre;
    })
}
export const updateBook=(_id,newTitle,newPrice,newGenre,newDiscount,newAmount)=>{
    if(newTitle.length==0||newPrice<=0||newGenre.length==0||newDiscount>100||newDiscount<0||newAmount<=0)
      alert('Not Valid,try again');
    else if(isAuth().role!=1)
    {
        alert("Just admin can update");
    }
    else{
     axios('/book/updateBook',{
        method:'PUT',
        headers:{
           "Access-Control-Allow-Origin":"*",
           "Content-Type":"application/json",
           "Authorization":"kiet "+Cookies.get("token")
        },
        data:{
            _id:_id,
            title:newTitle,
            price:newPrice,
            newGenre:newGenre,
            discount:newDiscount,
            amount:newAmount

        }
    }).then(response=>{
        if(!response.error)
        {
            alert('Update Success');
        }
        else
        {
            alert('error');
        }
    }).catch(err=>{
        alert(err);
    })
  }
}