import React from 'react'
import { useState } from 'react'
import { Link, useHistory, Router } from 'react-router-dom'
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
import { isAuth, signout } from '../actions/auth';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css';

/**
* @author
* @function NavBar
**/

const NavBar = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const history = useHistory()
	React.useState(nprogress.start());
	React.useEffect(() => {
		nprogress.done();
		return () => nprogress.start();
	  });
	const toggle = () => setIsOpen(!isOpen);
	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand href="/">
					Bookstore
        </NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto mr-auto" navbar>
						<NavItem>
							<NavLink href="/components">Products</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="">Contact:123-456-789</NavLink>
						</NavItem>
						<UncontrolledDropdown nav inNavbar>
						</UncontrolledDropdown>
					</Nav>

					{!isAuth() ?
						(
							<Nav>
								<NavLink href="/signin">Sign in</NavLink>
								<NavLink href="/signup">Sign up </NavLink>
							</Nav>
						) :
						(
							<Nav>
								<NavLink href="/profile">User</NavLink>
								<NavLink
									onClick={() => signout(() => history.push('/signin'))}
								>Sign Out </NavLink>
							</Nav>
						)
					}
				</Collapse>
			</Navbar>
		</div>
	)

}

export default NavBar