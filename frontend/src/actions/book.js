
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
    return fetch(`/book/showAllBook${endPoint}`, {
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
    return fetch(`/book/showBookAboutGenre${endPoint}`, {
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
    return fetch(`/book/getBookDetail/${slug}`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}
export const getAllGenre = () => {
    fetch('/genre/getGenre', {
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
    return fetch(`/book/updateBook/${slug}`, {
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
    return fetch(`/book/likeBook/${slug}`, {
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
    return fetch(`/book/unlikeBook/${slug}`, {
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

    return fetch('/book/relatedBook', {
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
    return fetch('/book/bestSold',{
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
    return fetch(`/genre/getGenreByName/${name}`,{
        method:'GET',
        headers:{

        }
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}