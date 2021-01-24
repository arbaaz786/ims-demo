import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { notify } from "react-notify-toast";
import gql from "graphql-tag";

const ENTRIES_QUERY = gql`
  query getEntry($_id: ID!) {
    getEntry(_id: $_id) {
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

const UPDATE_ENTRY = gql`
  mutation updateEntry($_id: ID!, $vehicle: String, $startTime: String, $stopTime: String, $totalHour: String, $vbd: String, $dailyDiesel: String, $purchaseDiesel: String, $advance: String, $discription: String, $opName: String, $attendance: String) {
    updateEntry(_id: $_id, input: { vehicle: $vehicle, startTime: $startTime, stopTime: $stopTime, totalHour: $totalHour, vbd: $vbd, dailyDiesel: $dailyDiesel, purchaseDiesel: $purchaseDiesel, advance: $advance, discription: $discription, opName: $opName, attendance: $attendance,}) {
      _id
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

const EditEntry = ({ match }) => {

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
  
  const { loading, error, data } = useQuery(ENTRIES_QUERY, {
    variables: {
      _id: match.params.id
    }
  });

  const [updateEntry] = useMutation(UPDATE_ENTRY);

  if (loading) return <div>Fetching Entry</div>;
  if (error) return <div>Error fetching entry</div>;

   // set the  result gotten from rhe GraphQL server into the entry variable.
   const entry = data;

   console.log(entry);

  return (
    <div className="container m-t-20">
      <h1 className="page-title">Edit Day</h1>

      <div className="newnote-page m-t-20">
        <form
          onSubmit={e => {
            // Stop the form from submitting
            e.preventDefault();

            // set the title of the note to the title in the state, if not's available set to the original title gotten from the GraphQL server
            // set the content of the note to the content in the state, if not's available set to the original content gotten from the GraphQL server
            // pass the id, title and content as variables to the UPDATE_NOTE mutation.
            updateEntry({
              variables: {
                _id: entry.getEntry._id,
                vehicle: vehicle ? vehicle : entry.getEntry.vehicle,
                startTime: startTime ? startTime : entry.getEntry.startTime,
                stopTime: stopTime ? stopTime : entry.getEntry.stopTime,
     
                vbd: vbd ? vbd : entry.getEntry.vbd,
                dailyDiesel: dailyDiesel ? dailyDiesel : entry.getEntry.dailyDiesel,
                purchaseDiesel: purchaseDiesel ? purchaseDiesel : entry.getEntry.purchaseDiesel,
                advance: advance ? advance : entry.getEntry.advance,
                discription: discription ? discription : entry.getEntry.discription,
                opName: opName ? opName : entry.getEntry.opName,
                attendance: attendance ? attendance : entry.getEntry.attendance
              }
            });

            notify.show("Work Day was edited successfully", "success");
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
                defaultValue={entry.getEntry.vehicle}
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
                defaultValue={entry.getEntry.startTime}
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
                defaultValue={entry.getEntry.stopTime}
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
                defaultValue={entry.getEntry.stopTime - entry.getEntry.startTime}
                onChange={e => setStopTime(e.target.value)}
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
                defaultValue={entry.getEntry.vbd}
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
                defaultValue={entry.getEntry.dailyDiesel}
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
                defaultValue={entry.getEntry.purchaseDiesel}
                onChange={e => setPurchaseDiesel(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Advance</label>
            <div className="control">
              <input
                className="input"
                name="advance"
                type="number"
                placeholder="Advance"
                defaultValue={entry.getEntry.advance}
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
                defaultValue={entry.getEntry.opName}
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
                defaultValue={entry.getEntry.attendance}
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
                defaultValue={entry.getEntry.discription}
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
};

export default EditEntry;
