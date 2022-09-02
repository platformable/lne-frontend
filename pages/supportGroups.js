import { useState } from "react";
import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import BackButton from "../components/BackButton";
import BackToDashboardButton from "../components/BackToDashboardButton";
import { useRouter } from "next/router";
import axios from "axios";

const SupportGroups = () => {
    const [form, setForm] = useState({
      supportMeetingDate: new Date().toISOString().slice(0,10), 
      supportGroupName: "", 
      supportGroupAudience: "", 
      supportGroupTopic: "", 
      supportGroupHighlights: "", 
      supportGroupChallenges: "", 
    });
    const router = useRouter();
    
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
    return (
        <>
          <ToastContainer autoClose={1500} />
          <Layout>
            <div className="container mx-auto my-5">
              <div className="flex gap-x-5">
              <BackButton />
              <BackToDashboardButton />
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
                  <input type="date" value={form.supportMeetingDate} name="supportMeetingDate" className="border-black rounded p-2 mb-2 block"/>
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
                  <textarea cols="30" rows="6"  value={form.supportGroupTopic} name="supportGroupTopic" onChange={handleForm} className="border-black rounded p-2 mb-2 block w-full"/>
                </label>
                <label className="text-lg block">
                  Highlights
                  <textarea cols="30" rows="6"  value={form.supportGroupHighlights} name="supportGroupHighlights" onChange={handleForm} className="border-black rounded p-2 mb-2 block w-full"/>
                </label>
                <label className="text-lg block">
                  Challenges
                  <textarea cols="30" rows="6"  value={form.supportGroupChallenges} name="supportGroupChallenges" onChange={handleForm} className="border-black rounded p-2 mb-2 block w-full"/>
                </label>
              </div>
    
              
    
              <section id="save" className="my-5">
                <div className="container mx-auto flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block  mr-5"
                    onClick={submitForm}
                  >
                    Save and close
                  </button>
                </div>
              </section>
            </section>
          </Layout>
        </>
      );
};
export default SupportGroups;