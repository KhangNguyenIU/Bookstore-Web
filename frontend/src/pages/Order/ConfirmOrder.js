import React, { useEffect, useState } from 'react'
import { confirmOrder } from '../../actions/order'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
/**
* @author
* @function ConfirmOrder
**/

const ConfirmOrder = (props) => {
    const [values, setValues] = useState({
        error: '',
        success: ''
    })

    const token = props.match.params.token
    useEffect(() => {
        cofirmingOrder()
    }, [])

    const { success, error } = values
    const cofirmingOrder = () => {
        confirmOrder(token).then(response => {
            console.log(response);
            if (response.error) {
                setValues({
                    ...values,
                    error: "error in confirm order"
                })
            } else {
                setValues({
                    ...values,
                    success: response.msg
                })
            }
        })
    }

    return (
        <React.Fragment>
            <div className="box">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div >
                                {success && <CheckCircleOutlineOutlinedIcon
                                    style={{ width: "200px", height: "200px", color: "green", margin:'20px' }}
                                />}
                                {error && <ErrorOutlinedIcon fontSize="large" color="red" />}
                            </div>

                            <div className="text-center" style={{margin:'0 20px'}}>
                                {success && (<p className="custom-text" style={{color:'black'}}>{success}</p>)}
                                {error && (<p className="custom-text">{error}</p>)}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </React.Fragment>
    )

}

export default ConfirmOrder