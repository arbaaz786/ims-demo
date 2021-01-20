
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { notify } from "react-notify-toast";

const NEW_ENTRY = gql`
  mutation createEntry($vehicle: String!, $startTime: String!,$stopTime: String!,$totalHour: String!,$vbd: String!,$dailyDiesel: String!,$purchaseDiesel: String!,$advance: String!,$discription: String!,$opName: String!,$attendance: String!) {
    createEntry(input: { vehicle: $vehicle, startTime: $startTime, stopTime: $stopTime,totalHour: $totalHour,vbd: $vbd,dailyDiesel: $dailyDiesel,purchaseDiesel:$purchaseDiesel,advance: $advance,discription: $discription,opName: $opName,attendance: $attendance}) {
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

const NewEntry = withRouter(({ history }) => {

  const [vehicle, setVehicle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [stopTime, setStopTime] = useState("");
  const [vbd, setVdb] = useState("");
  const [dailyDiesel, setDailyDiesel] = useState("");
  const [purchaseDiesel, setPurchaseDiesel] = useState("");
  const [advance, setAdvance] = useState("");
  const [discription, setDiscription] = useState("");
  const [opName, setOpName] = useState("");
  const [attendance, setAttendance] = useState("");

  const [createEntry] = useMutation(NEW_ENTRY, {
    update(
      cache,
      {
        data: { createEntry }
      }
    ) {
      const { allEntries } = cache.readQuery({ query: ENTRIES_QUERY });

      cache.writeQuery({
        query: NEW_ENTRY,
        data: { allEntries: allEntries.concat([createEntry]) }
      });
    }
  });
 

  return (
    <div className="container m-t-20">
      <h1 className="page-title">New Entry</h1>

      <div className="newnote-page m-t-20">
        <form
          onSubmit={e => {
            e.preventDefault();
            createEntry({
              variables: {
                vehicle,
                startTime,
                stopTime,
                totalHour: (stopTime-startTime).toString(),
                vbd,
                dailyDiesel,
                purchaseDiesel,
                advance,
                discription,
                opName,
                attendance,
                date: Date.now(),
              }
            });
            notify.show(" Data was Added successfully", "success");
            history.push("/");
          }}
        >
          <div className="field">
            <label className="label">Vehicle</label>
            <div className="control">
              <input
                className="input"
                name="vehicle"
                type="text"
                placeholder="Vehicle"
                value={vehicle}
                onChange={e => setVehicle(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Start Time</label>
            <div className="control">
              <input
                className="input"
                name="startTime"
                type="number"
                placeholder="Start Time"
                pattern="[1-9][0-9]{3}"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Stop Time</label>
            <div className="control">
              <input
                className="input"
                name="stopTime"
                type="number"
                pattern="[1-9][0-9]{3}"
                placeholder="Stop Time"
                value={stopTime}
                onChange={e => setStopTime(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Total Hour</label>
            <div className="control">
              <input
                className="input"
                name="totalHour"
                type="number"
                pattern="[1-9][0-9]{3}"
                placeholder="totalHour"
                value={stopTime - startTime}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Vehicle Balance Diesel </label>
            <div className="control">
              <input
                className="input"
                name="vbd"
                type="number"
                placeholder="Vehicle Balance Diesel"
                value={vbd}
                onChange={e => setVdb(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Daily Diesel</label>
            <div className="control">
              <input
                className="input"
                name="dailyDiesel"
                type="number"
                placeholder="DailyDiesel in liters"
                value={dailyDiesel}
                onChange={e => setDailyDiesel(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Purchase Diesel</label>
            <div className="control">
              <input
                className="input"
                name="purchaseDiesel"
                type="number"
                placeholder="purchaseDiesel"
                value={purchaseDiesel}
                onChange={e => setPurchaseDiesel(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Advance</label>
            <div className="control">
              <input
                className="input"
                name="Advance"
                type="number"
                placeholder="Advance"
                value={advance}
                onChange={e => setAdvance(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Operator Name</label>
            <div className="control">
              <input
                className="input"
                name="opName"
                type="text"
                placeholder="Operator Name"
                value={opName}
                onChange={e => setOpName(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">attendance</label>
            <div className="control">
              <input
                className="input"
                name="attendance"
                type="text"
                placeholder="attendance"
                value={attendance}
                onChange={e => setAttendance(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Discription</label>
            <div className="control">
              <textarea
                className="textarea"
                name="discription"
                rows="10"
                placeholder="Discription  here..."
                value={discription}
                onChange={e => setDiscription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

export default NewEntry;
