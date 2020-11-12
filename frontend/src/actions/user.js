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