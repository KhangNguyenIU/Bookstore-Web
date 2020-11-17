import React, { useState, useEffect,useContext} from 'react'
import { userCheckOrder,getLikedBook } from '../../actions/user'
import Layout from '../../components/Layout'
import {BookCard} from '../../components/book/BookCard'
import BookLiked from '../../components/book/BookLiked'
import { Link,NavLink} from 'react-router-dom'
import {UserContext} from '../../App.js'
import {
  TableCell, TableContainer, Table, TableHead, TableRow,
  useScrollTrigger, TableBody, IconButton, TextField
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination';
import 'react-toastify/dist/ReactToastify.css'


/**
* @author
* @function Login
**/
const useStyles = makeStyles({
  table: {
      minWidth: 400,
      maxHeight: 100,
      fontFamily:"Cormorant Garamond"
  },
});
const User = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [order, setOrder] = useState([]);
  const [likedBook,setLikedBook]=useState([]);
  const [phase,setPhase]=useState(0);
  const [error,setError]=useState("");
  const { stateUser, dispatchUser } = useContext(UserContext);
  const initUser = () => {
    userCheckOrder(5,page).then(response => {
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
          count={Math.floor(order.length/5)+1}
          size="large"
          page={page}
          onChange={handleChangePage} />
  </div>

)
const gridBooks = () => {
  return (
      <div className="row">
          {
              likedBook.map((book, index) => (
                  <div className="col-md-4">
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
const mainUI=()=>{
  if(phase==0)
   return (
     <div>
     <div className="row content">
        <div className="col-sm-4">
          <img src={stateUser.photo} width="70%" height="70%" />
        </div>
        <div className="col-sm-5">
        <p style={{'color':'green','font':'-moz-initial'}}>Email :{stateUser.email}</p>
        <p>Role :Customer</p>
        <p style={{'color':'green'}}>Username :{stateUser.username}</p>
        <Link  to={"/userUpdate"} style={{'color':'red'}} >Reset Information</Link>

        </div>
     </div>
     </div>
   )
  else if(phase==1)
   return (
    <React.Fragment>
    <TableContainer>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell >Order Id</TableCell>
                    <TableCell align="right">Owner name</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Delivered</TableCell>
                    <TableCell align="right">Address</TableCell>

                </TableRow>
            </TableHead>

            <TableBody>
                {order.map((row, i) => (
                    <TableRow key={row, i}>
                        <TableCell component="th" scope="row">
                            <Link to={`/orderDetail/${row._id}`}>{row._id}</Link>
                        </TableCell>
                        <TableCell align="right">{row.owner.username}</TableCell>
                        <TableCell align="right">{row.total.toFixed(2)}</TableCell>
                        <TableCell align="right">{row.delivered.toString()}</TableCell>
                    </TableRow>

                ))}
                <TableRow>
                <TableCell align="left">Total :{order.length}</TableCell>
                </TableRow>

            </TableBody>
        </Table>
    </TableContainer>
    {pagination()}
</React.Fragment>
   )
  else if(phase==2)
    return (
       gridBooks()
    )

}
//onClick={()=>{addtocart(book._id,book.title,book.finalprice.toFixed(2),book.slug);setAmount(1)}}
    const userUI = () => (
        <div>
        <div className="container-fluid">
          <div className="row content">
            <div className="col-sm-1 sidenav">
            </div>
            <div className="col-sm-11">
              <h4><small>User Profile</small></h4>
              {mainUI()}
            </div>
            </div>
              <hr />
              <div className="row content">
              <div className="col-sm-3 sidenav">
              <h4>User Option</h4>
              <ul className="nav nav-pills flex-column">
                <li><a href="#" onClick={()=>{setPhase(0)}}>User Profile</a></li>
                <li><a href="#" onClick={()=>{setPhase(1)}}>Order History</a></li>
                <li><a href="#" onClick={()=>{setPhase(2)}}>Liked Book</a></li>
              </ul><br />
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search Blog.." />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <span className="glyphicon glyphicon-search" />
                  </button>
                </span>
              </div>
              </div>
              </div>
              </div>
              <br /><br/>
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
