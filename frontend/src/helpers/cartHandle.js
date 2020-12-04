export const getTotalFromCart =(cart)=>{
    let temp=0;
    cart.items.map((c,i)=>{
        temp+= c.realprice
    })
    return temp
}