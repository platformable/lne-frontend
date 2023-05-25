import React, { useState, useEffect } from "react";

export default function DateRangeComponent({
  generateReport,
  clients,
  setSelectedClients,
  progressNotes,
  setSelectedProgressNotes,
  condomsDistributed,
  setSelectedCondoms,
  supportGroups,
  setSelectedSupportGroups,
}) {
  const [selectedDate, setSelectedDate] = useState({
    start: null,
    finish: null,
  });

  

  const [download, setDownload] = useState(false);
  

  useEffect(() => {
    // console.log("selectedDate", selectedDate);
    const selectReportsInDateRange = (reports, dateField) =>
      reports.filter((report) => {
        const start = new Date(new Date(selectedDate.start).setHours(0));
        const end = new Date(new Date(selectedDate.finish).setHours(23));
        const eventdate = new Date(report?.[dateField]);
        // console.log("start", start)
        // console.log("end", end)
        // console.log("eventdate", eventdate)
        // console.log(eventdate >= start && eventdate <= end);
        return eventdate >= start && eventdate <= end;
      });
      const clientsReport = selectReportsInDateRange(clients, "clientdatecreated")
      const progressNotesReport = selectReportsInDateRange(progressNotes, "progressnotedate")
      const condomsDistributedReport = selectReportsInDateRange(condomsDistributed, "date")
      const supportGroupsReport = selectReportsInDateRange(supportGroups, "supportmeetingdate")
      
      setSelectedClients(clientsReport)
      setSelectedProgressNotes(progressNotesReport)
      setSelectedCondoms(condomsDistributedReport)
      setSelectedSupportGroups(supportGroupsReport)


  }, [selectedDate.start, selectedDate.finish]);
  return (
    <div>
      <div className="flex justify-between items-center bg-white px-5 py-5 my-5 shadow rounded-md">
        <div>
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
        onClick={generateReport}
        className="bg-yellow py-2  rounded px-5 flex gap-3 items-center flex shadow">
          <svg
            width="20"
            height="20"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
            <p className="text-lg"> Generate Report</p>
        </button>
      </div>
    </div>
  );
}
