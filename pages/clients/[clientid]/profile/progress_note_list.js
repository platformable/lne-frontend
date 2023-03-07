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

export default function ClientProgressNotesListPage({
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
      // console.log("totalDays", totalDays);
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
console.log("progNotes",progNotes)
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
          
          </section>
         
    
          <section id="progressnotes" className="my-10">
            <div className="container mx-auto">
            <div>
                
                          <h1 className="font-black my-5">{data[0]?.clientfirstname}{" "}
                            {data[0]?.clientlastname.charAt(0)} ( {data[0]?.clientid}) Progress Notes</h1>
                        </div>
            
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
                        <div>
                        <p>
                          {pn.developmentactionplan === "1"
                            ? "Development of Action Plan with Client"
                            : ""}
                        </p>    
                          <p>
                          {pn.cd4vllabreport === "1"
                            ? "CD4/VL Lab Report Check"
                            : ""}
                          </p>
                        <p>
                          {pn.transportationcoordination === "1"
                            ? "Transportation Coordination"
                            : ""}
                        </p>
                        <p>
                          {pn.translationinterpretation === "1"
                            ? "Translation/Interpretation"
                            : ""}
                        </p>
                        <p>
                          {pn.comprehensivebehavioralriskassessment === "1"
                            ? "Comprehensive Behavioral Risk Assessment"
                            : ""}
                        </p>
                        <p>
                          {pn.ticklerupdate === "1" ? "Tickler Update" : ""}
                          </p>
                          <p>
                          {pn.treatmenteducation === "1"
                            ? "Treatment Education and Adherence Counselling"
                            : ""}
                          </p>
                          <p>
                          {pn.preventioncounselling === "1"
                            ? "Prevention Counselling"
                            : ""}
                          </p>
                          <p>
                          {pn.supportivecounselling === "1"
                            ? "Supportive Counselling"
                            : ""}
                          </p>
                          <p>   
                          {pn.escort === "1" ? "Escort" : ""}
                          </p>
                          <p>
                          {pn.caseclosuredischarge === "1"
                            ? "Case Closure/Discharge"
                            : ""}
                          </p>
                          <p> 
                          {pn.linkagetoservices === "1"
                            ? "Linkage to Services"
                            : ""}
                          </p>
                          <p> 
                          {pn.supportgroups === "1" ? "Support Groups" : ""}
                          </p>
                          <p> 
                          {pn.implementationactionplan === "1" ? "Implementation of Action Plan" : ""}
                          </p>
                          <p> 
                          {pn.housingassistance === "1" ? "Assistance with Housing Services" : ""}
                          </p>
                          <p> 
                          {pn.benefitsassistance === "1" ? "Assistance with Access to Benefits/Entitlements" : ""}
                          </p>
                          <p> 
                          {pn.employmentassistance === "1" ? "Assistance with Employment/Education" : ""}
                          </p>

                          <p>
                          {pn.otherassistance === "1" ? "Other Assistance" : ""}
                        </p>
                        </div>
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
