import React, { useEffect, useState, useMemo,useRef } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

import BackToDashboardButton from "../../components/BackToDashboardButton";
import BackButton from "../../components/BackButton";

import Textarea from "../../components/Textarea";
import ColumnsTable2 from "../../components/2ColumnsTable";
import ThreeColumnsTable from "../../components/ThreeColumnsTable";
import DateRangeComponent from "../../components/DateRangeComponent";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

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
        id:1,
      title: "Assitance with Benefits/Entitlements",
      number: 0,
    },
    housingassistance: { title: "Assistance with Housing", number: 0, id:2, },
    employmentassistance: {
      title: "Assistance with Employment/Education",
      number: 0,
    },
    cd4vllabreport: { title: "CD4/VL Lab Report Check", number: 0, id:3, },
    comprehensiveriskbehaviorassessmentupdates: {
        id:3,
      title: "Comprehensive Behavioral Risk Assesment",
      number: 0,
    },
    developmentactionplan: { title: "Development of Action Plan", number: 0, id:4, },
    escort: { title: "Escort", number: 0 , id:5,},
    comprehensiveriskbehaviorassessment: { title: "Intake", number: 0, id:6, },
    implementationactionplan: {
      title: "Implementation of Action Plan",
      number: 0,
      id:7,
    },
    preventioncounselling: { title: "Linkage to HIV Testing", number: 0, id:8, },
    linkagetoservices: { title: "Linkage to HVC Screening", number: 0, id:9, },
    linkagetoservices: { title: "Linkage to STD Screening", number: 0, id:10, },
    supportivecounselling: { title: "Supportive Counseling", number: 0, id:11, },
    treatmenteducation: { title: "Treatment Adherence Assesment", number: 0, id:12, },
  });
  //console.log("selectedprogressotes", selectedProgressNotes);

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

    return filtered;
  };

  const services = [
    {
      name: "Assistance with Benefits/Entitlements",
      value: "benefitsassistance",
    },
    { name: "Assistance with Housing", value: "housingassistance" },
    {
      name: "Assistance with Employment/Education",
      value: "employmentassistance",
    },
    { name: "CD4/VL Lab Report Check", value: "cd4vllabreport" },
    {
      name: "Comprehensive Behavioral Risk Assessment",
      value: "comprehensivebehavioralriskassessmentupdates",
    },
    { name: "Development of Action Plan", value: "developmentactionplan" },
    { name: "Escort", value: "escort" },
    { name: "Intake", value: "comprehensivebehavioralriskassessment" },
    {
      name: "Implementation of Action Plan",
      value: "implementationactionplan",
    },
    { name: "Linkage to HIV Testing", value: "preventioncounselling" },
    { name: "Linkage to HCV Screening", value: "linkagetoservices" },
    { name: "Linkage to STD Screening", value: "linkagetoservices" },
    { name: "Supportive Counseling", value: "supportivecounselling" },
    { name: "Treatment Adherence Assessment", value: "treatmenteducation" },
  ];

  const countClientsPn = () => {
    const clientList = [];

    const checkIfExistOnList = selectedProgressNotes.forEach(
      (client, index) => {
        const check = clientList.filter(
          (oldclient) => oldclient.progressnotedate === client.progressnotedate
        );
        check.length === 0 ? clientList.push(client) : null;
      }
    );
    return clientList.length;
  };

  const dataPointA = countClientsPn();
  const datapointB =  useMemo(() => selectedProgressNotes?.reduce((acc, curr) => acc.includes(curr.clientid) ? acc : acc.concat(curr.clientid) , []), [showReport]).length;
  const datapointC = selectedProgressNotes.length;

  const datapointD = useMemo(() => selectedSupportGroups?.filter(group => {
    let regex = /^(men|mens)$/i
    return regex.test(group.supportgroupaudience);
   }), [showReport]).length
  const datapointE = useMemo(() => selectedSupportGroups?.filter(group => {
    let regex = /^(women|womens)$/i
    return regex.test(group.supportgroupaudience);
   }), [showReport]).length
  const datapointF = useMemo(() => selectedSupportGroups?.filter(group => {
    return new RegExp(`\\b(men and women|mens and womens)\\b`).test(group.supportgroupaudience);
   }), [showReport]).length

  const linkageRetenctionServicesText = `
  MSA staff performed a total of ${dataPointA} HNE Encounters to ${datapointB} unduplicated clients, totaling ${datapointC} services. HNS services are provided only to HIV positive clients. This alleviates staff from falling off target dates, and managing caseloads. Linkages to detox and other drug treatment services will be counted as referrals.
  `;

  const supportGroupText = `${datapointD} groups were held in this reporting month for the men in the program. ${datapointE} groups were held for women in the program.`;



  const linkageRef = useRef(null);
  const spRef = useRef(null);
  const divRef3 = useRef(null);

  const notifyMessage = () => {
    toast.success("Content copied", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleCopyText = async (ref) => {

    try {
      const textToCopy = linkageRef.current.innerText;
      await navigator.clipboard.writeText(textToCopy);
      notifyMessage()
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleSPCopyText = async (ref) => {

    try {
      const textToCopy = spRef.current.innerText;
      await navigator.clipboard.writeText(textToCopy);
      notifyMessage()

    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };





//   console.log("selectedProgressNotes",selectedProgressNotes)
  return (
    <Layout>
        <ToastContainer autoClose={800} />
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
              <div className="bg-white rounded-md shadow-md p-5 my-5">
                <h3 className="font-bold text-2xl my-5">Condoms Distributed</h3>
               
                <ColumnsTable2
                name={'table1'}
                  datapoints={Object.entries(condomsDistributedNumbers)}
                  title="Number of resources distributed"
                  notifyMessage={notifyMessage}
                />
                
              
                <ThreeColumnsTable data={selectedCondoms} notifyMessage={notifyMessage}/>

    
              </div>

              <div className="bg-white rounded-md shadow-md p-5 my-5">
                <h3 className="text-xl font-bold my-5 ">
                  {" "}
                  Linkage, Retention and Adherence Services - PLWHA
                </h3>
                <div className="border-black p-5 " ref={linkageRef}>
                  <p className="text-lg">{linkageRetenctionServicesText}</p>
                </div>
                <div className="flex justify-center my-5">
                  <button onClick={handleCopyText} className="bg-yellow py-2  rounded px-20 flex gap-3 items-center flex shadow">
                    <p className="text-lg"> Copy text</p>
                  </button>
                </div>

                <ColumnsTable2
                name={'table2'}
                  datapoints={Object.entries(servicesProvidedNumbers)}
                  title="Number of services provided"
                  notifyMessage={notifyMessage}
                />
       

                {services
                ? services.map((service, index) => {
                    return (
                      <Textarea
                        key={index}
                        service={service.name}
                        data={filterService(
                          service.value,
                          selectedProgressNotes
                        )}
                        stateValue={"progressnotetext"}
                      />
                    );
                  })
                : null}
              </div>


              <div className="bg-white rounded-md shadow-md p-5 my-5">
             
              <h3 className="text-xl font-bold my-5 ">
                  Support Groups
                </h3>
                <div className="border-black p-5 " ref={spRef}>
                  <p className="text-lg">{supportGroupText}</p>
                </div>

                <div className="flex justify-center my-10">
                  <button onClick={handleSPCopyText} className="bg-yellow py-2  rounded px-20 flex gap-3 items-center flex shadow">
                    <p className="text-lg"> Copy text</p>
                  </button>
                </div>

                <h3 className="text-xl font-bold my-5 ">
                Here all support group narratives for that can be summarized
                into a text statement:
                </h3>
               
                <div id="SupportGroups" className=" table-list">
                  {selectedSupportGroups && (
                    <>
                    <div className="bg-light-blue p-5 rounded-md">
                      <ul>
                        {selectedSupportGroups?.map((item, index) => {
                          return (
                            <li className="my-5" key={index}>{item.supportgroupsummary}</li>
                          );
                        })}
                       
                      </ul>
                      </div>
                    </>
                  )}
                </div>
             
         
              </div>
              

             

             
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
