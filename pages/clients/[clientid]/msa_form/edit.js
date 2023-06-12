import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Styles from "../../../../styles/ServiceAP.module.css";
import MSAStyles from "../../../../styles/MSA.module.css";
import axios from 'axios'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BackButton from "../../../../components/BackButton";
import BackToDashboardButton from "../../../../components/BackToDashboardButton";

import SubHeader from "../../../../components/SubHeader";
import ClientInfoTopHeader from "../../../../components/ClientInfoTopHeader";
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
    dateFormReviewed:new Date().toISOString().split('T')[0],
    clientId: data[0]?.clientid,
    clientFirstName: data[0].clientfirstname,
    clientLastName: data[0].clientlastname,
    clientHCWID: data[0].clienthcwid,
    planStartDate: "",
    userFirstName: data[0].userfirstname,
    userLastName: data[0].userlastname,
    AIRSIntakeForm: data[0].airsintakeform==="0" ? false: true,
    AIRSIntakeFormDate: data[0].airsintakeformdate|| "",
    ComprehensiveRiskBehaviorAssessment: data[0].comprehensiveriskbehaviorassessment ==="0" ? false: true,
    ComprehensiveRiskBehaviorAssessmentDate:data[0].comprehensiveriskbehaviorassessmentdate|| "",
    ServiceActionPlan: data[0].serviceactionplan ==="0" ? false: true,
    ServiceActionPlanDate:  data[0].sapplanstartdate || "",
    AIRSCollateralInformation: data[0].airscollateralinformation ==="0" ? false: true,
    AIRSCollateralInformationDate:data[0].airscollateralinformationdate || "",
    AIRSFinancialInformation: data[0].airsfinancialinformation ==="0" ? false: true,
    AIRSFinancialInformationDate: data[0].airsfinancialinformationdate || "",
    AIRSHIVAIDSRiskHistory: data[0].airshivaidsriskhistory ==="0" ? false: true,
    AIRSHIVAIDSRiskHistoryDate: data[0].airshivaidsriskhistorydate || "",
    AIRSHCVHistory: data[0].airshcvhistory ==="0" ? false: true,
    AIRSHCVHistoryDate: data[0].airshcvhistorydate || "",
    AIRSHousingInformation: data[0].airshousinginformation ==="0" ? false: true,
    AIRSHousingInformationDate: data[0].airshousinginformationdate || "",
    AIRSInsuranceInformation: data[0].airsinsuranceinformation ==="0" ? false: true,
    AIRSInsuranceInformationDate: data[0].airsinsuranceinformationdate || "",
    AIRSSubstanceUseHistory: data[0].airssubstanceusehistory ==="0" ? false: true,
    AIRSSubstanceUseHistoryDate: data[0].airssubstanceusehistorydate || "",
    LNEClientRights: data[0].lneclientrights ==="0" ? false: true,
    LNEClientRightsDate: data[0].lneclientrightsdate || "",
    LNEClientGrievancePolicyProcedure: data[0].lneclientgrievancepolicyprocedure ==="0" ? false: true,
    LNEClientGrievancePolicyProcedureDate: data[0].lneclientgrievancepolicyproceduredate || "",
    LNEProgramRules: data[0].lneprogramrules ==="0" ? false: true,
    LNEProgramRulesDate: data[0].lneprogramrulesdate || "",
    LNEEmergencyContactConsent: data[0].lneemergencycontactconsent ==="0" ? false: true,
    LNEEmergencyContactConsentDate: data[0].lneemergencycontactconsentdate || "",
    LNEConsentForReleaseOfConfidentialInformation: data[0].lneconsentforreleaseofconfidentialinformation ==="0" ? false: true,
    LNEConsentForReleaseOfConfidentialInformationDate: data[0].lneconsentforreleaseofconfidentialinformationdate || "",
    HIPPAConsentForm: data[0].hippaconsentform ==="0" ? false: true,
    HIPPAConsentFormDate: data[0].hippaconsentformdate || "",
    NYCDOHMHNoticeOfPrivacyPractices: data[0].nycdohmhnoticeofprivacypractices ==="0" ? false: true,
    NYCDOHMHNoticeOfPrivacyPracticesDate: data[0].nycdohmhnoticeofprivacypracticesdate || "",
    LinkageRetentionAdherenceForms: data[0].linkageretentionadherenceforms ==="0" || data[0].linkageretentionadherenceforms ===null ? false: true,
    LinkageRetentionAdherenceFormsDate: data[0].linkageretentionadherenceformsdate || "",
    InternalReferralInformation: data[0].internalreferralinformation ==="0" || data[0].internalreferralinformation ===null ? false: true,
    InternalReferralInformationDate: data[0].internalreferralinformationdate || "",
    LNEClientReferralForm: data[0].lneclientreferralform ==="0" || data[0].lneclientreferralform ===null ? false: true,
    LNEClientReferralFormDate: data[0].lneclientreferralformdate || "",
    HNSEligibilityForm: data[0].hnseligibilityform ==="0" || data[0].hnseligibilityform ===null? false : true,
    HNSEligibilityFormDate: data[0].hnseligibilityformdate || "",
    HNSReadinessForm: data[0].hnsreadinessform ==="0" || data[0].hnsreadinessform ===null? false : true,
    HNSReadinessFormDate: data[0].hnsreadinessformdate || "",
    SupportGroups: data[0].supportgroups ==="0" || data[0].supportgroups ===null ? false : true,
    SupportGroupsDate: data[0].supportgroupsdate || "",
    IDGForm: data[0].idgform ==="0"|| data[0].idgform ===null? false : true,
    IDGFormDate: data[0].idgformdate || "",

    progressNote:data[0].progressnoteid ===""|| data[0].progressnoteid ===null? false : true,
    progressNoteDate:data[0].progressnotedate || "",

    StatusChangesForm:data[0].statuschangesform ==="0"|| data[0].statuschangesform ===null? false : true,
    StatusChangesFormDate:data[0].statuschangesformdate || "",
    ComprehensiveRiskBehaviorAssessmentUpdates:data[0].comprehensiveriskbehaviorassessmentupdates ==="0"|| data[0].comprehensiveriskbehaviorassessmentupdates ===null? false : true,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate:data[0].comprehensiveriskbehaviorassessmentupdatesdate || "", 
    M11QForm :data[0].m11qform ==="0"|| data[0].m11qform ===null? false : true,
    M11QFormDate:data[0].m11qformdate || "",
    CD4VLReports:data[0].cd4vlreports ==="0"|| data[0].cd4vlreports ===null? false : true,
    CD4VLReportsDate:data[0].cd4vlreportsdate || "",
    InitialTreatmentAdherenceIntake:data[0].initialtreatmentadherenceintake ==="0"|| data[0].initialtreatmentadherenceintake ===null? false : true,
    InitialTreatmentAdherenceIntakeDate :data[0].initialtreatmentadherenceintakedate || "",
    TreatmentAdherenceUpdates:data[0].treatmentadherenceupdates ==="0"|| data[0].treatmentadherenceupdates ===null? false : true,
    TreatmentAdherenceUpdatesDate:data[0].treatmentadherenceupdatesdate || "",
    AirsDrugRegimen:data[0].airsdrugregimen ==="0"|| data[0].airsdrugregimen ===null? false : true,
    AirsDrugRegimenDate:data[0].airsdrugregimendate || "",
    AirsHIVMedicalProvider:data[0].airshivmedicalprovider ==="0"|| data[0].airshivmedicalprovider ===null? false : true,
    AirsHIVMedicalProviderDate:data[0].airshivmedicalproviderdate || "",
    AIRSHIVStatusHistory:data[0].airshivstatushistory ==="0"|| data[0].airshivstatushistory ===null? false : true,
    AIRSHIVStatusHistoryDate:data[0].airshivstatushistorydate || "",
    clientUniqueId:data[0].id
  });

const todaysDate = new Date();

  console.log("data",data)
  console.log("clientData",clientData)


const handleMsaform = ()=> {

    axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientData.clientId}/update`, {
        clientData
      })
      .then(function (response) {
        console.log(response)
        if(response.status===200 || response.statusText==='Ok'){
          notifyMessage()
            setTimeout(()=>{
              router.push(`/clients/${clientData.clientId}/profile`)
            },2300)
          } 
      })
      .catch(function (error) {
       console(error)
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

const formatDate=(date)=>{
console.log("date",date)
  const initialDate= date
  const newDate=initialDate.split('-')
  console.log(newDate)
  let fixedDate;
/*   if(typeof window !== 'undefined'){
    const userLocale=window.navigator.language
    userLocale==='en-US' ? fixedDate=`${newDate[2]}-${newDate[0].length===1? `0${newDate[0]}`:`${newDate[0]}`}-${newDate[1].length===1 ? `0${newDate[1]}`: `${newDate[1]}`}`
    :fixedDate=`${newDate[2]}-${newDate[1].length===1? `0${newDate[1]}`:`${newDate[1]}`}-${newDate[0].length===1 ? `0${newDate[0]}`: `${newDate[0]}`}`
  }
  return fixedDate */
}
const defaultTodaysDateValue = new Date().toISOString().split('T')[0]
  return (
    <><ToastContainer autoClose={2000} />
      <Layout>
      


      <SubHeader pageTitle={'Edit MSA FORM'}/>

        <div className="container mx-auto bg-white shadow divide-y-2 divide-blue-300 mt-10 rounded-md border-blue">
     
        <ClientInfoTopHeader
              data={data}
              clientData={clientData}
              setClientData={setClientData}
              stateValue='dateFormReviewed'
            />

          <section
            id="form"
            className="gap-x-5 px-10 pt-6 mb-7"
          >
            {/* {TABLE HEAD} */}
            <div className="flex gap-x-3 items-center mb-10">
              <img src="/forms_uploaded.svg" alt="" />
            <p className="text-2xl font-bold">Indicate which of the following forms you have uploaded to the client’s Dropbox</p>
            </div>
            <div
              id="form-head"
              className={`${MSAStyles.formRowsContainerHeading} gap-x-1    grid  rounded-tl-lg rounded-tr-lg my-1`}
            >
              
              <p className="light-blue-bg pl-5 py-2 text-xl  ">Form name</p>
              <p className="text-center light-blue-bg py-2 text-xl ">Date added</p>
              <p className="text-center light-blue-bg py-2 text-xl ">Dropbox Folder</p>
            </div>
            {/* {TABLE HEAD} */}

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-1`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSIntakeFormDate ==="" || clientData.AIRSIntakeFormDate ===null ? (
                    setClientData({
                      ...clientData,
                      AIRSIntakeForm: !clientData.AIRSIntakeForm,
                      AIRSIntakeFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSIntakeForm: !clientData.AIRSIntakeForm,
                      AIRSIntakeFormDate: '',
                    })
                  }
                }
                checked={clientData.AIRSIntakeFormDate ? true : false} 
                disabled={clientData.AIRSIntakeFormDate ? true : false} 
                />
              </div>
              <div>
                <p className="text-lg">AIRS Intake Form <span className="text-red-500">*</span></p>
              </div>
              <div className="text-center">
               {/*  {data[0].airsintakeform === "1" ?
              
              <p className="inline-block px-8 py-1 rounded-lg"> 
              {clientData.AIRSIntakeFormDate.split('T')[0]}</p> 
              :
              
                } */}
                  <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.AIRSIntakeFormDate &&
                    clientData.AIRSIntakeFormDate.split('T')[0]
                  }
                  //disabled={clientData.AIRSIntakeFormDate ? true: false}
                  className="rounded  p-2 border"
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
                <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.ComprehensiveRiskBehaviorAssessmentDate==="" || clientData.ComprehensiveRiskBehaviorAssessmentDate===null ? (
                    setClientData({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessment:
                        !clientData.ComprehensiveRiskBehaviorAssessment,
                        ComprehensiveRiskBehaviorAssessmentDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessment:
                        !clientData.ComprehensiveRiskBehaviorAssessment,
                      ComprehensiveRiskBehaviorAssessmentDate:'',
                    })
                  }
                }
                checked={clientData.ComprehensiveRiskBehaviorAssessment? true : false}
                disabled={clientData.ComprehensiveRiskBehaviorAssessment? true : false}
                />
              </div>
              <div>
                <p className="text-lg">Comprehensive Risk Behavior Assessment <span className="text-red-500">*</span> </p>
              </div>
              <div className="text-center">
              {/*   {data[0].comprehensiveriskbehaviorassessment === "1" ?
              
              <p className=" inline-block px-8 py-1 rounded-lg"> 
              {clientData.ComprehensiveRiskBehaviorAssessmentDate.split('T')[0]}</p> 
              :} */}

                  <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.ComprehensiveRiskBehaviorAssessmentDate &&
                    clientData.ComprehensiveRiskBehaviorAssessmentDate.split('T')[0]
                  }
                  //disabled={clientData.ComprehensiveRiskBehaviorAssessmentDate ? true: false}
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-pink-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].hnseligibilityform === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.HNSEligibilityFormDate==="" || clientData.HNSEligibilityFormDate ===null ? (
                    setClientData({
                      ...clientData,
                      HNSEligibilityForm: !clientData.HNSEligibilityForm,
                      HNSEligibilityFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      HNSEligibilityForm: !clientData.HNSEligibilityForm,
                      HNSEligibilityFormDate: ''
                    })
                  }}
                  checked={clientData.HNSEligibilityForm? true : false}
                />
              </div>
              <div>
                <p className="text-lg">HNS Eligibility Assessment <span className="text-red-500">*</span></p>
              </div>
              <div className="text-center">
                {/* {data[0].hnseligibilityform === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.HNSEligibilityFormDate.split('T')[0]}</p> 
              :} */}

              <input
                  type="date"
                  id="HNSEligibilityForm"
                  value={
                    clientData.HNSEligibilityFormDate &&
                    clientData.HNSEligibilityFormDate.split('T')[0]
                  }
                  //disabled={clientData.HNSEligibilityFormDate ? true: false} 
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  disabled={data[0].serviceactionplan === "1" ? true : false}
                  onChange={() => {
                    clientData.ServiceActionPlanDate==="" || clientData.ServiceActionPlanDate===null ? (
                    setClientData({
                      ...clientData,
                      ServiceActionPlan: !clientData.ServiceActionPlan,
                      ServiceActionPlanDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      ServiceActionPlan: !clientData.ServiceActionPlan,
                      ServiceActionPlanDate: ''
                    })
                  }}
                  checked={clientData.ServiceActionPlan? true : false}
                />
              </div>
              <div>
                <p className="text-lg">Service Action Plan  </p>
              </div>
              <div className="text-center">
              {/* {clientData.ServiceActionPlanDate ?  <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
                   {clientData.ServiceActionPlanDate.split('T')[0]}</p>: <p className="bg-white inline-block px-5 py-1 rounded-lg">MM/DD/YYYY</p>} */}
                <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.ServiceActionPlanDate &&
                    clientData.ServiceActionPlanDate.split('T')[0]
                  }
                  //disabled={clientData.ServiceActionPlanDate ? true: false}
                  className="rounded  p-2 border"
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
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.action_plans_folder_url ? data[0]?.action_plans_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            {/* <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5 pointer-events-none">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.progressNoteDate==="" || clientData.progressNoteDate===null ? (
                    setClientData({
                      ...clientData,
                      progressNote: !clientData.progressNote,
                      progressNoteDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      progressNote: !clientData.progressNote,
                      progressNoteDate: ''
                    })
                  }}
                  checked={clientData.progressNote ? 'checked' : false}
                />
              </div>
              <div>
                <p className="text-lg">Progress Note </p>
                {clientData.progressnotedateid}
              </div>
              <div className="text-center">
              {clientData.progressNote ?  <p className="bg-white inline-block  px-8 py-1 rounded-lg text-left"> 
                   {clientData.progressNoteDate.split('T')[0]}</p>: <p className="bg-white inline-block px-5 py-1 rounded-lg">MM/DD/YYYY</p>
              }
               {/*  <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.progressNoteDate &&
                    formatDate(clientData.progressNoteDate)
                  }
                  disabled={clientData.progressNoteDate ? true: false}
                  className="rounded  p-2 border"
                  onChange={(e) => {
                    if(clientData){
                      setClientData({
                        ...clientData,
                        progressNoteDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        progressNoteDate: e.target.value,
                        progressNote: !clientData.progressNote,
                      });
                    }
                   
                  }}
                /> 
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.action_plans_folder_url ? data[0]?.action_plans_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div> */}

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1 my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].statuschangesform === "1" ? true : false}
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.StatusChangesFormDate==="" || clientData.StatusChangesFormDate===null ? (
                    setClientData({
                      ...clientData,
                      StatusChangesForm:
                        !clientData.StatusChangesForm,
                        StatusChangesFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      StatusChangesForm :
                        !clientData.StatusChangesForm ,
                        StatusChangesFormDate: '',
                    })
                    }
                  }
                  checked={clientData.StatusChangesForm ? true : false}
                />
              </div>
              <div>
                <p className="text-lg">Status Changes/ClosureForms</p>
              </div>
              <div className="text-center">
              {/* {data[0].statuschangesform === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.StatusChangesFormDate.split('T')[0]}</p> 
              :} */}

                <input
                  type="date"
                  id="StatusChangeForm"
                  value={
                    clientData.StatusChangesFormDate &&
                    clientData.StatusChangesFormDate.split('T')[0]
                  }
                  // disabled={data[0].statuschangesform === "1" ? true : false}
                  className="rounded  p-2 border"
                  onChange={(e) => {
                    if(clientData.StatusChangesForm ){
                      setClientData({
                        ...clientData,
                        StatusChangesFormDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        StatusChangesFormDate: e.target.value,
                        StatusChangesForm :
                          !clientData.StatusChangesForm ,
                      });
                    }
                    
                  }}
                /> 
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>



            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].comprehensiveriskbehaviorassessmentupdates === "1" ? true : false}
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate==="" || clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate===null ? (
                    setClientData({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessmentUpdates:
                        !clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessmentUpdates :
                        !clientData.ComprehensiveRiskBehaviorAssessmentUpdates ,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate: '',
                    })
                    }
                  }
                  checked={clientData.ComprehensiveRiskBehaviorAssessmentUpdates ? true : false}
                />
              </div>
              <div>
                <p className="text-lg">Comprehensive Behavioral Risk Assessment Updates </p>
              </div>
              
              <div className="text-center">
             {/*  {data[0].comprehensiveriskbehaviorassessmentupdates === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate.split('T')[0]}</p> 
              :
                } */}
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate &&
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate.split('T')[0]
                  }
                  // disabled={data[0].comprehensiveriskbehaviorassessmentupdates === "1"? true: false} 
                  className="rounded  p-2 border"
                  onChange={(e) => {
                    if(clientData.ComprehensiveRiskBehaviorAssessmentUpdates ){
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate: e.target.value,
                        ComprehensiveRiskBehaviorAssessmentUpdates :
                          !clientData.StatusChangesForm ,
                      });
                    }
                    
                  }}
                /> 
              </div> 
              
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>



            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].m11qform === "1" ? true : false}
                  name="m11qform"
                  id="m11qform"
                  onChange={(e) =>{
                    clientData.M11QFormDate==="" || clientData.M11QFormDate===null ? (
                    setClientData({
                      ...clientData,
                      M11QForm:
                        !clientData.M11QForm,
                        M11QFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      M11QForm :
                        !clientData.M11QForm ,
                        M11QFormDate: '',
                    })
                    }
                  }
                  checked={clientData.M11QForm ? true : false}
                />
              </div>
              <div>
                <p className="text-lg">
                M11Q
                </p>
              </div>
              <div className="text-center">
               {/*  {data[0].m11qform === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.M11QFormDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="M11QFormDate"
                  value={
                    clientData.M11QFormDate &&
                    clientData.M11QFormDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded  p-2 border"
                  onChange={(e) => {
                    if(clientData.M11QForm ){
                      setClientData({
                        ...clientData,
                        M11QFormDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        M11QFormDate: e.target.value,
                        M11QForm :
                          !clientData.M11QForm ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>


            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5 ">
                <input
                  type="checkbox"
                  disabled={data[0].cd4vlreports === "1" ? true : false}
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.CD4VLReportsDate==="" || clientData.CD4VLReportsDate===null ? (
                    setClientData({
                      ...clientData,
                      CD4VLReports:
                        !clientData.CD4VLReports,
                        CD4VLReportsDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      CD4VLReports :
                        !clientData.CD4VLReports ,
                        CD4VLReportsDate: '',
                    })
                    }
                  }
                  checked={clientData.CD4VLReports ? true : false}
                />
              </div>
              <div>
                <p className="text-lg">
                CD4/VL Check Reports
                </p>
              </div>
              <div className="text-center">
                {/* {data[0].cd4vlreports === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.CD4VLReportsDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="CD4VLReportsDate"
                  value={
                    clientData.CD4VLReportsDate &&
                    clientData.CD4VLReportsDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded  p-2 border"
                  onChange={(e) => {
                    if(clientData.CD4VLReports ){
                      setClientData({
                        ...clientData,
                        CD4VLReportsDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        CD4VLReportsDate: e.target.value,
                        CD4VLReports :
                          !clientData.CD4VLReports ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>





            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].initialtreatmentadherenceintake === "1" ? true : false}
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.InitialTreatmentAdherenceIntakeDate==="" || clientData.InitialTreatmentAdherenceIntakeDate ===null ? (
                    setClientData({
                      ...clientData,
                      InitialTreatmentAdherenceIntake:
                        !clientData.InitialTreatmentAdherenceIntake,
                        InitialTreatmentAdherenceIntakeDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      InitialTreatmentAdherenceIntake :
                        !clientData.InitialTreatmentAdherenceIntake ,
                        InitialTreatmentAdherenceIntakeDate: '',
                    })
                    }
                  }
                  checked={clientData.InitialTreatmentAdherenceIntake ? true : false}
                />
              </div>
              <div>
                <p className="text-lg">
                Initial Treatment Adherence Intake 
                </p>
              </div>
              <div className="text-center">
                {/* {data[0].initialtreatmentadherenceintake === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.InitialTreatmentAdherenceIntakeDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="InitialTreatmentAdherenceIntakeDate"
                  value={
                    clientData.InitialTreatmentAdherenceIntakeDate &&
                    clientData.InitialTreatmentAdherenceIntakeDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded  p-2 border"
                  onChange={(e) => {
                    if(clientData.InitialTreatmentAdherenceIntake ){
                      setClientData({
                        ...clientData,
                        InitialTreatmentAdherenceIntakeDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        InitialTreatmentAdherenceIntakeDate: e.target.value,
                        InitialTreatmentAdherenceIntake :
                          !clientData.InitialTreatmentAdherenceIntake ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>




            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].treatmentadherenceupdates === "1" ? true : false}
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.TreatmentAdherenceUpdatesDate==="" || clientData.TreatmentAdherenceUpdatesDate ===null ? (
                    setClientData({
                      ...clientData,
                      TreatmentAdherenceUpdates:
                        !clientData.TreatmentAdherenceUpdates,
                        TreatmentAdherenceUpdatesDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      TreatmentAdherenceUpdates :
                        !clientData.TreatmentAdherenceUpdates ,
                        TreatmentAdherenceUpdatesDate: '',
                    })
                    }
                  }
                  checked={clientData.TreatmentAdherenceUpdates ? true : false}
                />
              </div>
              <div>
                <p className="text-lg">
                Treatment Adherence Updates
                </p>
              </div>
              <div className="text-center">
               {/*  {data[0].treatmentadherenceupdates === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.TreatmentAdherenceUpdatesDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="TreatmentAdherenceUpdatesDate"
                  value={
                    clientData.TreatmentAdherenceUpdatesDate &&
                    clientData.TreatmentAdherenceUpdatesDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded  p-2 border"
                  onChange={(e) => {
                    if(clientData.TreatmentAdherenceUpdates ){
                      setClientData({
                        ...clientData,
                        TreatmentAdherenceUpdatesDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        TreatmentAdherenceUpdatesDate: e.target.value,
                        TreatmentAdherenceUpdates :
                          !clientData.TreatmentAdherenceUpdates ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>









            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].airscollateralinformation === "1" ? true : false}
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.AIRSCollateralInformationDate==="" || clientData.AIRSCollateralInformationDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSCollateralInformation:
                        !clientData.AIRSCollateralInformation,
                        AIRSCollateralInformationDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSCollateralInformation:
                        !clientData.AIRSCollateralInformation,
                      AIRSCollateralInformationDate: '',
                    })
                    }
                  }
                  checked={clientData.AIRSCollateralInformation? true : false}
                />
              </div>
              <div>
                <p className="text-lg">AIRS Collateral Information </p>
              </div>
              <div className="text-center">
               {/*  {data[0].airscollateralinformation === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.AIRSCollateralInformationDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="AIRSCollateralInformationDate"
                  value={
                    clientData.AIRSCollateralInformationDate &&
                    clientData.AIRSCollateralInformationDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>


            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].airsdrugregimen === "1" ? true : false}
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.AirsDrugRegimenDate==="" || clientData.AirsDrugRegimenDate ===null ? (
                    setClientData({
                      ...clientData,
                      AirsDrugRegimen:
                        !clientData.AirsDrugRegimen,
                        AirsDrugRegimenDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AirsDrugRegimen :
                        !clientData.AirsDrugRegimen ,
                        AirsDrugRegimenDate: '',
                    })
                    }
                  }
                  checked={clientData.AirsDrugRegimen ? true : false}
                />
              </div>
              <div>
                <p className="text-lg">
                AIRS Drug Regimen History 
                </p>
              </div>
              <div className="text-center">
                {/* {data[0].airsdrugregimen === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.AirsDrugRegimenDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="AirsDrugRegimen"
                  value={
                    clientData.AirsDrugRegimenDate &&
                    clientData.AirsDrugRegimenDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded  p-2 border"
                  onChange={(e) => {
                    if(clientData.AirsDrugRegimen ){
                      setClientData({
                        ...clientData,
                        AirsDrugRegimenDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AirsDrugRegimenDate : e.target.value,
                        AirsDrugRegimen  :
                          !clientData.AirsDrugRegimen  ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>



            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].airsfinancialinformation === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() => {
                    clientData.AIRSFinancialInformationDate ==="" || clientData.AIRSFinancialInformationDate === null ? (
                    setClientData({
                      ...clientData,
                      AIRSFinancialInformation:
                        !clientData.AIRSFinancialInformation,
                        AIRSFinancialInformationDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSFinancialInformation:
                        !clientData.AIRSFinancialInformation,
                      AIRSFinancialInformationDate: '',
                      
                    })
                  }}
                  checked={clientData.AIRSFinancialInformation? true : false}
                />
              </div>
              <div>
                <p className="text-lg">AIRS Financial Information </p>
              </div>
              <div className="text-center">
               {/*  {data[0].airsfinancialinformation === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.AIRSFinancialInformationDate.split('T')[0]}</p> : (
      
               
                )} */}
                 
                 <input
                  type="date"
                  id="AIRSFinancialInformation"
                  value={
                    clientData.AIRSFinancialInformationDate &&
                    clientData.AIRSFinancialInformationDate.split('T')[0]
                  }
                 /*  disabled={clientData.AIRSFinancialInformation ? true: false} */
                  className="rounded  p-2 border"
                  onChange={(e) => {
                    if (clientData.AIRSFinancialInformation){
                      setClientData({
                        ...clientData,
                        AIRSFinancialInformationDate: e.target.value,
                        AIRSFinancialInformation:
                          !clientData.AIRSFinancialInformation,
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].airshivaidsriskhistory === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() => {
                    clientData.AIRSHIVAIDSRiskHistoryDate==="" || clientData.AIRSHIVAIDSRiskHistoryDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSHIVAIDSRiskHistory:
                        !clientData.AIRSHIVAIDSRiskHistory,
                        AIRSHIVAIDSRiskHistoryDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSHIVAIDSRiskHistory:
                        !clientData.AIRSHIVAIDSRiskHistory,
                      AIRSHIVAIDSRiskHistoryDate: ''
                    })
                  }}
                  checked={clientData.AIRSHIVAIDSRiskHistory? true : false}
                />
              </div>
              <div>
                <p className="text-lg">AIRS HIV AIDS Risk History </p>
              </div>
              <div className="text-center">
                {/* {data[0].airshivaidsriskhistory === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.AIRSHIVAIDSRiskHistoryDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="AIRSHIVAIDSRiskHistory"
                  value={
                    clientData.AIRSHIVAIDSRiskHistoryDate &&
                    clientData.AIRSHIVAIDSRiskHistoryDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSHIVAIDSRiskHistoryDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>



            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].airshivmedicalprovider === "1" ? true : false}
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.AirsHIVMedicalProviderDate==="" || clientData.AirsHIVMedicalProviderDate ===null ? (
                    setClientData({
                      ...clientData,
                      AirsHIVMedicalProvider:
                        !clientData.AirsHIVMedicalProvider,
                        AirsHIVMedicalProviderDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AirsHIVMedicalProvider :
                        !clientData.AirsHIVMedicalProvider ,
                        AirsHIVMedicalProviderDate: '',
                    })
                    }
                  }
                  checked={clientData.AirsHIVMedicalProvider ? true : false}
                />
              </div>
              <div>
                <p className="text-lg">
                AIRS HIV Medical Provider History 
                </p>
              </div>
              <div className="text-center">
                {/* {data[0].airshivmedicalprovider === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.AirsHIVMedicalProviderDate.split('T')[0]}</p> :
               } */}
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.AirsHIVMedicalProviderDate &&
                    clientData.AirsHIVMedicalProviderDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded  p-2 border"
                  onChange={(e) => {
                    if(clientData.AirsHIVMedicalProvider ){
                      setClientData({
                        ...clientData,
                        AirsHIVMedicalProviderDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AirsHIVMedicalProviderDate: e.target.value,
                        AirsHIVMedicalProvider :
                          !clientData.AirsHIVMedicalProvider ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>


            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].airshivstatushistory === "1" ? true : false}
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.AIRSHIVStatusHistoryDate ==="" || clientData.AIRSHIVStatusHistoryDate ===null ? (
                    setClientData({
                      ...clientData,
                      AIRSHIVStatusHistory:
                        !clientData.AIRSHIVStatusHistory,
                        AIRSHIVStatusHistoryDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSHIVStatusHistory :
                        !clientData.AIRSHIVStatusHistory ,
                        AIRSHIVStatusHistoryDate: '',
                    })
                    }
                  }
                  checked={clientData.AIRSHIVStatusHistory ? true : false}
                />
              </div>
              <div>
                <p className="text-lg">
                AIRS HIV Status History 
                </p>
              </div>
              <div className="text-center">
               {/*  {data[0].airshivstatushistory === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.AIRSHIVStatusHistoryDate.split('T')[0]}</p> :
                } */}

<input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.AIRSHIVStatusHistoryDate &&
                    clientData.AIRSHIVStatusHistoryDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className="rounded  p-2 border"
                  onChange={(e) => {
                    if(clientData.AIRSHIVStatusHistory ){
                      setClientData({
                        ...clientData,
                        AIRSHIVStatusHistoryDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        AIRSHIVStatusHistoryDate: e.target.value,
                        AIRSHIVStatusHistory :
                          !clientData.AIRSHIVStatusHistory ,
                      });
                    }
                    
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
              <a href={data[0]?.tickler_updates_folder_url ? data[0]?.tickler_updates_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>




            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].airshcvhistory === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() => {
                    clientData.AIRSHCVHistoryDate==="" || clientData.AIRSHCVHistoryDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSHCVHistory: !clientData.AIRSHCVHistory,
                      AIRSHCVHistoryDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSHCVHistory: !clientData.AIRSHCVHistory,
                      AIRSHCVHistoryDate: ''
                    })
                  }
                }
                checked={clientData.AIRSHCVHistory? true : false}
                />
              </div>
              <div>
                <p className="text-lg">AIRS HCV History </p>
              </div>
              <div className="text-center">
               {/*  {data[0].airshcvhistory === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.AIRSHCVHistoryDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  value={
                    clientData.AIRSHCVHistoryDate &&
                    clientData.AIRSHCVHistoryDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSHCVHistoryDate ? true: false} */
                  className="rounded  p-2 border"
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
              
                <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].airshousinginformation === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() => {
                 
                    clientData.AIRSHousingInformationDate==="" || clientData.AIRSHousingInformationDate=== null ? (
                    setClientData({
                      ...clientData,
                      AIRSHousingInformation:
                        !clientData.AIRSHousingInformation,
                        AIRSHousingInformationDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSHousingInformation:
                        !clientData.AIRSHousingInformation,
                      AIRSHousingInformationDate: '',
                    })
                  }
                }
                checked={clientData.AIRSHousingInformation? true : false}
                />
              </div>
              <div>
                <p className="text-lg">AIRS Housing Information </p>
              </div>
              <div className="text-center">
                {/* {data[0].airshousinginformation === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.AIRSHousingInformationDate.split('T')[0]}</p> :
               } */}
                <input
                  type="date"
                  id="AIRSHousingInformation"
                  value={
                    clientData.AIRSHousingInformationDate &&
                    clientData.AIRSHousingInformationDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSHousingInformationDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].airsinsuranceinformation === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() => {
                    clientData.AIRSInsuranceInformationDate==="" || clientData.AIRSInsuranceInformationDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSInsuranceInformation:
                        !clientData.AIRSInsuranceInformation,
                        AIRSInsuranceInformationDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSInsuranceInformation:
                        !clientData.AIRSInsuranceInformation,
                      AIRSInsuranceInformationDate: '',
                    })
                  }}
                  checked={clientData.AIRSInsuranceInformation? true : false}
                />
              </div>
              <div>
                <p className="text-lg">AIRS Insurance Information </p>
              </div>
              <div className="text-center">
                {/* {data[0].airsinsuranceinformation === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.AIRSInsuranceInformationDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="AIRSInsuranceInformation"
                  value={
                    clientData.AIRSInsuranceInformationDate &&
                    clientData.AIRSInsuranceInformationDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSInsuranceInformationDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].airssubstanceusehistory === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() => {
                    clientData.AIRSSubstanceUseHistoryDate==="" || clientData.AIRSSubstanceUseHistoryDate===null ? (
                    setClientData({
                      ...clientData,
                      AIRSSubstanceUseHistory:
                        !clientData.AIRSSubstanceUseHistory,
                        AIRSSubstanceUseHistoryDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      AIRSSubstanceUseHistory:
                        !clientData.AIRSSubstanceUseHistory,
                      AIRSSubstanceUseHistoryDate: ''
                    })
                  }}
                  checked={clientData.AIRSSubstanceUseHistory? true : false}
                />
              </div>
              <div>
                <p className="text-lg">AIRS Substance Use History </p>
              </div>
              <div className="text-center">
               {/*  {data[0].airssubstanceusehistory === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.AIRSSubstanceUseHistoryDate.split('T')[0]}</p> :
               } */}
                <input
                  type="date"
                  id="AIRSSubstanceUseHistory"
                  value={
                    clientData.AIRSSubstanceUseHistoryDate &&
                    clientData.AIRSSubstanceUseHistoryDate.split('T')[0]
                  }
                  /* disabled={clientData.AIRSSubstanceUseHistoryDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].lneclientrights === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() => {
                    clientData.LNEClientRightsDate==="" || clientData.LNEClientRightsDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEClientRights: !clientData.LNEClientRights,
                      LNEClientRightsDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      LNEClientRights: !clientData.LNEClientRights,
                      LNEClientRightsDate: '',
                    })
                  }}
                  checked={clientData.LNEClientRights? true : false}
                />
              </div>
              <div>
                <p className="text-lg">LNE Client Rights </p>
              </div>
              <div className="text-center">
                {/* {data[0].lneclientrights === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.LNEClientRightsDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="LNEClientRights"
                  value={
                    clientData.LNEClientRightsDate &&
                    clientData.LNEClientRightsDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEClientRightsDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].lneclientgrievancepolicyprocedure === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() => {
                    clientData.LNEClientGrievancePolicyProcedureDate==="" || clientData.LNEClientGrievancePolicyProcedureDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEClientGrievancePolicyProcedure:
                        !clientData.LNEClientGrievancePolicyProcedure,
                        LNEClientGrievancePolicyProcedureDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      LNEClientGrievancePolicyProcedure:
                        !clientData.LNEClientGrievancePolicyProcedure,
                      LNEClientGrievancePolicyProcedureDate: '',
                    })
                  }}
                  checked={clientData.LNEClientGrievancePolicyProcedure? true : false}
                />
              </div>
              <div>
                <p className="text-lg">LNE Client Grievance Policy & Procedure </p>
              </div>
              <div className="text-center">
               {/*  {data[0].lneclientgrievancepolicyprocedure === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.LNEClientGrievancePolicyProcedureDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  value={
                    clientData.LNEClientGrievancePolicyProcedureDate &&
                    clientData.LNEClientGrievancePolicyProcedureDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEClientGrievancePolicyProcedureDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].lneprogramrules === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() => {
                    clientData.LNEProgramRulesDate==="" || clientData.LNEProgramRulesDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEProgramRules: !clientData.LNEProgramRules,
                      LNEProgramRulesDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      LNEProgramRules: !clientData.LNEProgramRules,
                      LNEProgramRulesDate: ''
                    })
                  }
                }
                checked={clientData.LNEProgramRules? true : false}
                />
              </div>
              <div>
                <p className="text-lg">LNE Program Rules </p>
              </div>
              <div className="text-center">
                {/* {data[0].lneprogramrules === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.LNEProgramRulesDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  value={
                    clientData.LNEProgramRulesDate &&
                    clientData.LNEProgramRulesDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEProgramRulesDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].lneemergencycontactconsent === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.LNEEmergencyContactConsentDate==="" || clientData.LNEEmergencyContactConsentDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEEmergencyContactConsent:
                        !clientData.LNEEmergencyContactConsent,
                        LNEEmergencyContactConsentDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      LNEEmergencyContactConsent:
                        !clientData.LNEEmergencyContactConsent,
                      LNEEmergencyContactConsentDate: ''
                    })
                  }}
                  checked={clientData.LNEEmergencyContactConsent? true : false}
                />
              </div>
              <div>
                <p className="text-lg">LNE Emergency Contact Consent </p>
              </div>
              <div className="text-center">
               {/*  {data[0].lneemergencycontactconsent === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.LNEEmergencyContactConsentDate.split('T')[0]}</p> :
               } */}
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  value={
                    clientData.LNEEmergencyContactConsentDate &&
                    clientData.LNEEmergencyContactConsentDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEEmergencyContactConsentDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].lneconsentforreleaseofconfidentialinformation === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate==="" || clientData.LNEConsentForReleaseOfConfidentialInformationDate===null ? (
                      setClientData({
                        ...clientData,
                        LNEConsentForReleaseOfConfidentialInformation:
                          !clientData.LNEConsentForReleaseOfConfidentialInformation,
                          LNEConsentForReleaseOfConfidentialInformationDate:crearFecha()
                      })
                    ):setClientData({
                      ...clientData,
                      LNEConsentForReleaseOfConfidentialInformation:
                        !clientData.LNEConsentForReleaseOfConfidentialInformation,
                      LNEConsentForReleaseOfConfidentialInformationDate: '',
                    })
                  }
                  }
                  checked={clientData.LNEConsentForReleaseOfConfidentialInformation? true : false}
                />
              </div>
              <div>
                <p className="text-lg">LNE Consent for Release of Confidential Information </p>
              </div>
              <div className="text-center">
                {/* {data[0].lneconsentforreleaseofconfidentialinformation === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.LNEConsentForReleaseOfConfidentialInformationDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="LNEConsentForReleaseOfConfidentialInformation"
                  value={
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate &&
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEConsentForReleaseOfConfidentialInformationDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].hippaconsentform === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.HIPPAConsentFormDate==="" || clientData.HIPPAConsentFormDate===null ? (
                    setClientData({
                      ...clientData,
                      HIPPAConsentForm: !clientData.HIPPAConsentForm,
                      HIPPAConsentFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      HIPPAConsentForm: !clientData.HIPPAConsentForm,
                      HIPPAConsentFormDate: ''
                    })
                  }
                  }
                  checked={clientData.HIPPAConsentForm? true : false}
                />
              </div>
              <div>
                <p className="text-lg">HIPAA Consent Form (OCA Form 960)</p>
              </div>
              <div className="text-center">
               {/*  {data[0].hippaconsentform === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.HIPPAConsentFormDate.split('T')[0]}</p> :
               } */}
                <input
                  type="date"
                  id="HIPPAConsentForm"
                  value={
                    clientData.HIPPAConsentFormDate &&
                    clientData.HIPPAConsentFormDate.split('T')[0]
                  }
                 /*  disabled={clientData.HIPPAConsentFormDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].nycdohmhnoticeofprivacypractices === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate==="" || clientData.NYCDOHMHNoticeOfPrivacyPracticesDate===null ? (
                    setClientData({
                      ...clientData,
                      NYCDOHMHNoticeOfPrivacyPractices:
                        !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                        NYCDOHMHNoticeOfPrivacyPracticesDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      NYCDOHMHNoticeOfPrivacyPractices:
                        !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                      NYCDOHMHNoticeOfPrivacyPracticesDate: ''
                    })
                  }
                  }
                  checked={clientData.NYCDOHMHNoticeOfPrivacyPractices? true : false}
                />
              </div>
              <div>
                <p className="text-lg">
                  NYC DOHMH Notice of Privacy Practices - Acknowledgement of
                  Receipt{" "}
                </p>
              </div>
              <div className="text-center">
               {/*  {data[0].nycdohmhnoticeofprivacypractices === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.NYCDOHMHNoticeOfPrivacyPracticesDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="NYCDOHMHNoticeOfPrivacyPractices"
                  value={
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate &&
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate.split('T')[0]
                  }
                  /* disabled={clientData.NYCDOHMHNoticeOfPrivacyPracticesDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div className={`${MSAStyles.formRowsContainer} msa-table-light-light-pink-bg grid gap-5 py-1   my-2`}>
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].linkageretentionadherenceforms === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.LinkageRetentionAdherenceFormsDate==="" || clientData.LinkageRetentionAdherenceFormsDate===null ? (
                    setClientData({
                      ...clientData,
                      LinkageRetentionAdherenceForms:
                        !clientData.LinkageRetentionAdherenceForms,
                        LinkageRetentionAdherenceFormsDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      LinkageRetentionAdherenceForms:
                        !clientData.LinkageRetentionAdherenceForms,
                      LinkageRetentionAdherenceFormsDate: ''
                    })
                  }
                  }
                  checked={clientData.LinkageRetentionAdherenceForms? true: false}
                />
              </div>
              <div>
                <p className="text-lg">Linkage, Retention, & Adherence Forms</p>
              </div>
              <div className="text-center">
               {/*  {data[0].linkageretentionadherenceforms === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.LinkageRetentionAdherenceFormsDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="LinkageRetentionAdherenceForms"
                  value={
                    clientData.LinkageRetentionAdherenceFormsDate &&
                    clientData.LinkageRetentionAdherenceFormsDate.split('T')[0]
                  }
                  /* disabled={clientData.LinkageRetentionAdherenceFormsDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-pink-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].internalreferralinformation === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() => {
                    
                    clientData.InternalReferralInformationDate==="" || clientData.InternalReferralInformationDate===null ? (
                    setClientData({
                      ...clientData,
                      InternalReferralInformation:
                        !clientData.InternalReferralInformation,
                        InternalReferralInformationDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      InternalReferralInformation:
                        !clientData.InternalReferralInformation,
                      InternalReferralInformationDate: ''
                    })
                  }
                }
                checked={clientData.InternalReferralInformation? true: false}
                />
              </div>
              <div>
                <p className="text-lg">Internal Referral Information</p>
              </div>
              <div className="text-center">
                {/* {data[0].internalreferralinformation === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.InternalReferralInformationDate.split('T')[0]}</p> :
                } */}

                <input
                  type="date"
                  id="LNEOutreachRetentionTrackingForm"
                  value={
                    clientData.InternalReferralInformationDate &&
                    clientData.InternalReferralInformationDate.split('T')[0]
                  }
                 /*  disabled={clientData.InternalReferralInformationDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-pink-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].lneclientreferralform === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() =>
                    clientData.LNEClientReferralFormDate ==="" || clientData.LNEClientReferralFormDate===null ? (
                    setClientData({
                      ...clientData,
                      LNEClientReferralForm: !clientData.LNEClientReferralForm,
                      LNEClientReferralFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      LNEClientReferralForm: !clientData.LNEClientReferralForm,
                      LNEClientReferralFormDate: ''
                    })
                  }
                  checked={clientData.LNEClientReferralForm?  true : false}
                />
              </div>
              <div>
                <p className="text-lg">Identification</p>
              </div>
              <div className="text-center">
                {/* {data[0].lneclientreferralform === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.LNEClientReferralFormDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="LNEClientReferralForm"
                  value={
                    clientData.LNEClientReferralFormDate &&
                    clientData.LNEClientReferralFormDate.split('T')[0]
                  }
                  /* disabled={clientData.LNEClientReferralFormDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-pink-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].hnsreadinessform === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.HNSReadinessFormDate==="" || clientData.HNSReadinessFormDate ===null ? (
                    setClientData({
                      ...clientData,
                      HNSReadinessForm: !clientData.HNSReadinessForm,
                      HNSReadinessFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      HNSReadinessForm: !clientData.HNSReadinessForm,
                      HNSReadinessFormDate: ''
                    })
                  }}
                  checked={clientData.HNSReadinessForm? true : false}
                />
              </div>
              <div>
                <p className="text-lg">HNS Readiness Assessment</p>
              </div>
              <div className="text-center">
               {/*  {data[0].hnsreadinessform === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.HNSReadinessFormDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="HNSReadinessForm"
                  value={
                    clientData.HNSReadinessFormDate &&
                    clientData.HNSReadinessFormDate.split('T')[0]
                  }
                  /* disabled={clientData.HNSReadinessFormDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-pink-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].supportgroups === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.SupportGroupsDate==="" || clientData.SupportGroupsDate ===null ? (
                    setClientData({
                      ...clientData,
                      SupportGroups: !clientData.SupportGroups,
                      SupportGroupsDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      SupportGroups: !clientData.SupportGroups,
                      SupportGroupsDate: ''
                    })
                  }}
                  checked={clientData.SupportGroups? true : false}
                />
              </div>
              <div>
                <p className="text-lg">Support Groups</p>
              </div>
              <div className="text-center">
                {/* {data[0].supportgroups === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.SupportGroupsDate.split('T')[0]}</p> :
                } */}
                <input
                  type="date"
                  id="SupportGroups"
                  value={
                    clientData.SupportGroupsDate &&
                    clientData.SupportGroupsDate.split('T')[0]
                  }
                  /* disabled={clientData.SupportGroupsDate ? true: false} */
                  className="rounded  p-2 border"
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
              <a href={data[0]?.support_groups_folder_url ? data[0]?.support_groups_folder_url : ""} target="_blank" rel="noreferrer">
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>
            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-pink-bg grid gap-5 py-1   my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  disabled={data[0].idgform === "1" ? true : false}
                  name=""
                  id=""
                  onChange={() =>{
                    clientData.IDGFormDate==="" || clientData.IDGFormDate ===null ? (
                    setClientData({
                      ...clientData,
                      IDGForm: !clientData.IDGForm,
                      IDGFormDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      IDGForm: !clientData.IDGForm,
                      IDGFormDate: ''
                    })
                  }}
                  checked={clientData.IDGForm? true : false}
                />
              </div>
              <div>
                <p className="text-lg">IDG</p>
              </div>
              <div className="text-center">
              {/*   {data[0].idgform  === "1" ?
              
              <p className="bg-white inline-block px-8 py-1 rounded-lg"> 
              {clientData.IDGFormDate.split('T')[0]}</p> :
               } */}

                <input
                  type="date"
                  id="IDGForm"
                  value={
                    clientData.IDGFormDate &&
                    clientData.IDGFormDate.split('T')[0]
                  }
                  /* disabled={clientData.IDGFormDate ? true: false} */
                  className="rounded  p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>
          </section>

         
        </div>
        <section id="save" className="py-10 pb-20">
            <div className="container mx-auto flex justify-center">
              <button
                className="btn-yellow px-5 py-3 flex items-center font-medium text-lg gap-3 px-5 rounded shadow inline-block"
                onClick={() => handleMsaform()}
              >
                <img src="/msa/save_and_finish.svg" alt="save icon" width={20}/>
                Save and Update
              </button>
            </div>
          </section>
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