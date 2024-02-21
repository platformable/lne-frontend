import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import deleteUserIcon from "../public/delete-user-icon.svg";
import Loader from "./Loader";

const DeleteClientModal = ({
  data,
  showDeleteClientModal,
  setShowDeleteClientModal,
  notifyDeleteMessage,
}) => {
  let { id, clientid, clientfirstname, clientlastname } = data[0];

  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleAuthUserDelete = ({}) => {
    setIsSaving(true);

    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients/delete/`, {
        data: { id },
      })

      .then((response) => {
        console.log(response);
        if (response.data.status === "OK") {
          notifyDeleteMessage("ok");
          setTimeout(() => {
            setIsSaving(false);
            router.push("/clients");
          }, 1000);
        }
      })
      .catch((error) => {
        setIsSaving(false);
        notifyDeleteMessage("fail");
        console.log(error);
      });
  };

  return (
    <div className="modal flex items-center">
      <div className="relative  mx-auto bg-white p-5 rounded-md ">
        <button
          className="absolute  top-0 right-0 m-3"
          onClick={() => setShowDeleteClientModal(!showDeleteClientModal)}
        >
          <img src="/client/close_modal_client.svg" alt="" width={24} />
        </button>
        <div className="">
          <div className="flex items-center">
            <img src="/delete_client_black_icon.svg" alt="" width={14} />
            <h3 className="ml-2 font-bold">Delete Client</h3>
          </div>

          <h4 className="mt-5 mb-3 text-lg font-bold">Name</h4>
          <p className="bg-blue-50 rounded-md py-3 px-3 mb-5 text-lg">
            {clientfirstname + " " + clientlastname}{" "}
          </p>
          <p className="self-center text-center text-lg font-bold">
            Are you sure you want to delete this client?
          </p>
          {!isSaving ? (
            <div className="grid grid-cols-2 gap-x-5 justify-between mt-5">
              <button
                onClick={() => handleAuthUserDelete()}
                className="blue-btn text-black rounded-md py-2"
              >
                Yes
              </button>

              <button
                onClick={() => setShowDeleteClientModal(!showDeleteClientModal)}
                className="bg-black text-white rounded-md py-2"
              >
                No
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center mt-4">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteClientModal;
