import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

import deleteUserIcon from "../public/delete-user-icon.svg";

const DeleteModal = ({
  id,
  showDeleteModal,
  setShowDeleteModal,
  notifyDeleteMessage,
  whatToDelete,
}) => {
  const router = useRouter();

  const handleDelete = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes/delete/`, {
        data: { id },
      })

      .then((response) => {
        console.log(response);
        if (response.data.statusText === "OK") {
          notifyDeleteMessage();
          setTimeout(() => {
            router.reload();
          }, 500);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="modal flex items-center">
      <div className="relative  mx-auto bg-white py-5 rounded-md px-5">
        <button
          className="absolute  top-0 right-0 mx-3 mt-3"
          onClick={() => setShowDeleteModal(!showDeleteModal)}
        >
          <img src="/client/close_modal_client.svg" alt="" width={24} />
        </button>
        <div className="">
          <div className="flex items-center mb-10 mt-4">
            <img src="/delete_client_black_icon.svg" alt="" width={14} />
            <h3 className="ml-2 font-bold">Delete Progress Note</h3>
          </div>

        
        {/*   <p className="bg-blue-50 rounded-md py-3 px-3 mb-5 text-lg">
            {clientfirstname + " " + clientlastname}{" "}
          </p> */}
          <p className="text-lg text-center">
          Are you sure you want <br />
          to delete this {whatToDelete}?
          </p>
          <div className="grid grid-cols-2 gap-x-5 justify-between mt-5">
            <button
              onClick={() => handleDelete()}
              className="blue-btn text-black rounded-md py-2"
            >
              Yes
            </button>

            <button
              onClick={() => setShowDeleteModal(!showDeleteModal)}
              className="bg-black text-white rounded-md py-2"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
   
    
  );
};

export default DeleteModal;
