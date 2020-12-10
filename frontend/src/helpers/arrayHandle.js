import moment from 'moment'

export const orderStatHandle = (data) => {

    data = data.map((da, i) => {
        da.createdAt = moment(da.createdAt).format('MMM DD')
        return da
    })



    var Profit = []
    var Expense = []
    var DateOrder = []
    let temptProfit = 0;
    let temptExpense = 0;
    var expense
    for (let i = data.length - 1; i > 0; i--) {
  
            if (i == 1) {
                if (data[i].createdAt === data[i - 1].createdAt) {
                    temptProfit += data[i].total + data[i - 1].total;
                    expense = 0;
                    data[i].items.map(function (a, b) {
                        expense += parseFloat(a.book_id.cost)
                    });
                    data[i - 1].items.map(function (a, b) {
                        expense += parseFloat(a.book_id.cost)
                    });
                    temptExpense += parseFloat(expense)

                    Profit.push(temptProfit)
                    Expense.push(temptExpense)
                    DateOrder.push(data[i].createdAt)
                } else {
                    temptProfit += data[i].total
                    expense = 0;
                    data[i].items.map(function (a, b) {
                        expense += parseFloat(a.book_id.cost)
                    });
                    temptExpense += parseFloat(expense)

                    Profit.push(temptProfit)
                    Expense.push(temptExpense)
                    DateOrder.push(data[i].createdAt)


                    temptProfit = 0;
                    temptExpense = 0;
                    temptProfit += data[i - 1].total
                    expense = 0;
                    data[i - 1].items.map(function (a, b) {
                        expense += parseFloat(a.book_id.cost)
                    });
                    temptExpense += parseFloat(expense)

                    Profit.push(temptProfit)
                    Expense.push(temptExpense)
                    DateOrder.push(data[i - 1].createdAt)
                }
            } else {
                if (data[i].createdAt === data[i - 1].createdAt) {
                    temptProfit += data[i].total
                    expense = 0;
                    data[i].items.map(function (a, b) {
                        expense += a.book_id.cost
                    });
                    temptExpense += parseFloat(expense)
                } else {
                    temptProfit += data[i].total
                    expense = 0;
                    data[i].items.map(function (a, i) {
                        expense += a.book_id.cost

                    });
                    temptExpense += parseFloat(expense)
                    Profit.push(temptProfit)
                    Expense.push(temptExpense)
                    DateOrder.push(data[i].createdAt)
            
                }
            }  
    }
    let n = Profit.length

    if (n > 6) {
        Profit = Profit.slice(n - 7, n)
        Expense = Expense.slice(n - 7, n)
        DateOrder = DateOrder.slice(n - 7, n)
    }

    return { Profit, Expense, DateOrder }
}