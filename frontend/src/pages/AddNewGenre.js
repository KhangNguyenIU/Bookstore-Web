import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { register, isAuth, authenticate } from '../actions/auth'
import { addGenre,getGenre,deleteGenre } from '../actions/book'
import { toast } from 'react-toastify'
import { Router } from 'react-router'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
/**
* @author
* @function Login
**/

const AddNewGenre = (props) => {
    const [show,setShow]=useState(false);
    const [allGenre,setAllGenre]=useState([]);

    const [values, setValues] = useState({
        genre: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { genre, error, loading, message, showForm } = values;

    useEffect(() => {
        if (isAuth()) {
            props.history.push('/')
        }
        else
        {
            getGenre().then(response => {
                if (response.error) {
                    setValues({
                        ...values,
                        error: response.error
                    })
                    console.log(response.error);
                } else {
                    setAllGenre(response.data);
                    console.log(allGenre.length);
                }
            });
            //props.history.push('/addGenre')
        }
    }, [allGenre.length])

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setValues({ ...values, loading: true, error: false });
        const data = { genre };
        if (String(genre).trim().length==0) {
            setValues({ ...values, loading: true, error: "Genre is empty, enter name" });
        } else {
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
        }

    }
    const alertBox = (name,id) => {
        confirmAlert({
          title: 'Confirm to delete',
          message: 'Are you sure to delete genre '+String(name)+' ?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {deleteGenre(name,String(id).trim()).then(data=>{
                  if(data.error)
                  {
                    setValues({ ...values, error: data.error, loading: false });
                  }else{
                    getGenre().then(response => {
                        if (response.error) {
                            setValues({
                                ...values,
                                error: response.error
                            })
                            console.log(response.error);
                        } else {
                            setAllGenre(response.data);
                            console.log(allGenre.length);
                        }
                    });
                  }
              })}
            },
            {
              label: 'No',
             // onClick: () => alert('Click No')
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
    const genreList=()=>{
        return(
        allGenre.map((genre,index)=>(
            <div>
                <Link  style={{color:'green'}} onClick={()=>alertBox(genre.name,genre._id)}>
                  {genre.name}
                </Link>
            </div>
        ))
        )
    }
    const showGenre=()=>(
        show ?
          <div>
            {genreList()}
          </div>
          :
          <div>
          <Link to='/admin'>Back To DashBoard</Link>
          </div>
    )

    const addGenreForm = () => (
        <div className="container">
            <div className="box" style={{ padding: '2rem' }}>
                <div className="row" >
                    <div className="col-md-6 col-sm-12" style={{width:'100%'}}>
                        <div className="leftPart">
                            <img src="/img/genretheme.webp" width="50%" max-height="none" />
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-12" style={{ width:'100%' }}>
                        <div className="rightPart">
                            <h3 className='display-4 text-center' style={{ fontFamily: 'Grand Hotel' }}>New Genre</h3>
                            <form onSubmit={handleSubmit} >
                                <div className="form-group">
                                    <input
                                        placeholder='Genre_name'
                                        value={genre}
                                        onChange={handleChange('genre')}
                                        className="form-control shadow-none rounded-0"
                                        type='text'
                                        style={{ border: 'none', borderBottom: '1px solid #000', outline: 'none' }} />
                                </div>
                                <div className='text-center'>
                                    <div style={{ height: '16px' }}>
                                        {showError()}
                                    </div>
                                    <Link onClick={()=>setShow(!show)}>Show Genre</Link>
                                    {showGenre()}
                                </div>
                                <div className="form-group pt-3 text-center">
                                    <button
                                        className='btn btn-secondary buttonLogin'
                                        style={{ borderRadius: '25px', padding: '0 20px', height: '40px' }}>Add Genre</button>
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
            {addGenreForm()}
        </React.Fragment>
    )

}

export default AddNewGenre;