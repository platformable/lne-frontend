import React, { useEffect, useState } from "react";
import backIcon from "../public/BACKicon.svg";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import ChartGraphic from "../components/ChartGraphic";
import ClientsEncounterCharts from "../components/ClientsEncounterCharts";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import ToogleButton from "../components/ToogleButton";
import BackToDashboardButton from "../components/BackToDashboardButton";
import BackButton from "../components/BackButton";
import KeyMetrics from "../components/KeyMetrics";

const Services = ({clients, msaFormsXClient, sapXClient, ProgressNotesXClient, clientSaps }) => {
  const [monitorMetricsData, setMonitorMetricsData] = useState([]);
  const calculateDaysBetweenTwoDates = (date1, date2) => {
        
    let date_1 = new Date(date1);
    let date_2 = date2 ?  new Date(date2) : new Date();
    let difference = date_2.getTime() - date_1.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays - 1;
  };

  const calculateDaysBetweenDates = (clientStartDate) => {
    let date_1 = new Date(clientStartDate);
    let date_2 = new Date();
    let difference = date_2.getTime() - date_1.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays- 1;
  };
  const calculateLastEncounter = (
    client
   ) => {
       let date1;
      
       if (ProgressNotesXClient?.some(pn => pn.clientid === client.clientid)) {
         // console.log("pasa pn", client.clientid)
         const progressnotedate = ProgressNotesXClient.find(pn => pn.clientid === client.clientid)?.progressnotedate
         date1 = new Date(progressnotedate);
      
       } else if (sapXClient?.some(pn => pn.clientid === client.clientid)){
         // console.log("pasa sap", client.clientid)
 
         const planstartdate = sapXClient?.find(pn => pn.clientid === client.clientid)?.planstartdate
         date1 = new Date(planstartdate);
 
       }
       else if (msaFormsXClient?.some(pn => pn.clientid === client.clientid)){
         // console.log("pasa msa",client.clientid)
 
         const msaformDate = msaFormsXClient?.find(pn => pn.clientid === client.clientid)?.msaformdate
         date1 = new Date(msaformDate);
 
       } else {
         // console.log("pasa nada", client.clientid)
 
         date1 = new Date(client?.clientdatecreated)
       }
       return date1
    
   };
 
  const updateMonitorMetricData = async () => {
    const newClients = [];
    const activeClients = clients?.filter(
      (client) => client.clientactive === "1"
    )
    activeClients.forEach((client, index) => {
      const newClient = {};
      /*   newClient.progressnote = []; */
      newClient.clientid = client.clientid;
      
      newClient.serviceActionPlanDate = sapXClient?.some(pn => pn.clientid === client.clientid) ?  new Date(sapXClient?.find(pn => pn.clientid === client.clientid)?.planstartdate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        : "-";

      newClient.progress_notes = ProgressNotesXClient?.find(pn => pn.clientid === client.clientid)?.pn || []
      newClient.saps = clientSaps?.find(pn => pn.clientid === client.clientid)?.saps || []
      newClient.msa = msaFormsXClient?.find(pn => pn.clientid === client.clientid)?.msaformdate ||''


      // console.log("************",[...newClient.saps , ...newClient.progress_notes])

     
      let resultado;
      // const dates = [...newClient.saps , ...newClient.progress_notes].reduce((acc, curr) acc - curr., 0)
      if (newClient.progress_notes.length === 2 ) {
        resultado =  calculateDaysBetweenTwoDates(newClient?.progress_notes[1]?.progressnotedate,newClient?.progress_notes[0]?.progressnotedate)

      }

      if (newClient?.progress_notes.length === 1 && newClient?.saps.length ===  2 ) {

        resultado =  calculateDaysBetweenTwoDates(newClient?.saps[1]?.planstartdate, newClient?.progress_notes[0]?.progressnotedate,)
        // console.log("resultado, resu", resultado)   
      }

      
      if (newClient?.progress_notes.length === 1 && newClient?.saps.length ===  1 ) {

        resultado =  calculateDaysBetweenTwoDates(newClient?.saps[0]?.planstartdate, newClient?.progress_notes[0]?.progressnotedate)
        // console.log("resultado, resu", resultado)   
      }
      
      if (newClient?.progress_notes.length === 0 && newClient?.saps.length ===  2 ) {

        resultado =  calculateDaysBetweenTwoDates(newClient?.saps[0]?.planstartdate,newClient?.saps[1]?.planstartdate)
        // console.log("resultado, resu", resultado)   
      }

      if (newClient?.progress_notes.length === 0 && newClient?.saps.length ===  1 ) {

        resultado =  calculateDaysBetweenTwoDates(newClient?.msa.split("T")[0] || client.clientdatecreated?.split('T')[0], newClient?.saps[0]?.planstartdate)
        // console.log("resultado, resu", resultado)   
      }

      
      if (newClient?.progress_notes.length === 0 && newClient?.saps.length ===  0 && newClient.msa) {

        resultado =  calculateDaysBetweenTwoDates(newClient?.msa.split("T")[0])
        // console.log("resultado, resu", resultado)   
      }

      if (!newClient?.msa && client.clientdatecreated && newClient?.saps.length ===  0 && newClient?.progress_notes.length ===  0 ) {

        resultado =  calculateDaysBetweenTwoDates(client.clientdatecreated)

      }

      newClient.average = resultado 



      newClient.startdate = client.clientdatecreated;
      newClient.firstname = client.clientfirstname;
      newClient.lastname = client.clientlastname;
      // newClient.clienthcwname = client.clienthcwname;
      /* newClient.progressnotes = client.progressnotes.length; */
      // newClient.progressNotesDates = client.progressnotes;
      newClient.lastEncounter = calculateDaysBetweenDates(calculateLastEncounter(
        client
      ));

      newClient.joining = calculateDaysBetweenDates(client.clientdatecreated);

      if (clientSaps.some(cl => client.clientid === cl.clientid)) {
        const clientsap = clientSaps.find(cl => client.clientid === cl.clientid)
        newClient.goals = parseInt(clientsap.goal1completed || 0) + parseInt(clientsap.goal2completed || 0) 
      } else {
        newClient.goals = 0

      }
        // console.log("goal 323123", newClient)

      newClients.push(newClient);
    });
    // console.log("-----------------------",newClients)

    setMonitorMetricsData(newClients);
  };

  useEffect(() => {
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

          <div className="grid grid-cols-2 py-5">
            <h1 className="font-bold px-2">Manage Services</h1>
            <div className="flex justify-end self-end"></div>
          </div>
        </section>
        <section className="bg-light-blue py-10">
          <div className="container mx-auto grid-cols-1 gap-5">
            {/* KEY METRICS */}

            <KeyMetrics clients={clients} msaFormsXClient={msaFormsXClient} sapXClient={sapXClient} ProgressNotesXClient={ProgressNotesXClient} clientSaps={clientSaps} monitorMetrics={monitorMetricsData}/>


        


            <h1 className="mb-4 my-10 container mx-auto text-center md:text-left lg:pl-0 font-bold">
              What do you want <span className="bg-yellow px-1"> to do</span>{" "}
              today?
            </h1>
            <div className="grid md:grid-cols-7 grid-cols-1 gap-5 px-5 md:px-0 pb-5 my-10">
              <div className="p-3 py-5 rounded-md bg-white shadow-md cursor-pointer">
                <Link href={"/monitorFunding"}>
                  <figure className="flex flex-col items-center">
                    <img
                      src="/supervisor/monitor_funding_requirements.svg"
                      className="mb-5"
                      alt="monitor STAFF PROGRESS"
                    ></img>
                    <figcaption className="font-bold  text-center">
                      Monitor <br/>
                      Funding <br/>
                      Requirements
                    </figcaption>
                  </figure>
                </Link>
              </div>
              <div className="p-3 py-5 rounded-md bg-white shadow-md cursor-pointer">
                <Link href={"/reports/funding-reports"}>
                  <figure className="flex flex-col items-center">
                    <img
                      src="/prepare_funding_report_icon.svg"
                      className="mb-5"
                      alt="monitor STAFF PROGRESS"
                    ></img>
                    <figcaption className="font-bold  text-center">
                      Prepare Funding <br/>
                      Report <br/>
                    
                    </figcaption>
                  </figure>
                </Link>
              </div>
            </div>
            {/* <div className="p-3 rounded-md bg-white shadow-md">
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
            {/*  <div className="p-3 rounded-md bg-white shadow-md">
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
        </section>
      </div>
    </Layout>
  );
};

export default Services;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const [clients, msaFormsXClient, sapXClient, ProgressNotesXClient, clientSaps] = await Promise.all([
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
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/monitor_funding/metrics/monitor_funding_allClients_Saps`
      ).then((r) => r.json()),
    ]);
    return {
      props: {
        clients,
        msaFormsXClient,
        sapXClient,
        ProgressNotesXClient,
        clientSaps
      },
    };
  },
});
