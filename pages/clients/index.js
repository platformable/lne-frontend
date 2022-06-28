import React, { useState } from "react";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Layout from "../../components/Layout";
import DashboardClientCard from "../../components/DashboardClientCard";
import AddClientModal from "../../components/CreateClientModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from 'next/router'



const ClientsIndex = ({ data, hcworkers }) => {
  const router = useRouter()
  const { user, error, isLoading } = useUser();
  const loggedUserRole = user && user["https://lanuevatest.herokuapp.com/roles"];
  const userId = user?.sub;
  const [showCreateClientModal, setShowCreateClientModal] = useState(false);
  const [liveData, setLiveData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [noDataMessage, setNoDataMessage] = useState(false);

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
      hcworkers.map((user, index) => {
        return (
          <option className="text-black" value={user.user_id} key={index}>
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
        .filter((client) => client.msa_form_id !== null)
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
  return (
    <Layout>
      <ToastContainer autoClose={2000} />
      <section id="search" className="py-5">
        <div className="container mx-auto">
          <div className="flex justify-between">
          <h3 className="mb-5 font-black">Manage Clients</h3>
          <div>
            <button className=" flex gap-x-2"onClick={()=>router.push("/dashboard")}> <img src="/back-button-icon.svg" alt="" /> back to homepage</button>
          </div>
          </div>
          <div className="search-container grid md:grid-cols-2 grid-cols-1 gap-5 space-between">
            
            <div className="search-box flex  items-center">
              <p className="mr-5">Search by name or Client ID</p>

              <div className="flex ">
                <div className="flex border-1 border-black rounded-lg  rounded-lg">
                  <input
                    type="text"
                    className="px-4  w-80 rounded-lg "
                    placeholder="Search..."
                    onChange={(e) =>
                      searchByClientIdOrClientName(e.target.value)
                    }
                  />
                  <button className="px-4 py-1 text-white bg-dark-blue border-l rounded">
                    <svg
                      width="24"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5 15.5L19 19"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="search-box flex items-center justify-end gap-3">
              <p>Filter by HCW</p>
              <img src="" alt="" />
              <select
                onChange={(e) => searchByUserId(e.target.value)}
                className="text-xs  w-1/2 mt-1 rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
              >
                <option selected="true" disabled="disabled">
                  Select HCW
                </option>
                <option onClick={() => searchByUserId("")}>All</option>
                {displayUserList()}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 h-screen py-10">
        <div className="container mx-auto">
          <div className="text-center">
          {data.length<=0 && <p className="text-center">No clients has been added</p>}
              {noDataMessage && <p className="text-center">No clients has been added with that name or id</p>}
          </div>
          <div className="dashboard-clients-container grid md:grid-cols-5 grid.cols-1 md:px-0 px-5 gap-5">
            <div
              className="p-5 text-center mb-2  text-center btn-darkBlue rounded shadow-xl rounded-xl text-white"
              onClick={() => setShowCreateClientModal(!showCreateClientModal)}
            >
              <div className="  ">
                <button id="myBtn">
                  <div className="flex justify-center">
                    <img src="/add_new_client_icon.svg" width={104} alt="" />
                  </div>
                </button>
              </div>{" "}
              <p className="my-5 lne-text-white">ADD NEW CLIENT</p>
            </div>

            
            {getUserClients()}
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
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`).then((r) =>
        r.json()
      ),
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
