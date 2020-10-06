import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

/**
* @author
* @function Layout
**/

const Layout = ({children}) => {
  return(
    <React.Fragment>
        <NavBar/>
        {children}
        <Footer/>
    </React.Fragment>
   )

 }

export default Layout