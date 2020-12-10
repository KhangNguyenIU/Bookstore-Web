import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';

import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core'
import React, { useContext, useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getAllOrder, getAllOrderConfirmed } from '../../actions/order'
import { UserContext } from '../../App.js'
import clsx from 'clsx';
import OrderTotalStat from '../../components/dashboard/OrderTotalStat.js';
import OrderProfitStat from '../../components/dashboard/OrderProfitStat';
import { getBestSoldBook, getBestSoldBooks, showAllBook } from '../../actions/book';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CustomerDashBoard from '../../components/dashboard/CustomerDashBoard';
import BookDashboard from '../../components/dashboard/BookDashboard';
import OrderDashBoard from '../../components/dashboard/OrderDashBoard';
import RabbitChart from '../../components/dashboard/RabbitChart'
import { getMostBuy } from '../../actions/user';
import BestUser from '../../components/dashboard/BestUser';
import { isAuth } from '../../actions/auth';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    }

}));

const AdminDashBoard = (props) => {
    const { stateUser, dispatchUser } = useContext(UserContext);

    const [phase, setPhase] = useState(0);
    const [orders, setOrders] = useState([])
    const [values, setValues] = useState({
        success: '',
        error: ''
    })
    const [sumProfit, setSumProfit] = useState(0)
    const [books, setBooks] = useState([])
    const [confirmedOrders, setConfirmedOrders] = useState([])

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [bestUser, setBestUser] = useState([])
    const [bestSoldBook, setBestSoldBook] = useState([])
    const [nearEmptyBook, setNearEmptyBook] = useState([])
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    var unconfirmedOrder = orders.filter(order => order.confirmed == false)
    var confirmedOrder = orders.filter(order => order.confirmed == true)
    var undeliveriedOrder = orders.filter(order => order.delivered == false)
    var deliveriedOrder = orders.filter(order => order.delivered == true)


    useEffect(() => {
       if(isAuth(stateUser).role !==1){
            props.history.push('/')
       }else{
        getOrderStat()
        getConfirmedOrders()
        getAllBook()
        getBestUser()
        getBestSellBook()
       }
    }, [])

    const getAllBook = () => {
        showAllBook().then(response => {
            if (response.error) {
                setValues({
                    ...values,
                    error: response.error
                })
            } else {
                setBooks(response.data)
            }
        })
    }

    const getBestSellBook = () => {
        getBestSoldBooks().then(response => {
            if (response.error) {
                setValues({
                    ...values,
                    error: response.error
                })
            } else {
                setBestSoldBook(response.bestSold)
                setNearEmptyBook(response.nearEmpty)
            }
        })
    }
    const getOrderStat = async () => {
        await getAllOrder().then(response => {
            if (response.error) {
                setValues({
                    ...values,
                    error: response.error
                })
            } else
                setOrders(response.data)
            let temp = 0
            var allProfit = response.data.map(function (a, i) {

                temp += a.total
            }, 0)
            setSumProfit(temp.toFixed(1))
        })

    }

    const getConfirmedOrders = () => {
        getAllOrderConfirmed().then(response => {
            if (response.error) {
                setValues({
                    ...values,
                    error: response.error
                })
            } else
                setConfirmedOrders(response.data)

        })
    }
    const getBestUser = () => {
        getMostBuy().then(response => {
            if (response.error) {
                setValues({
                    ...values,
                    error: response.error
                })
            } else {
                setBestUser(response.data)
            }
        })
    }

    const navigation = () => (
        <React.Fragment>
            <div className="navigation">
                <ul>
                    <li>
                        <a onClick={() => { setPhase(0); setOpen(false) }}>
                            <SettingsEthernetIcon style={{ marginRight: '15px' }} /> Dashboard
                                {phase == 0 && (<ArrowBackIosIcon fontSize="small" style={{ float: "right", marginTop: '10px' }} />)}</a>
                    </li>

                    <li>

                        <a onClick={() => { setPhase(1); setOpen(false) }}>
                            <PermIdentityIcon style={{ marginRight: '15px' }} />
                    Customer
                    {phase == 1 && (<ArrowBackIosIcon fontSize="small" style={{ float: "right", marginTop: '10px' }} />)}
                        </a>


                    </li>

                    <li>

                        <a onClick={() => { setPhase(2); setOpen(false) }}>
                            <BookmarkBorderIcon style={{ marginRight: '15px' }} />
                    Books    {phase == 2 && (<ArrowBackIosIcon
                                fontSize="small"
                                style={{ float: "right", marginTop: '10px' }} />)}
                        </a>
                    </li>
                    <li>
                        <a onClick={() => { setPhase(3); setOpen(false) }}>
                            <ReceiptIcon style={{ marginRight: '15px' }} />
                    Orders    {phase == 3 && (<ArrowBackIosIcon
                                fontSize="small"
                                style={{ float: "right", marginTop: '10px' }} />)}
                        </a>
                    </li>

                </ul>
            </div>

        </React.Fragment>
    )

    const dashNav = () => (
        <React.Fragment>
            <div className="w-100 d-flex justify-content-between"
                style={{ backgroundColor: 'white', height: '80px' }}>
                <div className="d-flex align-items-center ml-5 w-25">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <div className="left-side-dashboard" >
                            <Avatar
                                style={{ width: '7rem', height: '7rem', margin: '5rem  auto 0rem' }}
                                src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/08/logo.png" />

                            <div className="text-center">
                                <p style={{ marginTop: '30px', marginBottom: '0px' }}>Welcome Back!</p>
                                <h2 className="mt-1"> Admin </h2>
                            </div>

                            {navigation()}


                            <div style={{ marginTop: '100px', marginLeft: '20px' }}>
                                <Link
                                    style={{ color: 'black', textDecoration: 'none' }}
                                    to="/">
                                    <ArrowBackIosIcon style={{ marginRight: '15px' }} />Back</Link >
                            </div>
                        </div>

                    </Drawer>
                </div>

                <div className="d-flex align-items-center mr-5" style={{ marginRight: '50px' }}>
                    <Avatar src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/08/logo.png" height="50px" />
                    <p className=" mt-3 ml-2 custom-text">{stateUser.username}</p>
                </div>

            </div>
        </React.Fragment>
    )

    const overview = () => (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="admin-paper">
                        <div className="d-flex ml-3">
                            <img width="50px"
                                src="https://assets.website-files.com/5e3acb08a305e2bb3bd6711c/5e402eba5b31cb093c4a14b3_Feature%2001.svg" />
                            <div className='text-left ml-3'>
                                <p className="text-number m-0 mt-3">{orders.length}</p>
                                <p className="custom-text mt-0">Total orders</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="admin-paper">
                        <div className="d-flex ml-3">
                            <img width="50px"
                                src="https://assets.website-files.com/5e3acb08a305e2bb3bd6711c/5e402eba1149f1b57299a6b4_Feature%2008.svg" />
                            <div className='text-left ml-3'>
                                <p className="text-number m-0 mt-3">{sumProfit} $</p>
                                <p className="custom-text mt-0">Total Profit</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="admin-paper">
                        <div className="d-flex ml-3">
                            <img width="50px"
                                src="https://assets.website-files.com/5e3acb08a305e2bb3bd6711c/5e402eba61cff653b00d3601_Feature%2003.svg" />
                            <div className='text-left ml-3'>
                                <p className="text-number m-0 mt-3">{books.length}</p>
                                <p className="custom-text mt-0">Total products</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="admin-paper">
                        <div className="d-flex ml-3">
                            <img width="50px"
                                src="https://assets.website-files.com/5e3acb08a305e2bb3bd6711c/5e402ebba8856718e19bcf95_Feature%2006.svg" />
                            <div className='text-left ml-3'>
                                <p className="text-number m-0 mt-3">{bestUser.length}</p>
                                <p className="custom-text mt-0">Members</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

    const customerPart = () => (
        <React.Fragment>
            <CustomerDashBoard />
        </React.Fragment>
    )
    const booksPart = () => (
        <React.Fragment>
            <BookDashboard />
        </React.Fragment>
    )
    const orderPage = () => (
        <React.Fragment>
            <OrderDashBoard />
        </React.Fragment>
    )
    const dashboard = () => (
        <React.Fragment>
            {overview()}
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="admin-paper">
                            <p className="admin-title m-0 mt-2">Order Statistic</p>
                            <OrderTotalStat
                                data={[confirmedOrder.length, unconfirmedOrder.length, deliveriedOrder.length, undeliveriedOrder.length]}
                            />
                        </div>

                    </div>


                    <div className="col-md-4">
                        <div className="admin-paper">
                            <p className="admin-title m-0 mt-1">Shipping choices</p>
                            <div className="m-4">
                              {confirmedOrders &&   <RabbitChart data={confirmedOrders} />}
                            </div>

                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="admin-paper">
                            <p className="admin-title m-0 mt-1">Shipping choices</p>
                            <p className="custom-text ml-0">The customer that bring most profit for us.</p>
                            <div className="m-4">
                                <BestUser data={bestUser} />
                            </div>

                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="admin-paper">
                            <OrderProfitStat data={confirmedOrders} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='admin-paper'>
                            <p className="admin-title m-0 mt-1">Best Selling books</p>

                            <div className="row mt-4 ">
                                {
                                    bestSoldBook && bestSoldBook.map((book, i) => (
                                        <div className="col-sm-4 text-center admin-book-card">
                                            <img src={book.photo} width='70%' />
                                            <p className='custom-text m-0 '>{book.title}</p>
                                            <p className='custom-text m-0'>${book.finalprice.toFixed(2)}</p>
                                            <p className='custom-text m-0'> Sold: {book.sold}</p>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )

    return (
        <React.Fragment >
            <div className="admin-dashboard">
                {dashNav()}
                {phase == 0 && dashboard()}
                {phase == 1 && customerPart()}
                {phase == 2 && booksPart()}
                {phase == 3 && orderPage()}


            </div>

        </React.Fragment >
    )

}

export default AdminDashBoard

