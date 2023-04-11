import React,{ useState } from "react";
import axios from 'axios'
import { useRouter } from 'next/router'
import Loader from "./Loader";

export default function AddUserModal({ showModal, setShowModal,notificationMessage,setNotificationMessage,notifyMessage }) {
  const router = useRouter()
  const [userData,setUserData]= useState({
    name:"",
    lastname:"",
    email:"",
    role:"",
    isactive: "Active"
  })

  const [saving,setSaving] = useState(false)

  const addUser =  ()=> {
     axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorizedusers/create`,userData)
    .then(function (response) {
      setShowModal(!showModal)
      notifyMessage()
      setTimeout(()=>{
        router.reload()
      },3000)
      
    })
    .catch(function (error) {
      console.log("client error",error);
    });
  }

console.log("userData",userData)

  return (
    <>
      <div className="modal">
        <div className="bg-white relative border-2 border-yellow-100 mt-8 max-w-sm mx-auto p-10 rounded">
        <button
                    className="absolute  top-0 right-0 "
                    onClick={() => setShowModal(prev => !prev)}
                   >
                   <img src="/edit_user/close_modal.svg" className="rounded-tr" alt="" width="20"/>
                  </button>
          <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center">
            <img src="/edit_user/user_info.svg" className="mr-3" alt="user information icon" />
            <h2 className="font-bold">User Information</h2>
            </div>
            <label className="block">
              <span className="ml-1 font-semibold">First name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-black p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Juan"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className="ml-1 font-semibold">Last name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-black p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Dominguez"
                onChange={(e) =>
                  setUserData({ ...userData, lastname: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className="ml-1 font-semibold">Email address</span>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-black p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="juan@example.com"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </label>
      
            <label className="block">
              <span className="ml-1 font-semibold ">User role</span>
              <select
                onChange={(e) =>
                  setUserData({ ...userData, role: e.target.value })
                }
                className="select-add-edit-supervisor block text-[#00000065] w-full mt-1 rounded-md p-2 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value={null} default>Select</option>
                <option value="HCW">HCW</option>
                <option value="Supervisor">Supervisor</option>
                <option vlaue="DES">DES</option>
              </select>
            </label>

            {/* <label className="block">
              <span className="ml-1 font-semibold">Active / No active</span>
              <select
                onChange={() =>
                  setUserData({ ...userData, isactive:!userData.isactive })
                }
                className="select-add-edit-supervisor block w-full mt-1 text-[#00000065] rounded-md p-2 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option>Active</option>
                <option>No Active</option>
              </select>
            </label> */}

            <div className="block ">
              <div className="mt-2">
                <div className="flex justify-center">
                  <button
                    className="px-10 bg-yellow  py-2 mr-3 font-medium  text-sm flex shadow-xl rounded"
                    onClick={() => {
                      addUser();
                      setSaving(!saving);
                    }}
                  >
                    {saving ? (
                      <Loader />
                    ) : (
                      <p>Save</p>

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
          <p className="font-bold">Some text in the Modal..</p>
        </div>
      </div> */}
    </>
  );
}