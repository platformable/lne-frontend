import React, { useState,useEffect } from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Styles from "../../../../styles/ServiceAP.module.css";
import MSAStyles from "../../../../styles/MSA.module.css";
import axios from 'axios'
import { useRouter } from 'next/router'
import { Dropbox } from "dropbox";
import Loader from "../../../../components/Loader";


import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BackButton from "../../../../components/BackButton";
import SubHeader from "../../../../components/SubHeader";
import ClientInfoTopHeader from "../../../../components/ClientInfoTopHeader";

const Index = ({ data }) => {
   const router = useRouter()
   const [isSaving, setIsSaving] = useState(false);

const notifyMessage = (status) => {
  if (status === "ok") {
    toast.success("Form saved successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  if (status === "fail") {
    toast.error("Something went wrong try again", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};



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

  const [clientData, setClientData] = useState({
    dateFormReviewed:new Date(),
    clientId: data[0]?.clientid,
    clientFirstName: data[0]?.clientfirstname,
    clientLastName: data[0]?.clientlastname,
    clientHCWID: data[0]?.clienthcwid,
    planStartDate: "",
    userFirstName: data[0]?.clienthcwname,
    userLastName: data[0]?.clienthcwlastname,
    AIRSIntakeForm: false,
    AIRSIntakeFormDate: "",
    ComprehensiveRiskBehaviorAssessment: false,
    ComprehensiveRiskBehaviorAssessmentDate: "",
    ServiceActionPlan: false,
    ServiceActionPlanDate: "",
    AIRSCollateralInformation: false,
    AIRSCollateralInformationDate: "",
    AIRSFinancialInformation: false,
    AIRSFinancialInformationDate: "",
    AIRSHIVAIDSRiskHistory: false,
    AIRSHIVAIDSRiskHistoryDate: "",
    AIRSHCVHistory: false,
    AIRSHCVHistoryDate: "",
    AIRSHousingInformation: false,
    AIRSHousingInformationDate: "",
    AIRSInsuranceInformation: false,
    AIRSInsuranceInformationDate: "",
    AIRSSubstanceUseHistory: false,
    AIRSSubstanceUseHistoryDate: "",
    LNEClientRights: false,
    LNEClientRightsDate: "",
    LNEClientGrievancePolicyProcedure: false,
    LNEClientGrievancePolicyProcedureDate: "",
    LNEProgramRules: false,
    LNEProgramRulesDate: "",
    LNEEmergencyContactConsent: false,
    LNEEmergencyContactConsentDate: "",
    LNEConsentForReleaseOfConfidentialInformation: false,
    LNEConsentForReleaseOfConfidentialInformationDate: "",
    HIPPAConsentForm: false,
    HIPPAConsentFormDate: "",
    NYCDOHMHNoticeOfPrivacyPractices: false,
    NYCDOHMHNoticeOfPrivacyPracticesDate: "",
    
    LinkageRetentionAdherenceForms: false,
    LinkageRetentionAdherenceFormsDate : "",
    InternalReferralInformation: false,
    InternalReferralInformationDate: "",
    LNEClientReferralForm: false,
    LNEClientReferralFormDate: "",
    
    HNSEligibilityForm: false,
    HNSEligibilityFormDate: "",
    HNSReadinessForm: false,
    HNSReadinessFormDate: "",
    SupportGroups: false,
    SupportGroupsDate: "",
    IDGForm: false,
    IDGFormDate: "",
    progressNote:"",
    progressNoteDate:"",

    StatusChangesForm:false,
    StatusChangesFormDate:"",
    ComprehensiveRiskBehaviorAssessmentUpdates:false,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate:"",
    M11QForm :false,
    M11QFormDate:"",
    CD4VLReports:false,
    CD4VLReportsDate:"",
    InitialTreatmentAdherenceIntake:false,
    InitialTreatmentAdherenceIntakeDate :"",
    TreatmentAdherenceUpdates:false,
    TreatmentAdherenceUpdatesDate:"",
    AirsDrugRegimen:false,
    AirsDrugRegimenDate:"",
    AirsHIVMedicalProvider:false,
    AirsHIVMedicalProviderDate:"",
    AIRSHIVStatusHistory:false,
    AIRSHIVStatusHistoryDate:"",

    clientUniqueId:data[0]?.id,

    // Added on 2024/09/04 
    SocialDeterminatsOfHealthAssesment: false,
    SocialDeterminatsOfHealthAssesmentDate: "",
    ChlamydiaLaboratoryPsychologicalTestsInformation: false,
    ChlamydiaLaboratoryPsychologicalTestsInformationDate: "",
    SyphilisLaboratoryPsychologicalTestsInformation: false,
    SyphilisLaboratoryPsychologicalTestsInformationDate: "",
    GonorrheaLaboratoryPsychologicalTestsInformation: false,
    GonorrheaLaboratoryPsychologicalTestsInformationDate: "",
  });

  console.log("client data create form", clientData)

  const todaysDate = new Date();

const handleMsaform = ()=> {
  setIsSaving(true);
  setTimeout(() => {
    setIsSaving(false);
  }, 3000);
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/create_msa_form`, {
        clientData
      })
      .then(function (response) {
        if(response.status===200 || response.statusText==='Ok'){
          notifyMessage('ok')
          setTimeout(()=>{
            router.push(`/clients/${clientData.clientId}/profile`)
          },2300)
        } 
      })
      .catch(function (error) {
        notifyMessage('fail')
        setIsSaving(false);
            console.log("error del server",error)
      });
}


  return (
    <>
    <ToastContainer autoClose={2000} />
      <Layout>


        <SubHeader pageTitle={'MSA FORM'}/>

        

        <div className="container mx-auto bg-white mt-10 rounded-md shadow-md border-blue divide-y-2 divide-blue-300">

        
        <ClientInfoTopHeader
              data={data}
              clientData={clientData}
              setClientData={setClientData}
              stateValue='dateFormReviewed'
            />
     
          <section
            id="form"
            className=" px-10 pt-6 mb-5"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-1`}
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
                /* disabled={clientData.AIRSIntakeFormDate ? true : false} */ 
                />
              </div>
              <div>
                <p className="text-lg">AIRS Intake Form <span className="text-red-500">*</span></p>
              </div>
              <div className="text-center">
                 
                <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.AIRSIntakeFormDate &&
                    clientData.AIRSIntakeFormDate
                  }
                  /* disabled={clientData.AIRSIntakeFormDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1  my-2`}
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
                />
              </div>
              <div>
                <p className="text-lg">Comprehensive Risk Behavior Assessment <span className="text-red-500">*</span> </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessment"
                  value={
                    clientData.ComprehensiveRiskBehaviorAssessmentDate &&
                    clientData.ComprehensiveRiskBehaviorAssessmentDate
                  }
                  /* disabled={clientData.ComprehensiveRiskBehaviorAssessmentDate ? true: false} */
                  className=" rounded p-2 border"
                  onChange={(e) => {
                    if(clientData.ComprehensiveRiskBehaviorAssessmentDate){
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-pink-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="HNSEligibilityForm"
                  value={
                    clientData.HNSEligibilityFormDate &&
                    clientData.HNSEligibilityFormDate
                  }
                  // disabled={clientData.HNSEligibilityFormDate ? true: false}
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                {/* <input
                  type="checkbox"
                  name=""
                  id=""
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
                /> */}
              </div>
              <div>
                <p className="ml-4 text-lg">Service Action Plan  </p>
              </div>
              <div className="text-center">
              {clientData.ServiceActionPlanDate ?  <p className="bg-white inline-block px-5 py-1 "> 
                   {clientData.ServiceActionPlanDate.split('T')[0]}</p>: <p className="bg-white inline-block px-5 py-1 ">MM/DD/YYYY</p>}
                {/* <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.ServiceActionPlanDate &&
                    clientData.ServiceActionPlanDate
                  }
                  disabled={clientData.ServiceActionPlanDate ? true: false}
                  className=" rounded p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            {/* <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                {/* <input
                  type="checkbox"
                  name=""
                  id=""
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
                <p className="text-lg">Progress Note </p>
              </div>
              <div className="text-center">
              {clientData.progressNote ?  <p className="bg-white inline-block px-5 py-1 "> 
                   {clientData.progressNoteDate.split('T')[0]}</p>: <p className="bg-white inline-block px-5 py-1 ">MM/DD/YYYY</p>}
                {/* <input
                  type="date"
                  id="AIRSIntakeForm"
                  value={
                    clientData.ServiceActionPlanDate &&
                    clientData.ServiceActionPlanDate
                  }
                  disabled={clientData.ServiceActionPlanDate ? true: false}
                  className=" rounded p-2 border"
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
            </div> */}

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <p className="text-lg">Status Changes/Closure Forms</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSCollateralInformation"
                  value={
                    clientData.StatusChangesFormDate &&
                    clientData.StatusChangesFormDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate &&
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className=" rounded p-2 border"
                  onChange={(e) => {
                    if(clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate ){
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate: e.target.value,
                        ComprehensiveRiskBehaviorAssessmentUpdates :
                          !clientData.ComprehensiveRiskBehaviorAssessmentUpdates                                           ,
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
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
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.M11QFormDate &&
                    clientData.M11QFormDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.CD4VLReportsDate==="" || clientData.CD4VLReports===null ? (
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
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.CD4VLReportsDate &&
                    clientData.CD4VLReportsDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.InitialTreatmentAdherenceIntakeDate==="" || clientData.InitialTreatmentAdherenceIntake ===null ? (
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
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.InitialTreatmentAdherenceIntakeDate &&
                    clientData.InitialTreatmentAdherenceIntakeDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.TreatmentAdherenceUpdatesDate==="" || clientData.TreatmentAdherenceUpdates ===null ? (
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
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.TreatmentAdherenceUpdatesDate &&
                    clientData.TreatmentAdherenceUpdatesDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="AIRSCollateralInformation"
                  value={
                    clientData.AIRSCollateralInformationDate &&
                    clientData.AIRSCollateralInformationDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.AirsDrugRegimenDate==="" || clientData.AirsDrugRegimen ===null ? (
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
                <input
                  type="date"
                  id="AirsDrugRegimen"
                  value={
                    clientData.AirsDrugRegimenDate &&
                    clientData.AirsDrugRegimenDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="AIRSFinancialInformation"
                  value={
                    clientData.AIRSFinancialInformationDate &&
                    clientData.AIRSFinancialInformationDate
                  }
                 /*  disabled={clientData.AIRSFinancialInformation ? true: false} */
                  className=" rounded p-2 border"
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
              <img src={'/dropbox_folder.svg'} alt="" width="34"/>
                </a>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="AIRSHIVAIDSRiskHistory"
                  value={
                    clientData.AIRSHIVAIDSRiskHistoryDate &&
                    clientData.AIRSHIVAIDSRiskHistoryDate
                  }
                  /* disabled={clientData.AIRSHIVAIDSRiskHistoryDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.AirsHIVMedicalProviderDate==="" || clientData.AirsHIVMedicalProvider ===null ? (
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
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.AirsHIVMedicalProviderDate &&
                    clientData.AirsHIVMedicalProviderDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>{
                    clientData.AIRSHIVStatusHistoryDate ==="" || clientData.AIRSHIVStatusHistory ===null ? (
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
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  value={
                    clientData.AIRSHIVStatusHistoryDate &&
                    clientData.AIRSHIVStatusHistoryDate
                  }
                  /* disabled={clientData.AIRSCollateralInformationDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  value={
                    clientData.AIRSHCVHistoryDate &&
                    clientData.AIRSHCVHistoryDate
                  }
                  /* disabled={clientData.AIRSHCVHistoryDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="AIRSHousingInformation"
                  value={
                    clientData.AIRSHousingInformationDate &&
                    clientData.AIRSHousingInformationDate
                  }
                  /* disabled={clientData.AIRSHousingInformationDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="AIRSInsuranceInformation"
                  value={
                    clientData.AIRSInsuranceInformationDate &&
                    clientData.AIRSInsuranceInformationDate
                  }
                  /* disabled={clientData.AIRSInsuranceInformationDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="AIRSSubstanceUseHistory"
                  value={
                    clientData.AIRSSubstanceUseHistoryDate &&
                    clientData.AIRSSubstanceUseHistoryDate
                  }
                  /* disabled={clientData.AIRSSubstanceUseHistoryDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.SocialDeterminatsOfHealthAssesmentDate==="" || clientData.SocialDeterminatsOfHealthAssesmentDate===null ? (
                    setClientData({
                      ...clientData,
                      SocialDeterminatsOfHealthAssesment:
                        !clientData.SocialDeterminatsOfHealthAssesment,
                        SocialDeterminatsOfHealthAssesmentDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      SocialDeterminatsOfHealthAssesment:
                        !clientData.SocialDeterminatsOfHealthAssesment,
                      SocialDeterminatsOfHealthAssesmentDate: ''
                    })
                  }}
                  checked={clientData.SocialDeterminatsOfHealthAssesment? true : false}
                />
              </div>
              <div>
                <p className="text-lg">Social Determinants of Health Assessment</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="SocialDeterminatsOfHealthAssesment"
                  value={
                    clientData.SocialDeterminatsOfHealthAssesmentDate &&
                    clientData.SocialDeterminatsOfHealthAssesmentDate
                  }
                  /* disabled={clientData.SocialDeterminatsOfHealthAssesmentDate ? true: false} */
                  className=" rounded p-2 border"
                  onChange={(e) => {
                    if(clientData.SocialDeterminatsOfHealthAssesment){
                      setClientData({
                        ...clientData,
                        SocialDeterminatsOfHealthAssesmentDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        SocialDeterminatsOfHealthAssesmentDate: e.target.value,
                        SocialDeterminatsOfHealthAssesment:
                          !clientData.SocialDeterminatsOfHealthAssesment,
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.ChlamydiaLaboratoryPsychologicalTestsInformationDate==="" || clientData.ChlamydiaLaboratoryPsychologicalTestsInformationDate===null ? (
                    setClientData({
                      ...clientData,
                      ChlamydiaLaboratoryPsychologicalTestsInformation:
                        !clientData.ChlamydiaLaboratoryPsychologicalTestsInformation,
                        ChlamydiaLaboratoryPsychologicalTestsInformationDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      ChlamydiaLaboratoryPsychologicalTestsInformation:
                        !clientData.ChlamydiaLaboratoryPsychologicalTestsInformation,
                      ChlamydiaLaboratoryPsychologicalTestsInformationDate: ''
                    })
                  }}
                  checked={clientData.ChlamydiaLaboratoryPsychologicalTestsInformation? true : false}
                />
              </div>
              <div>
                <p className="text-lg">Chlamydia - Laboratory & Psychological Tests Information</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ChlamydiaLaboratoryPsychologicalTestsInformation"
                  value={
                    clientData.ChlamydiaLaboratoryPsychologicalTestsInformationDate &&
                    clientData.ChlamydiaLaboratoryPsychologicalTestsInformationDate
                  }
                  /* disabled={clientData.ChlamydiaLaboratoryPsychologicalTestsInformationDate ? true: false} */
                  className=" rounded p-2 border"
                  onChange={(e) => {
                    if(clientData.ChlamydiaLaboratoryPsychologicalTestsInformation){
                      setClientData({
                        ...clientData,
                        ChlamydiaLaboratoryPsychologicalTestsInformationDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        ChlamydiaLaboratoryPsychologicalTestsInformationDate: e.target.value,
                        ChlamydiaLaboratoryPsychologicalTestsInformation:
                          !clientData.ChlamydiaLaboratoryPsychologicalTestsInformation,
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.SyphilisLaboratoryPsychologicalTestsInformationDate==="" || clientData.SyphilisLaboratoryPsychologicalTestsInformationDate===null ? (
                    setClientData({
                      ...clientData,
                      SyphilisLaboratoryPsychologicalTestsInformation:
                        !clientData.SyphilisLaboratoryPsychologicalTestsInformation,
                        SyphilisLaboratoryPsychologicalTestsInformationDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      SyphilisLaboratoryPsychologicalTestsInformation:
                        !clientData.SyphilisLaboratoryPsychologicalTestsInformation,
                      SyphilisLaboratoryPsychologicalTestsInformationDate: ''
                    })
                  }}
                  checked={clientData.SyphilisLaboratoryPsychologicalTestsInformation? true : false}
                />
              </div>
              <div>
                <p className="text-lg">Syphilis - Laboratory & Psychological Tests Information</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="SyphilisLaboratoryPsychologicalTestsInformation"
                  value={
                    clientData.SyphilisLaboratoryPsychologicalTestsInformationDate &&
                    clientData.SyphilisLaboratoryPsychologicalTestsInformationDate
                  }
                  /* disabled={clientData.SyphilisLaboratoryPsychologicalTestsInformationDate ? true: false} */
                  className=" rounded p-2 border"
                  onChange={(e) => {
                    if(clientData.SyphilisLaboratoryPsychologicalTestsInformation){
                      setClientData({
                        ...clientData,
                        SyphilisLaboratoryPsychologicalTestsInformationDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        SyphilisLaboratoryPsychologicalTestsInformationDate: e.target.value,
                        SyphilisLaboratoryPsychologicalTestsInformation:
                          !clientData.SyphilisLaboratoryPsychologicalTestsInformation,
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-blue-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.GonorrheaLaboratoryPsychologicalTestsInformationDate==="" || clientData.GonorrheaLaboratoryPsychologicalTestsInformationDate===null ? (
                    setClientData({
                      ...clientData,
                      GonorrheaLaboratoryPsychologicalTestsInformation:
                        !clientData.GonorrheaLaboratoryPsychologicalTestsInformation,
                        GonorrheaLaboratoryPsychologicalTestsInformationDate:crearFecha()
                    })):setClientData({
                      ...clientData,
                      GonorrheaLaboratoryPsychologicalTestsInformation:
                        !clientData.GonorrheaLaboratoryPsychologicalTestsInformation,
                      GonorrheaLaboratoryPsychologicalTestsInformationDate: ''
                    })
                  }}
                  checked={clientData.GonorrheaLaboratoryPsychologicalTestsInformation? true : false}
                />
              </div>
              <div>
                <p className="text-lg">Gonorrhea - Laboratory & Psychological Tests Information</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="GonorrheaLaboratoryPsychologicalTestsInformation"
                  value={
                    clientData.GonorrheaLaboratoryPsychologicalTestsInformationDate &&
                    clientData.GonorrheaLaboratoryPsychologicalTestsInformationDate
                  }
                  /* disabled={clientData.GonorrheaLaboratoryPsychologicalTestsInformationDate ? true: false} */
                  className=" rounded p-2 border"
                  onChange={(e) => {
                    if(clientData.GonorrheaLaboratoryPsychologicalTestsInformation){
                      setClientData({
                        ...clientData,
                        GonorrheaLaboratoryPsychologicalTestsInformationDate: e.target.value,
                      });
                    } else {
                      setClientData({
                        ...clientData,
                        GonorrheaLaboratoryPsychologicalTestsInformationDate: e.target.value,
                        GonorrheaLaboratoryPsychologicalTestsInformation:
                          !clientData.GonorrheaLaboratoryPsychologicalTestsInformation,
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="LNEClientRights"
                  value={
                    clientData.LNEClientRightsDate &&
                    clientData.LNEClientRightsDate
                  }
                  /* disabled={clientData.LNEClientRightsDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  value={
                    clientData.LNEClientGrievancePolicyProcedureDate &&
                    clientData.LNEClientGrievancePolicyProcedureDate
                  }
                  /* disabled={clientData.LNEClientGrievancePolicyProcedureDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  value={
                    clientData.LNEProgramRulesDate &&
                    clientData.LNEProgramRulesDate
                  }
                  /* disabled={clientData.LNEProgramRulesDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  value={
                    clientData.LNEEmergencyContactConsentDate &&
                    clientData.LNEEmergencyContactConsentDate
                  }
                  /* disabled={clientData.LNEEmergencyContactConsentDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="LNEConsentForReleaseOfConfidentialInformation"
                  value={
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate &&
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate
                  }
                  /* disabled={clientData.LNEConsentForReleaseOfConfidentialInformationDate ? true: false} */
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="HIPPAConsentForm"
                  value={
                    clientData.HIPPAConsentFormDate &&
                    clientData.HIPPAConsentFormDate
                  }
                  // disabled={clientData.HIPPAConsentFormDate ? true: false}
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-green-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="NYCDOHMHNoticeOfPrivacyPractices"
                  value={
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate &&
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate
                  }
                  // disabled={clientData.NYCDOHMHNoticeOfPrivacyPracticesDate ? true: false}
                  className=" rounded p-2 border"
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

            <div className={`${MSAStyles.formRowsContainer} msa-table-light-light-pink-bg grid gap-5 py-1  my-2`}>
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="LinkageRetentionAdherenceForms"
                  value={
                    clientData.LinkageRetentionAdherenceFormsDate &&
                    clientData.LinkageRetentionAdherenceFormsDate
                  }
                  // disabled={clientData.LinkageRetentionAdherenceFormsDate ? true: false}
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-pink-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="LNEOutreachRetentionTrackingForm"
                  value={
                    clientData.InternalReferralInformationDate &&
                    clientData.InternalReferralInformationDate
                  }
                  // disabled={clientData.InternalReferralInformationDate ? true: false}
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-light-pink-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="LNEClientReferralForm"
                  value={
                    clientData.LNEClientReferralFormDate &&
                    clientData.LNEClientReferralFormDate
                  }
                  // disabled={clientData.LNEClientReferralFormDate ? true: false}
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-pink-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="HNSReadinessForm"
                  value={
                    clientData.HNSReadinessFormDate &&
                    clientData.HNSReadinessFormDate
                  }
                  // disabled={clientData.HNSReadinessFormDate ? true: false}
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-pink-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="SupportGroups"
                  value={
                    clientData.SupportGroupsDate &&
                    clientData.SupportGroupsDate
                  }
                  // disabled={clientData.SupportGroupsDate ? true: false}
                  className=" rounded p-2 border"
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
              className={`${MSAStyles.formRowsContainer} msa-table-light-pink-bg grid gap-5 py-1  my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
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
                <input
                  type="date"
                  id="IDGForm"
                  value={
                    clientData.IDGFormDate &&
                    clientData.IDGFormDate
                  }
                  // disabled={clientData.IDGFormDate ? true: false}
                  className=" rounded p-2 border"
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
        {isSaving ? (
              <center>
                <Loader />
              </center>
            ) : (
            <div className="container mx-auto flex justify-center">
              <button
                className="btn-yellow px-5 py-3 flex items-center font-medium text-lg gap-3 px-5 rounded shadow inline-block"
                onClick={() => handleMsaform()}
              >
                <img src="/msa/save_and_finish.svg" alt="save icon" width={20}/>
                Save and Update
              </button>
            </div>
             )}
          </section>
      </Layout>
    </>
  );
};

export default Index;

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