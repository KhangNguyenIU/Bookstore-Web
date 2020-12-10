export const userHandling = (data) => {
    data = data.filter((a => a.orders.length > 0))
    for (let j = 0; j < data.length; j++) {
        let temp = 0;
        for (let i = 0; i < data[j].orders.length; i++) {
            temp += data[j].orders[i].total
        }
        data[j].total = temp
    }
    data= data.sort((a, b) => (a.total < b.total) ? 1 : ((b.total < a.total) ? -1 : 0));
    data =data.slice(0,3)
    return data
}