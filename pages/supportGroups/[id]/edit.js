import { useState,useRef } from "react";
import Layout from "../../../components/Layout";
import BackButton from "../../../components/BackButton";
import BackToDashboardButton from "../../../components/BackToDashboardButton";
import SupportGroupToPrint from "../../../components/SupportGroupToPrint";

import { useRouter } from "next/router";
import axios from "axios";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import ReactToPrint from 'react-to-print';
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.minimal.css";

const SupportGroups = ({hcworkers, data}) => {
  console.log("dataaa",new Date(data.supportmeetingdate).toISOString().slice(0,10))
  let componentRef = useRef();
    const [form, setForm] = useState({
      id: data?.id,
      supportMeetingDate: new Date(data?.supportmeetingdate).toISOString().slice(0,10), 
      supportGroupName: data?.supportgroupname || "", 
      supportGroupAudience: data?.supportgroupaudience || "", 
      supportGroupTopic: data?.supportgrouptopic || "", 
      supportGroupSummary: data?.supportgroupsummary || "", 
      facilitator: data?.facilitator || "",
      supportGroupStartTime: data?.supportgroupstarttime || "10:00",
      supportGroupEndTime: data?.supportgroupendtime || "12:00",
      supportGroupSigned: data?.supportgroupsigned || false,
    });
    const router = useRouter();
    console.log(form);
    const handleForm = (e) => {
      setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    const notifyMessage = () => {
      toast.success("Form saved successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    };
    const submitForm = () => {
      axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/support_groups/update`, form)
      .then(data => {
        console.log(data)
        notifyMessage()
        if (data.status === 200) {
          setTimeout(()=>{
            router.back()
          },2000)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    };
    const displayUserList = () => {
      return (
        hcworkers &&
        hcworkers.filter(user=>user.userrole !=='DES').
        map((user, index) => {
          return (
            <option className="text-black" value={user.username} key={index}>
              {user.name} {user.lastname}
            </option>
          );
        })
      );
    };
    return (
        <>
          <ToastContainer autoClose={1500} />

          <Layout>

            <div className="container mx-auto my-10 ">
              <div className="flex justify-between">
                <div className="flex gap-5">
                  <BackButton />
                  <BackToDashboardButton />
                </div>
                <Link href="/supportGroups/pastEvents">
                  <button className=" rounded bg-middle-purple text-center px-5 py-1 shadow-xl rounded-lg flex items-center block">
                          <img src="/supervisor/support_groups_icon.svg" alt="condoms distribution icon" width={18}/>
                          <p className="p-2 uppercase">
                          Review past group events
                          </p>
                    </button>
                </Link>
              
              </div>
              <h1 className="font-black  my-5">
                Support Group Record
              </h1>
               
            </div>
    
            <section className="container mx-auto">
              <div
                id="form"
                className="grid grid-cols-1 gap-5 border-dark-blue rounded-xl p-5 mb-5"
              >
    
                <label className="text-lg block">
                  Date group held
                  <input type="date" defaultValue={form.supportMeetingDate} name="supportMeetingDate" onChange={handleForm} className="border-black rounded p-2 mb-2 block"/>
                </label>
                <label className="text-lg block">
                  Name of group
                  <input type="text" defaultValue={form.supportGroupName} name="supportGroupName" onChange={handleForm} className="border-black rounded p-2 mb-2 block w-full"/>
                </label>
                <label className="text-lg block">
                  Target audience
                  <input type="text" defaultValue={form.supportGroupAudience} name="supportGroupAudience" onChange={handleForm} className="border-black rounded p-2 mb-2 block w-full"/>
                </label>
                <label className="text-lg block">
                  Discussion topic
                  <input type="text" defaultValue={form.supportGroupTopic} name="supportGroupTopic" onChange={handleForm} className="border-black rounded p-2 mb-2 block w-full"/>
                </label>
                <label className="text-lg block">
                  Summary of meeting
                  <textarea cols="30" rows="12"  value={form.supportGroupSummary} name="supportGroupSummary" onChange={handleForm} className="border-black rounded p-2 mb-2 block w-full"/>
                </label>
                <div className="search-box flex items-center  gap-3">
                  <p className="text-lg">Facilitator</p>
                  <select
                  name="facilitator"
                  onChange={handleForm}
                    className=" w-1/2 mt-1 rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                  >
                    <option selected={true} >
                      {form.facilitator}
                    </option>
                    {/* <option onClick={() => setSearchByUser("All")}>All</option> */}
                    {displayUserList()}
                  </select>
               </div>
               <label className="text-lg block">
                  Start time
                  <input type="time"  defaultValue={form.supportGroupStartTime} name="supportGroupStartTime" onChange={handleForm} className="border-black rounded p-2 mb-2 block "/>
                </label>
                <label className="text-lg block">
                  End time
                  <input type="time"  defaultValue={form.supportGroupEndTime} name="supportGroupEndTime" onChange={handleForm} className="border-black rounded p-2 mb-2 block"/>
                </label>
                <label className="flex items-center gap-5">
                  HCW signed?
                  <input type="checkbox" value={form.supportGroupSigned} checked={form.supportGroupSigned === true ? "checked" : ""} name="supportGroupSigned" onChange={(e) => {
                    console.log(e.target.value)
                    e.target.value === "false" ? 
                    setForm(prev => ({...prev, [e.target.name]: true})) : 
                    setForm(prev => ({...prev, [e.target.name]: false}))
                  }}/>
                </label>
              </div>
    
              
    
              <section id="save" className="my-5">
                <div className="container mx-auto flex justify-center">
                  <button
                    className="flex gap-x-2 items-center bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block  mr-5"
                    onClick={submitForm}
                  >
                    <img src="/check-save-and-finish.svg" alt="check and save icon" />
                    Save
                  </button>
                  <ReactToPrint
                    trigger={() => (
                      <button className="bg-yellow-500 hover:bg-yellow-300 px-5 py-1 rounded text-white inline-block ">
                        Print
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                </div>
              </section>
            </section>
          </Layout>

       

      <div style={{ display: "none" }}>
        <SupportGroupToPrint ref={componentRef}  form={form} />
      </div>
        </>
      );
};
export default SupportGroups;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    console.log(ctx.params.id)

    const [users, data] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`).then(r => r.json()),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/support_groups/${ctx?.params?.id}`).then(r => r.json())
    ]) 
    return { props: {hcworkers: users, data: data[0] } };

  },
});