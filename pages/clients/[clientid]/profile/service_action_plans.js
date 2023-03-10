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



export default function ClientServiceActionPlansListPage({
  data
}) {

    console.log("datax",data)
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
                
                          <h1 className="font-black my-5">{data?.client[0]?.clientfirstname}{" "}
                            {data?.client[0]?.clientlastname.charAt(0)} ({data?.client[0]?.clientid}) Progress Notes</h1>
                        </div>
            
              <div className="grid grid-cols-4 bg-black py-2 px-5 rounded-tl-md rounded-tr-md">
                <div>
                  <h3 className="text-white text-center text-xs mt-2 uppercase font-black">
                   Plan Start Date
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

              {data?.clientData.length > 0 ? (
                data?.clientData
                  .sort((a, b) => new Date(a.planstartdate) - new Date(b.planstartdate))
                  .map((sap, index) => {
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-4 bg-white py-2 border p-5 text-center"
                      >
                        <p>{new Date(sap.planstartdate).toLocaleDateString("en-US")}</p>
                        <div>
                        AAA
                        </div>
                        <div className="flex justify-center ">
                          <Link
                            href={`/clients/${data?.client[0].clientid}/service-action-plan/${sap.id}/edit`}
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
                <p>{`${data?.client[0]?.clientfirstname} ${data?.client[0]?.clientlastname.charAt(0)} has no Service Action Plan yet`}</p> 
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
    const [data] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/services_action_plan/${clientid}/all`
      ).then((r) => r.json())
    ]);
    return {
      props: {
        data: data
      },
    };

    /*  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`);
    const data = await res.json();
    return { props: { data } }; */
  },
});
