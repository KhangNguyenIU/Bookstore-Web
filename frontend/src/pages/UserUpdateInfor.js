import React, { useEffect, useState, useContext, Component } from 'react'
import { getCookie} from '../actions/auth'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { UserContext } from '../App.js'
import { useHistory } from 'react-router-dom'
import { updateUserInfor} from '../actions/user'
import Layout from '../components/Layout'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
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

const UserUpdateInfor = (props) => {
    const history = useHistory()
    const _id = props.match.params._id
    const classes = useStyles()
    const [isOpenSuccess, setOpenSucess] = useState(false)
    const [isOpenError, setOpenError] = useState(false)
    const { stateUser, dispatchUser } = useContext(UserContext);
    const token = getCookie('token')
    const [values, setValues] = useState({
        error: '',
        loading: false,
        success: '',
        email: JSON.parse(localStorage.getItem("user")).email||'',
        url:'',
        formData: '',
        username: JSON.parse(localStorage.getItem("user")).username||'',
        oldpassword:'',
        newpassword:'',
        reenterpassword:''
    })
    const {url, email, formData, username,oldpassword, newpassword,reenterpassword, success, error, loading } = values


    useEffect(() => {
        // setValues({ ...values,
        //      formData:new FormData() 
        //     });
        initData();
    }, [])

    const initData = () => {
                setValues({
                    ...values,
                    formData: new FormData(),
                    email: stateUser.email,
                    username: stateUser.username,
                    url:stateUser.photo,
                    oldpassword:'',
                    newpassword:'',
                    reenterpassword:'',
                    error: '',
                    loading: false,
                    success: ''
                })
                /*formData.set('email',email);
                formData.set('username',username);
                formData.set('oldpassword',oldpassword);
                formData.set('newpassword',newpassword);
                formData.set('reenterpassword',reenterpassword);*/
          

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
    const updatePhoto=(file)=>{
        const data=new FormData();
        data.append("upload_preset","bookstore");
        data.append("file",file);
        data.append("cloud_name","dhorn9l86");
        fetch("https://api.cloudinary.com/v1_1/dhorn9l86/image/upload",{
            method:"post",
            body:data
       })
       .then(res=>res.json())
       .then(obj=>{
           formData.set('url', String(obj.url));
           //setUrl(obj.url); 
           setValues({
            ...values,
            formData,
            success: '',
            error: '',
            ['url']: obj.url
        })
           console.log(formData.url);
       })
    }

    const hangdleSubmit = () => {
        let dataForm = new FormData();
        updateUserInfor(formData).then(response => {
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
                    success: `User information has been updated sucessfully.`
                })
                dispatchUser({type:"LOGIN", payload:response.data})
                localStorage.setItem("user",JSON.stringify(response.data));
                setOpenSucess(true);
                //toast.info(success)da
                //history.go(0)
            }
        }).catch(err => {
            console.log(err);
        })
        console.log(formData);

    }
    const userForm = () => (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            style={{ width: '100%' }}
                            src={url||JSON.parse(localStorage.getItem('user')).photo} />
                             <Button
                                className="custom-button"
                                variant="contained"
                                size="medium"
                                style={{float:'right'}}
                                startIcon={<PhotoCamera/>}
                             > <input className="custome-input-file" type="file" onChange={(e)=>{updatePhoto(e.target.files[0])}}/>
                             </Button>
                    </div>

                    <div className="col-md-8">
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <form className={classes.root}>
                                        <label>Email</label>
                                        <input
                                            className="custom-input"
                                            onChange={handleChange('email')}
                                            value={email} type="email"
                                        />

                                        <label>Username</label>
                                        <br />
                                        <input
                                            className="custom-input-number"
                                            value={username} type="text"
                                            onChange={handleChange('username')}
                                        />

                                        <br />
                                        <label>Old Password</label>
                                        <br />
                                        <input
                                            className="custom-input-number"
                                            value={oldpassword} type="text"
                                            onChange={handleChange('oldpassword')}
                                        />

                                        <br />
                                        <label>New Password</label>
                                        <br />
                                        <input
                                            className="custom-input-number"
                                            value={newpassword} type="text"
                                            onChange={handleChange('newpassword')}
                                            defaultValue=''
                                        />
                                        <br />
                                        <label>Re enter New Password</label>
                                        <br />
                                        <input
                                            className="custom-input-number"
                                            value={reenterpassword} type="text"
                                            onChange={handleChange('reenterpassword')}
                                        />

                                    </form>
                                </div>
                            </div>
                        </form>
                        <p style={{ margin: '20px auto' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                type="submit"
                                color="secondary"
                                onClick={hangdleSubmit}
                                startIcon={<CloudUploadIcon />}>Upload
                    </Button>
                        </p>

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
                <h6>User Information</h6>
                <h2>Update Form</h2>
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
                open={error ?true :false}
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
                {stateUser ? userForm() : (<p>User not exist</p>)}
            </React.Fragment>
        </Layout>
    )

}

export default UserUpdateInfor;
