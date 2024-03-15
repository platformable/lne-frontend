import React, { useEffect, useState, useRef } from "react";
import backIcon from "../public/BACKicon.svg";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import BackButton from "../components/BackButton";
import BackToDashboardButton from "../components/BackToDashboardButton";
import ChartGraphic from "../components/ChartGraphic";
import ClientsEncounterCharts from "../components/ClientsEncounterCharts";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import ToogleButton from "../components/ToogleButton";
import DataTable from "react-data-table-component";
import KeyMetrics from "../components/KeyMetrics";

/* import DataTableExtensions from "react-data-table-component-extensions"; */

import "react-data-table-component-extensions/dist/index.css";
import Export from "react-data-table-component";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "../components/ComponentToPrint";
import MonitorFundingTableToPrint from "../components/MonitorFundingTableToPrint";
import Pagination from "../components/Pagination";
import MonitorFundingMetricsTableHeader from "../components/MonitorFundingMetricsTableHeader";

const MonitorFunding = ({ clients, averageNumbers, msaFormsXClient,sapXClient, ProgressNotesXClient }) => {
  const [monitorMetricsData, setMonitorMetricsData] = useState([]);
  const [
    monitorFundingTableDataSortingByName,
    setMonitorFundingTableDataSortingByName,
  ] = useState(false);
  const [
    monitorFundingTableDataSortingByLastname,
    setMonitorFundingTableDataSortingByLastname,
  ] = useState(false);
  const [
    monitorFundingTableDataSortingByDate,
    setMonitorFundingTableDataSortingByDate,
  ] = useState(false);
  const [
    monitorFundingTableDataSortingByClientId,
    setMonitorFundingTableDataSortingByClientId,
  ] = useState(false);
  const [
    monitorFundingTableDataSortingByEncounters,
    setMonitorFundingTableDataSortingByEncounters,
  ] = useState(false);
  const [
    monitorFundingTableDataSortingByLastEncounters,
    setMonitorFundingTableDataSortingByLastEncounters,
  ] = useState(false);
  const [
    monitorFundingTableDataSortingByGoals,
    setMonitorFundingTableDataSortingByGoals,
  ] = useState(false);
  const [
    monitorFundingTableDataSortingByHCW,
    setMonitorFundingTableDataSortingByHCW,
  ] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = monitorMetricsData.slice(
    indexofFirstPost,
    indexOfLastPost
  );
  // console.log("monitorMetricsData", msaFormsXClient);
  let componentRef = useRef();

  const [dataGraphicPeriod, setDataGraphicPeriod] = useState("Month");

  const updateMonitorMetricData = async () => {
    const newClients = [];
    const activeClients = clients?.filter(
      (client) => client.clientactive === "1"
    )
    activeClients.forEach((client, index) => {
      const newClient = {};
      /*   newClient.progressnote = []; */
      newClient.clientid = client.clientid;
      /*   newClient.startdate = new Date(
        client.clientdatecreated
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }); */
      
      newClient.serviceActionPlanDate = sapXClient?.some(pn => pn.clientid === client.clientid) ?  new Date(sapXClient?.find(pn => pn.clientid === client.clientid)?.planstartdate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        : "-";
      newClient.startdate = client.clientdatecreated;
      newClient.firstname = client.clientfirstname;
      newClient.lastname = client.clientlastname;
      newClient.clienthcwname = client.clienthcwname;
      /* newClient.progressnotes = client.progressnotes.length; */
      newClient.progressNotesDates = client.progressnotes;
      newClient.lastEncounter = calculateDaysBetweenDates(calculateLastEncounterDifference(
        client
      ));

      newClient.joining = calculateDaysBetweenDates(client.clientdatecreated);
      // newClient.goals =
      //   parseInt(client.goal1completed) +
      //   parseInt(client.goal2completed) +
      //   parseInt(client.goal3completed);
      newClients.push(newClient);
    });
    console.log("clients to push", newClients)
    setMonitorMetricsData(newClients);
  };

  const calculateDaysBetweenDates = (clientStartDate) => {
    let date_1 = new Date(clientStartDate);
    let date_2 = new Date();
    let difference = date_2.getTime() - date_1.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };

  const calculateLastEncounterDifference = (
   client
  ) => {
    
      let date1;
     
      if (ProgressNotesXClient?.some(pn => pn.clientid === client.clientid)) {
        const progressnotedate = ProgressNotesXClient.find(pn => pn.clientid === client.clientid)?.progressnotedate
        date1 = new Date(progressnotedate);
     
      } else if (sapXClient?.some(pn => pn.clientid === client.clientid)){

        const planstartdate = sapXClient?.find(pn => pn.clientid === client.clientid)?.planstartdate
        date1 = new Date(planstartdate);

      }
      else if (msaFormsXClient?.some(pn => pn.clientid === client.clientid)){

        const msaformDate = msaFormsXClient?.find(pn => pn.clientid === client.clientid)?.planstartdate
        date1 = new Date(msaformDate);

      } else {

        date1 = new Date(client?.clientdatecreated)
      }
      return date1
   
  };



  const [newClientsChart, setNewClientsChart] = useState({
    group1: 0,
    group2: 0,
    group3: 0,
    group4: 0,
  });

  const [numberOfClientsEncounter, setNumberOfClientsEncounter] = useState({
    group1: 0,
    group2: 0,
    group3: 0,
    group4: 0,
  });

  const months = [
    { month: 7, total: 5 },
    { month: 8, total: 10 },
    { month: 9, total: 15 },
    { month: 10, total: 20 },
    { month: 11, total: 25 },
    { month: 12, total: 30 },
    { month: 1, total: 35 },
    { month: 2, total: 40 },
    { month: 3, total: 45 },
    { month: 4, total: 50 },
    { month: 5, may: 55 },
    { month: 6, total: 60 },
  ];
  const date = new Date();
  let currentMonth = date.getMonth() + 1;

  const chart1Data = async (averageNumbers) => {
    const clientsOfTheMonth = await averageNumbers.filter((client, index) => {
      const clientDate = new Date(client.planstartdate);
      if (dataGraphicPeriod === "Year") {
        return clientDate.getFullYear() === currentYear;
      }
      const result = clientDate.getMonth() + 1 === currentMonth;
      return result;
    });
    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    let total4 = 0;
    let total5 = 0;
    let total6 = 0;
    let total7 = 0;
    let total8 = 0;
    let total9 = 0;
    let total10 = 0;
    let total11 = 0;
    let total12 = 0;

    const numberOfClients = clientsOfTheMonth.forEach((client, index) => {
      const planstartdate = new Date(client.planstartdate).getDate();
      if (planstartdate >= 1 && planstartdate <= 7) {
        total1 = total1 + 1;
      }
      if (planstartdate >= 8 && planstartdate <= 14) {
        total2 = total2 + 1;
      }
      if (planstartdate >= 15 && planstartdate <= 22) {
        total3 = total3 + 1;
      }
      if (planstartdate >= 23 && planstartdate <= 30) {
        total4 = total4 + 1;
      }
      setNewClientsChart({
        ...newClientsChart,
        group1: total1,
        group2: total2,
        group3: total3,
        group4: total4,
      });
    });
    const numberOfClientsPerMonth = clientsOfTheMonth.forEach(
      (client, index) => {
        const planstartdate = new Date(client.planstartdate).getMonth();
        const fn = (number) => {
          const x = {
            1: () => total1 + 1,
            2: () => total2 + 1,
            3: () => total3 + 1,
            4: () => total4 + 1,
            5: () => total5 + 1,
            6: () => total6 + 1,
            7: () => total7 + 1,
            8: () => total8 + 1,
            9: () => total9 + 1,
            10: () => total10 + 1,
            11: () => total11 + 1,
            12: () => total12 + 1,
          };
          return x[number];
        };
        fn(planstartdate);
        setNewClientsChart({
          ...newClientsChart,
          group1: total1,
          group2: total2,
          group3: total3,
          group4: total4,
          group5: total5,
          group6: total6,
          group7: total7,
          group8: total8,
          group9: total9,
          group10: total10,
          group11: total11,
          group12: total12,
        });
      }
    );
    if (dataGraphicPeriod === "Year") return numberOfClientsPerMonth;
    return numberOfClients;
  };

  const clientsWithProgressNotes = averageNumbers?.filter((client, index) => {
    return client.progressnotedate !== null;
  });

  const chart2Data = async (averageNumbers) => {
    const activeProgressNotes = await clientsWithProgressNotes.filter(
      (client, index) => {
        const clientDate = new Date(client.planstartdate);
        if (dataGraphicPeriod === "Year") {
          return clientDate.getFullYear() === currentYear;
        }
        const result = clientDate.getMonth() + 1 === currentMonth;
        return result;
      }
    );
    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    let total4 = 0;
    let total5 = 0;
    let total6 = 0;
    let total7 = 0;
    let total8 = 0;
    let total9 = 0;
    let total10 = 0;
    let total11 = 0;
    let total12 = 0;
    const numberOfClients = activeProgressNotes.forEach((client, index) => {
      const progressnotedate = new Date(client.progressnotedate).getDate();
      if (progressnotedate >= 1 && progressnotedate <= 7) {
        total1 = total1 + 1;
      }
      if (progressnotedate >= 8 && progressnotedate <= 14) {
        total2 = total2 + 1;
      }
      if (progressnotedate >= 15 && progressnotedate <= 22) {
        total3 = total3 + 1;
      }
      if (progressnotedate >= 23 && progressnotedate <= 30) {
        total4 = total4 + 1;
      }

      setNumberOfClientsEncounter({
        ...numberOfClientsEncounter,
        group1: total1,
        group2: total2,
        group3: total3,
        group4: total4,
      });
    });
    const numberOfClientsEnconuntersPerMonth = activeProgressNotes.forEach(
      (client, index) => {
        const planstartdate = new Date(client.planstartdate).getMonth();
        const fn = (number) => {
          const x = {
            1: () => total1 + 1,
            2: () => total2 + 1,
            3: () => total3 + 1,
            4: () => total4 + 1,
            5: () => total5 + 1,
            6: () => total6 + 1,
            7: () => total7 + 1,
            8: () => total8 + 1,
            9: () => total9 + 1,
            10: () => total10 + 1,
            11: () => total11 + 1,
            12: () => total12 + 1,
          };
          return x[number];
        };
        fn(planstartdate);
        setNumberOfClientsEncounter({
          ...numberOfClientsEncounter,
          group1: total1,
          group2: total2,
          group3: total3,
          group4: total4,
          group5: total5,
          group6: total6,
          group7: total7,
          group8: total8,
          group9: total9,
          group10: total10,
          group11: total11,
          group12: total12,
        });
      }
    );
    if (dataGraphicPeriod === "Year") return numberOfClientsEnconuntersPerMonth;
    return numberOfClients;
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Rows per page",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };

  /*   const tableData = {
    columns,
    monitorMetricsData,
  }; */

  const getColorOfNumberOfEncounters = (encounters) => {
    if (encounters < 15) {
      return "bg-red-500 text-white";
    }
    if (encounters > 15 && encounters < 30) {
      return "bg-orange-100 text-white";
    }
    if (encounters > 30) {
      return "bg-green-100 text-white";
    }
  };

  const getColorOfLastEncounter = (lastEncounter) => {
    if (lastEncounter >= 30) {
      return "bg-red-500 text-white";
    }
    if (lastEncounter >= 14 && lastEncounter < 30) {
      return "bg-orange-500 text-white";
    }
    if (lastEncounter < 14) {
      return "bg-green-500 text-white";
    }
  };

  const getColorOfCompletedGoals = (goals) => {
    if (goals === 0) {
      return "bg-red-500 text-white";
    }
    if (goals >= 1 && goals <= 2) {
      return "bg-orange-500 text-white";
    }
    if (goals === 3) {
      return "bg-green-500 text-white";
    }
  };

  const handleSortByName = () => {
    /*    const result = monitorMetricsData.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.startdate) - new Date(a.startdate);
    }); */
    setMonitorFundingTableDataSortingByName(
      !monitorFundingTableDataSortingByName
    );
    if (monitorFundingTableDataSortingByName) {
      const result = monitorMetricsData.sort((a, b) =>
        a.firstname.localeCompare(b.firstname)
      );
      setMonitorMetricsData((prevMovies) => [...result]);
    } else {
      const result = monitorMetricsData.sort((a, b) =>
        b.firstname.localeCompare(a.firstname)
      );
      setMonitorMetricsData((prevMovies) => [...result]);
    }
  };

  const handleSortByClientId = () => {
    setMonitorFundingTableDataSortingByClientId(
      !monitorFundingTableDataSortingByClientId
    );
    if (monitorFundingTableDataSortingByClientId) {
      const result = monitorMetricsData.sort((a, b) =>
        a.clientid.localeCompare(b.clientid)
      );
      setMonitorMetricsData((prev) => [...result]);
    } else {
      const result = monitorMetricsData.sort((a, b) =>
        b.clientid.localeCompare(a.clientid)
      );
      setMonitorMetricsData((prev) => [...result]);
    }
  };

  const handleSortByEncounters = () => {
    setMonitorFundingTableDataSortingByEncounters(
      !monitorFundingTableDataSortingByEncounters
    );
    if (monitorFundingTableDataSortingByEncounters) {
      const result = monitorMetricsData?.sort(
        (a, b) => a.progressnotes - b.progressnotes
      );
      setMonitorMetricsData((prev) => [...result]);
    } else {
      const result = monitorMetricsData?.sort(
        (a, b) => b.progressnotes - a.progressnotes
      );
      setMonitorMetricsData((prev) => [...result]);
    }
  };

  const handleSortByLastEncounters = () => {
    setMonitorFundingTableDataSortingByLastEncounters(
      !monitorFundingTableDataSortingByLastEncounters
    );
    if (monitorFundingTableDataSortingByLastEncounters) {
      const result = monitorMetricsData?.sort(
        (a, b) => a.lastEncounter - b.lastEncounter
      );
      setMonitorMetricsData((prev) => [...result]);
    } else {
      const result = monitorMetricsData?.sort(
        (a, b) => b.lastEncounter - a.lastEncounter
      );
      setMonitorMetricsData((prev) => [...result]);
    }
  };

  const handleSortByGoals = () => {
    setMonitorFundingTableDataSortingByGoals(
      !monitorFundingTableDataSortingByGoals
    );
    if (monitorFundingTableDataSortingByLastEncounters) {
      const result = monitorMetricsData?.sort((a, b) => a.goals - b.goals);
      setMonitorMetricsData((prev) => [...result]);
    } else {
      const result = monitorMetricsData?.sort((a, b) => b.goals - a.goals);
      setMonitorMetricsData((prev) => [...result]);
    }
  };

  const handleSortByLastname = () => {
    setMonitorFundingTableDataSortingByLastname(
      !monitorFundingTableDataSortingByLastname
    );
    if (monitorFundingTableDataSortingByLastname) {
      const result = monitorMetricsData.sort((a, b) =>
        a.lastname.localeCompare(b.lastname)
      );
      setMonitorMetricsData((prevMovies) => [...result]);
    } else {
      const result = monitorMetricsData.sort((a, b) =>
        b.lastname.localeCompare(a.lastname)
      );
      setMonitorMetricsData((prevMovies) => [...result]);
    }
  };

  const handleSortByHCW = () => {
    setMonitorFundingTableDataSortingByHCW(
      !monitorFundingTableDataSortingByHCW
    );
    if (monitorFundingTableDataSortingByHCW) {
      const result = monitorMetricsData.sort((a, b) =>
        a.clienthcwname.localeCompare(b.clienthcwname)
      );
      setMonitorMetricsData((prevMovies) => [...result]);
    } else {
      const result = monitorMetricsData.sort((a, b) =>
        b.clienthcwname.localeCompare(a.clienthcwname)
      );
      setMonitorMetricsData((prevMovies) => [...result]);
    }
  };

  const handleSortByDate = () => {
    const emptyValues = monitorMetricsData.filter(
      (data) => data.serviceActionPlanDate === "-"
    );
    const filledValues = monitorMetricsData.filter(
      (data) => data.serviceActionPlanDate !== "-"
    );

    setMonitorFundingTableDataSortingByDate(
      !monitorFundingTableDataSortingByDate
    );
    if (monitorFundingTableDataSortingByDate) {
      const result = filledValues.sort(function (a, b) {
        return (
          new Date(b.serviceActionPlanDate) - new Date(a.serviceActionPlanDate)
        );
      });
      setMonitorMetricsData((prevMovies) => [...result, ...emptyValues]);
    } else {
      const result = filledValues.sort(function (a, b) {
        return (
          new Date(a.serviceActionPlanDate) - new Date(b.serviceActionPlanDate)
        );
      });
      setMonitorMetricsData((prevMovies) => [...result, ...emptyValues]);
    }
  };
  
  const handleTableSearch = (value) => {
    if (value === "") {
      updateMonitorMetricData();
    } else {
      const result = monitorMetricsData.filter(
        (client, index) =>
          client.lastname.toLowerCase().includes(value.toLowerCase()) ||
          client.firstname.toLowerCase().includes(value.toLowerCase())
      );
      setMonitorMetricsData((prevMovies) => [...result]);
    }
  };

  //PAGINATION

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // chart1Data(averageNumbers);
    // chart2Data(averageNumbers);
    updateMonitorMetricData();
  }, []);
  return (
    <Layout>
      <div className="bg-white">
        <section className="container mx-auto shadow-inner">
          <div className="py-5 flex gap-x-5">
            <BackButton />
            <BackToDashboardButton />
          </div>
          <div className=" py-5">
            <h1 className="font-bold px-2">Monitor Funding Requirements</h1>
          </div>
        </section>
        <section className="bg-light-blue py-10">
        <div className="container mx-auto grid-cols-1 gap-5">
          {/* KEY METRICS */}

          <KeyMetrics clients={clients} sapXClient={sapXClient} ProgressNotesXClient={ProgressNotesXClient}/>

          {/* KEY METRICS */}

          {/* <div className="graphic-metrics grid grid-cols-1 bg-light-blue shadow gap-1 my-3 mx-3 md:mx-0">
            <div className="grid grid-cols-2 gap-9 bg-white py-2 px-5">
              <div className="flex">
                <img src="/supervisor/meeting-funding.svg" />
                <h2 className="font-bold ml-3">
                  Are We Meeting Funding Requirements?
                </h2>
              </div>
              <ToogleButton
                dataGraphicPeriod={dataGraphicPeriod}
                setDataGraphicPeriod={setDataGraphicPeriod}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-1">
              <div className=" bg-white px-5 py-2">
                <ChartGraphic
                  chartData={newClientsChart}
                  dataGraphicPeriod={dataGraphicPeriod}
                />
              </div>
              <div className=" bg-white px-5 py-2">
                <ClientsEncounterCharts
                  numberOfClientsEncounter={numberOfClientsEncounter}
                  dataGraphicPeriod={dataGraphicPeriod}
                />
              </div>
            </div>
          </div> */}

          <div className="bg-white py-3 flex justify-between px-5 items-center mt-10 rounded-t">
            <div className="flex  w-2/4">
              <img src="/funding-goals.svg" className="mr-3" alt="" />
              <h2 className="font-bold">Client Support Progress</h2>
            </div>
            <ReactToPrint
              trigger={() => (
                <button className="flex items-center bg-black hover:bg-yellow-300 px-5 py-1 rounded text-white hover:text-black  ">
                  {/*      <img src="/print-report.svg" alt="" className="mr-2"/> */}
                  Print Report
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
          {/* <input type="text" onChange={(e)=>handleTableSearch(e.target.value)} placeholder="search..." /> */}

          <div className="monitor-funding-table bg-white  ">
            <div className="monitor-funding-table-column-container grid grid-cols-6 gap-0.5 overflow-x py-0.5 mx-5 rounded ">
              {/* <MonitorFundingMetricsTableHeader title="Client Start Date" sortFunction={handleSortByDate} /> */}
              <MonitorFundingMetricsTableHeader title="Client ID" sortFunction={handleSortByClientId} />
              <MonitorFundingMetricsTableHeader title="First name" sortFunction={handleSortByName} />
              <MonitorFundingMetricsTableHeader title="Last name initial" sortFunction={handleSortByLastname} />
              {/* <MonitorFundingMetricsTableHeader title="HCW <br /> assigned" sortFunction={handleSortByHCW} /> */}
            
           
              <MonitorFundingMetricsTableHeader title="Service action  plan date" sortFunction={handleSortByDate} />
              <MonitorFundingMetricsTableHeader title="Days since 
                  last encounter" sortFunction={handleSortByLastEncounters} />

              <MonitorFundingMetricsTableHeader title="Goals completed" sortFunction={handleSortByGoals} />

            
            </div>
          </div>
          <div className="monitor-funding-table grid auto-rows-auto bg-white mb-10 px-5 pb-5 rounded-b shadow">
            {monitorMetricsData
              ? monitorMetricsData.map((client, index) => {
                  return (
                    <div
                      className="monitor-funding-table-row-container grid grid-cols-6 gap-0.5"
                      key={index}
                    >
                      {/*  <div className={`monitor-funding-table-row px-5 text-left py-3`}>
                <p className="font-xxs">{client.startdate}</p>
                
              </div> */}
                      <div className="monitor-funding-table-row px-5 text-left bg-row-light py-3">
                        <p className="text-blue-500 underline">
                          <a href={`/clients/${client.clientid}/profile`}>
                            {client.clientid}
                          </a>
                        </p>
                      </div>
                      <div className="monitor-funding-table-row px-5 text-left bg-row-light py-3">
                        <p className="">{client.firstname}</p>
                      </div>
                      <div className="monitor-funding-table-row px-5 text-left bg-row-light py-3">
                        <p className="">{client.lastname.charAt(0)}</p>
                      </div>
                      {/* <div className="monitor-funding-table-row px-5 text-left bg-row-light py-3">
                <p className="">{client.clienthcwname}</p>
                
              </div> */}
                      {/*  <div className="monitor-funding-table-row px-5 text-left bg-row-light py-3">
                <p className="">{client.joining}</p>
                
              </div> */}
                      <div
                        className={`monitor-funding-table-row px-5 text-left bg-row-light py-3`}
                      >
                        <p className="">
                          {client.serviceActionPlanDate === "2058/01/01"
                            ? "-"
                            : client.serviceActionPlanDate}
                        </p>
                      </div>
                      <div
                        className={`monitor-funding-table-row px-5 text-left py-3 ${getColorOfLastEncounter(
                          client.lastEncounter
                        )}`}
                      >
                        <p className="">{client.lastEncounter}</p>
                      </div>
                      <div
                        className={`monitor-funding-table-row px-5 text-left py-3 ${getColorOfCompletedGoals(
                          client.goals
                        )}`}
                      >
                        <p className="">{client.goals}</p>
                      </div>
                      {/* <div className="monitor-funding-table-row px-5 text-left bg-row-light py-3">
                <p className="font-xxs">0</p>
                
              </div> */}
                    </div>
                  );
                })
              : "No data"}
          </div>
          {/* <div className="flex gap-x-5 my-10"><p>Pagination:</p><Pagination postsPerPage={postsPerPage} TotalPosts={monitorMetricsData.length} paginate={paginate}/></div> */}

          {/*    <div className="bg-white py-3 flex justify-between px-5 items-center">
            <div className="flex  w-2/4">
              <img src="/funding-goals.svg" className="mr-3" alt="" />
              <h3 className="font-bold">Funding Goal Progress</h3>
            </div>
            <ReactToPrint
              trigger={() => (
                <button className="flex items-center bg-black hover:bg-yellow-300 px-5 py-1 rounded text-white  text-xs">
             
                  Print Report
                </button>
              )}
              content={() => componentRef.current}
            />
          </div> */}
          <div style={{ display: "none" }} className="p-5">
            <MonitorFundingTableToPrint
              ref={componentRef}
              data={monitorMetricsData}
            />
          </div>

          <h1 className="mb-4 container mx-auto text-center md:text-left   lg:pl-0 font-bold">
            What do you want <span className="bg-yellow px-1"> to do</span>{" "}
            today?
          </h1>
          <div className="grid md:grid-cols-7 grid-cols-1 gap-5 px-5 md:px-0 pb-5">
            <div className="p-3 py-5 rounded-md bg-black  shadow-md cursor-pointer">
              {/* <Link href={"/services"}> */}
              <figure className="flex flex-col items-center">
                <img
                  src="/supervisor/print_funding_report_large.svg"
                  className="mb-5"
                  alt="monitor STAFF PROGRESS"
                ></img>
                {/*  <figcaption className="font-bold text-xs text-center">
                    MANAGE SERVICES
                  </figcaption> */}
                <ReactToPrint
                  trigger={() => (
                    <button className="flex items-center px-5 py-1 rounded  text-white ">
                      {/*      <img src="/print-report.svg" alt="" className="mr-2"/> */}
                      Print Funding <br/>Report Tables
                    </button>
                  )}
                  content={() => componentRef.current}
                />
              </figure>
              {/*  </Link> */}
            </div>
            {/*  <div className="p-3 rounded-md bg-white shadow-md">
              <figure className="flex flex-col items-center">
                <img
                  src="/supervisor/monitor-staff-progres.svg"
                  className="mb-5"
                  alt="monitor STAFF PROGRESS"
                ></img>
                <figcaption className="font-bold text-xs text-center">
                  MONITOR STAFF PROGRESS
                </figcaption>
              </figure>
            </div> */}
            {/* <div className="p-3 rounded-md bg-white shadow-md">
              <figure className="flex flex-col items-center">
                <img
                  src="/supervisor/monitor-impacts-icon.svg"
                  className="mb-1"
                  alt="monitor IMPACTS"
                ></img>
                <figcaption className="font-bold text-xs text-center">
                  MONITOR IMPACTS
                </figcaption>
              </figure>
            </div> */}
            {/* <div className="p-3 rounded-md bg-white shadow-md">
              <figure className="flex flex-col items-center">
                <img
                  src="/supervisor/monitor-quality-icon.svg"
                  className="mb-5"
                  alt="monitor QUALITY"
                ></img>
                <figcaption className="font-bold text-xs text-center">
                  MONITOR QUALITY
                </figcaption>
              </figure>
            </div> */}
            {/* <div className="p-3 rounded-md bg-white shadow-md">
              <figure className="flex flex-col items-center">
                <img
                  src="/supervisor/plan-for-community-needs-icon.svg"
                  className="mb-5"
                  alt="monitor COMMUNITY NEEDS"
                ></img>
                <figcaption className="font-bold text-xs text-center">
                  PLAN FOR COMMUNITY NEEDS
                </figcaption>
              </figure>
            </div> */}
          </div>
        </div>
        </section>
       
      </div>
    </Layout>
  );
};

export default MonitorFunding;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const [clients, msaFormsXClient, sapXClient, ProgressNotesXClient] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`).then((r) =>
        r.json()
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/msa_forms`
      ).then((r) => r.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/monitor_funding/metrics/monitorFundingSap`
      ).then((r) => r.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/monitor_funding/metrics/monitorFundingProgressNotes`
      ).then((r) => r.json()),
    ]);
    return {
      props: {
        clients: clients,
        msaFormsXClient: msaFormsXClient,
        sapXClient,
        ProgressNotesXClient
      },
    };
  },
});
