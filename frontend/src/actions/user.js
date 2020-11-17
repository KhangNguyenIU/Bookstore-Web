import fetch from 'isomorphic-fetch'
import cookie from 'js-cookie'
export const makeComment =(contain, bookSlug, token)=>{
    return fetch(`/user/makeComment/:${bookSlug}`,{
        method: 'POST',
        headers:{
            "Accept": "application/json",
            "authorization": `kiet ${token}`,
        },
        body: contain
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}
export const userCheckOrder =(limit,page)=>{
    let endPoint = `?page=${page}&limit=${limit}`
    return fetch(`/order/userCheckOrder${endPoint}`,{
        method:'GET',
        headers:{
            "Access-Control-Allow-Origin":"*",
            "Content-Type":"application/json",
            "Authorization":"kiet "+cookie.get("token")
         }
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}
export const getOrderDetail =_id => {
    return fetch(`/order/getOrderDetail/${_id}`, {
        method: 'GET',
        headers:{
            "Access-Control-Allow-Origin":"*",
            "Content-Type":"application/json",
            "Authorization":"kiet "+cookie.get("token")
         }
    }).then(response => {
      return response.json();
    }).catch(err => {
        console.log(err);
    })
}
export const getLikedBook =()=> {
    return fetch('/user/likedBook', {
        method: 'GET',
        headers:{
            "Access-Control-Allow-Origin":"*",
            "Content-Type":"application/json",
            "Authorization":"kiet "+cookie.get("token")
         }
    }).then(response => {
      return response.json();
    }).catch(err => {
        console.log(err);
    })
}  
export const updateUserInfor = (formData) => {
    return fetch(`/user/updateInfor`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "Authorization":"kiet "+cookie.get("token")    
        },
        body: formData
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    })
}