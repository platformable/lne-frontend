import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import Styles from "../../../../styles/ServiceAP.module.css";
import axios from 'axios'
import { useRouter } from 'next/router'
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default function EditServiceActionPlan({ data }) {
  const router = useRouter()
  console.log("data", data);
  const [clientData, setClientData] = useState({
    clientId:data[0].clientid,
    clientFirstName:data[0].clientfirstname,
    clientLastName :data[0].clientlastname,
    planStartDate :"",
    userFirstName :data[0].clienthcwname,
    userLastName:data[0].clienthcwlastname,
    goal1ServiceCategory:data[0].goal1servicecategory,
    goal1Summary:data[0].goal1summary,
    goal1Details:data[0].goal1details,
    goal1TargetDate:data[0].goal1targetdate,
    goal1ActionStep1:data[0].goal1actionstep1,
    goal1ActionStep2:data[0].goal1actionstep2,
    goal1ActionStep3:data[0].goal1actionstep3,
    goal2ServiceCategory:data[0].goal2servicecategory,
    goal2Summary:data[0].goal2summary,
    goal2Details :data[0].goal2details,
    goal2TargetDate:data[0].goal2targetdate,
    goal2ActionStep1:data[0].goal2actionstep1,
    goal2ActionStep2:data[0].goal2actionstep2,
    goal2ActionStep3:data[0].goal2actionstep3,
    goal3ServiceCategory:data[0].goal3servicecategory,
    goal3Summary:data[0].goal3summary,
    goal3Details:data[0].goal3details,
    goal3TargetDate:data[0].goal3targetdate,
    goal3ActionStep1:data[0].goal3actionstep1,
    goal3ActionStep2:data[0].goal3actionstep2,
    goal3ActionStep3:data[0].goal3actionstep3,
    comments:data[0].comments,
    HCWSignature:"",
    HCWSignatureDate:"",
    supervisorSignature:"",
    clientSignature:""
  });

  console.log("clientData",clientData)

  const genericGoals = [
"Attend all health appointments",
"Adhere to HIV medication",
"Remove barriers to accessing medication",
"Access HIV primary care",
"Consistently measure CD4 Count and Viral load",
"Reduce unsafe sexual behavior",
"Start using PrEP",
"Prevention counselling",
"Access supportive counselling",
"Address a problem with street drugs or substance abuse",
"Overdose Prevention",
"Assistance with employment",
"Assistance with education",
"Assistance with housing services",
"Addressing a legal issue",
"Transportation",
"Improve food security",
"Gain access to public assistance"
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


  const createClientActionPlan = ()=>{
    axios.post('http://localhost:5500/services_action_plan', {
      clientData
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <>
      <Layout>
        <section className="my-5">
          <div className="container mx-auto">
            <div className="md:text-center font-black md:p-0 px-5">
              <h3>Edit Service Action Plan</h3>
            </div>
          </div>
        </section>
        <section className="container mx-auto">
    

        <button 
        onClick={()=>router.back()}
        className="bg-black hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5 flex items-center">
        <svg className="mr-2" width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 12H8M8 12L11.5 15.5M8 12L11.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
        Back to client profile
        </button>
  
        </section>
        <section id="info" className="my-5 px-5">
          <div className="container mx-auto">
            <h6 className="font-black my-5 text-dark-blue">
              Client Information
            </h6>
            <div
              className={`${Styles.serviceActionPlanPageInfoContainer} gap-x-5 border-dark-blue rounded-xl p-5`}
            >
              <div className="service-action-plan-page-info-box md:my-0 my-5">
                <h3 className="font-black mb-5">Date</h3>
                <label className="block">
                  <span className="text-xs">Plan start date</span>
                  <input
                    type="date"
                    className="block w-full rounded-md border p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                    value={data[0].planstartdate.split('T')[0]}
                    disabled
                  />
                </label>
              </div>

              <div className="service-action-plan-page-info-box md:my-0 my-5">
                <div className="flex gap-x-2 ">
                  <svg
                    width="24"
                    height="24"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    xmlns="http://www.w3.org/2000/svg"
                    className="font-black"
                  >
                    <path
                      d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <h3 className="font-black mb-5">Client</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <label className="block">
                    <span className="text-xs">First Name</span>
                    <input
                      type="text"
                      className="block w-full bg-blue-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                      value={data[0].clientfirstname}
                      disabled
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs">Last Name</span>
                    <input
                      type="text"
                      className="block w-full bg-blue-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                      onChange={(e) =>
                        setUserData({ ...clientData, email: e.target.value })
                      }
                      value={data[0].clientlastname.charAt(0)}
                      disabled
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs">Client ID</span>
                    <input
                      type="text"
                      className="block w-full bg-blue-50  p-2 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                      value={data[0].clientid}
                      disabled
                    />
                  </label>
                </div>
              </div>

              <div className="service-action-plan-page-info-box">
                <div className="flex gap-x-2">
                  <svg
                    width="24"
                    height="24"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    xmlns="http://www.w3.org/2000/svg"
                    className="font-black"
                  >
                    <path
                      d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <h3 className="font-black mb-5">Health Care Worker</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs">First Name</span>
                    <input
                      type="text"
                      className="block w-full bg-yellow-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                      value={data[0].userfirstname}
                      disabled
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs">Last Name</span>
                    <input
                      type="text"
                      className="block w-full bg-yellow-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"

                      value={data[0].userlastname}
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
            <h6 className="font-black my-5 text-dark-blue">Client Goals</h6>
          </div>
          <div
            className={`border-dark-blue container mx-auto rounded-xl px-5 py-5`}
          >
            <div className="service-action-plan-goals-container grid md:grid-cols-3 grid-cols-1 gap-5">

              <div className="service-action-plan-goal-box">
                <div className="service-action-plan-page-goals-top grid gap-5">
                  <h5 className="font-black mt-5">Goal 01</h5>

                  <label className="block">
                    <h6 className="font-black">Summary</h6>

                    <select
                      onChange={(e) =>
                          setClientData({...clientData,goal1Summary:e.target.value})
                      }
                      className="text-xs w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                      
                    >
                     <option value={clientData.goal1Summary} selected="true">{clientData.goal1Summary}</option>
                    {/*   <option  disabled="disabled">Select</option> */}
                      
                      {displayGenericGoals(genericGoals)}
                    </select>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Service Category</h6>

                    <select
                      onChange={(e) =>
                        setClientData({...clientData,goal1ServiceCategory:e.target.value})
                      }
                      className="text-xs w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                        <option value={clientData.goal1ServiceCategory} selected="true">{clientData.goal1ServiceCategory}</option>
                    {/*   <option  disabled="disabled">Select</option> */}
                      {displayServices(services)}
                    </select>
                  </label>
                  <label className="block">
                    <h6 className="font-black">Details</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1 text-xs" 
                    onChange={(e)=>{setClientData({...clientData, goal1Details:e.target.value})}}
                    value={clientData.goal1Details}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Target Date</h6>
                    <input type="date" className="border-black w-full rounded p-2 text-xs"
                    value={clientData.goal1TargetDate.split('T')[0]}
                    onChange={(e)=>setClientData({...clientData,goal1TargetDate:e.target.value})}/>
                  </label>
                  
                  <label className="block">
                    <h6 className="font-black">Action 01</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1 text-xs" 
                    onChange={(e)=>{setClientData({...clientData,goal1ActionStep1:e.target.value})}}
                    value={clientData.goal1ActionStep1}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Action 02</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1 text-xs" 
                    onChange={(e)=>{setClientData({...clientData,goal1ActionStep2:e.target.value})}}
                    value={clientData.goal1ActionStep2}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Action 03</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1 text-xs" 
                    onChange={(e)=>{setClientData({...clientData,goal1ActionStep3:e.target.value})}}
                    value={clientData.goal1ActionStep3}
                    ></textarea>
                  </label>
                </div>
              </div>


              <div className="service-action-plan-goal-box">
                <div className="service-action-plan-page-goals-top grid gap-5">
                  <h5 className="font-black mt-5">Goal 02</h5>

                  <label className="block">
                    <h6 className="font-black">Summary</h6>

                    <select
                      onChange={(e) =>
                          setClientData({...clientData,goal2Summary:e.target.value})
                      }
                      className="text-xs w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      <option value={clientData.goal2Summary} selected="true">{clientData.goal2Summary}</option>
                    {/*   <option  disabled="disabled">Select</option> */}
                      
                      {displayGenericGoals(genericGoals)}
                    </select>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Service Category</h6>

                    <select
                      onChange={(e) =>
                        setClientData({...clientData,goal2ServiceCategory:e.target.value})
                      }
                      className="text-xs w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                          <option value={clientData.goal2ServiceCategory} selected="true">{clientData.goal2ServiceCategory}</option>
                    {/*   <option  disabled="disabled">Select</option> */}
                      {displayServices(services)}
                    </select>
                  </label>
                  <label className="block">
                    <h6 className="font-black">Details</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1 text-xs" 
                    onChange={(e)=>{setClientData({...clientData, goal2Details:e.target.value})}}
                    value={clientData.goal2Details}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Target Date</h6>
                    <input type="date" className="border-black w-full rounded p-2 text-xs"
                    onChange={(e)=>setClientData({...clientData,goal2TargetDate:e.target.value})}
                    value={clientData.goal2TargetDate.split('T')[0]}
                    />
                  </label>
                  
                  <label className="block">
                    <h6 className="font-black">Action 01</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1 text-xs" 
                    onChange={(e)=>{setClientData({...clientData,goal2ActionStep1:e.target.value})}}
                    value={clientData.goal2ActionStep1}
                    ></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Action 02</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1 text-xs" 
                    onChange={(e)=>{setClientData({...clientData,goal2ActionStep2:e.target.value})}}
                    value={clientData.goal2ActionStep2}
                    ></textarea>
                  
                  </label>

                  <label className="block">
                    <h6 className="font-black">Action 03</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1 text-xs" 
                    value={clientData.goal2ActionStep3}
                    onChange={(e)=>{setClientData({...clientData,goal2ActionStep3:e.target.value})}}></textarea>
                  </label>
                </div>
              </div>

              <div className="service-action-plan-goal-box">
                <div className="service-action-plan-page-goals-top grid gap-5">
                  <h5 className="font-black mt-5">Goal 03</h5>

                  <label className="block">
                    <h6 className="font-black">Summary</h6>

                    <select
                      onChange={(e) =>
                          setClientData({...clientData,goal3Summary:e.target.value})
                      }
                      className="text-xs w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      
                      <option value={clientData.goal3Summary} selected="true">{clientData.goal3Summary}</option>
                    {/*   <option  disabled="disabled">Select</option> */}
                      
                      {displayGenericGoals(genericGoals)}
                    </select>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Service Category</h6>

                    <select
                      onChange={(e) =>
                        setClientData({...clientData,goal3ServiceCategory:e.target.value})
                      }
                      className="text-xs w-full mt-1 tezr-xs rounded-md py-2 p-r-5 border-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                    >
                      <option value={clientData.goal3ServiceCategory} selected="true">{clientData.goal3ServiceCategory}</option>
                    {/*   <option  disabled="disabled">Select</option> */}
                      {displayServices(services)}
                    </select>
                  </label>
                  <label className="block">
                    <h6 className="font-black">Details</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1 text-xs" 
                    onChange={(e)=>{setClientData({...clientData, goal3Details:e.target.value})}}
                    value={clientData.goal3Details}
                    ></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Target Date</h6>
                    <input type="date" className="border-black w-full rounded p-2 text-xs"
                    onChange={(e)=>setClientData({...clientData,goal3TargetDate:e.target.value})}
                    value={clientData.goal3TargetDate.split('T')[0]}
                    />
                  </label>
                  
                  <label className="block">
                    <h6 className="font-black">Action 01</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1 text-xs" 
                    onChange={(e)=>{setClientData({...clientData,goal3ActionStep1:e.target.value})}}
                    value={clientData.goal3ActionStep1}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Action 02</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1 text-xs" 
                    onChange={(e)=>{setClientData({...clientData,goal3ActionStep2:e.target.value})}}
                    value={clientData.goal3ActionStep1}></textarea>
                  </label>

                  <label className="block">
                    <h6 className="font-black">Action 03</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1 text-xs" 
                    onChange={(e)=>{setClientData({...clientData,goal3ActionStep3:e.target.value})}}
                    value={clientData.goal3ActionStep1}></textarea>
                  </label>
                </div>
              </div>


              
            </div>
          </div>
        </section>
        <section id="other" className="my-5 md:px-0 px-5">
          <div className="container mx-auto">
            <h6 className="font-black my-5 text-dark-blue">Others</h6>
          
          <div  className={`border-dark-blue  rounded-xl px-5 py-5`}>
          <label className="block">
                    <h6 className="font-black">Additional Comments</h6>
                    <textarea name="" id="" cols="30" rows="4" className="border-black w-full rounded p-1 text-xs" 
                    onChange={(e)=>{setClientData({...clientData,comments:e.target.value})}}
                    value={clientData.comments || ""}
                    ></textarea>
                  </label>
          
          <h6 className="font-black">Signatures</h6>
          <div className="others-container grid md:grid-cols-3 grid-cols-1 justify-center">
            <div className="others-container-box flex gap-2 justify-center items-center" >
              <p>Has the client signed?</p>
              <input type="checkbox" className="border-dark-blue" 
              onClick={(e)=>{setClientData({...clientData,clientSignature:e.target.value})}}/>
            </div>
            <div className="others-container-box flex gap-2 justify-center items-center">
              <p>Has the health care worker signed?</p>
              <input type="checkbox" className="border-dark-blue" 
              onClick={(e)=>{setClientData({...clientData,HCWSignature:e.target.value})}}/>
            </div>
            <div className="others-container-box flex gap-2 justify-center items-center">
              <p>Has the supervisor signed?</p>
              <input type="checkbox" className="border-dark-blue" 
              onClick={(e)=>{setClientData({...clientData,supervisorSignature:e.target.value})}}/>
            </div>
          </div>
          </div>
          </div>
        </section>

        <section id="save" className="my-5">
          <div className="container mx-auto flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5">
            Save Progress</button>
            <button className="bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5"
            onClick={(e)=>{createClientActionPlan()}}>Save</button>
            <button className="bg-yellow-500 hover:bg-yellow-300 px-5 py-1 rounded text-white inline-block text-xs">Print</button>
          </div>
        </section>

      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid } = ctx.params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/services_action_plan/${clientid}`
    );

    const data = await res.json();
    return { props: { data } };
  },
});
