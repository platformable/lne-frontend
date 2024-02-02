import React, { useState, useEffect } from "react";

export default function DateRangeComponent({
  generateReport,
  setSelectedClients,
  setSelectedProgressNotes,
  setSelectedCondoms,
  setSelectedSupportGroups,
  setErrorRequest
}) {
  const [selectedDate, setSelectedDate] = useState({
    start: null,
    finish: null,
  });

  const fetchReport = async() => {
    try {
      const [clientsReport, progressNotesReport, supportGroupsReport, condomsDistributedReport] =
        await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients/reports/getall/${selectedDate.start}&${selectedDate.finish}`).then((r) =>
            r.json()
          ),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes/clients/allprogressnotesforreports/${selectedDate.start}&${selectedDate.finish}`).then(
            (r) => r.json()
          ),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/support_groups/reports/getall/${selectedDate.start}&${selectedDate.finish}`).then(
            (r) => r.json()
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/supplies_distributed/reports/getall/${selectedDate.start}&${selectedDate.finish}`
          ).then((r) => r.json()),
        ]);
        setSelectedClients(clientsReport)
        setSelectedProgressNotes(progressNotesReport)
        setSelectedCondoms(condomsDistributedReport)
        setSelectedSupportGroups(supportGroupsReport)
    } catch (error) {
      setErrorRequest(error.message)
      console.log("error", error)
    }
  }




  
  return (
    <div>
      <div className="flex justify-between items-center bg-white px-5 py-5 my-5 shadow rounded-md">
        <div className="flex items-center gap-5">
          <img src="/supervisor/choose_data_range_icon.svg" alt="choose data range icon" width={35}/>
          <h3 className="font-bold">Choose data range:</h3>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <label className="flex justify-start gap-5 items-center">
            Start date
            <input
              type="date"
              className="border-black py-1 px-2 rounded"
              onChange={(e) => {
                // console.log(new Date(e.target.value))

                setSelectedDate({ ...selectedDate, start: e.target.value });
              }}
            />
          </label>
          <label className="flex justify-start gap-5 items-center">
            Finish date
            <input
              type="date"
              className="border-black py-1 px-2 rounded"
              onChange={(e) => {
                // console.log(new Date(new Date(e.target.value).toLocaleString("en-US", {timeZone: "America/New_York"})).setHours(0), "new date")
                setSelectedDate({ ...selectedDate, finish: e.target.value });
              }}
            />
          </label>
        </div>
        <button 
        onClick={() => {
          fetchReport()
          generateReport()
        }}
        className="bg-yellow py-2  rounded px-5 flex gap-3 items-center flex shadow">
          <img src="/supervisor/generate_data_and_charts_icon.svg" alt="generate report" width={25}/>
            <p className="text-lg"> Generate Report</p>
        </button>
      </div>
    </div>
  );
}
