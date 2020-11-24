import React, { useContext } from 'react'
import { Link,NavLink,Redirect } from 'react-router-dom';
import { Card } from 'reactstrap'
import { isAuth } from '../../actions/auth';
import { UserContext } from '../../App';

const BookLiked = ({ book }) => {
    const { stateUser, dispatchUser } = useContext(UserContext)
    const userEndPoint = isAuth(stateUser).role === 1 ? 'admin/' : '';
    return (
        <Card style={{ border: 'none', marginBottom:'2rem' }}>

            <Link to={`/book/${userEndPoint}${book.slug}`}><img
                style={{ height: '280px' }}
                width="70%"
                src={book.photo}
                alt="Card image cap"/>
            </Link>
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

export default BookLiked;