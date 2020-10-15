import fetch from 'isomorphic-fetch'
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