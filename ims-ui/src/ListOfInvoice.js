import React from 'react';
import './App.css';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { notify } from 'react-notify-toast';
import moment from 'moment';
// import Blink from 'react-blink-text';
import { PieChart } from 'react-minimal-pie-chart';

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

const ListOfInvoice = ({ history }) => {
  // function ListOfInvoice() {
  const columns = [
    {
      name: 'Invoice No',
      selector: 'invoiceNo',
      sortable: true,
      width: '75px',
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
      name: 'Mode of Payment',
      selector: 'deliveryNote',
      sortable: true,
      width: '100px',
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
      width: '175px',
      cell: (row) => moment(row.deliveryNoteDate).format('lll'),
    },
    {
      name: 'Balance Days',
      selector: 'balanceDays',
      sortable: true,
      width: '100px',
    },
    {
      name: 'Balance Amount',
      selector: 'balanceAmount',
      sortable: true,
      width: '100px',
    },
    {
      name: 'Edit',
      button: true,
      width: '75px',
      cell: (row) => (
        <button>
          <a
            href={` updateInvoice/${row.srNo ? row.srNo : 'Nill'}/${
              row.totalAmount
            }/${row.deliveryNoteDate}/${row.deliveryNote}/${row._id}`}
          >
            <i className='fas fa-edit'></i>
          </a>
        </button>
      ),
    },
    {
      name: 'Print',
      button: true,
      width: '75px',
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
      width: '75px',
      cell: (row) => (
        <button
          className='button is-danger is-link is-small'
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
    if (window.confirm(`Are you sure you want to delete:\r ${row.title}?`)) {
      deleteBuyer({ variables: { _id: row._id } });
      history.push('/');
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

  var arrOfObj = listOfInvoice;
  var TotalOutStandingAmount = 0;
  // var ActualAmount = 0;
  var totalCollection = 0;

  var NewListOfInvoice = arrOfObj.map(function (el) {
    let billDate = el.deliveryNoteDate;
    // let currentDate = el.date;
    let paidAmount = el.srNo;
    console.log(el.srNo);
    let modeOfpay = el.deliveryNote;
    let balanceAmount = '';
    let totalAmount = el.totalAmount;
    let balanceDays = '';

    var o = Object.assign({}, el);
    if (modeOfpay === 'Credit') {
      balanceAmount = totalAmount - paidAmount;
      console.log('balanceAmount', balanceAmount);

      TotalOutStandingAmount += parseInt(balanceAmount);
      // ActualAmount += parseInt(totalAmount);
      totalCollection += parseInt(paidAmount);

      balanceDays = Math.round(
        Math.abs((new Date() - new Date(billDate)) / oneDay)
      );

      if (balanceDays >= '30') {
        o.balanceDays = balanceDays; // when greater than 30 days
      }
      if (totalAmount === paidAmount) {
        o.balanceDays = '';
      }
      o.balanceAmount = balanceAmount; // when equal days
    } else {
      o.balanceAmount = balanceAmount;
    }

    return o;
  });

  console.log('listOfInvoice ', NewListOfInvoice);
  console.log('TotalOutStandingAmount ', TotalOutStandingAmount);

  const dataMock = [
    {
      title: 'Total Outstanding Amount',
      value: TotalOutStandingAmount,
      color: 'orange',
    },
    {
      title: 'Total Collection',
      value: totalCollection,
      color: '#3273dc',
    },
    // { title: 'ActualAmount', value: ActualAmount, color: 'Blue' },
  ];

  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
  };

  const shiftSize = 7;

  const tableData = {
    columns,
    data: NewListOfInvoice,
    print: false,
    export: false,
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.balanceDays > 30,
      style: {
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: (row) => row.totalAmount === row.srNo,
      style: {
        backgroundColor: 'orange',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    // You can also pass a callback to style for additional customization
  ];

  const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', state.selectedRows);
    let printList = state.selectedRows;
    console.log('len Rows: ', printList.length);

    if (printList.length !== 0) {
      var url = new URL('http://localhost:4300/api/generatePdf64'),
        params = printList;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((pdfData) => {
          console.log(pdfData);
          // let objectURL = URL.createObjectURL(myBlob);
          // let image = document.createElement('img');
          // image.src = objectURL;
          // document.body.appendChild(image);
        })
        .catch((e) => {
          console.log(
            'There has been a problem with your fetch operation: ' + e.message
          );
        });
    }

    //<a href={`printinvoice/${printList[i]._id}`}></a>;
    // var pages = ['page1.pdf', 'page2.pdf', 'page3.pdf'];
    // for (var i = 0; i < printList.length; i++) {
    //   var oWindow = window.open(printList[i], 'print');
    //   oWindow.print();
    //   oWindow.close();
    // }
  };

  return (
    <div className='tablebody'>
      <DataTableExtensions {...tableData} className='data-table-extensions'>
        <DataTable
          // columns={columns}
          // data={listOfInvoice}

          noHeader
          defaultSortField='invoiceNo'
          defaultSortAsc={false}
          pagination
          highlightOnHover
          conditionalRowStyles={conditionalRowStyles}
          selectableRows // add for checkbox selection
          onSelectedRowsChange={handleChange}
        />
      </DataTableExtensions>
      <div>
        <PieChart
          data={dataMock}
          radius={PieChart.defaultProps.radius - shiftSize}
          // segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
          label={({ dataEntry }) => dataEntry.value}
          style={{ height: '300px' }}
          labelStyle={{
            ...defaultLabelStyle,
          }}
          // totalValue={ActualAmount}
          // lineWidth={15}
          // paddingAngle={5}
        />
      </div>
      {/* <div className='blink-box'>
        <Blink
          color='white'
          text={'Outstanding balance ' + TotalOutStandingAmount}
          fontSize={25}
        ></Blink>
      </div> */}
    </div>
  );
};

export default ListOfInvoice;
