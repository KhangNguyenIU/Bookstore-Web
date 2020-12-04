import { Avatar } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';

import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { LinearProgress } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import StarsIcon from '@material-ui/icons/Stars';
import ErrorIcon from '@material-ui/icons/Error';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';
import BookDashboard from '../../components/dashboard/BookDashboard'
import { getAllOrder } from '../../actions/order';
import CustomerDashBoard from '../../components/dashboard/CustomerDashBoard'
import OrderProfitStat from '../../components/dashboard/OrderProfitStat';
import OrderTotalStat from '../../components/dashboard/OrderTotalStat';


const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
}));

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 5,
        width: 300
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#f05454',
    },
}))(LinearProgress);


const Admin = (props) => {
    const classes = useStyles()
    const [phase, setPhase] = useState(0);
    const [orders, setOrders] = useState([])
    const [values, setValues] = useState({
        success: '',
        error: ''
    })

    const [orderData, setOrderData] = useState([])
    // const { bestsellerModal, emptyModal, nearEmptyModal } = openModal
    var unconfirmedOrder = orders.filter(order => order.confirmed == false)
    var undeliveriedOrder = orders.filter(order => order.delivered == false)

    useEffect(() => {
        getOrderStat()
    }, [])


    const getOrderStat = () => {
        getAllOrder().then(response => {
            if (response.error) {
                setValues({
                    ...values,
                    error: response.error
                })
            } else
                setOrders(response.data)
        })
    }



    const leftSide = () => {
        return (
            <React.Fragment>
                <div style={{ height: '100vh', width: '3rem', backgroundColor: '#222831' }}>
                    <div>
                        <TwitterIcon color="secondary" style={{ margin: '20px 10px' }} />
                        <YouTubeIcon color="secondary" style={{ margin: '0px 10px' }} />
                        <InstagramIcon color="secondary" style={{ margin: '20px 10px' }} />
                    </div>
                </div>
                <div className="left-side-dashboard" >
                    <Avatar
                        style={{ width: '7rem', height: '7rem', margin: '5rem  auto 0rem' }}
                        src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/08/logo.png" />

                    <div className="text-center">
                        <p style={{ marginTop: '30px', marginBottom: '0px' }}>
                            Welcome Back!
          </p>
                        <h2 className="mt-1">
                            Admin
          </h2>
                    </div>

                    {navigation()}


                    <div style={{ marginTop: '200px', marginLeft: '20px' }}>
                        <Link
                            style={{ color: 'black', textDecoration: 'none' }}
                            to="/">
                            <ArrowBackIosIcon style={{ marginRight: '15px' }} />
                    Back
                  </Link >
                    </div>
                </div>
            </React.Fragment>
        )
    }

    const navigation = () => (
        <React.Fragment>
            <div className="navigation">
                <ul>
                    <li>
                        <a onClick={() => { setPhase(0) }}>
                            <SettingsEthernetIcon style={{ marginRight: '15px' }} /> Dashboard
                                {phase == 0 && (<ArrowBackIosIcon fontSize="small" style={{ float: "right", marginTop: '10px' }} />)}</a>
                    </li>

                    <li>

                        <a onClick={() => { setPhase(1) }}>
                            <PermIdentityIcon style={{ marginRight: '15px' }} />
                    Customer
                    {phase == 1 && (<ArrowBackIosIcon fontSize="small" style={{ float: "right", marginTop: '10px' }} />)}
                        </a>


                    </li>

                    <li>

                        <a onClick={() => { setPhase(2) }}>
                            <BookmarkBorderIcon style={{ marginRight: '15px' }} />
                    Books    {phase == 2 && (<ArrowBackIosIcon
                    fontSize="small"
                                style={{ float: "right", marginTop: '10px' }} />)}
                        </a>
                    </li>
                </ul>
            </div>

        </React.Fragment>
    )
    const firstRow = () => (
        <div className="first-row">
            <div className="d-flex w-100 mb-5">
                <div style={{ width: '40%', padding: '40px 70px' }}>
                    <p className="header-admin">Order Statistic</p>
                    <OrderTotalStat
                            total={orders.length}
                            unconfirm={unconfirmedOrder.length > 0 ? unconfirmedOrder.length : 0}
                            undelivery={undeliveriedOrder.length > 0 ? undeliveriedOrder.length : 0}
                        />
                  

                </div>


                <div style={{ width: '50%', padding: '0px 20px' }}>
                <OrderProfitStat data={orders} />
                    {/* <BorderLinearProgress variant="determinate" value={50} /> */}
                </div>

            </div>
        </div>

    )

    const secondRow = () => (
        <div className="second-row">
            <div className="d-flex w-100">
                <div style={{ width: '35%', padding: '40px 50px' }}>
                    <div className="d-flex  justify-content-between">
                        <p className="heading-admin">Total profit</p>
                        <p className="text-admin" style={{ margin: '27px 0' }}> from November 2020</p>
                    </div>

                    <div className="profit-card">
                        <p className="profit-card-header">$89.8</p>
                        <p className="profit-card-content">$39.0 income</p>
                        <p className="profit-card-content">$50.8 expense</p>
                    </div>
                </div>

                <div style={{ width: '65%', padding: '40px 70px' }}>
                    <div className="d-flex justify-content-between">
                        <p className="heading-admin">Books Stat</p>
                        <EqualizerIcon style={{ margin: '20px 0', width: '30px', height: '30px' }} />
                    </div>

                    <div className="d-flex w-100 h-100 justify-content-between">
                        <div className="book-card" style={{ backgroundColor: '#e5cfe5' }}>
                            <StarsIcon style={{ width: '50px', height: '50px' }} />
                            <p className="header-admin">Best-Selling</p>
                            <p>Japan is me</p>
                        </div>
                        <div className="book-card" style={{ backgroundColor: '#e0ece4' }}>
                            <ErrorIcon style={{ width: '50px', height: '50px' }} />
                            <p className="header-admin">Nearly Out-of-stock</p>
                            <p>Road to Amsterdam</p>
                        </div>
                        <div className="book-card" style={{ backgroundColor: '#c3edea' }}>
                            <DeleteOutlineIcon style={{ width: '50px', height: '50px' }} />
                            <p className="header-admin">Book not available</p>
                            <p>Cooking Storis</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

    const thirdRow = () => (
        <div className="third-row">
            <div className="d-flex w-100">
                <div style={{ width: '75%', padding: '40px 50px' }}>
                    <div className="d-flex  justify-content-between">
                        <p className="heading-admin">Customer stat</p>
                        {/* <p className="text-admin" style={{ margin: '27px 0' }}> from November 2020</p> */}
                    </div>

                    <div className="d-flex justify-content-between w-100 h-100">

                        <div className="user-card" style={{ backgroundColor: '#faf2f2' }}>
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <p className="m-0">User access</p>
                                <p className="text-admin m-0"> from November 2020</p>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p>Views</p>
                                </div>

                                <div>
                                    <p>1289</p>
                                </div>
                            </div>
                        </div>

                        <div className="user-card" style={{ backgroundColor: '#faf2f2' }}>
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <p className="m-0">Member accounts</p>
                                <p className="text-admin m-0"> from November 2020</p>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p>Members</p>
                                </div>

                                <div>
                                    <p>32</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div style={{ width: '25%', padding: '40px 70px' }}>

                </div>

            </div>
        </div>
    )

    const dashboard = () => (
        <React.Fragment>
            {firstRow()}
            {secondRow()}
            {thirdRow()}
        </React.Fragment>
    )
    const customer = () => (
        <React.Fragment>
           <CustomerDashBoard/>
        </React.Fragment>
    )
    const books = () => (
        <React.Fragment>
            <BookDashboard/>
        </React.Fragment>
    )
    const rightSide = () => {
        return (
            <React.Fragment>
                <div className="right-side-dashboard">
                    {phase == 0 && dashboard()}
                    {phase == 1 && customer()}
                    {phase == 2 && books()}
                </div>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <div className="dashboard">
                {leftSide()}
                {rightSide()}
            </div>


        </React.Fragment >

    )

}

export default Admin