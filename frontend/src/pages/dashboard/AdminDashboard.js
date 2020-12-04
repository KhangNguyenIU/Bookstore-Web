import { Avatar } from '@material-ui/core'
import React, { useContext, useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { getAllOrder } from '../../actions/order'
import { UserContext } from '../../App.js'
import OrderTotalStat from '../../components/dashboard/OrderTotalStat.js';
import OrderProfitStat from '../../components/dashboard/OrderProfitStat';
import { ViewComfyRounded } from '@material-ui/icons';
import { showAllBook } from '../../actions/book';
import ChartProfit from '../../components/dashboard/ChartProfit';
/**
* @author
* @function admin-dashboard
**/
const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
}));

const AdminDashBoard = (props) => {
    const { stateUser, dispatchUser } = useContext(UserContext);
    const classes = useStyles()
    const [phase, setPhase] = useState(0);
    const [orders, setOrders] = useState([])
    const [values, setValues] = useState({
        success: '',
        error: ''
    })
    const [sumProfit, setSumProfit] = useState(0)
    const [books,setBooks] = useState([])
    const [orderData, setOrderData] = useState([])
    // const { bestsellerModal, emptyModal, nearEmptyModal } = openModal
    var unconfirmedOrder = orders.filter(order => order.confirmed == false)
    var undeliveriedOrder = orders.filter(order => order.delivered == false)
   
 
    useEffect(() => {
        getOrderStat()
        

    }, [])

    const getAllBook =()=>{
        showAllBook().then(response=>{
            if (response.error) {
                setValues({
                    ...values,
                    error: response.error
                })
            }else{
                setBooks(response)
            }
        })
    }
    const getOrderStat = async() => {
        await getAllOrder().then(response => {
            if (response.error) {
                setValues({
                    ...values,
                    error: response.error
                })
            } else
                setOrders(response.data)
                let temp =0 
                var allProfit = response.data.map(function (a, i) {
                    console.log(a.total);
                   temp+= a.total
                },0 )
                console.log("all",temp);
                setSumProfit(temp.toFixed(1))
        })
     
    }


    const dashNav = () => (
        <React.Fragment>
            <div className="w-100 d-flex justify-content-between"
                style={{ backgroundColor: 'white', height: '80px' }}>
                <div className="d-flex align-items-center ml-5">
                    <img src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/08/logo.png" height="50px" />
                    <p className="custom-heading mt-3 ml-2">Dashboard</p>
                </div>

                <div className="d-flex align-items-center mr-5">
                    <Avatar src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/08/logo.png" height="50px" />
                    <p className=" mt-3 ml-2 custom-text">{stateUser.username}</p>
                </div>
            </div>
        </React.Fragment>
    )
    return (
        <React.Fragment >
            <div className="admin-dashboard">
                {dashNav()}
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="admin-paper">
                                <div className='text-center'>
                                    <p className="text-number m-0 mt-2">{orders.length}</p>
                                    <p className="custom-text mt-0">Total orders</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="admin-paper">
                                <div className='text-center'>
                                    <p className="text-number m-0 mt-2">{sumProfit} $</p>
                                    <p className="custom-text mt-0">Total Profit</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="admin-paper">
                                <div className='text-center'>
                                    <p className="text-number m-0 mt-2">{books.length}</p>
                                    <p className="custom-text mt-0">Total products</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="admin-paper">
                                <div className='text-center'>
                                    <p className="text-number m-0 mt-2">53</p>
                                    <p className="custom-text mt-0">Total orders</p>
                                </div>
                            </div>
                        </div>




                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="admin-paper">
                                <p className="admin-title">Order Statistic</p>
                                <OrderTotalStat
                                    total={orders.length}
                                    unconfirm={unconfirmedOrder.length > 0 ? unconfirmedOrder.length : 0}
                                    undelivery={undeliveriedOrder.length > 0 ? undeliveriedOrder.length : 0}
                                />
                            </div>

                        </div>


                        <div className="col-md-5">
                            <div className="admin-paper">
                                <div className='d-flex'>
                                   <ChartProfit/>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="admin-paper">
                                <OrderProfitStat data={orders} />
                            </div>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )

}

export default AdminDashBoard