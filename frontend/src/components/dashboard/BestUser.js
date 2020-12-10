import React from 'react'
import { userHandling } from '../../helpers/userHandle';
import {Avatar} from '@material-ui/core'
import moment from 'moment'
/**
* @author
* @function BestUser
**/

const BestUser = ({ data }) => {

    const users = userHandling(data)
    console.log("user", users);
    return (
        <React.Fragment>

            {
                users.map((u, i) => (
                    <div className="user-list">
                        <Avatar src={u.photo} />
                        <div className="text-left w-50 ml-3">
                            <p className="custom-text text-left m-0">{u.username}</p>
                            <p style={{fontSize:'13px', color:'gray',margin:'0px'}}>{u.email}</p>
                        </div>
                        <div className="text-right ml-5">
                            <p className="custom-text text-left m-0">$ {u.total}</p>
                            <p style={{fontSize:'12px', color:'gray',margin:'0px'}}>{moment(u.createdAt).format('MMM DD')}</p>
                        </div>
                    </div>
                ))
            }
        </React.Fragment>
    )

}

export default BestUser