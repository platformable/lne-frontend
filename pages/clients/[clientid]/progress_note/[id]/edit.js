import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Styles from "../../../../../styles/ServiceAP.module.css";
import ProgressNotesStyles from "../../../../../styles/ProgressNotes.module.css";
import MSAStyles from "../../../../../styles/MSA.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import ImpactTrackerModal from "../../../../../components/ImpactTrackerModal";
import BackButton from "../../../../../components/BackButton";
import BackToDashboardButton from "../../../../../components/BackToDashboardButton";
import ProgressNoteToPrint from "../../../../../components/ProgressNoteToPrint";
import ReactToPrint from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProgressNotesIndex = ({ data, id }) => {
  const router = useRouter();
  console.log("data", data);
  const [showImpactTrackerModal, setShowImpactTrackerModal] = useState(false);
  const [progressNoteId, setProgressNoteId] = useState("");
  let componentRef = useRef();
  const notifyMessage = () => {
    toast.success("Progress Note Saved!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const crearFecha = () => {
    const initialDate = new Date().toLocaleDateString();
    const newDate = initialDate.split("/");
    let fixedDate;
    if (typeof window !== "undefined") {
      const userLocale = window.navigator.language;
      userLocale === "en-US"
        ? (fixedDate = `${newDate[2]}-${
            newDate[0].length === 1 ? `0${newDate[0]}` : `${newDate[0]}`
          }-${newDate[1].length === 1 ? `0${newDate[1]}` : `${newDate[1]}`}`)
        : (fixedDate = `${newDate[2]}-${
            newDate[1].length === 1 ? `0${newDate[1]}` : `${newDate[1]}`
          }-${newDate[0].length === 1 ? `0${newDate[0]}` : `${newDate[0]}`}`);
    }
    return fixedDate;
  };

  const setLocaleDateString = (date) => {
    const fecha = Date.parse(date);
    const newDate = new Date(fecha)
      .toLocaleDateString()
      .replace("/", "-")
      .replace("/", "-");
    const separatedDate = newDate.split("-");
    const finalDate = `${separatedDate[2]}-${
      separatedDate[1]?.length === 1 ? `0${separatedDate[1]}` : separatedDate[1]
    }-${
      separatedDate[0]?.length === 1 ? `0${separatedDate[0]}` : separatedDate[0]
    }`;
    return finalDate;
  };
  const [clientData, setClientData] = useState({
    progressNoteId: Number(id),
    clientId: data[0]?.clientid,
    clientFirstName: data[0]?.clientfirstname,
    clientLastName: data[0]?.clientlastname,
    clientHCWID: data[0]?.clienthcwid,
    userFirstName: data[0]?.userfirstname,
    userLastName: data[0]?.userlastname,
    progressNoteDate: data[0]?.progressnotedate || "",
    developmentActionPlan:
      data[0]?.developmentactionplan === "1" ? true : false,
    CD4VLLabReport: data[0]?.cd4vllabreport === "1" ? true : false,
    transportationCoordination:
      data[0]?.transportationcoordination === "1" ? true : false,
    translationInterpretation:
      data[0]?.translationinterpretation === "1" ? true : false,
    comprehensiveBehavioralRiskAssessment:
      data[0]?.comprehensivebehavioralriskassessment === "1" ? true : false,
    ticklerUpdate: data[0]?.ticklerupdate === "1" ? true : false,
    treatmentEducation: data[0]?.treatmenteducation === "1" ? true : false,
    preventionCounselling:
      data[0]?.preventioncounselling === "1" ? true : false,
    supportiveCounselling:
      data[0]?.supportivecounselling === "1" ? true : false,
    escort: data[0]?.escort === "1" ? true : false,
    caseClosureDischarge: data[0]?.caseclosuredischarge === "1" ? true : false,
    linkageToServices: data[0]?.linkagetoservices === "1" ? true : false,
    OtherAssistance: data[0]?.otherassistance === "1" ? true : false,
    goal1Progress: data[0]?.goal1progress === "1" ? true : false,
    goal1ProgressDate: data[0]?.goal1progressdate || "",
    goal2Progress: data[0]?.goal2progress === "1" ? true : false,
    goal2ProgressDate: data[0]?.goal2progressdate || "",
    goal3Progress: data[0]?.goal3progress === "1" ? true : false,
    goal3ProgressDate: data[0]?.goal3progressdate || "",
    goal1Completed: data[0]?.goal1completed === "1" ? true : false,
    goal1CompletedDate: data[0]?.goal1completeddate || "",
    goal2Completed: data[0]?.goal2completed === "1" ? true : false,
    goal2CompletedDate: data[0]?.goal2completeddate || "",
    goal3Completed: data[0]?.goal3completed === "1" ? true : false,
    goal3CompletedDate: data[0]?.goal3completeddate || "",
    StatusChangesForm: data[0]?.statuschangesform === "1" ? true : false, // agregar db
    StatusChangesFormDate: data[0]?.statuschangesformdate || null, // agregar db
    ComprehensiveRiskBehaviorAssessmentUpdates:
      data[0]?.comprehensiveriskbehaviorassessmentupdates === "1"
        ? true
        : false,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate:
      data[0]?.comprehensiveriskbehaviorassessmentupdatesdate || null,

    M11QForm: data[0]?.m11qform === "1" ? true : false, // agregar db
    M11QFormDate: data[0]?.m11qformdate || null, // agregar db
    CD4VLReports: data[0]?.cd4vlreports === "1" ? true : false, // agregar db
    CD4VLReportsDate: data[0]?.cd4vlreportsdate || null, // agregar db
    InitialTreatmentAdherenceIntake:
      data[0]?.initialtreatmentadherenceintake === "1" ? true : false, // agregar db
    InitialTreatmentAdherenceIntakeDate:
      data[0]?.initialtreatmentadherenceintakedate || null, // agregar db
    TreatmentAdherenceUpdates:
      data[0]?.treatmentadherenceupdates === "1" ? true : false, // agregar db
    TreatmentAdherenceUpdatesDate:
      data[0]?.treatmentadherenceupdatesdate || null, // agregar db
    AIRSCollateralInformation:
      data[0]?.airscollateralinformation === "1" ? true : false,
    AIRSCollateralInformationDate: data[0]?.airscollateralinformationdate,
    AIRSDrugRegimen: data[0]?.airsdrugregimen === "1" ? true : false, // agregar db
    AIRSDrugRegimenDate: data[0]?.airsdrugregimendate || null, // agregar db
    AIRSFinancialInformation:
      data[0]?.airsfinancialinformation === "1" ? true : false,
    AIRSFinancialInformationDate: data[0]?.airsfinancialinformationdate,
    AIRSHIVAIDSRiskHistory:
      data[0]?.airshivaidsriskhistory === "1" ? true : false,
    AIRSHIVAIDSRiskHistoryDate: data[0]?.airshivaidsriskhistorydate || null,
    AIRSHIVStatusHistory: data[0]?.airshivstatushistory === "1" ? true : false, // agregar db
    AIRSHIVStatusHistoryDate: data[0]?.airshivstatushistorydate || null, // agregar db
    AIRSHIVMedicalProvider:
      data[0]?.airshivmedicalprovider === "1" ? true : false, // agregar db
    AIRSHIVMedicalProviderDate: data[0]?.airshivmedicalproviderdate || null, // agregar db
    AIRSHCVHistory: data[0]?.airshcvhistory === "1" ? true : false,
    AIRSHCVHistoryDate: data[0]?.airshcvhistorydate || null,
    AIRSHousingInformation:
      data[0]?.airshousinginformation === "1" ? true : false,
    AIRSHousingInformationDate: data[0]?.airshousinginformationdate || null,
    AIRSInsuranceInformation:
      data[0]?.airsinsuranceinformation === "1" ? true : false,
    AIRSInsuranceInformationDate: data[0]?.airsinsuranceinformationdate,
    AIRSSubstanceUseHistory:
      data[0]?.airssubstanceusehistory === "1" ? true : false,
    AIRSSubstanceUseHistoryDate: data[0]?.airssubstanceusehistorydate,
    LNEClientRights: data[0]?.lneclientrights === "1" ? true : false,
    LNEClientRightsDate: data[0]?.lneclientrightsdate,
    LNEClientGrievancePolicyProcedure:
      data[0]?.lneclientgrievancepolicyprocedure === "1" ? true : false,
    LNEClientGrievancePolicyProcedureDate:
      data[0]?.lneclientgrievancepolicyproceduredate,
    LNEProgramRules: data[0]?.lneprogramrules === "1" ? true : false,
    LNEProgramRulesDate: data[0]?.lneprogramrulesdate,
    LNEEmergencyContactConsent:
      data[0]?.lneemergencycontactconsent === "1" ? true : false,
    LNEEmergencyContactConsentDate: data[0]?.lneemergencycontactconsentdate,
    LNEConsentForReleaseOfConfidentialInformation:
      data[0]?.lneconsentforreleaseofconfidentialinformation === "1"
        ? true
        : false,
    LNEConsentForReleaseOfConfidentialInformationDate:
      data[0]?.lneconsentforreleaseofconfidentialinformationdate,
    HIPPAConsentForm: data[0]?.hippaconsentform === "1" ? true : false,
    HIPPAConsentFormDate: data[0]?.hippaconsentformdate,
    NYCDOHMHNoticeOfPrivacyPractices:
      data[0]?.nycdohmhnoticeofprivacypractices === "1" ? true : false,
    NYCDOHMHNoticeOfPrivacyPracticesDate:
      data[0]?.nycdohmhnoticeofprivacypracticesdate,
    LinkageRetentionAdherenceForms:
      data[0]?.linkageretentionadherenceforms === "1" ? true : false,
    LinkageRetentionAdherenceFormsDate:
      data[0]?.linkageretentionadherenceformsdate,
    InternalReferralInformation:
      data[0]?.internalreferralinformation === "1" ? true : false,
    InternalReferralInformationDate: data[0]?.internalreferralinformationdate,
    LNEClientReferralForm:
      data[0]?.lneclientreferralform === "1" ? true : false,
    LNEClientReferralFormDate: data[0]?.lneclientreferralformdate || null,
    LNEHNSEligibilityForm:
      data[0]?.lnehnseligibilityform === "1" ? true : false,
    LNEHNSEligibilityFormDate: data[0]?.lnehnseligibilityformdate || null,
    HNSReadinessForm: data[0]?.hnsreadinessform === "1" ? true : false, 
    HNSReadinessFormDate: data[0]?.hnsreadinessformdate || null, 
    SupportGroups: data[0]?.supportgroups === "1" ? true : false, // agregar db
    SupportGroupsDate: data[0]?.supportgroupsdate || null, // agregar db
    IDGForm: data[0]?.idgform === "1" ? true : false, // agregar db
    IDGFormDate: data[0]?.idgformdate || null, // agregar db
    progressNoteText: data[0]?.progressnotetext || "",
    HCWSignature:
      data[0]?.hcwsignature === "1" ||
      data[0]?.hcwsignature === "" ||
      data[0]?.hcwsignature === null
        ? false
        : true,
    clientUniqueId: data[0]?.id,
    goal1ProgressComments: data[0]?.goal1progresscomments || "",
    goal2ProgressComments: data[0]?.goal2progresscomments || "",
    goal3ProgressComments: data[0]?.goal3progresscomments || "",
    goal1CompletionComments: data[0]?.goal1completioncomments || "",
    goal2CompletionComments: data[0]?.goal2completioncomments || "",
    goal3CompletionComments: data[0]?.goal3completioncomments || "",
  });
  console.log("form", clientData);
  const whichServiceBeenAded = [
    {
      value: clientData.LNEHNSEligibilityForm,
      state_label: "LNEHNSEligibilityForm",
      row_color: "bg-light-blue",
      form_text: "HNS Eligibility Assessment",
    },
    // {value:clientData.HNSReadinessForm ,state_label: "HNSReadinessForm",row_color: "bg-light-blue", form_text: "HNS Readiness Assessment", },
    {
      value: clientData.StatusChangesForm,
      state_label: "StatusChangesForm",
      row_color: "bg-light-blue",
      form_text: "Status Changes/Closure Forms",
    },
    {
      value: clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
      state_label: "ComprehensiveRiskBehaviorAssessmentUpdates",
      row_color: "bg-light-blue",
      form_text: "Comprehensive Behavioral Risk Assessment Updates",
    },
    {
      value: clientData.M11QForm,
      state_label: "M11QForm",
      row_color: "bg-light-blue",
      form_text: "M11Q",
    },
    {
      value: clientData.CD4VLReports,
      state_label: "CD4VLReports",
      row_color: "bg-light-blue",
      form_text: "CD4/VL Check Reports",
    },
    {
      value: clientData.InitialTreatmentAdherenceIntake,
      state_label: "InitialTreatmentAdherenceIntake",
      row_color: "bg-light-blue",
      form_text: "Initial Treatment Adherence Intake",
    },
    {
      value: clientData.TreatmentAdherenceUpdates,
      state_label: "TreatmentAdherenceUpdates",
      row_color: "bg-light-blue",
      form_text: "Treatment Adherence Updates",
    },
    {
      value: clientData.AIRSCollateralInformation,
      state_label: "AIRSCollateralInformation",
      row_color: "bg-light-blue",
      form_text: "AIRS Collateral Information",
    },
    {
      value: clientData.AIRSDrugRegimen,
      state_label: "AIRSDrugRegimen",
      row_color: "bg-light-blue",
      form_text: "AIRS Drug Regimen History",
    },
    {
      value: clientData.AIRSFinancialInformation,
      state_label: "AIRSFinancialInformation",
      row_color: "bg-light-blue",
      form_text: "AIRS Financial Information",
    },
    {
      value: clientData.AIRSHIVAIDSRiskHistory,
      state_label: "AIRSHIVAIDSRiskHistory",
      row_color: "bg-light-blue",
      form_text: "AIRS HIV AIDS Risk History",
    },
    {
      value: clientData.AIRSHIVMedicalProvider,
      state_label: "AIRSHIVMedicalProvider",
      row_color: "bg-light-blue",
      form_text: "AIRS HIV Medical Provider History",
    },
    {
      value: clientData.AIRSHIVStatusHistory,
      state_label: "AIRSHIVStatusHistory",
      row_color: "bg-light-blue",
      form_text: "AIRS HIV Status History",
    },
    {
      value: clientData.AIRSHCVHistory,
      state_label: "AIRSHCVHistory",
      row_color: "bg-light-blue",
      form_text: "AIRS HCV History",
    },
    {
      value: clientData.AIRSHousingInformation,
      state_label: "AIRSHousingInformation",
      row_color: "bg-light-blue",
      form_text: "AIRS Housing Information",
    },
    {
      value: clientData.AIRSInsuranceInformation,
      state_label: "AIRSInsuranceInformation",
      row_color: "bg-light-blue",
      form_text: "AIRS Insurance Information",
    },
    {
      value: clientData.AIRSSubstanceUseHistory,
      state_label: "AIRSSubstanceUseHistory",
      row_color: "bg-light-blue",
      form_text: "AIRS Substance Use History",
    },
    {
      value: clientData.LNEClientRights,
      state_label: "LNEClientRights",
      row_color: "bg-light-green",
      form_text: "LNE Client Rights",
    },
    {
      value: clientData.LNEClientGrievancePolicyProcedure,
      state_label: "LNEClientGrievancePolicyProcedure",
      row_color: "bg-light-green",
      form_text: "LNE Client Grievance Policy & Procedure",
    },
    {
      value: clientData.LNEProgramRules,
      state_label: "LNEProgramRules",
      row_color: "bg-light-green",
      form_text: "LNE Program Rules",
    },
    {
      value: clientData.LNEEmergencyContactConsent,
      state_label: "LNEEmergencyContactConsent",
      row_color: "bg-light-green",
      form_text: "LNE Emergency Contact Consent",
    },
    {
      value: clientData.LNEConsentForReleaseOfConfidentialInformation,
      state_label: "LNEConsentForReleaseOfConfidentialInformation",
      row_color: "bg-light-green",
      form_text: "LNE Consent for Release of Confidential Information",
    },
    {
      value: clientData.HIPPAConsentForm,
      state_label: "HIPPAConsentForm",
      row_color: "bg-light-green",
      form_text: "HIPAA Consent Form (OCA Form 960), ",
    },
    {
      value: clientData.NYCDOHMHNoticeOfPrivacyPractices,
      state_label: "NYCDOHMHNoticeOfPrivacyPractices",
      row_color: "bg-light-green",
      form_text:
        "NYC DOHMH Notice of Privacy Practices - Acknowledgement of Receipt",
    },
    {
      value: clientData.LinkageRetentionAdherenceForms,
      state_label: "LinkageRetentionAdherenceForms",
      row_color: "bg-light-pink",
      form_text: "Linkage, Retention, & Adherence Forms",
    },
    {
      value: clientData.InternalReferralInformation,
      state_label: "InternalReferralInformation",
      row_color: "bg-light-pink",
      form_text: "Internal Referral Information",
    },
    {
      value: clientData.LNEClientReferralForm,
      state_label: "LNEClientReferralForm",
      row_color: "bg-light-pink",
      form_text: "Identification",
    },
    {
      value: clientData.HNSReadinessForm,
      state_label: "HNSReadinessForm",
      row_color: "bg-light-pink",
      form_text: "HNS Readiness Form",
    },
    {
      value: clientData.SupportGroups,
      state_label: "SupportGroups",
      row_color: "bg-light-pink",
      form_text: "Support Groups",
    },
    {
      value: clientData.IDGForm,
      state_label: "IDGForm",
      row_color: "bg-light-pink",
      form_text: "IDG",
    },
  ];

  const todaysDate = new Date();
  const [serviceActionData, setServiceActionData] = useState({
    goal1servicecategory: data[0]?.goal1servicecategory,
    goal1summary: data[0]?.goal1summary,
    goal1targetdate: data[0]?.goal1targetdate,
    goal2servicecategory: data[0]?.goal2servicecategory,
    goal2summary: data[0]?.goal2summary,
    goal2targetdate: data[0]?.goal2targetdate,
    goal3servicecategory: data[0]?.goal3servicecategory,
    goal3summary: data[0]?.goal3summary,
    goal3targetdate: data[0]?.goal3targetdate,
  });

  const [dataForSAP, setDataForSAP] = useState({
    clientId: data[0]?.clientid,
    goal1Completed: clientData.goal1Completed,
    goal1CompletionDate: clientData.goal1CompletedDate,
    goal2Completed: clientData.goal1Completed,
    goal2CompletionDate: clientData.goal1CompletedDate,
    goal3Completed: clientData.goal1Completed,
    goal3CompletionDate: clientData.goal1CompletedDate,
    HCWSignature: false,
  });

  const handleMsaformUpdate = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientData.clientId}/update_msa_form_from_progress_note`,
        {
          clientData,
        }
      )
      .then(function (response) {
        if (response.status === 200 || response.statusText === "Ok") {
          console.log("msa form updated success", response);
        }
      })
      .catch(function (error) {
        console.log("an error ocurred while trying to update msa form", error);
      });
  };

  const handleServiceActionPlanFormUpdate = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/services_action_plan/${clientData.clientId}/update_sap_from_progress_note`,
        {
          clientData: dataForSAP,
        }
      )
      .then(function (response) {
        console.log("Service action plan updated successfully");
      })
      .catch(function (error) {
        console.log("an error ocurred while trying to update msa form", error);
      });
  };

  const [pnErrorMessage, setPNErrorMessage] = useState("");

  const handleProgressNote = () => {
    // if (clientData.progressNoteText === "") {
    //   setPNErrorMessage(
    //     "Please enter text to describe the progress made today"
    //   );
    // } else {
    setPNErrorMessage("");
    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes/update`, {
        clientData,
      })
      .then(function (response) {
        if (response.status === 200 || response.statusText === "OK") {
          setProgressNoteId(response.data.progress_note_id);
          handleMsaformUpdate();
          handleServiceActionPlanFormUpdate();

          console.log(response);
          notifyMessage();

          // setShowImpactTrackerModal(!showImpactTrackerModal);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Layout>
        <div className="container mx-auto">
          <h1 className="font-black text-center my-5">Progress Notes </h1>
        </div>

        <main className="container mx-auto">
          <div className="flex gap-x-5">
            <BackButton />

            <BackToDashboardButton />
          </div>
          <section id="info" className="my-5">
            <div className="">
              <h3 className="font-black my-5 text-dark-blue">
                Client Information
              </h3>
              <div
                className={`${Styles.serviceActionPlanPageInfoContainer} gap-x-5 border-dark-blue rounded-xl p-5`}
              >
                <div className="service-action-plan-page-info-box md:my-0 my-5">
                  <div className="flex gap-x-2 mb-5 items-center">
                    <img src="/calendar-icon.svg" width="24" />
                    <h3 className="font-black ">Date</h3>
                  </div>

                  <label className="block">
                    <p className="text-base">Progress note date </p>
                    <input
                      type="date"
                      name=""
                      id=""
                      className="border-black px-1 rounded-md"
                      defaultValue={clientData.progressNoteDate.split("T")[0]}
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          progressNoteDate: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>

                <div className="service-action-plan-page-info-box md:my-0 my-5">
                  <div className="flex gap-x-2 mb-5 items-center">
                    <img src="/client-icon.svg" width="24" />
                    <h3 className="font-black ">Client</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <label className="block">
                      <span className="">First Name</span>
                      <input
                        type="text"
                        className="block w-full bg-blue-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                        value={data[0]?.clientfirstname}
                        disabled
                      />
                    </label>
                    <label className="block">
                      <span className="">Last Name</span>
                      <input
                        type="text"
                        className="block w-full bg-blue-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                        value={data[0]?.clientlastname.charAt(0)}
                        disabled
                      />
                    </label>
                    <label className="block">
                      <span className="">Client ID</span>
                      <input
                        type="text"
                        className="block w-full bg-blue-50  p-2 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                        value={data[0]?.clientid}
                        disabled
                      />
                    </label>
                  </div>
                </div>

                <div className="service-action-plan-page-info-box">
                  <div className="flex gap-x-2 mb-5 items-center">
                    <img src="/client-icon.svg" width="24" />
                    <h3 className="font-black ">Health Care Worker</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="">First Name</span>
                      <input
                        type="text"
                        className="block w-full bg-yellow-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                        value={clientData.userFirstName}
                        disabled
                      />
                    </label>
                    <label className="block">
                      <span className="">Last Name</span>
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

          <h3 className="font-black my-5 text-dark-blue">Service Provided</h3>

          <section
            id="servidedProvided"
            className="gap-x-5 border-dark-blue rounded-xl p-5 mb-5"
          >
            <div className="services-container grid md:grid-cols-3 grid-cols-1 gap-x-5">
              <div className="services-box grid gap-y-3 items-start justify-start">
                <div className="flex items-center">
                  <label className="flex items-center gap-x-5">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setClientData({
                          ...clientData,
                          developmentActionPlan:
                            !clientData.developmentActionPlan,
                        })
                      }
                      checked={clientData.developmentActionPlan}
                    />
                    Development of Action Plan with Client
                    {/* <span
                      className={`${ProgressNotesStyles.checkmark} `}
                    ></span> */}
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-x-5">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setClientData({
                          ...clientData,
                          CD4VLLabReport: !clientData.CD4VLLabReport,
                        })
                      }
                      checked={clientData.CD4VLLabReport}
                    />
                    CD4/VL Lab Report Check
                    {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-x-5">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setClientData({
                          ...clientData,
                          transportationCoordination:
                            !clientData.transportationCoordination,
                        })
                      }
                      checked={clientData.transportationCoordination}
                    />
                    Transportation Coordination
                    {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-x-5">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setClientData({
                          ...clientData,
                          translationInterpretation:
                            !clientData.translationInterpretation,
                        })
                      }
                      checked={clientData.translationInterpretation}
                    />
                    Translation/Interpretation
                    {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                  </label>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-x-5">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setClientData({
                          ...clientData,
                          comprehensiveBehavioralRiskAssessment:
                            !clientData.comprehensiveBehavioralRiskAssessment,
                        })
                      }
                      checked={clientData.comprehensiveBehavioralRiskAssessment}
                    />
                    Comprehensive Behavioral Risk Assessment
                    {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                  </label>
                </div>
              </div>

              <div className="services-box grid gap-y-3 items-start justify-start ">
                <div className="flex items-center">
                  <label className="flex items-center gap-x-5">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setClientData({
                          ...clientData,
                          ticklerUpdate: !clientData.ticklerUpdate,
                        })
                      }
                      checked={clientData.ticklerUpdate}
                    />
                    Tickler Update
                    {/* <span
                      className={`${ProgressNotesStyles.checkmark} `}
                    ></span> */}
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-x-5">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setClientData({
                          ...clientData,
                          treatmentEducation: !clientData.treatmentEducation,
                        })
                      }
                      checked={clientData.treatmentEducation}
                    />
                    Treatment Education and Adherence Counselling
                    {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-x-5">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setClientData({
                          ...clientData,
                          preventionCounselling:
                            !clientData.preventionCounselling,
                        })
                      }
                      checked={clientData.preventionCounselling}
                    />
                    Prevention Counselling
                    {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-x-5">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setClientData({
                          ...clientData,
                          supportiveCounselling:
                            !clientData.supportiveCounselling,
                        })
                      }
                      checked={clientData.supportiveCounselling}
                    />
                    Supportive Counselling
                    {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-x-5">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setClientData({
                          ...clientData,
                          escort: !clientData.escort,
                        })
                      }
                      checked={clientData.escort}
                    />
                    Escort
                    {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                  </label>
                </div>
              </div>

              <div className="services-box grid grid-rows-5 gap-y-3 items-start justify-start">
                <div className="flex items-center">
                  <label className="flex items-center gap-x-5">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setClientData({
                          ...clientData,
                          caseClosureDischarge:
                            !clientData.caseClosureDischarge,
                        })
                      }
                      checked={clientData.caseClosureDischarge}
                    />
                    Case Closure/Discharge
                    {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-x-5">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setClientData({
                          ...clientData,
                          linkageToServices: !clientData.linkageToServices,
                        })
                      }
                      checked={clientData.linkageToServices}
                    />
                    Linkage to Services
                    {/* <span
                      className={`${ProgressNotesStyles.checkmark} `}
                    ></span> */}
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-x-5">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setClientData({
                          ...clientData,
                          OtherAssistance: !clientData.OtherAssistance,
                        })
                      }
                      checked={clientData.OtherAssistance}
                    />
                    Other Form of Assistance
                    {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                  </label>
                </div>
              </div>
            </div>
          </section>
          <h3 className="font-black my-5 text-dark-blue">Goals</h3>

          <section
            className="gap-x-5 border-dark-blue rounded-xl p-5 mb-5 goals"
            id="goals"
          >
            <div className="goals-container grid md:grid-cols-3 grid-cols-3 gap-5">
              <div className="goal-box">
                <div className="goal-top flex items-center my-2">
                  <h3 className="font-black">Goal 1</h3>
                  <div className="bg-dark-blue md:w-24 lg:w-52  mx-2 h-px"></div>
                  <img src={"/goal01.svg"} alt="" />
                </div>
                <div className="goal-service grid grid-cols-2 my-2">
                  {/* <div>
                    <span className="">Service Category</span>
                    <p className=" text-dark-blue ">
                      {serviceActionData?.goal1servicecategory}
                    </p>
                  </div> */}
                  <div>
                    <span className="">Target Date</span>
                    <p className="text-dark-blue">
                      {serviceActionData?.goal1targetdate?.split("T")[0]}
                    </p>
                  </div>
                </div>
                <div className="goal-summary my-2">
                  <span className="">Summary</span>
                  <p className=" text-dark-blue ">
                    {serviceActionData?.goal1summary || "-"}
                  </p>
                </div>
                <div className="">
                  <span className="">Goal 1 Progress Comments</span>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    className="border-black rounded-md w-full mt-1 p-2"
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        goal1ProgressComments: e.target.value,
                      })
                    }
                    defaultValue={clientData.goal1ProgressComments}
                  ></textarea>
                </div>
              </div>

              <div className="goal-box">
                <div className="goal-top flex items-center my-2">
                  <h3 className="font-black">Goal 2</h3>
                  <div className="bg-dark-blue md:w-24 lg:w-52  mx-2 h-px"></div>
                  <img src={"/goal02.svg"} alt="" />
                </div>

                <div className="goal-service grid grid-cols-2 my-2">
                  {/* <div>
                    <span className="">Service Category</span>
                    <p className=" text-dark-blue ">
                    {serviceActionData?.goal2servicecategory}
                    </p>
                  </div> */}
                  <div>
                    <span className="">Target Date</span>
                    <p className="text-dark-blue ">
                      {serviceActionData?.goal2targetdate?.split("T")[0] || "-"}
                    </p>
                  </div>
                </div>
                <div className="goal-summary my-2">
                  <span className="">Summary</span>
                  <p className=" text-dark-blue">
                    {serviceActionData?.goal2summary || "-"}
                  </p>
                </div>
                <div className="">
                  <span className="">Goal 2 Progress Comments</span>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    className="border-black rounded-md w-full mt-1 p-2"
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        goal2ProgressComments: e.target.value,
                      })
                    }
                    defaultValue={clientData.goal2ProgressComments}
                  ></textarea>
                </div>
              </div>

              <div className="goal-box">
                <div className="goal-top flex items-center my-2">
                  <h3 className="font-black">Goal 3</h3>
                  <div className="bg-dark-blue md:w-24 lg:w-52  mx-2 h-px"></div>
                  <img src={"/goal03.svg"} alt="" />
                </div>

                <div className="goal-service grid grid-cols-2 my-2">
                  {/* <div>
                    <span className="">Service Category</span>
                    <p className=" text-dark-blue ">
                    {serviceActionData?.goal3servicecategory}
                    </p>
                  </div> */}
                  <div>
                    <span className="">Target Date</span>
                    <p className="text-dark-blue ">
                      {serviceActionData?.goal3targetdate?.split("T")[0] || "-"}
                    </p>
                  </div>
                </div>
                <div className="goal-summary my-2  ">
                  <span className="">Summary</span>
                  <p className=" text-dark-blue">
                    {serviceActionData?.goal3summary || "-"}
                  </p>
                </div>
                <div className="">
                  <span className="">Goal 3 Progress Comments</span>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    className="border-black rounded-md w-full mt-1 p-2"
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        goal3ProgressComments: e.target.value,
                      })
                    }
                    defaultValue={clientData.goal3ProgressComments}
                  ></textarea>
                </div>
              </div>
            </div>
          </section>
          <div className="flex items-center ml-3 my-4">
            <img src={"/goals-were-worked-on.svg"} />
            <h3 className="font-black self-end text-dark-blue">
              Which of the goals were worked on?
            </h3>
          </div>
          <section
            className="gap-x-5 border-dark-blue rounded-xl p-5 mb-5 workedGoals"
            id="workedGoals"
          >
            <div className="goals-container grid md:grid-cols-3 grid-cols-3 gap-5">
              <div>
                <div className="workedGoals-box flex gap-5 ">
                  <p className="text-lg">Goal 1</p>
                  <label
                    className={`${ProgressNotesStyles.radioBtnContainer} `}
                  >
                    Yes
                    <input
                      type="radio"
                      name="workedGoals1"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal1Progress: true,
                          goal1ProgressDate: crearFecha(),
                        })
                      }
                      defaultChecked={
                        clientData.goal1Progress === true ? "checked" : ""
                      }
                    />
                    <span
                      className={`${ProgressNotesStyles.radioBtnCheckmark}`}
                    ></span>
                  </label>

                  <label
                    className={`${ProgressNotesStyles.radioBtnContainer} `}
                  >
                    No
                    <input
                      type="radio"
                      name="workedGoals1"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal1Progress: false,
                          goal1ProgressDate: "",
                        })
                      }
                      defaultChecked={
                        clientData.goal1Progress === false ? "checked" : ""
                      }
                    />
                    <span
                      className={`${ProgressNotesStyles.radioBtnCheckmark}`}
                    ></span>
                  </label>
                </div>
                <div className="flex gap-5 items-center">
                  <div className={`calendarIcon`}>
                    <img src="/date-calendar.svg" width={24} alt="" />
                  </div>
                  <h3 className="">Date</h3>
                  <input
                    type="date"
                    id=""
                    className="rounded-lg  p-1 border-dark-blue"
                    value={clientData.goal1ProgressDate?.split("T")[0]}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        goal1ProgressDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <div className="workedGoals-box flex gap-5 ">
                  <p className="text-lg">Goal 2</p>
                  <label
                    className={`${ProgressNotesStyles.radioBtnContainer} `}
                  >
                    Yes
                    <input
                      type="radio"
                      name="workedGoals2"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal2Progress: true,
                          goal2ProgressDate: crearFecha(),
                        })
                      }
                      defaultChecked={
                        clientData.goal2Progress === true ? "checked" : ""
                      }
                    />
                    <span
                      className={`${ProgressNotesStyles.radioBtnCheckmark}`}
                    ></span>
                  </label>

                  <label
                    className={`${ProgressNotesStyles.radioBtnContainer} `}
                  >
                    No
                    <input
                      type="radio"
                      name="workedGoals2"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal2Progress: false,
                          goal2ProgressDate: "",
                        })
                      }
                      defaultChecked={
                        clientData.goal2Progress === false ? "checked" : ""
                      }
                    />
                    <span
                      className={`${ProgressNotesStyles.radioBtnCheckmark}`}
                    ></span>
                  </label>
                </div>
                <div className="flex gap-5 items-center">
                  <div className={`calendarIcon`}>
                    <img src="/date-calendar.svg" width={24} alt="" />
                  </div>
                  <h3 className="">Date</h3>
                  <input
                    type="date"
                    id=""
                    className="rounded-lg  p-1 border-dark-blue"
                    value={clientData.goal2ProgressDate?.split("T")[0]}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        goal2ProgressDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <div className="workedGoals-box flex gap-5 ">
                  <p className="text-lg">Goal 3</p>
                  <label
                    className={`${ProgressNotesStyles.radioBtnContainer} `}
                  >
                    Yes
                    <input
                      type="radio"
                      name="workedGoals3"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal3Progress: true,
                          goal3ProgressDate: crearFecha(),
                        })
                      }
                      defaultChecked={
                        clientData.goal3Progress === true ? "checked" : ""
                      }
                    />
                    <span
                      className={`${ProgressNotesStyles.radioBtnCheckmark}`}
                    ></span>
                  </label>

                  <label
                    className={`${ProgressNotesStyles.radioBtnContainer} `}
                  >
                    No
                    <input
                      type="radio"
                      name="workedGoals3"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal3Progress: false,
                          goal3ProgressDate: "",
                        })
                      }
                      defaultChecked={
                        clientData.goal3Progress === false ? "checked" : ""
                      }
                    />
                    <span
                      className={`${ProgressNotesStyles.radioBtnCheckmark}`}
                    ></span>
                  </label>
                </div>
                <div className="flex gap-5 items-center">
                  <div className={`calendarIcon`}>
                    <img src="/date-calendar.svg" width={24} alt="" />
                  </div>
                  <h3 className="">Date</h3>
                  <input
                    type="date"
                    id=""
                    className="rounded-lg  p-1 border-dark-blue"
                    value={clientData.goal3ProgressDate?.split("T")[0]}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        goal3ProgressDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="flex items-center ml-3 my-4">
            <img src={"/goals-completed-icon.svg"} />
            <h3 className="font-black self-end text-dark-blue">
              Were any of the clients goals completed?
            </h3>
          </div>

          <section
            className="gap-x-5 border-dark-blue rounded-xl p-5 mb-5 workedGoals"
            id="workedGoals"
          >
            <div className="goals-container grid md:grid-cols-3 grid-cols-3 gap-5">
              <div>
                <div className="workedGoals-box flex gap-5 ">
                  <p className="text-lg">Goal 1</p>
                  <label
                    className={`${ProgressNotesStyles.radioBtnContainer} `}
                  >
                    Yes
                    <input
                      type="radio"
                      name="completedGoals1"
                      onClick={(e) => {
                        setClientData({
                          ...clientData,
                          goal1Completed: true,
                          goal1CompletedDate: crearFecha(),
                        });
                        setDataForSAP({ ...dataForSAP, goal1Completed: true });
                      }}
                      defaultChecked={
                        clientData.goal1Completed === true ? "checked" : ""
                      }
                    />
                    <span
                      className={`${ProgressNotesStyles.radioBtnCheckmark}`}
                    ></span>
                  </label>

                  <label
                    className={`${ProgressNotesStyles.radioBtnContainer} `}
                  >
                    No
                    <input
                      type="radio"
                      name="completedGoals1"
                      onClick={() => {
                        setClientData({
                          ...clientData,
                          goal1Completed: false,
                          goal1CompletedDate: "",
                        });
                        setDataForSAP({ ...dataForSAP, goal1Completed: false });
                      }}
                      defaultChecked={
                        clientData.goal1Completed === false ? "checked" : ""
                      }
                    />
                    <span
                      className={`${ProgressNotesStyles.radioBtnCheckmark}`}
                    ></span>
                  </label>
                </div>
                <div className="flex gap-5 items-center">
                  <div className={`calendarIcon`}>
                    <img src="/date-calendar.svg" width={24} alt="" />
                  </div>
                  <h3 className="">Date</h3>
                  <input
                    type="date"
                    id=""
                    className="rounded-lg  p-1 border-dark-blue"
                    value={clientData.goal1CompletedDate?.split("T")[0]}
                    onChange={(e) => {
                      setClientData({
                        ...clientData,
                        goal1CompletedDate: e.target.value,
                      });
                      setDataForSAP({
                        ...dataForSAP,
                        goal1CompletionDate: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="my-5">
                  <span className="">Goal 1 Completion Comments</span>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    className="border-black rounded-md w-full mt-1 p-2"
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        goal1CompletionComments: e.target.value,
                      })
                    }
                    defaultValue={clientData.goal1CompletionComments}
                  ></textarea>
                </div>
              </div>

              <div>
                <div className="workedGoals-box flex gap-5 ">
                  <p className="text-lg">Goal 2</p>
                  <label
                    className={`${ProgressNotesStyles.radioBtnContainer} `}
                  >
                    Yes
                    <input
                      type="radio"
                      name="completedGoals2"
                      onClick={(e) => {
                        setClientData({
                          ...clientData,
                          goal2Completed: true,
                          goal2CompletedDate: crearFecha(),
                        });
                        setDataForSAP({ ...dataForSAP, goal2Completed: true });
                      }}
                      defaultChecked={
                        clientData.goal2Completed === true ? "checked" : ""
                      }
                    />
                    <span
                      className={`${ProgressNotesStyles.radioBtnCheckmark}`}
                    ></span>
                  </label>

                  <label
                    className={`${ProgressNotesStyles.radioBtnContainer} `}
                  >
                    No
                    <input
                      type="radio"
                      name="completedGoals2"
                      onClick={(e) => {
                        setClientData({
                          ...clientData,
                          goal2Completed: false,
                          goal2CompletedDate: "",
                        });
                        setDataForSAP({ ...dataForSAP, goal2Completed: false });
                      }}
                      defaultChecked={
                        clientData.goal2Completed === false ? "checked" : ""
                      }
                    />
                    <span
                      className={`${ProgressNotesStyles.radioBtnCheckmark}`}
                    ></span>
                  </label>
                </div>
                <div className="flex gap-5 items-center">
                  <div className={`calendarIcon`}>
                    <img src="/date-calendar.svg" width={24} alt="" />
                  </div>
                  <h3 className="">Date</h3>
                  <input
                    type="date"
                    id=""
                    className="rounded-lg  p-1 border-dark-blue"
                    value={clientData.goal2CompletedDate?.split("T")[0]}
                    onChange={(e) => {
                      setClientData({
                        ...clientData,
                        goal2CompletedDate: e.target.value,
                      });
                      setDataForSAP({
                        ...dataForSAP,
                        goal2CompletionDate: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="my-5">
                  <span className="">Goal 2 Completion Comments</span>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    className="border-black rounded-md w-full mt-1 p-2"
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        goal2CompletionComments: e.target.value,
                      })
                    }
                    defaultValue={clientData.goal2CompletionComments}
                  ></textarea>
                </div>
              </div>

              <div>
                <div className="workedGoals-box flex gap-5 ">
                  <p className="text-lg">Goal 3</p>
                  <label
                    className={`${ProgressNotesStyles.radioBtnContainer} `}
                  >
                    Yes
                    <input
                      type="radio"
                      name="completedGoals3"
                      onClick={(e) => {
                        setClientData({
                          ...clientData,
                          goal3Completed: true,
                          goal3CompletedDate: crearFecha(),
                        });
                        setDataForSAP({ ...dataForSAP, goal3Completed: true });
                      }}
                      defaultChecked={
                        clientData.goal3Completed === true ? "checked" : ""
                      }
                    />
                    <span
                      className={`${ProgressNotesStyles.radioBtnCheckmark}`}
                    ></span>
                  </label>
                  <label
                    className={`${ProgressNotesStyles.radioBtnContainer} `}
                  >
                    No
                    <input
                      type="radio"
                      name="completedGoals3"
                      onClick={(e) => {
                        setClientData({
                          ...clientData,
                          goal3Completed: false,
                          goal3CompletedDate: "",
                        });
                        setDataForSAP({ ...dataForSAP, goal3Completed: false });
                      }}
                      defaultChecked={
                        clientData.goal3Completed === false ? "checked" : ""
                      }
                    />
                    <span
                      className={`${ProgressNotesStyles.radioBtnCheckmark}`}
                    ></span>
                  </label>
                </div>
                <div className="flex gap-5 items-center">
                  <div className={`calendarIcon`}>
                    <img src="/date-calendar.svg" width={24} alt="" />
                  </div>
                  <h3 className="">Date</h3>
                  <input
                    type="date"
                    id=""
                    className="rounded-lg  p-1 border-dark-blue"
                    value={clientData.goal3CompletedDate?.split("T")[0]}
                    onChange={(e) => {
                      setClientData({
                        ...clientData,
                        goal3CompletedDate: e.target.value,
                      });
                      setDataForSAP({
                        ...dataForSAP,
                        goal3CompletionDate: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="my-5">
                  <span className="">Goal 3 Completion Comments</span>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    className="border-black rounded-md w-full mt-1 p-2"
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        goal3CompletionComments: e.target.value,
                      })
                    }
                    defaultValue={clientData.goal3CompletionComments}
                  ></textarea>
                </div>
              </div>
            </div>
          </section>

          <div className="flex items-center ml-3 my-4 gap-x-2">
            <img src={"/notes_icon.svg"} />
            <h3 className="font-black self-end text-dark-blue">
              Notes on the client progress
            </h3>
          </div>

          <section
            className="gap-x-5 border-dark-blue rounded-xl p-5 mb-5 workedGoals"
            id="workedGoals"
          >
            <p className="text-lg">Progress Notes</p>
            <textarea
              name="progressNotes"
              id=""
              cols="30"
              rows="12"
              className="border-dark-blue w-full rounded-xl py-3 my-2 px-5"
              placeholder="Enter notes on the client progress/interaction followup here"
              onChange={(e) => {
                setClientData({
                  ...clientData,
                  progressNoteText: e.target.value,
                });
              }}
              defaultValue={clientData.progressNoteText}
            ></textarea>

            <div className="progressnotes-box flex gap-x-5">
              <p className="text-lg">Has the health care worker signed</p>
              <label className={`${ProgressNotesStyles.radioBtnContainer} `}>
                Yes
                <input
                  type="radio"
                  name="workedGoals"
                  onChange={(e) => {
                    setClientData({ ...clientData, HCWSignature: true });
                    setDataForSAP({ ...dataForSAP, HCWSignature: true });
                  }}
                  checked={clientData.HCWSignature === true}
                />
                <span
                  className={`${ProgressNotesStyles.radioBtnCheckmark}`}
                ></span>
              </label>
              <label className={`${ProgressNotesStyles.radioBtnContainer} `}>
                No
                <input
                  type="radio"
                  name="workedGoals"
                  onChange={(e) => {
                    setClientData({ ...clientData, HCWSignature: false });
                    setDataForSAP({ ...dataForSAP, HCWSignature: false });
                  }}
                  checked={clientData.HCWSignature === false}
                />
                <span
                  className={`${ProgressNotesStyles.radioBtnCheckmark}`}
                ></span>
              </label>
            </div>
          </section>
          {/* FIN DEL FORM BOX */}

          <h3 className="font-black my-5 text-dark-blue">
            Were any additional forms added to the client´s profile?
          </h3>

          <section
            className="gap-x-5 border-dark-blue rounded-xl  mb-5 workedGoals"
            id="workedGoals"
          >
            <div className="additional-forms-container grid grid-cols-2 gap-1">
              <div className="additional-forms-box border-r-dark-blue ">
                {whichServiceBeenAded &&
                  whichServiceBeenAded.slice(0, 15).map((service) => (
                    <>
                      <div
                        className={`${MSAStyles.formRowsContainer} ${service.row_color} flex gap-3 py-2 pl-2  my-2`}
                      >
                        <label
                          className={`${ProgressNotesStyles.checkboxContainer} pl-5 `}
                        >
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            defaultChecked={service.value ? "checked" : ""}
                            // disabled={clientData[`${service.state_label}Date`] ? true : false} */
                            onChange={(e) => {
                              clientData[service.state_label] === "" ||
                              clientData[`${service.state_label}Date`] === null
                                ? setClientData({
                                    ...clientData,
                                    [service.state_label]: !service.value,
                                    [`${service.state_label}Date`]: new Date(),
                                  })
                                : setClientData({
                                    ...clientData,
                                    [service.state_label]: !service.value,
                                  });
                            }}
                          />
                          <span
                            className={`${ProgressNotesStyles.checkmark}`}
                          ></span>
                        </label>
                        <div className="pl-2">
                          <p>{service.form_text}</p>
                        </div>
                      </div>
                    </>
                  ))}
              </div>{" "}
              <div className="additional-form-box">
                {whichServiceBeenAded &&
                  whichServiceBeenAded.slice(15).map((service) => (
                    <>
                      <div
                        className={`${MSAStyles.formRowsContainer} ${service.row_color} flex gap-3 py-2 pl-2  my-2`}
                      >
                        <label
                          className={`${ProgressNotesStyles.checkboxContainer} pl-5 `}
                        >
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            defaultChecked={service.value ? "checked" : ""}
                            // disabled={clientData[`${service.state_label}Date`] ? true : false} */
                            onChange={(e) => {
                              clientData[service.state_label] === false ||
                              !clientData[`${service.state_label}Date`] 
                                ? setClientData({
                                    ...clientData,
                                    [service.state_label]: !service.value,
                                    [`${service.state_label}Date`]: new Date(),
                                  })
                                : setClientData({
                                    ...clientData,
                                    [service.state_label]: !service.value,
                                  });
                            }}
                          />
                          <span
                            className={`${ProgressNotesStyles.checkmark}`}
                          ></span>
                        </label>
                        <div className="pl-2">
                          <p>{service.form_text}</p>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </section>

          <section id="save" className="my-5">
            {pnErrorMessage && (
              <p className="text-red-500 text-center my-3">{pnErrorMessage}</p>
            )}
            <div className="container mx-auto flex justify-center gap-x-5 ">
              <ReactToPrint
                trigger={() => (
                  <button className="bg-yellow-500 hover:bg-yellow-300 px-5 py-1 rounded text-white inline-block ">
                    Save and print
                  </button>
                )}
                content={() => componentRef.current}
              />
              <button
                className="bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block mr-5"
                onClick={() => handleProgressNote()}
              >
                Save and finish
              </button>
            </div>
          </section>
        </main>

        {/*           
              <div style={{display:'none'}}>
                <ProgressNoteToPrint ref={componentRef}  data={clientData}/>
              </div> */}
      </Layout>
      {showImpactTrackerModal && progressNoteId && (
        <ImpactTrackerModal
          showImpactTrackerModal={showImpactTrackerModal}
          setShowImpactTrackerModal={setShowImpactTrackerModal}
          notifyMessage={notifyMessage}
          clientId={clientData.clientId}
          clientUniqueId={clientData.clientUniqueId}
          progress_note_id={progressNoteId}
        />
      )}
    </>
  );
};

export default ProgressNotesIndex;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid, id } = ctx.params;
    console.log(ctx.params);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes/${clientid}/profile/${id}`
    );
    const data = await response.json();
    return { props: { data, id } };
  },
});
