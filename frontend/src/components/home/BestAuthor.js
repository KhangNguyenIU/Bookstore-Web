import React, { useEffect, useState } from 'react'
import { getBestAuthor } from '../../actions/author'
import { stringTrim } from '../../helpers/StringTrim'


/**
* @author
* @function BestAuthor
**/

const BestAuthor = (props) => {
    const [authors, setAuthors] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        getAuthors()
    }, [])

    const getAuthors = () => {
        getBestAuthor().then(response => {
            if (response.error) {
                setError(response.error)
            } else {
                setAuthors(response.data)
            }
        })
    }
    return (
        <React.Fragment>
            <div className="row mt-5 mb-5" style={{marginTop:'3rem'}}>
                <div className="col-sm-12 mb-4">
                    <p className="custom-heading text-center" style={{ fontSize: '30px' }}>
                        Author of Year </p>
                    <p className="custom-text mt-0">Client's satisfation is our most priority</p>
                </div>
                {
                    authors && authors.map((a, i) => (
                        <div className="col-md-3 text-center author">
                            <img src={a.photo} width="150px" height="150px"
                             style={{ borderRadius: '50%',objectFit:'cover' }} />
                            <p className="custom-text text-center" style={{
                                marginTop:'10px',
                                textDecoration: 'none',
                                color: 'black',
                                fontFamily: 'Cormorant Garamond',
                                fontSize: '22px',
                                fontWeight:'600'
                            }}>{a.name}</p>
                            <p className="custom-text text-center"    style={{padding:'0px 10px'}}>
                             
                                {stringTrim(a.description, 100)}</p>
                        </div>
                    ))
                }
            </div>
        </React.Fragment>
    )

}

export default BestAuthor