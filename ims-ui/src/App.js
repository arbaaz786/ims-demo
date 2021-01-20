import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './images/jdent.png';
// import AllEntries from "./AllEntries";
import NewNote from './NewNote';
import EditNote from './EditNote';
import NewEntry from './NewEntry';
// import EditEntry from "./EditEntry";
import CreateInvoice from './CreateInvoice';
import AllInvoices from './AllInvoices';
import EditInvoice from './EditInvoice';
// import AllNotes from './AllNotes';
import PrintInvoice from './PrintInvoice';
import UpdateInvoice from './UpdateInvoice';

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
              Demo
            </Link>
          </div>
          <div className='navbar-end'>
            {/* <Link to="/" className="navbar-item">
              All Entries
            </Link> */}
            {/* <Link to='/' className='navbar-item'>
              All Notes
            </Link> */}
            {/* <Link to='/' className='navbar-item'>
              All Notes
            </Link> */}
            {/* <Link to="/newentry" className="navbar-item">
              New Enrty
            </Link> */}
            {/* <Link to='/invoices' className='navbar-item'>
              ALL Invoice
            </Link> */}
            <Link to='/newinvoice' className='navbar-item'>
              Create Invoice
            </Link>
            {/* <Link to='/newnote' className='navbar-item'>
              Update Invoice
            </Link> */}
            {/* <Link to='/newnote' className='navbar-item'>
              Create Note
            </Link> */}
          </div>
        </nav>
        {/* <Route exact path="/" component={AllEntries} /> */}
        <Route exact path='/invoices' component={AllInvoices} />
        <Route exact path='/' component={AllInvoices} />
        <Route path='/newnote' component={NewNote} />
        <Route path='/newentry' component={NewEntry} />
        <Route path='/newinvoice' component={CreateInvoice} />
        <Route path='/invoice/:id' component={EditInvoice} />
        <Route path='/printinvoice/:id' component={PrintInvoice} />
        <Route path='/note/:id' component={EditNote} />
        <Route path='/updateInvoice/:id' component={UpdateInvoice} />
        {/* <Route path="/entry/:id" component={EditEntry} /> */}
      </div>
      {/* 
<footer className="footer is-fixed-bottom App-heade">
  <div className="content has-text-centered">
    <p>
      <strong>Invoice Managment Application</strong> by <a href="https://www.linkedin.com/in/arbaaz-shikalgar-05031994/">Arbaaz Shikalgar</a>. The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. © Copyright 2020 arbaazshikalgar.com. All Rights Reserved.
    </p>
  </div>
</footer> */}
    </Router>
  );
}

export default App;
