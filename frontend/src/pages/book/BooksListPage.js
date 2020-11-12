import React, { useEffect, useState, useContext } from 'react'
import { showAllBook } from '../../actions/book'
import Layout from '../../components/Layout'
import { makeStyles } from '@material-ui/core/styles';

import { MemoryRouter, Route, useHistory } from 'react-router'
import { CartContext } from '../../App.js';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import BookCard from '../../components/book/BookCard';

/**
* @author
* @function BookListPage
**/

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));


const BookListPage = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const params = new URLSearchParams(props.location.search);
    const tempPage = params.get('page') || 1
    const limit = params.get('limit') || 8
    const { statecart, dispatchcart } = useContext(CartContext);
    const [infor, setInfor] = useState("");
    const [books, setBooks] = useState([]);
    const [page, setPage] = React.useState(tempPage);
    const [sortMethod, setSortType] = useState({
        sortType: "title",
        sortDir: "1"
    })
    useEffect(() => {
        history.push(`books?page=${page}&limit=${limit}`)
        initShowBook();
    }, [page])

    const { sortType, sortDir } = sortMethod
    //load book first time load page
    const initShowBook = () => {
        showAllBook(limit, page, sortType, sortDir).then(response => {
            if (response.error) {
                console.log(response.error);
            } else {
                setBooks(response.data)
                console.log(response.data[0]);
            }
        })
    }

    const handleChangePage = (event, value) => {
        setPage(value);
    };


    //show grid books
    const gridBooks = () => {
        return (
            <div className="row">
                {
                    books.map((book, index) => (
                        <div className="col-md-4">
                            <BookCard book={book} />
                        </div>
                    ))
                }
            </div>
        )
    }

    const sorting = () => (
        <React.Fragment>

    
        </React.Fragment >
    )
    const banner = () => (
        <div className="head-banner"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=841&q=80")',
                height: '300px',
                opacity: '1',
                position: 'relative',
                textAlign: 'center'
            }}
            className="container-fluid">

            <div className="centered" style={{ color: '#fff' }}>
                <h6>Products</h6>
                <h2>Source of Books</h2>
            </div>

        </div>
    )


    const pagination = () => (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
            <Pagination
                count={10}
                size="large"
                page={page}
                onChange={handleChangePage} />
        </div>

    )
    return (
        <React.Fragment>
            <Layout>

                {banner()}
                <div className="container mt-5">

                    <div className="row">

                        <div className="col-md-10">
                            <div style={{ display: 'flex', justifyContent: "space-between", marginBottom: '10px' }}>
                                <p style={{ float: 'left' }}>
                                    Display 1-9 results of 129
                        </p>

                                <div style={{ marginLeft: '5rem', display: 'flex', alignItems: "center", marginBottom: '5px' }}>
                                    <input type="text"
                                        className="custom-input"
                                        onChange={(e) => setInfor(e.target.value)}
                                        placeholder="Enter book infor" size={20} />
                                    <i class="material-icons" onClick={() => { }}>search</i>
                                </div>

                                <p style={{ float: 'right' }}>
                                    {sorting()}
                                </p>
                            </div>
                            {gridBooks()}
                            {pagination()}
                        </div>

                        <div className="col-md-2" >
                            <p>Categories</p>
                        </div>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    )

}

export default BookListPage