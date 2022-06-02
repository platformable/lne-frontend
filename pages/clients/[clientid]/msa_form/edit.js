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
    clientId: data[0]?.clientid,
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

    ProgressNote: data[0].progressnote ==="0" || data[0].progressnote ===null? false:true, 
    ProgressNoteDate: data[0].progressnotedate,
    StatusChangesForm:data[0].statuschangesform ==="0" || data[0].statuschangesform ===null? false : true, 
    StatusChangesFormDate: data[0].statuschangesformdate, 
    ComprehensiveRiskBehaviorAssessmentUpdates: data[0].comprehensiveriskbehaviorassessment ==="0"|| data[0].comprehensiveriskbehaviorassessmentscan===null? false:true,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate: data[0].comprehensiveriskbehaviorassessmentdate, 
    M11QForm:data[0].m11qform ==="0" || data[0].m11qform ===null? false : true, 
    M11QFormDate: data[0].m11qformdate, 
    CD4VLReports:data[0].cd4vlreports ==="0" || data[0].cd4vlreports ===null? false : true,
    CD4VLReportsDate: data[0].cd4vlreportsdate, 
    InitialTreatmentAdherenceIntake:data[0].initialtreatmentadherenceintake ==="0" || data[0].initialtreatmentadherenceintake ===null? false : true,
    InitialTreatmentAdherenceIntakeDate: data[0].initialtreatmentadherenceintakedate,  
    TreatmentAdherenceUpdates:data[0].treatmentadherenceupdates ==="0" || data[0].treatmentadherenceupdates ===null? false : true,
    TreatmentAdherenceUpdatesDate: data[0].treatmentadherenceupdatesdate,
    AirsDrugRegimen: data[0].airsdrugregimen ==="0" || data[0].airsdrugregimen ===null  ? false: true, 
    AirsDrugRegimenDate: data[0].airsdrugregimendate,
    AirsHIVMedicalProvider: data[0].airshivmedicalprovider ==="0" ||data[0].airshivmedicalprovider ===null? false: true,
    AirsHIVMedicalProviderDate: data[0].airshivmedicalproviderdate,
    AIRSHIVStatusHistory: data[0].airshivstatushistory ==="0" || data[0].airshivstatushistory ===null? false: true, 
    AIRSHIVStatusHistoryDate: data[0].airshivstatushistorydate,  
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
    LinkageRetentionAdherenceForms: data[0].lneoutreachretentiontrackingform ==="0" || data[0].lneoutreachretentiontrackingform ===null ? false: true,
    LinkageRetentionAdherenceFormsDate: data[0].lneoutreachretentiontrackingformdate,
    InternalReferralInformation: data[0].lnereferralinformation ==="0" || data[0].lnereferralinformation ===null ? false: true,
    InternalReferralInformationDate: data[0].lnereferralinformationdate,
    LNEClientReferralForm: data[0].lneclientreferralform ==="0" || data[0].lneclientreferralform ===null ? false: true,
    LNEClientReferralFormDate: data[0].lneclientreferralformdate,
    HNSEligibilityForm: data[0].hnseligibilityform ==="0" || data[0].hnseligibilityform ===null? false : true,
    HNSEligibilityFormDate: data[0].hnseligibilityformdate,
    HNSReadinessForm: data[0].hnsreadinessform ==="0" || data[0].hnsreadinessform ===null? false : true,
    HNSReadinessFormDate: data[0].hnsreadinessformdate,
    SupportGroups: data[0].supportgroups ==="0" || data[0].supportgroups ===null ? false : true,
    SupportGroupsDate: data[0].supportgroupsdate,
    IDGForm: data[0].idgform ==="0"|| data[0].idgform ===null? false : true,
    IDGFormDate: data[0].idgformdate,
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


/* if(typeof window !== 'undefined'){
  const userLocale=window.navigator.language
  userLocale='en-US' ? console.log("es gringo")
  :console.log("no es gringo")
} */

const crearFecha=()=>{

  const initialDate= new Date().toLocaleDateString()
  const newDate=initialDate.split('/')
  let fixedDate;
  if(typeof window !== 'undefined'){
    const userLocale=window.navigator.language
    userLocale==='en-US' ? fixedDate=`${newDate[2]}-${newDate[0].length===1? `0${newDate[0]}`:`${newDate[0]}`}-${newDate[1].length===1 ? `0${newDate[1]}`: `${newDate[1]}`}`
    :fixedDate=`${newDate[2]}-${newDate[1].length===1? `0${newDate[1]}`:`${newDate[1]}`}-${newDate[0].length===1 ? `0${newDate[0]}`: `${newDate[0]}`}`
  }
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
                <div className="flex gap-x-2 mb-5 items-center">
                    <img src="/calendar-icon.svg" width="24"/>
                    <h3 className="font-black ">Date</h3>
                  </div>
                  <label className="block">
                    <span className="text-xs">Todays date</span>
                    <p>{new Date().toLocaleDateString('en',{year:'numeric',month:'numeric',day:'numeric'})}</p>
                  </label>
                </div>

                <div className="service-action-plan-page-info-box md:my-0 my-5">
                <div className="flex gap-x-2 mb-5 items-center">
                  <img src="/client-icon.svg" width="24"/>
                  <h3 className="font-black ">Client</h3>
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
                <div className="flex gap-x-2 mb-5 items-center">
                  <img src="/client-icon.svg" width="24"/>
                  <h3 className="font-black ">Health Care Worker</h3>
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
          Forms - Please indicate which forms have been completed with the client
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
                            AIRSIntakeFormDate: "",
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            AIRSIntakeForm: !formState.AIRSIntakeForm,
                            AIRSIntakeFormDate: crearFecha(),
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
                    if(clientData.AIRSIntakeForm){
                      setClientData({
                        ...clientData,
               
                        AIRSIntakeFormDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSIntakeForm: !clientData.AIRSIntakeForm,
                        AIRSIntakeFormDate: e.target.value,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                    if(clientData){
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessment:
                          !clientData.ComprehensiveRiskBehaviorAssessment,
                        ComprehensiveRiskBehaviorAssessmentDate: e.target.value,
                      });
                    }
                  }}
                />
              </div>
              <div className="flex justify-center">
              <a href={data[0]?.cbra_folder_url ? data[0]?.cbra_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
              
                {/* <input
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
                /> */}
                
              </div>
              <div>
                <p>Service Action Plan</p>
              </div>
              <div className="text-center">
              {clientData.ServiceActionPlanDate ? <p className="bg-white inline-block px-8 py-1 rounded-md"> 
                    {new Date(clientData.ServiceActionPlanDate).toLocaleDateString('en-US',{year:"numeric", month:'numeric', day:'numeric'})}</p>: <p className="bg-white inline-block px-5 py-1 rounded-lg">MM/DD/YYYY</p>}
                {/* <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.ServiceActionPlanDate &&
                    clientData.ServiceActionPlanDate.split('T')[0]
                  }
                  disabled={clientData.ServiceActionPlanDate ? true: false}
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData){
                      setClientData({
                        ...clientData,
                        ServiceActionPlanDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        ServiceActionPlanDate: e.target.value,
                        ServiceActionPlan: !clientData.ServiceActionPlan,
                      });
                    }
                   
                  }}
                /> */}
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.action_plans_folder_url ? data[0]?.action_plans_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.ProgressNote? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.ProgressNote ?
                          setClientData(formState => ({
                            ...formState,
                            ProgressNote: !formState.ProgressNote,
                            ProgressNoteDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            ProgressNote: !formState.ProgressNote,
                            ProgressNoteDate: crearFecha()
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
                    if(clientData.AIRSHousingInformation){
                      setClientData({
                        ...clientData,
                        AIRSHousingInformationDate: e.target.value,

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSHousingInformationDate: e.target.value,
                        AIRSHousingInformation:
                          !clientData.AIRSHousingInformation,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.StatusChangesForm? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.StatusChangesForm ?
                          setClientData(formState => ({
                            ...formState,
                            StatusChangesForm: !formState.StatusChangesForm,
                            StatusChangesFormDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            StatusChangesForm: !formState.StatusChangesForm,
                            StatusChangesFormDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.StatusChangesForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.StatusChangesForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.StatusChangesFormDate === "" || clientData.StatusChangesFormDate === null ? (
                      setClientData({
                        ...clientData,
                        StatusChangesForm: !clientData.StatusChangesForm,
                        StatusChangesFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        StatusChangesForm: !clientData.StatusChangesForm,
                        StatusChangesFormDate: ""
                      })
                  }
                  }
                  checked={clientData.StatusChangesForm ? 'checked' : false}
                  disabled={clientData.StatusChangesForm ? true : false}
                />
                
              </div>
              <div>
                <p>StatusChanges/Closure Forms</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="StatusChangesForm"
                  value={
                    clientData.StatusChangesFormDate &&
                    clientData.StatusChangesFormDate.split('T')[0]
                  }
                  /* disabled={clientData.StatusChangesFormDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.StatusChangesForm){
                      setClientData({
                        ...clientData,
                        StatusChangesFormDate: e.target.value,

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        StatusChangesFormDate: e.target.value,
                        StatusChangesForm:
                          !clientData.StatusChangesForm,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.ComprehensiveRiskBehaviorAssessmentUpdates? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.ComprehensiveRiskBehaviorAssessmentUpdates ?
                          setClientData(formState => ({
                            ...formState,
                            ComprehensiveRiskBehaviorAssessmentUpdates: !formState.ComprehensiveRiskBehaviorAssessmentUpdates,
                            ComprehensiveRiskBehaviorAssessmentUpdatesDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            ComprehensiveRiskBehaviorAssessmentUpdates: !formState.ComprehensiveRiskBehaviorAssessmentUpdates,
                            ComprehensiveRiskBehaviorAssessmentUpdatesDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.ComprehensiveRiskBehaviorAssessmentUpdates ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.ComprehensiveRiskBehaviorAssessmentUpdates && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate === "" || clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate === null ? (
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentUpdates: !clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentUpdates: !clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate: ""
                      })
                  }
                  }
                  checked={clientData.ComprehensiveRiskBehaviorAssessmentUpdates ? 'checked' : false}
                  disabled={clientData.ComprehensiveRiskBehaviorAssessmentUpdates ? true : false}
                />
                
              </div>
              <div>
                <p>Comprehensive Behavioral Risk Assessment Updates </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate &&
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate.split('T')[0]
                  }
                  /* disabled={clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.ComprehensiveRiskBehaviorAssessmentUpdates){
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate: e.target.value,

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate: e.target.value,
                        ComprehensiveRiskBehaviorAssessmentUpdates:
                          !clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.cbra_folder_url ? data[0]?.cbra_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.M11QForm? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.M11QForm ?
                          setClientData(formState => ({
                            ...formState,
                            M11QForm: !formState.M11QForm,
                            M11QFormDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            M11QForm: !formState.M11QForm,
                            M11QFormDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.M11QForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.M11QForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.M11QFormDate === "" || clientData.M11QFormDate === null ? (
                      setClientData({
                        ...clientData,
                        M11QForm: !clientData.M11QForm,
                        M11QFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        M11QForm: !clientData.M11QForm,
                        M11QFormDate: ""
                      })
                  }
                  }
                  checked={clientData.M11QForm ? 'checked' : false}
                  disabled={clientData.M11QForm ? true : false}
                />
                
              </div>
              <div>
                <p>M11Q</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="M11QForm"
                  value={
                    clientData.M11QFormDate &&
                    clientData.M11QFormDate.split('T')[0]
                  }
                  /* disabled={clientData.M11QFormDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.M11QForm){
                      setClientData({
                        ...clientData,
                        M11QFormDate: e.target.value,

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        M11QFormDate: e.target.value,
                        M11QForm:
                          !clientData.M11QForm,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.CD4VLReports? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.CD4VLReports ?
                          setClientData(formState => ({
                            ...formState,
                            CD4VLReports: !formState.CD4VLReports,
                            CD4VLReportsDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            CD4VLReports: !formState.CD4VLReports,
                            CD4VLReportsDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.CD4VLReports ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.CD4VLReports && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.CD4VLReportsDate === "" || clientData.CD4VLReportsDate === null ? (
                      setClientData({
                        ...clientData,
                        CD4VLReports: !clientData.CD4VLReports,
                        CD4VLReportsDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        CD4VLReports: !clientData.CD4VLReports,
                        CD4VLReportsDate: ""
                      })
                  }
                  }
                  checked={clientData.CD4VLReports ? 'checked' : false}
                  disabled={clientData.CD4VLReports ? true : false}
                />
                
              </div>
              <div>
                <p>CD4/VL Check Reports</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="CD4VLReports"
                  value={
                    clientData.CD4VLReportsDate &&
                    clientData.CD4VLReportsDate.split('T')[0]
                  }
                  /* disabled={clientData.CD4VLReportsDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.CD4VLReports){
                      setClientData({
                        ...clientData,
                        CD4VLReportsDate: e.target.value,

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        CD4VLReportsDate: e.target.value,
                        CD4VLReports:
                          !clientData.CD4VLReports,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.medical_folder_url ? data[0]?.medical_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.InitialTreatmentAdherenceIntake? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.InitialTreatmentAdherenceIntake ?
                          setClientData(formState => ({
                            ...formState,
                            InitialTreatmentAdherenceIntake: !formState.InitialTreatmentAdherenceIntake,
                            InitialTreatmentAdherenceIntakeDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            InitialTreatmentAdherenceIntake: !formState.InitialTreatmentAdherenceIntake,
                            InitialTreatmentAdherenceIntakeDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.InitialTreatmentAdherenceIntake ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.InitialTreatmentAdherenceIntake && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.InitialTreatmentAdherenceIntakeDate === "" || clientData.InitialTreatmentAdherenceIntakeDate === null ? (
                      setClientData({
                        ...clientData,
                        InitialTreatmentAdherenceIntake: !clientData.InitialTreatmentAdherenceIntake,
                        InitialTreatmentAdherenceIntakeDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        InitialTreatmentAdherenceIntake: !clientData.InitialTreatmentAdherenceIntake,
                        InitialTreatmentAdherenceIntakeDate: ""
                      })
                  }
                  }
                  checked={clientData.InitialTreatmentAdherenceIntake ? 'checked' : false}
                  disabled={clientData.InitialTreatmentAdherenceIntake ? true : false}
                />
                
              </div>
              <div>
                <p>Initial Treatment Adherence Intake</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="InitialTreatmentAdherenceIntake"
                  value={
                    clientData.InitialTreatmentAdherenceIntakeDate &&
                    clientData.InitialTreatmentAdherenceIntakeDate.split('T')[0]
                  }
                  /* disabled={clientData.InitialTreatmentAdherenceIntakeDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.InitialTreatmentAdherenceIntake){
                      setClientData({
                        ...clientData,
                        InitialTreatmentAdherenceIntakeDate: e.target.value,

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        InitialTreatmentAdherenceIntakeDate: e.target.value,
                        InitialTreatmentAdherenceIntake:
                          !clientData.InitialTreatmentAdherenceIntake,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.medical_folder_url ? data[0]?.medical_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.TreatmentAdherenceUpdates? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.TreatmentAdherenceUpdates ?
                          setClientData(formState => ({
                            ...formState,
                            TreatmentAdherenceUpdates: !formState.TreatmentAdherenceUpdates,
                            TreatmentAdherenceUpdatesDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            TreatmentAdherenceUpdates: !formState.TreatmentAdherenceUpdates,
                            TreatmentAdherenceUpdatesDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.TreatmentAdherenceUpdates ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.TreatmentAdherenceUpdates && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.TreatmentAdherenceUpdatesDate === "" || clientData.TreatmentAdherenceUpdatesDate === null ? (
                      setClientData({
                        ...clientData,
                        TreatmentAdherenceUpdates: !clientData.TreatmentAdherenceUpdates,
                        TreatmentAdherenceUpdatesDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        TreatmentAdherenceUpdates: !clientData.TreatmentAdherenceUpdates,
                        TreatmentAdherenceUpdatesDate: ""
                      })
                  }
                  }
                  checked={clientData.TreatmentAdherenceUpdates ? 'checked' : false}
                  disabled={clientData.TreatmentAdherenceUpdates ? true : false}
                />
                
              </div>
              <div>
                <p>Treatment Adherence Updates</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="TreatmentAdherenceUpdates"
                  value={
                    clientData.TreatmentAdherenceUpdatesDate &&
                    clientData.TreatmentAdherenceUpdatesDate.split('T')[0]
                  }
                  /* disabled={clientData.TreatmentAdherenceUpdatesDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.TreatmentAdherenceUpdates){
                      setClientData({
                        ...clientData,
                        TreatmentAdherenceUpdatesDate: e.target.value,

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        TreatmentAdherenceUpdatesDate: e.target.value,
                        TreatmentAdherenceUpdates:
                          !clientData.TreatmentAdherenceUpdates,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.medical_folder_url ? data[0]?.medical_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                    if(clientData.AIRSCollateralInformation){
                      setClientData({
                        ...clientData,
                        AIRSCollateralInformationDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSCollateralInformationDate: e.target.value,
                        AIRSCollateralInformation:
                          !clientData.AIRSCollateralInformation,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.AirsDrugRegimen? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.AirsDrugRegimen ?
                          setClientData(formState => ({
                            ...formState,
                            AirsDrugRegimen: !formState.AirsDrugRegimen,
                            AirsDrugRegimenDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            AirsDrugRegimen: !formState.AirsDrugRegimen,
                            AirsDrugRegimenDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AirsDrugRegimen ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.AirsDrugRegimen && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.AirsDrugRegimenDate === "" || clientData.AirsDrugRegimenDate === null ? (
                      setClientData({
                        ...clientData,
                        AirsDrugRegimen: !clientData.AirsDrugRegimen,
                        AirsDrugRegimenDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AirsDrugRegimen: !clientData.AirsDrugRegimen,
                        AirsDrugRegimenDate: ""
                      })
                  }
                  }
                  checked={clientData.AirsDrugRegimen ? 'checked' : false}
                  disabled={clientData.AirsDrugRegimen ? true : false}
                />
                
              </div>
              <div>
                <p>AIRS Drug Regimen History</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AirsDrugRegimen"
                  value={
                    clientData.AirsDrugRegimenDate &&
                    clientData.AirsDrugRegimenDate.split('T')[0]
                  }
                  /* disabled={clientData.AirsDrugRegimenDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.AirsDrugRegimen){
                      setClientData({
                        ...clientData,
                        AirsDrugRegimenDate: e.target.value,

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AirsDrugRegimenDate: e.target.value,
                        AirsDrugRegimen:
                          !clientData.AirsDrugRegimen,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                  /* disabled={clientData.AIRSFinancialInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if (clientData.AIRSFinancialInformation){
                      setClientData({
                        ...clientData,
                        AIRSFinancialInformationDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSFinancialInformationDate: e.target.value,
                        AIRSFinancialInformation:
                          !clientData.AIRSFinancialInformation,
                      });
                    }
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                    if(clientData.AIRSHIVAIDSRiskHistory){
                      setClientData({
                        ...clientData,
                        AIRSHIVAIDSRiskHistoryDate: e.target.value,

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSHIVAIDSRiskHistoryDate: e.target.value,
                        AIRSHIVAIDSRiskHistory:
                          !clientData.AIRSHIVAIDSRiskHistory,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.AirsHIVMedicalProvider? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.AirsHIVMedicalProvider ?
                          setClientData(formState => ({
                            ...formState,
                            AirsHIVMedicalProvider: !formState.AirsHIVMedicalProvider,
                            AirsHIVMedicalProviderDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            AirsHIVMedicalProvider: !formState.AirsHIVMedicalProvider,
                            AirsHIVMedicalProviderDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AirsHIVMedicalProvider ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.AirsHIVMedicalProvider && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.AirsHIVMedicalProviderDate === "" || clientData.AirsHIVMedicalProviderDate === null ? (
                      setClientData({
                        ...clientData,
                        AirsHIVMedicalProvider: !clientData.AirsHIVMedicalProvider,
                        AirsHIVMedicalProviderDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AirsHIVMedicalProvider: !clientData.AirsHIVMedicalProvider,
                        AirsHIVMedicalProviderDate: ""
                      })
                  }
                  }
                  checked={clientData.AirsHIVMedicalProvider ? 'checked' : false}
                  disabled={clientData.AirsHIVMedicalProvider ? true : false}
                />
                
              </div>
              <div>
                <p>AIRS HIV Medical Provider History</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AirsHIVMedicalProvider"
                  value={
                    clientData.AirsHIVMedicalProviderDate &&
                    clientData.AirsHIVMedicalProviderDate.split('T')[0]
                  }
                  /* disabled={clientData.AirsHIVMedicalProviderDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.AirsHIVMedicalProvider){
                      setClientData({
                        ...clientData,
                        AirsHIVMedicalProviderDate: e.target.value,

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AirsHIVMedicalProviderDate: e.target.value,
                        AirsHIVMedicalProvider:
                          !clientData.AirsHIVMedicalProvider,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.AIRSHIVStatusHistory? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.AIRSHIVStatusHistory ?
                          setClientData(formState => ({
                            ...formState,
                            AIRSHIVStatusHistory: !formState.AIRSHIVStatusHistory,
                            AIRSHIVStatusHistoryDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            AIRSHIVStatusHistory: !formState.AIRSHIVStatusHistory,
                            AIRSHIVStatusHistoryDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.AIRSHIVStatusHistory ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.AIRSHIVStatusHistory && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.AIRSHIVStatusHistoryDate === "" || clientData.AIRSHIVStatusHistoryDate === null ? (
                      setClientData({
                        ...clientData,
                        AIRSHIVStatusHistory: !clientData.AIRSHIVStatusHistory,
                        AIRSHIVStatusHistoryDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        AIRSHIVStatusHistory: !clientData.AIRSHIVStatusHistory,
                        AIRSHIVStatusHistoryDate: ""
                      })
                  }
                  }
                  checked={clientData.AIRSHIVStatusHistory ? 'checked' : false}
                  disabled={clientData.AIRSHIVStatusHistory ? true : false}
                />
                
              </div>
              <div>
                <p>AIRS HIV Status History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHIVStatusHistory"
                  value={
                    clientData.AIRSHIVStatusHistoryDate &&
                    clientData.AIRSHIVStatusHistoryDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSHIVStatusHistoryDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.AIRSHIVStatusHistory){
                      setClientData({
                        ...clientData,
                        AIRSHIVStatusHistoryDate: e.target.value,

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSHIVStatusHistoryDate: e.target.value,
                        AIRSHIVStatusHistory:
                          !clientData.AIRSHIVStatusHistory,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                    if(clientData.AIRSHCVHistory){
                      setClientData({
                        ...clientData,
                        AIRSHCVHistoryDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSHCVHistoryDate: e.target.value,
                        AIRSHCVHistory: !clientData.AIRSHCVHistory,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                    if(clientData.AIRSHousingInformation){
                      setClientData({
                        ...clientData,
                        AIRSHousingInformationDate: e.target.value,

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSHousingInformationDate: e.target.value,
                        AIRSHousingInformation:
                          !clientData.AIRSHousingInformation,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                    if (clientData.AIRSInsuranceInformation){
                      setClientData({
                        ...clientData,
                        AIRSInsuranceInformationDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSInsuranceInformationDate: e.target.value,
                        AIRSInsuranceInformation:
                          !clientData.AIRSInsuranceInformation,
                      });
                    }
                   
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                    if(clientData.AIRSSubstanceUseHistory){
                      setClientData({
                        ...clientData,
                        AIRSSubstanceUseHistoryDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSSubstanceUseHistoryDate: e.target.value,
                        AIRSSubstanceUseHistory:
                          !clientData.AIRSSubstanceUseHistory,
                      });
                    }
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                    if(clientData.LNEClientRights){
                      setClientData({
                        ...clientData,
                        LNEClientRightsDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        LNEClientRightsDate: e.target.value,
                        LNEClientRights: !clientData.LNEClientRights,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                    if(clientData.LNEClientGrievancePolicyProcedure){
                      setClientData({
                        ...clientData,
                        LNEClientGrievancePolicyProcedureDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        LNEClientGrievancePolicyProcedureDate: e.target.value,
                        LNEClientGrievancePolicyProcedure:
                          !clientData.LNEClientGrievancePolicyProcedure,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.LNEProgramRules? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.LNEProgramRules ?
                          setClientData(formState => ({
                            ...formState,
                            LNEClientRights: !formState.LNEProgramRules,
                            LNEProgramRulesDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            LNEProgramRules: !formState.LNEProgramRules,
                            LNEProgramRulesDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LNEProgramRules ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.LNEProgramRules && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.LNEProgramRulesDate === "" || clientData.LNEProgramRulesDate === null ? (
                      setClientData({
                        ...clientData,
                        LNEProgramRules: !clientData.LNEProgramRules,
                        LNEProgramRulesDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LNEProgramRules: !clientData.LNEProgramRules,
                        LNEProgramRulesDate: ""
                      })
                  }
                  }
                  checked={clientData.LNEProgramRules ? 'checked' : false}
                  disabled={clientData.LNEProgramRules ? true : false}
                />
                
              </div>
              <div>
                <p>LNE Program Rules </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEProgramRules"
                  value={
                    clientData.LNEProgramRulesDate &&
                    clientData.LNEProgramRulesDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEProgramRulesDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.LNEProgramRules){
                      setClientData({
                        ...clientData,
                        LNEProgramRulesDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        LNEProgramRulesDate: e.target.value,
                        LNEProgramRules: !clientData.LNEProgramRules,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                    if(clientData.LNEEmergencyContactConsent){
                      setClientData({
                        ...clientData,
                        LNEEmergencyContactConsentDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        LNEEmergencyContactConsentDate: e.target.value,
                        LNEEmergencyContactConsent:
                          !clientData.LNEEmergencyContactConsent,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                    if(clientData.LNEConsentForReleaseOfConfidentialInformation){
                      setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformationDate:
                          e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformationDate:
                          e.target.value,
                        LNEConsentForReleaseOfConfidentialInformation:
                        !clientData.LNEConsentForReleaseOfConfidentialInformation,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                    if(clientData.HIPPAConsentForm){
                      setClientData({
                        ...clientData,
                        HIPPAConsentFormDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        HIPPAConsentFormDate: e.target.value,
                        HIPPAConsentForm: !clientData.HIPPAConsentForm,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                    if(clientData.NYCDOHMHNoticeOfPrivacyPractices){
                      setClientData({
                        ...clientData,
                        NYCDOHMHNoticeOfPrivacyPracticesDate: e.target.value

                      });
                    } else {
                      setClientData({
                        ...clientData,
                        NYCDOHMHNoticeOfPrivacyPracticesDate: e.target.value,
                        NYCDOHMHNoticeOfPrivacyPractices:
                          !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.consent_folder_url ? data[0]?.consent_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-pink grid gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.LinkageRetentionAdherenceForms? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.LinkageRetentionAdherenceForms ?
                          setClientData(formState => ({
                            ...formState,
                            LinkageRetentionAdherenceForms: !formState.LinkageRetentionAdherenceForms,
                            LinkageRetentionAdherenceFormsDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            LinkageRetentionAdherenceForms: !formState.LinkageRetentionAdherenceForms,
                            LinkageRetentionAdherenceFormsDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.LinkageRetentionAdherenceForms ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.LinkageRetentionAdherenceForms && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.LinkageRetentionAdherenceFormsDate === "" || clientData.LinkageRetentionAdherenceFormsDate === null ? (
                      setClientData({
                        ...clientData,
                        LinkageRetentionAdherenceForms: !clientData.LinkageRetentionAdherenceForms,
                        LinkageRetentionAdherenceFormsDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        LinkageRetentionAdherenceForms: !clientData.LinkageRetentionAdherenceForms,
                        LinkageRetentionAdherenceFormsDate: ""
                      })
                  }
                  }
                  checked={clientData.LinkageRetentionAdherenceForms ? 'checked' : false}
                  disabled={clientData.LinkageRetentionAdherenceForms ? true : false}
                />
                
              </div>
              <div>
                <p>Linkage, Retention, & Adherence Forms</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LinkageRetentionAdherenceForms"
                  value={
                    clientData.LinkageRetentionAdherenceFormsDate &&
                    clientData.LinkageRetentionAdherenceFormsDate.split('T')[0]
                  }
                  /* disabled={clientData.LinkageRetentionAdherenceFormsDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.LinkageRetentionAdherenceForms){
                      setClientData({
                        ...clientData,
                        LinkageRetentionAdherenceFormsDate: e.target.value
      
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        LinkageRetentionAdherenceFormsDate: e.target.value,
                        LinkageRetentionAdherenceForms:
                          !clientData.LinkageRetentionAdherenceForms,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.linkage_navigation_folder_url ? data[0]?.linkage_navigation_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-pink grid items-center gap-5 py-2 rounded-lg my-2`}
            >
              <div className={`ml-1 text-center flex justify-center items-center ${clientData.InternalReferralInformation? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.InternalReferralInformation ?
                          setClientData(formState => ({
                            ...formState,
                            InternalReferralInformation: !formState.InternalReferralInformation,
                            InternalReferralInformationDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            InternalReferralInformation: !formState.InternalReferralInformation,
                            InternalReferralInformationDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.InternalReferralInformation ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.InternalReferralInformation && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.InternalReferralInformationDate === "" || clientData.InternalReferralInformationDate === null ? (
                      setClientData({
                        ...clientData,
                        InternalReferralInformation: !clientData.InternalReferralInformation,
                        InternalReferralInformationDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        InternalReferralInformation: !clientData.InternalReferralInformation,
                        InternalReferralInformationDate: ""
                      })
                  }
                  }
                  checked={clientData.InternalReferralInformation ? 'checked' : false}
                  disabled={clientData.InternalReferralInformation ? true : false}
                />
                
              </div>
              <div>
                <p>LNE Referral Information</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEOutreachRetentionTrackingForm"
                  value={
                    clientData.InternalReferralInformationDate &&
                    clientData.InternalReferralInformationDate.split('T')[0]
                  }
                  /* disabled={clientData.InternalReferralInformationDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    if(clientData.InternalReferralInformation){
                      setClientData({
                        ...clientData,
                        InternalReferralInformationDate: e.target.value,
              
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        InternalReferralInformationDate: e.target.value,
                        InternalReferralInformation:
                          !clientData.InternalReferralInformation,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
                <p>Identification</p>
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
                    if(clientData.LNEClientReferralForm){
                      setClientData({
                        ...clientData,
                        LNEClientReferralFormDate: e.target.value,
                      });
                    } else {
                    setClientData({
                      ...clientData,
                      LNEClientReferralFormDate: e.target.value,
                      LNEClientReferralForm: !clientData.LNEClientReferralForm,
                    });
                  }
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.miscellaneous_folder_url ? data[0]?.miscellaneous_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-purple grid items-center gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.HNSEligibilityForm? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.HNSEligibilityForm ?
                          setClientData(formState => ({
                            ...formState,
                            HNSEligibilityForm: !formState.HNSEligibilityForm,
                            HNSEligibilityFormDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            HNSEligibilityForm: !formState.HNSEligibilityForm,
                            HNSEligibilityFormDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.HNSEligibilityForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.HNSEligibilityForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.HNSEligibilityFormDate === "" || clientData.HNSEligibilityFormDate === null ? (
                      setClientData({
                        ...clientData,
                        HNSEligibilityForm: !clientData.HNSEligibilityForm,
                        HNSEligibilityFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        HNSEligibilityForm: !clientData.HNSEligibilityForm,
                        HNSEligibilityFormDate: ""
                      })
                  }
                  }
                  checked={clientData.HNSEligibilityForm ? 'checked' : false}
                  disabled={clientData.HNSEligibilityForm ? true : false}
                />
                
              </div>
              <div>
                <p>HNS Eligibility Assessment</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HNSEligibilityForm"
                  value={
                    clientData.HNSEligibilityFormDate &&
                    clientData.HNSEligibilityFormDate.split('T')[0] 
                  }
                  /* disabled={clientData.HNSEligibilityFormDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {

                    if(clientData.HNSEligibilityForm){
                      setClientData({
                        ...clientData,
                        HNSEligibilityFormDate: e.target.value,
                    
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        HNSEligibilityFormDate: e.target.value,
                        HNSEligibilityForm: !clientData.HNSEligibilityForm,
                      });
                    }
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-purple grid items-center gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.HNSReadinessForm? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.HNSReadinessForm ?
                          setClientData(formState => ({
                            ...formState,
                            HNSReadinessForm: !formState.HNSReadinessForm,
                            HNSReadinessFormDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            HNSReadinessForm: !formState.HNSReadinessForm,
                            HNSReadinessFormDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.HNSReadinessForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.HNSReadinessForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.HNSReadinessFormDate === "" || clientData.HNSReadinessFormDate === null ? (
                      setClientData({
                        ...clientData,
                        HNSReadinessForm: !clientData.HNSReadinessForm,
                        HNSReadinessFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        HNSReadinessForm: !clientData.HNSReadinessForm,
                        HNSReadinessFormDate: ""
                      })
                  }
                  }
                  checked={clientData.HNSReadinessForm ? 'checked' : false}
                  disabled={clientData.HNSReadinessForm ? true : false}
                />
                
              </div>
              <div>
                <p>HNS Readiness Assessment</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HNSReadinessForm"
                  value={
                    clientData.HNSReadinessFormDate &&
                    clientData.HNSReadinessFormDate.split('T')[0] 
                  }
                  /* disabled={clientData.HNSReadinessFormDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {

                    if(clientData.HNSReadinessForm){
                      setClientData({
                        ...clientData,
                        HNSReadinessFormDate: e.target.value,
                    
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        HNSReadinessFormDate: e.target.value,
                        HNSReadinessForm: !clientData.HNSReadinessForm,
                      });
                    }
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-purple grid items-center gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.SupportGroups? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.SupportGroups ?
                          setClientData(formState => ({
                            ...formState,
                            SupportGroups: !formState.SupportGroups,
                            SupportGroupsDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            SupportGroups: !formState.SupportGroups,
                            SupportGroupsDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.SupportGroups ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.SupportGroups && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.SupportGroupsDate === "" || clientData.SupportGroupsDate === null ? (
                      setClientData({
                        ...clientData,
                        SupportGroups: !clientData.SupportGroups,
                        SupportGroupsDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        SupportGroups: !clientData.SupportGroups,
                        SupportGroupsDate: ""
                      })
                  }
                  }
                  checked={clientData.SupportGroups ? 'checked' : false}
                  disabled={clientData.SupportGroups ? true : false}
                />
                
              </div>
              <div>
                <p>Support Groups</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="SupportGroups"
                  value={
                    clientData.SupportGroupsDate &&
                    clientData.SupportGroupsDate.split('T')[0] 
                  }
                  /* disabled={clientData.SupportGroupsDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {

                    if(clientData.SupportGroups){
                      setClientData({
                        ...clientData,
                        SupportGroupsDate: e.target.value,
                    
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        SupportGroupsDate: e.target.value,
                        SupportGroups: !clientData.SupportGroups,
                      });
                    }
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} bg-light-purple grid items-center gap-5 py-2 rounded-lg my-2`}
            >
             <div className={`ml-1 text-center flex justify-center items-center ${clientData.IDGForm? 'pointer-events-none' :""}`}
                       onClick={() => {
                        clientData.IDGForm ?
                          setClientData(formState => ({
                            ...formState,
                            IDGForm: !formState.IDGForm,
                            IDGFormDate: ""
                          })) :
                          setClientData(formState => ({
                            ...formState,
                            IDGForm: !formState.IDGForm,
                            IDGFormDate: crearFecha()
                          }))
                        }
                      } >
               
                <svg xmlns="http://www.w3.org/2000/svg"
               
                  className="absolute z-10 text-dark-blue h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  strokeWidth={clientData.IDGForm ? "3" : "0"}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              
                <input
                  className={`${!clientData.IDGForm && "bg-slate-300"} appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  
                  onChange={() => {
                    clientData.IDGFormDate === "" || clientData.IDGFormDate === null ? (
                      setClientData({
                        ...clientData,
                        IDGForm: !clientData.IDGForm,
                        IDGFormDate: crearFecha()
                      })) : setClientData({
                        ...clientData,
                        IDGForm: !clientData.IDGForm,
                        IDGFormDate: ""
                      })
                  }
                  }
                  checked={clientData.IDGForm ? 'checked' : false}
                  disabled={clientData.IDGForm ? true : false}
                />
                
              </div>
              <div>
                <p>IDG</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="IDGForm"
                  value={
                    clientData.IDGFormDate &&
                    clientData.IDGFormDate.split('T')[0] 
                  }
                  /* disabled={clientData.IDGFormDate ? true: false} */
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {

                    if(clientData.IDGForm){
                      setClientData({
                        ...clientData,
                        IDGFormDate: e.target.value,
                    
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        IDGFormDate: e.target.value,
                        IDGForm: !clientData.IDGForm,
                      });
                    }
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox-folder.png'} alt="" width="34"/>
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientid}`
      );
  
      const data = await response.json();
      return { props: { data } };
    },
  });
