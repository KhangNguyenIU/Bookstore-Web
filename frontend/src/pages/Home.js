import React from 'react'
import Banner from '../components/home/Banner'
import Layout from '../components/Layout'

/**
* @author
* @function Home
**/

const Home = (props) => {

    return (
        <Layout>
            <div className="container">
                <Banner />
            </div>

        </Layout>
    )

}

export default Home