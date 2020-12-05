import axios from 'axios'
import fetch from 'isomorphic-fetch'
import cookie from 'js-cookie'
export  const login = (user) => {
    return fetch(`/api/user/login`,{
        method:'POST',
        headers: {
            Accept: 'Application/json',
            'Content-Type': 'Application/json'
        },
        body:JSON.stringify(user)
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}

export  const register = (user) => {
    return fetch(`/api/user/register`,{
        method:'POST',
        headers: {
            Accept: 'Application/json',
            'Content-Type': 'Application/json'
        },
        body:JSON.stringify(user)
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}

//set cookie
export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

//remove cookie
export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        })
    }
}

//get cookie
export const getCookie = (key) => {
    if (process.browser) {
        return cookie.get(key)
    }
}


//set localStorage 
export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//remove localStorage
export const removeLocalStorage = (key) => {
    if (process.browser) {
        localStorage.removeItem(key)
    }
}

//authenticate user

export const authenticate = (data, next) => {
    setCookie('token', data.token)
    setLocalStorage('user', data.user)
    next()
}

export const isAuth = (state) => {
    if (process.browser) {
        const checkedCookie = getCookie('token')
        if (checkedCookie) {
      
            if(state){
                return state;
            }else{
                return false
            }
        }
        return false;
    }

}

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();

    return fetch(`/signout`, {
        method: 'GET'
    })
        .then(response => {
            console.log('signout success');
        })
        .catch(err => console.log(err));
};

export const loginWithGoogle =(user)=>{
    return fetch('/user/google-login',{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type' :'application/json'
        },
        body:JSON.stringify(user)
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}