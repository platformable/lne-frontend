import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Styles from "../../../../styles/ServiceAP.module.css";
import MSAStyles from "../../../../styles/MSA.module.css";
import axios from 'axios'
import { useRouter } from 'next/router'

const EditMsaFormPage = ({ data }) => {
   const router = useRouter()

    
  const [clientData, setClientData] = useState({
    dateFormReviewed:new Date(),
    clientId: data[0].clientid,
    clientFirstName: data[0].clientfirstname,
    clientLastName: data[0].clientlastname,
    clientHCWID: data[0].clienthcwid,
    planStartDate: "",
    userFirstName: data[0].userfirstname,
    userLastName: data[0].userlastname,
    AIRSIntakeForm: data[0].airsintakeform,
    AIRSIntakeFormDate: data[0].airsintakeformdate,
    ComprehensiveRiskBehaviorAssessment: data[0].comprehensiveriskbehaviorassessment,
    ComprehensiveRiskBehaviorAssessmentDate:data[0].comprehensiveriskbehaviorassessmentdate,
    ServiceActionPlan: data[0].serviceactionplan,
    ServiceActionPlanDate:  data[0].serviceactionplandate,
    AIRSCollateralInformation: data[0].airscollateralinformation,
    AIRSCollateralInformationDate:data[0].airscollateralinformationdate,
    AIRSFinancialInformation: data[0].airsfinancialinformation,
    AIRSFinancialInformationDate: data[0].airsfinancialinformationdate,
    AIRSHIVAIDSRiskHistory: data[0].AIRSHIVAIDSRiskHistory,
    AIRSHIVAIDSRiskHistoryDate: data[0].AIRSHIVAIDSRiskHistorydate,
    AIRSHCVHistory: data[0].AIRSHCVHistory,
    AIRSHCVHistoryDate: data[0].AIRSHCVHistorydate,
    AIRSHousingInformation: data[0].AIRSHousingInformation,
    AIRSHousingInformationDate: data[0].AIRSHousingInformationdate,
    AIRSInsuranceInformation: data[0].AIRSInsuranceInformation,
    AIRSInsuranceInformationDate: data[0].AIRSInsuranceInformationdate,
    AIRSSubstanceUseHistory: data[0].AIRSSubstanceUseHistory,
    AIRSSubstanceUseHistoryDate: data[0].AIRSSubstanceUseHistorydate,
    LNEClientRights: data[0].LNEClientRights,
    LNEClientRightsDate: data[0].LNEClientRightsDate,
    LNEClientGrievancePolicyProcedure: data[0].LNEClientGrievancePolicyProcedure,
    LNEClientGrievancePolicyProcedureDate: data[0].LNEClientGrievancePolicyProcedureDate,
    LNEProgramRules: data[0].LNEProgramRules,
    LNEProgramRulesDate: data[0].LNEProgramRulesDate,
    LNEEmergencyContactConsent: data[0].LNEEmergencyContactConsent,
    LNEEmergencyContactConsentDate: data[0].LNEEmergencyContactConsentDate,
    LNEConsentForReleaseOfConfidentialInformation: data[0].LNEConsentForReleaseOfConfidentialInformation,
    LNEConsentForReleaseOfConfidentialInformationDate: data[0].LNEConsentForReleaseOfConfidentialInformationDate,
    HIPPAConsentForm: data[0].HIPPAConsentForm,
    HIPPAConsentFormDate: data[0].HIPPAConsentFormDate,
    NYCDOHMHNoticeOfPrivacyPractices: data[0].NYCDOHMHNoticeOfPrivacyPractices,
    NYCDOHMHNoticeOfPrivacyPracticesDate: data[0].NYCDOHMHNoticeOfPrivacyPracticesDate,
    LNEOutreachRetentionTrackingForm: data[0].LNEOutreachRetentionTrackingForm,
    LNEOutreachRetentionTrackingFormDate: data[0].LNEOutreachRetentionTrackingFormDate,
    LNEReferralInformation: data[0].LNEReferralInformation,
    LNEReferralInformationDate: data[0].LNEReferralInformationDate,
    LNEClientReferralForm: data[0].LNEClientReferralForm,
    LNEClientReferralFormDate: data[0].LNEClientReferralFormDate,
    LNEHNSEligibilityForm: data[0].LNEHNSEligibilityForm,
    LNEHNSEligibilityFormDate: data[0].LNEHNSEligibilityFormDate
  });

  const todaysDate = new Date();

  console.log("clientData",clientData)
/* 
  console.log("clientdata",clientData) */

const handleMsaform = ()=> {

    axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/create_msa_form`, {
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
                    <p>{todaysDate.toLocaleDateString()}</p>
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
            Forms - checkmark if documents was added to clients file
          </h6>
          <section
            id="form"
            className="gap-x-5 border-dark-blue rounded-xl p-5 mb-5"
          >
            {/* {TABLE HEAD} */}
            <p className="text-xs"><span className="text-red-500">*</span> Mandatory fields (Please, fil out these forms to complete the process)</p>
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
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      AIRSIntakeForm: !clientData.AIRSIntakeForm,
                    })
                  }
                  checked={clientData.AIRSIntakeForm==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSIntakeFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessment:
                        !clientData.ComprehensiveRiskBehaviorAssessment,
                    })
                  }
                  checked={clientData.ComprehensiveRiskBehaviorAssessment==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessmentDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      ServiceActionPlan: !clientData.ServiceActionPlan,
                    })
                  }
                  checked={clientData.ServiceActionPlan==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      ServiceActionPlanDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      AIRSCollateralInformation:
                        !clientData.AIRSCollateralInformation,
                    })
                  }
                  checked={clientData.AIRSCollateralInformation==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSCollateralInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      AIRSFinancialInformation:
                        !clientData.AIRSFinancialInformation,
                    })
                  }
                  checked={clientData.AIRSFinancialInformation==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSFinancialInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      AIRSHIVAIDSRiskHistory:
                        !clientData.AIRSHIVAIDSRiskHistory,
                    })
                  }
                  checked={clientData.AIRSHIVAIDSRiskHistory==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHIVAIDSRiskHistoryDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      AIRSHCVHistory: !clientData.AIRSHCVHistory,
                    })
                  }
                  checked={clientData.AIRSHCVHistory==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHCVHistoryDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      AIRSHousingInformation:
                        !clientData.AIRSHousingInformation,
                    })
                  }
                  checked={clientData.AIRSHousingInformation==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHousingInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      AIRSInsuranceInformation:
                        !clientData.AIRSInsuranceInformation,
                    })
                  }
                  checked={clientData.AIRSInsuranceInformation==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSInsuranceInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-blue grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      AIRSSubstanceUseHistory:
                        !clientData.AIRSSubstanceUseHistory,
                    })
                  }
                  checked={clientData.AIRSSubstanceUseHistory==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSSubstanceUseHistoryDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      LNEClientRights: !clientData.LNEClientRights,
                    })
                  }
                  checked={clientData.LNEClientRights==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientRightsDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      LNEClientGrievancePolicyProcedure:
                        !clientData.LNEClientGrievancePolicyProcedure,
                    })
                  }
                  checked={clientData.LNEClientGrievancePolicyProcedure==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientGrievancePolicyProcedureDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      LNEProgramRules: !clientData.LNEProgramRules,
                    })
                  }
                  checked={clientData.LNEProgramRules==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEProgramRulesDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      LNEEmergencyContactConsent:
                        !clientData.LNEEmergencyContactConsent,
                    })
                  }
                  checked={clientData.LNEEmergencyContactConsent==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEEmergencyContactConsentDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      LNEConsentForReleaseOfConfidentialInformation:
                        !clientData.LNEConsentForReleaseOfConfidentialInformation,
                    })
                  }
                  checked={clientData.LNEConsentForReleaseOfConfidentialInformation==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEConsentForReleaseOfConfidentialInformationDate:
                        e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      HIPPAConsentForm: !clientData.HIPPAConsentForm,
                    })
                  }
                  checked={clientData.HIPPAConsentForm==="1" ? 'checked' : ''}
                />
              </div>
              <div>
                <p>HIPPA Consent Form (OCA Form 960)</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HIPPAConsentForm"
                  value={
                    clientData.HIPPAConsentFormDate &&
                    clientData.HIPPAConsentFormDate.split('T')[0]
                  }
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      HIPPAConsentFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-green grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      NYCDOHMHNoticeOfPrivacyPractices:
                        !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                    })
                  }
                  checked={clientData.NYCDOHMHNoticeOfPrivacyPractices==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      NYCDOHMHNoticeOfPrivacyPracticesDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-pink grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      LNEOutreachRetentionTrackingForm:
                        !clientData.LNEOutreachRetentionTrackingForm,
                    })
                  }
                  checked={clientData.LNEOutreachRetentionTrackingForm==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEOutreachRetentionTrackingFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-pink grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      LNEReferralInformation:
                        !clientData.LNEReferralInformation,
                    })
                  }
                  checked={clientData.LNEReferralInformation==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEReferralInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-pink grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      LNEClientReferralForm: !clientData.LNEClientReferralForm,
                    })
                  }
                  checked={clientData.LNEClientReferralForm==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientReferralFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`${MSAStyles.formRowsContainer} bg-light-purple grid gap-5 py-2 rounded-lg my-2`}
            >
              <div className="form-row-item px-5">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() =>
                    setClientData({
                      ...clientData,
                      LNEHNSEligibilityForm: !clientData.LNEHNSEligibilityForm,
                    })
                  }
                  checked={clientData.LNEHNSEligibilityForm==="1" ? 'checked' : ''}
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
                  className="rounded-lg text-sm p-1"
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEHNSEligibilityFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="text-center flex justify-center">
                <svg
                  width="18"
                  height="18"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11V4.6C2 4.26863 2.26863 4 2.6 4H8.77805C8.92127 4 9.05977 4.05124 9.16852 4.14445L12.3315 6.85555C12.4402 6.94876 12.5787 7 12.722 7H21.4C21.7314 7 22 7.26863 22 7.6V11M2 11V19.4C2 19.7314 2.26863 20 2.6 20H21.4C21.7314 20 22 19.7314 22 19.4V11M2 11H22"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </section>

          <section id="save" className="my-5">
            <div className="container mx-auto flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5"

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
