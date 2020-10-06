import fetch from 'isomorphic-fetch'
export const getAllProduct =()=>{
    return fetch('/product',{
     method:'GET'   
    }).then(response=>{    
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}