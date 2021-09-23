import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './images/mindvein.png';
import NewNote from './NewNote';
import EditNote from './EditNote';
import AllProducts from './AllProduct';
import LabTest from './home/labtest/LabTest';
import ProductDetails from './home/product/product-details/ProductDetails';

function App() {
  return (
    <Router>
      <div>
        <nav
          className='navbar  is-fixed-top App-header'
          role='navigation'
          aria-label='main navigation'
        >
          <img src={logo} className='logo' alt={'logo'} />
          <div className='navbar-brand'>
            <Link to='/' className='navbar-item'>
              <i className='fas fa-home fa-2x'></i>
            </Link>
          </div>
          <div className='navbar-end'>
           
            <Link to='/' className='navbar-item'>
             MEDICINES
            </Link>
            <Link to='/labtest' className='navbar-item'>
             LAB TEST
            </Link>
            <Link to='/' className='navbar-item'>
             Consultation
            </Link>
            <Link to='/' className='navbar-item'>
             Treatment Vblogs
            </Link>
            <Link to='/newnote' className='navbar-item'>
             Product Entry
            </Link>
          </div>
        </nav>
        <Route exact path='/' component={AllProducts} />
        <Route path='/newnote' component={NewNote} />
        <Route path='/note/:id' component={EditNote} />
        <Route path='/labtest' component={LabTest} />
        <Route path='/productdetails/:id' component={ProductDetails} />
      </div>
    </Router>
  );
}

export default App;
