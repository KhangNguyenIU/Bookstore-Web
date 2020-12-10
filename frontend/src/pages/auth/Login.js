import React, { useState, useEffect, useContext } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Router } from 'react-router-dom';
import { login, isAuth, authenticate } from '../../actions/auth'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from "@material-ui/lab/Alert";
import { UserContext } from '../../App'
import LoginGoogle from '../../components/auth/LoginGoogle';
import GoogleLogin from 'react-google-login'
import { loginWithGoogle } from '../../actions/auth'
import { GOOGLE } from '../../react.env'
import { IconButton } from '@material-ui/core';
/**
* @author
* @function Login
**/

const Login = (props) => {
    const { stateUser, dispatchUser } = useContext(UserContext)
    const [values, setValues] = useState({
        email: 'khang@gmail.com',
        password: '123456',
        error: '',
        loading: false,
        message: '',
        success: '',
        showForm: true,
        openSuccess: false,
        openError: false
    });

    const { email, password, error, loading, message, success, showForm, openError, openSuccess } = values;


    useEffect(() => {
        if (isAuth(stateUser)) {
            props.history.push('/')
        }
    }, [])

    const handleChange = name => e => {
        setValues({ ...values, error: false, success: '', [name]: e.target.value, openError: false, openSuccess: false });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        login(user).then(data => {
            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false, openError: true });
            } else {
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
                setValues({
                    ...values,
                    success: 'Login Success',
                    openSuccess: true
                })
                authenticate(data, () => {
                    dispatchUser({ type: "LOGIN", payload: data.user })
                    props.history.push('/')
                })
            }
        });
    }

    const showError = () => (
        error ?
            <div>
                <p style={{ color: 'red', fontSize: '0.8rem' }}> * {error}</p>
            </div>
            :
            ''
    )

    const responseGoogle = response => {
        const tokenId = response.tokenId;
        const user = { tokenId }
        loginWithGoogle(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false, openError: true });
            } else {
                setValues({
                    ...values,
                    success: "Login with Google account success",
                    openSuccess: true
                })
                authenticate(data, () => {
                    dispatchUser({ type: "LOGIN", payload: data.user })
                    props.history.push('/')
                })
            }
        })
    }

    const loginGoogle = () => (
        <React.Fragment>
            <div className="login-with-google-div">
                <GoogleLogin
                    clientId={GOOGLE}
                    buttonText="Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    theme="dark"
                />

            </div>

            {/* <FcGoogle /> */}
        </React.Fragment>
    )
    const loginForm = () => (
        <div className="container">
            <div className="col-md-8 offset-md-2">
                <div className="box">
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
                                        <div style={{ height: '16px' }}>
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
                                        {loginGoogle()}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setValues({
            ...values,
            openError: false,
            openSuccess: false
        })
    };
    const showSuccessMessage = () => (
        (
            <Snackbar
                open={openSuccess}
                autoHideDuration={2000}
                onClose={handleClose} >
                <Alert
                    elevation={6}
                    variant="filled"
                    severity="success"
                    onClose={handleClose}
                //color={snackbarType}
                >
                    Login success</Alert>
            </Snackbar>
        )


    )

    const showErrorMessage = () => (
        (
            <Snackbar
                open={openError}
                key={
                    'top' + 'right'
                }
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

    return (
        <React.Fragment>
            {showErrorMessage()}
            {showSuccessMessage()}
            {loginForm()}
        </React.Fragment>

    )

}

export default Login;
