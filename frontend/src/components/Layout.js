import React from 'react'
import FooterNav from './Footer'
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
        <FooterNav/>
    </React.Fragment>
   )

 }

export default Layout