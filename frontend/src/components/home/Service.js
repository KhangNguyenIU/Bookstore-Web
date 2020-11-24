import React from 'react'

/**
* @author
* @function Service
**/

const Service = (props) => {
    return (
        <div className="row mt-5">
            <div className="col-sm-12">
                <p className="custom-heading text-center" style={{ fontSize: '30px' }}>
                    Our Services </p>
                <p className="custom-text mt-0">Client's satisfation is our most priority</p>
            </div>
            <br />
            <div className="col-sm-6 col-md-3">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src="/img/joy.png" width='80%' height="220px" />
                    <p className="custom-heading">Reading Choice</p>
                    <p className="custom-text px-5">Except sint occaecat cupi datat non proident, sunt culpa qui officia desemi.</p>
                </div>

            </div>

            <div className="col-sm-6 col-md-3">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src="/img/reading.png" width='80%' height="220px" />
                    <p className="custom-heading">Value Guarentee</p>
                    <p className="custom-text px-5">Except sint occaecat cupi datat non proident, sunt culpa qui officia desemi.</p>
                </div>
            </div>
            <div className="col-sm-6 col-md-3">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src="/img/shipping.png" width='80%' height="220px" />
                    <p className="custom-heading">Fast and Saving Shipping</p>
                    <p className="custom-text px-5">Except sint occaecat cupi datat non proident, sunt culpa qui officia desemi.</p>
                </div>
            </div>

            <div className="col-sm-6 col-md-3">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img src="/img/refund.png" width='80%' height="220px" />
                    <p className="custom-heading">Refund Money</p>
                    <p className="custom-text px-5">Except sint occaecat cupi datat non proident, sunt culpa qui officia desemi.</p>
                </div>
            </div>
        </div>
    )

}

export default Service 