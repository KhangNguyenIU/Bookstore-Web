import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'

import Register from './pages/auth/Register'
import Bookform from './pages/Bookform'
import Login from './pages/auth/Login';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Route path='/' exact component={Home}/>
      <Route path='/signin' exact component={Login}/>
      <Route path='/signup' exact component={Register}/>
      <Route path='/components' exact component={Bookform}/>
     </BrowserRouter>
    </div>
  );
}

export default App;
