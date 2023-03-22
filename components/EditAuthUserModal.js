import React, { useState } from "react";
import axios from 'axios'
import { useRouter } from 'next/router'
import Loader from "./Loader";

export default function EditAuthUserModal({ selectedUser, setShowEditAuthUserModal, showEditAuthUserModal }) {
  const router = useRouter()
  console.log('selecteduser',selectedUser)
  const [userData, setUserData] = useState(selectedUser || {
    id: selectedUser.id,
    name: selectedUser.name,
    lastname: selectedUser.lastname,
    email: selectedUser.email,
    role: selectedUser.role,
    isactive: selectedUser.isactive
  })
  console.log('userData',userData)

  const [saving, setSaving] = useState(false)

  const EditUser = (user) => {

    axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorizedusers`, userData)
      .then(function (response) {
        console.log("response",response)
        setShowEditAuthUserModal(!showEditAuthUserModal)
        router.reload()
      })
      .catch(function (error) {
        console.log("client error", error);
      });
  }



  return (
    <>
      <div className="modal">
        <div className="mt-8 relative max-w-sm mx-auto bg-white p-10 rounded-md">
        <button
                    className="absolute  top-0 right-0 py-2 px-3 "
                    onClick={() => setShowModal(!showModal)}
                   >
                   {/* <img src="/close-window-icon.svg" className="rounded-tr" alt="" width="20"/> */}
                  x
                  </button>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex ml-2.5 items-end">
              <img src="/authorised_users_supervisor/user_information.svg" className="mr-3" alt="" width="50" />
              <h2 className="font-bold">Edit User Information</h2>
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
                className="mt-1 block w-full bg-primary-light-blue p-2 pl-3 shadow-sm "
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
                className="mt-1 block w-full bg-primary-light-blue  p-2 pl-3 shadow"
                placeholder="john@example.com"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
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
              <span className=" font-semibold">User role</span>
              <select
                value={userData.role}
                onChange={(e) =>
                  setUserData({ ...userData, role: e.target.value })
                }
                className="select-add-edit-supervisor block w-full mt-1 text-[#00000065] rounded-md p-2 border-grey shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value={null} disabled>Select</option>
                <option value="HCW" default>HCW</option>
                <option value="Supervisor">Supervisor</option>
                <option value="DES">DES</option>
              </select>
            </label>

            <label className="block">
              <span className=" font-semibold">Active / Not active</span>
              <select
                value={userData.isactive}
                onChange={(e) => {
                  setUserData({ ...userData, isactive: e.target.selectedOptions[0].value })
                }
                }
                className="select-add-edit-supervisor block w-full mt-1  text-[#00000065] rounded-md p-2 border-black shadow-sm "
              >
                <option value="Active">Active</option>
                <option value="No Active">Not Active</option>
              </select>
            </label>
            <div className="block">
              <div className="mt-2">
                <div className="flex justify-center ">
                  <button
                    className="px-10 py-2 mr-3 font-medium bg-yellow text-sm flex shadow-xl rounded-md"
                    onClick={() => {
                      EditUser(selectedUser);
                      setSaving(!saving);
                    }}
                  >
                    {saving ? (
                      <Loader />
                    ) : (
                      <button>Save</button>


                    )}
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