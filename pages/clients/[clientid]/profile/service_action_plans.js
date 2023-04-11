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

export default function ClientServiceActionPlansListPage({ data }) {
  console.log("datax", data);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showDeleteClientModal, setShowDeleteClientModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProgressNoteId, setSelectedProgressNoteId] = useState("");
  const [progNotes, setProgNotes] = useState([]);

  const { user, error, isLoading } = useUser();
  const loggedUserRole =
    user && user["https://lanuevatest.herokuapp.com/roles"];

  const router = useRouter();

  return (
    <>
      <Layout>
        <ToastContainer autoClose={700} />

  

        <SubHeader pageTitle="Service Action Plans">
          {<button
                onClick={() =>
                  router.push(
                    `/clients/${data.client[0].clientid}/service-action-plan`
                  )
                }
                className="blue-btn hover:bg-blue-300 px-3 py-2 rounded text-black inline-block  flex items-center gap-x-3"
              >
                <img src="/sap/create_service_action_plan_icon.svg" alt="" width={18}/>
                <p className="text-lg">Create Service Action Plan</p>
              </button>}

          </SubHeader>

          

        <section id="sap-dashboard">
          <div className="container mx-auto">
            <div className="sap-dashboard bg-white my-10 rounded-md shadow-md border-blue">


            <section id="info" className="border-blue-bottom bg-white rounded-md ">
      <div className="container mx-auto">
        <div className="service-action-plan-page-info-box px-5 pt-5 pb-7">
          <div className="grid grid-cols-2 gap-x-5 mb-5">
            <div className="flex items-center gap-x-3  self-start ">
              <img
                src="/sap/client_information.svg"
                alt=""
                className="grid items-center self-start"
              />
              <h1 className="font-bold text-2xl">Client Information</h1>
            </div>

            <div className="flex items-center gap-x-3  self-start ">
            
            </div>
          </div>

          <div className="sap-client-information-container grid grid-cols-2 gap-x-5">
            <div className="sap-client-information grid grid-cols-3 gap-x-5">
              <div>
                <p className=" text-xl font-bold">Plan start date</p>
                <input
                  type="date"
                  className="block bg-primary-light-blue w-full rounded-md  p-1  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      planStartDate: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <p className="text-xl font-bold">Client name</p>
                <p className="bg-blue-50 rounded-md pl-2 pr-10 py-1 text-lg">
                {data?.client[0]?.clientfirstname}{" "} {data.client[0].clientlastname.charAt(0)}.
                </p>
              </div>

              <div>
                <p className="text-xl font-bold">Client ID</p>
                <p className="bg-blue-50 rounded-md pl-2  py-1 text-lg block w-2/4">
                  {" "}
                  {data?.client[0]?.clientid}
                </p>
              </div>
            </div>

            <div className="sap-client-information grid grid-cols-3 gap-x-5">
              <div>
            
              </div>

              <div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
            

              <div className="sap-dashboard-client-services-action-plans pb-10">
                <div className="flex items-center gap-x-3 py-10 px-5  self-start ">
                  <img
                    src="/sap/Service_Action_Plan_table.svg"
                    alt=""
                    width={45}
                  />
                  <h1 className="font-bold text-2xl">Service Action Plans</h1>
                </div>

                <div className="sap-dashboard-client-table px-5 gap-x-2">
                  <p className="bg-client-profile-sap-heading py-2 px-2 text-lg ">
                    Plan start date
                  </p>
                  <p className="bg-client-profile-sap-heading py-2 px-2 text-lg">
                    Status
                  </p>
                  <p className="bg-client-profile-sap-heading py-2 px-2 text-center text-lg">
                    Edit
                  </p>
                </div>

                {data?.clientData.length > 0 ? (
                  data?.clientData
                    .sort(
                      (a, b) =>
                        new Date(a.planstartdate) - new Date(b.planstartdate)
                    )
                    .map((sap, index) => {
                      return (
                        <div
                          className={`sap-dashboard-client-table px-5 ${
                            index % 2 === 0 ? "bg-light-gray" : "bg-blue-50"
                          }`}
                          key={index}
                        >
                          <p className={`py-2 px-2 text-lg`}>
                            {new Date(sap.planstartdate).toLocaleDateString(
                              "en-US", {month: '2-digit', day: "2-digit", year: 'numeric'}
                            )}
                          </p>
                          <p className=" py-2 px-2 text-lg">
                            {`${sap.status}`}
                          </p>
                          <p className=" py-2 px-2 text-center flex items-center justify-center">
                            <Link
                              href={`/clients/${data?.client[0].clientid}/service-action-plan/${sap.sapid}/edit`}
                            >
                              <a
                                href={"/clients/devs"}
                                className="flex justify-center items-center"
                              >
                                <img src="/edit.svg" alt="edit icon" />
                              </a>
                            </Link>
                          </p>
                        </div>
                      );
                    })
                ) : (
                  <center className="mt-5 font-bold">
                    <p>{`${
                      data?.client[0]?.clientfirstname
                    } ${data?.client[0]?.clientlastname.charAt(
                      0
                    )} has no Service Action Plan yet`}</p>
                  </center>
                )}
              </div>
            </div>
          </div>
        </section>
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
    const [data] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/services_action_plan/${clientid}/all/`
      ).then((r) => r.json()),
    ]);
    return {
      props: {
        data: data,
      },
    };

    /*  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`);
    const data = await res.json();
    return { props: { data } }; */
  },
});
