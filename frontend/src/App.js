import React, { useEffect, useState,createContext,useReducer } from 'react';
import { BrowserRouter, Route, Link,useHistory,Switch,withRouter,Redirect} from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import Register from './pages/auth/Register'
import Bookform from './pages/Bookform'
import Login from './pages/auth/Login';
import BooksListPage from './pages/book/BooksListPage'
import cartDetail from './pages/cartDetail'
import BookDetailPage from './pages/book/BookDetailPage'
import {reducerCart,initialCart} from './reducers/cartReducer'
import { toast, ToastContainer} from 'react-toastify'
export const CartContext=createContext();
const Routing=()=>{
  return(
    <Switch>
     <Route path='/' exact component={Home}/>
      <Route path='/signin' exact component={Login}/>
      <Route path='/signup' exact component={Register}/>
      <Route path='/books' exact component={BooksListPage}/>
      <Route path='/cartDetail' exact component={cartDetail}/>
      <Route path='/book/:slug' exact component={BookDetailPage}/>
      <Route path='/components' exact component={Bookform}/>
    </Switch>
    )
}
function App() {
  const [statecart,dispatchcart]=useReducer(reducerCart,initialCart);
  return (
    <CartContext.Provider value={{statecart,dispatchcart}}>
    <div className="App">
      <ToastContainer
				autoClose={2000}
			/>
     <BrowserRouter>
     <Routing/>
     </BrowserRouter>
    </div>
    </CartContext.Provider>
  );
}

export default App;
