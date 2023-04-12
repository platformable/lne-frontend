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
import SubHeader from "../../components/SubHeader";

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
        

            <SubHeader pageTitle={'Manage Users'}/>
          <div className="">
           

            {/* TABLE */}
            <div
              id="dashboard-client-list-container"
              className=" py-10 h-screen shadow-inner"
            >
              <div className="container mx-auto bg-white rounded-md shadow p-10">
                <div className="dashboard-client-list">
                  <div className="flex justify-between   items-center ">
                    <div className="flex items-center gap-x-3   self-start ">
                      <img src="/LNE_users.svg" alt="" width={45} />
                      <h1 className="font-bold text-2xl">LNE Users</h1>
                    </div>

                    <div>
                      <button
                        onClick={() => router.push("/authorizedusers")}
                        className="btn-yellow flex justify-between text-lg items-center py-2 rounded-md shadow-md gap-3 font-medium px-5"
                      >
                        <img
                          src="/view_authorised_users.svg"
                          alt=""
                          width={24}
                        />
                        <p className="text-lg">View authorized users</p>
                      </button>
                    </div>
                  </div>

                  <div
                    className={`${styles.dashboardActiveUsersListHeadRow} mt-10 gap-x-1 `}
                  >
                    <div className="head-row font-bold bg-blue-50 p-2">
                      <p className="text-xl text-left">Name</p>
                    </div>
                    <div className="head-row font-bold bg-blue-50 p-2">
                      <p className="text-xl text-left">Lastname</p>
                    </div>
                    <div className="head-row font-bold bg-blue-50 p-2">
                      <p className="text-xl text-left"> User Role</p>
                    </div>
                    <div className="head-row font-bold bg-blue-50 p-2">
                      <p className="text-xl text-left">Email</p>
                    </div>
                    <div className="head-row font-bold bg-blue-50 p-2">
                      <p className="text-xl text-center">Activated in</p>
                    </div>
                    <div className="head-row font-bold bg-blue-50 p-2">
                      <p className="text-xl text-center">Last login</p>
                    </div>
                    <div className="head-row font-bold bg-blue-50 p-2">
                      <p className="text-xl text-center">Edit</p>
                    </div>
                    <div className="head-row font-bold bg-blue-50 p-2">
                      <p className="text-xl text-center">Delete</p>
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
