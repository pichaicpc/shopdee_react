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

import EmployeeIndex from './components/admin/employee/Index';
import EmployeeCreate from './components/admin/employee/Create';
import EmployeeView from './components/admin/employee/View';
import EmployeeUpdate from './components/admin/employee/Update';

import ProductIndex from './components/admin/product/Index';
import ProductCreate from './components/admin/product/Create';
import ProductView from './components/admin/product/View';
import ProductUpdate from './components/admin/product/Update';

import ProductTypeIndex from './components/admin/producttype/Index';
import ProductTypeCreate from './components/admin/producttype/Create';
import ProductTypeView from './components/admin/producttype/View';
import ProductTypeUpdate from './components/admin/producttype/Update';



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

        <Route exact path='/admin/employee' element={<EmployeeIndex/>}/>
        <Route exact path='/admin/employee/create' element={<EmployeeCreate/>}/>  
        <Route exact path='/admin/employee/view/:id' element={<EmployeeView/>}/>      
        <Route exact path='/admin/employee/update/:id' element={<EmployeeUpdate/>}/>

        <Route exact path='/admin/product' element={<ProductIndex/>}/>
        <Route exact path='/admin/product/create' element={<ProductCreate/>}/>  
        <Route exact path='/admin/product/view/:id' element={<ProductView/>}/>      
        <Route exact path='/admin/product/update/:id' element={<ProductUpdate/>}/>
        
        <Route exact path='/admin/producttype' element={<ProductTypeIndex/>}/>
        <Route exact path='/admin/producttype/create' element={<ProductTypeCreate/>}/>  
        <Route exact path='/admin/producttype/view/:id' element={<ProductTypeView/>}/>      
        <Route exact path='/admin/producttype/update/:id' element={<ProductTypeUpdate/>}/>
        
        
      </Routes>
    </Router>
  );
}

export default App;
