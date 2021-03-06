import React, { useContext, useEffect, useState} from 'react'
import { CartContext,UserContext } from '../../App';
import Layout from '../../components/Layout';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { setLocalStorage,isAuth } from '../../actions/auth';
import {
    TableCell, TableContainer, Table, TableHead, TableRow,
    useScrollTrigger, TableBody, IconButton, TextField
} from '@material-ui/core';
import {getOrderDetail} from '../../actions/user'
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
const axios = require('axios');

/**
* @author
* @function Home
**/

const useStyles = makeStyles({
    table: {
        minWidth: 400,
        maxHeight: 100,
        fontFamily:"Cormorant Garamond"
    },
});
const OrderDetail = (props) => {
    const _id = props.match.params._id;
    const classes = useStyles();
    const { stateUser, dispatchUser } = useContext(UserContext)
    const [order, setOrder] = useState('');
    const [items, setItems] = useState([]);
    const history = useHistory();
    //const { statecart, dispatchcart } = useContext(CartContext);
    const userEndPoint = isAuth(stateUser).role === 1 ? 'admin/' : '';
    const [flag, setFlag] = useState(false)
    useEffect(() => {
       initOrder();
    }, [])
    const initOrder = () => {
        getOrderDetail(_id).then(response => {
            if (response.error) {
                console.log(response.error);
            } else {
                console.log(stateUser);
                setOrder(response);
                setItems(response.items);
            }
        });


    };
    const listItems = () => (
        <React.Fragment>
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell >Product Image</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Total</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {
                    items.map((row, i) => (
                            <TableRow key={row, i}>
                                <TableCell component="th" scope="row">
                                    {
                                    row.book_id.title!=null ?
                                    <Link to={`/book/${userEndPoint}${row.book_id.slug}`}><img src={row.book_id.photo} height="80px" alt={i} /> {row.book_id.title}</Link>
                                    :
                                    <Link>Book does not in store</Link>
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    {
                                    row.book_id.finalprice!=null ?
                                    <p>{row.book_id.finalprice.toFixed(2)}</p>
                                    :
                                    <Link>Undefined</Link>
                                    }
                                </TableCell>
                                <TableCell align="right"> 
                                   <p>x{row.amount}</p>
                                </TableCell>
                                <TableCell align="right">
                                {
                                    row.book_id.finalprice!=null ?
                                    <p>{(row.book_id.finalprice*row.amount).toFixed(2)}</p>
                                    :
                                    <Link>Undefined</Link>
                                }
                                </TableCell>
                            </TableRow>

                        ))
                        }
                        <TableRow>
                            <TableCell align="left">Total :  {order.total}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="left">Date :  {order.createdAt}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <span>
               
            </span>
            <span>
               
            </span>
        </React.Fragment>

    )
    
    const basket =()=>(
        <React.Fragment>
   <p className="header-text mt-4">Basket Total</p>
        <TableContainer style={{fontFamily:"Cormorant Garamond"}}>
            <Table >
                <TableRow>
                    <TableCell>Shippping To</TableCell>
                    <TableCell>{order.address}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Shipping Fee</TableCell>
                    <TableCell>{order.shipprice}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>{parseFloat(order.finalprice).toFixed(2)}</TableCell>
                </TableRow>
            </Table>
        </TableContainer>
        </React.Fragment>
     
    )


    return (
        <Layout>
            <React.Fragment>
                <h1 id='title' className="row justify-content-md-center header-text">Order Detail</h1>

                <div className="container">
                    {
                             (<div>{listItems()}
                             {basket()}
                             </div>)
                    }

                </div>



            </React.Fragment>
        </Layout>


    )

}

export default OrderDetail