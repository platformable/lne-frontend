import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import styles from "../../styles/Home.module.css";
import UserListRow from "../../components/UserListRow";
import AddUserModal from "../../components/AddUserModal";
import EditUserModal from "../../components/EditUserModal";
import DeleteUserModal from "../../components/DeleteUserModal";
import Layout from "../../components/Layout";
import Image from "next/image";

import { useRouter } from "next/router";
import backIcon from "../../public/BACKicon.svg";
import authUserICon from "../../public/authorized-users-icon.svg";
import BackToDashboardButton from "../../components/BackToDashboardButton";

export default function UsersIndex({ data }) {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [showModal, setShowModal] = useState(false);

  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState({});
  const [selectedEntity, setSelectedEntity] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  console.log(data);
  const getActiveUsers = (array) => {
    const result = array.filter((user, index) => {
      return user.useractivestatus === "Active";
    });

    setActiveUsers(result);
  };

  useEffect(() => {
    getActiveUsers(data);
  }, []);

  return (
    <>
      <Layout>
        <section>
          <div className="bg-white">
        <div className="container mx-auto flex flex-wrap py-7 mb-10 shadow-inner">
        <div className="flex gap-x-2 items-center  container my-1 mx-auto">
                <button
                  onClick={() => router.push("/authorizedusers")}
                  className="bg-yellow hover:bg-blue-300 px-14 py-1.5 rounded text-black inline-block  flex items-center  gap-x-3"
                >
                 Back
                </button>

                <BackToDashboardButton />
              </div>
              <h1 className="block font-bold mt-5">Manage Users</h1>

            
            </div>

            </div>
          <div className="">
           

            {/* TABLE */}
            <div
              id="dashboard-client-list-container"
              className=" pb-7 h-screen"
            >
              <div className="container mx-auto bg-white rounded-md shadow px-5 pt-5 pb-10">
                <div className="dashboard-client-list container mx-auto">
                  <div className="flex justify-between   items-center ">
                    <div className="flex items-center gap-x-3 py-10   self-start ">
                      <img src="/LNE_users.svg" alt="" width={45} />
                      <h1 className="font-black">LNE Users</h1>
                    </div>

                    <div>
                      <button
                        onClick={() => router.push("/authorizedusers")}
                        className="bg-yellow hover:bg-blue-300 px-5 py-1.5 rounded text-black inline-block  flex items-center  gap-x-3"
                      >
                        <img
                          src="/view_authorised_users.svg"
                          alt=""
                          width={24}
                        />
                        View authorized users
                      </button>
                    </div>
                  </div>

                  <div
                    className={`${styles.dashboardActiveUsersListHeadRow} gap-x-1 pt-3`}
                  >
                    <div className="head-row font-black bg-blue-50 p-2">
                      <p className="text-base text-left">Name</p>
                    </div>
                    <div className="head-row font-black bg-blue-50 p-2">
                      <p className="text-base text-left">Lastname</p>
                    </div>
                    <div className="head-row font-black bg-blue-50 p-2">
                      <p className="text-base text-left"> User Role</p>
                    </div>
                    <div className="head-row font-black bg-blue-50 p-2">
                      <p className="text-base text-left">Email</p>
                    </div>
                    <div className="head-row font-black bg-blue-50 p-2">
                      <p className="text-base text-center">Activated in</p>
                    </div>
                    <div className="head-row font-black bg-blue-50 p-2">
                      <p className="text-base text-center">Last login</p>
                    </div>
                    <div className="head-row font-black bg-blue-50 p-2">
                      <p className="text-base text-center">Edit</p>
                    </div>
                    <div className="head-row font-black bg-blue-50 p-2">
                      <p className="text-base text-center">Delete</p>
                    </div>
                  </div>
                </div>
                <div className="dashboard-client-list  container mx-auto">
                  {data
                    ? activeUsers.map((authuser, index) => {
                        return (
                          <UserListRow
                            authorizeduser={authuser}
                            index={index}
                            key={index}
                            setShowEditUserModal={setShowEditUserModal}
                            showEditUserModal={showEditUserModal}
                            showDeleteUserModal={showDeleteUserModal}
                            setShowDeleteUserModal={setShowDeleteUserModal}
                            setSelectedUser={setSelectedUser}
                            setSelectedEntity={setSelectedEntity}
                          />
                        );
                      })
                    : "No Data"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {showModal && (
          <AddUserModal setShowModal={setShowModal} showModal={showModal} />
        )}
        {showEditUserModal && (
          <EditUserModal
            setShowEditUserModal={setShowEditUserModal}
            showEditUserModal={showEditUserModal}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
        {showDeleteUserModal && (
          <DeleteUserModal
            urlEntity={"users"}
            setShowDeleteUserModal={setShowDeleteUserModal}
            showDeleteUserModal={showDeleteUserModal}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
      </Layout>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`);
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}
