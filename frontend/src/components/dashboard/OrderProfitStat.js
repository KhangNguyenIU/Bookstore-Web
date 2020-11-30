import React from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import { orderStatHandle } from '../../helpers/arrayHandle'
/**
* @author
* @function OrderStat
**/

const OrderProfitStat = ({ data }) => {

    const { Profit, Expense, DateOrder } = orderStatHandle(data)

    console.log(Profit);

    return (
        <Line
            data={{
                labels: DateOrder,
                datasets: [
                    {
                        data: Profit,
                        label: "Profit",
                        borderColor: "#3e95cd",
                        fill: false
                    },
                    {
                        data: Expense,
                        label: "Expense",
                        borderColor: "#8e5ea2",
                        fill: false
                    }

                ]
            }}
            options={{
              
                title: {
                    display: true,
                    text: "Income and profit in last 7 days"
                },
                legend: {
                    display: true,
                    position: "bottom"
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                        ticks: {
                            autoSkip: true,
                            maxRotation: 45,
                            minRotation: 0
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                        ticks: {
                            autoSkip: true,
                         
                        }
                    }]
                }
            }}
        />

    )

}

export default OrderProfitStat