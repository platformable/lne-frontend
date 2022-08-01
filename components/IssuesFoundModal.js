import { useState } from "react";
import Loader from "./Loader";

const  IssuesFoundModal = ({clientId, HCW, MSAfield, setShowIssuesFoundModal, showIssuesFoundModal}) => {
    // const [issueFound, setIssueFound] = useState({

    // })
    const [saving,setSaving] = useState(false)
    const closeModal = () => {
        
        setShowIssuesFoundModal(!showIssuesFoundModal)
    }

    return (
        <>
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
            <img src="/add-new-user-icon.svg" className="mr-3" alt="" width="50"/>
            <h2 className="font-black">Issues Found</h2>
            </div>
            <label className="block">
              <span className="ml-1 font-semibold">Client ID</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-grey p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={clientId}
                disabled
              />
            </label>
            <label className="block">
              <span className="ml-1 font-semibold">HCW</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-grey p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={HCW}
               disabled
              />
            </label>
            <label className="block">
              <span className="ml-1 font-semibold">MSA Form</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-grey p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={MSAfield.field_title}
                disabled
              />
            </label>
      
            <label className="block">
              <span className="ml-1 font-semibold ">Last date updated</span>
                <input
                type="text"
                className="mt-1 block w-full rounded-md border-grey p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={MSAfield.date_updated?MSAfield.date_updated.split("T")[0]:"-"}
                disabled
              />
            </label>
            <label className="block">
               <span className="ml-1 font-semibold text-xs">Describe the issue that needs to be addressed:</span>
              {/*  <input
                type="textarea"
                placeholder="Description here..."
                className="mt-1 block w-full rounded-md border-grey p-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              /> */}
              <span className="p-2 block bg-white rounded-md overflow-hidden" role="textbox" contentEditable></span>
            </label>

           

            <div className="block">
              <div className="mt-2">
                <div className="flex justify-center">
                  <button
                    className="px-4  py-2 mr-3 font-medium bg-[#23D3AA]  hover:bg-green-500 text-sm flex shadow-xl rounded-md"
                    onClick={() => {
                      addUser();
                      setSaving(!saving);
                    }}
                  >
                    {saving ? (
                      <Loader />
                    ) : (
                      <img src="/check-save-and-finish.svg" className="mr-3" alt="" width="18"/>

                    )}
                    Save and Send
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