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

export default function ClientProfilePage({
  data,
  impactBaseline,
  impactTracker,
}) {
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showDeleteClientModal, setShowDeleteClientModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProgressNoteId, setSelectedProgressNoteId] = useState("");
  const [progNotes, setProgNotes] = useState([]);

  const { user, error, isLoading } = useUser();
  const loggedUserRole =
    user && user["https://lanuevatest.herokuapp.com/roles"];

  const router = useRouter();

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
    const completedGoals = {
      goal1: {
        summary: data[0]?.goal1summary,
        completed: data[0]?.goal1completed,
      },
      goal2: {
        summary: data[0]?.goal2summary,
        completed: data[0]?.goal2completed,
      },
      goal3: {
        summary: data[0]?.goal3summary,
        completed: data[0]?.goal3completed,
      },
    };
    let result;
    let color;
    let totalGoals = 0;
    let totalGoalsCompleted = 0;

    Object.values(completedGoals).forEach((goal) => {
      if (goal.summary) totalGoals += 1;
      if (goal.completed === "1") totalGoalsCompleted += 1;
    });
    if (totalGoals === 0) {
      color = "bg-green-300";
      result = "No goals yet";
      return (
        <div
          className={`flex ${color} rounded-xl px-5  items-center shadow-xl`}
        >
          <img src="/client/alerticonserviceactionplan.svg" alt="" />
          <p className="px-4 font-semibold">{result}</p>
        </div>
      );
    }

    if (totalGoals > 0 && totalGoalsCompleted === 0) {
      color = "bg-red-400";
      result = `There are ${
        totalGoals - totalGoalsCompleted
      } client goals outstanding`;
      return (
        <div
          className={`flex ${color} rounded-xl px-5  items-center shadow-xl`}
        >
          <img src="/client/alerticonserviceactionplan.svg" alt="" />
          <p className="px-4 font-semibold">{result}</p>
        </div>
      );
    }

    if (totalGoals === totalGoalsCompleted) {
      result = "All client goals have been completed!";
      color = "bg-green-300";

      return (
        <div
          className={`flex ${color} rounded-xl px-5  items-center shadow-xl`}
        >
          <img src="/client/alerticonserviceactionplan.svg" alt="" />
          <p className="px-4 font-semibold">{result}</p>
        </div>
      );
    }

    if (totalGoalsCompleted >= 1 && totalGoalsCompleted <= totalGoals) {
      color = "bg-orange-300";
      result = `There are ${
        totalGoals - totalGoalsCompleted
      } client goals outstanding`;

      return (
        <div
          className={`flex ${color} rounded-xl px-5  items-center shadow-xl`}
        >
          <img src="/client/alerticonserviceactionplan.svg" alt="" />
          <p className="px-4 font-semibold">{result}</p>
        </div>
      );
    }
  };
  let fechaInicio = new Date(
    `2022-03-${Math.floor(Math.random() * (30 - 1 + 1) + 1)}`
  );

  const checkMessage3 = () => {
    if (
      (progNotes[0]?.progressnotes?.length === 0 &&
        data[0]?.planstartdate === "") ||
      data[0]?.planstartdate === null
    ) {
      return null;
    }
    if (
      progNotes[0]?.progressnotes?.length <= 0 &&
      data[0]?.planstartdate !== ""
    ) {
      const planstartdate = data[0]?.planstartdate;

      let date_1 =
        planstartdate === null
          ? new Date(data[0]?.clientdatecreated)
          : new Date(planstartdate);
      let date_2 = new Date();
      let difference = date_2.getTime() - date_1.getTime();

      let color = "bg-red-400";
      let fechaFin = new Date();

      let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
      // console.log("client data", data);
      if (totalDays <= 14) color = "bg-green-300";
      if (totalDays > 14 && totalDays < 30) color = "bg-orange-300";
      return (
        <div className={`flex ${color} rounded-xl px-5 items-center shadow-xl`}>
          <img src="/client/alert-icon-progress-note.svg" alt="" />
          <p className="px-4 font-semibold">
            {totalDays > 0
              ? `You saw this client ${totalDays} days ago`
              : totalDays < 0
              ? `You will see this client soon`
              : `You saw this client today`}
          </p>
        </div>
      );
    }

    if (
      progNotes[0]?.progressnotes?.length > 0 &&
      data[0]?.planstartdate !== null
    ) {
      // console.log("progress notes date");
      const pn = progNotes[0].progressnotes.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      const planstartdate =
        pn.length > 1
          ? pn[pn.length - 1]?.date
          : progNotes[0]?.progressnotes[0]?.date;

      let date_1 =
        planstartdate === null
          ? new Date(data[0]?.clientdatecreated)
          : new Date(planstartdate);
      let date_2 = new Date();
      let difference = date_2.getTime() - date_1.getTime();

      let color = "bg-red-400";
      let fechaFin = new Date();

      let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
      console.log("totalDays", totalDays);
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
    }
  };

  const notifyMessage = () => {
    toast.success("Updating client", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notifyDeleteMessage = () => {
    toast.success("Deleting", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const getPnData = async () => {
      const clientid = data[0]?.clientid;
      const getPnData = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/profile_by_uniqueid/${clientid}`
      );
      const pnData = await getPnData.json();
      const response = setProgNotes(pnData);
    };
    getPnData();
  }, [progNotes.progressnotes]);
  if (!hasMounted) {
    return null;
  }
  // console.log("progNotes", progNotes)

  return (
    <>
      <Layout>
        <ToastContainer autoClose={700} />
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
                <div
                  id="dashboard-clients-cards-info-container"
                  className="grid md:grid-cols-2 gap-10"
                >
                  <div className="clients-cards-item flex gap-x-5 px-5 bg-white rounded-xl py-5 ">
                    <div className="border-r-2 pr-8">
                      <div className="flex gap-5 pb-7">
                        <img
                          src="/client/USERicon.svg"
                          className="self-start"
                          alt="user-icon"
                        />
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
                            <img
                              src="/delete-user-icon.svg"
                              alt="delete button"
                              width={25}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-rows-3">
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
                        {/*   <p className="font-semibold">Date Of Last Action</p>
                        <p className="justify-self-end font-semibold text-dark-blue">
                          {data[0]?.planstartdate === null
                            ? new Date(
                                data[0]?.clientdatecreated
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
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-5">
                    {checkMessage1()}
                    {checkMessage2()}
                    {checkMessage3()}
                  </div>
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
                      data[0]?.servicesactionplanid
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
          <section id="progressnotes" className="my-10">
            <div className="container mx-auto">
              <h1 className="font-black my-5">Client progress notes</h1>
              <div className="grid grid-cols-4 bg-black py-2 px-5 rounded-tl-md rounded-tr-md">
                <div>
                  <h3 className="text-white text-center text-xs mt-2 uppercase font-black">
                    Date
                  </h3>
                </div>
                <div>
                  <h3 className="text-white text-center text-xs mt-2 uppercase font-black">
                    Service
                  </h3>
                </div>
                <div>
                  <h3 className="text-white text-center text-xs mt-2 uppercase font-black">
                    Edit
                  </h3>
                </div>
                <div>
                  <h3 className="text-white text-center text-xs mt-2 uppercase font-black">
                    Delete
                  </h3>
                </div>
              </div>

              {progNotes[0]?.progressnotes?.length > 0 ? (
                progNotes[0]?.progressnotes
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((pn, index) => {
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-4 bg-white py-2 border p-5 text-center"
                      >
                        <p>{new Date(pn.date).toLocaleDateString("en-US")}</p>
                        <p>
                          {pn.developmentactionplan === "1"
                            ? "Development of Action Plan with Client"
                            : ""}
                          {pn.cd4vllabreport === "1"
                            ? "CD4/VL Lab Report Check"
                            : ""}
                          {pn.transportationcoordination === "1"
                            ? "Transportation Coordination"
                            : ""}
                          {pn.translationinterpretation === "1"
                            ? "Translation/Interpretation"
                            : ""}
                          {pn.comprehensivebehavioralriskassessment === "1"
                            ? "Comprehensive Behavioral Risk Assessment"
                            : ""}
                          {pn.ticklerupdate === "1" ? "Tickler Update" : ""}
                          {pn.treatmenteducation === "1"
                            ? "Treatment Education and Adherence Counselling"
                            : ""}
                          {pn.preventioncounselling === "1"
                            ? "Prevention Counselling"
                            : ""}
                          {pn.supportivecounselling === "1"
                            ? "Supportive Counselling"
                            : ""}
                          {pn.escort === "1" ? "Escort" : ""}
                          {pn.caseclosuredischarge === "1"
                            ? "Case Closure/Discharge"
                            : ""}
                          {pn.linkagetoservices === "1"
                            ? "Linkage to Services"
                            : ""}
                          {pn.supportgroups === "1" ? "Support Groups" : ""}
                          {pn.otherassistance === "1" ? "Other Assistance" : ""}
                        </p>
                        <div className="flex justify-center ">
                          <Link
                            href={`/clients/${data[0]?.clientid}/progress_note/${pn.id}/edit`}
                          >
                            <a
                              href={"/clients/devs"}
                              className="flex justify-center items-center"
                            >
                              <img src="/edit-icon.svg" alt="edit icon" />
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
                            <img src="/delete-icon.svg" alt="edit icon" />
                          </button>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <center className="mt-5 font-black">
                  No progress notes yet
                </center>
              )}
            </div>
          </section>
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
          notifyDeleteMessage={notifyDeleteMessage}
          whatToDelete={"Progress Note"}
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
    const [data, impactBaseline, impactTracker] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/${clientid}/profile`
      ).then((r) => r.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/impact_baseline/${clientid}`
      ).then((r) => r.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/impact_tracker/tracker/${clientid}`
      ).then((r) => r.json()),
    ]);
    return {
      props: {
        data: data,
        impactBaseline: impactBaseline,
        impactTracker: impactTracker,
      },
    };

    /*  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`);
    const data = await res.json();
    return { props: { data } }; */
  },
});
