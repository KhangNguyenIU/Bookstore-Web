import React, { useContext, useEffect, useState } from 'react'
import { showAllUser } from '../../actions/user'
import { CartContext } from '../../App.js';
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
/**
* @author
* @function 
BookDashboard

**/
const options = [
    "A - Z",
    "Z - A",
    "new"
]

const sortingType = [
    "email",
    "username"
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

const CustomerDashBoard = (props) => {
    // const history = useHistory()
    // const params = new URLSearchParams(props.location.search);
    //  const tempPage = params.get('page') || 1
    //  const limit = params.get('limit') || 9
    const history = useHistory()
    const classes = useStyles()
    const limit = 10
    const [infor, setInfor] = useState("");
    const [users, setUsers] = useState([]);
    const [page, setPage] = React.useState(1);
    const [totalUser, setTotalUser] = useState(0)
    const [flag, setFlag] = useState(false)

  //  const [priceFilter, setPriceFilter] = React.useState([0, 100]);
  //  const [genres, setGenres] = useState([])
   // const [bestSoldBook, setBestSoldBook] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    useEffect(() => {
        initShowUser()
    }, [page, selectedIndex])


    const initShowUser = () => {
        let sortType = sortingType[selectedIndex]
        let sortDir = sortingDir[selectedIndex % 2]
        showAllUser(limit, page, sortType, sortDir).then(response => {
            if (response.error) {
                console.log(response.error);
            } else {
                setUsers(response.data)
                setTotalUser(response.usersNumber)
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
                count={Math.floor(totalUser / 10) + 1}
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
                        Display {(page - 1) * 10 + 1} - {page * 10} results of {totalUser}
                    </p>
                </div>


                <div style={{margin:"0px"}}>
                    <Tooltip title="Add new customer" placement="left">
                    <Fab 
                    onClick={()=>{history.push('/signup')}}
                    style={{ outline: 'none' }} 
                    color="secondary">
                        <AddIcon style={{ color: 'black' }} size="large" />
                    </Fab>
                    </Tooltip>
                  
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
                            <TableCell >Customer</TableCell>
                            <TableCell align="center">Username</TableCell>
                            <TableCell algin="center">No.Orders</TableCell>
    


                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map((row, i) => (
                            <TableRow key={row, i}>
                                <TableCell component="th" scope="row">
                                    <Link to={`/user/${row._id}`}><img src={row.photo} height="60px"  alt={i} /> {row.email}</Link>
                                </TableCell>
                                <TableCell align="center">{row.username} </TableCell>
                                <TableCell align="center">{row.createAt} </TableCell>
                                <TableCell align="right">
                                    <IconButton >
                                        <ClearIcon />
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

export default CustomerDashBoard
