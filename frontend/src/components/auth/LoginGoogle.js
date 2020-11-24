import React from 'react'
import GoogleLogin from 'react-google-login'
import { loginWithGoogle } from '../../actions/auth'
import {GOOGLE} from '../../react.env'
/**
* @author
* @function LoginGoogle
**/

const LoginGoogle = (props) => {

    const responseGoogle =response=>{
        const tokenId = response.tokenId;
        const user ={ tokenId}
        loginWithGoogle(user).then(response=>{
            if(response.error){
                
            }
        })
    }
  return(
    <div className="login-with-google-div">
        <GoogleLogin
            clientId={GOOGLE}
            buttonText="Google Sign in"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            theme="dark"
        />
    </div>
   )

 }

export default LoginGoogle