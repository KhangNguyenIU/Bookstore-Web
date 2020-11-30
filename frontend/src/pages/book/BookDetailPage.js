import React, { useEffect, useState, useContext, Component } from 'react'
import { getCookie, isAuth, removeLocalStorage, setCookie, setLocalStorage } from '../../actions/auth'
import { CartContext, UserContext } from '../../App.js'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { getDetailBook, likeBook, unlikeBook, listRelatedBook } from '../../actions/book'
import Layout from '../../components/Layout'
import Comment from '../../components/book/Comment'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { stringTrim } from '../../helpers/StringTrim'
import Snackbar from '@material-ui/core/Snackbar';

import Alert from "@material-ui/lab/Alert";
import { makeComment } from '../../actions/user'/**
* @author
* @function DetailBook
**/
import BookCard from '../../components/book/BookCard'
import BookDetailSkelton from '../../components/skeleton/BookDetailSkeleton'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    button: {
        borderRadius: 0
    }
}));

const BookDetailPage = (props) => {
    const slug = props.match.params.slug
    const history = useHistory();
    const token = getCookie('token')
    const classes = useStyles()
    const { statecart, dispatchcart } = useContext(CartContext);
    const { stateUser, dispatchUser } = useContext(UserContext)
    const [amount, setAmount] = useState(1);
    const [book, setBook] = useState('')
    const [feedBack, setFeedBack] = useState('')
    const [relatedBooks, setRelatedBooks] = useState([])
    const [values, setValues] = useState({
        success: '',
        error: '',
        loading: false,
        isOpenSuccess: false,
        isOpenError: false
    })

    const { success, error, isOpenError, isOpenSuccess, loading } = values
    const userEndPoint = isAuth(stateUser).role === 1 ? 'admin/' : '';
    useEffect(() => {
        setValues({ ...values, loading: true })
        if (statecart.items.length > 0) {
            localStorage.setItem("cart", JSON.stringify(statecart.items));
        }

        initBook()
    }, [slug, success])

    const initBook = () => {
        getDetailBook(slug).then(response => {
            if (response.error) {
                setValues({
                    ...values,
                    error: response.error,
                    loading: false
                })
                console.log(response.error);
            } else {
                setBook(response);
                setValues({
                    ...values,
                    loading: false
                })
                getRelatedBooks(response._id, response.genre)
            }
        });

    };

    const getRelatedBooks = (id, genre) => {
        listRelatedBook(id, genre).then(response => {
            if (response.error) {
                setValues({
                    ...values, error: response.error
                })
            } else {
                setRelatedBooks(response)
            }
        })
    }
    // check if the user has already liked this book
    const checkLikedBook = () => {
        // console.log(book._id);
        if (stateUser) {
            if (stateUser.likes) {
                if (stateUser.likes.includes(book._id)) {
                    return true
                }
                return false;
            }

            return false
        }
        return false
    }

    const handleLikeButton = () => {
        if (!checkLikedBook()) {
            likeBook(slug, token).then(data => {
                setValues({
                    ...values, success: "You have liked this book", isOpenSuccess: true
                })
                setBook(data.book)
                dispatchUser({ type: "UPDATE", payload: data.user })
                localStorage.setItem("user", JSON.stringify(data.user))
            }).catch(err => {
                setValues({
                    ...values, error: "Something wrong. try again", isOpenError: true
                })
            })
        }
        else {
            unlikeBook(slug, token).then(data => {
                setValues({
                    ...values, success: "You have disliked this book", isOpenSuccess: true
                })
                setBook(data.book)
                dispatchUser({ type: "UPDATE", payload: data.user })
                localStorage.setItem("user", JSON.stringify(data.user))
            }).catch(err => {
                setValues({
                    ...values, error: "Something wrong. try again", isOpenError: true
                })
            })

        }
    }

    const addtocart = async (id, title, realprice, slug, photo) => {
        if (isAuth(stateUser) == false) {
            setValues({ ...values, error: "You have to login to use shopping cart.", success: '' })
        }
        else if (amount <= 0 || Math.floor(amount) != amount) {
            setValues({ ...values, error: "Invalid amount", isOpenError: true, success: '' })
        }
        else {
            if (amount > book.amount) {
                setValues({
                    ...values, error: `Shop can not supply enough ${amount} this book for you`,
                    isOpenError: true,
                    success: ''
                })
            }
            else {
                if (statecart.items.length == 0) {
                    localStorage.setItem("cart", JSON.stringify({
                        book_id: id, amount: amount,
                        title: title, realprice: parseFloat(realprice),
                        slug: slug, priceitem: (realprice * amount).toFixed(2), photo
                    }))
                    await dispatchcart({
                        type: "ADD",
                        payload: JSON.parse(JSON.stringify({
                            book_id: id, amount: amount,
                            title: title, realprice: parseFloat(realprice), slug: slug, photo
                        })), priceitem: parseFloat((realprice * amount).toFixed(2))
                    });
                    localStorage.setItem("cart", JSON.stringify(statecart.items));
                    localStorage.setItem("total", JSON.stringify(statecart.total));
                } else if (statecart.items.length > 0) {
                    await dispatchcart({
                        type: "ADD",
                        payload: JSON.parse(JSON.stringify({
                            book_id: id, amount: amount, title: title,
                            realprice: parseFloat(realprice), slug: slug, photo
                        })), priceitem: parseFloat(((realprice * amount)).toFixed(2))
                    });
                    localStorage.setItem("cart", JSON.stringify(statecart.items));
                    localStorage.setItem("total", JSON.stringify(statecart.total));
                }

                console.log(statecart);
                setValues({
                    ...values,
                    isOpenSuccess: true,
                    success: `Add ${amount} ${book.title} to shopping cart sucessfully`
                })
            }
        }

    }

    const handleClose = (event, reason) => {
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

    const handleComment = (e) => {
        e.preventDefault()
        makeComment(feedBack, book.slug, token).then(response => {
            if (response.error) {
                setValues({
                    ...values,
                    error: response.err
                })
                setFeedBack('')
            } else {
                setValues({
                    ...values,
                    isOpenSuccess: true,
                    success: "Your feedback has been posteed."
                })
                setFeedBack("")
            }
        })
    }

    const handleChangeComment = e => {
        let feed = e.target.value
        setFeedBack(feed)
    }

    const userBookPage = (book) => (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            style={{ width: '100%' }}
                            src={book.photo} />
                    </div>

                    <div className="col-md-8">
                        <p style={{ fontFamily: 'Josefin Sans' }}>
                            By: {book.writtenby.map((author, index) => {
                            return (
                                <Link to={`/author/${author.slug}`} className="custom-link" key={index}>
                                    {author.name}{", "}
                                </Link>
                            )
                        })}
                        </p>


                        <h2 style={{ fontFamily: 'Cormorant Garamond', fontWeight: '500' }}>{book.title}</h2>
                        <p style={{ display: 'flex', }}>
                            <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.5rem ', margin: '0px' }}>${book.finalprice.toFixed(2)}</p>
                            <p style={{ textDecoration: 'line-through', marginLeft: '2rem', fontSize: '1rem', color: '#555' }}>${book.price}</p>
                        </p>

                        <p style={{ fontFamily: 'Cormorant Garamond', margin: '0px', fontSize: '1.5rem' }}>Discount: {book.discount}</p>
                        <p style={{ fontFamily: 'Cormorant Garamond', color: '#555', fontSize: '1.2rem' }}>{stringTrim(book.description)}
                            <br />
                            <p style={{ fontFamily: 'Cormorant Garamond', color: 'black', fontSize: '1.5rem' }}>
                                Genre: {book.genre.map((genre, index) => {
                                return (
                                    <Link className="custom-link" key={index}>
                                        {genre.name}{"  "}
                                    </Link>
                                )
                            })}

                            </p>
                        </p>
                        <p>
                            Quality: {book.amount}
                        </p>
                        <TextField
                            type="number"
                            onChange={e => { setAmount(e.target.value) }}
                            defaultValue={amount}
                            placeholder="Amount"
                            inputProps={{
                                style: {
                                    width: '70px'
                                }
                            }} />
                        <br />

                        <p style={{ display: 'flex', alignItems: 'center', padding: '0px', marginTop: '20px' }}>
                            {
                                !isAuth(stateUser) ? (
                                    <FavoriteIcon
                                        color="secondary" />

                                ) : (
                                        !checkLikedBook() ? (
                                            <IconButton
                                                onClick={handleLikeButton}
                                                style={{ outline: 'none' }}
                                            //color="secondary"
                                            >
                                                <FavoriteBorderOutlinedIcon />
                                            </IconButton>
                                        ) : (
                                                <IconButton
                                                    onClick={handleLikeButton}
                                                    style={{ outline: 'none' }}
                                                    color="secondary"
                                                >
                                                    <FavoriteIcon />
                                                </IconButton>
                                            )
                                    )

                            }

                            <p style={{ marginTop: '15px' }}>
                                {book.likes.length} people like this book.</p>
                        </p>


                        <p style={{ marginTop: '0px' }}>
                            <Button
                                variant="contained"
                                //color="primary"
                                style={{ backgroundColor: "#ec524b", color: 'white', padding: "15px", marginTop: '1rem' }}
                                className={classes.button}
                                startIcon={<AddShoppingCartIcon />}
                                onClick={() => {
                                    addtocart(book._id, book.title, book.finalprice.toFixed(2), book.slug, book.photo);
                                }}
                            >
                                Add To Cart</Button>
                        </p>

                    </div>
                </div>
            </div>
        </div>

    )

    const showSuccessMessage = () => (
        (
            <Snackbar
                open={isOpenSuccess}
                autoHideDuration={2000}
                onClose={handleClose} >
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
                onClose={handleClose}>
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

    const relatedBookPart = () => {
        return (
            <React.Fragment >
                <div style={{ marginTop: '50px' }}>
                    <p className="header-text" style={{ fontSize: '2rem' }}>
                        May be you like this.
                </p>
                    <hr />
                    <div className="row mt-5">
                        {
                            relatedBooks && relatedBooks.map((book, i) => (
                                <div className="col-sm-6 col-md-3">
                                    <BookCard book={book} />
                                </div>
                            ))
                        }
                    </div>
                </div>


            </React.Fragment>
        )
    }
    const belowInfo = () => (
        <React.Fragment>
            <div className="container">
                <div style={{ display: "flex", justifyContent: 'center', marginTop: '30px' }}>
                    <button className="custom-button">
                        description
                </button>

                    <button className="custom-button">
                        additional information
                </button>

                    <button className="custom-button">
                        review
                </button>
                </div>

                {description()}
                {comment()}
                {feedback()}
                {relatedBookPart()}
            </div>


        </React.Fragment>
    )


    const feedback = () => (
        <div>
            <form>
                <br />
                <textarea
                    multiple
                    //className="custom-input"
                    style={{ minHeight: '100px', width: '100%' }}
                    value={feedBack}
                    onChange={handleChangeComment}
                    placeholder="We hope to see your feedback"
                />
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    color="secondary"
                    onClick={handleComment}>
                    Post
            </Button>
            </form>
        </div>
    )
    const description = () => (
        <p className="custom-text" style={{ marginBottom: '30px' }}>
            {book.description}
        </p>
    )
    const header = () => (
        <div className="head-banner"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1453671424686-dfef17039343?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=976&q=80")',
                height: '300px',
                opacity: '1',
                position: 'relative',
                textAlign: 'center'
            }} F
            className="container-fluid">

            <div className="centered" style={{ color: '#fff' }}>
                <h6>Product detail</h6>
                <h2>A book a story</h2>
            </div>

        </div>
    )

    const comment = () => (
        <React.Fragment>
            {/* <div style={{ height: '400px' }}> */}
            {book.comments ? (book.comments.map((c, i) => (
                <Comment comment={c} />

            ))) : (
                    <p>This book has no comment</p>
                )
            }
            {/* </div> */}


        </React.Fragment>
    )



    return (
        <Layout>
            <React.Fragment>


                {header()}
                {showSuccessMessage()}
                {showErrorMessage()}
                {
                    loading ? (<BookDetailSkelton />) :
                       (
                           <div>
                                 {book ? userBookPage(book) : (<p>Book not Found</p>)}
                           </div>
                       )
                }
                <br />
                {belowInfo()})





            </React.Fragment>
        </Layout>
    )

}

export default BookDetailPage;
