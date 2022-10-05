import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Image from "next/image";
import BackToDashboardButton from "../../../../components/BackToDashboardButton";
import EditClientModal from "../../../../components/EditClientModal";
import DeleteClientModal from "../../../../components/DeleteClientModal";
import ProfilePageBaselineData from "../../../../components/ProfilePageBaselineData";

import infoIcon from "../../../../public/client/info-icon.svg";
import userIcon from "../../../../public/client/USERicon.svg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";
import BackButton from "../../../../components/BackButton";

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

const getDate = (date) => {
  const fecha = Date.parse(date);
  const newDate = new Date(fecha).toLocaleDateString("en", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const separatedDate = newDate.split("/");
  const finalDate = separatedDate.join("-");
  return newDate;
};

export default function ClientProfilePage({ data, impactBaseline, impactTracker,progressNotes }) {
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showDeleteClientModal,setShowDeleteClientModal]=useState(false)
  impactTracker && console.log("tracker", impactTracker)
  const { user, error, isLoading } = useUser();
  const loggedUserRole =
    user && user["https://lanuevatest.herokuapp.com/roles"];

  const router = useRouter();

  console.log("progressNotes", progressNotes);

  const [message1, setMessage1] = useState({
    result: "",
    color: "",
  });

  const checkMessage1 = () => {
    let result;
    let color;
    if (
      (data[0]?.msaformairsintakeform === "0" ||
        data[0]?.msaformairsintakeform === null) &&
      data[0]?.servicesactionplanid === null
    ) {
      result = "You need to fill in the client’s Intake Form";
      color = "bg-red-400";
    }
    if (
      data[0]?.msaformairsintakeform === "1" &&
      data[0]?.msaformcomprehensiveriskbehavrioassesment !== "1"
    ) {
      result = "You need to fill in the client’s CBRA Form";
      color = "bg-red-400";
    }

    if (
      data[0]?.msaformairsintakeform === "1" &&
      data[0]?.msaformcomprehensiveriskbehavrioassesment === "1" &&
      data[0]?.servicesactionplanid !== "1"
    ) {
      result = "You need to draft the client’s Service Action Plan and sign";
      color = "bg-orange-300";
    }

    if (
      data[0]?.msaformairsintakeform === "1" &&
      data[0]?.msaformcomprehensiveriskbehavrioassesment === "1" &&
      data[0]?.servicesactionplanid !== null &&
      (data[0]?.msahnselegibilityform !== "1" ||
        data[0]?.msaformhnsreadinessform !== "1")
    ) {
      result = "You need to fill in the client’s HNS Forms";
      color = "bg-orange-300";
    }

    if (
      data[0]?.msaformairsintakeform === "1" &&
      data[0]?.msaformcomprehensiveriskbehavrioassesment === "1" &&
      data[0]?.servicesactionplanid !== null
      //  && (data[0]?.msahnselegibilityform === "1" && data[0]?.msaformhnsreadinessform ==='1')
    ) {
      result = "All core documents are up to date";
      color = "bg-green-300";
    }

    return (
      <div className={`flex ${color} px-5  items-center rounded-xl shadow-xl`}>
        <img src="/client/alerticonMSAdoc.svg" alt="" />
        <p className="px-4 font-semibold ">{result}</p>
      </div>
    );

    /* return  (<div className={`flex ${color} h-14 px-5  items-center`}>
    <img src="/client/alerticonMSAdoc.svg" alt="" />
    <p className='px-4 font-semibold '>{result}</p>
    </div>) */
  };

  const checkMessage2 = () => {
    const fields = {
      goal1: data[0]?.goal1completed,
      goal2: data[0]?.goal2completed,
      goal3: data[0]?.goal3completed,
    };
    let result;
    let color;

    if (
      (fields["goal1"] !== "1" &&
        fields["goal2"] !== "1" &&
        fields["goal2"] === "1") ||
      (fields["goal1"] !== "1" &&
        fields["goal3"] !== "1" &&
        fields["goal2"] === "1") ||
      (fields["goal2"] !== "1" &&
        fields["goal3"] !== "1" &&
        fields["goal1"] === "1")
    ) {
      result = "There are two client goals outstanding";
      color = "bg-orange-300";
    } else {
      result = "There is one client goal outstanding";
      color = "bg-orange-300";
    }
    if (
      Object.values(fields).every((value) => value === "0" || value === null)
    ) {
      result = "There are three client goals outstanding";
      color = "bg-red-400";
    }
    if (
      Object.values(fields).every((value) => value === "1" || value !== null)
    ) {
      result = "All client goals have been completed!";
      color = "bg-green-300";
    }
    return (
      <div className={`flex ${color} rounded-xl px-5  items-center shadow-xl`}>
        <img src="/client/alerticonserviceactionplan.svg" alt="" />
        <p className="px-4 font-semibold">{result}</p>
      </div>
    );
  };
  let fechaInicio = new Date(
    `2022-03-${Math.floor(Math.random() * (30 - 1 + 1) + 1)}`
  );

  const checkMessage3 = () => {
    const planstartdate = data[0].planstartdate;

    let date_1 =
      planstartdate === null
        ? new Date(data[0].clientdatecreated)
        : new Date(planstartdate);
    let date_2 = new Date();
    let difference = date_2.getTime() - date_1.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    //return TotalDays;

    let color = "bg-red-400";
    let fechaFin = new Date();
    // let diff = fechaFin - new Date(data[0].planstartdate)===null ? new Date() : new Date(data[0].planstartdate).getTime();
    //let diff = planstartdate===null? fechaFin - new Date(data[0].clientdatecreated) :new Date(planstartdate)
    //console.log("diff",diff)
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    if (totalDays <= 14) color = "bg-green-300";
    if (totalDays > 14 && totalDays < 30) color = "bg-orange-300";
    return (
      <div className={`flex ${color} rounded-xl px-5 items-center shadow-xl`}>
        <img src="/client/alert-icon-progress-note.svg" alt="" />
        <p className="px-4 font-semibold">
          {totalDays > 0
            ? `You saw this client ${totalDays} days ago`
            : `You saw this client today`}{" "}
        </p>
      </div>
    );
  };
  const notifyMessage = () => {
    toast.success("Updating client", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notifyDeleteMessage = () => {
    toast.success("Client deleted", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <>
      <Layout>
        <ToastContainer autoClose={3000} />
        <div className=" bg-light-blue h-full pb-20 ">
          <section className="pb-5 pt-10 container mx-auto md:px-0 px-5">
            <div className="flex gap-x-3">
              <BackButton />
              <BackToDashboardButton />
            </div>
            <section className="dashboard-clients-cards md:px-0 px-5">
              <div className="dashboard-clients-cards-top py-5 grid gap-y-5 md:flex gap-x-5">
                <h1 className="font-black">Client dashboard</h1>
                <div className="color-description flex gap-x-5">
                  <div className="color-description-item flex items-center gap-x-2">
                    <div
                      className="bg-green-300 inline-block px-2 rounded-full text-green-300"
                      width={25}
                      height={25}
                    >
                      0
                    </div>
                    <p>On track</p>
                  </div>
                  <div className="color-description-item flex items-center gap-x-2">
                    <div
                      className="bg-orange-300 inline-block px-2 rounded-full text-orange-300"
                      width={25}
                      height={25}
                    >
                      0
                    </div>
                    <p>Warning</p>
                  </div>
                  <div className="color-description-item flex items-center gap-x-2">
                    <div
                      className="bg-red-400 inline-block px-2 rounded-full text-red-400"
                      width={25}
                      height={25}
                    >
                      0
                    </div>
                    <p>Alert</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-clients-cards-info">
                <div className="dashboard-clients-cards-info-container">
                  <div className="clients-cards-item flex gap-x-5 items-center px-5 bg-white rounded-xl py-5 justify-center">
                    <div className="border-r-2 pr-8">
                      <div className="flex gap-5 pb-7">
                        <Image src={userIcon} className="mr-5"></Image>
                        <div>
                          {" "}
                          <p className="text-dark-blue font-black text-lg">
                            {data[0]?.clientfirstname}{" "}
                            {data[0]?.clientlastname.charAt(0)}
                          </p>
                          <p className="text-dark-blue text-xs">
                            {data[0]?.clientid}
                          </p>
                          <button
                            className="bg-black rounded-md px-5 block py-1 shadow-md text-white mt-5 text-sm"
                            onClick={() =>
                              setShowEditClientModal(!showEditClientModal)
                            }
                          >
                            Edit
                          </button>
                          <button
                            className=" rounded-md px-5 py-1 block shadow-md text-white mt-5 text-sm"
                            onClick={() =>
                              setShowDeleteClientModal(!showDeleteClientModal)
                            }
                            title="Delete this client"
                          >
                            <img src="/delete-user-icon.svg" alt="delete button" width={25}/>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div>
                        <p className="font-semibold">Date Client Joined LNE</p>
                        <p className="justify-self-end font-semibold text-dark-blue">
                          {new Date(
                            data[0]?.clientdatecreated
                          ).toLocaleDateString("en-EN", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Date Of Last Action</p>
                        <p className="justify-self-end font-semibold text-dark-blue">
                          {data[0].planstartdate === null
                            ? new Date(
                                data[0].clientdatecreated
                              ).toLocaleDateString("en-EN", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                              })
                            : new Date(
                                data[0]?.planstartdate
                              ).toLocaleDateString("en-EN", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                              })}
                        </p>
                      </div>
                    </div>
                  </div>
                  {checkMessage1()}
                  {checkMessage2()}
                  {checkMessage3()}
                </div>
              </div>
            </section>
          </section>
          <section
            id="client-profile-page-navigation"
            className="mt-5 font-bold"
          >
            <div className="text-black ">
              <h1 className="mb-4 container mx-auto text-center md:text-left md:pl-12 lg:pl-0 font-black">
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
                      data[0]?.msaformid
                        ? `/clients/${data[0]?.clientid}/msa_form/supervisor_msa_form_edit`
                        : `/clients/${data[0]?.clientid}/msa_form`
                    }
                  >
                    <div className="client-profile-page-navigation-icon-container boder-dark-blue bg-dark-blue cursor-pointer rounded-xl py-2 px-5 inline-block">
                      <div className="flex justify-center">
                        <img src="/client/MSAicon.svg" alt="" />
                      </div>
                      <h4 className="text-center text-white">
                        {data[0]?.msaformid === undefined ||
                        data[0]?.msaformid === "" ||
                        data[0]?.msaformid === null
                          ? `Create MSA Form`
                          : "Edit MSA Form"}
                      </h4>
                    </div>
                  </Link>
                )}

                {loggedUserRole === "DES" && (
                  <Link
                    href={
                      data[0]?.msaformid
                        ? `/clients/${data[0]?.clientid}/msa_form/des_msa_form_edit`
                        : `/clients/${data[0]?.clientid}/msa_form`
                    }
                  >
                    <div className="client-profile-page-navigation-icon-container boder-dark-blue bg-dark-blue cursor-pointer rounded-xl py-2 px-5 inline-block">
                      <div className="flex justify-center">
                        <img src="/client/MSAicon.svg" alt="" />
                      </div>
                      <h4 className="text-center text-white">
                        {data[0]?.msaformid === undefined ||
                        data[0]?.msaformid === "" ||
                        data[0]?.msaformid === null
                          ? `Create MSA Form`
                          : "Edit MSA Form"}
                      </h4>
                    </div>
                  </Link>
                )}

                {loggedUserRole === "HCW" && (
                  <Link
                    href={
                      data[0]?.msaformid
                        ? `/clients/${data[0]?.clientid}/msa_form/edit`
                        : `/clients/${data[0]?.clientid}/msa_form`
                    }
                  >
                    <div className="client-profile-page-navigation-icon-container boder-dark-blue bg-dark-blue cursor-pointer rounded-xl py-2 px-5 inline-block">
                      <div className="flex justify-center">
                        <img src="/client/MSAicon.svg" alt="" />
                      </div>
                      <h4 className="text-center text-white">
                        {data[0]?.msaformid === undefined ||
                        data[0]?.msaformid === "" ||
                        data[0]?.msaformid === null
                          ? `Add MSA Form`
                          : `MSA Documentation`}
                      </h4>
                    </div>
                  </Link>
                )}

                {data[0]?.msaformairsintakeform === "1" &&
                data[0]?.msaformcomprehensiveriskbehavrioassesment === "1" ? (
                  <Link
                    href={
                      data[0].servicesactionplanid
                        ? `/clients/${data[0]?.clientid}/service-action-plan/edit`
                        : `/clients/${data[0]?.clientid}/service-action-plan`
                    }
                  >
                    <div className="client-profile-page-navigation-icon-container boder-dark-blue bg-dark-blue cursor-pointer rounded-xl py-2 px-5 inline-block">
                      <div className="flex justify-center">
                        <img src="/client/SAPicon.svg" alt="" />
                      </div>
                      <h4 className="text-center text-white">
                        {data[0]?.servicesactionplanid
                          ? "View Service Action Plan"
                          : `Create Service Action Plan`}
                      </h4>
                    </div>
                  </Link>
                ) : (
                  ""
                )}

                {data[0]?.servicesactionplanid ? (
                  <Link href={`/clients/${data[0]?.clientid}/progress_note`}>
                    <div className="client-profile-page-navigation-icon-container boder-dark-blue bg-dark-blue cursor-pointer rounded-xl py-2 px-5 inline-block">
                      <div className="flex justify-center">
                        <img src="/client/PROGRESSNOTEicon.svg" alt="" />
                      </div>
                      <h4 className="text-center text-white">
                        {`Create Progress Note`}
                      </h4>
                    </div>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </section>



          <section id="baselineData" className="mt-16 container mx-auto">
            <ProfilePageBaselineData
              impactBaseline={impactBaseline}
              impactTracker={impactTracker}
              loggedUserRole={loggedUserRole}
              notifyMessage={notifyMessage}
              clientId={data[0]?.clientid}
              clientUniqueId={data[0]?.id}
            />
            
          </section>

 {/*          <section id="progressnotes" className="my-10">

          <div className="container mx-auto">
          <h1 className="font-black my-5">Client progress notes</h1>
          <div className="grid grid-cols-2 bg-black py-2 rounded-tl-md rounded-tr-md">
            <div>
              <h3 className="text-white text-center text-xs mt-2 uppercase font-black">Progress note</h3>

            </div>
            <div>
            <h3 className="text-white text-center text-xs mt-2 uppercase font-black">Edit</h3>
            </div>
          </div>
          {progressNotes[0].progressnotes.map((pn,index)=>{ return (
            <div key={index}className="grid grid-cols-2 bg-white py-2 border p-5 text-center" >
            
              <p>{new Date(pn.date).toLocaleDateString('en-US')}</p>
              <div className="text-center">
              <Link href={`/clients/${pn.clientid}/progress_notes/${pn.id}/edit`}>
              <button href={"/clients/devs"} className="bg-black text-white rounded-md px-5 py-2 self-end" >Edit</button>
              </Link>
              </div>
            </div> )
          })}
          </div>
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
    </>
  );
}

/* export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid } = ctx.params;
    const  response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients/${clientid}/profile`);
    const data = await  response.json();
    return { props: { data } };
  },
}); */

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid } = ctx.params;
    const [data, impactBaseline,impactTracker,progressNotes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/${clientid}/profile`
      ).then((r) => r.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/impact_baseline/${clientid}`
      ).then((r) => r.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/impact_tracker/tracker/${clientid}`
      ).then((r) => r.json()),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients/profile_by_uniqueid/${clientid}`).then((r)=>r.json())
    ]);
    return { props: { data: data, impactBaseline: impactBaseline, impactTracker: impactTracker , progressNotes:progressNotes } };

    /*  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`);
    const data = await res.json();
    return { props: { data } }; */
  },
});
