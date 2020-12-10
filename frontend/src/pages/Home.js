import React, { useEffect, useState } from 'react'
import { showAllBook } from '../actions/book'
import BookCard from '../components/book/BookCard'
import Banner from '../components/home/Banner'
import Benefit from '../components/home/Benefit'
import BestAuthor from '../components/home/BestAuthor'
import Service from '../components/home/Service'
import Layout from '../components/Layout'

/**
* @author
* @function Home
**/

const gridBook = (books) => (
    <React.Fragment>
        <div className="row mt-5 mb-5">
            <div className="col-sm-12">
                <p className="custom-heading">Online Shop</p>
            </div>
            <div className="col-sm-12">
                <p className="custom-text">We supply the most updated book in the market place</p>
            </div>

            {books && books.map((b, i) => (
                <div className="col-md-3">
                    <BookCard book={b} />
                </div>

            ))}

        </div>
    </React.Fragment>
)
const Home = (props) => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        initBooks()
    }, [])

    const initBooks = () => {
        showAllBook(8, 1, "createdAt", "1").then(response => {
            if (response.error) {
                console.log(response.error);
            } else {
                setBooks(response.data)
            }
        })
    }
    return (
        <Layout>
            <div className="container">
                <Banner />
                <Service />
                {gridBook(books)}
                <Benefit/>
                <BestAuthor/>
            </div>

        </Layout>
    )

}

export default Home