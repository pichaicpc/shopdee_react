import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import AdminSignIn from './components/admin/SignIn'
import Customer from './components/admin/Customer';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/signin' element={<SignIn/>}/> 
        <Route exact path='/signup' element={<SignUp/>}/>
        <Route exact path='/admin/signin' element={<AdminSignIn/>}/>
        <Route exact path='/admin/customer' element={<Customer/>}/>

      </Routes>
    </Router>
  );
}

export default App;
