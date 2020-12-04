import fetch from 'isomorphic-fetch'

export const getShippingCom = () => {
    return fetch('/shipping/getAllShipping', {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}