import { Button } from '@material-ui/core'
import React from 'react'

/**
* @author
* @function Benefit
**/

const Benefit = (props) => {
    return (
        <React.Fragment>
            <div className="row mt-4 mb-5">
                <div className="col-sm-6">
                    <div className="benefit">
                    <p className="custom-text text-center" style={{
                                marginTop:'10px',
                                textDecoration: 'none',
                                color: 'black',
                                fontFamily: 'Cormorant Garamond',
                                fontSize: '22px',
                                fontWeight:'600'
                            }}>Benefit of Reading Book</p>
                        <p className="custom-text text-left">
                            Reading is important because it develops our thoughts, gives us endless knowledge and lessons while keeping our minds active. Books can hold and keep all kinds of information, stories, thoughts and feelings unlike anything else in this world. The importance of a book to help us learn and understand things cannot be underestimated.
                    </p>
                        <Button variant="outlined" color="secondary">Read More</Button>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="benefit-img">
                        <div >
                            <img height="300px" 
                                src="https://assets.website-files.com/5e3acb08a305e2bb3bd6711c/5e590b37cc34c3f43e05689d_Executive%20Coaching.png" />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default Benefit