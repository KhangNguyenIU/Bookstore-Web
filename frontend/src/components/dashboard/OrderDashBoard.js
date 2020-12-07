import React, { useContext, useEffect, useState } from 'react'
import { showAllOrderForAdmin,adminCheckOrderUser } from '../../actions/order'
import { CartContext } from '../../App.js';
import {
    TableCell, TableContainer, Table, TableHead, TableRow,
    useScrollTrigger, TableBody, IconButton, TextField, Fab,Tooltip
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination';
import { Button, List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
/**
* @author
* @function 
BookDashboard

**/
const options = [
   "Total Low",
   "Total High",
   "Distance Low",
   "Distance High",
   "Old",
   "New"
]

const sortingType = [
   "total",
   "total",
   "distance",
   "distance",
   "createdAt",
   "createdAt"
]

const sortingDir = [
    "1",
    "-1"
]

const useStyles = makeStyles({
    table: {
        minWidth: 400,
        maxHeight: 100,
        fontFamily: "Cormorant Garamond"
    },
    container: {
        maxHeight: 400,

    }
});

const OrderDashBoard = (props) => {
    // const history = useHistory()
    // const params = new URLSearchParams(props.location.search);
    //  const tempPage = params.get('page') || 1
    //  const limit = params.get('limit') || 9
    const history = useHistory()
    const classes = useStyles()
    const limit = 10
    const [infor, setInfor] = useState("");
    const [orders, setOrders] = useState([]);
    const [page, setPage] = React.useState(1);
    const [totalOrder, setTotalOrder] = useState(0)
    const [flag, setFlag] = useState(false)

  //  const [priceFilter, setPriceFilter] = React.useState([0, 100]);
  //  const [genres, setGenres] = useState([])
   // const [bestSoldBook, setBestSoldBook] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    useEffect(() => {
        initShowOrder()
    }, [page, selectedIndex])


    const initShowOrder = () => {
        let sortType = sortingType[selectedIndex]
        let sortDir = sortingDir[selectedIndex % 2]
        showAllOrderForAdmin(limit, page, sortType, sortDir).then(response => {
            if (response.error) {
                console.log(response.error);
            } else {
                setOrders(response.data)
                setTotalOrder(response.ordersNumber)
            }
        })
    }
    const adminCheck = (id) => {
       adminCheckOrderUser(id).then(response => {
            if (response.error) {
                console.log(response.error);
            } else {
                initShowOrder();
            }
        })
    }

    const handleChangePage = (event, value) => {
        setPage(parseInt(value));
    };


    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const pagination = () => (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <Pagination
                count={Math.floor(totalOrder / 10) + 1}
                size="large"
                page={page}
                onChange={handleChangePage} />
        </div>

    )

    const sorting = () => (
        <React.Fragment>
            <div className="d-flex ">
                <div>
                    <p className="custom-heading mt-2">Sort by</p>
                </div>

                <div style={{ width: "100px" }}>
                    <List component="nav" aria-label="Device settings">
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="lock-menu"
                            aria-label="when device is locked"
                            onClick={handleClickListItem}
                        >
                            <ListItemText secondary={options[selectedIndex]} />
                        </ListItem>
                    </List>

                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {options.map((option, index) => (
                            <MenuItem
                                key={option}
                                //disabled={index === 0}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>


            </div>
            <div className="d-flex justify-content-between mb-1">
                <div className="m-0 ">
                    <p style={{ fontSize: '1rem' ,margin:"0px"}}>
                        Display {(page - 1) * 10 + 1} - {page * 10} results of {totalOrder}
                    </p>
                </div>
            </div>


        </React.Fragment >
    )

    const customerGrid = () => (
        <React.Fragment>
            <TableContainer className={classes.container}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell >Order_id</TableCell>
                            <TableCell >Owner</TableCell>
                            <TableCell algin="center">Amount</TableCell>
                            <TableCell algin="center">Shipping Fee</TableCell>
                            <TableCell algin="center">Distance</TableCell>
                            <TableCell algin="center">Total</TableCell>
                            <TableCell algin="center">Final Price</TableCell>
                            <TableCell algin="right">Confirm Delivery</TableCell>
    
    


                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orders.map((row, i) => (
                            <TableRow key={row, i}>
                                <TableCell component="th" scope="row">
                                    <Link style={{ maxWidth: '50px' }} to={`/orderDetail/${row._id}`}>{row._id}</Link>
                                </TableCell>
                                <TableCell align="center">{row.owner.username}</TableCell>
                                <TableCell align="center">{row.items.length} </TableCell>
                                <TableCell align="center">{row.shipprice} </TableCell>
                                <TableCell align="center">{row.distance} </TableCell>
                                <TableCell align="center">{row.total} </TableCell>
                                <TableCell align="center">{(row.total+row.shipprice).toFixed(2)} </TableCell>
                                <TableCell align="center">
                                    <IconButton >
                                           {
                                            row.delivered==false ?
                                             <AirportShuttleIcon style={{color:'green', size:'medium'}} onClick={()=>{adminCheck(row._id)}}/>
                                             :
                                             <CheckCircleOutlineIcon style={{color:'green'}}/>
                                           }
                                    </IconButton>
                                </TableCell>
                            </TableRow>

                        ))}


                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
    return (
        <div className="container">
            <p className="custom-heading m-3">Customer List</p>
            {sorting()}
            {customerGrid()}
            {pagination()}
        </div>
    )

}

export default OrderDashBoard
