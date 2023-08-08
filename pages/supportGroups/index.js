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
import SubHeader from "../../components/SubHeader";

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
        /* hcworkers.filter(user=>user.userrole !=='DES') */hcworkers.
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
          


            <SubHeader pageTitle={'Support Group Record'}>
{ <Link href="/supportGroups/pastEvents">
            <button className=" rounded bg-middle-purple text-center px-5 py-1 shadow-xl rounded-lg flex items-center block">
                    <img src="/search_icon.svg" alt="review past group event icon" width={27}/>
                    <p className="p-2 text-lg font-medium">
                    Review past group events
                    </p>
              </button>
          </Link>}
             </SubHeader> 
          <div className="bg-blue-50 py-10">
            
    
            <section className="container mx-auto bg-white rounded-xl shadow-md">
              <div
                id="form"
                className="grid grid-cols-1 gap-10  p-7 mb-5"
              >

                <div className="flex gap-x-3 items-center">
                <img src="/support_groups/Support_Group_information.png" alt="" />
                <h1 className="font-bold text-2xl">Support Group Information</h1>
                </div>
    
                <label className="text-xl font-medium flex flex-col items-start  gap-5">
                  Date group held
                  <input type="date" value={form.supportMeetingDate} name="supportMeetingDate" onChange={handleForm} className="border-black rounded p-2 block"/>
                </label>
                <label className="text-xl font-medium flex flex-col items-start gap-5">
                  Start time
                  <input type="time"  defaultValue={form.supportGroupStartTime} name="supportGroupStartTime" onChange={handleForm} className="border-black rounded p-2 block "/>
                </label>
                <label className="text-xl font-medium flex flex-col items-start gap-5">
                  End time
                  <input type="time"  defaultValue={form.supportGroupEndTime} name="supportGroupEndTime" onChange={handleForm} className="border-black rounded p-2 block"/>
                </label>
                <label className="text-xl font-medium flex flex-col gap-5">

                  Name of group
                  <input type="text" value={form.supportGroupName} name="supportGroupName" onChange={handleForm} className="border-black rounded p-2 block w-full"/>
                </label>
                <label className="text-xl font-medium flex flex-col gap-5">
                  Target audience
                  {/* <input type="text" value={form.supportGroupAudience} name="supportGroupAudience" onChange={handleForm} className="border-black rounded p-2 block w-full"/> */}
                  <select
                  name="supportGroupAudience"
                  onChange={handleForm}
                    className=" mt-1 rounded-md py-2 px-4 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                  >
                    <option selected={true} disabled="disabled">
                      Select
                    </option>
                    {/* <option onClick={() => setSearchByUser("All")}>All</option> */}
               <option value="mens">Mens</option>
               <option value="womens">Womens</option>
               <option value="men and women">Men and Women</option>
                  </select>
                </label>
                <label className="text-xl font-medium flex flex-col gap-5">
                  Discussion topic
                  <input type="text" value={form.supportGroupTopic} name="supportGroupTopic" onChange={handleForm} className="border-black rounded p-2 block w-full"/>
                </label>
                <label className="text-xl font-medium flex flex-col gap-5">
                  Summary of meeting

                  <textarea cols="30" rows="12"  value={form.supportGroupSummary} name="supportGroupSummary" onChange={handleForm} className="border-black rounded p-2 block w-full"/>

                </label>
                <div className="search-box grid md:grid-cols-3 grid-cols-1  items-center  gap-3">
                  <div>
                  <p className="text-xl">Facilitator</p>
                  <select
                  name="facilitator"
                  onChange={handleForm}
                    className=" mt-1 rounded-md py-2 px-4 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                  >
                    <option selected={true} disabled="disabled">
                      Select facilitator
                    </option>
                    {/* <option onClick={() => setSearchByUser("All")}>All</option> */}
                    {displayUserList()}
                  </select>

                  </div>
                <div className="flex justify-center">
                  <label className="flex items-center text-xl gap-5 pt-7">
                  HCW signed?
                  <input type="checkbox" name="supportGroupSigned" onChange={handleForm}/>
                </label>
                </div>
               </div>


               
              </div>
    
              
    
              
            </section>
            <section id="save" className="mt-10">
                <div className="container mx-auto flex justify-center gap-10">
                  <button
                    className="btn-yellow grid grid-cols-3 items-center gap-7 pr-0  px-5 py-2 rounded shadow-lg text-xl inline-block "
                    onClick={submitForm}
                  >
                    <img src="/progress_notes/save_and_finish_mini.svg" alt="check and save icon" />
                    Save
                  </button>
                  <ReactToPrint
                    trigger={() => (
                      <button className="bg-black text-white grid grid-cols-3 items-center gap-7 pr-0  px-5 hover:bg-yellow-200 px-5  py-2 rounded shadow-lg text-xl inline-block ">
                       <img src="/progress_notes/print_mini.svg" alt="print icon"/>
                        Print
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                </div>
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