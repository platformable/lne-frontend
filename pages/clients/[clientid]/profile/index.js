import React, { useState, useEffect } from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Image from "next/image";
import BackToDashboardButton from "../../../../components/BackToDashboardButton";
import EditClientModal from "../../../../components/EditClientModal";
import DeleteClientModal from "../../../../components/DeleteClientModal";
import DeleteModal from "../../../../components/DeleteModal";
import ProfilePageBaselineData from "../../../../components/ProfilePageBaselineData";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";
import BackButton from "../../../../components/BackButton";
import SubHeader from "../../../../components/SubHeader";

export function getDatex(string) {
  const date = new Date(string);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const result = `${month}/${day}/${year}`;
  return result;
}
export function setLocaleDateString(date) {

  const fecha = Date.parse(date);
  const newDate = new Date(fecha)
    .toLocaleDateString()
    .replace("/”,“-")
    .replace("/”,“-");
  const separatedDate = newDate.split("-");
  const finalDate = `${separatedDate[2]}-${
    separatedDate[1]?.length === 1 ? `0${separatedDate[1]}` : separatedDate[1]
  }-${
    separatedDate[0]?.length === 1 ? `0${separatedDate[0]}` : separatedDate[0]
  }`;
  return finalDate;
}



export default function ClientProfilePage({
  data,
  clientTotalGoals,
  progNotes
}) {
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showDeleteClientModal, setShowDeleteClientModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProgressNoteId, setSelectedProgressNoteId] = useState("");
/*   const [progNotes, setProgNotes] = useState([]); */
// console.log("data server msaform", data)


  const { user, error, isLoading } = useUser();
  const loggedUserRole =
    user && user["https://lanuevatest.herokuapp.com/roles"];

console.log("clientTotalGoals",clientTotalGoals)
console.log("data",data)
  const checkMessage1 = () => {
    let result;
    let color;
    if (
      (data?.msaformairsintakeform === "0" ||
        data?.msaformairsintakeform === null) &&
      data?.servicesactionplanid === null
    ) {
      result = "You need to fill in \n the client’s Intake Form";
      color = "bg-red-400";
    }
    if (
      data?.msaformairsintakeform === "1" &&
      data?.msaformcomprehensiveriskbehavrioassesment !== "1"
    ) {
      result = "You need to fill in \n the client’s CBRA Form";
      color = "bg-red-400";
    }

    if (
      data?.msaformairsintakeform === "1" &&
      data?.msaformcomprehensiveriskbehavrioassesment === "1" &&
      data?.servicesactionplanid !== "1"
    ) {
      result = "You need to draft the client’s \n Service Action Plan and sign";
      color = "bg-orange-300";
    }

    if (
      data?.msaformairsintakeform === "1" &&
      data?.msaformcomprehensiveriskbehavrioassesment === "1" &&
      data?.servicesactionplanid !== null &&
      (data?.msahnselegibilityform !== "1" ||
        data?.msaformhnsreadinessform !== "1")
    ) {
      result = "You need to fill in the client’s HNS Forms";
      color = "bg-orange-300";
    }

    if (
      data?.msaformairsintakeform === "1" &&
      data?.msaformcomprehensiveriskbehavrioassesment === "1" &&
      data?.servicesactionplanid !== null
      //  && (data?.msahnselegibilityform === "1" && data?.msaformhnsreadinessform ==='1')
    ) {
      result = `All core documents\
       are up to date`;
      color = "bg-green-300";
    }

    return (
      <div className="flex flex-col justify-start h-full">
        <div
          className={`flex ${color} px-5 py-3  items-center rounded-sm shadow-md justify-center`}
        >
          {color === "bg-green-300" && (
            <p className="text-center text-lg">On Track</p>
          )}
          {color === "bg-orange-300" && (
            <p className="text-center text-lg">Warning</p>
          )}
          {color === "bg-red-400" && (
            <p className="text-center text-lg">Alert</p>
          )}
        </div>
        <p className="text-center my-3  text-center text-lg">
          {result}
        </p>
        <div className="flex justify-center mt-auto">
          <img
            src="/client/alerticonMSAdoc.svg"
            className="mt-3"
            alt=""
            width={50}
          />
        </div>
      </div>
    );
  };

  const checkMessage2 = () => {
    const completedGoals = {
      goal1: {
        summary: data?.goal1summary,
        completed: data?.goal1completed,
      },
      goal2: {
        summary: data?.goal2summary,
        completed: data?.goal2completed,
      },
      // goal3: {
      //   summary: data?.goal3summary,
      //   completed: data?.goal3completed,
      // },
    };
    let result = "-";
    let alert = "-";
    let color = "bg-red-400";
    let totalGoals = clientTotalGoals[0].totalClientGoalsSummaries;
    let totalGoalsCompleted = Number(clientTotalGoals[0].totalGoalsCompleted);
    let totalGoalsNotCompleted = Number(clientTotalGoals[0].totalGoalsNotCompleted);


    if (totalGoals === 0 && totalGoalsCompleted === 0) {
      color = "bg-green-300";
      result = "No goals yet";
      alert = "On Track"
      
    }
    
    if (totalGoals > 0 && totalGoals === totalGoalsCompleted) {
      result = "All client goals have been completed!";
      color = "bg-green-300";
      alert = "On Track"

    }


    if (totalGoals > 0 && totalGoalsCompleted <1 ) {
      color = "bg-orange-300";
      result = `There are ${
        clientTotalGoals[0]?.totalClientGoalsSummaries 
      } client goals outstanding`;
      alert = "Warning"
      
    }
    if (totalGoalsNotCompleted === 1) {
      color = "bg-orange-300";
      result = `There are ${
        totalGoalsNotCompleted 
      } client goals outstanding`;
      alert = "Warning"
      
    }

    if (totalGoalsNotCompleted > 1) {
      color = "bg-red-400";
      result = `There are ${
        totalGoalsNotCompleted 
      } client goals outstanding`;
      alert = "Alert"
      
    }

    /*     if (totalGoals > 0 && totalGoalsCompleted === 0) {
      color = "bg-red-400";
      result = `There are ${
        totalGoals 
      } client goals outstanding`;
      alert = "Alert"
      
    } */

    return (
      <div className="flex flex-col justify-start h-full">
        <div
          className={`flex ${color} rounded-sm px-5  items-center shadow-md flex justify-center py-3`}
        >
          <p className="text-lg">{alert}</p>
        </div>

        <p className="px-4 my-3  text-center text-lg">{result}</p>
        <div className="flex justify-center items-center mt-auto">
          <img
            src="/client/alerticonserviceactionplan.svg"
            alt=""
            width={50}
            className="mt-3"
          />
        </div>
      </div>
    );
  };
  let fechaInicio = new Date(
    `2022-03-${Math.floor(Math.random() * (30 - 1 + 1) + 1)}`
  );

  const checkMessage3 = () => {
console.log("M3")
console.log("progNotes",progNotes)
    if (
      progNotes.length === 0 &&
        (data?.planstartdate === "" ||
      data?.planstartdate === null)
    ) {
      // const planstartdate = data?.planstartdate;

      let date_1 = new Date(data?.clientdatecreated)
          
      let date_2 = new Date();
      let difference = date_2.getTime() - date_1.getTime();

      let color = "bg-red-400";
      let fechaFin = new Date();

      let totalDays = Math.ceil(difference / (1000 * 3600 * 24))-1;
      // console.log("client data", data);
      if (totalDays <= 14) color = "bg-green-300";
      if (totalDays > 14 && totalDays < 30) color = "bg-orange-300";
      // if ()
      return (
        <div className="flex flex-col justify-start h-full">
          <div
            className={`flex ${color} rounded-sm px-5 items-center shadow-md flex items-center justify-center py-3`}
          >
            {color === "bg-green-300" && <p className="text-lg">On Track</p>}
            {color === "bg-orange-300" && <p className="text-lg">Warning</p>}
            {color === "bg-red-400" && <p className="text-lg">Alert</p>}
          </div>

          <p className="px-4 my-3  text-center text-lg pb-7">
            {totalDays > 0
              ? `You saw this client ${totalDays} days ago`
              : totalDays < 0
              ? `You will see this client soon`
              : `You saw this client today`}
          </p>

          <div className="flex justify-center items-center mt-auto">
            <img
              src="/client/alert-icon-progress-note.svg"
              alt=""
              width={50}
              className="mt-3"
            />
          </div>
        </div>
      );
    }
    if (
      progNotes.length === 0 &&
      (data?.planstartdate !== "" || data?.planstartdate !== null) 
    ) {
      const planstartdate = data?.planstartdate;

      let date_1 = new Date(planstartdate);
      let date_2 = new Date();
      let difference = date_2.getTime() - date_1.getTime();

      let color = "bg-red-400";
      let fechaFin = new Date();

      let totalDays = Math.ceil(difference / (1000 * 3600 * 24))-1;
      // console.log("client data", data);
      if (totalDays <= 14) color = "bg-green-300";
      if (totalDays > 14 && totalDays < 30) color = "bg-orange-300";
      // if ()
      return (
        <div className="flex flex-col justify-start h-full">
          <div
            className={`flex ${color} rounded-sm px-5 items-center shadow-md flex items-center justify-center py-3`}
          >
            {color === "bg-green-300" && <p>On Track</p>}
            {color === "bg-orange-300" && <p>Warning</p>}
            {color === "bg-red-400" && <p>Alert</p>}
          </div>

          <p className="px-4 my-3  text-center text-lg">
            {totalDays > 0
              ? `You saw this client ${totalDays} days ago`
              : totalDays < 0
              ? `You will see this client soon`
              : `You saw this client today`}
          </p>

          <div className="flex justify-center items-center mt-auto">
            <img
              src="/client/alert-icon-progress-note.svg"
              alt=""
              width={50}
              className="mt-3"
            />
          </div>
        </div>
      );
    }

    if (
      progNotes.length > 0 
    ) {
      // console.log("progress notes date");
      const lastProgressNote = progNotes[0]
      console.log("aqui > 0", lastProgressNote )
     

      let date_1 = new Date(data.progressnotedate)
      let date_2 = new Date();
      let difference = date_2.getTime() - date_1.getTime();

      let color = "bg-red-400";
      let fechaFin = new Date();

      let totalDays = Math.ceil(difference / (1000 * 3600 * 24))-1;
      // console.log("totalDays", totalDays);
      if (totalDays <= 14) color = "bg-green-300";
      if (totalDays > 14 && totalDays < 30) color = "bg-orange-300";
      if (totalDays > 30) color = "bg-red-400";
      return (
        <div className="flex flex-col justify-start h-full">
          <div
            className={`flex ${color} rounded-sm px-5 items-center shadow-md flex items-center justify-center py-3`}
          >
            {color === "bg-green-300" && <p className="text-lg">On Track</p>}
            {color === "bg-orange-300" && <p className="text-lg">Warning</p>}
            {color === "bg-red-400" && <p className="text-lg">Alert</p>}
          </div>

          <p className="px-4 my-3  text-center text-lg">
            {totalDays > 0
              ? `You saw this client ${totalDays} days ago`
              : `You saw this client today`}{" "}
          </p>
          <div className="flex justify-center mt-auto">
            <img
              src="/client/alert-icon-progress-note.svg"
              alt=""
              className="mt-3"
              width={50}
            />
          </div>
        </div>
      );
    }
  };

  const notifyMessage = (status) => {
    if (status === 'ok') {
      toast.success("Updating client", {
        position: toast.POSITION.TOP_CENTER,
      });
    } 
    if (status === 'fail') {
      toast.error('Something went wrong try again',{
        position: toast.POSITION.TOP_CENTER,
      })
    }
   
  };

  const notifyDeleteMessage = (status) => {
    
    if (status === 'ok') {
      toast.success("Deleting client", {
        position: toast.POSITION.TOP_CENTER,
      });
    } 
    if (status === 'fail') {
      toast.error('Something went wrong try again',{
        position: toast.POSITION.TOP_CENTER,
      })
    }
    
  };
  const notifyDeletePNMessage = (status) => {
    
    if (status === 'ok') {
      toast.success("Deleting client", {
        position: toast.POSITION.TOP_CENTER,
      });
    } 
    if (status === 'fail') {
      toast.error('Something went wrong try again',{
        position: toast.POSITION.TOP_CENTER,
      })
    }
    
  };
  
  const [hasMounted, setHasMounted] = useState(false);

/*   useEffect(() => {
    setHasMounted(true);

    const getPnData = async () => {
      const clientid = data?.clientid;
      const getPnData = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/profile_by_uniqueid/${clientid}`
      );
      const pnData = await getPnData.json();
      setProgNotes(pnData);
    };
    getPnData();
  }, [progNotes.progressnotes]);
  if (!hasMounted) {
    return null;
  }  */

  return (
    <>
      <Layout>
        <ToastContainer autoClose={1000} />
        <div className=" bg-light-blue h-full pb-20 ">
        <SubHeader pageTitle='Client Dashboard'/>
          <section className="pb-5 pt-10 container mx-auto md:px-0 px-5 ">
            <section className="dashboard-clients-cards md:px-0 px-5">
              <div className="container mx-auto my-10" id="profile">
                <div className="profile-client-information-top grid md:grid-cols-4 grid-cols-1 gap-x-5">
                  <div className="profile-client-information-top-1 bg-white rounded-md  shadow-md p-5">
                    <div className="flex gap-5 pb-7">
                      <img
                        src="/client/client_dashboard.svg"
                        className="self-start"
                        alt="user-icon"
                      />
                      <div>
                        {" "}
                        <p className="text-black font-bold text-2xl">
                          {data?.clientfirstname}{" "}
                          {data?.clientlastname.charAt(0)}
                        </p>
                        <p className="text-dark-blue text-lg">
                          {data?.clientid}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-x-1">
                        <img
                          src="/joining_date_icon.svg"
                          alt=""
                          width={"14px"}
                        />
                        <p className="text-lg">Joining date</p>
                      </div>
                      <p className="justify-self-end text-lg">
                        {new Date(
                          data?.clientdatecreated
                        ).toLocaleDateString("en-EN", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex justify-between gap-x-2">
                      <button
                        className="bg-blue-cards-btns w-full rounded-md px-5 block py-3 shadow-md  mt-5 text-sm  flex gap-x-2 items-center justify-center text-lg"
                        onClick={() =>
                          setShowEditClientModal(!showEditClientModal)
                        }
                      >
                        <img src="/edit.svg" alt="" width={"14px"} />
                        <p className="text-xl">Edit</p> 
                      </button>

                      <button
                        className="w-full rounded-md px-5 py-3 block shadow-md bg-black text-white mt-5 text-sm flex gap-x-2 items-center justify-center text-lg"
                        onClick={() =>
                          setShowDeleteClientModal(!showDeleteClientModal)
                        }
                        title="Delete this client"
                      >
                        <img
                          src="/delete_white.svg"
                          alt="delete button"
                          width={"11px"}
                        />
                       <p className="text-xl"> Delete</p>
                      </button>
                    </div>
                  </div>
                  {/* end first card */}

                  <div className="profile-client-information-top-2 bg-white rounded-md  shadow-md p-5">
                    {checkMessage1()}
                  </div>

                  <div className="profile-client-information-top-2 bg-white rounded-md  shadow-md p-5">
                    {checkMessage2()}
                  </div>

                  <div className="profile-client-information-top-2 bg-white rounded-md  shadow-md p-5">
                    {checkMessage3()}
                  </div>
                </div>
              </div>
            </section>
          </section>
          <section
            id="client-profile-page-navigation"
            className="mt-5 "
          >
            <div className="">
            <h1 className=" text-4xl mb-10 container mx-auto text-center md:text-left  lg:pl-0 font-bold">
                What do you want <span className="bg-yellow px-1"> to do</span>{" "}
                today?
              </h1>

              <div
                id="client-profile-page-navigation-container"
                className="container mx-auto grid justify-center mt-4 text-center 
                gap-8  md:grid-cols-3 md:border-0 lg:grid-cols-4 xl:grid-cols-6"
              >
                {loggedUserRole === "Supervisor" && (
                  <Link
                    href={
                      data?.msaformid
                        ? `/clients/${data?.clientid}/msa_form/supervisor_msa_form_edit`
                        : `/clients/${data?.clientid}/msa_form`
                    }
                  >
                    <div className="client-profile-page-navigation-icon-container shadow-md bg-blue-cards-btns cursor-pointer rounded-xl py-5 px-5 inline-block">
                      <div className="flex justify-center">
                        <img src="/client/MSA_button.svg" alt="" width={45} />
                      </div>
                      <h4 className="text-center">
                        {data?.msaformid === undefined ||
                        data?.msaformid === "" ||
                        data?.msaformid === null
                          ? (<p className="mt-5 text-2xl">Create  MSA Form</p>)
                          : (<p className="mt-5 text-2xl">Edit <br /> MSA Form</p>)}
                      </h4>
                    </div>
                  </Link>
                )}
{/* 
                {loggedUserRole === "DES" && (
                  <Link
                    href={
                      data?.msaformid
                        ? `/clients/${data?.clientid}/msa_form/edit`
                        : `/clients/${data?.clientid}/msa_form`
                    }
                  >
                    <div className="client-profile-page-navigation-icon-container shadow-md bg-blue-cards-btns cursor-pointer rounded-xl py-5 px-5 inline-block">
                      <div className="flex justify-center">
                        <img src="/client/MSA_button.svg" alt="" width={45} />
                      </div>
                      <h4 className="text-center">
                        {data?.msaformid === undefined ||
                        data?.msaformid === "" ||
                        data?.msaformid === null
                        ? (<p className="mt-5 text-2xl">Create <br /> MSA Form</p>)
                        : (<p className="mt-5 text-2xl">Edit <br /> MSA Form</p>)}
                      </h4>
                    </div>
                  </Link>
                )} */}

                {loggedUserRole === "HCW" || loggedUserRole === "DES" && (
                  <Link
                    href={
                      data?.msaformid
                        ? `/clients/${data?.clientid}/msa_form/edit`
                        : `/clients/${data?.clientid}/msa_form`
                    }
                  >
                    <div className="client-profile-page-navigation-icon-container shadow-md bg-blue-cards-btns cursor-pointer rounded-xl py-5 px-5 inline-block items-center h">
                      <div className="flex justify-center">
                        <img src="/client/MSA_button.svg" alt="" width={45} />
                      </div>
                      <h4 className="text-center ">
                        {data?.msaformid === undefined ||
                        data?.msaformid === "" ||
                        data?.msaformid === null
                          ? (<p className="mt-5 text-2xl">Add <br /> MSA Form</p>)
                          : (<p className="mt-5 text-2xl">MSA  <br /> Documentation</p>)}
                      </h4>
                    </div>
                  </Link>
                )}

                {data?.msaformairsintakeform === "1" &&
                data?.msaformcomprehensiveriskbehavrioassesment === "1" ? (
                  <Link
                    /* href={
                      data?.servicesactionplanid
                        ? `/clients/${data?.clientid}/service-action-plan/edit`
                        : `/clients/${data?.clientid}/service-action-plan`
                    } */ href={`/clients/${data?.clientid}/profile/service_action_plans`}
                  >
                    <div className="client-profile-page-navigation-icon-container shadow-md bg-blue-cards-btns cursor-pointer rounded-xl py-5 px-5 inline-block">
                      <div className="flex justify-center">
                        <img
                          src="/client/Service_Action_Plan_button.svg"
                          alt=""
                          width={45}
                        />
                      </div>
                     
                        {data?.servicesactionplanid
                           ? (<p className="mt-5 text-2xl">View Service <br /> Action Plans</p>)
                          : (<p className="mt-5 text-2xl">Create Service <br /> Action Plan</p>)
                        }
                    
                    </div>
                  </Link>
                ) : (
                  ""
                )}

                {clientTotalGoals[0]?.totalClientGoalsSummaries > 0  ? (
                  <Link href={`/clients/${data?.clientid}/progress_note`}>
                    <div className="client-profile-page-navigation-icon-container shadow-md bg-blue-cards-btns cursor-pointer rounded-xl py-5 px-5 inline-block">
                      <div className="flex justify-center">
                        <img
                          src="/client/Progress_note_button.svg"
                          alt=""
                          width={45}
                        />
                      </div>
                     <p className="mt-5 text-2xl">Progress <br />  Note</p>
                    </div>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </section>

          <section id="progressnotes" className="my-10 ">
            <div className="container mx-auto bg-white px-5 pt-5 pb-10  mt-5 rounded-md shadow-md">
              <div className="flex gap-x-3">
                <img src="/client/Client_progress_notes_icon.svg" alt="" />
                <h3 className="font-bold my-5 text-2xl">Client progress notes</h3>
              </div>

              <div className="grid client-progress-note-table gap-x-1 rounded-tl-md rounded-tr-md">
                <div>
                  <h3 className="bg-client-profile-pn-heading p-2 text-bold table-headings py-2 px-5  mt-2  font-bold ">
                    Date
                  </h3>
                </div>
                <div>
                  <h3 className="bg-client-profile-pn-heading py-2 px-5 text-bold table-headings   mt-2  font-bold ">
                    Service
                  </h3>
                </div>
                <div>
                  <h3 className="bg-client-profile-pn-heading py-2 text-bold table-headings text-center mt-2  font-bold ">
                    Edit
                  </h3>
                </div>
                <div>
                  <h3 className="bg-client-profile-pn-heading py-2 text-bold table-headings text-center  mt-2  font-bold ">
                    Delete
                  </h3>
                </div>
              </div>

              {progNotes.length > 0 ? (
                progNotes
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((pn, index) => {
                    return (
                      <div
                        key={index}
                        className={`grid client-progress-note-table py-2  ${
                          index % 2 === 0 ? "bg-light-gray" : "bg-blue-50"
                        }`}
                      >
                        <p className="px-5 text-xl">
                          {new Date(pn.date).toLocaleDateString("en-US")}
                        </p>
                        <div className="px-5 ">
                          <p className="text-xl">
                            {pn.developmentactionplan === "1"
                              ? "Development of Action Plan with Client"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.cd4vllabreport === "1"
                              ? "CD4/VL Lab Report Check"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.transportationcoordination === "1"
                              ? "Transportation Coordination"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.translationinterpretation === "1"
                              ? "Translation/Interpretation"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.comprehensivebehavioralriskassessment === "1"
                              ? "Comprehensive Behavioral Risk Assessment"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.ticklerupdate === "1" ? "Tickler Update" : ""}
                          </p>
                          <p className="text-xl">
                            {pn.treatmenteducation === "1"
                              ? "Treatment Education and Adherence Counselling"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.preventioncounselling === "1"
                              ? "Prevention Counselling"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.supportivecounselling === "1"
                              ? "Supportive Counselling"
                              : ""}
                          </p>
                          <p className="text-xl">{pn.escort === "1" ? "Escort" : ""}</p>
                          <p className="text-xl">
                            {pn.caseclosuredischarge === "1"
                              ? "Case Closure/Discharge"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.linkagetoservices === "1"
                              ? "Linkage to Services"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.supportgroups === "1" ? "Support Groups" : ""}
                          </p>
                          <p className="text-xl">
                            {pn.implementationactionplan === "1"
                              ? "Implementation of Action Plan"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.housingassistance === "1"
                              ? "Assistance with Housing Services"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.benefitsassistance === "1"
                              ? "Assistance with Access to Benefits/Entitlements"
                              : ""}
                          </p>
                          <p className="text-xl">
                            {pn.employmentassistance === "1"
                              ? "Assistance with Employment/Education"
                              : ""}
                          </p>

                          <p className="text-xl">
                            {pn.otherassistance === "1"
                              ? "Other Assistance"
                              : ""}
                          </p>
                        </div>
                        <div className="flex justify-center ">
                          <Link
                            href={`/clients/${data?.clientid}/progress_note/${pn.id}/edit`}
                          >
                            <a
                              href={"/clients/devs"}
                              className="flex justify-center items-center"
                            >
                              <img src="/edit.svg" alt="edit icon" />
                            </a>
                          </Link>
                        </div>
                        <div className="flex justify-center ">
                          <button
                            onClick={() => {
                              setSelectedProgressNoteId(pn.id);
                              setShowDeleteModal(!showDeleteModal);
                            }}
                            className="flex items-center justify-center"
                          >
                            <img src="/delete_client_black_icon.svg" alt="edit icon" />
                          </button>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <center className="mt-5 font-bold">
                  No progress notes yet
                </center>
              )}
            </div>
          </section>
       {/*    <section
            id="baselineData"
            className="mt-16 container mx-auto bg-white pt-5 px-5 pb-10 rounded-md shadow-md"
          >
            <div className="flex gap-x-3">
              <img src="/client/Client_progress_notes_icon.svg" alt="" />
              
              <h3 className="font-bold my-5 text-2xl">Impact Tracker</h3>
            </div>
            <ProfilePageBaselineData
              impactBaseline={impactBaseline}
              impactTracker={impactTracker}
              loggedUserRole={loggedUserRole}
              notifyMessage={notifyMessage}
              clientId={data?.clientid}
              clientUniqueId={data?.id}
            />
          </section> */}
          
        </div>
      </Layout>
      {showEditClientModal && (
        <EditClientModal
          user={user}
          data={data}
          showEditClientModal={showEditClientModal}
          setShowEditClientModal={setShowEditClientModal}
          notifyMessage={notifyMessage}
        />
      )}
      {showDeleteClientModal && (
        <DeleteClientModal
          data={data}
          showDeleteClientModal={showDeleteClientModal}
          setShowDeleteClientModal={setShowDeleteClientModal}
          notifyDeleteMessage={notifyDeleteMessage}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          //progressNotes={progressNotes}
          id={selectedProgressNoteId}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          notifyDeleteMessage={notifyDeletePNMessage}
          whatToDelete={"progress note"}
        />
      )}
    </>
  );
}


export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid } = ctx.params;
    const [data, clientTotalGoals, progNotes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/${clientid}/profile`
      ).then((r) => r.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/${clientid}/profile/sap_goals`
      ).then((r) => r.json()),
      fetch( `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/profile_by_uniqueid/${clientid}`)
      .then((r) => r.json()),
/*       fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/impact_baseline/${clientid}`
      ).then((r) => r.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/impact_tracker/tracker/${clientid}`
      ).then((r) => r.json()), */
    ]);
    return {
      props: {
        data: data,
/*         impactBaseline: impactBaseline,
        impactTracker: impactTracker, */
        clientTotalGoals:clientTotalGoals,
        progNotes:progNotes
      },
    };

    /*  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`);
    const data = await res.json();
    return { props: { data } }; */
  },
});
