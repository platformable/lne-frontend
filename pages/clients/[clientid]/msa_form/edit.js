import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Styles from "../../../../styles/ServiceAP.module.css";
import MSAStyles from "../../../../styles/MSA.module.css";
import axios from 'axios'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditMsaFormPage = ({ data }) => {
 
   const router = useRouter()

   const notifyMessage = () => {
    toast.success("MSA Form updated!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
    

  const { user, error, isLoading } = useUser();
  const loggedUserRole = user && user["https://lanuevatest.herokuapp.com/roles"];

const disableUserIfNotSupervisor = ()=> loggedUserRole ==='HCW' ? true : false


  const [clientData, setClientData] = useState({
    dateFormReviewed:new Date(),
    clientId: data[0].clientid,
    clientFirstName: data[0].clientfirstname,
    clientLastName: data[0].clientlastname,
    clientHCWID: data[0].clienthcwid,
    planStartDate: "",
    userFirstName: data[0].userfirstname,
    userLastName: data[0].userlastname,
    AIRSIntakeForm: data[0].airsintakeform==="0" ? false: true,
    AIRSIntakeFormDate: data[0].airsintakeformdate,
    ComprehensiveRiskBehaviorAssessment: data[0].comprehensiveriskbehaviorassessment ==="0" ? false: true,
    ComprehensiveRiskBehaviorAssessmentDate:data[0].comprehensiveriskbehaviorassessmentdate,
    ServiceActionPlan: data[0].serviceactionplan ==="0" ? false: true,
    ServiceActionPlanDate:  data[0].serviceactionplandate,
    AIRSCollateralInformation: data[0].airscollateralinformation ==="0" ? false: true,
    AIRSCollateralInformationDate:data[0].airscollateralinformationdate,
    AIRSFinancialInformation: data[0].airsfinancialinformation ==="0" ? false: true,
    AIRSFinancialInformationDate: data[0].airsfinancialinformationdate ,
    AIRSHIVAIDSRiskHistory: data[0].airshivaidsriskhistory ==="0" ? false: true,
    AIRSHIVAIDSRiskHistoryDate: data[0].airshivaidsriskhistorydate,
    AIRSHCVHistory: data[0].airshcvhistory ==="0" ? false: true,
    AIRSHCVHistoryDate: data[0].airshcvhistorydate,
    AIRSHousingInformation: data[0].airshousinginformation ==="0" ? false: true,
    AIRSHousingInformationDate: data[0].airshousinginformationdate,
    AIRSInsuranceInformation: data[0].airsinsuranceinformation ==="0" ? false: true,
    AIRSInsuranceInformationDate: data[0].airsinsuranceinformationdate,
    AIRSSubstanceUseHistory: data[0].airssubstanceusehistory ==="0" ? false: true,
    AIRSSubstanceUseHistoryDate: data[0].airssubstanceusehistorydate,
    LNEClientRights: data[0].lneclientrights ==="0" ? false: true,
    LNEClientRightsDate: data[0].lneclientrightsdate,
    LNEClientGrievancePolicyProcedure: data[0].lneclientgrievancepolicyprocedure ==="0" ? false: true,
    LNEClientGrievancePolicyProcedureDate: data[0].lneclientgrievancepolicyproceduredate,
    LNEProgramRules: data[0].lneprogramrules ==="0" ? false: true,
    LNEProgramRulesDate: data[0].lneprogramrulesdate,
    LNEEmergencyContactConsent: data[0].lneemergencycontactconsent ==="0" ? false: true,
    LNEEmergencyContactConsentDate: data[0].lneemergencycontactconsentdate,
    LNEConsentForReleaseOfConfidentialInformation: data[0].lneconsentforreleaseofconfidentialinformation ==="0" ? false: true,
    LNEConsentForReleaseOfConfidentialInformationDate: data[0].lneconsentforreleaseofconfidentialinformationdate,
    HIPPAConsentForm: data[0].hippaconsentform ==="0" ? false: true,
    HIPPAConsentFormDate: data[0].hippaconsentformdate,
    NYCDOHMHNoticeOfPrivacyPractices: data[0].nycdohmhnoticeofprivacypractices ==="0" ? false: true,
    NYCDOHMHNoticeOfPrivacyPracticesDate: data[0].nycdohmhnoticeofprivacypracticesdate,
    LNEOutreachRetentionTrackingForm: data[0].lneoutreachretentiontrackingform ==="0" ? false: true,
    LNEOutreachRetentionTrackingFormDate: data[0].lneoutreachretentiontrackingformdate,
    LNEReferralInformation: data[0].lnereferralinformation ==="0" ? false: true,
    LNEReferralInformationDate: data[0].lnereferralinformationdate,
    LNEClientReferralForm: data[0].lneclientreferralform ==="0" ? false: true,
    LNEClientReferralFormDate: data[0].lneclientreferralformdate,
    LNEHNSEligibilityForm: data[0].lnehnseligibilityform ==="0" ? false: true,
    LNEHNSEligibilityFormDate: data[0].lnehnseligibilityformdate
  });

const todaysDate = new Date();

  console.log("data",data)
  console.log("clientData",clientData)


const handleMsaform = ()=> {

    axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientData.clientId}/update`, {
        clientData
      })
      .then(function (response) {
   
        if(response.status===200 || response.statusText==='Ok'){
          notifyMessage()
            setTimeout(()=>{
              router.push(`/clients/${clientData.clientId}/profile`)
            },2300)
          } 
      })
      .catch(function (error) {
       res.send(error)
      });
}

const crearFecha=()=>{
  const initialDate= new Date().toLocaleDateString()
  const newDate=initialDate.split('/')
  const fixedDate=`${newDate[2]}-${newDate[1].length===1? `0${newDate[1]}`:`${newDate[1]}`}-${newDate[0].length===1 ? `0${newDate[0]}`: `${newDate[0]}`}`
  return fixedDate

}

  return (
    <><ToastContainer autoClose={2000} />
      <Layout>
      
        <div className="container mx-auto">
          <h3 className="font-black text-center my-5">Edit MSA FORM</h3>
        </div>

        

        <main className="container mx-auto">
         
        <button 
        onClick={()=>router.back()}
        className="bg-black hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5 flex items-center">
        <svg className="mr-2" width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 12H8M8 12L11.5 15.5M8 12L11.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to client profile
        </button>
          <section id="info" className="my-5">
            <div className="">
              <h6 className="font-black my-5 text-dark-blue">
                 Client Information
              </h6>
              <div
                className={`${Styles.serviceActionPlanPageInfoContainer} gap-x-5 border-dark-blue rounded-xl p-5`}
              >
                <div className="service-action-plan-page-info-box md:my-0 my-5">
                  <h3 className="font-black mb-5">Date</h3>
                  <label className="block">
                    <span className="text-xs">Todays date</span>
                    <p>{new Date().toLocaleDateString('en',{year:'numeric',month:'numeric',day:'numeric'})}</p>
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
                        value={clientData.userFirstName}
                        disabled
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs">Last Name</span>
                      <input
                        type="text"
                        className="block w-full bg-yellow-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                        value={clientData.userLastName}
                        disabled
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <h6 className="font-black my-5 text-dark-blue">
            Forms - check if documents were added to the client&apos;s file
          </h6>
          <section
            id="form"
            className="gap-x-5 border-dark-blue rounded-xl p-5 mb-5"
          >
            {/* {TABLE HEAD} */}
            <p className="text-xs"><span className="text-red-500">*</span> Mandatory fields (Please, fill out these forms to complete the process)</p>
            <div
              id="form-head"
              className={`${MSAStyles.formRowsContainer} bg-dark-blue  text-white grid gap-5 py-2 rounded-tl-lg rounded-tr-lg my-2`}
            >
              <div></div>
              <p>Form name</p>
              <p className="text-center">Date added</p>
              <p className="text-center">Dropbox Folder</p>
            </div>
            {/* {TABLE HEAD} */}

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSIntakeForm? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.AIRSIntakeForm ?
                          setClientData(formState => ({
                            ...formState,
                            AIRSIntakeForm: !formState.AIRSIntakeForm,
                            AIRSIntakeFormDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            AIRSIntakeForm: !formState.AIRSIntakeForm,
                            AIRSIntakeFormDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSIntakeForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.AIRSIntakeForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.AIRSIntakeFormDate === "" || clientData.AIRSIntakeFormDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSIntakeForm: !clientData.AIRSIntakeForm,
                        AIRSIntakeFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSIntakeForm: !clientData.AIRSIntakeForm,
                        AIRSIntakeFormDate: ""
                      })
                  }
                  }
                  checked={clientData.AIRSIntakeForm ? 'checked' : false}
                  disabled={clientData.AIRSIntakeForm ? true : false}
                />
                
              </div>
              <div>
                <p>AIRS Intake Form <span className="text-red-500">*</span></p>
              </div>
          
              <div className="text-center">
                 
                <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.AIRSIntakeFormDate &&
                    clientData.AIRSIntakeFormDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSIntakeFormDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSIntakeForm: !clientData.AIRSIntakeForm,
                      AIRSIntakeFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>

                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ComprehensiveRiskBehaviorAssessment? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.ComprehensiveRiskBehaviorAssessment ?
                          setClientData(formState => ({
                            ...formState,
                            ComprehensiveRiskBehaviorAssessment: !formState.ComprehensiveRiskBehaviorAssessment,
                            ComprehensiveRiskBehaviorAssessmentDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            ComprehensiveRiskBehaviorAssessment: !formState.ComprehensiveRiskBehaviorAssessment,
                            ComprehensiveRiskBehaviorAssessmentDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ComprehensiveRiskBehaviorAssessment ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.ComprehensiveRiskBehaviorAssessment && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.ComprehensiveRiskBehaviorAssessmentDate === "" || clientData.ComprehensiveRiskBehaviorAssessmentDate === null ? (
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessment: !clientData.ComprehensiveRiskBehaviorAssessment,
                        ComprehensiveRiskBehaviorAssessmentDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessment: !clientData.ComprehensiveRiskBehaviorAssessment,
                        ComprehensiveRiskBehaviorAssessmentDate: ""
                      })
                  }
                  }
                  checked={clientData.ComprehensiveRiskBehaviorAssessment ? 'checked' : false}
                  disabled={clientData.ComprehensiveRiskBehaviorAssessment ? true : false}
                />
                
              </div>
              <div>
                <p>Comprehensive Risk Behavior Assessment <span className="text-red-500">*</span> </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.ComprehensiveRiskBehaviorAssessmentDate &&
                    clientData.ComprehensiveRiskBehaviorAssessmentDate.split('T')[0]
                  }
                  /* disabled={clientData.ComprehensiveRiskBehaviorAssessmentDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessment:
                        !clientData.ComprehensiveRiskBehaviorAssessment,
                      ComprehensiveRiskBehaviorAssessmentDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex justify-center">
              <a href={data[0]?.cbra_folder_url ? data[0]?.cbra_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ServiceActionPlan? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.ServiceActionPlan ?
                          setClientData(formState => ({
                            ...formState,
                            ServiceActionPlan: !formState.ServiceActionPlan,
                            ServiceActionPlanDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            ServiceActionPlan: !formState.ServiceActionPlan,
                            ServiceActionPlanDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ServiceActionPlan ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.ServiceActionPlan && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.ServiceActionPlanDate === "" || clientData.ServiceActionPlanDate === null ? (
                      setClientData({
                        ...clientData,
                        ServiceActionPlan: !clientData.ServiceActionPlan,
                        ServiceActionPlanDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ServiceActionPlan: !clientData.ServiceActionPlan,
                        ServiceActionPlanDate: ""
                      })
                  }
                  }
                  checked={clientData.ServiceActionPlan ? 'checked' : false}
                  disabled={clientData.ServiceActionPlan ? true : false}
                />
                
              </div>
              <div>
                <p>Service Action Plan <span className="text-red-500">*</span> </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.ServiceActionPlanDate &&
                    clientData.ServiceActionPlanDate.split('T')[0]
                  }
                  /* disabled={clientData.ServiceActionPlanDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      ServiceActionPlanDate: e.target.value,
                      ServiceActionPlan: !clientData.ServiceActionPlan,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.action_plans_folder_url ? data[0]?.action_plans_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSCollateralInformation? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.AIRSCollateralInformation ?
                          setClientData(formState => ({
                            ...formState,
                            AIRSCollateralInformation: !formState.AIRSCollateralInformation,
                            AIRSCollateralInformationDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            AIRSCollateralInformation: !formState.AIRSCollateralInformation,
                            AIRSCollateralInformationDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSCollateralInformation ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.AIRSCollateralInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.AIRSCollateralInformationDate === "" || clientData.AIRSCollateralInformationDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSCollateralInformation: !clientData.AIRSCollateralInformation,
                        AIRSCollateralInformationDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSCollateralInformation: !clientData.AIRSCollateralInformation,
                        AIRSCollateralInformationDate: ""
                      })
                  }
                  }
                  checked={clientData.AIRSCollateralInformation ? 'checked' : false}
                  disabled={clientData.AIRSCollateralInformation ? true : false}
                />
                
              </div>
              <div>
                <p>AIRS Collateral Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSCollateralInformation"
                  value={
                    clientData.AIRSCollateralInformationDate &&
                    clientData.AIRSCollateralInformationDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSCollateralInformationDate: e.target.value,
                      AIRSCollateralInformation:
                        !clientData.AIRSCollateralInformation,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSFinancialInformation? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.AIRSFinancialInformation ?
                          setClientData(formState => ({
                            ...formState,
                            AIRSFinancialInformation: !formState.AIRSFinancialInformation,
                            AIRSFinancialInformationDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            AIRSFinancialInformation: !formState.AIRSFinancialInformation,
                            AIRSFinancialInformationDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSFinancialInformation ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.AIRSFinancialInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.AIRSFinancialInformationDate === "" || clientData.AIRSFinancialInformationDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSFinancialInformation: !clientData.AIRSFinancialInformation,
                        AIRSFinancialInformationDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSFinancialInformation: !clientData.AIRSFinancialInformation,
                        AIRSFinancialInformationDate: ""
                      })
                  }
                  }
                  checked={clientData.AIRSFinancialInformation ? 'checked' : false}
                  disabled={clientData.AIRSFinancialInformation ? true : false}
                />
                
              </div>
              <div>
                <p>AIRS Financial Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSFinancialInformation"
                  value={
                    clientData.AIRSFinancialInformationDate &&
                    clientData.AIRSFinancialInformationDate.split('T')[0]
                  }
                  disabled={clientData.AIRSFinancialInformationDate ? true: false}
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSFinancialInformationDate: e.target.value,
                      AIRSFinancialInformation:
                        !clientData.AIRSFinancialInformation,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHIVAIDSRiskHistory? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.AIRSHIVAIDSRiskHistory ?
                          setClientData(formState => ({
                            ...formState,
                            AIRSHIVAIDSRiskHistory: !formState.AIRSHIVAIDSRiskHistory,
                            AIRSHIVAIDSRiskHistoryDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            AIRSHIVAIDSRiskHistory: !formState.AIRSHIVAIDSRiskHistory,
                            AIRSHIVAIDSRiskHistoryDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHIVAIDSRiskHistory ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.AIRSHIVAIDSRiskHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.AIRSHIVAIDSRiskHistoryDate === "" || clientData.AIRSHIVAIDSRiskHistoryDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHIVAIDSRiskHistory: !clientData.AIRSHIVAIDSRiskHistory,
                        AIRSHIVAIDSRiskHistoryDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHIVAIDSRiskHistory: !clientData.AIRSHIVAIDSRiskHistory,
                        AIRSHIVAIDSRiskHistoryDate: ""
                      })
                  }
                  }
                  checked={clientData.AIRSHIVAIDSRiskHistory ? 'checked' : false}
                  disabled={clientData.AIRSHIVAIDSRiskHistory ? true : false}
                />
                
              </div>
              <div>
                <p>AIRS HIV AIDS Risk History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHIVAIDSRiskHistory"
                  value={
                    clientData.AIRSHIVAIDSRiskHistoryDate &&
                    clientData.AIRSHIVAIDSRiskHistoryDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSHIVAIDSRiskHistoryDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHIVAIDSRiskHistoryDate: e.target.value,
                      AIRSHIVAIDSRiskHistory:
                        !clientData.AIRSHIVAIDSRiskHistory,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.medical_folder_url ? data[0]?.medical_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid items-center gap-5 py-2 rounded-lg my-2`}
            >
               <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHCVHistory? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.AIRSHCVHistory ?
                          setClientData(formState => ({
                            ...formState,
                            AIRSHCVHistory: !formState.AIRSHCVHistory,
                            AIRSHCVHistoryDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            AIRSHCVHistory: !formState.AIRSHCVHistory,
                            AIRSHCVHistoryDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHCVHistory ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.AIRSHCVHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.AIRSHCVHistoryDate === "" || clientData.AIRSHCVHistoryDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHCVHistory: !clientData.AIRSHCVHistory,
                        AIRSHCVHistoryDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHCVHistory: !clientData.AIRSHCVHistory,
                        AIRSHCVHistoryDate: ""
                      })
                  }
                  }
                  checked={clientData.AIRSHCVHistory ? 'checked' : false}
                  disabled={clientData.AIRSHCVHistory ? true : false}
                />
                
              </div>
              <div>
                <p>AIRS HCV History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  value={
                    clientData.AIRSHCVHistoryDate &&
                    clientData.AIRSHCVHistoryDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSHCVHistoryDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHCVHistoryDate: e.target.value,
                      AIRSHCVHistory: !clientData.AIRSHCVHistory,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.medical_folder_url ? data[0]?.medical_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHousingInformation? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.AIRSHousingInformation ?
                          setClientData(formState => ({
                            ...formState,
                            AIRSHousingInformation: !formState.AIRSHousingInformation,
                            AIRSHousingInformationDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            AIRSHousingInformation: !formState.AIRSHousingInformation,
                            AIRSHousingInformationDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHousingInformation ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.AIRSHousingInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.AIRSHousingInformationDate === "" || clientData.AIRSHousingInformationDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHousingInformation: !clientData.AIRSHousingInformation,
                        AIRSHousingInformationDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHousingInformation: !clientData.AIRSHousingInformation,
                        AIRSHousingInformationDate: ""
                      })
                  }
                  }
                  checked={clientData.AIRSHousingInformation ? 'checked' : false}
                  disabled={clientData.AIRSHousingInformation ? true : false}
                />
                
              </div>
              <div>
                <p>AIRS Housing Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHousingInformation"
                  value={
                    clientData.AIRSHousingInformationDate &&
                    clientData.AIRSHousingInformationDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSHousingInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHousingInformationDate: e.target.value,
                      AIRSHousingInformation:
                        !clientData.AIRSHousingInformation,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSInsuranceInformation? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.AIRSInsuranceInformation ?
                          setClientData(formState => ({
                            ...formState,
                            AIRSInsuranceInformation: !formState.AIRSInsuranceInformation,
                            AIRSInsuranceInformationDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            AIRSInsuranceInformation: !formState.AIRSInsuranceInformation,
                            AIRSInsuranceInformationDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSInsuranceInformation ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.AIRSInsuranceInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.AIRSInsuranceInformationDate === "" || clientData.AIRSInsuranceInformationDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSInsuranceInformation: !clientData.AIRSInsuranceInformation,
                        AIRSInsuranceInformationDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSInsuranceInformation: !clientData.AIRSInsuranceInformation,
                        AIRSInsuranceInformationDate: ""
                      })
                  }
                  }
                  checked={clientData.AIRSInsuranceInformation ? 'checked' : false}
                  disabled={clientData.AIRSInsuranceInformation ? true : false}
                />
                
              </div>
              <div>
                <p>AIRS Insurance Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSInsuranceInformation"
                  value={
                    clientData.AIRSInsuranceInformationDate &&
                    clientData.AIRSInsuranceInformationDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSInsuranceInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSInsuranceInformationDate: e.target.value,
                      AIRSInsuranceInformation:
                        !clientData.AIRSInsuranceInformation,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSSubstanceUseHistory? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.AIRSSubstanceUseHistory ?
                          setClientData(formState => ({
                            ...formState,
                            AIRSSubstanceUseHistory: !formState.AIRSSubstanceUseHistory,
                            AIRSSubstanceUseHistoryDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            AIRSSubstanceUseHistory: !formState.AIRSSubstanceUseHistory,
                            AIRSSubstanceUseHistoryDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSSubstanceUseHistory ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.AIRSSubstanceUseHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.AIRSSubstanceUseHistoryDate === "" || clientData.AIRSSubstanceUseHistoryDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSSubstanceUseHistory: !clientData.AIRSSubstanceUseHistory,
                        AIRSSubstanceUseHistoryDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSSubstanceUseHistory: !clientData.AIRSSubstanceUseHistory,
                        AIRSSubstanceUseHistoryDate: ""
                      })
                  }
                  }
                  checked={clientData.AIRSSubstanceUseHistory ? 'checked' : false}
                  disabled={clientData.AIRSSubstanceUseHistory ? true : false}
                />
                
              </div>
              <div>
                <p>AIRS Substance Use History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSSubstanceUseHistory"
                  value={
                    clientData.AIRSSubstanceUseHistoryDate &&
                    clientData.AIRSSubstanceUseHistoryDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSSubstanceUseHistoryDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSSubstanceUseHistoryDate: e.target.value,
                      AIRSSubstanceUseHistory:
                        !clientData.AIRSSubstanceUseHistory,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.medical_folder_url ? data[0]?.medical_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEClientRights? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.LNEClientRights ?
                          setClientData(formState => ({
                            ...formState,
                            LNEClientRights: !formState.LNEClientRights,
                            LNEClientRightsDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            LNEClientRights: !formState.LNEClientRights,
                            LNEClientRightsDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEClientRights ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.LNEClientRights && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.LNEClientRightsDate === "" || clientData.LNEClientRightsDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEClientRights: !clientData.LNEClientRights,
                        LNEClientRightsDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEClientRights: !clientData.LNEClientRights,
                        LNEClientRightsDate: ""
                      })
                  }
                  }
                  checked={clientData.LNEClientRights ? 'checked' : false}
                  disabled={clientData.LNEClientRights ? true : false}
                />
                
              </div>
              <div>
                <p>LNE Client Rights </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientRights"
                  value={
                    clientData.LNEClientRightsDate &&
                    clientData.LNEClientRightsDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEClientRightsDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientRightsDate: e.target.value,
                      LNEClientRights: !clientData.LNEClientRights,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consents_folder_url ? data[0]?.consents_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEClientGrievancePolicyProcedure? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.LNEClientGrievancePolicyProcedure ?
                          setClientData(formState => ({
                            ...formState,
                            LNEClientRights: !formState.LNEClientGrievancePolicyProcedure,
                            LNEClientGrievancePolicyProcedureDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            LNEClientGrievancePolicyProcedure: !formState.LNEClientGrievancePolicyProcedure,
                            LNEClientGrievancePolicyProcedureDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEClientGrievancePolicyProcedure ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.LNEClientGrievancePolicyProcedure && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.LNEClientGrievancePolicyProcedureDate === "" || clientData.LNEClientGrievancePolicyProcedureDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEClientGrievancePolicyProcedure: !clientData.LNEClientGrievancePolicyProcedure,
                        LNEClientGrievancePolicyProcedureDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEClientGrievancePolicyProcedure: !clientData.LNEClientGrievancePolicyProcedure,
                        LNEClientGrievancePolicyProcedureDate: ""
                      })
                  }
                  }
                  checked={clientData.LNEClientGrievancePolicyProcedure ? 'checked' : false}
                  disabled={clientData.LNEClientGrievancePolicyProcedure ? true : false}
                />
                
              </div>
              <div>
                <p>LNE Client Grievance Policy & Procedure </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  value={
                    clientData.LNEClientGrievancePolicyProcedureDate &&
                    clientData.LNEClientGrievancePolicyProcedureDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEClientGrievancePolicyProcedureDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientGrievancePolicyProcedureDate: e.target.value,
                      LNEClientGrievancePolicyProcedure:
                        !clientData.LNEClientGrievancePolicyProcedure,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consents_folder_url ? data[0]?.consents_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEClientGrievancePolicyProcedure? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.LNEClientGrievancePolicyProcedure ?
                          setClientData(formState => ({
                            ...formState,
                            LNEClientRights: !formState.LNEClientGrievancePolicyProcedure,
                            LNEClientGrievancePolicyProcedureDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            LNEClientGrievancePolicyProcedure: !formState.LNEClientGrievancePolicyProcedure,
                            LNEClientGrievancePolicyProcedureDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEClientGrievancePolicyProcedure ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.LNEClientGrievancePolicyProcedure && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.LNEClientGrievancePolicyProcedureDate === "" || clientData.LNEClientGrievancePolicyProcedureDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEClientGrievancePolicyProcedure: !clientData.LNEClientGrievancePolicyProcedure,
                        LNEClientGrievancePolicyProcedureDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEClientGrievancePolicyProcedure: !clientData.LNEClientGrievancePolicyProcedure,
                        LNEClientGrievancePolicyProcedureDate: ""
                      })
                  }
                  }
                  checked={clientData.LNEClientGrievancePolicyProcedure ? 'checked' : false}
                  disabled={clientData.LNEClientGrievancePolicyProcedure ? true : false}
                />
                
              </div>
              <div>
                <p>LNE Program Rules </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  value={
                    clientData.LNEProgramRulesDate &&
                    clientData.LNEProgramRulesDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEProgramRulesDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEProgramRulesDate: e.target.value,
                      LNEProgramRules: !clientData.LNEProgramRules,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEEmergencyContactConsent? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.LNEEmergencyContactConsent ?
                          setClientData(formState => ({
                            ...formState,
                            LNEEmergencyContactConsent: !formState.LNEEmergencyContactConsent,
                            LNEEmergencyContactConsentDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            LNEEmergencyContactConsent: !formState.LNEEmergencyContactConsent,
                            LNEEmergencyContactConsentDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEEmergencyContactConsent ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.LNEEmergencyContactConsent && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.LNEEmergencyContactConsentDate === "" || clientData.LNEEmergencyContactConsentDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEEmergencyContactConsent: !clientData.LNEEmergencyContactConsent,
                        LNEEmergencyContactConsentDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEEmergencyContactConsent: !clientData.LNEEmergencyContactConsent,
                        LNEEmergencyContactConsentDate: ""
                      })
                  }
                  }
                  checked={clientData.LNEEmergencyContactConsent ? 'checked' : false}
                  disabled={clientData.LNEEmergencyContactConsent ? true : false}
                />
                
              </div>
              <div>
                <p>LNE Emergency Contact Consent </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  value={
                    clientData.LNEEmergencyContactConsentDate &&
                    clientData.LNEEmergencyContactConsentDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEEmergencyContactConsentDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEEmergencyContactConsentDate: e.target.value,
                      LNEEmergencyContactConsent:
                        !clientData.LNEEmergencyContactConsent,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consents_folder_url ? data[0]?.consents_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEConsentForReleaseOfConfidentialInformation? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.LNEConsentForReleaseOfConfidentialInformation ?
                          setClientData(formState => ({
                            ...formState,
                            LNEConsentForReleaseOfConfidentialInformation: !formState.LNEConsentForReleaseOfConfidentialInformation,
                            LNEConsentForReleaseOfConfidentialInformationDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            LNEConsentForReleaseOfConfidentialInformation: !formState.LNEConsentForReleaseOfConfidentialInformation,
                            LNEConsentForReleaseOfConfidentialInformationDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEConsentForReleaseOfConfidentialInformation ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.LNEConsentForReleaseOfConfidentialInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate === "" || clientData.LNEConsentForReleaseOfConfidentialInformationDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformation: !clientData.LNEConsentForReleaseOfConfidentialInformation,
                        LNEConsentForReleaseOfConfidentialInformationDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformation: !clientData.LNEConsentForReleaseOfConfidentialInformation,
                        LNEConsentForReleaseOfConfidentialInformationDate: ""
                      })
                  }
                  }
                  checked={clientData.LNEConsentForReleaseOfConfidentialInformation ? 'checked' : false}
                  disabled={clientData.LNEConsentForReleaseOfConfidentialInformation ? true : false}
                />
                
              </div>
              <div>
                <p>LNE Consent for Release of Confidential Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEConsentForReleaseOfConfidentialInformation"
                  value={
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate &&
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEConsentForReleaseOfConfidentialInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEConsentForReleaseOfConfidentialInformationDate:
                        e.target.value,
                      LNEConsentForReleaseOfConfidentialInformation:
                      !clientData.LNEConsentForReleaseOfConfidentialInformation,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consents_folder_url ? data[0]?.consents_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.HIPPAConsentForm? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.HIPPAConsentForm ?
                          setClientData(formState => ({
                            ...formState,
                            HIPPAConsentForm: !formState.HIPPAConsentForm,
                            HIPPAConsentFormDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            HIPPAConsentForm: !formState.HIPPAConsentForm,
                            HIPPAConsentFormDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.HIPPAConsentForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.HIPPAConsentForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.HIPPAConsentFormDate === "" || clientData.HIPPAConsentFormDate === null ? (
                      setClientData({
                        ...clientData,
                        HIPPAConsentForm: !clientData.HIPPAConsentForm,
                        HIPPAConsentFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        HIPPAConsentForm: !clientData.HIPPAConsentForm,
                        HIPPAConsentFormDate: ""
                      })
                  }
                  }
                  checked={clientData.HIPPAConsentForm ? 'checked' : false}
                  disabled={clientData.HIPPAConsentForm ? true : false}
                />
                
              </div>
              <div>
                <p>HIPAA Consent Form (OCA Form 960)</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HIPPAConsentForm"
                  value={
                    clientData.HIPPAConsentFormDate &&
                    clientData.HIPPAConsentFormDate.split('T')[0]
                  }
                  /* disabled={clientData.HIPPAConsentFormDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      HIPPAConsentFormDate: e.target.value,
                      HIPPAConsentForm: !clientData.HIPPAConsentForm,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consents_folder_url ? data[0]?.consents_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid items-center gap-5 py-2 rounded-lg my-2`}
            >
               <div className={`ml-1 text-center flex justify-center items-center ${clientData.NYCDOHMHNoticeOfPrivacyPractices? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.NYCDOHMHNoticeOfPrivacyPractices ?
                          setClientData(formState => ({
                            ...formState,
                            NYCDOHMHNoticeOfPrivacyPractices: !formState.NYCDOHMHNoticeOfPrivacyPractices,
                            NYCDOHMHNoticeOfPrivacyPracticesDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            NYCDOHMHNoticeOfPrivacyPractices: !formState.NYCDOHMHNoticeOfPrivacyPractices,
                            NYCDOHMHNoticeOfPrivacyPracticesDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.NYCDOHMHNoticeOfPrivacyPractices ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.NYCDOHMHNoticeOfPrivacyPractices && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate === "" || clientData.NYCDOHMHNoticeOfPrivacyPracticesDate === null ? (
                      setClientData({
                        ...clientData,
                        NYCDOHMHNoticeOfPrivacyPractices: !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                        NYCDOHMHNoticeOfPrivacyPracticesDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        NYCDOHMHNoticeOfPrivacyPractices: !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                        NYCDOHMHNoticeOfPrivacyPracticesDate: ""
                      })
                  }
                  }
                  checked={clientData.NYCDOHMHNoticeOfPrivacyPractices ? 'checked' : false}
                  disabled={clientData.NYCDOHMHNoticeOfPrivacyPractices ? true : false}
                />
                
              </div>
              <div>
                <p>
                  NYC DOHMH Notice of Privacy Practices - Acknowledgement of
                  Receipt{" "}
                </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="NYCDOHMHNoticeOfPrivacyPractices"
                  value={
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate &&
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate.split('T')[0]
                  }
                  /* disabled={clientData.NYCDOHMHNoticeOfPrivacyPracticesDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      NYCDOHMHNoticeOfPrivacyPracticesDate: e.target.value,
                      NYCDOHMHNoticeOfPrivacyPractices:
                        !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consents_folder_url ? data[0]?.consents_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-pink grid gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEOutreachRetentionTrackingForm? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.LNEOutreachRetentionTrackingForm ?
                          setClientData(formState => ({
                            ...formState,
                            LNEOutreachRetentionTrackingForm: !formState.LNEOutreachRetentionTrackingForm,
                            LNEOutreachRetentionTrackingFormDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            LNEOutreachRetentionTrackingForm: !formState.LNEOutreachRetentionTrackingForm,
                            LNEOutreachRetentionTrackingFormDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEOutreachRetentionTrackingForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.LNEOutreachRetentionTrackingForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.LNEOutreachRetentionTrackingFormDate === "" || clientData.LNEOutreachRetentionTrackingFormDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEOutreachRetentionTrackingForm: !clientData.LNEOutreachRetentionTrackingForm,
                        LNEOutreachRetentionTrackingFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEOutreachRetentionTrackingForm: !clientData.LNEOutreachRetentionTrackingForm,
                        LNEOutreachRetentionTrackingFormDate: ""
                      })
                  }
                  }
                  checked={clientData.LNEOutreachRetentionTrackingForm ? 'checked' : false}
                  disabled={clientData.LNEOutreachRetentionTrackingForm ? true : false}
                />
                
              </div>
              <div>
                <p>LNE Outreach Retention/Tracking Form </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEOutreachRetentionTrackingForm"
                  value={
                    clientData.LNEOutreachRetentionTrackingFormDate &&
                    clientData.LNEOutreachRetentionTrackingFormDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEOutreachRetentionTrackingFormDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEOutreachRetentionTrackingFormDate: e.target.value,
                      LNEOutreachRetentionTrackingForm:
                        !clientData.LNEOutreachRetentionTrackingForm,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.linkage_navigation_folder_url ? data[0]?.linkage_navigation_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-pink grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEReferralInformation? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.LNEReferralInformation ?
                          setClientData(formState => ({
                            ...formState,
                            LNEReferralInformation: !formState.LNEReferralInformation,
                            LNEReferralInformationDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            LNEReferralInformation: !formState.LNEReferralInformation,
                            LNEReferralInformationDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEReferralInformation ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.LNEReferralInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.LNEReferralInformationDate === "" || clientData.LNEReferralInformationDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEReferralInformation: !clientData.LNEReferralInformation,
                        LNEReferralInformationDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEReferralInformation: !clientData.LNEReferralInformation,
                        LNEReferralInformationDate: ""
                      })
                  }
                  }
                  checked={clientData.LNEReferralInformation ? 'checked' : false}
                  disabled={clientData.LNEReferralInformation ? true : false}
                />
                
              </div>
              <div>
                <p>LNE Referral Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEOutreachRetentionTrackingForm"
                  value={
                    clientData.LNEReferralInformationDate &&
                    clientData.LNEReferralInformationDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEReferralInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEReferralInformationDate: e.target.value,
                      LNEReferralInformation:
                        !clientData.LNEReferralInformation,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.linkage_navigation_folder_url ? data[0]?.linkage_navigation_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-pink grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEClientReferralForm? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.LNEClientReferralForm ?
                          setClientData(formState => ({
                            ...formState,
                            LNEClientReferralForm: !formState.LNEClientReferralForm,
                            LNEClientReferralFormDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            LNEClientReferralForm: !formState.LNEClientReferralForm,
                            LNEClientReferralFormDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEClientReferralForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.LNEClientReferralForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.LNEClientReferralFormDate === "" || clientData.LNEClientReferralFormDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEClientReferralForm: !clientData.LNEClientReferralForm,
                        LNEClientReferralFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEClientReferralForm: !clientData.LNEClientReferralForm,
                        LNEClientReferralFormDate: ""
                      })
                  }
                  }
                  checked={clientData.LNEClientReferralForm ? 'checked' : false}
                  disabled={clientData.LNEClientReferralForm ? true : false}
                />
                
              </div>
              <div>
                <p>LNE Client Referral Form </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientReferralForm"
                  value={
                    clientData.LNEClientReferralFormDate &&
                    clientData.LNEClientReferralFormDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEClientReferralFormDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientReferralFormDate: e.target.value,
                      LNEClientReferralForm: !clientData.LNEClientReferralForm,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.linkage_navigation_folder_url ? data[0]?.linkage_navigation_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-purple grid items-center gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEHNSEligibilityForm? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.LNEHNSEligibilityForm ?
                          setClientData(formState => ({
                            ...formState,
                            LNEHNSEligibilityForm: !formState.LNEHNSEligibilityForm,
                            LNEHNSEligibilityFormDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            LNEHNSEligibilityForm: !formState.LNEHNSEligibilityForm,
                            LNEHNSEligibilityFormDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEHNSEligibilityForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.LNEHNSEligibilityForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.LNEHNSEligibilityFormDate === "" || clientData.LNEHNSEligibilityFormDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEHNSEligibilityForm: !clientData.LNEHNSEligibilityForm,
                        LNEHNSEligibilityFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEHNSEligibilityForm: !clientData.LNEHNSEligibilityForm,
                        LNEHNSEligibilityFormDate: ""
                      })
                  }
                  }
                  checked={clientData.LNEHNSEligibilityForm ? 'checked' : false}
                  disabled={clientData.LNEHNSEligibilityForm ? true : false}
                />
                
              </div>
              <div>
                <p>LNE HNS Eligibility Form </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEHNSEligibilityForm"
                  value={
                    clientData.LNEHNSEligibilityFormDate &&
                    clientData.LNEHNSEligibilityFormDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEHNSEligibilityFormDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
            
                    setClientData({
                      ...clientData,
                      LNEHNSEligibilityFormDate: e.target.value,
                      LNEHNSEligibilityForm: !clientData.LNEHNSEligibilityForm,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <svg id="Dropbox_folder" dataName="Dropbox folder" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="56.734" height="43.529" viewBox="0 0 56.734 43.529">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_923" dataName="Rectangle 923" width="23.256" height="31.068" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_918" dataName="Rectangle 918" width="51.23" height="37.972" fill="#fff"/>
    </clipPath>
    <filter id="Path_1139" x="-0.148" y="3.322" width="53.16" height="43.994" filterUnits="userSpaceOnUse">
      <feOffset dy="2" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feFlood floodColor="#007ee5" floodOpacity="0.153"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_1259" dataName="Group 1259" transform="matrix(0.899, 0.438, -0.438, 0.899, 35.832, 0)">
    <g id="Group_1165" dataName="Group 1165" clipPath="url(#clip-path)">
      <path id="Path_1162" dataName="Path 1162" d="M.017,15.524H0q0,.457,0,.915.005,4.626.013,9.252c0,.693,0,1.389.055,2.079a3.261,3.261,0,0,0,.826,1.873,3.937,3.937,0,0,0,3.134,1.423c1.6,0,3.2,0,4.8,0l10.535,0a3.825,3.825,0,0,0,2.107-.612,3.9,3.9,0,0,0,1.413-1.64,4.2,4.2,0,0,0,.372-1.858q-.006-6,0-12,0-3.826,0-7.652a.627.627,0,0,0-.189-.478q-.671-.66-1.337-1.325Q19.058,2.834,16.388.166a.527.527,0,0,0-.4-.166c-.322.006-.644,0-.966,0Q9.57,0,4.119,0A4.471,4.471,0,0,0,2.366.317,3.7,3.7,0,0,0,.6,1.822,4.142,4.142,0,0,0,.013,4.091q.013,5.717,0,11.433" transform="translate(0 0)" fill="#fff"/>
      <path id="Path_1163" dataName="Path 1163" d="M.017,15.524q0-5.717,0-11.434A4.142,4.142,0,0,1,.6,1.822,3.7,3.7,0,0,1,2.366.317,4.471,4.471,0,0,1,4.119,0q5.451.005,10.9,0c.322,0,.644,0,.966,0a.526.526,0,0,1,.4.166q2.669,2.668,5.34,5.335.666.665,1.337,1.325a.627.627,0,0,1,.189.478q0,3.826,0,7.652,0,6,0,12a4.2,4.2,0,0,1-.372,1.858,3.9,3.9,0,0,1-1.413,1.64,3.826,3.826,0,0,1-2.107.612l-10.535,0c-1.6,0-3.2-.006-4.8,0A3.937,3.937,0,0,1,.894,29.642,3.26,3.26,0,0,1,.068,27.77C.013,27.08.015,26.384.013,25.69Q0,21.065,0,16.439q0-.457,0-.915H.017M15.546.97c-.054,0-.092-.007-.13-.007H13.135Q11.068.96,9,.957c-1.673,0-3.345,0-5.018,0a3.262,3.262,0,0,0-1.156.2A2.864,2.864,0,0,0,.982,3.727c-.011.455-.007.91-.008,1.365Q.964,11.268.957,17.444c0,3.206.012,6.411.02,9.617A3.676,3.676,0,0,0,1,27.593a2.963,2.963,0,0,0,2.932,2.514c1.878-.012,3.756.006,5.634.006,3.234,0,6.468-.009,9.7-.008a2.987,2.987,0,0,0,1.971-.68,2.674,2.674,0,0,0,1.024-1.912c.036-.475.024-.954.025-1.431Q22.3,21.69,22.3,17.3c0-1.132-.009-2.265-.01-3.4q0-2.976,0-5.951V7.692H19.483a3.877,3.877,0,0,1-2.7-1.044,3.531,3.531,0,0,1-1.219-2.542c-.035-.943-.015-1.889-.02-2.833,0-.1,0-.2,0-.3M21.583,6.7,16.511,1.643c-.005.108-.01.163-.01.217,0,.611,0,1.222,0,1.833a2.968,2.968,0,0,0,.278,1.34A2.716,2.716,0,0,0,19.093,6.7c.8.06,1.609.024,2.414.03a.361.361,0,0,0,.076-.028" transform="translate(0 0)" fill="#007ee5"/>
      <path id="Path_1164" dataName="Path 1164" d="M14.589.012c0,.105,0,.2,0,.3,0,.945-.015,1.89.02,2.833a3.531,3.531,0,0,0,1.219,2.542,3.877,3.877,0,0,0,2.7,1.044h2.809c0,.1,0,.177,0,.258q0,2.976,0,5.951c0,1.132.011,2.265.01,3.4q0,4.392-.012,8.785c0,.477.011.956-.025,1.431a2.674,2.674,0,0,1-1.024,1.912,2.987,2.987,0,0,1-1.971.68c-3.234,0-6.468.007-9.7.008-1.878,0-3.756-.018-5.634-.006A2.963,2.963,0,0,1,.045,26.636,3.675,3.675,0,0,1,.02,26.1C.012,22.9,0,19.693,0,16.487Q0,10.311.018,4.135c0-.455,0-.91.008-1.365A2.864,2.864,0,0,1,1.87.207,3.261,3.261,0,0,1,3.027,0C4.7,0,6.372,0,8.044,0Q10.111,0,12.178,0h2.281c.038,0,.076,0,.13.007M3.4,11.525H17.929v-.934H3.4Zm0,4.533H17.945c0-.249,0-.487,0-.725s0-.226-.225-.226q-3.782,0-7.564.005-3.266,0-6.532-.006H3.4Zm14.538,8.119c-.086,0-.156-.012-.226-.013H11.083l-3.249,0q-2.15,0-4.3,0c-.111,0-.144.042-.141.148.006.2,0,.4,0,.6,0,.215,0,.215.219.216q2.749,0,5.5,0c1.177,0,2.355-.006,3.532-.006q2.558,0,5.117,0a.227.227,0,0,0,.1-.006c.032-.017.077-.053.078-.082.006-.282,0-.565,0-.861m-.011-3.588c0-.283,0-.549,0-.814,0-.083-.026-.122-.114-.122-.222,0-.443-.014-.665-.014H5.187c-.544,0-1.088,0-1.632,0-.053,0-.15.045-.151.071-.011.291-.007.582-.007.878Z" transform="translate(0.957 0.957)" fill="#fff"/>
      <path id="Path_1165" dataName="Path 1165" d="M5.083,5.058a.361.361,0,0,1-.076.028c-.8-.006-1.613.03-2.414-.03A2.716,2.716,0,0,1,.279,3.39,2.967,2.967,0,0,1,0,2.05C0,1.439,0,.828,0,.217,0,.163,0,.108.01,0L5.083,5.058" transform="translate(16.501 1.643)" fill="#fff"/>
      <path id="Path_1168" dataName="Path 1168" d="M0,.952V0H.22Q3.486,0,6.752.006q3.782,0,7.564-.005c.223,0,.224,0,.225.226s0,.475,0,.725Z" transform="translate(3.767 19.368)" fill="#007ee5"/>
    </g>
  </g>
  <g id="dropbox_folder_icon" dataName="dropbox folder icon" transform="translate(0 5.557)">
    <g id="Group_1159" dataName="Group 1159">
      <g id="Group_1158" dataName="Group 1158" clipPath="url(#clip-path-2)">
        <g transform="matrix(1, 0, 0, 1, 0, -5.56)" filter="url(#Path_1139)">
          <path id="Path_1139-2" dataName="Path 1139" d="M19.049,28.969q-8.058,0-16.116,0A2.729,2.729,0,0,1,.082,26.914,4,4,0,0,1,0,25.992Q0,14.5,0,3A2.72,2.72,0,0,1,3.018.018C7.4.012,11.775.032,16.153,0a1.313,1.313,0,0,1,1.435.862c.523,1.191,1.183,2.322,1.716,3.51a1.31,1.31,0,0,0,1.408.892c4.782-.039,9.564-.025,14.346-.011a4.141,4.141,0,0,1,1.366.2,2.6,2.6,0,0,1,1.712,2.618c.009,3.537,0,7.074,0,10.611,0,2.42-.061,4.842.019,7.259a2.919,2.919,0,0,1-3.086,3.051c-5.34-.065-10.682-.025-16.023-.025" transform="translate(7.35 8.82)" fill="#91cefe"/>
        </g>
      </g>
    </g>
  </g>
  <g id="Group_1260" dataName="Group 1260" transform="translate(-722 -504.471)">
    <path id="Polygon_12" dataName="Polygon 12" d="M5.724.955a1,1,0,0,1,1.552,0l4.4,5.414A1,1,0,0,1,10.9,8H2.1a1,1,0,0,1-.776-1.631Z" transform="translate(742 524)" fill="#007ee5"/>
    <rect id="Rectangle_924" dataName="Rectangle 924" width="5" height="10" rx="1" transform="translate(746 529)" fill="#007ee5"/>
  </g>
</svg>
                </a>
              </div>
            </div>
          </section>

          <section id="save" className="my-5">
            <div className="container mx-auto flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5"
                onClick={()=>handleMsaform()}
              >
                Save and Update
              </button>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default EditMsaFormPage;

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
      let { clientid } = ctx.params;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientid}`
      );
  
      const data = await res.json();
      return { props: { data } };
    },
  });
