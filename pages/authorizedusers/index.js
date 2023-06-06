import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import styles from "../../styles/Home.module.css";
import AuthUserListRow from "../../components/AuthUserListRow";
import UsersListRow from "../../components/UsersListRow";
import AddUserModal from "../../components/AddUserModal";
import EditAuthUserModal from "../../components/EditAuthUserModal";
import EditInactiveUserModal from "../../components/EditInactiveUserModal";
import DeleteUserModal from "../../components/DeleteUserModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../../components/Layout";
import authUserICon from "../../public/authorized-users-icon.svg";
import backIcon from "../../public/BACKicon.svg";
import addUserICon from "../../public/add-new-user-icon.svg";
import BackToDashboardButton from "../../components/BackToDashboardButton";
import SubHeader from "../../components/SubHeader";

export default function AuthorizedUsersIndex({ data, users }) {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [showModal, setShowModal] = useState(false);

  const [notificationMessage, setNotificationMessage] = useState(false);
  const [listOfNonRegistered, setListOfNonRegistered] = useState([]);
  const [listOfNoActive, setListOfNoActive] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState("");

  const [showEditAuthUserModal, setShowEditAuthUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showEditInactiveUserModal, setShowEditInactiveUserModal] =
    useState(false);

  const [selectedUser, setSelectedUser] = useState({});

  console.log("data", data);

  useEffect(() => {
    getNotRegisteredUser(data, users);
    getNoActiveUser(users);
  }, [data]);

  const notifyMessage = () => {
    toast.success("A new user has been saved!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const getNotRegisteredUser = (array1, array2) => {
    const selected = [];
    const alldata = array1.map((data, index) => {
      const filtered = array2.findIndex(
        (user) => user.useremail === data.email
      );
      if (filtered === -1) {
        selected.push(data);
      }
    });
    setListOfNonRegistered(selected);
    return selected;
  };
  const getNoActiveUser = (array1) => {
    const noActive = array1.filter(
      (user) =>
        user.useractivestatus === "No Active" ||
        user.useractivestatus === "false"
    );
    console.log("lista noactive", noActive);
    setListOfNoActive(noActive);
  };

  return (
    <>
      {/* Authorized Users   */}

      <Layout>
        <main>
          <ToastContainer autoClose={2000} />
          <section>
            <SubHeader pageTitle={"Manage Users"} />
            {/* TABLE */}
            <div
              id="dashboard-client-list"
              className="bg-light-blue pb-7 h-screen pt-10"
            >
              <div className="dashboard-client-list container mx-auto bg-white p-10">
                <div className="flex justify-between">
                  <div className="flex gap-x-3 items-center">
                    <img
                      src="/authorised_users_supervisor/authorised_user.svg"
                      alt="manage users icon"
                    />
                    <h2 className="font-bold text-2xl">Authorized Users</h2>
                  </div>
                  <button 
                  onClick={()=>{setShowModal(!showModal)}}
                  className="btn-yellow flex justify-between text-xl items-center py-2 rounded-md shadow-md gap-3 font-medium px-5">
                    <img
                      src="/authorised_users_supervisor/add_user.svg"
                      alt=""
                    />
                    Add a new user
                  </button>
                </div>

                <div className="dashboard-client-list mt-10 container mx-auto">
                  {listOfNonRegistered.length > 0 && (
                    <div
                    className={`${styles.authUSerListHeadRow} mt-10 gap-x-1`}
                  >
                    <p className="bg-client-profile-sap-heading py-2 px-5 font-bold text-xl">
                      First Name
                    </p>
                    <p className="bg-client-profile-sap-heading py-2 px-5 font-bold text-xl">
                      Last Name
                    </p>
                    <p className="bg-client-profile-sap-heading py-2 px-5 font-bold text-xl">
                      User Role
                    </p>
                    <p className="bg-client-profile-sap-heading py-2 px-5 font-bold text-xl">
                      Email
                    </p>
                    <p className="bg-client-profile-sap-heading py-2 px-5 font-bold text-xl">
                      Date added
                    </p>
                    <p className="bg-client-profile-sap-heading py-2 px-5 font-bold text-xl">
                      Status
                    </p>
                    <p className="bg-client-profile-sap-heading py-2 px-2 text-center font-bold text-xl">
                      Edit
                    </p>
                    <p className="bg-client-profile-sap-heading py-2 px-2 text-center font-bold text-xl">
                      {" "}
                      Delete
                    </p>
                  </div>
                  )}
                  {listOfNonRegistered.length > 0 ? (
                    listOfNonRegistered?.map((authuser, index) => {
                      return (
                        <>
                          <AuthUserListRow
                            authorizeduser={authuser}
                            index={index}
                            key={index}
                            setShowEditAuthUserModal={setShowEditAuthUserModal}
                            showEditAuthUserModal={showEditAuthUserModal}
                            setSelectedUser={setSelectedUser}
                            showDeleteUserModal={showDeleteUserModal}
                            setShowDeleteUserModal={setShowDeleteUserModal}
                            selectedEntity={selectedEntity}
                            setSelectedEntity={setSelectedEntity}
                          />
                        </>
                      );
                    })
                  ) : (
                    <center className="text-lg">All authorized users are active</center>
                  )}
                </div>
              </div>
              {/* INACTIVE USERS */}

              <div className="dashboard-client-list container mx-auto bg-white p-10 mt-10">
                <div className="flex gap-x-3">
                  <img
                    src="/authorised_users_supervisor/inactive_users.svg"
                    alt="manage users icon"
                  />
                  <h2 className="font-bold text-2xl">Inactive Users</h2>
                </div>
                {listOfNoActive.length === 0 ? (
                  <center className="text-lg">
                    No Inactive users
                  </center>
                ) : (
                  <>
                    <div
                      className={`${styles.dashboardClientListHeadRow}  mt-10 gap-x-1`}
                    >
                      <p className="bg-client-profile-sap-heading py-2 px-5 text-xl">
                        Name
                      </p>
                      <p className="bg-client-profile-sap-heading py-2 px-5 text-xl">
                        Last Name
                      </p>
                      <p className="bg-client-profile-sap-heading py-2 px-5 text-xl">
                        User Role
                      </p>
                      <p className="bg-client-profile-sap-heading py-2 px-5 text-xl">
                        Email
                      </p>

                      <p className="bg-client-profile-sap-heading py-2 px-5 text-xl">
                        Date User added by the supervisor
                      </p>
                      <p className="bg-client-profile-sap-heading py-2 px-2 text-center text-xl">
                        Edit
                      </p>
                      <p className="bg-client-profile-sap-heading py-2 px-2 text-center text-xl">
                        {" "}
                        Delete
                      </p>
                    </div>
                    <div className="dashboard-client-list  container mx-auto ">
                      {users ? (
                        listOfNoActive?.map((authuser, index) => {
                          return (
                            <UsersListRow
                              authorizeduser={authuser}
                              index={index}
                              key={index}
                              //  setShowEditAuthUserModal={setShowEditAuthUserModal}
                              //  showEditAuthUserModal={showEditAuthUserModal}
                              showEditInactiveUserModal={
                                showEditInactiveUserModal
                              }
                              setShowEditInactiveUserModal={
                                setShowEditInactiveUserModal
                              }
                              setSelectedUser={setSelectedUser}
                              showDeleteUserModal={showDeleteUserModal}
                              setShowDeleteUserModal={setShowDeleteUserModal}
                              selectedEntity={selectedEntity}
                              setSelectedEntity={setSelectedEntity}
                            />
                          );
                        })
                      ) : (
                        <center className="mt-10">No inactive Users </center>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </main>
        {showModal && (
          <AddUserModal
            setShowModal={setShowModal}
            showModal={showModal}
            notifyMessage={notifyMessage}
          />
        )}
        {showEditAuthUserModal && (
          <EditAuthUserModal
            setShowEditAuthUserModal={setShowEditAuthUserModal}
            showEditAuthUserModal={showEditAuthUserModal}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
        {showEditInactiveUserModal && (
          <EditInactiveUserModal
            setShowEditInactiveUserModal={setShowEditInactiveUserModal}
            showEditInactiveUserModal={showEditInactiveUserModal}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
        {showDeleteUserModal && (
          <DeleteUserModal
            urlEntity={selectedEntity}
            setShowDeleteUserModal={setShowDeleteUserModal}
            showDeleteUserModal={showDeleteUserModal}
            selectedUser={selectedUser}
          />
        )}
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const [data, users] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorizedusers`).then((r) =>
        r.json()
      ),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`).then((r) =>
        r.json()
      ),
    ]);
    return { props: { data: data, users: users } };

    /*  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`);
    const data = await res.json();
    return { props: { data } }; */
  },
});
