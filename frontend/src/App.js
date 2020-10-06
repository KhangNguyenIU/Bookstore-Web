import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'

function App() {

  
 
  return (
    <div className="App">
     <BrowserRouter>
      <Route path='/' exact component={Home}/>
     </BrowserRouter>
    </div>
  );
}

export default App;
