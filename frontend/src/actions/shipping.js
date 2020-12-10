import fetch from 'isomorphic-fetch'

export const getShippingCom = () => {
    return fetch('/api/shipping/getAllShipping', {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}