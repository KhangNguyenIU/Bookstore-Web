import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDetailBook } from '../../actions/book'
import Layout from '../../components/Layout'
/**
* @author
* @function DetailBook
**/

const BookDetailPage = (props) => {

    const [book, setBook] = useState({})
    const [error, setError] = useState('')
    // get the slug from the url
    const slug = props.match.params.slug;


    const initBook = () => {
        getDetailBook(slug).then(response => {
            if (response.error) {
                setError(response.error)
            } else {
                setBook(response.book)
            }
        })
    }
    useEffect(() => {
        initBook()
    }, [])

    const bookInfor = (book) => (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <img
                            style={{ width: '100%' }}
                            src={book.photo} />
                    </div>

                    <div className="col-md-8">
                        <p style={{ fontFamily: 'Josefin Sans' }}>By
                        <Link
                                href="#"
                                style={{ textDecoration: 'none', color: "#555" }}>{book.writtenby}
                            </Link>
                        </p>
                        <h2 style={{ fontFamily: 'Cormorant Garamond', fontWeight: '500' }}>{book.title}</h2>
                        <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.5rem' }}>{book.price}</p>
                        <p style={{ fontFamily: 'Cormorant Garamond', color: '#555' }}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit. Simul vidisse eu vim. Probo tincidunt ne vel.
                </p>
                        <p>
                            Quality: 3
                </p>
                        <button className="btn btn-primary rounded-0">
                            ADD TO BASKET
                </button>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Layout>
            <React.Fragment>
                <div className="head-banner"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1453671424686-dfef17039343?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=976&q=80")',
                        height: '300px',
                        opacity: '1',
                        position: 'relative',
                        textAlign: 'center'
                    }}
                    className="container-fluid">

                    <div className="centered" style={{ color: '#fff' }}>
                        <h6>Products</h6>
                        <h2>A book a story</h2>
                    </div>

                </div>
                {book ? bookInfor(book) : (<p>Book not Found</p>)}
                <hr />
                <p>Comments</p>
                <hr />
                <p>Related books</p>
            </React.Fragment>
        </Layout>



    )

}

export default BookDetailPage