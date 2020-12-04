import fetch from 'isomorphic-fetch'

export const uploadPhoto =(data)=>{
    return fetch('https://api.cloudinary.com/v1_1/dhorn9l86/image/upload',{
        method:'POST',
        headers:{

        },
        body: data
    }).then(response=>{
        return response.json()
    }).catch(err=>{
        console.log(err);
    })
}