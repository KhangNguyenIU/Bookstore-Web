import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap'
import { isAuth } from '../../actions/auth';
import { UserContext } from '../../App';

const BookCard = ({ book }) => {
    const { stateUser, dispatchUser } = useContext(UserContext)
    const userEndPoint = isAuth(stateUser).role === 1 ? 'admin/' : '';
    return (
        <Card style={{ border: 'none', marginBottom: '3rem' }}>

            <Link to={`/book/${userEndPoint}${book.slug}`}><img
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
                color: 'black'
            }}>By : {book.writtenby.map((author, index) => {
                return (
                    <Link
                        to={`/author/${author.slug}`}
                        className="custom-link"
                        style={{
                            fontFamily: 'Josefin Sans',
                            color: 'gray',
                            letterSpacing: '0.25rem',
                        }}>
                        {author.name}{", "}
                    </Link>
                )
            })}</Link>


            <Link
                to={`/book/${userEndPoint}${book.slug}`}
                className="custom-link"
                style={{
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
    )
}

export default BookCard;