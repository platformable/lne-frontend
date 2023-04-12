import React, { useState } from "react";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Layout from "../../components/Layout";
import DashboardClientCard from "../../components/DashboardClientCard";
import AddClientModal from "../../components/CreateClientModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";
import BackToDashboardButton from "../../components/BackToDashboardButton";
import BackButton from "../../components/BackButton";

const ClientsIndex = ({ data, hcworkers }) => {
  console.log("data", data);
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const loggedUserRole =
    user && user["https://lanuevatest.herokuapp.com/roles"];
  const userId = user?.sub;
  const [showCreateClientModal, setShowCreateClientModal] = useState(false);
  const [liveData, setLiveData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [noDataMessage, setNoDataMessage] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [searchByUser, setSearchByUser] = useState("All");

  const notifyMessage = () => {
    toast.success("A new client is being created!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const searchByClientIdOrClientName = (text) => {
    const result = data.filter(
      (client, index) =>
        client.clientfirstname.toLowerCase().includes(text.toLowerCase()) ||
        client.clientid.toLowerCase().includes(text.toLowerCase())
    );
    setLiveData(result);

    if (result.length <= 0) {
      setNoDataMessage(true);
    } else {
      setNoDataMessage(false);
    }
  };
  const searchByUserId = (userid) => {
    if (userid !== "All") {
      setLiveData(data);
      const result = data.filter(
        (client, index) =>
          client.clienthcwid.toLowerCase() === userid.toLowerCase()
      );
      setLiveData(result);
      if (result.length <= 0) {
        setNoDataMessage(true);
      } else {
        setNoDataMessage(false);
      }
    } else {
      setLiveData(data);
    }
  };

  const displayUserList = () => {
    return (
      hcworkers &&
      hcworkers
        .filter((user) => user.userrole !== "DES")
        .map((user, index) => {
          return (
            <option className=" text-xl" value={user.user_id} key={index}>
              {user.name} {user.lastname}
            </option>
          );
        })
    );
  };

  const getUserClients = () => {
    if (loggedUserRole !== "Supervisor" && loggedUserRole !== "DES") {
      const allClients = liveData
        .filter((client) => client.clienthcwid === userId)
        .sort((a, b) => a.clientfirstname.localeCompare(b.clientfirstname));
      const userClients = allClients.map((client, index) => {
        return (
          <DashboardClientCard
            client={client}
            key={index}
            loggedUserRole={loggedUserRole}
          />
        );
      });
      return userClients;
    } else {
      const hasMsaForm = liveData
        //.filter((client) => client.msa_form_id !== null)
        .sort((a, b) => a.clientfirstname.localeCompare(b.clientfirstname));
      const userClients = hasMsaForm.map((client, index) => {
        return (
          <DashboardClientCard
            client={client}
            key={index}
            loggedUserRole={loggedUserRole}
          />
        );
      });
      return userClients;
    }
  };

  const searchFunction = (word) => {
    setSearchWord(word);
  };
  return (
    <Layout>
      <ToastContainer autoClose={50000} />
      <section id="search" className="">
        <div className="bg-white pb-5 pt-10 shadow-inner ">
        <div className="container mx-auto ">
          <div className=" flex gap-x-3">
            <BackButton />
            <BackToDashboardButton />
          </div>
          
          <div className="mt-12 ">
            <h1 className="font-bold text-4xl">Manage Clients</h1>
          </div>
          <div className=" mt-10 search-container grid  grid-cols-1 md:flex  gap-5 justify-between">
            <div className="search-box flex items-center">
               <img src="/client/client_information.svg" alt="search by client icon"  className="mr-4"/>

              <p className="mr-5 text-xl">Search by Name or Client ID</p>

              <div className="flex ">
                <div className="flex border-1 border-black rounded-lg  rounded-lg">
                  <input
                    type="text"
                    className="px-4 text-xl md:w-64 xl:w-80 rounded-lg py-2"
                    placeholder="Search..."
                    onChange={(e) => searchFunction(e.target.value)}
                  />
                  <button className="px-4 py-1 ">
                   <img src="/client/search.svg" alt="search icon" />
                  </button>
                </div>
              </div>
            </div>

            <div className="search-box flex items-center ">
              <img src="/client/health_care_worker.svg" alt="Select Health care worker icon" className="mr-4" />
              
              <p className="mr-5 text-xl">Select HCW</p>
              <select
                onChange={(e) => setSearchByUser(e.target.value)}
                className="md:w-64 rounded-md p-2 p-r-5 border-black shadow-sm text-black text-xl"
              >
                <option selected="true"  disabled="disabled">
                  Select HCW
                </option>
                <option className="text-xl" onClick={() => setSearchByUser("All")}>All</option>
                {displayUserList()}
              </select>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="shadow-inner bg-blue-50 h-100 py-10">
        <div className="container mx-auto">
          <div className="text-center">
            {data.length <= 0 && (
              <p className="text-center text-2xl">No clients has been added</p>
            )}
            {noDataMessage && (
              <p className="text-center text-2xl">
                No clients has been added with that name or id
              </p>
            )}
          </div>
          <div className="dashboard-clients-container grid md:grid-cols-3 lg:grid-cols-5  md:px-0 px-5 gap-5">
            <div
              className="p-5 flex flex-col gap-5 items-center justify-center text-center mb-2  text-center btn-new-blue rounded shadow-xl rounded"
              onClick={() => setShowCreateClientModal(!showCreateClientModal)}
            >
              <div className="  ">
                <button id="myBtn">
                  <div className="flex justify-center">
                    <img src="/client/add_new_client.svg" width={85} alt="" />
                  </div>
                </button>
              </div>{" "}
              <p className="text-2xl">Add New<br/> Client</p>
            </div>

            {data
              .sort((a, b) =>
                a.clientfirstname.localeCompare(b.clientfirstname)
              )
              .filter((client, index) => {
                if (searchWord === "") {
                  return client;
                }
                if (
                  client.clientfirstname
                    .toLowerCase()
                    .includes(searchWord.toLowerCase()) ||
                  client.clientid
                    .toLowerCase()
                    .includes(searchWord.toLowerCase())
                ) {
                  return client;
                }
              })
              .filter((client, index) => {
                if (searchByUser === "All") {
                  return client;
                }
                if (client.clienthcwid === searchByUser) {
                  return client;
                }
              })
              // .sort((a, b) => (a?.clientfirstname.localeCompare(b?.clientfirstname))
              .map((client, index) => {
                return (
                  <DashboardClientCard
                    client={client}
                    key={index}
                    loggedUserRole={loggedUserRole}
                  />
                );
              })}
          </div>
        </div>
      </section>
      {showCreateClientModal && (
        <AddClientModal
          setShowCreateClientModal={setShowCreateClientModal}
          showCreateClientModal={showCreateClientModal}
          notifyMessage={notifyMessage}
          user={user}
        />
      )}
    </Layout>
  );
};

export default ClientsIndex;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const [data, hcworkers] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/dashboard_page`
      ).then((r) => r.json()),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`).then((r) =>
        r.json()
      ),
    ]);
    return { props: { data: data, hcworkers: hcworkers } };

    /*  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`);
    const data = await res.json();
    return { props: { data } }; */
  },
});
