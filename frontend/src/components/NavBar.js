import React, { useState, useContext, useEffect } from 'react'
import { CartContext, UserContext } from '../App.js';
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
} from 'reactstrap';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { IoMdLogOut } from 'react-icons/io'
import { isAuth, removeLocalStorage, signout } from '../actions/auth';
import Avatar from '@material-ui/core/Avatar';

// import nprogress from 'nprogress'
// import 'nprogress/nprogress.css';
/**
* @author
* @function NavBar
**/

const NavBar = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const history = useHistory();
	//React.useState(nprogress.start());
	const { statecart, dispatchcart } = useContext(CartContext);
	// React.useEffect(() => {
	// 	nprogress.done();
	// 	return () => nprogress.start();
	// });
	const { stateUser, dispatchUser } = useContext(UserContext)

	const toggle = () => setIsOpen(!isOpen);
	return (
		<React.Fragment>
			<div>
				<Navbar color="white" light expand="md">
					<NavbarBrand href="/">
						<img
							height="50px"
							style={{ marginLeft: '2rem' }}
							src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/08/logo.png" />
					</NavbarBrand>
					<NavbarToggler onClick={toggle} />
					<Collapse isOpen={isOpen} navbar>
						<Nav className="ml-auto mr-auto" navbar>
							<NavItem>
								<NavLink ><Link className="custom-link" to="/books">Product</Link></NavLink>
							</NavItem>
							<NavItem>
								<NavLink ><Link className="custom-link" to="/contact">Contact</Link></NavLink>
							</NavItem>
							<UncontrolledDropdown nav inNavbar>
							</UncontrolledDropdown>
						</Nav>

						{!isAuth(stateUser) ?
							(
								<Nav >
									<NavItem>
										<NavLink style={{ color: 'black' }} href="/signin">Sign in</NavLink>
									</NavItem>

									<NavItem>
										<NavLink color="black" style={{ color: 'black' }} href="/signup">Sign up </NavLink>
									</NavItem>
								</Nav>
							) :
							(
								<Nav>
									{
										isAuth(stateUser).role === 1 &&
										(<NavLink style={{ color: 'black', alignItems: 'center' }}
											href="/profile">
											<Link className="custom-link">Admin Dashboard</Link>
										</NavLink>)
									}
									{
										isAuth(stateUser).role === 0 &&
										(<NavLink >
											<Link to={`/profile/${stateUser.username}`}>
												<IconButton>
													<Avatar src={stateUser.photo} />
												</IconButton>
											</Link>
										</NavLink>
										)
									}
									{
										isAuth(stateUser).role === 0 &&
										(
											<NavLink style={{ color: 'black' }}>
												<Link to="/cartDetail">
													<IconButton>
														<Badge badgeContent={statecart.items.length} color="secondary">
															<AddShoppingCartRoundedIcon
																color={statecart.items.length > 0 ? "secondary" : "primary"}
																fontSize="large"
															/>
														</Badge>
													</IconButton>
												</Link>
											</NavLink>

										)
									}

									<NavLink style={{ marginTop: '0px' }}
										onClick={() => signout(() => { dispatchUser({ type: "LOGOUT", payload: null }); removeLocalStorage("cart"); history.replace('/signin') })}
									>
										<IconButton>
											<IoMdLogOut size="2rem" color="black" cursor="pointer" />

										</IconButton>
									</NavLink>
								</Nav>
							)
						}
					</Collapse>
				</Navbar>
			</div>
		</React.Fragment >

	)

}

export default NavBar