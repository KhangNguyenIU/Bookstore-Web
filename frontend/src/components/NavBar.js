import React from 'react'
import { useState} from 'react'
import {Link} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    NavbarText
  } from 'reactstrap';
/**
* @author
* @function NavBar
**/

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
  return(
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
            Bookstore
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Products</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">Contact</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              
            </UncontrolledDropdown>
          </Nav>
          <NavLink href="/signin">Sign in</NavLink>
          <NavLink href="/signup">Sign up </NavLink>
        </Collapse>
      </Navbar>
    </div>
   )

 }

export default NavBar