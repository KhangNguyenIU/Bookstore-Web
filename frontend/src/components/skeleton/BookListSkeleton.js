import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

/**
* @author
* @function BookListSkeleton
**/

const BookListSkeleton = (props) => {
    return (
        <div className="container">
            <div className="row">
                {
                    Array(9).fill(1).map((a, i) => (
                        <div className="col-md-4 mb-3">
                            <Skeleton animation="wave" variant="rect" width="100%" height={400} />
                            <br/>
                            <Skeleton animation="wave" variant="text" width={100} />
                            <Skeleton animation="wave" variant="text" width={30} />
                            <br/>
                        </div>
                    ))
                }

            </div>
        </div>
    )

}

export default BookListSkeleton