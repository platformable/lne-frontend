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

  console.log("selectedEntity", selectedEntity);

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
            <div className="bg-white">
              <div className="container mx-auto pt-12 pb-2">
                <div className="flex gap-x-10 items-center">
                  <BackToDashboardButton />
                </div>
                <h1 className="block font-bold mt-10 ">Manage Users</h1>

                {/* <div className="button-container flex gap-x-2 items-center mt-3 mb-5">
                  <button
                    className="rounded bg-yellow px-5 py-2 flex items-center  font-semibold shadow-xl "
                    id="myBtn"
                    onClick={() => setShowModal(!showModal)}
                  >
                    <Image src={addUserICon} width={20} height={20} />
                    <p className="ml-2 text-sm">Add a new user</p>
                  </button>
                  <Link href="/users">
                    <a
                      className="rounded bg-yellow px-5 py-2 flex items-center  font-semibold shadow-xl"
                      id="myBtn"
                    >
                      <Image src={authUserICon} width={20} height={20} />
                      <p className="ml-2 text-sm">View active users</p>
                    </a>
                  </Link>
                </div> */}
              </div>
            </div>
            {/* TABLE */}
            <div
              id="dashboard-client-list"
              className="bg-light-blue pb-7 h-screen pt-10"
            >
              <div className="dashboard-client-list container mx-auto bg-white p-10">
              <div className="flex gap-x-3">
                <img src="/authorised_users_supervisor/authorised_user.svg" alt="manage users icon"/>
                <h2 className="font-black ">
                  Authorized Users
                </h2>
              </div>
                <div
                  className={`${styles.authUSerListHeadRow} mt-10 gap-x-1`}
                >
                    <p className="bg-client-profile-sap-heading py-2 px-5 font-bold">First Name</p>
                    <p className="bg-client-profile-sap-heading py-2 px-5 font-bold">Last Name</p>
                    <p className="bg-client-profile-sap-heading py-2 px-5 font-bold">User Role</p>
                    <p className="bg-client-profile-sap-heading py-2 px-5 font-bold">Email</p>
                    <p className="bg-client-profile-sap-heading py-2 px-5 font-bold">
                      Date added
                    </p>
                    <p className="bg-client-profile-sap-heading py-2 px-5 font-bold">Status</p>
                    <p className="bg-client-profile-sap-heading py-2 px-2 text-center font-bold">Edit</p>
                    <p className="bg-client-profile-sap-heading py-2 px-2 text-center font-bold"> Delete</p>
                </div>
                <div className="dashboard-client-list mt-1 container mx-auto">
                  {data
                    ? listOfNonRegistered?.map((authuser, index) => {
                        return (
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
                        );
                      })
                    : "No data"}
                </div>
              </div>
              {/* INACTIVE USERS */}

              <div className="dashboard-client-list container mx-auto bg-white p-10 mt-10">
              <div className="flex gap-x-3">
                <img src="/authorised_users_supervisor/inactive_users.svg" alt="manage users icon"/>
                <h2 className="font-black ">
                  Inactive Users
                </h2>
              </div>
                {listOfNoActive.length === 0 ? (
                  <center>
                    <p>No Inactive Users</p>
                  </center>
                ) : (
                  <>
                    <div
                      className={`${styles.dashboardClientListHeadRow}  mt-10 gap-x-1`}
                    >
                        <p className="bg-client-profile-sap-heading py-2 px-5">Name</p>
                        <p className="bg-client-profile-sap-heading py-2 px-5">Last Name</p>
                        <p className="bg-client-profile-sap-heading py-2 px-5">User Role</p>
                        <p className="bg-client-profile-sap-heading py-2 px-5">Email</p>

                        <p className="bg-client-profile-sap-heading py-2 px-5">
                          Date User added by the supervisor
                        </p>
                        <p className="bg-client-profile-sap-heading py-2 px-2 text-center">Edit</p>
                        <p className="bg-client-profile-sap-heading py-2 px-2 text-center"> Delete</p>
                    </div>
                    <div className="dashboard-client-list  container mx-auto ">
                      {users
                        ? listOfNoActive?.map((authuser, index) => {
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
                        : <center className="mt-10">No inactive Users </center>}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </main>
        { showModal && (
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
        {!showEditInactiveUserModal && (
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
