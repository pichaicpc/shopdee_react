import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import PrivacyPolicy from './components/PrivacyPolicy';
import Home from './components/Home';
import AdminLogin from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import CustomerIndex from './components/admin/customer/Index';
import CustomerCreate from './components/admin/customer/Create';
import CustomerView from './components/admin/customer/View';
import CustomerUpdate from './components/admin/customer/Update';

import OrderIndex from './components/admin/order/Index';
import OrderView from './components/admin/order/View';
import PaymentView from './components/admin/payment/View';



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/> 
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/privacypolicy' element={<PrivacyPolicy/>}/>

        <Route exact path='/admin' element={<Dashboard/>}/>
        <Route exact path='/admin/login' element={<AdminLogin/>}/>        
        <Route exact path='/admin/customer' element={<CustomerIndex/>}/>
        <Route exact path='/admin/customer/create' element={<CustomerCreate/>}/>  
        <Route exact path='/admin/customer/view/:id' element={<CustomerView/>}/>      
        <Route exact path='/admin/customer/update/:id' element={<CustomerUpdate/>}/>

        <Route exact path='/admin/order' element={<OrderIndex/>}/>
        <Route exact path='/admin/order/view/:id' element={<OrderView/>}/>
        
        <Route exact path='/admin/payment/view/:id' element={<PaymentView/>}/>
      </Routes>
    </Router>
  );
}

export default App;
