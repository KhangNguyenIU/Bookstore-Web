import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../App';
import Layout from '../components/Layout';
import { useHistory, Link } from 'react-router-dom';
import { addOrder } from '../actions/order';
import { makeStyles } from '@material-ui/core/styles'
import { setLocalStorage } from '../actions/auth';
import {
    TableCell, TableContainer, Table, TableHead, TableRow,
    useScrollTrigger, TableBody, IconButton, TextField
} from '@material-ui/core';
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
const Cartdetail = (props) => {
    const classes = useStyles()
    const history = useHistory();
    const { statecart, dispatchcart } = useContext(CartContext);
    const [flag, setFlag] = useState(false)
    useEffect(() => {
        if (statecart.items.length > 0)  {
            localStorage.setItem("cart", JSON.stringify(statecart.items));
            //statecart.total=JSON.parse(localStorage.getItem("total"));
            //statecart.total=localStorage.getItem("total");
            //alert(statecart.total);
        }

       // statecart.total=parseFloat(localStorage.getItem("total"));
        //localStorage.setItem("cart", JSON.stringify(statecart.items))
        // if(statecart.items.length ==1){
          //   localStorage.setItem("cart",[])
         //}
    }, [statecart.items.length])


    const dropItem = async(id, priceitem) => {
        await dispatchcart({ type: "DROP", payload: id, priceitem: parseFloat(priceitem.toFixed(2)) });
       // localStorage.setItem("cart",JSON.stringify(statecart.items))
        localStorage.setItem("total",JSON.stringify(statecart.total));
        localStorage.setItem("cart",JSON.stringify(statecart.items));
        console.log("DROP...", statecart.items.length);
        /*if (statecart.items.length == 1) {
            setLocalStorage("cart",null)
            localStorage.setItem("total",JSON.stringify(0))
        }*/
    }

    const emptyCart = () => (
        <div className="container text-center">

            <div>
                <img src="/img/emptyCart.svg" height="300px" alt="empty" />
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond', margin: '0px', fontSize: '3rem' }}>Your cart is empty.</h1>

        </div>
    )
    const listBooks = () => (
        <React.Fragment>
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell >Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Quality</TableCell>
                            <TableCell align="right">Total</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {statecart.items.map((row, i) => (
                            <TableRow key={row, i}>
                                <TableCell component="th" scope="row">
                                    <Link to={`/book/${row.slug}`}><img src={row.photo} height="80px" alt={i} /> {row.title}</Link>
                                </TableCell>
                                <TableCell align="right">{row.realprice}</TableCell>
                                <TableCell align="right"> <input
                                    className="custom-input-number"
                                    type="number"
                                    Value={row.amount}
                                    defaultValue={row.amount}
                                   // onChange={handleChange('discount')}
                                /></TableCell>
                                <TableCell align="right">{row.amount * row.realprice}</TableCell>

                                <TableCell align="center">
                                    <IconButton onClick={() => dropItem(row.book_id, parseFloat((row.realprice * row.amount).toFixed(2)))}>
                                        <ClearIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>

                        ))}
                        <TableRow>
                            <TableCell align="left">Total :  {statecart.total.toFixed(2)}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <span>
                <Button
                    variant="outlined"
                    style={{ marginLeft: '45rem' }}
                    onClick={() => { addOrder(statecart.items, statecart.total); dispatchcart({ type: "CANCEL", payload: null });localStorage.setItem("cart",[]) }}>
                    Confirm</Button>
            </span>
            <span>
                <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginLeft: '5rem' }}
                    onClick={() => {
                        dispatchcart({ type: "CANCEL", payload: null });
                        setLocalStorage("cart", [])
                        localStorage.setItem("total",JSON.stringify(0))
                        history.push('/books')
                    }}>Cancel</Button>
            </span>
        </React.Fragment>

    )
    
    const basket =()=>(
        <React.Fragment>
   <p className="header-text mt-4">Basket Total</p>
        <TableContainer style={{fontFamily:"Cormorant Garamond"}}>
            <Table >
                <TableRow>
                    <TableCell>Shippping</TableCell>
                    <TableCell>Shipping from U.S.A to VietNam</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>{statecart.total.toFixed(2)}</TableCell>
                </TableRow>
            </Table>
        </TableContainer>
        </React.Fragment>
     
    )


    return (
        <Layout>
            <React.Fragment>
                <h1 id='title' className="row justify-content-md-center header-text">Shopping Cart</h1>

                <div className="container">
                    {
                        statecart.items.length === 0 ? (
                            <div>  { emptyCart()}
                            </div>
                        )
                            :
                            (<div>{listBooks()}
                            {basket()}
                            </div>)
                    }

                </div>



            </React.Fragment>
        </Layout>


    )

}

export default Cartdetail