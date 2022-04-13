import React,{ useState } from "react";
import axios from 'axios'
import { useRouter } from 'next/router'
import Loader from "./Loader";

export default function AddUserModal({ showModal, setShowModal }) {
  const router = useRouter()
  const [userData,setUserData]= useState({
    name:"",
    lastname:"",
    email:"",
    userRole:"",
    isactive:true
  })

  const [saving,setSaving] = useState(false)

  const addUser =  ()=> {process.env.DB_HOST
     axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/authorizedusers/create`,userData)
    .then(function (response) {
      setShowModal(!showModal)
      router.reload()
    })
    .catch(function (error) {
      console.log("client error",error);
    });
  }



  return (
    <>
      <div className="modal">
        <div className="mt-8 max-w-md mx-auto bg-white p-5 rounded">
          <div className="grid grid-cols-1 gap-6">
            <h1 className="font-black">User information</h1>
            <label className="block">
              <span className="">First name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="John Doe"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className="">Last name</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="John Doe"
                onChange={(e) =>
                  setUserData({ ...userData, lastname: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className="">Email address</span>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="john@example.com"
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
              <span className="text-gray-700">User role</span>
              <select
                onChange={(e) =>
                  setUserData({ ...userData, role: e.target.value })
                }
                className="block w-full mt-1 rounded-md p-2 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option>HWC</option>
                <option>Supervisor</option>
                <option>DES</option>
              </select>
            </label>

            <label className="block">
              <span className="text-gray-700">Active / No active</span>
              <select
                onChange={() =>
                  setUserData({ ...userData, isactive:!userData.isactive })
                }
                className="block w-full mt-1 rounded-md p-2 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option>Active</option>
                <option>No Active</option>
              </select>
            </label>

            <div className="block">
              <div className="mt-2">
                <div className="flex ">
                  <button
                    className="px-5  py-1 mr-3 font-medium bg-yellow-300  text-sm flex shadow-xl items-center rounded-md"
                    onClick={() => {
                      addUser();
                      setSaving(!saving);
                    }}
                  >
                    {saving ? (
                      <Loader />
                    ) : (
                      <svg
                        className="mr-1"
                        width="18"
                        height="18"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 19V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M8.6 9H15.4C15.7314 9 16 8.73137 16 8.4V3.6C16 3.26863 15.7314 3 15.4 3H8.6C8.26863 3 8 3.26863 8 3.6V8.4C8 8.73137 8.26863 9 8.6 9Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6 13.6V21H18V13.6C18 13.2686 17.7314 13 17.4 13H6.6C6.26863 13 6 13.2686 6 13.6Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    )}
                    Save
                  </button>
                  <button
                    className="px-5  font-medium bg-black  text-sm text-white flex shadow-xl items-center rounded-md"
                    onClick={() => setShowModal(!showModal)}
                  >
                    <svg
                      className="mr-1 relative "
                      width="24"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M10 14.2426L12.1213 12.1213M12.1213 12.1213L14.2426 10M12.1213 12.1213L10 10M12.1213 12.1213L14.2426 14.2426"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 8H7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Close
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
