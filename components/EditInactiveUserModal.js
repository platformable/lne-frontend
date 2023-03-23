import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "./Loader";

export default function EditInactiveUserModal({
  selectedUser,
  setShowEditInactiveUserModal,
  showEditInactiveUserModal,
}) {
  const router = useRouter();
  console.log("selecteduser", selectedUser);
  const [userData, setUserData] = useState({
    user_id: selectedUser.user_id,
    name: selectedUser.name,
    lastname: selectedUser.lastname,
    useremail: selectedUser.useremail,
    userrole: selectedUser.userrole,
    useractivestatus: selectedUser.useractivestatus,
  });
  console.log("userDataInactive", userData);

  const [saving, setSaving] = useState(false);

  const EditUser = (user) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, userData)
      .then((response) => EditAuthUser(userData))
      .then(function (response) {
        setShowEditInactiveUserModal(!showEditInactiveUserModal);
        router.reload();
      })
      .catch(function (error) {
        console.log("client error", error);
      });
  };

  const EditAuthUser = (userData) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/authorizedusers/update_from_users_edit`,
        userData
      )
      .then(function (response) {
        console.log("success");
      })
      .catch(function (error) {
        console.log("client error", error);
      });
  };

  return (
    <>
      <div className="modal">
        <div className="mt-8 relative max-w-sm mx-auto bg-white p-10 rounded-md">
        <button
                    className="absolute  top-0 right-0 "
                    onClick={() => setShowEditInactiveUserModal(prev => !prev)}

                   >
                   <img src="/edit_user/close_modal.svg" className="rounded-tr" alt="" width="20"/>
                  </button>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center">
            <img src="/edit_user/user_info.svg" className="mr-3" alt="user information icon" />
              <h2 className="font-black">Edit User</h2>
            </div>
            <label className="block">
              <span className=" font-semibold">First name</span>
              <input
                type="text"
                className="mt-1 block w-full bg-primary-light-blue   p-2 pl-3 shadow "
                placeholder="John Doe"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className=" font-semibold">Last name</span>
              <input
                type="text"
                className="mt-1 block w-full bg-primary-light-blue   p-2 pl-3 shadow "
                placeholder="John Doe"
                value={userData.lastname}
                onChange={(e) =>
                  setUserData({ ...userData, lastname: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className=" font-semibold">Email address</span>
              <input
                type="email"
                className="mt-1 block w-full bg-primary-light-blue mt-1  p-2 pl-3 shadow "
                placeholder="john@example.com"
                value={userData.useremail}
                onChange={(e) =>
                  setUserData({ ...userData, useremail: e.target.value })
                }
              />
            </label>
            
            <label className="block">
              <span className=" font-semibold">User role</span>
              <select
                value={userData.userrole}
                onChange={(e) =>
                  setUserData({ ...userData, userrole: e.target.value })
                }
                className="select-add-edit-supervisor block w-full mt-1 rounded-md p-2 border-grey shadow-sm "
              >
                <option>HCW</option>
                <option>Supervisor</option>
                <option>DES</option>
              </select>
            </label>

            <label className="block">
              <span className=" font-semibold">Active / Not active</span>
              <select
                value={userData.useractivestatus || userData.isactive}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    useractivestatus: e.target.selectedOptions[0].value,
                  })
                }
                className="select-add-edit-supervisor block w-full mt-5 rounded-md p-2 border-grey shadow-sm "
              >
                <option value="Active">Active</option>
                <option value="No Active">Not Active</option>
              </select>
            </label>
            <div className="block">
              <div className="mt-2">
                <div className="flex justify-center ">
                  <button
                    className="px-10 bg-yellow  py-2 mr-3 font-medium  text-sm flex shadow-xl rounded"
                    onClick={() => {
                      EditUser(selectedUser);
                      setSaving(!saving);
                    }}
                  >
                    {saving ? <Loader /> : <center className="text-lg">Save</center>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div id="myModal" className="modal fade">
        <div className="modal-content rounded-xl bg-red-500">
          <span className="close" onClick={() => setShowModal(!showModal)}>
            &times;
          </span>
          <p className="font-black">Some text in the Modal..</p>
        </div>
      </div> */}
    </>
  );
}
