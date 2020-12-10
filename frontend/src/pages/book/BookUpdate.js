import React, { useEffect, useState, useContext, Component } from 'react'
import { getCookie, isAuth } from '../../actions/auth'
import {
    Fab, Tooltip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { CartContext } from '../../App.js'
import { Link, useHistory } from 'react-router-dom'
import { getDetailBook, getAllGenre, updateBook } from '../../actions/book'
import Layout from '../../components/Layout'
import FormGroup from '@material-ui/core/FormGroup';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { toast, ToastContainer } from 'react-toastify'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from "@material-ui/lab/Alert";

/**
* @author
* @function DetailBook
**/

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

const BookUpdate = (props) => {
    const history = useHistory()
    const slug = props.match.params.slug
    const classes = useStyles()
    const [isOpenSuccess, setOpenSucess] = useState(false)
    const [isOpenError, setOpenError] = useState(false)
    const { statecart, dispatchcart } = useContext(CartContext);
    const token = getCookie('token')
    const [authorList, setAuthorList] = useState([])
    const [checkedAuthors, setCheckedAuthors] = useState([])
    const [genreList, setGenreList] = useState([])
    const [checkedGenres, setCheckedGenres] = useState([])
    const [book, setBook] = useState('')
    const [values, setValues] = useState({
        error: '',
        loading: false,
        success: '',
        title: '',
        formData: '',
        amount: 0,
        price: 0,
        discount: 0,
        description: ''
    })
    const { title, amount, price, formData, description, discount, success, error, loading } = values


    useEffect(() => {
        // setValues({ ...values,
        //      formData:new FormData() 
        //     });
        initBook();
        initGenre();
        initAuthor();
    }, [success])

    const initBook = () => {
        getDetailBook(slug).then(response => {
            if (response.error) {
                setValues({
                    ...values,
                    error: response.error
                })
            } else {
                setBook(response);
                setValues({
                    ...values,
                    formData: new FormData(),
                    title: response.title,
                    amount: response.amount,
                    price: response.price,
                    discount: response.discount,
                    description: response.description,
                    error: '',
                    loading: false,
                    success: ''
                })
                setInitialCheckedGenres(response.genre)
                setInitialCheckedAuthors(response.writtenby)
            }
        });

    };

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
                setGenreList(allGenre)
            });
    }
    const initAuthor = () => {
        fetch('/api/author/showAllAuthor', {
            method: 'GET'
        }).then(res => res.json())
            .then(result => {
                let allAuthor = [];
                for (var i = 0; i < result.data.length; i++) {
                    allAuthor = allAuthor.concat({ _id: result.data[i]._id, name: result.data[i].name })
                }
                setAuthorList(allAuthor)
            });
    }

    const setInitialCheckedGenres = genres => {
        let ca = [];
        genres.map((c, i) => {
            ca.push(c._id);
        });
        //console.log(ca);
        setCheckedGenres(ca);
    };
    const setInitialCheckedAuthors = authors => {
        let ca = [];
        authors.map((c, i) => {
            ca.push(c._id);
        });
        //console.log(ca);
        setCheckedAuthors(ca);
    };


    const handleGenreToggle = g => () => {

        // return the first index or -1
        const clickedTag = checkedGenres.indexOf(g);
        const all = [...checkedGenres];

        if (clickedTag === -1) {
            all.push(g);
        } else {
            all.splice(clickedTag, 1);
        }

        setCheckedGenres(all);
        formData.set('genre', all)
        console.log(formData);

    };

    const findOutGenre = g => {
        const result = checkedGenres.indexOf(g);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };
    const handleAuthorToggle = a => () => {

        // return the first index or -1
        const clickedTag = checkedAuthors.indexOf(a);
        const all = [...checkedAuthors];

        if (clickedTag === -1) {
            all.push(a);
        } else {
            all.splice(clickedTag, 1);
        }

        setCheckedAuthors(all);
        formData.set('writtenBy', all)
        console.log(formData);

    };

    const findOutAuthor = a => {
        const result = checkedAuthors.indexOf(a);
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const handleChange = name => e => {
        const value = e.target.value;
        formData.set(name, value)
        console.log(formData);
        setValues({
            ...values,
            formData,
            success: '',
            error: '',
            [name]: value
        })
        console.log(formData.name);
    }

    const hangdleSubmit = () => {
        let dataForm = new FormData();

        console.log("slug..", slug, "form..", formData, "token", token);
        updateBook(slug, formData, token).then(response => {
            console.log("res....", response);
            if (response.error) {
                setValues({
                    ...values,
                    error: response.error
                })
                setOpenError(true)
            } else {
                setValues({
                    ...values,
                    success: `${book.slug} has been updated sucessfully.`
                })
                setOpenSucess(true);
            }
        }).catch(err => {
            console.log(err);
        })

    }


    const showCategories = () => (
        <React.Fragment>
            Genres
            <FormGroup>
                <ul className="scroll-bar" >
                    {
                        genreList && genreList.map((g, i) => (
                            <li key={i} className="list-unstyled">
                                <input
                                    onChange={handleGenreToggle(g._id)}
                                    checked={findOutGenre(g._id)}
                                    type="checkbox"
                                    className="mr-2"
                                />
                                <label className="form-check-label">{g.name}</label>
                            </li>
                        ))
                    }
                </ul>
                <Tooltip title="Add New Genre">
                    <Fab
                        onClick={() => { history.push('/addGenre') }}
                        style={{ outline: 'none' }}
                        color="secondary" size="small">
                        <AddIcon style={{ color: 'black' }} />
                    </Fab>
                </Tooltip>
            </FormGroup>
        </React.Fragment>

    )
    const showAuthorList = () => (
        <React.Fragment>
            Written By
            <FormGroup>
                <ul className="scroll-bar" >
                    {
                        authorList && authorList.map((a, i) => (
                            <li key={i} className="list-unstyled">
                                <input
                                    onChange={handleAuthorToggle(a._id)}
                                    checked={findOutAuthor(a._id)}
                                    type="checkbox"
                                    className="mr-2"
                                />
                                <label className="form-check-label">{a.name}</label>
                            </li>
                        ))
                    }
                </ul>
                <Tooltip title="Add New Author">
                    <Fab
                        onClick={() => { history.push('/addAuthor') }}
                        style={{ outline: 'none' }}
                        color="secondary" size="small">
                        <AddIcon style={{ color: 'black' }} />
                    </Fab>
                </Tooltip>
            </FormGroup>
        </React.Fragment>

    )



    const adminBookPage = (book) => (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            style={{ width: '100%' }}
                            src={book.photo} />
                    </div>

                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-6">
                                <p style={{ fontFamily: 'Josefin Sans' }}>
                                    {showAuthorList()}
                                </p>
                            </div>
                            <div className="col-md-6">
                                {showCategories()}
                            </div>
                        </div>
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <form className={classes.root}>
                                        <label>Title</label>
                                        <input
                                            className="custom-input"
                                            onChange={handleChange('title')}
                                            value={title} type="text"
                                            defaultValue={book.title}
                                        />

                                        <label>Amount</label>
                                        <br />
                                        <input
                                            className="custom-input-number"
                                            value={amount} type="number"
                                            onChange={handleChange('amount')}
                                            defaultValue={book.amount}
                                        />

                                        <br />
                                        <label>Price</label>
                                        <br />
                                        <input
                                            className="custom-input-number"
                                            value={price} type="number"
                                            onChange={handleChange('price')}
                                            defaultValue={book.price}
                                        />

                                        <br />
                                        <label>Discount</label>
                                        <br />
                                        <input
                                            className="custom-input-number"
                                            value={discount} type="number"
                                            defaultValue={book.discount}
                                            onChange={handleChange('discount')}
                                        />
                                    </form>

                                </div>

                                <div className="col-md-6" style={{ margin: 'auto' }}>
                                    <textarea
                                        multiple
                                        className="custom-input"
                                        style={{ minHeight: '100px',Height:'250px' }}
                                        value={description}
                                        onChange={handleChange('description')}
                                        defaultValue={book.description}
                                    />
                                </div>

                            </div>
                            <p style={{ margin: '20px auto' }}>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    type="submit"
                                    color="secondary"
                                    onClick={hangdleSubmit}
                                    startIcon={<CloudUploadIcon />}>Upload</Button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>

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



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSucess(false);
        setOpenError(false)
    };
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
                autoHideDuration={500}
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

    return (
        <Layout>
            <React.Fragment>
                {showSuccessMessage()}
                {showErrorMessage()}
                <ToastContainer autoClose={2000} />
                {header()}

                {book ? adminBookPage(book) : (<p>Book not Found</p>)}

            </React.Fragment>
        </Layout>
    )

}

export default BookUpdate;
