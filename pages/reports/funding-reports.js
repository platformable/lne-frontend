import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

import BackToDashboardButton from "../../components/BackToDashboardButton";
import BackButton from "../../components/BackButton";

import Textarea from "../../components/Textarea";
import ColumnsTable2 from "../../components/2ColumnsTable";
import ThreeColumnsTable from "../../components/ThreeColumnsTable";
import DateRangeComponent from "../../components/DateRangeComponent";

const fundingReport = ({
  clients,
  progressNotes,
  condomsDistributed,
  supportGroups,
}) => {
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedProgressNotes, setSelectedProgressNotes] = useState([]);
  const [selectedCondoms, setSelectedCondoms] = useState([]);
  const [selectedSupportGroups, setSelectedSupportGroups] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const generateReport = () => setShowReport((prev) => !prev);
  // console.log("selectedClients", selectedClients);
  // console.log("selectedProgressNotes", selectedProgressNotes);
  // console.log("selectedCondoms", selectedCondoms);
  // console.log("selectedSupportGroups", selectedSupportGroups);
  // console.log("clients", clients);
  // console.log("progressNotes", progressNotes);
  // console.log("supportGroups", supportGroups);

  const [condomsDistributedNumbers, setCondomsDistributedNumbers] = useState({
    kitsdistributed: { title: "Safe Sex kits distributed", number: 0 },
    extcondomsdistributed: {
      title: "Condoms distributed outside of office",
      number: 0,
    },
    intcondomsdistributed: {
      title: "Condoms distributed at LNE office",
      number: 0,
    },
    oralcondomsdistributed: { title: "Oral condoms distributed", number: 0 },
    lubesdistributed: { title: "Lube satchets distributed", number: 0 },
    dentaldamsdistributed: { title: "Dental dams distributed", number: 0 },
  });
  const [servicesProvidedNumbers, setServicesProvidedNumbers] = useState({
    benefitsassistance: {
      title: "Assitance with Benefits/Entitlements",
      number: 0,
    },
    housingassistance: { title: "Assistance with Housing", number: 0 },
    employmentassistance: {
      title: "Assistance with Employment/Education",
      number: 0,
    },
    cd4vllabreport: { title: "CD4/VL Lab Report Check", number: 0 },
    comprehensiveriskbehaviorassessmentupdates: {
      title: "Comprehensive Behavioral Risk Assesment",
      number: 0,
    },
    developmentactionplan: { title: "Development of Action Plan", number: 0 },
    escort: { title: "Escort", number: 0 },
    comprehensiveriskbehaviorassessment: { title: "Intake", number: 0 },
    implementationactionplan: {
      title: "Implementation of Action Plan",
      number: 0,
    },
    preventioncounselling: { title: "Linkage to HIV Testing", number: 0 },
    linkagetoservices: { title: "Linkage to HVC Screening", number: 0 },
    linkagetoservices: { title: "Linkage to STD Screening", number: 0 },
    supportivecounselling: { title: "Supportive Counseling", number: 0 },
    treatmenteducation: { title: "Treatment Adherence Assesment", number: 0 },
  });
  console.log("selectedprogressotes", selectedProgressNotes);

  useEffect(() => {
    Object.keys(condomsDistributedNumbers)?.map((item) => {
      selectedCondoms.map((row) => {
        const convertNumber = !row[item] ? 0 : Number(row[item]);
        setCondomsDistributedNumbers((prev) => ({
          ...prev,
          [item]: { ...prev[item], number: convertNumber },
        }));
      });
    });
  }, [showReport]);

  useEffect(() => {
    Object.keys(servicesProvidedNumbers)?.map((item) => {
      selectedProgressNotes.map((row) => {
        const convertNumber = !row[item] ? 0 : Number(row[item]);
        setServicesProvidedNumbers((prev) => ({
          ...prev,
          [item]: { ...prev[item], number: convertNumber },
        }));
      });
    });
  }, [showReport]);

  const filterService = (serviceName, initialArray) => {
    const filtered = initialArray.filter((service, index) => {
      return service[serviceName] === "1";
    });

    console.log("filtered", filtered);

    return filtered;
  };


  const services = [
    {name:'Assistance with Benefits/Entitlements', value:'benefitsassistance'},
    {name:'Assistance with Housing', value: 'housingassistance'},
    {name:'Assistance with Employment/Education', value: 'employmentassistance'},
    {name:'CD4/VL Lab Report Check', value: 'cd4vllabreport'},
    {name:'Comprehensive Behavioral Risk Assessment',value:  'comprehensivebehavioralriskassessmentupdates'},
    {name:'Development of Action Plan', value: 'developmentactionplan'},
    {name:'Escort',value: 'escort'},
    {name:'Intake',value:  'comprehensivebehavioralriskassessment'},
    {name:'Implementation of Action Plan', value: 'implementationactionplan'},
    {name:'Linkage to HIV Testing', value: 'preventioncounselling'},
    {name:'Linkage to HCV Screening',value:  'linkagetoservices'},
    {name:'Linkage to STD Screening',value:  'linkagetoservices'},
    {name:'Supportive Counseling',value:  'supportivecounselling'},
    {name:'Treatment Adherence Assessment', value: 'treatmenteducation'}

  ]
  return (
    <Layout>
      <div className="bg-white">
        <section className="container mx-auto shadow-inner">
          <div className="py-5 flex gap-x-5">
            <BackButton />
            <BackToDashboardButton />
          </div>

          <div className="grid grid-cols-2 py-5">
            <h1 className="font-bold px-2">Prepare Funding Reports</h1>
            <div className="flex justify-end self-end"></div>
          </div>
        </section>
      </div>

      <section className="my-10">
        <div className="container mx-auto grid-cols-1 gap-5">
          <DateRangeComponent
            generateReport={generateReport}
            clients={clients}
            setSelectedClients={setSelectedClients}
            progressNotes={progressNotes}
            setSelectedProgressNotes={setSelectedProgressNotes}
            condomsDistributed={condomsDistributed}
            setSelectedCondoms={setSelectedCondoms}
            supportGroups={supportGroups}
            setSelectedSupportGroups={setSelectedSupportGroups}
          />



          {showReport && (
            <>
              <ColumnsTable2
                datapoints={Object.entries(condomsDistributedNumbers)}
                title="Number of resources distributed"
              />
              <ColumnsTable2
                datapoints={Object.entries(servicesProvidedNumbers)}
                title="Number of services provided"
              />

              <ThreeColumnsTable data={selectedCondoms} />


              {services ? services.map((service,index)=>{
                return (<Textarea
                    key={index}
                    service={service.name}
                    data={filterService(service.value, selectedProgressNotes)}
                  />)
              }):null}



            </>

            
          )}
        </div>
      </section>
    </Layout>
  );
};

export default fundingReport;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    try {
      const [clients, progressNotes, supportGroups, condomsDistributed] =
        await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`).then((r) =>
            r.json()
          ),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes`).then(
            (r) => r.json()
          ),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/support_groups`).then(
            (r) => r.json()
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/supplies_distributed`
          ).then((r) => r.json()),
        ]);
      return {
        props: {
          clients: clients,
          progressNotes: progressNotes,
          supportGroups: supportGroups,
          condomsDistributed: condomsDistributed,
        },
      };
    } catch (error) {
      return { props: { message: "An error ocurred" } };
    }
  },
});
