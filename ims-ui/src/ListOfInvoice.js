import React from 'react';
import './App.css';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { notify } from 'react-notify-toast';
import moment from 'moment';

const BUYERS_QUERY = gql`
  {
    allJdentBuyers {
      _id
      title
      date
      content
      address
      emailId
      contactNo
      invoiceNo
      deliveryNote
      supplierRef
      otherRef
      buyersOrderNo
      dispatchDocumentNo
      deliveryNoteDate
      dispatchedThrough
      destination
      termsOfDelivery
      srNo
      disriptionOfGoods
      modelNo
      sirNo
      hsnsac
      quantity
      rate
      per
      discount
      amount
      totalAmount
      totalAmountInWords
    }
  }
`;

const DELETE_INVOICE_QUERY = gql`
  mutation deleteBuyer($_id: ID!) {
    deleteBuyer(_id: $_id) {
      title
      content
      _id
      date
    }
  }
`;

function ListOfInvoice() {
  const columns = [
    {
      name: 'Invoice No',
      selector: 'invoiceNo',
      sortable: true,
      width: '100px',
    },
    {
      name: 'Name',
      selector: 'title',
      sortable: true,
    },
    {
      name: 'Address',
      selector: 'address',
      sortable: true,
      width: '200px',
    },
    {
      name: 'ContactNo',
      selector: 'contactNo',
      sortable: true,
    },
    {
      name: 'Date',
      selector: 'deliveryNoteDate',
      sortable: true,
      width: '200px',
      cell: (row) => moment(row.deliveryNoteDate).format('lll'),
    },
    {
      name: 'Balance Days',
      selector: 'balanceDays',
      sortable: true,
    },
    {
      name: 'Edit',
      button: true,
      cell: (row) => (
        <button>
          <a href={`updateInvoice/${row._id}`}>
            <i className='fas fa-edit'></i>
          </a>
        </button>
      ),
    },
    {
      name: 'Print',
      button: true,
      cell: (row) => (
        <button>
          <a href={`printinvoice/${row._id}`}>
            <i className='fas fa-print'></i>
          </a>
        </button>
      ),
    },
    {
      name: 'Delete',
      button: true,
      cell: (row) => (
        <button
          className='button is-link is-small'
          onClick={(e) => {
            e.preventDefault();
            onDelete(row);
          }}
        >
          <i className='fas fa-trash-alt'></i>
        </button>
      ),
    },
  ];
  const { loading, error, data } = useQuery(BUYERS_QUERY);

  function onDelete(row) {
    // window.confirm('are you sure');
    // deleteBuyer({ variables: { _id: id } });
    // notify.show('Note was deleted successfully', 'success');
    // window.location.reload(false);

    if (window.confirm(`Are you sure you want to delete:\r ${row.title}?`)) {
      deleteBuyer({ variables: { _id: row._id } });
      notify.show('Note was deleted successfully', 'success');
      window.location.reload(false);
    }
  }

  const [deleteBuyer] = useMutation(DELETE_INVOICE_QUERY, {
    update(cache, { data: { deleteBuyer } }) {
      const { allInvoices } = cache.readQuery({ query: BUYERS_QUERY });
      const newInvoices = allInvoices.filter(
        (invoice) => invoice._id !== deleteBuyer._id
      );

      cache.writeQuery({
        query: BUYERS_QUERY,
        data: { allInvoices: newInvoices },
      });
    },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  let listOfInvoice = data.allJdentBuyers;
  let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  console.log('columns', columns);
  console.log('listOfInvoice ', listOfInvoice);

  var arrOfObj = listOfInvoice;

  var NewListOfInvoice = arrOfObj.map(function (el) {
    let billDate = el.deliveryNoteDate;
    let currentDate = el.date;
    let balanceDays = Math.round(
      Math.abs((new Date(currentDate) - new Date(billDate)) / oneDay)
    );
    var o = Object.assign({}, el);
    o.balanceDays = balanceDays;
    return o;
  });

  const tableData = {
    columns,
    data: NewListOfInvoice,
  };

  return (
    <div className='tablebody'>
      <DataTableExtensions {...tableData} className='data-table-extensions'>
        <DataTable
          columns={columns}
          data={listOfInvoice}
          noHeader
          defaultSortField='invoiceNo'
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
    </div>
  );
}

export default ListOfInvoice;
