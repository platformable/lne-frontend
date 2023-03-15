import { useState,useRef } from "react";
import Layout from "../../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import BackButton from "../../components/BackButton";
import BackToDashboardButton from "../../components/BackToDashboardButton";
import { useRouter } from "next/router";
import axios from "axios";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import "react-toastify/dist/ReactToastify.css";
import ReactToPrint from 'react-to-print'
import SupportGroupToPrint from "../../components/SupportGroupToPrint";
import Link from "next/link";

const SupportGroups = ({hcworkers}) => {
  let componentRef = useRef();
    const [form, setForm] = useState({
      supportMeetingDate: new Date().toISOString().slice(0,10), 
      supportGroupName: "", 
      supportGroupAudience: "", 
      supportGroupTopic: "", 
      supportGroupSummary: "", 
      facilitator: "",
      supportGroupStartTime: "10:00",
      supportGroupEndTime: "12:00",
      supportGroupSigned: false,
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
      axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/support_groups`, form)
      .then(data => {
        console.log(data)
        notifyMessage()
        if (data.data.statusText === "OK") {
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
   
          <Layout>
          <ToastContainer autoClose={1500} />
          <div className="container mx-auto my-10">
              <div className="flex justify-between">
                <div className="flex gap-5">
                  <BackButton />
                  <BackToDashboardButton />
                </div>
                <Link href="/supportGroups/pastEvents">
                  <button className=" rounded bg-middle-purple text-center px-5 py-1 shadow-xl rounded-lg flex items-center block">
                          <img src="/supervisor/support_groups_icon.svg" alt="condoms distribution icon" width={18}/>
                          <p className="p-2 text-base">
                          Review past group events
                          </p>
                    </button>
                </Link>
              
              </div>
              <h1 className="font-black  my-5">
                Support Group Record
              </h1>
               
            </div>
          <div className="bg-blue-50 py-10">
            
    
            <section className="container mx-auto bg-white rounded-xl py-7 shadow-md">
              <div
                id="form"
                className="grid grid-cols-1 gap-5   p-5 mb-5"
              >

                <div className="flex gap-x-3">
                <img src="/support_groups/Support_Group_information.png" alt="" />
                <h1 className="font-black">Support Group Information</h1>
                </div>
    
                <label className="text-lg block">
                  Date group held
                  <input type="date" value={form.supportMeetingDate} name="supportMeetingDate" onChange={handleForm} className="border-black rounded p-2 mb-2 block"/>
                </label>
                <label className="text-lg block">
                  Start time
                  <input type="time"  defaultValue={form.supportGroupStartTime} name="supportGroupStartTime" onChange={handleForm} className="border-black rounded p-2 mb-2 block "/>
                </label>
                <label className="text-lg block">
                  End time
                  <input type="time"  defaultValue={form.supportGroupEndTime} name="supportGroupEndTime" onChange={handleForm} className="border-black rounded p-2 mb-2 block"/>
                </label>
                <label className="text-lg block">

                  Name of group
                  <input type="text" value={form.supportGroupName} name="supportGroupName" onChange={handleForm} className="border-black rounded p-2 mb-2 block w-full"/>
                </label>
                <label className="text-lg block">
                  Target audience
                  <input type="text" value={form.supportGroupAudience} name="supportGroupAudience" onChange={handleForm} className="border-black rounded p-2 mb-2 block w-full"/>
                </label>
                <label className="text-lg block">
                  Discussion topic
                  <input type="text" value={form.supportGroupTopic} name="supportGroupTopic" onChange={handleForm} className="border-black rounded p-2 mb-2 block w-full"/>
                </label>
                <label className="text-lg block">
                  Summary of meeting

                  <textarea cols="30" rows="12"  value={form.supportGroupSummary} name="supportGroupSummary" onChange={handleForm} className="border-black rounded p-2 mb-2 block w-full"/>

                </label>
                <div className="search-box grid md:grid-cols-3 grid-cols-1  items-center  gap-3">
                  <div>
                  <p className="text-lg">Facilitator</p>
                  <select
                  name="facilitator"
                  onChange={handleForm}
                    className="w-3/4 mt-1 rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                  >
                    <option selected={true} disabled="disabled">
                      Select facilitator
                    </option>
                    {/* <option onClick={() => setSearchByUser("All")}>All</option> */}
                    {displayUserList()}
                  </select>

                  </div>
                <div className="flex justify-center">
                  <label className="flex items-center gap-5 pt-7">
                  HCW signed?
                  <input type="checkbox" name="supportGroupSigned" onChange={handleForm}/>
                </label>
                </div>
               </div>


               
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
                      <button className="bg-yellow-500 hover:bg-yellow-300 px-5 py-1 rounded text-white inline-block flex gap-2">
                       <img src="/print-report.svg" alt="print icon"/>
                        Print
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                </div>
              </section>
            </section>
            </div>
          </Layout>

       

      <div style={{ display: "none" }}>
        <SupportGroupToPrint ref={componentRef}  form={form} />
      </div>
        </>
      );
};
export default SupportGroups;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`) 
    const hcworkers = await res.json()
    
    return { props: {hcworkers: hcworkers } };

  },
});