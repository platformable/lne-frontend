import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Styles from "../../../../styles/ServiceAP.module.css";
import ProgressNotesStyles from "../../../../styles/ProgressNotes.module.css";
import MSAStyles from "../../../../styles/MSA.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import ImpactTrackerModal from "../../../../components/ImpactTrackerModal";
import BackButton from "../../../../components/BackButton";
import BackToDashboardButton from "../../../../components/BackToDashboardButton";
import ProgressNoteToPrint from "../../../../components/ProgressNoteToPrint";
import ClientInfoTopHeader from "../../../../components/ClientInfoTopHeader";
import ReactToPrint from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubHeader from "../../../../components/SubHeader";
import Loader from "../../../../components/Loader";

const ProgressNotesIndex = ({ data, sap }) => {
  const router = useRouter();
  // console.log("sap", sap);

  const [selectedSAP, setSelectedSAP] = useState(sap?.current);
  const [showImpactTrackerModal, setShowImpactTrackerModal] = useState(false);
  const [progressNoteId, setProgressNoteId] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  let componentRef = useRef();
  const notifyMessage = (status) => {
    if (status === "ok") {
      toast.success("Progress note saved successfuly", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (status === "fail") {
      toast.error("Something went wrong try again", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
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

  const [msaData, setMsaData] = useState({
    clientId: data[0]?.clientid,
    AIRSCollateralInformation:
      data[0]?.airscollateralinformation === "1" ? true : false,
    AIRSCollateralInformationDate: data[0]?.airscollateralinformationdate,
    AIRSFinancialInformation:
      data[0]?.airsfinancialinformation === "1" ? true : false,
    AIRSFinancialInformationDate: data[0]?.airsfinancialinformationdate,
    AIRSHIVAIDSRiskHistory:
      data[0]?.airshivaidsriskhistory === "1" ? true : false,
    AIRSHIVAIDSRiskHistoryDate: data[0]?.airshivaidsriskhistorydate,
    AIRSHCVHistory: data[0]?.airshcvhistory === "1" ? true : false,
    AIRSHCVHistoryDate: data[0]?.airshcvhistorydate,
    AIRSHousingInformation:
      data[0]?.airshousinginformation === "1" ? true : false,
    AIRSHousingInformationDate: data[0]?.airshousinginformationdate,
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
    LNEOutreachRetentionTrackingForm:
      data[0]?.lneoutreachretentiontrackingform === "1" ? true : false,
    LNEOutreachRetentionTrackingFormDate:
      data[0]?.lneoutreachretentiontrackingformdate,
    LNEReferralInformation:
      data[0]?.lnereferralinformation === "1" ? true : false,
    LNEReferralInformationDate: data[0]?.lnereferralinformationdate,
    LNEClientReferralForm:
      data[0]?.lneclientreferralform === "1" ? true : false,
    LNEClientReferralFormDate: data[0]?.lneclientreferralformdate,
    LNEHNSEligibilityForm:
      data[0]?.lnehnseligibilityform === "1" ? true : false,
    LNEHNSEligibilityFormDate: data[0]?.lnehnseligibilityformdate,
    progressNoteDate: data[0]?.progressnotedate,
    StatusChangesForm: data[0]?.statuschangesform === "1" ? true : false,
    StatusChangesFormDate: data[0]?.statuschangesformdate,
    ComprehensiveRiskBehaviorAssessmentUpdates:
      data[0]?.comprehensiveriskbehaviorassessmentupdates === "1"
        ? true
        : false,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate:
      data[0]?.comprehensiveriskbehaviorassessmentupdatesdate,
    M11QForm: data[0]?.m11qform === "1" ? true : false,
    M11QFormDate: data[0]?.m11qformdate,
    CD4VLReports: data[0]?.cd4vlreports === "1" ? true : false,
    CD4VLReportsDate: data[0]?.cd4vlreportsdate,
    InitialTreatmentAdherenceIntake:
      data[0]?.initialtreatmentadherenceintake === "1" ? true : false,
    InitialTreatmentAdherenceIntakeDate:
      data[0]?.initialtreatmentadherenceintakedate,
    TreatmentAdherenceUpdates:
      data[0]?.treatmentadherenceupdates === "1" ? true : false,
    TreatmentAdherenceUpdatesDate: data[0]?.treatmentadherenceupdatesdate,
    AIRSDrugRegimen: data[0]?.airsdrugregimen === "1" ? true : false,
    AIRSDrugRegimenDate: data[0]?.airsdrugregimendate,
    AIRSHIVStatusHistory: data[0]?.airshivstatushistory === "1" ? true : false,
    AIRSHIVStatusHistoryDate: data[0]?.airshivstatushistorydate,
    AIRSHIVMedicalProvider:
      data[0]?.airshivmedicalprovider === "1" ? true : false,
    AIRSHIVMedicalProviderDate: data[0]?.airshivmedicalproviderdate,
    SupportGroups: data[0]?.supportgroups === "1" ? true : false,
    SupportGroupsDate: data[0]?.supportgroupsdate,
    IDGForm: data[0]?.idgform === "1" ? true : false,
    IDGFormDate: data[0]?.idgformdate,
    HNSReadinessForm: data[0]?.hnsreadinessform === "1" ? true : false,
    InternalReferralInformation:
      data[0]?.internalreferralinformation === "1" ? true : false,
    LinkageRetentionAdherenceForms:
      data[0]?.linkageretentionadherenceforms === "1" ? true : false,
    InternalReferralInformationDate: data[0]?.internalreferralinformationdate,
    LinkageRetentionAdherenceFormsDate:
      data[0]?.linkageretentionadherenceformsdate,
    HNSReadinessFormDate: data[0]?.hnsreadinessformdate,
    ProgressNoteReviewed: data[0]?.progressnotereviewed === "1" ? true : false,
  });

  const [clientData, setClientData] = useState({
    clientId: data[0]?.clientid,
    clientFirstName: data[0]?.clientfirstname,
    clientLastName: data[0]?.clientlastname,
    clientHCWID: data[0]?.clienthcwid,
    userFirstName: data[0]?.clienthcwname,
    userLastName: data[0]?.clienthcwlastname,
    progressNoteDate: crearFecha(),
    ProgressNoteReviewed: false,

    // Services provided
    developmentActionPlan: false,
    CD4VLLabReport: false,
    transportationCoordination: false,
    translationInterpretation: false,
    comprehensiveBehavioralRiskAssessment: false,
    ticklerUpdate: false,
    treatmentEducation: false,
    preventionCounselling: false,
    supportiveCounselling: false,
    escort: false,
    caseClosureDischarge: false,
    linkageToServices: false,
    supportGroup: false,
    implementationActionPlan: false,
    housingAssistance: false,
    benefitsAssistance: false,
    employmentAssistance: false,
    OtherAssistance: false,
    // ********************

    goal1Progress: false,
    goal1ProgressDate: "",
    goal2Progress: false,
    goal2ProgressDate: "",
    goal3Progress: false,
    goal3ProgressDate: "",
    goal1Completed: selectedSAP?.goal1completed === "1" ? true : false,
    goal1CompletedDate: "",
    goal2Completed: selectedSAP?.goal2completed === "1" ? true : false,
    goal2CompletedDate: "",
    goal3Completed: selectedSAP?.goal3completed === "1" ? true : false,
    goal3CompletedDate: "",
    sapGoal1Completed: selectedSAP?.goal1completed === "1" ? true : false,
    sapGoal2Completed: selectedSAP?.goal2completed === "1" ? true : false,
    sapGoal3Completed: selectedSAP?.goal3completed === "1" ? true : false,
    sapGoal1CompletionDate: selectedSAP?.goal1completiondate,
    sapGoal2CompletionDate: selectedSAP?.goal2completiondate,
    sapGoal3CompletionDate: selectedSAP?.goal3completiondate,

    StatusChangesForm: false,
    StatusChangesFormDate: data[0]?.statuschangesformdate || null,

    ComprehensiveRiskBehaviorAssessmentUpdates: false,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate:
      data[0]?.comprehensiveriskbehaviorassessmentupdatesdate || null,

    M11QForm: false,
    M11QFormDate: data[0]?.m11qformdate || null,

    CD4VLReports: false,
    CD4VLReportsDate: data[0]?.cd4vlreportsdate || null,

    InitialTreatmentAdherenceIntake: false,
    InitialTreatmentAdherenceIntakeDate:
      data[0]?.initialtreatmentadherenceintakedate || null,

    TreatmentAdherenceUpdates: false,
    TreatmentAdherenceUpdatesDate:
      data[0]?.treatmentadherenceupdatesdate || null,

    AIRSCollateralInformation: false,
    AIRSCollateralInformationDate:
      data[0]?.airscollateralinformationdate || null,

    AIRSDrugRegimen: false,
    AIRSDrugRegimenDate: data[0]?.airsdrugregimendate || null,

    AIRSFinancialInformation: false,
    AIRSFinancialInformationDate: data[0]?.airsfinancialinformationdate || null,
    AIRSHIVAIDSRiskHistory: false,
    AIRSHIVAIDSRiskHistoryDate: data[0]?.airshivaidsriskhistorydate || null,

    AIRSHIVStatusHistory: false,
    AIRSHIVStatusHistoryDate: data[0]?.airshivstatushistorydate || null,

    AIRSHIVMedicalProvider: false,
    AIRSHIVMedicalProviderDate: data[0]?.airshivmedicalproviderdate || null,

    AIRSHCVHistory: false,
    AIRSHCVHistoryDate: data[0]?.airshcvhistorydate || null,
    AIRSHousingInformation: false,
    AIRSHousingInformationDate: data[0]?.airshousinginformationdate || null,
    AIRSInsuranceInformation: false,
    AIRSInsuranceInformationDate: data[0]?.airsinsuranceinformationdate || null,
    AIRSSubstanceUseHistory: false,
    AIRSSubstanceUseHistoryDate: data[0]?.airssubstanceusehistorydate || null,
    LNEClientRights: false,
    LNEClientRightsDate: data[0]?.lneclientrightsdate || null,
    LNEClientGrievancePolicyProcedure: false,
    LNEClientGrievancePolicyProcedureDate:
      data[0]?.lneclientgrievancepolicyproceduredate || null,
    LNEProgramRules: false,
    LNEProgramRulesDate: data[0]?.lneprogramrulesdate || null,
    LNEEmergencyContactConsent: false,
    LNEEmergencyContactConsentDate:
      data[0]?.lneemergencycontactconsentdate || null,
    LNEConsentForReleaseOfConfidentialInformation: false,
    LNEConsentForReleaseOfConfidentialInformationDate:
      data[0]?.lneconsentforreleaseofconfidentialinformationdate || null,
    HIPPAConsentForm: false,
    HIPPAConsentFormDate: data[0]?.hippaconsentformdate || null,
    NYCDOHMHNoticeOfPrivacyPractices: false,
    NYCDOHMHNoticeOfPrivacyPracticesDate:
      data[0]?.nycdohmhnoticeofprivacypracticesdate || null,
    LinkageRetentionAdherenceForms: false,
    LinkageRetentionAdherenceFormsDate:
      data[0]?.linkageretentionadherenceformsdate || null,
    InternalReferralInformation: false,
    InternalReferralInformationDate: data[0]?.internalreferralinformationdate,
    LNEClientReferralForm: false,
    LNEClientReferralFormDate: data[0]?.lneclientreferralformdate || null,
    LNEHNSEligibilityForm: true,
    LNEHNSEligibilityFormDate: data[0]?.lnehnseligibilityformdate || new Date(),
    HNSReadinessForm: false,
    HNSReadinessFormDate: data[0]?.hnsreadinessformdate || null,

    SupportGroups: false,
    SupportGroupsDate: data[0]?.supportgroupsdate || null,

    IDGForm: false,
    IDGFormDate: data[0]?.idgformdate || null,

    progressNoteText: "",
    HCWSignature:
      data[0]?.hcwsignature === "0" ||
      data[0]?.hcwsignature === "" ||
      data[0]?.hcwsignature === null
        ? false
        : true,
    clientUniqueId: data[0].id,
    goal1ProgressComments: "",
    goal2ProgressComments: "",
    goal3ProgressComments: "",
    goal1CompletionComments: "",
    goal2CompletionComments: "",
    goal3CompletionComments: "",
    goal1WorkedComments: "",
    goal2WorkedComments: "",
    goal3WorkedComments: "",
  });
  // console.log("clientData", clientData);

  // console.log("msa", msaData);
  const whichServiceBeenAded = [
    /* {
      value: clientData.LNEHNSEligibilityForm,
      state_label: "LNEHNSEligibilityForm",
      row_color: "bg-msaForm-light-blue",
      form_text: "HNS Eligibility Assessment",
    },*/
    // {value:clientData.HNSReadinessForm ,state_label: "HNSReadinessForm",row_color: "bg-light-blue", form_text: "HNS Readiness Assessment", },
    {
      value: clientData.StatusChangesForm,
      state_label: "StatusChangesForm",
      row_color: "bg-msaForm-light-blue",
      form_text: "Status Changes/Closure Forms",
    },
    {
      value: clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
      state_label: "ComprehensiveRiskBehaviorAssessmentUpdates",
      row_color: "bg-msaForm-light-blue",
      form_text: "Comprehensive Behavioral Risk Assessment Updates",
    },
    {
      value: clientData.M11QForm,
      state_label: "M11QForm",
      row_color: "bg-msaForm-light-blue",
      form_text: "M11Q",
    },
    {
      value: clientData.CD4VLReports,
      state_label: "CD4VLReports",
      row_color: "bg-msaForm-light-blue",
      form_text: "CD4/VL Check Reports",
    },
    {
      value: clientData.InitialTreatmentAdherenceIntake,
      state_label: "InitialTreatmentAdherenceIntake",
      row_color: "bg-msaForm-light-blue",
      form_text: "Initial Treatment Adherence Intake",
    },
    {
      value: clientData.TreatmentAdherenceUpdates,
      state_label: "TreatmentAdherenceUpdates",
      row_color: "bg-msaForm-light-blue",
      form_text: "Treatment Adherence Updates",
    },
    /* {
      value: clientData.AIRSCollateralInformation,
      state_label: "AIRSCollateralInformation",
      row_color: "bg-msaForm-light-blue",
      form_text: "AIRS Collateral Information",
    },
    {
      value: clientData.AIRSDrugRegimen,
      state_label: "AIRSDrugRegimen",
      row_color: "bg-msaForm-light-blue",
      form_text: "AIRS Drug Regimen History",
    },
    {
      value: clientData.AIRSFinancialInformation,
      state_label: "AIRSFinancialInformation",
      row_color: "bg-msaForm-light-blue",
      form_text: "AIRS Financial Information",
    },
    {
      value: clientData.AIRSHIVAIDSRiskHistory,
      state_label: "AIRSHIVAIDSRiskHistory",
      row_color: "bg-msaForm-light-blue",
      form_text: "AIRS HIV AIDS Risk History",
    },
    {
      value: clientData.AIRSHIVMedicalProvider,
      state_label: "AIRSHIVMedicalProvider",
      row_color: "bg-msaForm-light-blue",
      form_text: "AIRS HIV Medical Provider History",
    },
    {
      value: clientData.AIRSHIVStatusHistory,
      state_label: "AIRSHIVStatusHistory",
      row_color: "bg-msaForm-light-blue",
      form_text: "AIRS HIV Status History",
    },
    {
      value: clientData.AIRSHCVHistory,
      state_label: "AIRSHCVHistory",
      row_color: "bg-msaForm-light-blue",
      form_text: "AIRS HCV History",
    },
    {
      value: clientData.AIRSHousingInformation,
      state_label: "AIRSHousingInformation",
      row_color: "bg-msaForm-light-blue",
      form_text: "AIRS Housing Information",
    },
    {
      value: clientData.AIRSInsuranceInformation,
      state_label: "AIRSInsuranceInformation",
      row_color: "bg-msaForm-light-blue",
      form_text: "AIRS Insurance Information",
    },
    {
      value: clientData.AIRSSubstanceUseHistory,
      state_label: "AIRSSubstanceUseHistory",
      row_color: "bg-msaForm-light-blue",
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
    },*/
    {
      value: clientData.LinkageRetentionAdherenceForms,
      state_label: "LinkageRetentionAdherenceForms",
      row_color: "bg-msaForm-light-violet",
      form_text: "Linkage, Retention, & Adherence Forms",
    },
    {
      value: clientData.InternalReferralInformation,
      state_label: "InternalReferralInformation",
      row_color: "bg-msaForm-light-violet",
      form_text: "Internal Referral Information",
    },
    /*{
      value: clientData.LNEClientReferralForm,
      state_label: "LNEClientReferralForm",
      row_color: "bg-msaForm-light-violet",
      form_text: "Identification",
    },
    {
      value: clientData.HNSReadinessForm,
      state_label: "HNSReadinessForm",
      row_color: "bg-msaForm-light-violet",
      form_text: "HNS Readiness Form",
    },*/
    {
      value: clientData.SupportGroups,
      state_label: "SupportGroups",
      row_color: "bg-msaForm-light-violet",
      form_text: "Support Groups",
    },
    {
      value: clientData.IDGForm,
      state_label: "IDGForm",
      row_color: "bg-msaForm-light-violet",
      form_text: "IDG",
    },
  ];

  const todaysDate = new Date();

  const [dataForSAP, setDataForSAP] = useState({
    id: selectedSAP?.id,
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientData.clientId}/update_msa_form_from_progress_notesss`,
        {
          msaData,
        }
      )
      .then(function (response) {
        if (response.status === 200 || response.statusText === "Ok") {
          console.log(response);
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
        console.log("msa form updated successfully");
      })
      .catch(function (error) {
        console.log("an error ocurred while trying to update msa form", error);
      });
  };

  const [pnErrorMessage, setPNErrorMessage] = useState("");

  const handleProgressNote = () => {
    if (clientData.progressNoteText === "") {
      setPNErrorMessage(
        "Please enter text to describe the progress made today"
      );
    } else {
      setPNErrorMessage("");
      setIsSaving(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes/`, {
          clientData,
        })
        .then(function (response) {
          if (response.status === 200 || response.statusText === "Ok") {
            setProgressNoteId(response.data.progress_note_id);
            handleMsaformUpdate();
            handleServiceActionPlanFormUpdate();
            notifyMessage("ok");
            setTimeout(() => {
              setIsSaving(false);
              setShowImpactTrackerModal(!showImpactTrackerModal);
            }, 1500);
          }
        })
        .catch(function (error) {
          notifyMessage("fail");
          setIsSaving(false);

          console.log(error);
        });
    }
  };
  // console.log("change sap", selectedSAP)

  return (
    <>
      <ToastContainer autoClose={1500} />
      <Layout>
        <SubHeader pageTitle={"Progress Note"} />

        <div className="pt-10 shadow-inner">
          <section className="container mx-auto bg-white grid divide-y-2 divide-[#5AC0FF] shadow-lg border-blue rounded-md ">
            <ClientInfoTopHeader
              data={data}
              clientData={clientData}
              setClientData={setClientData}
              stateValue="progressNoteDate"
            />
            <section id="servidedProvided" className="gap-x-5 p-10 pt-7">
              <div className="flex gap-x-3 items-center">
                <img
                  src="/progress_notes/service_provided.svg"
                  alt="Services provided icon"
                />
                <h3 className="font-bold text-2xl">Service Provided</h3>
              </div>

              <div className="services-container grid lg:grid-cols-2 grid-cols-1 gap-x-5 mt-10">
                {/* SERVICE PROVIDED 1st COLUMN " */}

                <div className="services-box grid gap-y-10 text-lg items-start justify-start">
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
                      />
                      Comprehensive Behavioral Risk Assessment
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
                            ticklerUpdate: !clientData.ticklerUpdate,
                          })
                        }
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
                      />
                      Supportive Counselling
                      {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                    </label>
                  </div>
                </div>

                {/* SERVICE PROVIDED 2nd COLUMN " */}
                <div className="services-box grid gap-y-10 text-lg items-start justify-start">
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
                      />
                      Escort
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
                            caseClosureDischarge:
                              !clientData.caseClosureDischarge,
                          })
                        }
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
                            SupportGroup: !clientData.supportGroup,
                          })
                        }
                      />
                      Support Group
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
                            implementationActionPlan:
                              !clientData.implementationActionPlan,
                          })
                        }
                      />
                      Implementation of Action Plan
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
                            housingAssistance: !clientData.housingAssistance,
                          })
                        }
                      />
                      Assistance with Housing Services
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
                            benefitsAssistance: !clientData.benefitsAssistance,
                          })
                        }
                      />
                      Assistance with Access to Benefits / Entitlements
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
                            employmentAssistance:
                              !clientData.employmentAssistance,
                          })
                        }
                      />
                      Assistance with Employment / Education
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
                            OtherAssistance: !clientData.OtherAssistance,
                          })
                        }
                      />
                      Other Form of Assistance
                      {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <section className="p-10 pt-7 goals" id="goals">
              <div className="flex gap-3 items-center mb-5">
                <img
                  src="/progress_notes/client_goals.svg"
                  alt="Client goals icon"
                />
                <h3 className="font-bold text-2xl">Client Goals</h3>
              </div>
              <label htmlFor="selectedSAP" className="text-xl mr-5">
                Select service action plan
              </label>
              <select
                onChange={(e) => setSelectedSAP(sap[e.target.value])}
                className="mb-10 rounded shadow border-black py-2 px-2"
              >
                <option value={"current"}>Current service action plan</option>
                {sap.archived && (
                  <option value={"archived"}>
                    Previous service action plan
                  </option>
                )}
              </select>
              <div className="grid lg:grid-cols-2 gap-5 mb-3">
                <div>
                  {selectedSAP?.goal1completed === "1" && (
                    <p className="px-3 py-1 rounded-lg shadow font-bold  bg-green-300">
                      Completed:{" "}
                      {new Date(
                        data[0]?.sapgoal1completiondate
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
                <div>
                  {selectedSAP?.goal2completed === "1" && (
                    <p className="px-3 py-1 rounded-lg shadow font-bold  bg-green-300">
                      Completed:{" "}
                      {new Date(
                        data[0]?.sapgoal2completiondate
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
              <div className="goals-container grid lg:grid-cols-2  gap-5">
                <div className="goal-box grid gap-y-7">
                  {/* <div className="goal-top flex items-center my-2">
                  <h3 className="font-bold">Goal 1</h3>
                  <div className="bg-dark-blue md:w-24 lg:w-52  mx-2 h-px"></div>
                  <img src={"/goal01.svg"} alt="" />
                </div> */}
                  <div className="goal-service grid my-2">
                    <div className="flex flex-col gap-3 items-start">
                      <p className="text-xl font-medium">Target Date</p>
                      <p className="bg-primary-light-blue p-3 rounded text-lg">
                        {new Date(
                          selectedSAP?.goal1targetdate
                        ).toLocaleDateString("en", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="goal-summary">
                    <p className="text-xl font-medium">Summary</p>
                    <p className="bg-primary-light-blue mt-5 p-3 rounded text-lg">
                      {selectedSAP?.goal1details}
                    </p>
                  </div>

                  {/* <div className="">
                  <span className="">Goal 1 Progress Comments</span>
                 <textarea name="" id=""  rows="10" className="border-black rounded-md w-full mt-1 p-2"
                 onChange={(e)=>setClientData({...clientData,goal1ProgressComments:e.target.value})}></textarea>
                </div> */}
                </div>

                <div className="goal-box grid gap-y-7">
                  {/* <div className="goal-top flex items-center my-2">
                  <h3 className="font-bold">Goal 1</h3>
                  <div className="bg-dark-blue md:w-24 lg:w-52  mx-2 h-px"></div>
                  <img src={"/goal01.svg"} alt="" />
                </div> */}
                  <div className="goal-service grid my-2">
                    <div className="flex flex-col gap-3 items-start">
                      <span className="text-xl font-medium">Target Date</span>
                      <p className="bg-primary-light-blue p-3 rounded text-lg">
                        {new Date(
                          selectedSAP?.goal2targetdate
                        ).toLocaleDateString("en", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="goal-summary">
                    <span className="text-xl font-medium">Summary</span>
                    <p className="bg-primary-light-blue mt-5 p-3 rounded text-lg">
                      {selectedSAP?.goal2details}
                    </p>
                  </div>

                  {/* <div className="">
                  <span className="">Goal 1 Progress Comments</span>
                 <textarea name="" id=""  rows="10" className="border-black rounded-md w-full mt-1 p-2"
                 onChange={(e)=>setClientData({...clientData,goal1ProgressComments:e.target.value})}></textarea>
                </div> */}
                </div>

                {/* <div className="goal-box">
                <div className="goal-top flex items-center my-2">
                  <h3 className="font-bold">Goal 3</h3>
                  <div className="bg-dark-blue md:w-24 lg:w-52  mx-2 h-px"></div>
                  <img src={"/goal03.svg"} alt="" />
                </div>

                <div className="goal-service grid grid-cols-2 my-2">
                  
                  <div>
                    <span className="">Target Date</span>
                    <p className="text-dark-blue ">
                      {selectedSAP?.goal3targetdate
                        ? new Date(
                            selectedSAP?.goal3targetdate
                          ).toLocaleDateString("en", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                        : "-"}
                    </p>
                  </div>
                </div>
                <div className="goal-summary my-2  ">
                  <span className="">Summary</span>
                  <p className=" text-dark-blue">
                    {selectedSAP?.goal3Details || "-"}
                  </p>
                </div>
                {clientData.sapGoal3Completed && (
                  <p className="px-3 py-1 rounded-lg shadow font-bold  bg-green-300">
                    Completed:{" "}
                    {new Date(
                      clientData.sapGoal3CompletionDate
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </p>
                )}
               
              </div> */}
              </div>
            </section>

            <section className="gap-x-5 pt-7 p-10" id="workedGoals">
              <div className="flex items-center mb-10 gap-x-3">
                <img src={"/progress_notes/goals_worked_on.svg"} />
                <h3 className="font-bold text-2xl">
                  Which of the goals were worked on?
                </h3>
              </div>
              <div className="goals-container grid md:grid-cols-2  gap-5">
                <div>
                  <p className="text-xl mb-3 font-medium">Goal 1</p>

                  <div className="workedGoals-box flex gap-20 gap-5 mb-7">
                    <label className={`flex gap-5 items-center text-xl`}>
                      <input
                        type="radio"
                        name="workedGoals1"
                        onChange={(e) => {
                          setClientData({
                            ...clientData,
                            goal1Progress: true,
                            goal1ProgressDate: clientData.progressNoteDate,
                          });
                        }}
                      />
                      Yes
                    </label>

                    <label className={`flex gap-5 items-center text-xl`}>
                      <input
                        type="radio"
                        name="workedGoals1"
                        onChange={(e) => {
                          setClientData({
                            ...clientData,
                            goal1Progress: false,
                            goal1ProgressDate: "",
                          });
                        }}
                      />
                      No
                    </label>
                  </div>
                  <div className="mb-7">
                    {/* <div className={`calendarIcon`}>
                    <img src="/date-calendar.svg" width={24} alt="" />
                  </div> */}
                    {/* <h3 className="text-xl mb-3 font-medium">Target date</h3>
                    <input
                      type="date"
                      id=""
                      className="rounded-lg border-black p-2 text-lg"
                      value={
                        clientData.goal1ProgressDate
                          ? clientData.goal1ProgressDate
                          : ""
                      }
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal1ProgressDate: e.target.value,
                        })
                      }
                    /> */}
                  </div>
                  <div className="">
                    <p className="mb-3 font-medium text-xl">
                      Goal 1 worked comments
                    </p>
                    <textarea
                      name=""
                      id=""
                      rows="10"
                      className="border-black rounded-md w-full mt-1 text-lg p-2"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal1WorkedComments: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>

                <div>
                  <p className="text-xl mb-3 font-medium">Goal 2</p>

                  <div className="workedGoals-box flex gap-20 mb-7">
                    <label className={`flex gap-5 items-center text-xl`}>
                      <input
                        type="radio"
                        name="workedGoals2"
                        onChange={(e) => {
                          setClientData({
                            ...clientData,
                            goal2Progress: true,
                            goal2ProgressDate: clientData.progressNoteDate,
                          });
                        }}
                      />
                      Yes
                    </label>

                    <label className={`flex gap-5 items-center text-xl`}>
                      <input
                        type="radio"
                        name="workedGoals2"
                        onChange={(e) => {
                          setClientData({
                            ...clientData,
                            goal2Progress: false,
                            goal2ProgressDate: "",
                          });
                        }}
                      />
                      No
                    </label>
                  </div>
                  <div className="mb-7">
                    {/* <div className={`calendarIcon`}>
                    <img src="/date-calendar.svg" width={24} alt="" />
                  </div> */}
                    {/* <h3 className="text-xl mb-3 font-medium">Target date</h3>
                    <input
                      type="date"
                      id=""
                      className="rounded-lg border-black p-2 text-lg"
                      value={
                        clientData.goal2ProgressDate
                          ? clientData.goal2ProgressDate
                          : ""
                      }
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal2ProgressDate: e.target.value,
                        })
                      }
                    /> */}
                  </div>
                  <div className="">
                    <p className="mb-3 font-medium text-xl">
                      Goal 2 worked comments
                    </p>
                    <textarea
                      name=""
                      id=""
                      rows="10"
                      className="border-black rounded-md w-full text-lg p-2"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal2WorkedComments: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>

                {/* <div>
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
                          goal3ProgressDate: clientData.progressNoteDate,
                        })
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
                    value={
                      clientData.goal3ProgressDate
                        ? clientData.goal3ProgressDate
                        : ""
                    }
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        goal3ProgressDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-5">
                  <span className="">Goal 3 Worked Comments</span>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    className="border-black rounded-md w-full mt-1 p-2"
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        goal3WorkedComments: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div> */}
              </div>
            </section>

            <section className="gap-x-5 p-10 pt-7" id="workedGoals">
              <div className="flex items-center gap-3 mb-10">
                <img
                  src={"/progress_notes/goals_completed.svg"}
                  alt="Goals completed icon"
                />
                <h3 className="font-bold text-2xl">
                  Were any of the clients goals completed?
                </h3>
              </div>
              <div className="grid lg:grid-cols-2 gap-5 mb-5">
                <div>
                  {data[0]?.sapgoal1completed === "1" && (
                    <p className="px-3 py-1 rounded-lg shadow font-bold  bg-green-300">
                      Completed:{" "}
                      {new Date(
                        data[0]?.sapgoal1completiondate
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
                <div>
                  {data[0]?.sapgoal2completed === "1" && (
                    <p className="px-3 py-1 rounded-lg shadow font-bold  bg-green-300">
                      Completed:{" "}
                      {new Date(
                        data[0]?.sapgoal2completiondate
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
              <div className="goals-container grid md:grid-cols-2 gap-5">
                <div className="">
                  <p className="text-xl mb-3 font-medium">Goal 1</p>

                  <div className="workedGoals-box flex gap-20 mb-7">
                    <label className={`flex items-center gap-5 text-xl`}>
                      <input
                        type="radio"
                        name="completedGoals1"
                        onClick={(e) => {
                          setClientData({
                            ...clientData,
                            goal1Completed: true,
                            goal1CompletedDate: clientData.progressNoteDate,
                          });
                          setDataForSAP({
                            ...dataForSAP,
                            goal1Completed: true,
                          });
                        }}
                      />
                      Yes
                    </label>

                    <label className={`flex items-center gap-5 text-xl`}>
                      <input
                        type="radio"
                        name="completedGoals1"
                        onClick={() => {
                          setClientData({
                            ...clientData,
                            goal1Completed: false,
                            goal1CompletedDate: "",
                          });
                          setDataForSAP({
                            ...dataForSAP,
                            goal1Completed: false,
                          });
                        }}
                      />
                      No
                    </label>
                  </div>
                  <div className="mb-7">
                    {/*   <h3 className="font-medium text-xl mb-3">Target date</h3>
                    <input
                      type="date"
                      id=""
                      className="rounded-lg border-black text-xl p-1"
                      value={
                        clientData.goal1CompletedDate
                          ? clientData.goal1CompletedDate
                          : ""
                      }
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
                    /> */}
                  </div>
                  <div className="mt-5">
                    <p className="text-xl font-medium mb-3">
                      Goal 1 completion comments
                    </p>
                    <textarea
                      name=""
                      id=""
                      rows="10"
                      className="border-black rounded-md w-full mt-1 p-2 text-xl"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal1CompletionComments: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="">
                  <p className="text-xl mb-3 font-medium">Goal 2</p>

                  <div className="workedGoals-box flex gap-20 mb-7">
                    <label className={`flex items-center gap-5 text-xl`}>
                      <input
                        type="radio"
                        name="completedGoals2"
                        onClick={(e) => {
                          setClientData({
                            ...clientData,
                            goal2Completed: true,
                            goal2CompletedDate: clientData.progressNoteDate,
                          });
                          setDataForSAP({
                            ...dataForSAP,
                            goal2Completed: true,
                          });
                        }}
                      />
                      Yes
                    </label>

                    <label className={`flex items-center gap-5 text-xl`}>
                      <input
                        type="radio"
                        name="completedGoals2"
                        onClick={() => {
                          setClientData({
                            ...clientData,
                            goal2Completed: false,
                            goal2CompletedDate: "",
                          });
                          setDataForSAP({
                            ...dataForSAP,
                            goal2Completed: false,
                          });
                        }}
                      />
                      No
                    </label>
                  </div>
                  <div className="mb-7">
                    {/*  <h3 className="font-medium text-xl mb-3">Target date</h3>
                    <input
                      type="date"
                      id=""
                      className="rounded-lg border-black text-lg p-1 "
                      value={
                        clientData.goal2CompletedDate
                          ? clientData.goal2CompletedDate
                          : ""
                      }
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
                    /> */}
                  </div>
                  <div className="mt-5">
                    <p className="text-xl font-medium mb-3">
                      Goal 2 completion comments
                    </p>
                    <textarea
                      name=""
                      id=""
                      rows="10"
                      className="border-black rounded-md w-full mt-1 p-2 text-lg"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal2CompletionComments: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>

                {/* 
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
                          goal3CompletedDate: clientData.progressNoteDate,
                        });
                        setDataForSAP({ ...dataForSAP, goal3Completed: true });
                      }}
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
                    value={
                      clientData.goal3CompletedDate
                        ? clientData.goal3CompletedDate
                        : ""
                    }
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
                <div className="mt-5">
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
                  ></textarea>
                </div>
              </div> */}
              </div>
            </section>

            <section className="gap-x-5 p-10 pt-7 workedGoals" id="workedGoals">
              <div className="flex items-center gap-x-3 mb-10">
                <img src={"/progress_notes/notes.svg"} />
                <h3 className="font-bold text-2xl">
                  Notes on the client progress
                </h3>
              </div>
              <p className="text-xl mb-3 font-medium">Progress Notes</p>
              <textarea
                name="progressNotes"
                id=""
                cols="30"
                rows="12"
                className="border-black w-full rounded-lg p-2 mb-3 text-lg"
                placeholder="Enter notes on the client progress/interaction followup here"
                onChange={(e) => {
                  setClientData({
                    ...clientData,
                    progressNoteText: e.target.value,
                  });
                }}
              ></textarea>

              <div className="progressnotes-box">
                <p className="text-xl font-medium mb-5">
                  Has the health care worker signed
                </p>
                <div className="flex gap-x-20">
                  <label
                    className={`flex items-center gap-x-5 text-xl font-medium`}
                  >
                    <input
                      type="radio"
                      name="hcwSignature"
                      onChange={(e) => {
                        setClientData({ ...clientData, HCWSignature: true });
                        setDataForSAP({ ...dataForSAP, HCWSignature: true });
                      }}
                    />
                    Yes
                  </label>
                  <label
                    className={`flex items-center gap-x-5 text-xl font-medium`}
                  >
                    <input
                      type="radio"
                      name="hcwSignature"
                      onChange={(e) => {
                        setClientData({ ...clientData, HCWSignature: false });
                        setDataForSAP({ ...dataForSAP, HCWSignature: false });
                      }}
                    />
                    No
                  </label>
                </div>
              </div>
            </section>

            {/* FIN DEL FORM BOX */}

            <section className="p-10 pt-7 workedGoals" id="workedGoals">
              <div className="flex items-center gap-x-3 mb-10">
                <img src="/progress_notes/additional_forms.svg" alt="" />
                <h3 className="font-bold text-2xl">
                  Were any additional forms added to the client´s profile?
                </h3>
              </div>
              <div className="additional-forms-container  grid grid-cols-2 gap-10">
                {[
                  [0, 5],
                  [5, 10],
                ].map((e, index) => (
                  <div className="additional-forms-box" key={index}>
                    {whichServiceBeenAded &&
                      whichServiceBeenAded.slice(...e).map((service, i) => (
                        <div key={i}>
                          <div
                            className={`${MSAStyles.formRowsContainer} ${service.row_color} flex gap-3 p-3  my-2`}
                          >
                            <label className={`flex items-center gap-5`}>
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                onChange={(e) => {
                                  if (msaData[service.state_label]) {
                                    if (
                                      new Date(
                                        msaData[`${service.state_label}Date`]
                                      )
                                        .toISOString()
                                        .split("T")[0] ===
                                      new Date().toISOString().split("T")[0]
                                    ) {
                                      let lastDateUpdated =
                                        data[0][
                                          `${service.state_label}Date`.toLowerCase()
                                        ];
                                      setMsaData({
                                        ...msaData,
                                        [service.state_label]: false,
                                        [`${service.state_label}Date`]:
                                          lastDateUpdated,
                                      });
                                    } else {
                                      setMsaData({
                                        ...msaData,
                                        [service.state_label]:
                                          msaData[service.state_label],
                                        [`${service.state_label}Date`]:
                                          new Date(),
                                      });
                                    }
                                  }
                                  if (!msaData[service.state_label]) {
                                    setMsaData({
                                      ...msaData,
                                      [service.state_label]: true,
                                      [`${service.state_label}Date`]:
                                        new Date(),
                                    });
                                  }

                                  if (!clientData[service.state_label]) {
                                    setClientData({
                                      ...clientData,
                                      [service.state_label]: true,
                                      [`${service.state_label}Date`]:
                                        new Date(),
                                    });
                                  }

                                  if (clientData[service.state_label]) {
                                    setClientData({
                                      ...clientData,
                                      [service.state_label]: false,
                                      [`${service.state_label}Date`]: null,
                                    });
                                  }
                                }}
                              />
                              <p className="text-lg">{service.form_text}</p>
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </section>
          </section>
        </div>
        <section id="save" className="my-10">
          {pnErrorMessage && (
            <p className="text-red-500 text-center my-3">{pnErrorMessage}</p>
          )}
          {!isSaving ? (
            <div className="container mx-auto flex justify-center gap-x-10 ">
              <button
                className="btn-yellow flex items-center gap-5 px-5 py-2 rounded shadow-lg textxl inline-block "
                onClick={() => handleProgressNote()}
              >
                <img
                  src="/progress_notes/save_and_finish_mini.svg"
                  alt="save icon"
                />
                Save and finish
              </button>

              <ReactToPrint
                trigger={() => (
                  <button className="bg-black text-white flex items-center gap-3 px-5 hover:bg-yellow-200 px-5 py-2 rounded shadowxl text-lg inline-block ">
                    <img
                      src="/progress_notes/print_mini.svg"
                      alt="print icon"
                    />
                    Save and print
                  </button>
                )}
                content={() => componentRef.current}
              />
            </div>
          ) : (
            <div className="grid justify-center">
              <Loader />
            </div>
          )}
        </section>
        <div style={{ display: "none" }}>
          <ProgressNoteToPrint ref={componentRef} data={clientData} />
        </div>
      </Layout>
      {showImpactTrackerModal && progressNoteId && (
        <ImpactTrackerModal
          showImpactTrackerModal={showImpactTrackerModal}
          setShowImpactTrackerModal={setShowImpactTrackerModal}
          notifyMessage={notifyMessage}
          clientId={clientData.clientId}
          clientUniqueId={clientData.clientUniqueId}
          progress_note_id={progressNoteId}
          progressNoteDate={clientData.progressNoteDate}
        />
      )}
    </>
  );
};

export default ProgressNotesIndex;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid } = ctx.params;

    const [data, sap] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes/${clientid}`
      ).then((data) => data.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes/sapForProgressNotes/${clientid}`
      ).then((data) => data.json()),
    ]);
    return { props: { data, sap } };
  },
});
