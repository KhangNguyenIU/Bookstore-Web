import moment from 'moment'

export const orderStatHandle =(data)=>{
    data = data.map((da, i) => {
        da.createdAt = moment(da.createdAt).format('MMM Do YY')
        return da
    })

    var Profit=[]
    var Expense=[]
    var DateOrder =[]
    let temptProfit = 0;
    let temptExpense = 0;
    var expense;
    for (let i = 0; i < data.length - 1; i++) {
        if (data[i].createdAt === data[i + 1].createdAt) {
            temptProfit += data[i].total;
            expense = 0;
            data[i].items.map(function (a, b) {
                expense+=a.book_id.cost
                //console.log(a.book_id.cost)
            });
            temptExpense += parseFloat(expense)
        } else {
            temptProfit += data[i].total;
            expense = 0;
            data[i].items.map(function (a, i) {
                expense+=a.book_id.cost
                //console.log(a.book_id.cost)
            });
            temptExpense += parseFloat(expense)
            // array.push({
            //     total: temptProfit,
            //     expense: temptExpense.toFixed(1),
            //     date: data[i].createdAt
            // })
            Profit.push(temptProfit)
            Expense.push(temptExpense)
            DateOrder.push(data[i].createdAt)

            temptProfit = 0;
            temptExpense = 0;

        }

    }
    return {Profit, Expense, DateOrder}
}