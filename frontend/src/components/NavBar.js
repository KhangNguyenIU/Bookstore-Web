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
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	popover: {
		pointerEvents: 'none',
		position: 'absolute'
	},
	paper: {
		padding: theme.spacing(1),
	},
}));
/**
* @author
* @function NavBar
**/

const NavBar = (props) => {
	const classes = useStyles()
	const [isOpen, setIsOpen] = useState(false);
	const history = useHistory();

	const { statecart, dispatchcart } = useContext(CartContext);

	const { stateUser, dispatchUser } = useContext(UserContext)
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const toggle = () => setIsOpen(!isOpen);
	return (
		<React.Fragment>
			<div>
				<Navbar color="white" light expand="md" style={{ position: 'relative' }}>
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
										>
											<Link
												to="/admin"
												className="custom-link">Admin Dashboard</Link>
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
											<div >
												<NavLink style={{ color: 'black' }} onMouseEnter={handlePopoverOpen}
													onMouseLeave={handlePopoverClose}>
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

												<Popover
													id="mouse-over-popover"
													className={classes.popover}
													classes={{
														paper: classes.paper,
													}}
													open={open}
													anchorEl={anchorEl}
													anchorOrigin={{
														vertical: 'bottom',
														horizontal: 'left',
													}}
													transformOrigin={{
														vertical: 'top',
														horizontal: 'left',
													}}
													onClose={handlePopoverClose}
													//disableRestoreFocus
												>
													<List className={classes.root}>
														{
															statecart && statecart.items.map((book, i) => (
																<div>
																	<ListItem>
																	<div className='d-flex'>
																		<div>
																			<img src={book.photo} width="40px" height="50px" />
																		</div>
																		<div className="ml-3">
																			<p className="custom-text">{book.title}</p>
																			<div className="d-flex justify-content-between" >
																				<p className="custom-text m-0">amount: {book.amount}</p>
																				<p className="custom-text m-0">$ ${book.realprice}</p>
																			</div>
																		</div>															
																	</div>
																</ListItem>
																<Divider/>
																</div>
															))
														}

														<ListItem style={{margin:'0px'}}>
															<div className="d-flex m-1 text-center">
																<p>Total: </p>
																<p> ${statecart.total}</p>
															</div>
														</ListItem>
													</List>
												</Popover>
											</div>

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