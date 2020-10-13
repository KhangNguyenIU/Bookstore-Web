import React from 'react'
import Banner from '../components/home/Banner'
import Layout from '../components/Layout'
import { toast, ToastContainer} from 'react-toastify'
/**
* @author
* @function Home
**/

const Home = (props) => {
    
    return (
        <Layout>
            <ToastContainer
            autoClose={2000}
            />;
            <Banner />
        </Layout>
    )

}

export default Home