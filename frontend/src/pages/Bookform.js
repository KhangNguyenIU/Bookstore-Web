import React, { Component, useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from "@material-ui/lab/Alert";
import FormGroup from '@material-ui/core/FormGroup';
import { Button, CircularProgress } from '@material-ui/core'
import { uploadPhoto } from '../actions/uploadPhoto';
import { getAuthors } from '../actions/author';
import { addNewBooks } from '../actions/book';
import {
    Fab, Tooltip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function Bookform() {
    const history = useHistory();
    const [title, settitle] = useState("");

    const [price, setprice] = useState(20);
    const [year, setyear] = useState(2020);
    const [discount, setdiscount] = useState(0);
    const [amount, setamount] = useState(20);
    const [cost, setCost] = useState(1)
    const [description, setdes] = useState("");
    const [picture, setimage] = useState("");
    const [genres, setGenres] = useState([])
    const [authors, setAuthors] = useState([])
    const [url, setUrl] = useState('')
    const [genreList, setGenreList] = useState([])
    const [authorList, setAuthorList] = useState([])
    const [preview, setPreview] = useState()
    const [values, setValues] = useState({
        loading: false,
        error: '',
        success: '',
        isOpenError: false,
        isOpenSuccess: false
    })

    const { success, error, isOpenError, isOpenSuccess, loading } = values
    useEffect(() => {
        initAuthor()
        initGenre();
    }, [])


    useEffect(() => {
        if (!picture) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(picture)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [picture])

    const clear = () => {
        settitle('');
        setGenres('')
        setyear('')
        setAuthors('')
        setUrl('')
        setPreview('')
        setamount(0)
        setprice(0)
        setdiscount(0)
        setdes('')
        setimage('')
        setCost(1)

    }

    const post = () => {
        setValues({ ...values, loading: true })
        const data = new FormData();
        data.append("file", picture);
        data.append("upload_preset", "bookstore");
        data.append("cloud_name", "dhorn9l86");
        uploadPhoto(data).then(photo => {
            if (photo.error) {
                setValues({
                    ...values,
                    error: "Upload book's photo failed, please try again."
                })
            } else {
                setUrl(url => photo.url)

                var form = {
                    title: title, genre: genres, year: year, photo: photo.url, price: price, cost: cost,
                    discount: discount, amount: amount, writtenby: authors, description: description
                }
                addNewBooks(form).then(response => {
                    console.log(response);
                    if (response.error) {
                        setValues({ ...values, error: response.error, isOpenError: true, loading: false })
                    } else {
                        setValues({ ...values, success: "Add new book successfully", isOpenSuccess: true, loading: false })
                        clear()
                    }
                })

            }

        })
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
                setGenreList(allGenre)
            });
    }

    const initAuthor = () => {
        getAuthors().then(data => {
            if (data.error) {
                setValues({ ...values, error: "Error when load authors" })
            } else {
                setAuthorList(data.data)
            }
        })
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
    const handleGenreToggle = g => () => {

        // return the first index or -1
        const clickedTag = genres.indexOf(g);
        const all = [...genres];

        if (clickedTag === -1) {
            all.push(g);
        } else {
            all.splice(clickedTag, 1);
        }

        setGenres(all);


    };

    const handleAuhtorToggle = g => () => {

        // return the first index or -1
        const clickedTag = authors.indexOf(g);
        const all = [...authors];

        if (clickedTag === -1) {
            all.push(g);
        } else {
            all.splice(clickedTag, 1);
        }

        setAuthors(all);

    };

    const showCategories = () => (
        <React.Fragment>
            Genres
            <div>
            <Tooltip title="Add New Genre">
                    <Fab
                        onClick={() => { history.push('/addGenre') }}
                        style={{ outline: 'none' }}
                        color="secondary" size="small">
                        <AddIcon style={{ color: 'black' }} />
                    </Fab>
                </Tooltip>
            </div>
            <FormGroup>
                <ul className="scroll-bar" style={{ Height: "100px" }}>
                    {
                        genreList && genreList.map((g, i) => (
                            <li key={i} className="list-unstyled">
                                <input
                                    onChange={handleGenreToggle(g._id)}

                                    type="checkbox"
                                    className="mr-2"
                                />
                                <label className="form-check-label">{g.name}</label>
                            </li>
                        ))
                    }
                </ul>
              
            </FormGroup>
        </React.Fragment>

    )

    const showAuthors = () => (
        <React.Fragment>
            <div className='mb-3'>
                Authors
                <div className="w-100 " style={{display:'flex', justifyItems:'center',alignItems:'center'}}>
                        <div style={{float:'right'}}>
                        <Tooltip title="Add New Author">
                            <Fab
                                onClick={() => { history.push('/addAuthor') }}
                                style={{ outline: 'none' }}
                                color="secondary" size="small">
                                <AddIcon style={{ color: 'black' }} />
                            </Fab>
                        </Tooltip>
                        </div>
                    </div>
            <FormGroup>
                    <ul className="scroll-bar" style={{ Height: "100px" }}>
                        {
                            authorList && authorList.map((g, i) => (
                                <li key={i} className="list-unstyled">
                                    <input
                                        onChange={handleAuhtorToggle(g._id)}

                                        type="checkbox"
                                        className="mr-2"
                                    />
                                    <label className="form-check-label">{g.name}</label>
                                </li>
                            ))
                        }
                    </ul>
                   
                </FormGroup>
            </div>
        </React.Fragment>

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

    const BookForm = () => (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <div className="box-book">
                    <div className="row">
                        <div className="col-md-5 ">
                            <div className="leftPart">

                                {preview ? <img src={preview} width="295px" height="400px" /> :
                                    <img src={preview ? preview : "/img/photo.svg"} width="100%" />}
                            </div>

                        </div>

                        <div className="col-md-7">
                            <h3 className="custom-header text-center mb-2">Book Form</h3>
                            <div className="file-field input-field">
                                <div className="text-center">
                                    <label style={{
                                        fontSize: "22px",
                                        border: '1px black solid',
                                        padding: '5px 16px',
                                        borderRadius: '50%',
                                        cursor: 'pointer'
                                    }}>
                                        +
                                  <input
                                            onChange={(e) => setimage(e.target.files[0])}
                                            type="file" accept="image/*" hidden />
                                    </label>
                                </div>

                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <input type="text" value={title}
                                        className="custom-input" onChange={(e) => settitle(e.target.value)} placeholder="Enter title" />
                                </div>
                                <div className="col-md-6">
                                    <input type="number" className="custom-input"
                                        onChange={(e) => setCost(e.target.value)} placeholder="Enter cost" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-3 d-block">
                                    <label>Price</label>
                                    <input type="number" value={price}
                                        className="custom-input" onChange={(e) => setprice(e.target.value)} placeholder="Enter price" />
                                </div>
                                <div className="col-md-3 d-block">
                                    <label>Discount</label>
                                    <input type="number" value={discount}
                                        className="custom-input" onChange={(e) => setdiscount(e.target.value)} placeholder="Enter discount" />

                                </div>
                                <div className="col-md-3">
                                    <label>year</label>
                                    <input type="number" value={year}
                                        className="custom-input" onChange={(e) => setyear(e.target.value)} placeholder="Enter year" />
                                </div>
                                <div className="col-md-3">
                                    <label>Amount</label>
                                    <input type="number" value={amount}
                                        className="custom-input" onChange={(e) => setamount(e.target.value)} placeholder="Enter amount" />
                                </div>
                                <div className="col-sm-12 mt-3">
                                    <label>Description</label>
                                    <input type="text" value={description}
                                        className="custom-input" onChange={(e) => setdes(e.target.value)} placeholder="Enter description" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    {showCategories()}
                                </div>
                                <div className="col-sm-6">
                                    {showAuthors()}
                                </div>
                            </div>


                            <div className="d-flex justify-content-center">
                                <Button
                                    size="large"
                                    onClick={() => post()}
                                    variant="contained"
                                    color="secondary">
                                    ADD
             </Button>

                                <Button
                                    size="large"
                                    style={{ marginLeft: '1rem' }}
                                    onClick={() => history.push('/dashboard')}
                                    variant="outlined"
                                    color="secondary">
                                    HOME
             </Button>

                                {loading && <div style={{ margin: '0px' }}><CircularProgress color="primary" /></div>}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
    return (

        <div className="container-fluid">
            {BookForm()}
            {showErrorMessage()}
            {showSuccessMessage()}

        </div>

    );
}


export default Bookform;
