import React, { useEffect, useState,useContext } from 'react'
import { showAllBook } from '../../actions/book'
import Layout from '../../components/Layout'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {CartContext} from '../../App.js';
/**
* @author
* @function BookListPage
**/

const BookListPage = (props) => {
    const {statecart,dispatchcart}=useContext(CartContext);
    const [infor,setInfor]=useState("");
    const [books, setBooks] = useState([]);
    useEffect(() => {
        initShowBook();
    }, [])

    //load book first time load page
    const initShowBook = () => {
        showAllBook().then(response => {
            if (response.error) {
                console.log(response.error);
            } else {
                setBooks(response.data)
            }
        })
    }


    //show grid books
    const gridBooks = () => {
        return (
            <div className="row">
                {
                    books.map((book, index) => (
                        <div className="col-md-4">
                            <Card style={{ border: 'none', marginBottom: '5rem' }}>
                                <Link to={`/book/${book.slug}`}><img
                                    style={{ height: '400px' }}
                                    width="100%"
                                    src={book.photo}
                                    alt="Card image cap" />
                                </Link>
                                <Link style={{
                                    textDecoration: 'none',
                                    marginTop: '1rem',
                                    fontFamily: 'Josefin Sans',
                                    fontSize: '15px',
                                    letterSpacing: '0.35rem',
                                    color: 'black'
                                }}>By:{book.writtenby.map((author,index)=>{
                                    return(
                                         <Link>
                                          {author.author_id.name}{" "}
                                         </Link>
                                    )
                                })}</Link>
                                <Link style={{
                                    textDecoration: 'none',
                                    marginTop: '1rem',
                                    fontFamily: 'Josefin Sans',
                                    fontSize: '17px',
                                    letterSpacing: '0.35rem',
                                    color: 'black'
                                }}>Genre:{book.genre.map((genre,index)=>{
                                    return(
                                         <Link>
                                          {genre.genre_id.name}{"_"}
                                         </Link>
                                    )
                                })}</Link>

                                <Link style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    fontFamily: 'Cormorant Garamond',
                                    fontSize: '22px',
                                }}>{book.title}</Link>

                                <Link style={{
                                    textDecoration: 'none',
                                    fontFamily: 'Cormorant Garamond',
                                    fontWeight: '500',
                                    fontSize: '1rem',
                                    color: 'black'
                                }}>$ {book.price}</Link>
                            </Card>
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <React.Fragment>
            <Layout>
                <div className="head-banner"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=841&q=80")',
                        height: '300px',
                        opacity: '1',
                        position: 'relative',
                        textAlign: 'center'
                    }}
                    className="container-fluid">

                    <div className="centered" style={{ color: '#fff' }}>
                        <h6>Products</h6>
                        <h2>Source of Books</h2>
                    </div>

                </div>
                <div className="container mt-5">

                    <div className="row">
                    <div style={{marginLeft:'20rem'}}>
                     <input type="text" onChange={(e)=>setInfor(e.target.value)} placeholder="Enter book infor" size={20} />
                     <i class="material-icons" onClick={()=>{}}>search</i>
                    </div>
                        <div className="col-md-9">
                            <div style={{ display: 'inline-block' }}>
                                <p style={{ float: 'left' }}>
                                    Display 1-9 results of 129
                        </p>

                                <p style={{ float: 'right' }}>
                                    filter by date
                        </p>
                            </div>
                            {gridBooks()}
                        </div>

                        <div className="col-md-3" >
                            <p>Categories</p>
                        </div>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    )

}

export default BookListPage