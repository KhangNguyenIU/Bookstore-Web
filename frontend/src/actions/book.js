
import fetch from 'isomorphic-fetch'
import { isAuth, getCookie } from './auth'
import Cookies from 'js-cookie';
var axios = require('axios');
export const showAllBook = (limit, page, sortType, sortDir, min, max) => {
    let minPrice = min || 0
    let maxPrice = max || 1000
    const sortMethod = {
        sortType: sortType,
        sortDir: sortDir
    };
    let endPoint = `?page=${page}&limit=${limit}`
    return fetch(`/api/book/showAllBook${endPoint}`, {
        method: 'POST', headers: {
            Accept: 'Application/json',
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify({
            sortMethod: sortMethod,
            maxPrice: maxPrice,
            minPrice: minPrice
        })

    }).then(response => {
        return response.json()

    }).catch(err => {
        console.log(err);
    })
}
export const showAllBookAboutGenre = (genre_id,limit, page, sortType, sortDir, min, max) => {
    let minPrice = min || 0
    let maxPrice = max || 1000
    const sortMethod = {
        sortType: sortType,
        sortDir: sortDir
    };
    let endPoint = `?page=${page}&limit=${limit}`
    return fetch(`/api/book/showBookAboutGenre${endPoint}`, {
        method: 'POST', headers: {
            Accept: 'Application/json',
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify({
            genre_id:genre_id,
            sortMethod: sortMethod,
            maxPrice: maxPrice,
            minPrice: minPrice
        })

    }).then(response => {
        return response.json()

    }).catch(err => {
        console.log(err);
    })
}

export const getDetailBook = slug => {
    return fetch(`/api/book/getBookDetail/${slug}`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}
export const getAllGenre = () => {
    fetch('/api/genre/getGenre', {
        headers: {

        }
    }).then(res => res.json())
        .then(result => {

            let allGenre = [];
            for (var i = 0; i < result.data.length; i++) {
                allGenre = allGenre.concat({ _id: result.data[i]._id, name: result.data[i].name })
            }
            return allGenre;
        })
}


export const updateBook = (slug, formData, token) => {
    return fetch(`/api/book/updateBook/${slug}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            // "authorization": `kiet ${token}`,        
        },
        body: formData
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    })
}

export const likeBook = (slug, token) => {
    return fetch(`/api/book/likeBook/${slug}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "authorization": `kiet ${token}`,
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    })
}

export const unlikeBook = (slug, token) => {
    return fetch(`/api/book/unlikeBook/${slug}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json",
            "authorization": `kiet ${token}`,
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    })
}


export const listRelatedBook = (id, genre) => {

    return fetch('/api/book/relatedBook', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify({
            _id: id,
            genre: genre
        })
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}

export const getBestSoldBook =()=>{
    return fetch('/api/book/bestSold',{
        method:'GET',
        headers:{

        }
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}
export const getGenreByName =(name)=>{
    return fetch(`/api/genre/getGenreByName/${name}`,{
        method:'GET',
        headers:{

        }
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}
export const getGenre =()=> {
    return fetch(`/api/genre/getGenre`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}
export const showAllAuthor =()=> {
    return fetch(`/api/author/showAllAuthor`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}
export const deleteGenre =(name,id)=> {
    return fetch(`/api/genre/deleteGenre/${name}`, {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'Application/json',
            "authorization": `kiet ${Cookies.get("token")}`
        },
        body: JSON.stringify({
            id:id
    
        })
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}
export const deleteAuthor =(name,id)=> {
   return fetch(`/api/author/deleteAuthor/${name}`, {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'Application/json',
            "authorization": `kiet ${Cookies.get("token")}`
        },
        body: JSON.stringify({
            id:id
    
        })
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}

export const addNewBooks =(form)=>{
    return fetch('/api/book/addBook',{
        method:'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": "kiet " + getCookie('token')
          },
          body:JSON.stringify(form)
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}
export const addGenre = (genre) => {

    return fetch('/api/genre/addGenre', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'Application/json',
            "authorization": `kiet ${Cookies.get("token")}`
        },
        body: JSON.stringify({
           name:genre
        })
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}
export const addAuthor = (author,photo,description) => {

    return fetch('/api/author/addAuthor', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'Application/json',
            "authorization": `kiet ${Cookies.get("token")}`
        },
        body: JSON.stringify({
           name:author,
           photo: photo,
           description:description
        })
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}
export const deleteBook = (slug,id) => {

    return fetch(`/api/book/deleteBook/${slug}`, {
        method: 'DELETE',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'Application/json',
            "authorization": `kiet ${Cookies.get("token")}`
        },
        body: JSON.stringify({
           id:id
        })
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}

export const getBestSoldBooks =()=>{
    return fetch('/api/book/getBookBestSeller',{
        method:'GET'
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}

export const getAuthorWorks =(slug)=>{
    return fetch(`/api/book/getBookByAuthor/${slug}`,{
        method:'GET'
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}