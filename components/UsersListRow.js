import React from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import axios from "axios";

export default function UsersListRow({
  showDeleteUserModal,
  setShowDeleteUserModal,
  authorizeduser,
  setShowEditAuthUserModal,
  showEditAuthUserModal,
  index,
  setSelectedUser,
  showEditInactiveUserModal,
  setShowEditInactiveUserModal,
  selectedEntity,
  setSelectedEntity,
}) {
  const {
    email,
    name,
    lastname,
    role,
    isactive,
    datelastlogin,
    id,
    dateaccountactivated,
  } = authorizeduser;
  const router = useRouter();

  const handleSelectedUser = (selectedUser) => {
    setSelectedUser(selectedUser);
    setShowEditInactiveUserModal(!showEditInactiveUserModal);
  };

  const handleAuthUserDelete = (id) => {
    setSelectedEntity("users");
    setSelectedUser(authorizeduser);
    setShowDeleteUserModal(!showDeleteUserModal);
  };
  //date to shown in list
  const date = dateaccountactivated.split("T")[0].split("-");
  const year = date[0];
  const month = date[1];
  const day = date[2];

  return (
    <>
      <div
        className={`${styles.dashboardClientListHeadRow} ${
          index % 2 === 0 ? "bg-row-light" : "bg-row-dark"
        } bg-white border rounded-md py-3 px-5 my-1 `}
      >
        {/* <div className="head-row ">
                  <p className="text-center">{id}</p>
                </div> */}
        <p className="py-2 px-5 text-lg">{name}</p>
        <p className="py-2 px-5 text-lg">{lastname}</p>
        <p className="py-2 px-5 text-lg">{role || authorizeduser.userrole}</p>
        <p className="py-2 px-5 text-lg">
          {email || authorizeduser.useremail
            ? email || authorizeduser.useremail
            : "-"}
        </p>
        <p className="py-2 px-5">
          {dateaccountactivated ? `${month}/${day}/${year}` : "-"}
        </p>

        <p
          className="py-2 px-5 flex justify-center items-center cursor-pointer"
          onClick={() => handleSelectedUser(authorizeduser)}
        >
          <img
            src="/authorised_users_supervisor/edit_table.svg"
            alt="edit table icon"
            width={20}
            height={20}
          />
        </p>
        <p
          className="py-2 px-5 flex justify-center items-center cursor-pointer"
          onClick={() => handleAuthUserDelete(authorizeduser)}
        >
          <img
            src="/authorised_users_supervisor/delete_table.svg"
            alt="delete user table icon"
            width={20}
            height={20}
          />
        </p>
      </div>
    </>
  );
}
