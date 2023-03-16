import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "./Loader";

export default function CreateClientModal({
  setShowCreateClientModal,
  showCreateClientModal,
  notifyMessage,
  setNotifyMessage,
  data,
  user,
}) {
  const router = useRouter();

  const loggeduserId = user[`https://lanuevatest.herokuapp.com/roles`];
  const loggedUserName = user[`https://lanuevatest.herokuapp.com/name`];
  const loggedUserLastname = user[`https://lanuevatest.herokuapp.com/lastname`];

  const { current: a } = useRef(["a"]);

  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [errorsInFields, setErrorsInFields] = useState(false);

  console.log("users", users);
  const [clientData, setClientData] = useState({
    clientFirstName: "",
    clientLastName: "",
    clientSSN: "",
    clientDateCreated: new Date(),
    clientActive: true,
    clientHCWID: loggeduserId !== "Supervisor" ? user.sub : "",
    clientHCWName: loggeduserId !== "Supervisor" ? loggedUserName : "",
    clientHCWLastname: loggeduserId !== "Supervisor" ? loggedUserLastname : "",
    clientID: "",
    clientHCWemail: loggeduserId !== "Supervisor" ? user.email : "",
    clientCategory: "",
  });

  const createClientId = () => {
    const firstNameLetter = clientData?.clientFirstName?.slice(0, 1);
    let shortSsn = String(clientData?.clientSSN)?.slice(-4);

    const lastnameFirstLetter = clientData?.clientLastName?.slice(0, 1);
    const result =
      firstNameLetter.toUpperCase() +
      shortSsn +
      lastnameFirstLetter.toUpperCase();
    setClientData({ ...clientData, clientID: result });
  };
  const getUsers = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`)
      .then((res) => res.json())
      .then((response) => setUsers(response))
      .catch((err) => console.log("err", err));
  };

  const checkErrorsFields = () => {
    // setErrorMessage('');
    setErrorsInFields((prevSelected) => {
      return !prevSelected;
    });
    setSaving((prevSelected) => {
      return !prevSelected;
    });
  };

  const changeSaving = (error) => {
    
      setSaving((prevSelected) => {
        return !prevSelected;
      
    })
  };

  const checkEmtpyFields = () => {
    setErrorMessage("");
    setEmptyFields((prevState) => {
      return !prevState;
    });
    setSaving((prevSelected) => {
      return !prevSelected;
    });
  };

  const addClient = () => {
    setSaving(!saving);
    setEmptyFields(false);
    console.log(clientData);
    if (
      clientData.clientFirstName === "" ||
      clientData.clientLastName === "" ||
      clientData.clientSSN === "" ||
      clientData.clientID === "" ||
      !clientData.length === 6
    ) {
      checkEmtpyFields();
    }
    if (
      /*   clientData.clientFirstName.match(/[^a-zA-Z]/) 
|| clientData.clientLastName.match(/[^a-zA-Z]/)

||  */
      clientData.clientSSN.length <= 3 ||
      clientData.clientSSN.length > 4
    ) {
      checkErrorsFields();
    } else {
      notifyMessage();

      axios(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: clientData,
      })
        .then(function (response) {
          if (response.status === 200 || response.statusText === "OK") {
            setShowCreateClientModal(!showCreateClientModal);
            setTimeout(() => {
              router.reload();
            }, 50000);
          }
        })
        .catch(function (error) {
          //showErrors(error.response.data)
          changeSaving(error);
        });
    }
  };

  const assignUser = async (clientHCWID) => {
    console.log("ejecutandose assign", clientHCWID);
    const filteredusers = await users.filter(
      (user, index) => user.user_id === clientHCWID
    );

    setClientData({
      ...clientData,
      clientHCWemail: filteredusers[0].useremail,
      clientHCWID: filteredusers[0]?.user_id,
      clientHCWName: filteredusers[0]?.name,
      clientHCWLastname: filteredusers[0]?.lastname,
    });
    /* createClientId() */
    /*  
    clientHCWName
    clientHCWLastname */
  };

  useEffect(() => {
    getUsers();
    createClientId();
    /*   assignUser(clientData.clientHCWID) */
  }, [
    clientData.clientFirstName,
    clientData.clientLastName,
    clientData.clientSSN,
    saving,
  ]);
  function isNumberKey(e) {
    const invalidChars = ["-", "+", "e"];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  }
  return (
    <>
      <div className="modal">
        <div className="mt-8 max-w-md mx-auto bg-white rounded pb-3">
          <div className="flex justify-end">
            <button
              onClick={() => setShowCreateClientModal(!showCreateClientModal)}
              className="p-2"
            >
              <img src="/client/close_modal_client.svg" title="Close" alt="Close modal"/>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-9 px-9 pb-6">
            <div className="flex items-center pt-1 gap-3">
              <img src="/client/add_info_icon.svg" alt="add info icon"/>
              <h1 className="font-medium text-3xl">Client Information</h1>
            </div>

            {emptyFields && (
              <span className="text-red-600 bg-gray-100 text-center text-xs py-2 rounded-xl">
                Please complete all the fields
              </span>
            )}
            {errorsInFields && (
              <span className="text-red-600 bg-gray-100 text-center text-xs py-2 rounded-xl">
                Some information is not correct
              </span>
            )}

            <label className="block">
              <span className="font-bold text-xl">First name</span>
              <input
                type="text"
                className="mt-3 block w-full text-2xl rounded-md border p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Juan"
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    clientFirstName: e.target.value,
                  })
                }
              />
              {/* {clientData.clientFirstName.match(/[^a-zA-Z]/)  && <p className="text-red-500 text-xs mt-2">Only letters allowed</p>} */}
            </label>
            <label className="block">
              <span className="text-xl font-bold">Last name</span>
              <input
                type="text"
                className="mt-3 block text-2xl w-full rounded-md border p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Davila"
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    clientLastName: e.target.value,
                  })
                }
              />
              {/* {clientData.clientLastName.match(/[^a-zA-Z]/)  && <p className="text-red-500 text-xs mt-2">Only letters allowed</p>} */}
            </label>
            <label className="block">
              <span className="text-xl font-bold">
                Last 4 digits of social security number{" "}
              </span>
              <div>
                <input
                  type="number"
                  className="mt-3 block text-2xl rounded-md border p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="1234"
                  min="4"
                  max="4"
                  onWheel={(event) => event.currentTarget.blur()}
                  onChange={(e) => {
                    setClientData({ ...clientData, clientSSN: e.target.value });
                  }}
                  onKeyDown={isNumberKey}
                />
              </div>
              {clientData.clientSSN.length == 0 ||
              clientData.clientSSN.length == 4 ? null : clientData.clientSSN
                  .length > 4 ? (
                <p className="text-red-500 text-md mt-3">
                  Only 4 numbers allowed
                </p>
              ) : (
                <p className="text-red-500 text-md mt-3">Must be 4 numbers </p>
              )}
            </label>
            
            {loggeduserId === "Supervisor" ? (
              <label className="block">
                <span className="text-xl font-bold">Asign user</span>
                <select
                  onChange={(e) => {
                    assignUser(e.target.value);
                    //setClientData({ ...clientData, clientHCWID: e.target.value })
                  }}
                  className="block w-full text-2xl mt-5 rounded-md p-2 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option>-</option>
                  {users &&
                    users
                      ?.filter((user) => user.userrole !== "DES")
                      .map((user, index) => {
                        return (
                          <option value={user.user_id} key={index}>
                            {user.useremail}
                          </option>
                        );
                      })}
                </select>
              </label>
            ) : (
              ""
            )}

            <label className="block">
              <span className="text-xl font-bold">Is Active / No Active</span>
              <select
                onChange={() =>
                  setClientData({
                    ...clientData,
                    isactive: !clientData.isactive,
                  })
                }
                className="block w-full mt-3 text-2xl rounded-md p-2 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option>Active</option>
                <option>No Active</option>
              </select>
            </label>

            <label className="block">
              <span className="text-xl font-bold">Client category</span>
              <select
                onChange={(e) =>
                  setClientData({
                    ...clientData,
                    clientCategory: e.target.value,
                  })
                }
                className="block w-full text-2xl mt-3 rounded-md p-2 border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="" disabled selected>
                  Select a category
                </option>
                <option value="MSA client">MSA client</option>
                <option value="Hight risk client">Hight risk client</option>
              </select>
            </label>

            
          </div>
          {errorMessage && (
              <span className="text-red-600 bg-gray-100 text-center text-xs py-2 rounded-xl">
                {errorMessage}
              </span>
            )}

                <div className="flex justify-center">
                  <button
                    className="px-10  py-1  font-medium btn-new-blue text-xl flex shadow-xl items-center rounded-md"
                    onClick={() => addClient()}
                  >
                    {saving ? (
                      <Loader />
                    ) : null}
                    Save
                  </button>
                 
              </div>
        </div>
      </div>
    </>
  );
}
