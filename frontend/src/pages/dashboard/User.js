import React, { useState, useEffect, useContext } from 'react'
import { userCheckOrder, getLikedBook } from '../../actions/user'
import Layout from '../../components/Layout'
import { BookCard } from '../../components/book/BookCard'
import BookLiked from '../../components/book/BookLiked'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { UserContext } from '../../App.js'
import {
    TableCell, TableContainer, Table, TableHead, TableRow,
    useScrollTrigger, TableBody, IconButton, TextField, Avatar
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination';
import 'react-toastify/dist/ReactToastify.css'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

/**
* @author
* @function Login
**/
const useStyles = makeStyles({
    table: {
   
        maxHeight: 100,
        fontFamily: "Cormorant Garamond"
    },
});
const User = (props) => {
    const history = useHistory()
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const [order, setOrder] = useState([]);
    const [likedBook, setLikedBook] = useState([]);
    const [phase, setPhase] = useState(1);
    const [error, setError] = useState("");
    const { stateUser, dispatchUser } = useContext(UserContext);
    const initUser = () => {
        userCheckOrder(5, page).then(response => {
            if (response.error) {
                console.log(response.error);
            } else {
                setOrder(response.data);
            }
        });
        getLikedBook().then(response => {
            if (response.error) {
                console.log(response.error);
            } else {
                setLikedBook(response.likes);
            }
        });
    };
    const handleChangePage = (event, value) => {
        setPage(value);
    };
    const pagination = () => (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
            <Pagination
                count={Math.floor(order.length / 5) + 1}
                size="large"
                page={page}
                onChange={handleChangePage} />
        </div>

    )
    const gridBooks = () => {
        return (
            <div className="row">
                    <p className="custom-heading col-sm-12">Your favourite books</p>
           
             {
                    likedBook.map((book, index) => (
                        <div className="col-md-3">
                            <BookLiked book={book} />
                        </div>
                    ))
                }
        
            </div>
        )
    }
    useEffect(() => {
        initUser();
    }, [page])

    const UserInfo = () => (
        <div >
            <div className="row content custom-background">
                <div className="col-sm-12">
                    <div className="text-center">
                        <Avatar src={stateUser.photo} style={{ width: "150px", height: "150px", margin: '20px auto' }} />
                        <p className="custom-heading m-0">{stateUser.username}</p>
                        <p className="custom-text m-0">{stateUser.email}</p>
                        <div>
                            <IconButton onClick={()=>{history.push('/userUpdate')}}>
                                <CreateOutlinedIcon/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const OrderHistory = () => (
        <React.Fragment>
           <div className="row">
               <div className="col-sm-12">
               <p className="custom-heading">Order History</p>
            {
                order.length > 0 ? (
                    <div>
                        <TableContainer>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow style={{height:'3rem'}}>
                                        <TableCell >Order Id</TableCell>
                                   
                                        <TableCell align="right">Total</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">Delivered</TableCell>
                          

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {order.map((row, i) => (
                                        <TableRow key={row, i}>
                                            <TableCell >
                                                <Link style={{maxWidth:'50px'}} to={`/orderDetail/${row._id}`}>{row.shortId}</Link>
                                            </TableCell>
                                      
                                            <TableCell align="right">{row.total.toFixed(2)}</TableCell>
                                            <TableCell align="center">{row.confirmed ? "Confirmed" : "Unconfirmed"}</TableCell>
                                            <TableCell align="center">{row.delivered.toString()}</TableCell>
                                        
                                        </TableRow>

                                    ))}
                                    <TableRow>
                                        <TableCell align="left">Total :{order.length}</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>

                        {pagination()}
                    </div>
                ) : (
                        <h1>Your order history is empty</h1>
                    )
            }
               </div>

           </div>
        </React.Fragment>
    )
    const mainUI = () => {
        if (phase == 1)
            return (
                OrderHistory()
            )
        else if (phase == 2)
            return (
                gridBooks()
            )

    }
    //onClick={()=>{addtocart(book._id,book.title,book.finalprice.toFixed(2),book.slug);setAmount(1)}}
    const userUI = () => (
        <div>
            <div className="container">
                <div className="row content">
                    {/* <div className="col-sm-1 sidenav">
                    </div> */}
                    <div className="col-sm-12">
                        {UserInfo()}

                        <div className="text-center">
                            <div style={{ display: "flex", justifyContent: 'center', marginTop: '20px' }}>
                                <button 
                                className={phase==1? "custom-button-active" :"custom-button"  }
                                onClick={() => { setPhase(1) }}>
                                    Order history</button>

                                <button className={phase==2? "custom-button-active" :"custom-button" }
                                onClick={() => { setPhase(2) }}>
                                    Liked Books</button>

                                <button className="custom-button">
                                    review </button>
                            </div>
                    
                        </div>

                       <div className="custom-background-body">
                       {mainUI()}
                       </div>
                    </div>
                </div>
                <hr />

            </div>
            <br /><br />
        </div>
    )

    return (
        <Layout>
            <React.Fragment>
                {userUI()}
            </React.Fragment>
        </Layout>
    )

}

export default User;
