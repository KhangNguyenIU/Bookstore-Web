import React from 'react'
import { Polar } from 'react-chartjs-2'

/**
* @author
* @function OrderTotalStat
**/

const OrderTotalStat = ({total, unconfirm, undelivery}) => {
  return(
    <Polar
    height="80px"
    data={{
        datasets:[
            {
                data:[total, unconfirm, undelivery],
                backgroundColor:[
                    '#825959',
                    '#9ba4b4',
                    '#7579e7'
                ]
            }
        ],
        labels: [
            'Total',
            'Unconfirmed',
            'Undeliveried'
        ],
        
    }}
    options={{
        legend:{
            display:true,
            position:'right'
        }
    }}
    
    />
   )

 }

export default OrderTotalStat