import React from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import axios from "axios";

export default function AuthUserListRow({
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
    if (selectedUser.id) {
      setSelectedUser(selectedUser);
      setShowEditAuthUserModal(!showEditAuthUserModal);
    } else {
      setSelectedUser(selectedUser);
      setShowEditInactiveUserModal(!showEditInactiveUserModal);
    }
  };

  const handleAuthUserDelete = (id) => {
    setSelectedEntity("authorizedusers");
    setSelectedUser(authorizeduser);
    setShowDeleteUserModal(!showDeleteUserModal);
  };
  //date to shown in list
  const date = dateaccountactivated.split("T")[0].split("-");
  const year = date[0];
  const month = date[1];
  const day = date[2];
  // console.log(index);
  return (
    <>
      <div
        key={index}
        className={`${styles.authUSerListHeadRow} ${
          index % 2 === 0 ? "bg-row-light" : "bg-row-dark"
        }
                           bg-white mt-1 `}
      >
        <p className=" py-2 px-5 flex items-center text-lg">{name}</p>
        <p className=" py-2 px-5 flex items-center text-lg">{lastname}</p>
        <p className=" py-2 px-5 flex items-center text-lg">{role || authorizeduser.userrole}</p>
        <p className=" py-2 px-5 flex items-center text-lg">
          {email || authorizeduser.useremail
            ? email || authorizeduser.useremail
            : "-"}
        </p>
        <p className=" py-2 px-5 flex items-center text-lg">
          {dateaccountactivated ? `${month}/${day}/${year}` : "-"}
        </p>
        <p className=" py-2 px-5 flex items-center text-lg">{isactive}</p>
        <p
          className=" py-2 px-5 flex items-cente flex items-center text-lg justify-center cursor-pointer"
          onClick={() => handleSelectedUser(authorizeduser)}
        >
          <img
            src="/authorised_users_supervisor/edit_table.svg"
            alt="edit user icon"
            width={20}
            height={20}
          />
        </p>
        <p
          className=" py-2 px-5  flex items-center text-lg justify-center cursor-pointer"
          onClick={() => handleAuthUserDelete(authorizeduser)}
        >
          <img
            src="/authorised_users_supervisor/delete_table.svg"
            alt="delete user icon"
            width={20}
            height={20}
          />
        </p>
      </div>
    </>
  );
}
