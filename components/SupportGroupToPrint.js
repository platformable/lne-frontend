import React, { Component } from "react";

export const SupportGroupToPrint = React.forwardRef((props, ref) => {
  const {
    supportMeetingDate,
    supportGroupName,
    supportGroupAudience,
    supportGroupTopic,
    supportGroupSummary,
    facilitator,
    supportGroupStartTime,
    supportGroupEndTime,
    supportGroupSigned,
  } = props.form;

  return (
      <section className="container mx-auto px-10" ref={ref}>
        <div className="grid grid-cols-3 gap-5 justify-center items-center">
          <div>
          <h3 className="font-black  my-1 text-xs">
          Support Group Record
          </h3>
          </div>
          <div className="flex gap-x-1 justify-center">
         {/*     <img src="https://cdn3.iconfinder.com/data/icons/other-icons/48/paper_document-512.png" alt="" width={24}/>
        <h3 className="font-black text-center my-1 text-xs">
            Service Action Plan
          </h3> */}
        </div>
          
          <div className="flex justify-end">
            <img
              src="https://lanuevaesperanza.platformable.com/logo.png"
              alt=""
              className="my-3"
              width="100"
            />
          </div>
        </div>
        {/* <h1 className="font-black  my-5">Support Group Record</h1> */}
        <div
          id="form"
          className="grid grid-cols-1 gap-5 border-dark-blue rounded-xl px-5 pt-5 pb-10 mb-5"
        >
          <label className="text-lg block">
            Date group held
            <input
              type="date"
              name="supportMeetingDate"
              value={supportMeetingDate}
              className="border-black rounded p-2 mb-2 block"
            />
          </label>
          <label className="text-lg block">
            Start time {supportGroupStartTime}
          </label>
          <label className="text-lg block">
            End time {supportGroupEndTime}
          </label>
          <label className="text-lg block">
            Name of group
            <input
              type="text"
              name="supportGroupName"
              value={supportGroupName}
              className="border-black rounded p-2 mb-2 block w-full"
            />
          </label>
          <label className="text-lg block">
            Target audience
            <input
              type="text"
              name="supportGroupAudience"
              value={supportGroupAudience}
              className="border-black rounded p-2 mb-2 block w-full"
            />
          </label>
          <label className="text-lg block">
            Discussion topic
            <input
              type="text"
              value={supportGroupTopic}
              name="supportGroupTopic"
              className="border-black rounded p-2 mb-2 block w-full"
            />
          </label>
          <label className="text-lg block">
            Summary of meeting
            <textarea
              cols="30"
              rows="7"
              value={supportGroupSummary} className="border-black rounded p-2 mb-2 block w-full"
            />
          </label>
          <div className="search-box flex items-center  gap-3">
            <p className="text-lg">Facilitator: {facilitator}</p>
          </div>
        
          <label className="flex items-center gap-5">
            HCW signed?
            <input type="checkbox" name="supportGroupSigned" />
          </label>
        </div>


        <div className="mt-20 flex ">
          <div className=""><h6 className="inline-block">Signed:</h6></div>
          <div className="border-b-black inline-block pt-2" style={{minWidth:400}}></div>
        </div>
      </section>
  );
});

SupportGroupToPrint.displayName = "SupportGroupToPrint";
export default SupportGroupToPrint;
