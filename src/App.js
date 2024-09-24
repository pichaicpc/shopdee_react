import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import AdminLogin from './components/admin/Login';
import CustomerHome from './components/admin/customer/Home';
import CustomerCreate from './components/admin/customer/Create';
import CustomerUpdate from './components/admin/customer/Update';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/signin' element={<SignIn/>}/> 
        <Route exact path='/signup' element={<SignUp/>}/>
        <Route exact path='/admin/login' element={<AdminLogin/>}/>
        <Route exact path='/admin/customer' element={<CustomerHome/>}/>
        <Route exact path='/admin/customer/create' element={<CustomerCreate/>}/>        
        <Route exact path='/admin/customer/update/:id' element={<CustomerUpdate/>}/>

      </Routes>
    </Router>
  );
}

export default App;
