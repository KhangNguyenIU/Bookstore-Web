import fetch from 'isomorphic-fetch'

export const getAuthors =()=>{
    return fetch('/api/author/showAllAuthor',{
        method:'GET',
        headers:{

        }
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}

export const getBestAuthor =()=>{
    return fetch('/api/author/bestAuthor',{
        method:'GET',
        headers:{

        }
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}