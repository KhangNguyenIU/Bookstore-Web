import React from 'react'
import Chart from "react-apexcharts";
/**
* @author
* @function RabbitChart
**/

const RabbitChart = ({data}) => {
    var rabbit = data.filter(order => order.shipping.name === "RabbitExpress")
    var turtle = data.filter(order => order.shipping.name ==="TurtleExpress")
  
    const series = [rabbit.length, turtle.length]

    const options = {
        chart: {
            height: '400px',
            width: 300,
            type: 'donut',
            dropShadow: {
                enabled: true,
                color: '#111',
                top: -1,
                left: 3,
                blur: 3,
                opacity: 0.2
            }
        },
        stroke: {
            width: 0,
        }
        ,
        animation: {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            showAlways: true,
                            show: true
                        }
                    }
                }
            }
        },
        labels: ["RabbitExpress","TurtleExpress"],
        dataLabels: {
            dropShadow: {
                blur: 3,
                opacity: 0.8
            }
        },
        fill: {
            type: 'pattern',
            opacity: 1,
            pattern: {
                enabled: true,
                style: ['verticalLines', 'squares', 'horizontalLines', 'circles', 'slantedLines'],
            },
        },
        states: {
            hover: {
                filter: 'none'
            }
        },
        theme: {
            palette: 'palette2'
        },
        
    }



    return (
        <Chart
            options={options}
            series={series}
            type="donut" width={380} />

        
    )

}

export default RabbitChart