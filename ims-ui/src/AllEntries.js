import React from "react";
import { Link, } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { notify } from "react-notify-toast";
import DataTable from 'react-data-table-component';

const ENTRIES_QUERY = gql`
  {
        allEntries {
        _id
        date
        vehicle 
        startTime 
        stopTime 
        totalHour 
        vbd 
        dailyDiesel 
        purchaseDiesel 
        advance 
        discription 
        opName 
        attendance 
        }
  }
`;

const DELETE_ENTRY_QUERY = gql`
  mutation deleteEntry($_id: ID!) {
    deleteEntry(_id: $_id) {
        vehicle 
        startTime 
        stopTime 
        totalHour 
        vbd 
        dailyDiesel 
        purchaseDiesel 
        advance 
        discription 
        opName 
        attendance 
       _id
       date
    }
  }
`;

const AllEntries = () => {

  const { loading, error, data } = useQuery(ENTRIES_QUERY);

  const columns = [
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      width: '200px',
    },
    {
      name: 'Vehicle',
      selector: 'vehicle',
      sortable: true,
    },
    {
      name: 'Start Time',
      selector: 'startTime',
      sortable: true,

    },
    {
      name: 'Stop time',
      selector: 'stopTime',
      sortable: true,

    },
    {
      name: 'Total hours',
      selector: 'totalHour',
      sortable: true,

    },
    {
      name: 'Vehicle Balance Diesel',
      selector: 'vbd',
      sortable: true,

    },
    {
      name: 'Daily Diesel [Liters]',
      selector: 'dailyDiesel',
      sortable: true

    },
    {
      name: 'Purchase Diesel',
      selector: 'purchaseDiesel',
      sortable: true
    },
    {
      name: 'Advance',
      selector: 'advance',
      sortable: true
    },
    {
      name: 'Discription',
      selector: 'discription',
      sortable: true
    },
    {
      name: 'Operator Name',
      selector: 'opName',
      sortable: true
    },
    {
      name: 'Attendance',
      selector: 'attendance',
      sortable: true
    },
  ];

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(data.allEntries[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
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
    // <a onClick={e => onExport(e.target.value)}>Export To Excel </a>
    <button className="button is-primary " onClick={e => onExport(e.target.value)} >Export To Excel</button>
  );



  const BasicTable = () => {
    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data.allEntries)} />, []);

    return (
      <DataTable
        title="Koregaon Site"
        columns={columns}
        data={data.allEntries}
        actions={actionsMemo}
        highlightOnHover
        pagination
        fixedHeader
        fixedHeaderScrollHeight="300px"
      />
    );
  };


  const [deleteEntry] = useMutation(DELETE_ENTRY_QUERY, {
    update(
      cache,
      {
        data: { deleteEntry }
      }
    ) {
      const { allEntries } = cache.readQuery({ query: ENTRIES_QUERY });
      const newEntries = allEntries.filter(entry => entry._id !== deleteEntry._id);

      cache.writeQuery({
        query: ENTRIES_QUERY,
        data: { allEntries: newEntries }
      });
    }
  });


  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container m-t-20">
      <h1 className="page-title">All Entries</h1>

      <div className="allnotes-page">
        <div className="columns is-multiline">
          <BasicTable />
          
          {data.allEntries.map(entry => (
            <div className="column is-one-third" key={entry._id}>
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">{entry.vehicle}</p>
                </header>
                <div className="card-content">
                  <div className="content">
                    {entry.startTime}
                    <br />
                  </div>
                  <div className="content">
                    {(new Date(entry.date)).toString()}
                    <br />
                  </div>
                </div>
                <footer className="card-footer">
                  <Link to={`entry/${entry._id}`} className="card-footer-item">
                    Edit
                  </Link>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      deleteEntry({ variables: { _id: entry._id } });
                      notify.show("Entry was deleted successfully", "success");
                    }}
                    className="card-footer-item"
                  >
                    Delete
                  </button>
                </footer>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default AllEntries;
