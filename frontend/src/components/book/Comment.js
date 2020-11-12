import { Avatar } from '@material-ui/core'
import React from 'react'
import moment from 'moment'
/**
* @author
* @function Comment
**/

const Comment = ({ comment }) => {
    return (
        <React.Fragment>
            <div style={{ display: 'flex',alignItems:'center' }}>
                <div style={{ width:'6rem'}}>
                    <Avatar style={{width: '3rem', height:'3rem' }}
                    src={comment.postedby.photo} alt={comment.postedby.username} />
                </div>

                <div>
                    <div className="d-flex" style={{margin:'0', alignItems:'center'}}>
                        <p className="custom-text m-0 " style={{fontSize:'30px'}}>{comment.postedby.username}</p>
                        <p className="ml-5 mb-0 custom-text">{moment(comment.date).fromNow()}</p>
                    </div>

                    <p className="custom-text">{comment.comment} </p>
                </div>
            </div>
            <hr/>
        </React.Fragment>
    )

}

export default Comment