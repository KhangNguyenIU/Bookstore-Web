import React, { useEffect, useState, useContext } from 'react'
import {
    getAllGenre, showAllBook, getBestSoldBook, showAllBookAboutGenre,
    getGenreByName, getAuthorWorks
} from '../../actions/book'
import Layout from '../../components/Layout'
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion'
import { MemoryRouter, Route, useHistory } from 'react-router'
import { CartContext } from '../../App.js';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import BookCard from '../../components/book/BookCard';
import Slider from '@material-ui/core/Slider';
import { Button, IconButton, List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import BookListSkeleton from '../../components/skeleton/BookListSkeleton';
import { getAuthors } from '../../actions/author';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
/**
* @author
* @function BookListPage
**/

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }, root: {
        width: 300,
    },
}));

function valuetext(value) {
    return `${value}°C`;
}

const options = [
    "A - Z",
    "Z - A",
    "Low Price",
    "High Price",
    "Old",
    "New",
    "Best seller",
]

const sortingType = [
    "title",
    "title",
    "price",
    "price",
    "createdAt",
    "createdAt",
    "Best Seller"
]

const sortingDir = [
    "1",
    "-1"
]

const BookListPage = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const params = new URLSearchParams(props.location.search);
    const tempPage = params.get('page') || 1
    const limit = params.get('limit') || 9
    const genre = props.match.params.genre
    const bookSearch = props.match.params.bookSearch
    const { statecart, dispatchcart } = useContext(CartContext);
    const [infor, setInfor] = useState("");
    const [regex, setRegex] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [books, setBooks] = useState([]);
    const [page, setPage] = React.useState(parseInt(tempPage));
    const [totalBook, setTotalBook] = useState(0)
    const [flag, setFlag] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [priceFilter, setPriceFilter] = React.useState([0, 1000]);
    const [genres, setGenres] = useState([])
    const [authors, setAuthors] = useState([])
    const [bestSoldBook, setBestSoldBook] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [author, setAuthor] = useState('')
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [searchFlag, setSearchFlag] = useState(false)
    const [openGnere, setOpenGenre] = useState(false)
    const [openAuthor, setOpenAuthor] = useState(false)
    useEffect(() => {
        if (statecart.items.length > 0) {
            localStorage.setItem("cart", JSON.stringify(statecart.items));
        }
        if (bookSearch != null) {
            history.push(`/books/search/${bookSearch}`)
        }
        else if (genre == null || genre.length == 0) {
            history.push(`/books/?page=${page}&limit=${limit}`)
        }
        else {
            history.push(`/books/${genre}?page=${page}&limit=${limit}`)
        }
        initShowBook();
        initGenre();
        initBestSoldBook()
        getAllAuthors()

    }, [page, flag, selectedIndex, genre, bookSearch])



    const initShowBook = () => {
        let sortType = sortingType[selectedIndex]
        let sortDir = sortingDir[selectedIndex % 2]
        if (bookSearch != null && bookSearch.length > 0) {

            var arr = [];
            arr = arr.concat(JSON.parse(localStorage.getItem("searchBook")));
            setBooks(arr);
            setTotalBook(1);
        }
        else if (genre == null || genre.length == 0) {
            showAllBook(limit, page, sortType, sortDir, priceFilter[0], priceFilter[1]).then(response => {
                if (response.error) {
                    console.log(response.error);
                } else {
                    setBooks(response.data)
                    setTotalBook(response.booksNumber)
                    setLoading(false)
                }
            })
        }
        else {
            getGenreByName(String(genre)).then(response => {
                if (response.error) {
                    console.log(response.error);
                } else {
                    showAllBookAboutGenre(String(response._id), limit, page, sortType, sortDir, priceFilter[0], priceFilter[1]).then(response => {
                        if (response.error) {
                            console.log(response.error);
                        } else {
                            setBooks(response.data)
                            setTotalBook(response.booksNumber)
                            setLoading(false)
                        }
                    })
                }
            })
        }
    }

    const getAllAuthors = () => {
        getAuthors().then(response => {
            if (response.error) {
                setError(response.error)
            } else {
                setAuthors(response.data)
            }
        })
    }
    const getAllAuthorBooks = (slug) => {
        return getAuthorWorks(slug).then(response => {
            if (response.error) {
                setError(response.error)
            } else {
                setBooks(response.data.work)
                setTotalBook(response.data.work.length)
                setAuthor(response.data.name)
            }
        })
    }
    const getSearchBook = (regex) => {
        setRegex(regex);
        const temp = 'kietititiu18070';
        if (String(regex).trim().length > 0) {
            return fetch(`/api/book/getSearchBook/${regex}`, {
                method: 'GET'
            }).then(response => {
                return response.json();
            })
                .then(data => {
                    if (data) {
                        setSearchData(data.data); setTotalBook(1)

                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else if (regex == null || regex.length == 0) {
            return fetch(`/api/book/getSearchBook/${temp}`, {
                method: 'GET'
            }).then(response => {
                return response.json();
            })
                .then(data => setSearchData(data.data))
                .catch(err => {
                    console.log(err);
                })
        }

    }

    const initGenre = () => {
        fetch('/api/genre/getGenre', {
            headers: {
            }
        }).then(res => res.json())
            .then(result => {
                let allGenre = [];
                for (var i = 0; i < result.data.length; i++) {
                    allGenre = allGenre.concat({ _id: result.data[i]._id, name: result.data[i].name })
                }
                setGenres(allGenre)
            });
    }

    const initBestSoldBook = () => {
        getBestSoldBook().then(response => {
            if (response.error) {
                console.log(response.error);
            } else {
                setBestSoldBook(response)
            }
        })
    }

    const handleChangePage = (event, value) => {
        setPage(parseInt(value));
    };
    const handleChange = (event, newValue) => {
        setPriceFilter(newValue);
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

    //show grid books
    const gridBooks = () => {
        return (
            <motion.div
                layout
                className="row">
                {
                    books.map((book, index) => (
                        <div className="col-md-4">
                            <BookCard book={book} />
                        </div>
                    ))
                }
            </motion.div>
        )
    }

    const sorting = () => (
        <React.Fragment>
            <div className="d-flex align-item-center justify-content-center">
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
                count={Math.floor(totalBook / limit + 1)}
                size="large"
                page={page}
                onChange={handleChangePage} />
        </div>

    )

    const rightSide = () => (
        <React.Fragment>
            <div style={{ display: 'flex', alignItems: "center", marginBottom: '5px', justifyContent: 'center', marginTop: '20px' }}>
                <input type="text"
                    className="custom-input"
                    style={{ width: '50%' }}
                    value={regex}
                    placeholder="Enter book infor"
                    onChange={e => {
                        console.log(e.target.value.length);
                        getSearchBook(e.target.value);
                        e.target.value.length > 0 ? setSearchFlag(true) : setSearchFlag(false)
                    }}
                    placeholder="Search" size={15} />
                <i class="material-icons">search</i>
            </div>
            <ul className="collection"
                style={{
                    marginBottom: '8px',
                    width: '100%',
                    listStyle: 'none'
                }}>
                {searchFlag && (<p className='text-center'>{searchData.length} results</p>)}
                {

                    searchFlag && searchData.map((data, index) => (
                        <Link to={`/books/search/${data.slug}`}>
                            <li className="collection-item m-0"
                                style={{
                                    color: 'green',
                                    width: '100%',

                                    alignItems: "center",
                                    marginBottom: '5px'
                                }}
                                onClick={() => {/*var temp=[];temp=temp.concat(data);setBooks(temp);setTotalBook(1)*/localStorage.setItem("searchBook", JSON.stringify(data)) }} style={{ color: 'green', marginLeft: '10rem', alignItems: "center", marginBottom: '5px' }}>
                                <div className="d-flex m-1 align-content-center">
                                    <img src={data.photo} width="50px" height="60px" />
                                    <p className="m-2">{data.title}</p>
                                </div>
                            </li>
                        </Link>
                    ))
                }
            </ul>

            <div className="price-filter mt-4">

                <p className="custom-heading">Filter by price </p>

                <Slider
                    value={priceFilter}
                    style={{ color: 'red' }}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
                <p className="custom-text"> price from {priceFilter[0]} to {priceFilter[1]}</p>
                <div className="text-center">
                    <Button
                        onClick={() => { setFlag(!flag) }}
                    >
                        Confirm
                    </Button>
                </div>
            </div>

            <hr />
            <div className="category-filter mt-4">
                <div className='d-flex justify-content-center'>
                    <p className="custom-heading">Categories</p>

                    <ExpandMoreIcon
                        style={{ marginTop: '10px', marginLeft: '10px' }}
                        onClick={() => {
                            setOpenGenre(!openGnere)
                        }} />

                </div>
                {
                    openGnere && genres && genres.map((g, i) => (
                        <Link className="custom-link" to={`/books/${g.name}?page=${1}&limit=${limit}`} onClick={() => { localStorage.setItem("genre_id", JSON.stringify(g._id)); setPage(1) }}>
                            <p key={i} className="custom-text " style={{ marginLeft: '0px' }}>{g.name}</p>
                        </Link>

                    ))
                }
            </div>
            <hr />
            <div className="top-sell">
                <p className="custom-heading">Top selling</p>
                <div className="d-flex justify-content-between">

                    <br />

                    {
                        bestSoldBook && bestSoldBook.map((b, i) => (
                            <Link to={`/book/${b.slug}`}>
                                <img width="45px" key={i} alt={b.slug} src={b.photo} />
                            </Link>

                        ))
                    }
                </div>
            </div>

            <hr />
            <div className="category-filter mt-4">
                <div className="d-flex justify-content-center">
                    <p className="custom-heading">Authors</p>
                    <ExpandMoreIcon
                        style={{ marginTop: '10px', marginLeft: '10px' }}
                        onClick={() => {
                            setOpenAuthor(!openAuthor)
                        }} />
                </div>
                {
                    openAuthor && authors && authors.map((g, i) => (
                        <Link className="custom-link"
                            // to={`/books/author/${g.slug}`}
                            onClick={() => { getAllAuthorBooks(g.slug) }}
                        >
                            <p key={i} className="custom-text " style={{ marginLeft: '0px' }}>{g.name}</p>
                        </Link>

                    ))
                }
            </div>


        </React.Fragment>
    )

    return (
        <React.Fragment>
            <Layout>

                {banner()}
                <div className="container mt-5">

                    <div className="row">

                        <div className="col-md-9">
                            <div style={{ display: 'flex', justifyContent: "space-between", marginBottom: '10px', alignItems: 'center' }}>
                                <p style={{ float: 'left', fontSize: '1rem' }}>
                                    Display {page} - {page * limit} results of {totalBook}
                                </p>

                                <p className="custom-heading">
                                    {author}
                                </p>

                                <p style={{ float: 'right' }}>
                                    {sorting()}
                                </p>
                            </div>
                            {loading ? (<BookListSkeleton />) : (gridBooks())}
                            {books && pagination()}
                        </div>

                        <div className="col-md-3" >

                            {rightSide()}
                        </div>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    )

}

export default BookListPage