import React,{ useState } from "react";
import axios from 'axios'
import { useRouter } from 'next/router'
import Loader from "./Loader";

export default function EditUserModal({selectedUser, setShowEditUserModal, showEditUserModal }) {
  const router = useRouter()
  const [userData,setUserData]= useState(selectedUser || {
    user_id: selectedUser.user_id,
    name: "",
    lastname: "",
    useremail: "",
    userRole: "",
    useractivestatus: ''
  })
console.log('selected', selectedUser)
  const [saving,setSaving] = useState(false)

  const EditUser =  (user)=> {

   axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`,userData)
   .then(response => EditAuthUser(userData))
    .then(function (response) {
        setShowEditUserModal(!showEditUserModal)
      router.reload()
    })
    .catch(function (error) {
      console.log("client error",error);
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

  console.log("userData",userData)

  return (
    <>
      <div className="modal">
        <div className="mt-8 relative max-w-sm mx-auto bg-white p-10 rounded-md border-yellow">
          <button
            className="absolute  top-0 right-0"
            onClick={() => setShowEditUserModal(!showEditUserModal)}
          >
            <img src="/close_modal_user.svg" alt="close-window" title="close-window_" className="rounded-tr m-2" width={24} /> 
          </button>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center items-end">
              <img src="/user_info.svg" className="mr-3" alt=""  />
              <h2 className="font-bold text-2xl">Edit User Information</h2>
            </div>
            <label className="block">
              <span className="ml-1 font-semibold text-xl">First name</span>
              <input
                type="text"
                className="mt-1 block w-full border-black rounded-md  p-2 pl-3 shadow-sm "
                placeholder="John Doe"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className="ml-1 font-semibold text-xl">Last name</span>
              <input
                type="text"
                className="mt-1 block w-full  border-black rounded-md p-2 pl-3 shadow-sm "
                placeholder="John Doe"
                value={userData.lastname}
                onChange={(e) =>
                  setUserData({ ...userData, lastname: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className="ml-1 font-semibold text-xl">Email address</span>
              <input
                type="email"
                className="mt-1 block w-full  border-black rounded-md p-2 pl-3 shadow-sm "
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
              <span className="font-semibold ml-1 text-xl">User role</span>
              <select
                value={userData.userrole}
                onChange={(e) =>
                  setUserData({ ...userData, userrole: e.target.value })
                }
                className="select-add-edit-supervisor block w-full mt-1  rounded-md p-2 border-black shadow-sm "
              >
                <option value="HCW">HCW</option>
                <option value="Supervisor">Supervisor</option>
                <option value="DES">DES</option>
              </select>
            </label>

            <label className="block">
              <span className="font-semibold ml-1 text-xl">Active / Not active</span>
              <select
                value={userData.useractivestatus}
                onChange={(e) =>
                  setUserData({ ...userData, useractivestatus:e.target.value })
                }
                className="select-add-edit-supervisor block w-full mt-1 rounded-md p-2 border-black shadow-sm "
              >
                <option value="Active">Active</option>
                <option value="No Active">Not Active</option>
              </select>
            </label>
            <div className="block">
              <div className="mt-2">
                <div className="flex justify-center ">
                  <button
                    className="px-4  py-2 px-14 font-medium yellow-btn  flex shadow-xl rounded-md"
                    onClick={() => {
                      EditUser(selectedUser);
                      setSaving(!saving);
                    }}
                  >
                    {saving ? (
                      <Loader />
                    ) : (
                    <></>

                    )}
                    Save
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
