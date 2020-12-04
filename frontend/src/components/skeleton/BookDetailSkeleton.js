import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
/**
* @author
* @function BookDetailSkelton
**/

const BookDetailSkelton = (props) => {
  return(
    <React.Fragment>
    <div className="container">
        <div className="row">
            <div className="col-md-4">
                <Skeleton variant="rect" width={400} height={500} />
            </div>
            <div className="col-md-8">
                <Skeleton variant="text" width={60} height={20} />
                <br/>
                <Skeleton variant="h1" width={250} height={40}/>
                <br/>
                <Skeleton variant="text" width={40} height={30}/>
                <Skeleton variant="h1" width={600} height={50} />
                <br/>
                <Skeleton variant="text" width={60} height={20}/>
                <br/>
                <Skeleton variant="text" width={400} height={30}/>
                <br/>
                <Skeleton variant="text" width={300} height={30}/>
                <br/>
                <Skeleton variant="text" width={100} height={20}/>
                <br/>
                <Skeleton variant="text" width={60} height={20}/>
            </div>
        </div>
    </div>
</React.Fragment>
   )

 }

export default BookDetailSkelton