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
import Snackbar from '@material-ui/core/Snackbar';
import Alert from "@material-ui/lab/Alert";
import { List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { getTotalFromCart } from '../helpers/cartHandle';
import { getShippingCom } from '../actions/shipping';

/**
* @author
* @function Home
**/
const options = [
    "Distrist Thu Duc",
    "Distrist 9",
    "Distrist 2",
    "Distrist 1",
    "Distrist Binh Thanh",
    "Distrist 7",

]

const distanceFromDistrist = [
    "2",
    "3",
    "6",
    "8",
    "9",
    "15",
]
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
    const [total, setTotal] = useState(getTotalFromCart(statecart))
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElShip, setAnchorElShip] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedIndexShip, setSelectedIndexShip] = React.useState(0);
    const [open, setOpen] = useState(true);
    const [update,SetUpdate]=useState(false);
    const [cart, setCart] = useState(statecart)
    const [values, setValues] = useState({
        success: '',
        error: '',
        isOpenSuccess: false,
        isOpenError: false,
        loading: false
    })
    const [flag, setFlag] = useState(false)
    const [shipCom, setShipCom] = useState([])

    const { success, error, isOpenError, isOpenSuccess, loading } = values
    const shippingName = []
    const shippingPrice =[]
    shipCom.map((s, i) => {
        shippingName.push(s.slug)
        shippingPrice.push(s.pricePerDistance)
    })
    useEffect(() => {


        if (statecart.items.length > 0) {
            localStorage.setItem("cart", JSON.stringify(statecart.items));
            localStorage.setItem("total", JSON.stringify(statecart.total));
        }

        setCart(statecart)
        let tempTotal = getTotalFromCart(statecart);
        setTotal(tempTotal)
    }, [statecart.items,update])

    useEffect(() => {
        initShipping();
       
    }, [])
    const initShipping = () => {
        getShippingCom().then(response => {
            if (response.error) {
                setValues({ ...values, error: '' })
            } else {
                setShipCom(response.data)
            }
        })
    }

    const handleClose = () => {
        setOpen(false)
    };
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickListItemShip = (event) => {
        setAnchorElShip(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };
    const handleMenuItemClickShip = (event, index) => {
        setSelectedIndexShip(index);
        setAnchorElShip(null);
    };

    const handleCloseAnchor = () => {
        setAnchorEl(null);

    };
    const handleCloseAnchorShip = () => {

        setAnchorElShip(null);
    };


    const dropItem = async (id, priceitem) => {
       await dispatchcart({ type: "DROP", payload: id, priceitem: parseFloat(priceitem.toFixed(2)) })
       if(statecart.items.length<=1)
         {
             localStorage.setItem("cart",JSON.stringify([]));
             localStorage.setItem("total",JSON.stringify(0));
         }
        else
        {
         localStorage.setItem("cart", JSON.stringify(statecart.items)); 
         localStorage.setItem("total", JSON.stringify(statecart.total));
        }
        console.log("drop", statecart.items);

    }
    const handleChangeAmount = async (bookId,amount) =>{
        //const amount = e.target.value;
        await dispatchcart({
            type: 'UPDATE', payload: {
                _id: bookId,
                amount: amount
            }
        });
        console.log(statecart.total);
        await setCart(statecart)
        await setTotal( getTotalFromCart(statecart));
        localStorage.setItem("total", JSON.stringify(cart.total));
        localStorage.setItem("cart", JSON.stringify(statecart.items));
        SetUpdate(!update);
        //console.log(e.target.value)
    }
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setValues({
            ...values,
            error: '',
            success: '',
            isOpenSuccess: false,
            isOpenError: false
        })
    };
    const submitOrder = () => {
        addOrder(statecart.items, statecart.total,distanceFromDistrist[selectedIndex], shippingName[selectedIndexShip],options[selectedIndex])
        .then(response => {
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
            <p style={{ fontFamily: 'Cormorant Garamond', margin: 'auto', fontSize: '2rem' }}>Your cart is empty.</p>

        </div>
    )

    const showSuccessMessage = () => (
        (
            <Snackbar
                open={isOpenSuccess}
                autoHideDuration={2000}
                onClose={handleCloseSnack} >
                <Alert
                    elevation={6}
                    variant="filled"
                    severity="success"
                    onClose={handleClose}
                //color={snackbarType}
                >
                    {success}</Alert>
            </Snackbar>
        )


    )

    const showErrorMessage = () => (
        (
            <Snackbar
                open={error ? true : false}
                autoHideDuration={2000}
                onClose={handleCloseSnack}>
                <Alert
                    elevation={6}
                    variant="filled"
                    severity="error"
                    onClose={handleClose}
                //color={snackbarType}
                >
                    {error}</Alert>
            </Snackbar>
        )


    )
    const ship = () => (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-6">
                    <p className="header-text mt-4">Shipping Service</p>

                    <div className="d-flex align-content-center">
                        <p className="custom-text-left mt-3 w-25">Address</p>
                        <div style={{ width: "50%" }}>
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
                                onClose={handleCloseAnchor}
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
                    <hr />
                    <div className="d-flex align-content-center">
                        <p className="custom-text-left mt-3 w-25">Shipping Company</p>
                        <div style={{ width: "50%" }}>
                            <List component="nav" aria-label="Device settings">
                                <ListItem
                                    button
                                    aria-haspopup="true"
                                    aria-controls="lock-menu"
                                    aria-label="when device is locked"
                                    onClick={handleClickListItemShip}
                                >
                                    <ListItemText secondary={shippingName[selectedIndexShip]} />
                                </ListItem>
                            </List>

                            <Menu
                                id="lock-menu"
                                anchorEl={anchorElShip}
                                keepMounted
                                open={Boolean(anchorElShip)}
                                onClose={handleCloseAnchorShip}
                            >
                                {shippingName.map((ship, index) => (
                                    <MenuItem
                                        key={ship}
                                        selected={index === selectedIndexShip}
                                        onClick={(event) => handleMenuItemClickShip(event, index)}
                                    >
                                        {ship}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </div>
                    <hr/>
                    <div className="d-flex align-content-center">
                        <p className="custom-text-left mt-3 w-25">Shipping fee</p>
                        <div style={{ width: "50%" }}>
                                <p className="custom-text-left mt-3 ml-2">{distanceFromDistrist[selectedIndex]*shippingPrice[selectedIndexShip]}$</p>     
                        </div>
                    </div>


                </div>
                <div className="col-sm-6">
                    <div className='m-5'>
                        <img src="/img/bill.svg" width="50%" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

    const listBooks = () => (
        <React.Fragment>
            <div className="row">
                <div className="col-sm-12">
                    {cart &&
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
                                    {cart.items.map((row, i) => (
                                        <TableRow key={row, i} style={{ height: '3rem' }}>
                                            <TableCell component="th" scope="row">
                                                <Link to={`/book/${row.slug}`}><img src={row.photo} height="60px" alt={i} /> {row.title}</Link>
                                            </TableCell>
                                            <TableCell align="right">{row.realprice}</TableCell>
                                            <TableCell align="right"> <input
                                                onChange={e=>{handleChangeAmount(row.book_id,e.target.value)}}
                                                className="custom-input-number"
                                                style={{ width: '30px' }}
                                                type="number"
                                                max={parseInt(row.limit)}
                                                min={1}
                                                Value={row.amount}
                                                defaultValue={row.amount}
                                            // onChange={handleChange('discount')}
                                            /></TableCell>
                                            <TableCell align="right">{((row.amount * row.realprice).toFixed(2))}</TableCell>

                                            <TableCell align="center">
                                                <IconButton onClick={() => dropItem(row.book_id, parseFloat((row.realprice * row.amount).toFixed(2)))}>
                                                    <ClearIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>

                                    ))}
                                    <TableRow>
                                        <TableCell align="left">Total :  {(cart.total).toFixed(2)  }$</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </div>

                <br />


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
                                <TableCell>Shipping from U.S.A to {options[selectedIndex]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>{cart.total + distanceFromDistrist[selectedIndex]*shippingPrice[selectedIndexShip]}</TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div className="row mt-4" >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                    {showSuccessMessage()}
                    {showErrorMessage()}

                </div>

            </div>

        </React.Fragment>

    )

    const dialog = () => {
        return (
            <React.Fragment>
                <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                    <DialogTitle id="simple-dialog-title" style={{ margin: '5px auto', font: '50px' }} >One more step...</DialogTitle>
                    <MailOutlineOutlinedIcon style={{ color: 'green', width: '100px', height: '100px', margin: '10px auto' }} />
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" style={{ font: '20px 200 #555 Cormorant Garamond' }}>
                            {success}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        )
    }

    const banner = () => (
        <div className="head-banner"
            style={{
                backgroundImage: 'url("https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/ordering-title-area-img-1.jpg")',
                height: '300px',
                opacity: '1',
                position: 'relative',
                textAlign: 'center'
            }}
            className="container-fluid">

            <div className="centered" style={{ color: '#fff' }}>
                <h6>Cart</h6>
                <h2>Order Page</h2>
            </div>

        </div>
    )
    return (
        <Layout>
            <React.Fragment>
                {banner()}
                <div className="container mt-5">
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
                                            {ship()}
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