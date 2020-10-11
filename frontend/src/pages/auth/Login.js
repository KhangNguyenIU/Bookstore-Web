import React, { useState, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Router } from 'react-router-dom';
import { login, isAuth, authenticate } from '../../actions/auth'
import { toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
/**
* @author
* @function Login
**/

const Login = (props) => {
    
    const [values, setValues] = useState({
        email: 'khang@gmail.com',
        password: '123456',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        if (isAuth()) {
            props.history.push('/')
        }
    }, [])

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        login(user).then(data => {
            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
                toast.info('Login sucessfully');  
                authenticate(data, () => {
                    
                    if (isAuth()) {
                        props.history.push('/')
                    }
                })
            }
        });
    }

    const showError = () => (
        error ?
            <div>
                <p style={{ color: 'red', fontSize:'0.8rem' }}> * {error}</p>
            </div>
            :
            ''
    )
    const loginForm = () => (
        <div className="container">
            <div className="box" style={{ padding: '2rem' }}>
                <div className="row" >
                    <div className="col-md-6 ">
                        <div className="leftPart">
                            <img src="/img/logo.svg" width="100%" />
                        </div>
                    </div>

                    <div className="col-md-6  ">
                        <div className="rightPart">
                            <h3 className='display-4 text-center' style={{ fontFamily: 'Grand Hotel' }}>Signin</h3>
                            <form onSubmit={handleSubmit}>
                                <form className="form-group">
                                    {/* <label for="email">Email</label> */}
                                    <input
                                        value={email}
                                        onChange={handleChange('email')}
                                        placeholder='Email'
                                        className="form-control shadow-none rounded-0"
                                        type='email'
                                        style={{ border: 'none', borderBottom: '1px solid #000', outline: 'none' }} />
                                </form>



                                <div className="form-group">
                                    {/* <label for="password">Password</label> */}
                                    <input
                                        value={password}
                                        onChange={handleChange('password')}
                                        placeholder='Password'
                                        className="form-control shadow-none rounded-0"
                                        type='password'
                                        style={{ border: 'none', borderBottom: '1px solid #000', outline: 'none' }} />
                                </div>
                                <div className='text-center'>
                                    <div style={{height:'16px'}}>
                                        {showError()}
                                    </div>

                                    <a href="/signup" style={{ textDecoration: 'none', fontSize: '1rem' }}>Dont have an account? Sign up</a>
                                </div>

                                <div className="form-group pt-3 text-center">
                                    <button
                                        type="submit"
                                        className='btn btn-secondary buttonLogin'
                                        style={{ borderRadius: '25px', padding: '0 20px', height: '40px' }}>Submit</button>
                                </div>
                                <p className="text-center">or</p>
                                <div className="text-center">
                                    <a href="/">
                                        <FcGoogle size='2rem' />
                                    </a>

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
            <ToastContainer
            autoClose={2000}
            />;
            {loginForm()}
        </React.Fragment>

    )

}

export default Login;
