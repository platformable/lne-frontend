import { useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IssuesFoundModal = ({
  issueFounded,
  setIssueFounded,
  setShowIssuesFoundModal,
  showIssuesFoundModal,
  resetIssuesAndReviewCheckbox,
}) => {
  const [error, setError] = useState(false);

  const closeModal = () => {
    resetIssuesAndReviewCheckbox(issueFounded);
    setShowIssuesFoundModal(!showIssuesFoundModal);
  };

  const notifyMessage = () => {
    toast.success("Issue reported with success", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const submitIssue = () => {
    if (
      issueFounded.description === "" ||
      issueFounded.description.length <= 3
    ) {
      setError(!error);
    } else {
      setError("");
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/issues`, { issueFounded })
        .then((data) => {
          notifyMessage();
          setShowIssuesFoundModal(!showIssuesFoundModal);
        })
        .catch((error) => {
          setError(error.message);
          console.log(error);
        });
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="modal">
        <div className="bg-white border-light-blue relative mt-8 max-w-md mx-auto p-10 rounded">
          <button className="absolute  top-1 right-1 " onClick={closeModal}>
            <img
              src="/client/close_modal_client.svg"
              className="rounded-tr"
              alt=""
              width="30"
            />
          </button>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center">
              <img
                src="/edit_user/user_info.svg"
                className="mr-3"
                alt="user information icon"
              />

              <h2 className="font-bold text-2xl">Issues found</h2>
            </div>
            <label className="block">
              <span className=" font-semibold text-xl">Client ID</span>
              <input
                type="text"
                className="mt-2 block w-full bg-primary-light-blue   p-2 pl-3 shadow "
                value={issueFounded.clientId}
                disabled
              />
            </label>
            <label className="block">
              <span className=" font-semibold text-xl">HCW</span>
              <input
                type="text"
                className="mt-2 block w-full bg-primary-light-blue   p-2 pl-3 shadow "
                value={issueFounded.hcw}
                disabled
              />
            </label>
            <label className="block">
              <span className=" font-semibold text-xl">MSA Form</span>
              <input
                type="text"
                className="mt-2 block w-full bg-primary-light-blue   p-2 pl-3 shadow "
                value={issueFounded.msaform}
                disabled
              />
            </label>

            <label className="block">
              <span className=" font-semibold text-xl">Last date updated</span>
              <input
                type="text"
                className="mt-2 block w-full bg-primary-light-blue   p-2 pl-3 shadow "
                value={
                  issueFounded.lastdateupdated
                    ? issueFounded.lastdateupdated.split("T")[0]
                    : ""
                }
                disabled
              />
            </label>
            <label className="block">
              <span className="font-semibold text-xl">
                Describe the issue that needs to be addressed:
              </span>
              <textarea
                name=""
                id=""
                cols="35"
                rows="5"
                className="mt-2 block w-full border-black rounded p-2 pl-3 shadow "
                onChange={(e) =>
                  setIssueFounded({
                    ...issueFounded,
                    description: e.target.value,
                  })
                }
              ></textarea>
              {/* <span className="p-2 block bg-white break-all rounded-md overflow-hidden" role="textbox" name="" contentEditable 
              onInput={(e) => setIssueFounded({...issueFounded, description: e.target.innerText})}></span> */}
            </label>

            {error && (
              <p className="font-sm text-red-500 text-center">
                Please Complete all the fields
              </p>
            )}

            <div className="block">
              <div className="mt-2">
                <div className="flex justify-center ">
                  <button
                    className="w-2/4 text-center justify-center px-5  py-2 mr-3 font-medium blue-btn  text-xl flex shadow-xl items-center rounded-md"
                    onClick={() => {
                      submitIssue();
                    }}
                  >
                    
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
};
export default IssuesFoundModal;
