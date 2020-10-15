import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'

import Register from './pages/auth/Register'
import Bookform from './pages/Bookform'
import Login from './pages/auth/Login';
import BooksListPage from './pages/book/BooksListPage'
import BookDetailPage from './pages/book/BookDetailPage'
import { toast, ToastContainer} from 'react-toastify'
function App() {
  return (
    <div className="App">
      <ToastContainer
				autoClose={2000}
			/>
     <BrowserRouter>
      <Route path='/' exact component={Home}/>
      <Route path='/signin' exact component={Login}/>
      <Route path='/signup' exact component={Register}/>
      <Route path='/books' exact component={BooksListPage}/>
      <Route path='/book/:slug' exact component={BookDetailPage}/>
      <Route path='/components' exact component={Bookform}/>
     </BrowserRouter>
    </div>
  );
}

export default App;
