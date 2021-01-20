import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
// import { notify } from 'react-notify-toast';
import DataTable from 'react-data-table-component';
// import differenceBy from 'lodash.differenceby';

// import moment from 'moment';
// {
//   moment(data.getJdentBuyer.deliveryNoteDate).format('DD/MM/YYYY');
// }

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

const AllInvoices = () => {
  const { loading, error, data } = useQuery(BUYERS_QUERY);
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

  console.log(data.allJdentBuyers);

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <div className='columns'>
      <div className='field'>
        <div className='control'>
          <input
            className='input'
            id='search'
            name='address'
            type='text'
            placeholder='search here'
            value={filterText}
            onChange={onFilter}
          />
        </div>
      </div>
      <div className='field'>
        <div className='control'>
          <button className='button is-link' onClick={onClear}>
            <span className='icon'>
              <i className='fas fa-trash-alt'>x</i>
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  const columns = [
    {
      name: 'Invoice No',
      selector: 'srNo',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'title',
      sortable: true,
    },
    {
      name: 'Email Id',
      selector: 'emailId',
      sortable: true,
    },
    {
      name: 'ContactNo',
      selector: 'contactNo',
      sortable: true,
    },
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      width: '200px',
    },
    {
      name: 'Edit',
      button: true,
      cell: (row) => <Link to={`updateInvoice/${row._id}`}>Edit Invoice</Link>,
    },
    {
      name: 'Print',
      button: true,
      cell: (row) => <Link to={`printinvoice/${row._id}`}> print</Link>,
    },
  ];

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(data.allJdentBuyers[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }

  const Export = ({ onExport }) => (
    <button
      className='button is-primary '
      onClick={(e) => onExport(e.target.value)}
    >
      Export To Excel
    </button>
  );

  const BasicTable = () => {
    const actionsMemo = React.useMemo(
      () => <Export onExport={() => downloadCSV(data.allJdentBuyers)} />,
      []
    );
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
      false
    );
    const [noSelectAll, setNoSelectAll] = React.useState(true);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    // const [data, setData] = React.useState(data.allJdentBuyers);
    // console.log("data.allJdentBuyers", data.allJdentBuyers)
    const filteredItems = data.allJdentBuyers.filter(
      (item) =>
        item.title &&
        item.title.toLowerCase().includes(filterText.toLowerCase())
    );

    const subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText('');
        }
      };

      return (
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      );
    }, [filterText, resetPaginationToggle]);

    const handleRowSelected = React.useCallback((state) => {
      setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
      var selectedId;
      const handleDelete = () => {
        if (
          window.confirm(
            `Are you sure you want to delete:\r ${selectedRows.map(
              (r) => r._id
            )}?`
          )
        ) {
          console.log('selectedRows', selectedRows[0]._id);
          var selectedId = selectedRows[0]._id;
          //  console.log(r._id)
          if (selectedId) {
            deleteBuyer({ variables: { _id: selectedId } });
            window.location.reload(false);
          } else {
            window.confirm('multiple selection not allowed');
          }
          setToggleCleared(!toggleCleared);
          //setData(differenceBy(data, selectedRows, 'name'));
        }
      };
      return (
        <button
          className='button is-danger'
          key='delete'
          onClick={handleDelete}
        >
          X
        </button>
      );
    }, [data, selectedRows, toggleCleared]);

    return (
      <DataTable
        title='List Of Invoices'
        columns={columns}
        data={filteredItems}
        actions={actionsMemo}
        highlightOnHover
        pagination
        fixedHeader
        fixedHeaderScrollHeight='300px'
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        contextActions={contextActions}
        persistTableHead
        selectableRows
        selectableRowsNoSelectAll={noSelectAll}
        onSelectedRowsChange={handleRowSelected}
      />
    );
  };

  return (
    <div className='container m-t-20'>
      <BasicTable />
    </div>
  );
};

export default AllInvoices;
