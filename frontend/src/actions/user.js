import fetch from 'isomorphic-fetch'
import cookie from 'js-cookie'
export const makeComment =(contain, bookSlug, token)=>{
    return fetch(`/user/makeComment/${bookSlug}`,{
        method: 'PUT',
        headers:{
            "Content-Type": "application/json",
            "authorization": `kiet ${token}`,
        },
        body: JSON.stringify({
            comment: contain
        })
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
export const adminCheckOrderUser =(id,limit,page)=>{
    let endPoint = `?page=${page}&limit=${limit}`
    return fetch(`/order/adminCheckOrderUser${endPoint}`,{
        method:'POST',
        headers:{
            "Access-Control-Allow-Origin":"*",
            "Content-Type":"application/json",
            "Authorization":"kiet "+cookie.get("token")
         },
         body: JSON.stringify({
            _id:id
        })
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
export const getUserLikedBook =(id)=> {
    return fetch('/user/getUserLikedBook', {
        method: 'POST',
        headers:{
            "Access-Control-Allow-Origin":"*",
            "Content-Type":"application/json",
            "Authorization":"kiet "+cookie.get("token")
         },
         body: JSON.stringify({
            _id:id
         })
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
export const showAllUser = (limit, page, sortType, sortDir) => {
    const sortMethod = {
        sortType: sortType,
        sortDir: sortDir
    };
    let endPoint = `?page=${page}&limit=${limit}`
    return fetch(`/user/showAllUser${endPoint}`, {
        method: 'POST', headers: {
            Accept: 'Application/json',
            'Content-Type': 'Application/json',
            "authorization": `kiet ${cookie.get("token")}`
        },
        body: JSON.stringify({
            sortMethod: sortMethod
        })

    }).then(response => {
        return response.json()

    }).catch(err => {
        console.log(err);
    })
}
export const takeUserById = (id) => {
    //let endPoint = `?page=${page}&limit=${limit}`
    return fetch('/user/takeUserById', {
        method: 'POST', headers: {
            Accept: 'Application/json',
            'Content-Type': 'Application/json',
            "authorization": `kiet ${cookie.get("token")}`
        },
        body: JSON.stringify({
           _id:id
        })

    }).then(response => {
        return response.json()

    }).catch(err => {
        console.log(err);
    })
}

