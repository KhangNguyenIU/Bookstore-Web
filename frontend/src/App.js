import React, { useEffect, useState, createContext, useReducer, useContext } from 'react';
import { BrowserRouter, Route, Link, useHistory, Switch, withRouter, Redirect } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import Register from './pages/auth/Register'
import Bookform from './pages/Bookform'
import Login from './pages/auth/Login';
import BooksListPage from './pages/book/BooksListPage'
import cartDetail from './pages/cartDetail'
import User from './pages/dashboard/User'
import OrderDetail from './pages/Order/OrderDetail'
import BookDetailPage from './pages/book/BookDetailPage'
import UserUpdateInfor from './pages/UserUpdateInfor';
import { reducerCart, initialCart } from './reducers/cartReducer'
import { toast, ToastContainer } from 'react-toastify'
import BookUpdate from './pages/book/BookUpdate';
import { initialUser, reducerUser } from './reducers/userReducer';
import Admin from './pages/dashboard/Admin';
import UserPageAdmin from './pages/dashboard/UserPageAdmin';
import ConfirmOrder from './pages/Order/ConfirmOrder';
export const CartContext = createContext();
export const UserContext = createContext();
const Routing = () => {
  const {stateUser, dispatchUser} = useContext(UserContext)
  const {statecart, dispatchcart} = useContext(CartContext)
  const history = useHistory()
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    const cart = JSON.parse(localStorage.getItem("cart"))
    const total=JSON.parse(localStorage.getItem("total"))
    if(cart){
      dispatchcart({type:"ADD", payload:cart})
    }
    if(user){
      dispatchUser({type:"LOGIN",payload:user})
    }
    
  },[])
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/signin' exact component={Login} />
      <Route path='/signup' exact component={Register} />
      <Route path='/books' exact component={BooksListPage} />
      <Route path='/cartDetail' exact component={cartDetail} />
      <Route path='/userUpdate' exact component={UserUpdateInfor} />
      <Route path='/profile/:name' exact component={User} />
      <Route path='/user/:id' exact component={UserPageAdmin} />
      <Route path='/books/:genre' exact component={BooksListPage} />
      <Route path='/books/search/:bookSearch' exact component={BooksListPage} />
      <Route path='/orderDetail/:_id' exact component={OrderDetail} />
      <Route path='/book/:slug' exact component={BookDetailPage} />
      <Route path='/book/admin/:slug' exact component={BookUpdate} />
      <Route path='/addBook' exact component={Bookform} />
      <Route path='/admin' exact component={Admin}/>
      <Route path='/auth/order/confirm/:token' exact component={ConfirmOrder}/>
    </Switch>
  )
}
function App() {
  const [statecart, dispatchcart] = useReducer(reducerCart, initialCart);
  const [stateUser, dispatchUser] = useReducer(reducerUser, initialUser)
  return (
    <UserContext.Provider value={{stateUser, dispatchUser}}>
      <CartContext.Provider value={{ statecart, dispatchcart }}>
        <div className="App">
          <ToastContainer
            autoClose={2000}
          />
          <BrowserRouter>
            <Routing />
          </BrowserRouter>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>

  );
}

export default App;
