import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './images/jdent.png';
// import AllEntries from "./AllEntries";
// import NewNote from './NewNote';
// import EditNote from './EditNote';
// import NewEntry from './NewEntry';
// import EditEntry from "./EditEntry";
import CreateInvoice from './CreateInvoice';
// import AllInvoices from './AllInvoices';
// import EditInvoice from './EditInvoice';
// import AllNotes from './AllNotes';
import PrintInvoice from './PrintInvoice';
import UpdateInvoice from './UpdateInvoice';
import ListOfInvoices from './ListOfInvoice';
import SMSForm from './SMSForm';

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
            <Link to='/sms' className='navbar-item'>
              Send SMS
            </Link>
            {/* <Link to='/' className='navbar-item'>
              All Notes
            </Link> */}
            {/* <Link to="/newentry" className="navbar-item">
              New Enrty
            </Link> */}
            {/* <Link to='/listOfInvoices' className='navbar-item'>
              listOfInvoices
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
        {/* <Route exact path='/invoices' component={AllInvoices} /> */}
        {/* <Route exact path='/' component={AllInvoices} /> */}
        <Route exact path='/' component={ListOfInvoices} />
        {/* <Route path='/newnote' component={NewNote} /> */}
        {/* <Route path='/newentry' component={NewEntry} /> */}
        {/* <Route path='/note/:id' component={EditNote} /> */}
        <Route path='/newinvoice' component={CreateInvoice} />
        {/* <Route path='/invoice/:id' component={EditInvoice} /> */}
        <Route path='/printinvoice/:id' component={PrintInvoice} />
        <Route
          path='/updateInvoice/:srNo/:totalAmount/:deliveryNoteDate/:deliveryNote/:id'
          component={UpdateInvoice}
        />
        <Route path='/sms' component={SMSForm} />
        {/* <Route path="/entry/:id" component={EditEntry} /> */}
      </div>
    </Router>
  );
}

export default App;
