import React, { useState } from "react";
import axios from 'axios'
import { useRouter } from 'next/router'
import Loader from "./Loader";

export default function EditInactiveUserModal({ selectedUser, setShowEditInactiveUserModal, showEditInactiveUserModal }) {
  const router = useRouter()
  console.log('selecteduser',selectedUser)
  const [userData, setUserData] = useState(selectedUser || {
    user_id: selectedUser.user_id,
    name: "",
    lastname: "",
    useremail: "",
    userrole: "",
    userstatusactive: ''
  })
  console.log('userDataInactive',userData)

  const [saving, setSaving] = useState(false)

  const EditUser = (user) => {

    axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, userData)
    .then(response => EditAuthUser(userData))
      .then(function (response) {
        setShowEditInactiveUserModal(!showEditInactiveUserModal)
        router.reload()
      })
      .catch(function (error) {
        console.log("client error", error);
      });
  }

  const EditAuthUser =  (userData)=> {

    axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorizedusers/update_from_users_edit`,userData)
     .then(function (response) {
        console.log("success")
     })
     .catch(function (error) {
       console.log("client error",error);
     }); 
   }


  return (
    <>
      <div className="modal">
        <div className="mt-8 relative max-w-sm mx-auto bg-yellow-400 p-10 rounded-md">
          <button
            className="absolute  top-0 right-0"
            onClick={() => setShowEditInactiveUserModal(!showEditInactiveUserModal)}
          >
            <img src="/close-window-icon.svg" alt="close-window" title="close-window_" className="rounded-tr"  width="20" /> 
          </button>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex ml-2.5 items-end">
              <img src="/edit-user-icon.svg" className="mr-3" alt="" width="50" />
              <h2 className="font-black">Edit User</h2>
            </div>
            <label className="block">
              <span className="ml-1 font-semibold">First name</span>
              <input
                type="text"
                className="mt-1 block w-full bg-[#f6e89e] rounded-md  p-2 pl-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="John Doe"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className="ml-1 font-semibold">Last name</span>
              <input
                type="text"
                className="mt-1 block w-full bg-[#f6e89e] rounded-md p-2 pl-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="John Doe"
                value={userData.lastname}
                onChange={(e) =>
                  setUserData({ ...userData, lastname: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className="ml-1 font-semibold">Email address</span>
              <input
                type="email"
                className="mt-1 block w-full bg-[#f6e89e] rounded-md p-2 pl-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="john@example.com"
                value={userData.useremail}
                onChange={(e) =>
                  setUserData({ ...userData, useremail: e.target.value })
                }
              />
            </label>
            {/*  <label className="block">
            <span className="text-gray-700">When is your event?</span>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label> */}
            <label className="block">
              <span className="ml-1 font-semibold">User role</span>
              <select
                value={userData.userrole}
                onChange={(e) =>
                  setUserData({ ...userData, userrole: e.target.value })
                }
                className="select-add-edit-supervisor block w-full mt-1 text-[#00000065] rounded-md p-2 border-grey shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option>HWC</option>
                <option>Supervisor</option>
                <option>DES</option>
              </select>
            </label>

            <label className="block">
              <span className="ml-1 font-semibold">Active / No active</span>
              <select
                value={userData.useractivestatus}
                onChange={(e) =>
                  setUserData({ ...userData, useractivestatus: e.target.selectedOptions[0].id.toString() })
                }
                className="select-add-edit-supervisor block w-full mt-1  text-[#00000065] rounded-md p-2 border-grey shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option id="Active">Active</option>
                <option id="No Active">No Active</option>
              </select>
            </label>
            <div className="block">
              <div className="mt-2">
                <div className="flex justify-center ">
                  <button
                    className="px-4  py-2 mr-3 font-medium bg-[#23D3AA] hover:bg-green-500 text-sm flex shadow-xl rounded-md"
                    onClick={() => {
                      EditUser(selectedUser);
                      setSaving(!saving);
                    }}
                  >
                    {saving ? (
                      <Loader />
                    ) : (
                      <img src="/update-icon.svg" className="mr-2" alt="" width="18" />


                    )}
                    Update
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