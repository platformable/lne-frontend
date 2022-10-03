import React, { useState,useRef } from "react";
import Layout from "../../../../components/Layout";
import Styles from "../../../../styles/ServiceAP.module.css";
import axios from 'axios'
import { useRouter } from 'next/router'
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import ImpactBaselineModal from "../../../../components/ImpactBaselineModal";

import ReactToPrint from 'react-to-print'
import ComponentToPrint from "../../../../components/ComponentToPrint";
import BackButton from "../../../../components/BackButton";
import BackToDashboardButton from "../../../../components/BackToDashboardButton";


export default function IndexServoceActionPlan({ data }) {

  let componentRef = useRef();

  const router = useRouter()
  const [showImpactBaselineModal,setShowImpactBaselineModal]=useState(false)

  const [errorCompleteAllFieldsMessage,setErrorCompleteAllFieldsMessage]=useState('')
  const [loading, setLoading] = useState(false)
  const [serviceActionPlanId,setServiceActionPlanId]=useState("")


  const [clientData, setClientData] = useState({
    clientId:data[0].clientid,
    clientFirstName:data[0].clientfirstname,
    clientLastName :data[0].clientlastname,
    planStartDate :"",
    userFirstName :data[0].clienthcwname,
    userLastName:data[0].clienthcwlastname,
    goal1ServiceCategory:"",
    goal1Summary:"",
    goal1Details:"",
    goal1TargetDate:"",
    goal1ActionStep1:"",
    goal1ActionStep2:"",
    goal1ActionStep3:"",
    goal2ServiceCategory:"",
    goal2Summary:"",
    goal2Details :"",
    goal2TargetDate:"",
    goal2ActionStep1:"",
    goal2ActionStep2:"",
    goal2ActionStep3:"",
    goal3ServiceCategory:"",
    goal3Summary:"",
    goal3Details:"",
    goal3TargetDate:"",
    goal3ActionStep1:"",
    goal3ActionStep2:"",
    goal3ActionStep3:"",
    comments:"",
    HCWSignature:false,
    HCWSignatureDate:"",
    supervisorSignature:false,
    clientSignature:false,
    clientUniqueId:data[0]?.id,
  });



  const genericGoals = [
// "Attend all health appointments",
"Adhere to HIV medication",
// "Remove barriers to accessing medication",
"Access HIV primary care",
// "Consistently measure CD4 Count and Viral load",
"Reduce unsafe sexual behavior",
"Start using PrEP",
// "Prevention counselling",
"Access supportive counselling",
"Access drug and alcohol services",
// "Overdose prevention",
"Assistance with employment, housing, financial or legal issue",
// "Addressing a legal issue",
// "Transportation",
// "Improve food security",
// "Gain access to public assistance",
"Other"
  ]

const services = [
"CD4/VL Lab Report Check",
"Transportation Coordination",
"Translation/Interpretation",
"Comprehensive Behavioral Risk Assessment",
"Treatment Education and Adherence Counselling",
"Prevention Counselling",
"Supportive Counselling",
"Escort",
"Linkage to Services",
"Other form of Assistance",
  ]


  const displayServices = (arr) => {
    return arr.map((service, index) => {
      return (
        <option className="" value={service} key={index}>
          {service}
        </option>
      );
    });
  };

  const displayGenericGoals = (arr) => {
    return arr.map((goal, index) => {
      return (
        <option className="" value={goal} key={index}>
          {goal}
        </option>
      );
    });
  };
  const notifyMessage = () => {
    toast.success("Service Action Plan updated", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const createClientActionPlan = ()=>{

    if(
    //clientData.goal1ServiceCategory==="" ||
    clientData.goal1Summary==="" ||
    clientData.goal1Details==="" ||
    clientData.goal1TargetDate==="" ||
    clientData.goal1ActionStep1==="" 
    //clientData.goal1ActionStep2==="" ||
    //clientData.goal1ActionStep3==="" 
    // clientData.goal2ServiceCategory==="" ||
    // clientData.goal2Summary==="" ||
    // clientData.goal2Details ==="" ||
    // clientData.goal2TargetDate==="" ||
    // clientData.goal2ActionStep1==="" ||
    // clientData.goal2ActionStep2==="" ||
    // clientData.goal2ActionStep3==="" ||
    // clientData.goal3ServiceCategory==="" ||
    // clientData.goal3Summary==="" ||
    // clientData.goal3Details==="" ||
    // clientData.goal3TargetDate==="" ||
    // clientData.goal3ActionStep1==="" ||
    // clientData.goal3ActionStep2==="" ||
    // clientData.goal3ActionStep3===""
    ) {
      setLoading(true)
      setTimeout(()=> {
        setErrorCompleteAllFieldsMessage('* Complete at least Action 1 of Goal 1')
        setLoading(false)
      }, 200)
    }else{
      axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/services_action_plan`, {
        clientData
      })
      .then(function (response) {
        //console.log("response",response)
        console.log(response.data)
        if(response.status===200 || response.statusText==='Ok'){
          setErrorCompleteAllFieldsMessage('')
          setServiceActionPlanId(response.data.service_action_plan_id)
          setShowImpactBaselineModal(!showImpactBaselineModal)
          notifyMessage()
         /*   setTimeout(()=>{
            router.push(`/clients/${clientData.clientId}/profile`)
          },2300)  */
        } 
      })
      .catch(function (error) {
            console.log(error)
      });
    }
  }



  return (
    <>
     
      <Layout>
      <ToastContainer autoClose={2000} />
        <section className="my-5">
          <div className="container mx-auto">
            <div className="md:text-center font-black md:p-0 px-5">
              <h1>Service Action Plan</h1>
            </div>
          </div>
        </section>
        <section className="container mx-auto">
    <div className="flex gap-x-5">
        <BackButton />
        <BackToDashboardButton />
        </div>
        </section>

        <main id="mainContent" >
        <section id="info" className="my-5 px-5">
          <div className="container mx-auto">
            <h3 className="font-black my-5 text-dark-blue">
              Client Information
            </h3>
            <div
              className={`${Styles.serviceActionPlanPageInfoContainer} items-center gap-x-5 border-dark-blue rounded-xl p-5`}
            >
              <div className="service-action-plan-page-info-box md:my-0 my-5">
                 <div className="flex gap-x-2 mb-2 items-center">
                    <img src="/calendar-icon.svg" width="24"/>
                    <h3 className="font-black ">Plan start date</h3>
                  </div>
                  <input
                    type="date"
                    className="block w-full rounded-md border p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    onChange={(e) =>
                      setClientData({ ...clientData, planStartDate: e.target.value })
                    }
                  />
              </div>

              <div className="service-action-plan-page-info-box md:my-0 my-5">
                  
                  <div className="grid grid-cols-3 gap-4">
                  <div className="flex gap-x-2 mb-1 items-end">
                    <img src="/client-icon.svg" width="24" />
                    <h3 className="font-black ">Client</h3>
                  </div>
                  <label className="block">
                    <span className=" font-bold">Client Name</span>
                    <input
                      type="text"
                      className="block w-full bg-blue-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                      value={`${data[0].clientfirstname} ${data[0].clientlastname.charAt(0)}.`}
                      disabled
                    />
                  </label>
                
                  <label className="block">
                    <span className=" font-bold">Client ID</span>
                    <input
                      type="text"
                      className="block w-full bg-blue-50  p-2 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                      value={data[0].clientid}
                      disabled
                    />
                  </label>
                  </div>
                
              </div>
              <div className="service-action-plan-page-info-box">
              
              <div className="grid grid-cols-3 gap-4">
              <div className="flex gap-x-2 mb-1 items-end">
                <img src="/msa_form/LNEuser.svg" width="24" />
                <h3 className="font-black ">Health Care Worker</h3>
              </div>
                <label className="block">
                  <span className=" font-bold">First Name</span>
                  <input
                    type="text"
                    className="block w-full bg-yellow-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    value={clientData.userFirstName}
                    disabled
                  />
                </label>
                <label className="block">
                  <span className=" font-bold">Last Name</span>
                  <input
                    type="text"
                    className="block w-full bg-yellow-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    value={clientData.userLastName}
                    disabled
                  />
                </label>
              </div>
            </div>
            </div>
          </div>
        </section>

        <section id="goals" className="my-5 md:px-0 px-5">
          <div className="container mx-auto">
            <h3 className="font-black my-5 text-dark-blue">Client Goals</h3>
          </div>
          <div
            className={`border-dark-blue container mx-auto rounded-xl px-5 py-5`}
          >
            <div className="service-action-plan-goals-container grid md:grid-cols-3 grid-cols-1 gap-5">

              <div className="service-action-plan-goal-box">
                <div className="service-action-plan-page-goals-top grid gap-5">

                 <div className="flex items-center justify-between">
                  <h3 className="font-black ">Goal 1</h3>
                    <div className="bg-dark-blue w-56 h-px"></div>
                    <img src={'/goal01.svg'} alt=""/>
                    </div>

                  <label className="block">
                    <h4 className="font-black">Summary</h4>

                    <select
                      onChange={(e) =>
                          setClientData({...clientData,goal1Summary:e.target.value})
                      }
                      className=" w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      <option selected="true" disabled="disabled">Select</option>
                      
                      {displayGenericGoals(genericGoals)}
                    </select>
                  </label>

                  {/* <label className="block">
                    <h4 className="font-black">Service Category</h4>

                    <select
                      onChange={(e) =>
                        setClientData({...clientData,goal1ServiceCategory:e.target.value})
                      }
                      className=" w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      <option selected="true" disabled="disabled">Select</option>
                      {displayServices(services)}
                    </select>
                  </label> */}
                  <label className="block">
                    <h4 className="font-black">Details</h4>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData, goal1Details:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                    <h4 className="font-black">Target Date</h4>
                    <input type="date" className="border-black w-full rounded p-2 "
                    onChange={(e)=>setClientData({...clientData,goal1TargetDate:e.target.value})}/>
                  </label>
                  
                  <label className="block">
                  <div className="flex items-center">
                    <h4 className="font-black mr-2">Action 1</h4>
                    <img src={"/action01.svg"} alt="" width="50" height="10"/>
                    </div>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal1ActionStep1:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                  <div className="flex items-center">
                    <h4 className="font-black mr-2">Action 2</h4>
                    <img src={"/action02.svg"} alt="" width="50" height="10"/>
                    </div>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal1ActionStep2:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                  <div className="flex items-center">
                    <h4 className="font-black mr-2">Action 3</h4>
                    <img src={"/action03.svg"} alt="" width="50" height="10"/>
                    </div>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal1ActionStep3:e.target.value})}}></textarea>
                  </label>
                </div>
              </div>


              <div className="service-action-plan-goal-box">
                <div className="service-action-plan-page-goals-top grid gap-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-black ">Goal 2</h3>
                    <div className="bg-dark-blue w-56 h-px"></div>
                    <img src={'/goal02.svg'} alt=""/>
                    </div>

                  <label className="block">
                    <h4 className="font-black">Summary</h4>

                    <select
                      onChange={(e) =>
                          setClientData({...clientData,goal2Summary:e.target.value})
                      }
                      className=" w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      <option selected="true" disabled="disabled">Select</option>
                      
                      {displayGenericGoals(genericGoals)}
                    </select>
                  </label>

                  {/* <label className="block">
                    <h4 className="font-black">Service Category</h4>

                    <select
                      onChange={(e) =>
                        setClientData({...clientData,goal2ServiceCategory:e.target.value})
                      }
                      className=" w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      <option selected="true" disabled="disabled">Select</option>
                      {displayServices(services)}
                    </select>
                  </label> */}
                  <label className="block">
                    <h4 className="font-black">Details</h4>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData, goal2Details:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                    <h4 className="font-black">Target Date</h4>
                    <input type="date" className="border-black w-full rounded p-2 "
                    onChange={(e)=>setClientData({...clientData,goal2TargetDate:e.target.value})}/>
                  </label>
                  
                  <label className="block">
                  <div className="flex items-center">
                    <h4 className="font-black mr-2">Action 1</h4>
                    <img src={"/action01.svg"} alt="" width="50" height="10"/>
                    </div>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal2ActionStep1:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                  <div className="flex items-center">
                    <h4 className="font-black mr-2">Action 2</h4>
                    <img src={"/action02.svg"} alt="" width="50" height="10"/>
                    </div>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal2ActionStep2:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                  <div className="flex items-center">
                    <h4 className="font-black mr-2">Action 3</h4>
                    <img src={"/action03.svg"} alt="" width="50" height="10"/>
                    </div>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal2ActionStep3:e.target.value})}}></textarea>
                  </label>
                </div>
              </div>

              <div className="service-action-plan-goal-box">
                <div className="service-action-plan-page-goals-top grid gap-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-black ">Goal 3</h3>
                    <div className="bg-dark-blue w-56 h-px"></div>
                    <img src={'/goal03.svg'} alt=""/>
                    </div>

                  <label className="block">
                    <h4 className="font-black">Summary</h4>

                    <select
                      onChange={(e) =>
                          setClientData({...clientData,goal3Summary:e.target.value})
                      }
                      className=" w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      <option selected="true" disabled="disabled">Select</option>
                      
                      {displayGenericGoals(genericGoals)}
                    </select>
                  </label>

                  {/* <label className="block">
                    <h4 className="font-black">Service Category</h4>

                    <select
                      onChange={(e) =>
                        setClientData({...clientData,goal3ServiceCategory:e.target.value})
                      }
                      className=" w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      <option selected="true" disabled="disabled">Select</option>
                      {displayServices(services)}
                    </select>
                  </label> */}
                  <label className="block">
                    <h4 className="font-black">Details</h4>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData, goal3Details:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                    <h4 className="font-black">Target Date</h4>
                    <input type="date" className="border-black w-full rounded p-2 "
                    onChange={(e)=>setClientData({...clientData,goal3TargetDate:e.target.value})}/>
                  </label>
                  
                  <label className="block">
                  <div className="flex items-center">
                    <h4 className="font-black mr-2">Action 1</h4>
                    <img src={"/action01.svg"} alt="" width="50" height="10"/>
                    </div>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal3ActionStep1:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                  <div className="flex items-center">
                    <h4 className="font-black mr-2">Action 2</h4>
                    <img src={"/action01.svg"} alt="" width="50" height="10"/>
                    </div>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal3ActionStep2:e.target.value})}}></textarea>
                  </label>

                  <label className="block">
                  <div className="flex items-center">
                    <h4 className="font-black mr-2">Action 3</h4>
                    <img src={"/action03.svg"} alt="" width="50" height="10"/>
                    </div>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,goal3ActionStep3:e.target.value})}}></textarea>
                  </label>
                </div>
              </div>


              
            </div>
            <label className="block">
                    <h4 className="font-black">Additional Comments</h4>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1" 
                    onChange={(e)=>{setClientData({...clientData,comments:e.target.value})}}></textarea>
                  </label>
          </div>
        </section>
        <section id="other" className="my-5 md:px-0 px-5">
          <div className="container mx-auto">
            <h3 className="font-black my-5 text-dark-blue">Signatures</h3>
          
          <div  className={`border-dark-blue  rounded-xl px-5 py-5`}>
                   
          <div className="others-container grid md:grid-cols-3 grid-cols-1 justify-center">
            <div className="others-container-box flex gap-2 justify-center items-center" >
              <p className="text-lg">Has the client signed?</p>
              <input type="checkbox" className="border-dark-blue" 
              onClick={(e)=>{setClientData({...clientData,clientSignature:!clientData.clientSignature})}}/>
            </div>
            <div className="others-container-box flex gap-2 justify-center items-center">
              <p className="text-lg">Has the health care worker signed?</p>
              <input type="checkbox" className="border-dark-blue" 
              onClick={(e)=>{setClientData({...clientData,HCWSignature:!clientData.HCWSignature})}}/>
            </div>
            <div className="others-container-box flex gap-2 justify-center items-center">
              <p className="text-lg">Has the supervisor signed?</p>
              <input type="checkbox" className="border-dark-blue" 
              onClick={(e)=>{setClientData({...clientData,supervisorSignature:!clientData.supervisorSignature})}}/>
            </div>
          </div>
          </div>
          </div>
        </section>
        </main>
        {loading &&  <p className=" my-3 text-center">Loading...</p>}
        {errorCompleteAllFieldsMessage && <p className=" text-red-500 my-3 text-center"><a href="#validation-req">{errorCompleteAllFieldsMessage}</a></p>  }
        <section id="save" className="my-5">
          <div className="container mx-auto flex justify-center">
 {/*          <button className="bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block  mr-5">
            Save Progress</button> */}

              <button className="bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block  mr-5"
                onClick={(e)=>{createClientActionPlan()}}>Save
              </button>
              <ReactToPrint
                  trigger={() => <button className="bg-yellow-500 hover:bg-yellow-300 px-5 py-1 rounded text-white inline-block ">Print</button>}
                  content={() => componentRef.current} />
          
              <div style={{display:'none'}}>
                <ComponentToPrint ref={componentRef} name="" clientData={clientData}/>
              </div>
          </div>
        </section>

      </Layout>
      {
      showImpactBaselineModal && serviceActionPlanId && (
      <ImpactBaselineModal showImpactBaselineModal={showImpactBaselineModal} 
       setShowImpactBaselineModal={setShowImpactBaselineModal} notifyMessage={notifyMessage}
       clientId={clientData.clientId}
       clientUniqueId={clientData.id}
       serviceActionPlanId={serviceActionPlanId}/>)
      }
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid } = ctx.params;
    const  response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/${clientid}`
    );

    const data = await  response.json();
    return { props: { data } };
  },
});
