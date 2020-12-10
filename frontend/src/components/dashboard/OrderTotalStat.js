import React from 'react'
import { Polar } from 'react-chartjs-2'

/**
* @author
* @function OrderTotalStat
**/

const OrderTotalStat = ({data}) => {
  return(
    <Polar
    height="207px"
    data={{
        datasets:[
            {
                data:data,
                backgroundColor:[
                    '#825959',
                    '#9ba4b4',
                    '#7579e7'
                ]
            }
        ],
        labels: [
            'Confirmed',
            'Unconfirmed',
            "Deliveried",
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