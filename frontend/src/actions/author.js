import fetch from 'isomorphic-fetch'

export const getAuthors =()=>{
    return fetch('/author/showAllAuthor',{
        method:'GET',
        headers:{

        }
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}