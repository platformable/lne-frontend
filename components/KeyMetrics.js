import React, { useState, useEffect } from "react";

export default function KeyMetrics({ clients,sapXClient, ProgressNotesXClient, msaFormsXClient, clientSaps, monitorMetrics }) {
  const [numberOfActiveClients, setNumberOfActiveClients] = useState({
    total: 0,
    color: "bg-light-red",
  });

  const [averageDays, setAverageDays] = useState({
    total: 0,
    color: "bg-middle-green",
  });
  const [averageGoals, setAverageGoals] = useState({
    total: 0,
    color: "bg-middle-green",
  });

  const clientsCount = (clients) => {
    const totalActiveClients = clients?.filter(
      (client) => client.clientactive === "1"
    ).length;
    // const found = months.find((element) => element.month === currentMonth);
    // const fiftyPercent = found.total / 2;
    // const seventifyPercent = (found.total * 75) / 100;
    // console.log('count active clients', clients.length)

    if (totalActiveClients < 10) {
      setNumberOfActiveClients({
        ...numberOfActiveClients,
        total: totalActiveClients,
        color: "bg-light-red",
      });
    }
    if (totalActiveClients >= 11 && totalActiveClients <= 20) {
      setNumberOfActiveClients({
        ...numberOfActiveClients,
        total: totalActiveClients,
        color: "bg-orange",
      });
    }

    if (totalActiveClients > 20) {
      setNumberOfActiveClients({
        ...numberOfActiveClients,
        total: totalActiveClients,
        color: "bg-middle-green",
      });
    }
  };

  const calculateAverageDays = () => {
    let total = 0;
    const activeClients = clients?.filter(
      (client) => client.clientactive === "1"
    )
    const totalActiveClients = activeClients.length;

    activeClients.forEach((client, index) => {
      let date1;
     
      if (ProgressNotesXClient?.some(pn => pn.clientid === client.clientid)) {
        // console.log("pasa pn")
        const progressnotedate = ProgressNotesXClient.find(pn => pn.clientid === client.clientid)?.progressnotedate
        date1 = new Date(progressnotedate);
     
      } else if (sapXClient?.some(pn => pn.clientid === client.clientid)){
        // console.log("pasa sap")

        const planstartdate = sapXClient?.find(pn => pn.clientid === client.clientid)?.planstartdate
        date1 = new Date(planstartdate);

      }
      else if (msaFormsXClient?.some(pn => pn.clientid === client.clientid)){
        // console.log("pasa sap")

        const planstartdate = msaFormsXClient?.find(pn => pn.clientid === client.clientid)?.msaformdate

        date1 = new Date(planstartdate);

      } else {
        // console.log("pasa date created")

        date1 = new Date(client?.clientdatecreated)
      }

      let date2 = new Date();
     
      const diffTime = Math.abs(date2 - date1);
      const difference = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      

      total = total + difference;
    
      return total;
    });
    
    const newTotal = monitorMetrics?.reduce((acc, curr) => acc + curr.average ,0)
    
    console.log(monitorMetrics, newTotal)
    let average = newTotal / totalActiveClients;



    if (average > 30) {
      setAverageDays({
        ...averageDays,
        total: average.toFixed(0),
        color: "bg-light-red",
      });
    }
    if (average > 15 && average < 30) {
      setAverageDays({
        ...averageDays,
        total: average.toFixed(0),
        color: "bg-orange",
      });
    }
    if (average < 15) {
      setAverageDays({
        ...averageDays,
        total: average.toFixed(0),
        color: "bg-middle-green",
      });
    }
  };

  const calculateNumberOfGoals = () => {
    let total = 0;

    const activeClients = clients?.filter(
      (client) => client.clientactive === "1"
    )
    const totalActiveClients = activeClients.length;


    clientSaps?.forEach((client, index) => {
     
      client.saps.forEach(sap => {
        if (sap.goal1Completed === '0') {
          total += 1
        }  

      })
    });
    // console.log("total",)
    let average = total / totalActiveClients;
    if (average > 1) {
      setAverageGoals({
        ...averageGoals,
        total: average.toFixed(1),
        color: "bg-light-red",
      });
    }
    if (average > 0 && average <= 1) {
      setAverageGoals({
        ...averageGoals,
        total: average.toFixed(1),
        color: "bg-orange",
      });
    }
    if (average === 0) {
      setAverageGoals({
        ...averageGoals,
        total: average.toFixed(1),
        color: "bg-middle-green",
      });
    }
  };

  useEffect(() => {
    clientsCount(clients);
    calculateAverageDays();
    calculateNumberOfGoals();
  }, [clients, ]);

  return (
    <div className="key-metrics grid grid-cols-1 gap-2 mx-3 md:mx-0">
      <div className="grid grid-cols-2 rounded shadow gap-9 bg-white py-2 px-5">
        <div className="flex">
          <img src="/supervisor/key-metrics.svg" />
          <h2 className="font-bold ml-3">Key Metrics</h2>
        </div>
        <div className="grid grid-rows-3 md:grid-rows-none md:grid-cols-3 gap-2 md:w-4/6 md:justify-self-end">
          <div className="flex items-center justify-start gap-2 ">
            <div className="px-4 text-center py-2 rounded bg-middle-green"></div>
            <span className="font-medium">on track</span>
          </div>
          <div className="flex items-center justify-start md:justify-end gap-2 ">
            <div className="px-4 text-center py-2 rounded bg-orange"></div>
            <span className="font-medium">warning</span>
          </div>
          <div className="flex items-center justify-start md:justify-end gap-2 ">
            <div className="px-4 text-center py-2 rounded bg-light-red"></div>
            <span className="font-medium">alert</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2  .bg-middle-white ">
        <div className="flex flex-col items-center  gap-2 p-4 bg-white rounded shadow-md">
          <p
            className={`${
              numberOfActiveClients ? numberOfActiveClients.color : "bg-white"
            } flex items-center justify-center text-2xl font-bold py-5 rounded w-full`}
          >
            {numberOfActiveClients ? numberOfActiveClients.total : "0"}
          </p>
          <p className="bg-white text-center py-12 md:py-0 flex items-center justify-center font-semibold text-lg p-4 py-5">
            Number of active clients
          </p>
          <img src="/supervisor/number_active_clients.svg" alt="" />
        </div>
        <div className="flex flex-col items-center  gap-2 p-4 bg-white rounded shadow-md">
          <p
            className={`${averageDays.color} flex items-center justify-center text-2xl font-bold py-5 rounded w-full`}
          >
            {averageDays ? averageDays.total : "0"}
          </p>
          <p className="bg-white text-center py-12 md:py-0 flex items-center justify-center font-semibold text-lg p-4">
            Average # of days between client visits
          </p>
          <img src="/supervisor/avrg_of_days.svg" alt="" />
        </div>
        <div className="flex flex-col items-center  gap-2 p-4 bg-white rounded shadow-md">
          <p
            className={`${averageGoals.color} flex items-center justify-center text-2xl font-bold py-5 rounded w-full`}
          >
            {averageGoals ? averageGoals.total : "0"}
          </p>
          <p className="bg-white text-center py-12 md:py-0 flex items-center justify-center font-semibold text-lg p-4">
            Average number of client goals outstanding
          </p>
          <img src="/supervisor/avrg_active_clients.svg" alt="" />
        </div>
        {/*  <div className="grid grid-rows-2">
            <p className="bg-white text-center py-12 md:py-0 flex items-center justify-center font-semibold text-lg p-4">
              % of clients who say they have reduced unsafe sexual behavior
              after 3 months
            </p>
            <p className="bg-middle-green flex items-center justify-center text-2xl font-bold">
              72%
            </p>
          </div> */}
        {/* <div className="grid grid-rows-2">
            <p className="bg-white text-center py-12 md:py-0 flex items-center justify-center font-semibold text-lg p-4">
              % of clients who say they are undetectable after 3 months
            </p>
            <p className="bg-middle-green flex items-center justify-center text-2xl font-bold">
              63%
            </p>
          </div> */}
      </div>
    </div>
  );
}
