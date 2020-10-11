import React, { useState, useEffect } from 'react'
import { register, isAuth, authenticate } from '../../actions/auth'
import { toast } from 'react-toastify'
/**
* @author
* @function Login
**/

const Register = (props) => {

    const [values, setValues] = useState({
        email: '',
        username: '',
        password: '',
        rePassword: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { email, username, password, rePassword, error, loading, message, showForm } = values;

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
        if (password !== rePassword) {
            setValues({ ...values, loading: true, error: "Password is not identical" });
        } else {
            register(user).then(data => {
                console.log(data);
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    toast.info(data.msg)
                   props.history.push('/signin')
                }
            });
        }

    }

    const showError = () => (
        error ?
            <div>
                <p style={{ color: 'red', fontSize: '0.8rem' }}> * {error}</p>
            </div>
            :
            ''
    )

    const registerForm = () => (
        <div className="container">
            <div className="box" style={{ padding: '2rem' }}>
                <div className="row" >
                    <div className="col-md-6 col-sm-12">
                        <div className="leftPart">
                            <img src="/img/signup.svg" width="100%" />
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-12" style={{ width: '100%' }}>
                        <div className="rightPart">
                            <h3 className='display-4 text-center' style={{ fontFamily: 'Grand Hotel' }}>Sign up</h3>
                            <form onSubmit={handleSubmit} >
                                <div className="form-group">
                                    <input
                                        placeholder='Email'
                                        value={email}
                                        onChange={handleChange('email')}
                                        className="form-control shadow-none rounded-0"
                                        type='email'
                                        style={{ border: 'none', borderBottom: '1px solid #000', outline: 'none' }} />
                                </div>

                                <div className="form-group">
                                    <input
                                        placeholder='Password'
                                        value={password}
                                        onChange={handleChange('password')}
                                        className="form-control shadow-none rounded-0"
                                        type='password'
                                        style={{ border: 'none', borderBottom: '1px solid #000', outline: 'none' }} />
                                </div>

                                <div className="form-group">
                                    {/* <label for="password">Password</label> */}
                                    <input
                                        placeholder='Enter password again'
                                        value={rePassword}
                                        onChange={handleChange('rePassword')}
                                        className="form-control shadow-none rounded-0"
                                        type='password'
                                        style={{ border: 'none', borderBottom: '1px solid #000', outline: 'none' }} />
                                </div>


                                <div className='text-center'>
                                    <div style={{ height: '16px' }}>
                                        {showError()}
                                    </div>
                                    <a href="/signin" style={{ fontSize: '1rem', textDecoration: 'none' }}>Already have an account? Sign in</a>
                                </div>

                                <div className="form-group pt-3 text-center">
                                    <button
                                        className='btn btn-secondary buttonLogin'
                                        style={{ borderRadius: '25px', padding: '0 20px', height: '40px' }}>Submit</button>
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
            {registerForm()}
        </React.Fragment>
    )

}

export default Register;