import React,{ useState,useContext,useEffect } from 'react'
import {CartContext} from '../App.js';
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
import { IoMdLogOut } from 'react-icons/io'
import { isAuth, signout } from '../actions/auth';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css';
/**
* @author
* @function NavBar
**/

const NavBar = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const history = useHistory();
	React.useState(nprogress.start());
	const {statecart,dispatchcart}=useContext(CartContext);
	React.useEffect(() => {
		nprogress.done();
		return () => nprogress.start();
	});
	const toggle = () => setIsOpen(!isOpen);
	return (
		<React.Fragment>
			<div>
				<Navbar color="white" light expand="md">
					<NavbarBrand href="/">
						<img
						height="50px"
						style={{marginLeft:'2rem'}}
						src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/08/logo.png"/>
        </NavbarBrand>
					<NavbarToggler onClick={toggle} />
					<Collapse isOpen={isOpen} navbar>
						<Nav className="ml-auto mr-auto" navbar>
							<NavItem>
							<NavLink><Link to="/books">Product</Link></NavLink>
							</NavItem>
							<NavItem>
							 <NavLink><Link to="">Contact:123-456-789</Link></NavLink>
							</NavItem>
							<UncontrolledDropdown nav inNavbar>
							</UncontrolledDropdown>
						</Nav>

						{!isAuth() ?
							(
								<Nav >
									<NavItem>
										<NavLink style={{color:'black'}} href="/signin">Sign in</NavLink>
									</NavItem>

									<NavItem>
										<NavLink style={{color:'black'}} href="/signup">Sign up </NavLink>
									</NavItem>
								</Nav>
							) :
							(
								<Nav>
									{
										isAuth().role ===1 && 
										(<NavLink style={{color:'black',alignItems:'center'}} href="/profile">Admin Dashboard</NavLink>)
									}
									{
										isAuth().role ===0 &&
										 (<NavLink href="/profile">
											 <img 
											 height="36px"
											 src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"/></NavLink>
											 )&&(<Link to="/cartDetail">Cart({statecart.items.length})</Link>)
									}
									
									<NavLink
										onClick={() => signout(() => {localStorage.setItem("user","");localStorage.setItem("role",-1); dispatchcart({type:"CANCEL",payload:null});history.push('/signin')})}
									><IoMdLogOut size="2rem" color="black" cursor="pointer" /></NavLink>
								</Nav>
							)
						}
					</Collapse>
				</Navbar>
			</div>
		</React.Fragment>

	)

}

export default NavBar