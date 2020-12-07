import React, { useContext, useEffect, useState } from 'react'
import { showAllBook,deleteBook } from '../../actions/book'
import { CartContext } from '../../App.js';
import { toast } from 'react-toastify'
import {
    TableCell, TableContainer, Table, TableHead, TableRow,
    useScrollTrigger, TableBody, IconButton, TextField, Fab,Tooltip
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination';
import { Button, List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
/**
* @author
* @function 
BookDashboard

**/
const options = [
    "A - Z",
    "Z - A",
    "Low Price",
    "High Price",
    "Old",
    "New",
    "Low seller",
    "Best Seller"
]

const sortingType = [
    "title",
    "title",
    "price",
    "price",
    "createdAt",
    "createdAt",
    "sold",
    "sold"
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

const BookDashboard = (props) => {
    // const history = useHistory()
    // const params = new URLSearchParams(props.location.search);
    //  const tempPage = params.get('page') || 1
    //  const limit = params.get('limit') || 9
    const history = useHistory()
    const classes = useStyles()
    const limit = 10
    const { statecart, dispatchcart } = useContext(CartContext);
    const [infor, setInfor] = useState("");
    const [books, setBooks] = useState([]);
    const [page, setPage] = React.useState(1);
    const [totalBook, setTotalBook] = useState(0)
    const [flag, setFlag] = useState(false)

    const [priceFilter, setPriceFilter] = React.useState([0, 100]);
    const [genres, setGenres] = useState([])
    const [bestSoldBook, setBestSoldBook] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    useEffect(() => {
        initShowBook()
    }, [page, selectedIndex])


    const initShowBook = () => {
        let sortType = sortingType[selectedIndex]
        let sortDir = sortingDir[selectedIndex % 2]
        showAllBook(limit, page, sortType, sortDir, priceFilter[0], priceFilter[1]).then(response => {
            if (response.error) {
                console.log(response.error);
            } else {
                setBooks(response.data)
                setTotalBook(response.booksNumber)
            }
        })
    }
    /*
     addGenre(String(genre).trim()).then(data => {
                console.log(data);
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    toast.info(data.msg)    
                    getGenre().then(response => {
                        if (response.error) {
                            setValues({
                                ...values,
                                error: response.error
                            })
                            console.log(response.error);
                        } else {
                            setAllGenre(response.data);
                        }
                    });
                }
            });
    */
    const alertBox = (slug,id) => {
        confirmAlert({
          title: 'Confirm to delete book',
          message: 'Are you sure to delete '+String(slug)+' ?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {deleteBook(slug,id).then(data => {
                //console.log(data);
                if(data.error==null) {
                    toast.info(data.msg)    
                    let sortType = sortingType[selectedIndex]
                    let sortDir = sortingDir[selectedIndex % 2]
                    showAllBook(limit, page, sortType, sortDir, priceFilter[0], priceFilter[1]).then(response => {
                        if (response.error) {
                            console.log(response.error);
                        } else {
                            setBooks(response.data)
                            setTotalBook(response.booksNumber)
                        }
                    })
                }
            });
           }
            },
            {
              label: 'No',
            }
          ]
        });
      };

    const handleChangePage = (event, value) => {
        setPage(value);
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
                count={Math.floor(totalBook / 10) + 1}
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
                        Display {(page - 1) * 10 + 1} - {page * 10} results of {totalBook}
                    </p>
                </div>


                <div style={{margin:"0px"}}>
                    <Tooltip title="Add a Book" placement="left">
                    <Fab 
                    onClick={()=>{history.push('/addBook')}}
                    style={{ outline: 'none' }} 
                    color="secondary" size="large">
                        <AddIcon style={{ color: 'black' }}  />
                    </Fab>
                    </Tooltip>
                    <Tooltip title="Manage Genre" placement="left">
                    <Fab 
                    onClick={()=>{history.push('/addGenre')}}
                    style={{ outline: 'none' }} 
                    color="primary" size="medium">
                        <AddIcon style={{ color: 'black' }} size="medium" />
                    </Fab>
                    </Tooltip>
                    <Tooltip title="Manage Author" placement="left">
                    <Fab 
                    onClick={()=>{history.push('/addAuthor')}}
                    style={{ outline: 'none' }} 
                    color="inherit" size="small">
                        <AddIcon style={{ color: 'black' }} size="small" />
                    </Fab>
                    </Tooltip>
                  
                </div>
            </div>


        </React.Fragment >
    )

    const bookGrid = () => (
        <React.Fragment>
            <TableContainer className={classes.container}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell >Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell algin="center">Discount</TableCell>
                            <TableCell algin="center">Final Price</TableCell>
                            <TableCell align="right">Quality</TableCell>
                            <TableCell align="right">Sold</TableCell>


                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {books.map((row, i) => (
                            <TableRow key={row, i}>
                                <TableCell component="th" scope="row">
                                    <Link to={`/book/admin/${row.slug}`}><img src={row.photo} height="50px" alt={i} /> {row.title}</Link>
                                </TableCell>
                                <TableCell align="right">{row.price} ($)</TableCell>
                                <TableCell align="center">{row.discount} </TableCell>
                                <TableCell align="center">{row.finalprice.toFixed(2)} </TableCell>
                                <TableCell align="right">

                                    {row.amount}
                                </TableCell>
                                <TableCell align="right">{row.sold}</TableCell>


                                <TableCell align="center">
                                    <IconButton >
                                        <ClearIcon onClick={()=>alertBox(row.slug,row._id)}/>
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
            <p className="custom-heading m-3">Book Stock</p>
            {sorting()}
            {bookGrid()}
            {pagination()}
        </div>
    )

}

export default BookDashboard
