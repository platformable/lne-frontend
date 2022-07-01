import { data } from "autoprefixer";
import React, { Component } from "react";


export const MonitorFundingTableToPrint = React.forwardRef((props, ref) => {
 console.log(props)
 const {clientid,startdate,firstname,lastname,clienthcwname,goals,joining,lastEncounter,progressnotes}=props.data

  return (
    <div ref={ref} className="my-5 mx-auto px-5">
        <div className="bg-white py-3 flex justify-between items-center">
            <div className="flex">
            <img src="/funding-goals.svg" className="mr-3" alt="" />
            <h3 className="font-black">Funding Goal Progress</h3>
            </div>
            <img src="/logo.png" alt="" width={120}/>
          </div>
     <table >
  <tr>
    <th>Client Start Date</th>
    <th>Client Id</th>
    <th>Client first name</th>
    <th>Client first name</th>
    <th>Health care worker assigned</th>
    <th>Time since joining LNE</th>
    <th>Number of Encounters</th>
    <th>Last Encounter</th>
    <th>Goals completed</th>
    <th>Outdate MSA forms</th>


  </tr>
  {props.data.map((client,index) =>{
      return (
        <tr key={index}>
        <td>{client.startdate}</td>
        <td>{client.clientid}</td>
        <td>{client.firstname}</td>
        <td>{client.lastname}</td>
        <td>{client.clienthcwname}</td>
        <td>{client.joining}</td>
        <td>{client.progressnotes}</td>
        <td>{client.lastEncounter}</td>
        <td>{client.goals}</td>
        <td>0</td>

      </tr>
      )
  })}
 

</table>
    </div>
  );
});


MonitorFundingTableToPrint.displayName = 'MonitorFundingTableToPrint';
export default MonitorFundingTableToPrint;
