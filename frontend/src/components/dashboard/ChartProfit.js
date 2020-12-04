import React from 'react'
import Chart from "react-apexcharts";
/**
* @author
* @function ChartProfit
**/

const ChartProfit = (props) => {

    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
        legend: {
            show: 'top'
        },
        stroke: {
            curve: 'smooth'
        }, dataLabels: {
            enabled: false
        },

        fill: {
            colors: ['#1A73E8', '#adce74']
        }, 
        animations:{
            enabled: true,
        }
    }

    const series = [
        {
            name: "profit",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        }, {
            name: "cost",
            data: [10, 150, 23, 26, 7, 31, 41, 50]
        }
    ]
    return (
        <div className="mixed-chart m-auto">
            <Chart
                options={options}
                series={series}
                type="area"
                width="400"
            />
        </div>
    )

}

export default ChartProfit