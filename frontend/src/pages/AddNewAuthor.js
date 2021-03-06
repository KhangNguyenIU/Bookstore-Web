import React, { useState, useEffect, useContext } from 'react'
import { register, isAuth, authenticate } from '../actions/auth'
import { addAuthor, showAllAuthor, deleteAuthor } from '../actions/book'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import {UserContext} from '../App'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { uploadPhoto } from '../actions/uploadPhoto'
/**
* @author
* @function Login
**/

const AddNewAuthor = (props) => {
    const { stateUser, dispatchUser } = useContext(UserContext)
    const [show, setShow] = useState(false);
    const [authors, setAuthors] = useState([])
    const [picture, setimage] = useState("");
    const [url,setUrl] = useState('')
    const [review, setPreview] = useState('')
    const [values, setValues] = useState({
        author: '',
        description:'',
        photo:'',
  
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { author, error, loading, message, showForm ,description,photo} = values;

    useEffect(() => {
        if (isAuth(stateUser).role !== 1) {
            props.history.push('/')
        }
        else {
            showAllAuthor().then(response => {
                if (response.error) {
                    setValues({
                        ...values,
                        error: response.error
                    })
                    console.log(response.error);
                } else {
                    setAuthors(response.data);
                    //console.log(allGenre.length);
                }
            });
            if (!picture) {
                setPreview(undefined)
                return
            }
            const objectUrl = URL.createObjectURL(picture)
            setPreview(objectUrl)
    
            // free memory when ever this component is unmounted
            return () => URL.revokeObjectURL(objectUrl)
        }
    }, [picture])

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setValues({ ...values, loading: true, error: false });
    
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

                if (String(author).trim().length == 0) {
                    setValues({ ...values, loading: true, error: "Name is empty, enter name" });
                } else {
                    addAuthor(String(author).trim(),photo.url, description).then(data => {
                        console.log(data);
                        if (data.error) {
                            setValues({ ...values, error: data.error, loading: false });
                        } else {
                            toast.info(data.msg)
                            showAllAuthor().then(response => {
                                if (response.error) {
                                    setValues({
                                        ...values,
                                        error: response.error
                                    })
                                    console.log(response.error);
                                } else {
                                    setAuthors(response.data);
                                    //console.log(allGenre.length);
                                }
                            });
                        }
                    });
                }
            }

        })


        

    }

    const alertBox = (name, id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete ' + String(name) + ' ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        deleteAuthor(String(name).trim(), String(id).trim()).then(data => {
                            if (data.error) {
                                setValues({ ...values, error: data.error, loading: false });
                            } else {
                                showAllAuthor().then(response => {
                                    if (response.error) {
                                        setValues({
                                            ...values,
                                            error: response.error
                                        })
                                        console.log(response.error);
                                    } else {
                                        setAuthors(response.data);
                                        //console.log(allGenre.length);
                                    }
                                });
                            }
                        })
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    const showError = () => (
        error ?
            <div>
                <p style={{ color: 'red', fontSize: '0.8rem' }}> * {error}</p>
            </div>
            :
            ''
    )
    const authorList = () => {
        return (
            <ul style={{overflowY:'scroll', maxHeight:'100px'}}>
            {authors.map((author, index) => (
         
                    <li style={{ color: 'green' }} onClick={() => alertBox(author.name, author._id)}>
                        {author.name}
                    </li>
               
            ))}
            </ul>
        )
    }
    const showAuthor = () => (
        show ?
            <div>
                {authorList()}
            </div>
            :
            <div>
                <Link to='/dashboard'>Back To Dashboard</Link>
            </div>
    )


    const addAuthorForm = () => (
        <div className="container">
            <div className="col-md-8 offset-md-2">

                <div className="box" style={{ padding: '2rem' }}>
                    <div className="row" >
                        <div className="col-md-6 col-sm-12">
                            <div className="leftPart">
                                <img src={review ? review :"/img/addauthortheme.gif"} width="50%" max-height="none" />
                            </div>
                        </div>

                        <div className="col-md-6 col-sm-12" style={{ width: '100%' }}>
                            <div className="rightPart">
                                <h3 className='display-4 text-center' style={{ fontFamily: 'Grand Hotel' }}>New Author</h3>
                                <form onSubmit={handleSubmit} >
                                    <div className="form-group">
                                        <input
                                            placeholder='Author_name'
                                            value={author}
                                            onChange={handleChange('author')}
                                            className="form-control shadow-none rounded-0"
                                            type='text'
                                            style={{ border: 'none', borderBottom: '1px solid #000', outline: 'none' }} />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            placeholder='Author_description'
                                            value={description}
                                            onChange={handleChange('description')}
                                            className="form-control shadow-none rounded-0"
                                            type='text'
                                            style={{ border: 'none', borderBottom: '1px solid #000', outline: 'none' }} />
                                    </div>

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

                                    <div className='text-center'>
                                        <div style={{ height: '16px' }}>
                                            {showError()}
                                        </div>
                                        <Link onClick={() => setShow(!show)}>Show Author</Link>
                                        {showAuthor()}
                                    </div>
                                    <div className="form-group pt-3 text-center">
                                        <button
                                            className='btn btn-secondary buttonLogin'
                                            style={{ borderRadius: '25px', padding: '0 20px', height: '40px' }}>Add Author</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <React.Fragment>
            {addAuthorForm()}
        </React.Fragment>
    )

}

export default AddNewAuthor;