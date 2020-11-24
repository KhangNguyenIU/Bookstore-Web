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
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog'
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';


/**
* @author
* @function Home
**/

const useStyles = makeStyles({
    table: {
        maxHeight: 50,
        fontFamily: "Cormorant Garamond"
    },
});
const Cartdetail = (props) => {
    const classes = useStyles()
    const history = useHistory();
    const { statecart, dispatchcart } = useContext(CartContext);
    const [open,setOpen] = useState(true);
    const [values, setValues] = useState({
        success: '',
        error: '',
        loading: false
    })
    const [flag, setFlag] = useState(false)

    const {success, error, loading} = values
    useEffect(() => {
        if (statecart.items.length > 0) {
            localStorage.setItem("cart", JSON.stringify(statecart.items));
        }

    }, [statecart.items.length])


    const handleClose = () => {
        setOpen(false)
      };
    

    const dropItem = async (id, priceitem) => {
        await dispatchcart({ type: "DROP", payload: id, priceitem: parseFloat(priceitem.toFixed(2)) });

        localStorage.setItem("total", JSON.stringify(statecart.total));
        localStorage.setItem("cart", JSON.stringify(statecart.items));
        console.log("DROP...", statecart.items.length);

    }

    const submitOrder = () => {
        addOrder(statecart.items, statecart.total).then(response => {
            if (response.error) {
                setValues({
                    ...values,
                    error: response.error
                })
            } else {
                dispatchcart({ type: "CANCEL", payload: null });
                localStorage.setItem("cart", null)
                setValues({
                    ...values,
                    success: "We have sent an verification email to your mail address. Please check your email and following the instruction"
                })
                setOpen(true)
            }
        })

    }
    const emptyCart = () => (
        <div className="container text-center m-5">

            <div>
                <img src="/img/emptyCart.svg" height="250px" alt="empty" />
            </div>
            <p style={{ fontFamily: 'Cormorant Garamond', margin: '0px', fontSize: '3rem' }}>Your cart is empty.</p>

        </div>
    )
    const listBooks = () => (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-12">
                    <TableContainer>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow style={{ height: '3rem' }}>
                                    <TableCell >Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Quality</TableCell>
                                    <TableCell align="right">Total</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {statecart.items.map((row, i) => (
                                    <TableRow key={row, i} style={{ height: '3rem' }}>
                                        <TableCell component="th" scope="row">
                                            <Link to={`/book/${row.slug}`}><img src={row.photo} height="60px" alt={i} /> {row.title}</Link>
                                        </TableCell>
                                        <TableCell align="right">{row.realprice}</TableCell>
                                        <TableCell align="right"> <input
                                            className="custom-input-number"
                                            style={{ width: '30px' }}
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
                </div>

                <br />
                <div className="row" >
                    <div className='d-flex justify-content-between'>
                        <div>
                            <Button
                                variant="outlined"
                                //style={{ marginLeft: '45rem' }}
                                onClick={submitOrder}>
                                Confirm</Button>

                        </div>

                        <div>
                            <Button
                                variant="outlined"
                                color="secondary"
                                //style={{ marginLeft: '5rem' }}
                                onClick={() => {
                                    dispatchcart({ type: "CANCEL", payload: null });
                                    setLocalStorage("cart", [])
                                    localStorage.setItem("total", JSON.stringify(0))
                                    history.push('/books')
                                }}>Cancel</Button>
                        </div>

                    </div>

                </div>

            </div>
        </React.Fragment>

    )

    const basket = () => (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-12">
                    <p className="header-text mt-4">Basket Total</p>
                    <TableContainer style={{ fontFamily: "Cormorant Garamond" }}>
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
                </div>
            </div>

        </React.Fragment>

    )

    const dialog = () => {
        return (
            <React.Fragment>
                <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                    <DialogTitle id="simple-dialog-title" style={{ margin: '5px auto', font:'50px' }} >One more step...</DialogTitle>
                    <MailOutlineOutlinedIcon style={{ color: 'green', width: '100px', height: '100px', margin: '10px auto' }} />
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" style={{font:'20px 200 #555 Cormorant Garamond'}}>
                            {success}
          </DialogContentText>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        )
    }

    return (
        <Layout>
            <React.Fragment>
                <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1 id='title' className="row justify-content-md-center header-text">Shopping Cart</h1>

                    </div>

                    <div className="container">
                        {
                            statecart.items.length === 0 ? (
                                <div>  { emptyCart()}
                                 {success && dialog()}
                                </div>
                            )
                                :
                                (
                                    <div>{listBooks()}
                                        {basket()}
                                       
                                    </div>)
                        }

                    </div>
                </div>
                </div>
               
            </React.Fragment>
        </Layout>


    )

}

export default Cartdetail