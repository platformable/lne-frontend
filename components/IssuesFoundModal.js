import { useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const  IssuesFoundModal = ({ issueFounded, setIssueFounded, setShowIssuesFoundModal, showIssuesFoundModal, resetIssuesAndReviewCheckbox}) => {
    console.log(issueFounded)
    const [error,setError] = useState("Please fill description field")
    
    const closeModal = () => {
      resetIssuesAndReviewCheckbox(issueFounded)
      setShowIssuesFoundModal(!showIssuesFoundModal)
    };

    const notifyMessage = () => {
      toast.success("Issue reported with success", {
        position: toast.POSITION.TOP_CENTER,
      });
    };

    const submitIssue = () => {
      if(issueFounded.description==="" || issueFounded.description.length <= 3){
        setError(!error)
      } else {
        setError("")
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/issues`, {issueFounded})
        .then(data => {
          notifyMessage()
          setShowIssuesFoundModal(!showIssuesFoundModal)
        }).catch(error => {
          setError(error.message)
          console.log(error)
        });
      }
    };
    
    return (
        <>
      <ToastContainer autoClose={2000} />
            <div className="modal">
        <div className="bg-yellow relative mt-8 max-w-sm mx-auto p-10 rounded">
        <button
                    className="absolute  top-0 right-0 "
                    onClick={closeModal}
                   >
                   <img src="/close-window-icon.svg" className="rounded-tr" alt="" width="20"/>
                  </button>
          <div className="grid grid-cols-1 gap-6">
          <div className="flex ml-2.5 items-end">
            <img src="/msa_form/Issues_found_popup_icon.svg" className="mr-3" alt="" width="50"/>
            <h2 className="font-black">Issues Found</h2>
            </div>
            <label className="block">
              <span className="ml-1 font-semibold">Client ID</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-grey p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={issueFounded.clientId}
                disabled
              />
            </label>
            <label className="block">
              <span className="ml-1 font-semibold">HCW</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-grey p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={issueFounded.hcw}
               disabled
              />
            </label>
            <label className="block">
              <span className="ml-1 font-semibold">MSA Form</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-grey p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={issueFounded.msaform}
                disabled
              />
            </label>
      
            <label className="block">
              <span className="ml-1 font-semibold ">Last date updated</span>
                <input
                type="text"
                className="mt-1 block w-full rounded-md border-grey p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={issueFounded.lastdateupdated ? issueFounded.lastdateupdated.split("T")[0] : ""}
                disabled
              />
            </label>
            <label className="block">
              <span className="font-semibold font-bold">Describe the issue that needs to be addressed:</span>
              <textarea name="" id="" cols="35" rows="5" className="rounded p-1"
              onChange={(e) => setIssueFounded({...issueFounded, description: e.target.value})}
              ></textarea>
              {/* <span className="p-2 block bg-white break-all rounded-md overflow-hidden" role="textbox" name="" contentEditable 
              onInput={(e) => setIssueFounded({...issueFounded, description: e.target.innerText})}></span> */}
            </label>

           {error && <p className="font-sm text-red-500 text-center">Please Complete all the fields</p>}

            <div className="block">
              <div className="mt-2">
                <div className="flex justify-center">
                  <button
                    className="px-4  py-2 mr-3 font-medium bg-dark-green hover:bg-green-500 text-sm flex shadow-xl rounded-md"
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
    )
}
export default IssuesFoundModal;