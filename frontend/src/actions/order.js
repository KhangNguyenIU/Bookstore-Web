import Cookies from 'js-cookie';



export const addOrder = (items, total,distance, shipping,address) => {
  var distance = distance || 20
  var shipping =shipping || "TurtleExpress"
  if (items.length == 0) {
    return "Cart is empty,Please order";
  }
  else {
    return fetch("/api/order/addOrder", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Authorization": "kiet " + Cookies.get("token")
      },
      body: JSON.stringify({
        items: items,
        distance: distance,
        shipping: shipping,
        address:address,
        total: parseFloat(total.toFixed(2))
      })
    })
      .then(res => {
        return res.json()
      })
      .catch(err => { console.log(err) });
  }
}


export const confirmOrder =(orderToken)=>{
  return fetch(`/api/order/verified/${orderToken}`,{
    method: 'PUT',
    headers:{
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Authorization": "kiet " + Cookies.get("token")
    }
  }).then(response=>{
    return response.json()
  }).catch(err=>{
    console.log(err);
  })
}

export const getAllOrder =()=>{
  return fetch('/api/order/getAllOrder',{
    method: 'GET',
    headers:{
      "Authorization": "kiet " + Cookies.get("token")
    }
  }).then(response=>{
    return response.json()
  }).catch(err=>{
    console.log(err);
  })
}
export const getAllOrderConfirmed =()=>{
  return fetch('/api/order/getAllOrderConfirmed',{
    method: 'GET',
    headers:{
      "Authorization": "kiet " + Cookies.get("token")
    }
  }).then(response=>{
    return response.json()
  }).catch(err=>{
    console.log(err);
  })
}
export const adminCheckOrderUser =(id)=>{
  return fetch(`/api/order/adminCheckOrderUser/${id}`,{
    method: 'GET',
    headers:{
      "Authorization": "kiet " + Cookies.get("token")
    }
  }).then(response=>{
    return response.json()
  }).catch(err=>{
    console.log(err);
  })
}
export const showAllOrderForAdmin =(limit,page,sortType,sortDir)=>{
  const sortMethod = {
    sortType: sortType,
    sortDir: sortDir
};
let endPoint = `?page=${page}&limit=${limit}`
  return fetch(`/api/order/showAllOrderForAdmin${endPoint}`,{
    method: 'POST',
    headers:{
      Accept: 'Application/json',
          'Content-Type': 'Application/json',
          "authorization": `kiet ${Cookies.get("token")}`
    },
    body: JSON.stringify({
      sortMethod: sortMethod
  })
  }).then(response=>{
    return response.json()
  }).catch(err=>{
    console.log(err);
  })
}
