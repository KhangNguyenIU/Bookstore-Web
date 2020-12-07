import React, { useState, useEffect } from 'react'
import { register, isAuth, authenticate } from '../actions/auth'
import { addAuthor,showAllAuthor,deleteAuthor } from '../actions/book'
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
/**
* @author
* @function Login
**/

const AddNewAuthor = (props) => {
    const [show,setShow]=useState(false);
    const [authors,setAuthors]=useState([])

    const [values, setValues] = useState({
        author: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { author, error, loading, message, showForm } = values;

    useEffect(() => {
        if (isAuth()) {
            props.history.push('/')
        }
        else
        {
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
           // props.history.push('/addAuthor')
        }
    }, [])

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setValues({ ...values, loading: true, error: false });
        if (String(author).trim().length==0) {
            setValues({ ...values, loading: true, error: "Name is empty, enter name" });
        } else {
            addAuthor(String(author).trim()).then(data => {
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
   
    const alertBox = (name,id) => {
        confirmAlert({
          title: 'Confirm to delete',
          message: 'Are you sure to delete '+String(name)+' ?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {deleteAuthor(String(name).trim(),String(id).trim()).then(data=>{
                  if(data.error)
                  {
                    setValues({ ...values, error: data.error, loading: false });
                  }else{
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
              })}
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
    const authorList=()=>{
        return(
        authors.map((author,index)=>(
            <div>
                <Link  style={{color:'green'}} onClick={()=>alertBox(author.name,author._id)}>
                  {author.name}
                </Link>
            </div>
        ))
        )
    }
    const showAuthor=()=>(
        show ?
          <div>
            {authorList()}
          </div>
          :
          <div>
           <Link to='/admin'>Back To Dashboard</Link>
          </div>
    )


    const addAuthorForm = () => (
        <div className="container">
            <div className="box" style={{ padding: '2rem' }}>
                <div className="row" >
                    <div className="col-md-6 col-sm-12">
                        <div className="leftPart">
                            <img src="/img/addauthortheme.gif" width="50%" max-height="none" />
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
                                <div className='text-center'>
                                    <div style={{ height: '16px' }}>
                                        {showError()}
                                    </div>
                                    <Link onClick={()=>setShow(!show)}>Show Author</Link>
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
    )

    return (
        <React.Fragment>
            {addAuthorForm()}
        </React.Fragment>
    )

}

export default AddNewAuthor;