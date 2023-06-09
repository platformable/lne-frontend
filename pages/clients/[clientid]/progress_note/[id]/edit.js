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
import ClientInfoTopHeader from "../../../../../components/ClientInfoTopHeader";
import ReactToPrint from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubHeader from "../../../../../components/SubHeader";

const ProgressNotesIndex = ({ data, id, msa }) => {
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

    // Services provided *****************
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
    implementationActionPlan:
      data[0]?.implementationactionplan === "1" ? true : false,
    housingAssistance: data[0]?.housingassistance === "1" ? true : false,
    benefitsAssistance: data[0]?.benefitsassistance === "1" ? true : false,
    employmentAssistance: data[0]?.employmentassistance === "1" ? true : false,
    OtherAssistance: data[0]?.otherassistance === "1" ? true : false,
    // ***********************************

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
    StatusChangesForm: data[0]?.statuschangesform === "1" ? true : false,
    StatusChangesFormDate: data[0]?.statuschangesformdate || null,
    ComprehensiveRiskBehaviorAssessmentUpdates:
      data[0]?.comprehensiveriskbehaviorassessmentupdates === "1"
        ? true
        : false,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate:
      data[0]?.comprehensiveriskbehaviorassessmentupdatesdate || null,

    M11QForm: data[0]?.m11qform === "1" ? true : false,
    M11QFormDate: data[0]?.m11qformdate || null,
    CD4VLReports: data[0]?.cd4vlreports === "1" ? true : false,
    CD4VLReportsDate: data[0]?.cd4vlreportsdate || null,
    InitialTreatmentAdherenceIntake:
      data[0]?.initialtreatmentadherenceintake === "1" ? true : false,
    InitialTreatmentAdherenceIntakeDate:
      data[0]?.initialtreatmentadherenceintakedate || null,
    TreatmentAdherenceUpdates:
      data[0]?.treatmentadherenceupdates === "1" ? true : false,
    TreatmentAdherenceUpdatesDate:
      data[0]?.treatmentadherenceupdatesdate || null,
    AIRSCollateralInformation:
      data[0]?.airscollateralinformation === "1" ? true : false,
    AIRSCollateralInformationDate: data[0]?.airscollateralinformationdate,
    AIRSDrugRegimen: data[0]?.airsdrugregimen === "1" ? true : false,
    AIRSDrugRegimenDate: data[0]?.airsdrugregimendate || null,
    AIRSFinancialInformation:
      data[0]?.airsfinancialinformation === "1" ? true : false,
    AIRSFinancialInformationDate: data[0]?.airsfinancialinformationdate,
    AIRSHIVAIDSRiskHistory:
      data[0]?.airshivaidsriskhistory === "1" ? true : false,
    AIRSHIVAIDSRiskHistoryDate: data[0]?.airshivaidsriskhistorydate || null,
    AIRSHIVStatusHistory: data[0]?.airshivstatushistory === "1" ? true : false,
    AIRSHIVStatusHistoryDate: data[0]?.airshivstatushistorydate || null,
    AIRSHIVMedicalProvider:
      data[0]?.airshivmedicalprovider === "1" ? true : false,
    AIRSHIVMedicalProviderDate: data[0]?.airshivmedicalproviderdate || null,
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
    SupportGroups: data[0]?.supportgroups === "1" ? true : false,
    SupportGroupsDate: data[0]?.supportgroupsdate || null,
    IDGForm: data[0]?.idgform === "1" ? true : false,
    IDGFormDate: data[0]?.idgformdate || null,
    progressNoteText: data[0]?.progressnotetext || "",
    HCWSignature:
      data[0]?.hcwsignature === "0" ||
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
    goal1WorkedComments: data[0]?.goal1workedcomments || "",
    goal2WorkedComments: data[0]?.goal2workedcomments || "",
    goal3WorkedComments: data[0]?.goal3workedcomments || "",
  });
  console.log("form", clientData);

  const [msaData, setMsaData] = useState({
    clientId: msa[0]?.clientid,
    AIRSCollateralInformation:
      msa[0]?.airscollateralinformation === "1" ? true : false,
    AIRSCollateralInformationDate: msa[0]?.airscollateralinformationdate,
    AIRSFinancialInformation:
      msa[0]?.airsfinancialinformation === "1" ? true : false,
    AIRSFinancialInformationDate: msa[0]?.airsfinancialinformationdate,
    AIRSHIVAIDSRiskHistory:
      msa[0]?.airshivaidsriskhistory === "1" ? true : false,
    AIRSHIVAIDSRiskHistoryDate: msa[0]?.airshivaidsriskhistorydate,
    AIRSHCVHistory: msa[0]?.airshcvhistory === "1" ? true : false,
    AIRSHCVHistoryDate: msa[0]?.airshcvhistorydate,
    AIRSHousingInformation:
      msa[0]?.airshousinginformation === "1" ? true : false,
    AIRSHousingInformationDate: msa[0]?.airshousinginformationdate,
    AIRSInsuranceInformation:
      msa[0]?.airsinsuranceinformation === "1" ? true : false,
    AIRSInsuranceInformationDate: msa[0]?.airsinsuranceinformationdate,
    AIRSSubstanceUseHistory:
      msa[0]?.airssubstanceusehistory === "1" ? true : false,
    AIRSSubstanceUseHistoryDate: msa[0]?.airssubstanceusehistorydate,
    LNEClientRights: msa[0]?.lneclientrights === "1" ? true : false,
    LNEClientRightsDate: msa[0]?.lneclientrightsdate,
    LNEClientGrievancePolicyProcedure:
      msa[0]?.lneclientgrievancepolicyprocedure === "1" ? true : false,
    LNEClientGrievancePolicyProcedureDate:
      msa[0]?.lneclientgrievancepolicyproceduredate,
    LNEProgramRules: msa[0]?.lneprogramrules === "1" ? true : false,
    LNEProgramRulesDate: msa[0]?.lneprogramrulesdate,
    LNEEmergencyContactConsent:
      msa[0]?.lneemergencycontactconsent === "1" ? true : false,
    LNEEmergencyContactConsentDate: msa[0]?.lneemergencycontactconsentdate,
    LNEConsentForReleaseOfConfidentialInformation:
      msa[0]?.lneconsentforreleaseofconfidentialinformation === "1"
        ? true
        : false,
    LNEConsentForReleaseOfConfidentialInformationDate:
      msa[0]?.lneconsentforreleaseofconfidentialinformationdate,
    HIPPAConsentForm: msa[0]?.hippaconsentform === "1" ? true : false,
    HIPPAConsentFormDate: msa[0]?.hippaconsentformdate,
    NYCDOHMHNoticeOfPrivacyPractices:
      msa[0]?.nycdohmhnoticeofprivacypractices === "1" ? true : false,
    NYCDOHMHNoticeOfPrivacyPracticesDate:
      msa[0]?.nycdohmhnoticeofprivacypracticesdate,
    LNEOutreachRetentionTrackingForm:
      msa[0]?.lneoutreachretentiontrackingform === "1" ? true : false,
    LNEOutreachRetentionTrackingFormDate:
      msa[0]?.lneoutreachretentiontrackingformdate,
    LNEReferralInformation:
      msa[0]?.lnereferralinformation === "1" ? true : false,
    LNEReferralInformationDate: msa[0]?.lnereferralinformationdate,
    LNEClientReferralForm: msa[0]?.lneclientreferralform === "1" ? true : false,
    LNEClientReferralFormDate: msa[0]?.lneclientreferralformdate,
    LNEHNSEligibilityForm: msa[0]?.lnehnseligibilityform === "1" ? true : false,
    LNEHNSEligibilityFormDate: msa[0]?.lnehnseligibilityformdate,
    progressNoteDate: msa[0]?.progressnotedate,
    StatusChangesForm: msa[0]?.statuschangesform === "1" ? true : false,
    StatusChangesFormDate: msa[0]?.statuschangesformdate,
    ComprehensiveRiskBehaviorAssessmentUpdates:
      msa[0]?.comprehensiveriskbehaviorassessmentupdates === "1" ? true : false,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate:
      msa[0]?.comprehensiveriskbehaviorassessmentupdatesdate,
    M11QForm: msa[0]?.m11qform === "1" ? true : false,
    M11QFormDate: msa[0]?.m11qformdate,
    CD4VLReports: msa[0]?.cd4vlreports === "1" ? true : false,
    CD4VLReportsDate: msa[0]?.cd4vlreportsdate,
    InitialTreatmentAdherenceIntake:
      msa[0]?.initialtreatmentadherenceintake === "1" ? true : false,
    InitialTreatmentAdherenceIntakeDate:
      msa[0]?.initialtreatmentadherenceintakedate,
    TreatmentAdherenceUpdates:
      msa[0]?.treatmentadherenceupdates === "1" ? true : false,
    TreatmentAdherenceUpdatesDate: msa[0]?.treatmentadherenceupdatesdate,
    AIRSDrugRegimen: msa[0]?.airsdrugregimen === "1" ? true : false,
    AIRSDrugRegimenDate: msa[0]?.airsdrugregimendate,
    AIRSHIVStatusHistory: msa[0]?.airshivstatushistory === "1" ? true : false,
    AIRSHIVStatusHistoryDate: msa[0]?.airshivstatushistorydate,
    AIRSHIVMedicalProvider:
      msa[0]?.airshivmedicalprovider === "1" ? true : false,
    AIRSHIVMedicalProviderDate: msa[0]?.airshivmedicalproviderdate,
    SupportGroups: msa[0]?.supportgroups === "1" ? true : false,
    SupportGroupsDate: msa[0]?.supportgroupsdate,
    IDGForm: msa[0]?.idgform === "1" ? true : false,
    IDGFormDate: msa[0]?.idgformdate,
    HNSReadinessForm: msa[0]?.hnsreadinessform === "1" ? true : false,
    InternalReferralInformation:
      msa[0]?.internalreferralinformation === "1" ? true : false,
    LinkageRetentionAdherenceForms:
      msa[0]?.linkageretentionadherenceforms === "1" ? true : false,
    InternalReferralInformationDate: msa[0]?.internalreferralinformationdate,
    LinkageRetentionAdherenceFormsDate:
      msa[0]?.linkageretentionadherenceformsdate,
    HNSReadinessFormDate: msa[0]?.hnsreadinessformdate,
    ProgressNoteReviewed: msa[0]?.progressnotereviewed === "1" ? true : false,
  });
  const whichServiceBeenAded = [
    // {
    //   value: clientData?.LNEHNSEligibilityForm,
    //   state_label: "LNEHNSEligibilityForm",
    //   row_color: "bg-msaForm-light-blue",
    //   form_text: "HNS Eligibility Assessment",
    // },
    // {value:clientData?.HNSReadinessForm ,state_label: "HNSReadinessForm",row_color: "bg-msaForm-light-blue", form_text: "HNS Readiness Assessment", },
    {
      value: clientData?.StatusChangesForm,
      state_label: "StatusChangesForm",
      row_color: "bg-msaForm-light-blue",
      form_text: "Status Changes/Closure Forms",
    },
    {
      value: clientData?.ComprehensiveRiskBehaviorAssessmentUpdates,
      state_label: "ComprehensiveRiskBehaviorAssessmentUpdates",
      row_color: "bg-msaForm-light-blue",
      form_text: "Comprehensive Behavioral Risk Assessment Updates",
    },
    {
      value: clientData?.M11QForm,
      state_label: "M11QForm",
      row_color: "bg-msaForm-light-blue",
      form_text: "M11Q",
    },
    {
      value: clientData?.CD4VLReports,
      state_label: "CD4VLReports",
      row_color: "bg-msaForm-light-blue",
      form_text: "CD4/VL Check Reports",
    },
    {
      value: clientData?.InitialTreatmentAdherenceIntake,
      state_label: "InitialTreatmentAdherenceIntake",
      row_color: "bg-msaForm-light-blue",
      form_text: "Initial Treatment Adherence Intake",
    },
    {
      value: clientData?.TreatmentAdherenceUpdates,
      state_label: "TreatmentAdherenceUpdates",
      row_color: "bg-msaForm-light-blue",
      form_text: "Treatment Adherence Updates",
    },
    // {
    //   value: clientData?.AIRSCollateralInformation,
    //   state_label: "AIRSCollateralInformation",
    //   row_color: "bg-msaForm-light-blue",
    //   form_text: "AIRS Collateral Information",
    // },
    // {
    //   value: clientData?.AIRSDrugRegimen,
    //   state_label: "AIRSDrugRegimen",
    //   row_color: "bg-msaForm-light-blue",
    //   form_text: "AIRS Drug Regimen History",
    // },
    // {
    //   value: clientData?.AIRSFinancialInformation,
    //   state_label: "AIRSFinancialInformation",
    //   row_color: "bg-msaForm-light-blue",
    //   form_text: "AIRS Financial Information",
    // },
    // {
    //   value: clientData?.AIRSHIVAIDSRiskHistory,
    //   state_label: "AIRSHIVAIDSRiskHistory",
    //   row_color: "bg-msaForm-light-blue",
    //   form_text: "AIRS HIV AIDS Risk History",
    // },
    // {
    //   value: clientData?.AIRSHIVMedicalProvider,
    //   state_label: "AIRSHIVMedicalProvider",
    //   row_color: "bg-msaForm-light-blue",
    //   form_text: "AIRS HIV Medical Provider History",
    // },
    // {
    //   value: clientData?.AIRSHIVStatusHistory,
    //   state_label: "AIRSHIVStatusHistory",
    //   row_color: "bg-msaForm-light-blue",
    //   form_text: "AIRS HIV Status History",
    // },
    // {
    //   value: clientData?.AIRSHCVHistory,
    //   state_label: "AIRSHCVHistory",
    //   row_color: "bg-msaForm-light-blue",
    //   form_text: "AIRS HCV History",
    // },
    // {
    //   value: clientData?.AIRSHousingInformation,
    //   state_label: "AIRSHousingInformation",
    //   row_color: "bg-msaForm-light-blue",
    //   form_text: "AIRS Housing Information",
    // },
    // {
    //   value: clientData?.AIRSInsuranceInformation,
    //   state_label: "AIRSInsuranceInformation",
    //   row_color: "bg-msaForm-light-blue",
    //   form_text: "AIRS Insurance Information",
    // },
    // {
    //   value: clientData?.AIRSSubstanceUseHistory,
    //   state_label: "AIRSSubstanceUseHistory",
    //   row_color: "bg-msaForm-light-blue",
    //   form_text: "AIRS Substance Use History",
    // },
    // {
    //   value: clientData?.LNEClientRights,
    //   state_label: "LNEClientRights",
    //   row_color: "bg-light-green",
    //   form_text: "LNE Client Rights",
    // },
    // {
    //   value: clientData?.LNEClientGrievancePolicyProcedure,
    //   state_label: "LNEClientGrievancePolicyProcedure",
    //   row_color: "bg-light-green",
    //   form_text: "LNE Client Grievance Policy & Procedure",
    // },
    // {
    //   value: clientData?.LNEProgramRules,
    //   state_label: "LNEProgramRules",
    //   row_color: "bg-light-green",
    //   form_text: "LNE Program Rules",
    // },
    // {
    //   value: clientData?.LNEEmergencyContactConsent,
    //   state_label: "LNEEmergencyContactConsent",
    //   row_color: "bg-light-green",
    //   form_text: "LNE Emergency Contact Consent",
    // },
    // {
    //   value: clientData?.LNEConsentForReleaseOfConfidentialInformation,
    //   state_label: "LNEConsentForReleaseOfConfidentialInformation",
    //   row_color: "bg-light-green",
    //   form_text: "LNE Consent for Release of Confidential Information",
    // },
    // {
    //   value: clientData?.HIPPAConsentForm,
    //   state_label: "HIPPAConsentForm",
    //   row_color: "bg-light-green",
    //   form_text: "HIPAA Consent Form (OCA Form 960), ",
    // },
    // {
    //   value: clientData?.NYCDOHMHNoticeOfPrivacyPractices,
    //   state_label: "NYCDOHMHNoticeOfPrivacyPractices",
    //   row_color: "bg-light-green",
    //   form_text:
    //     "NYC DOHMH Notice of Privacy Practices - Acknowledgement of Receipt",
    // },
    {
      value: clientData?.LinkageRetentionAdherenceForms,
      state_label: "LinkageRetentionAdherenceForms",
      row_color: "bg-msaForm-light-violet",
      form_text: "Linkage, Retention, & Adherence Forms",
    },
    {
      value: clientData?.InternalReferralInformation,
      state_label: "InternalReferralInformation",
      row_color: "bg-msaForm-light-violet",
      form_text: "Internal Referral Information",
    },
    // {
    //   value: clientData?.LNEClientReferralForm,
    //   state_label: "LNEClientReferralForm",
    //   row_color: "bg-msaForm-light-violet",
    //   form_text: "Identification",
    // },
    // {
    //   value: clientData?.HNSReadinessForm,
    //   state_label: "HNSReadinessForm",
    //   row_color: "bg-msaForm-light-violet",
    //   form_text: "HNS Readiness Form",
    // },
    {
      value: clientData?.SupportGroups,
      state_label: "SupportGroups",
      row_color: "bg-msaForm-light-violet",
      form_text: "Support Groups",
    },
    {
      value: clientData?.IDGForm,
      state_label: "IDGForm",
      row_color: "bg-msaForm-light-violet",
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
    goal1Details: data[0]?.goal1details,
    goal2Details: data[0]?.goal2details,
    goal3Details: data[0]?.goal3details,
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

  console.log("msaData", msaData);
  const handleMsaformUpdate = () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientData.clientId}/update_msa_form_from_progress_note`,
        {
          msaData,
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
          setTimeout(() => router.back(), 2000);
          // console.log(response);
          notifyMessage();
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
      

        <SubHeader pageTitle={'Edit Progress Note'}/>

        <div className="pt-10 shadow-inner">
          <section className="container mx-auto bg-white grid divide-y-2 divide-[#5AC0FF] shadow-lg border-blue rounded-md ">
            <ClientInfoTopHeader
              data={data}
              clientData={clientData}
              setClientData={setClientData}
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
                        checked={
                          clientData.comprehensiveBehavioralRiskAssessment
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
                        checked={clientData.escort}
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
                        defaultChecked={
                          clientData.SupportGroups ? "checked" : ""
                        }
                        onChange={() =>
                          setClientData({
                            ...clientData,
                            SupportGroups: !clientData.SupportGroups,
                          })
                        }
                      />
                      Support Groups
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
                        defaultChecked={
                          clientData.implementationActionPlan ? "checked" : ""
                        }
                      />
                      Implementation of Action Plan
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
                        defaultChecked={
                          clientData.housingAssistance ? "checked" : ""
                        }
                      />
                      Assistance with Housing Services
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
                        defaultChecked={
                          clientData.benefitsAssistance ? "checked" : ""
                        }
                      />
                      Assistance with Access to Benefits / Entitlements
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
                        defaultChecked={
                          clientData.employmentAssistance ? "checked" : ""
                        }
                      />
                      Assistance with Employment / Education
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
                    </label>
                  </div>
                </div>

                {/* SERVICE PROVIDED 3rd COLUMN " */}

                {/* <div className="services-box grid grid-rows-5 gap-y-3 items-start justify-start">
                  <div className="flex items-center">
                    <label className="flex items-center gap-x-5">
                      <input
                        type="checkbox"
                        defaultChecked={
                          clientData.SupportGroups ? "checked" : ""
                        }
                        onChange={() =>
                          setClientData({
                            ...clientData,
                            SupportGroups: !clientData.SupportGroups,
                          })
                        }
                      />
                      Support Groups
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
                        defaultChecked={
                          clientData.implementationActionPlan ? "checked" : ""
                        }
                      />
                      Implementation of Action Plan
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
                        defaultChecked={
                          clientData.housingAssistance ? "checked" : ""
                        }
                      />
                      Assistance with Housing Services
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
                        defaultChecked={
                          clientData.benefitsAssistance ? "checked" : ""
                        }
                      />
                      Assistance with Access to Benefits / Entitlements
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
                        defaultChecked={
                          clientData.employmentAssistance ? "checked" : ""
                        }
                      />
                      Assistance with Employment / Education
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
                    </label>
                  </div>
                </div> */}
              </div>
            </section>

            <section className="p-10 pt-7 goals" id="goals">
              <div className="flex gap-3 items-center mb-10">
                <img
                  src="/progress_notes/client_goals.svg"
                  alt="Client goals icon"
                />
                <h3 className="font-bold text-2xl">Client Goals</h3>
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
                        {serviceActionData?.goal1targetdate?.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="goal-summary">
                    <p className="text-xl font-medium">Summary</p>
                    <p className="bg-primary-light-blue mt-3 p-3 rounded text-lg ">
                      {serviceActionData?.goal1Details || "-"}
                    </p>
                  </div>
                  {/* <div className="">
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
                </div> */}
                </div>

                <div className="goal-box grid gap-y-7">
                  {/* <div className="goal-top flex items-center my-2">
                    <h3 className="font-bold">Goal 2</h3>
                    <div className="bg-dark-blue md:w-24 lg:w-52  mx-2 h-px"></div>
                    <img src={"/goal02.svg"} alt="" />
                  </div> */}

                  <div className="goal-service grid my-2">
                    <div className="flex flex-col gap-3 items-start">
                      <span className="text-xl font-medium">Target Date</span>
                      <p className="bg-primary-light-blue p-3 rounded text-lg">
                        {serviceActionData?.goal2targetdate?.split("T")[0] ||
                          "-"}
                      </p>
                    </div>
                  </div>
                  <div className="goal-summary">
                    <span className="text-xl font-medium">Summary</span>
                    <p className="bg-primary-light-blue mt-3 p-3 rounded text-lg">
                      {serviceActionData?.goal2Details || "-"}
                    </p>
                  </div>
                  {/* <div className="">
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
                </div> */}
                </div>

                {/* <div className="goal-box">
                  <div className="goal-top flex items-center my-2">
                    <h3 className="font-bold">Goal 3</h3>
                    <div className="bg-dark-blue md:w-24 lg:w-52  mx-2 h-px"></div>
                    <img src={"/goal03.svg"} alt="" />
                  </div>

                  <div className="goal-service grid grid-cols-2 my-2">
                    {/* <div>
                    <span className="">Service Category</span>
                    <p className=" text-dark-blue ">
                    {serviceActionData?.goal3servicecategory}
                    </p>
                  </div> 
                    <div>
                      <span className="">Target Date</span>
                      <p className="text-dark-blue ">
                        {serviceActionData?.goal3targetdate?.split("T")[0] ||
                          "-"}
                      </p>
                    </div>
                  </div>
                  <div className="goal-summary my-2  ">
                    <span className="">Summary</span>
                    <p className=" text-dark-blue">
                      {serviceActionData?.goal3Details || "-"}
                    </p>
                  </div>
                  {/*  <div className="">
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
                    <label className="flex gap-5 text-xl items-center">
                      <input
                        type="radio"
                        name="workedGoals1"
                        onChange={(e) =>
                          setClientData({
                            ...clientData,
                            goal1Progress: true,
                            goal1ProgressDate: clientData.progressNoteDate,
                          })
                        }
                        defaultChecked={
                          clientData.goal1Progress === true ? "checked" : ""
                        }
                      />
                      Yes
                    </label>

                    <label className="flex gap-5 text-xl items-center">
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
                      No
                    </label>
                  </div>

                  <div className="mb-7">
                    {/* <div className={`calendarIcon`}>
                      <img src="/date-calendar.svg" width={24} alt="" />
                    </div> */}
                    <h3 className="text-xl mb-3 font-medium">Target date</h3>
                    <input
                      type="date"
                      id=""
                      className="rounded-lg border-black p-2 text-lg"
                      value={clientData.goal1ProgressDate?.split("T")[0]}
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal1ProgressDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="">
                    <p className="mb-3 font-medium text-xl">
                      Goal 1 worked comments
                    </p>
                    <textarea
                      name=""
                      id=""
                      rows="10"
                      className="border-black rounded-md w-full  text-lg p-2"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal1WorkedComments: e.target.value,
                        })
                      }
                      defaultValue={clientData.goal1WorkedComments}
                    ></textarea>
                  </div>
                </div>
                <div>
                <p className="text-xl mb-3 font-medium">Goal 2</p>
                <div className="workedGoals-box flex gap-20 mb-7">
                  <label className="flex gap-5 text-xl items-center">
                    <input
                      type="radio"
                      name="workedGoals2"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          goal2Progress: true,
                          goal2ProgressDate: clientData.progressNoteDate,
                        })
                      }
                      defaultChecked={
                        clientData.goal2Progress === true ? "checked" : ""
                      }
                    />
                    Yes
                  </label>
                  <label className="flex gap-5 text-xl items-center">
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
                    No
                  </label>
                </div>

                <div className="mb-7">
                  {/* <div className={`calendarIcon`}>
                      <img src="/date-calendar.svg" width={24} alt="" />
                    </div> */}
                  <h3 className="text-xl mb-3 font-medium">Target date</h3>
                  <input
                    type="date"
                    id=""
                    className="rounded-lg border-black p-2 text-lg"
                    value={clientData.goal2ProgressDate?.split("T")[0]}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        goal2ProgressDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="">
                  <p className="mb-3 font-medium text-xl">
                    Goal 2 Worked Comments
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
                    defaultValue={clientData.goal2WorkedComments}
                  ></textarea>
                </div>
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
                      defaultValue={clientData.goal3WorkedComments}
                    ></textarea>
                  </div>
                </div> */}
              {/* </div> */}
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
                            goal1CompletedDate: crearFecha(),
                          });
                          setDataForSAP({
                            ...dataForSAP,
                            goal1Completed: true,
                          });
                        }}
                        defaultChecked={
                          clientData.goal1Completed === true ? "checked" : ""
                        }
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
                        defaultChecked={
                          clientData.goal1Completed === false ? "checked" : ""
                        }
                      />
                      No
                    </label>
                  </div>
                  <div className="mb-7">
                    <h3 className="font-medium text-xl mb-3">Target date</h3>
                    <input
                      type="date"
                      id=""
                      className="rounded-lg border-black text-lg p-1"
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
                  <div className="mt-5">
                    <p className="text-xl font-medium mb-3">
                      Goal 1 Completion Comments
                    </p>
                    <textarea
                      name=""
                      id=""
                      rows="10"
                      className="border-black rounded-md w-full mt p-2 text-lg"
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
                            goal2CompletedDate: crearFecha(),
                          });
                          setDataForSAP({
                            ...dataForSAP,
                            goal2Completed: true,
                          });
                        }}
                        defaultChecked={
                          clientData.goal2Completed === true ? "checked" : ""
                        }
                      />
                      Yes
                    </label>

                    <label className={`flex items-center gap-5 text-xl`}>
                      <input
                        type="radio"
                        name="completedGoals2"
                        onClick={(e) => {
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
                        defaultChecked={
                          clientData.goal2Completed === false ? "checked" : ""
                        }
                      />
                      No
                    </label>
                  </div>
                  <div className="mb-7">
                    <h3 className="font-medium text-xl mb-3">Target date</h3>
                    <input
                      type="date"
                      id=""
                      className="rounded-lg border-black text-lg p-1 "
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
                  <div className="mt-5">
                    <p className="text-xl font-medium mb-3">
                      Goal 2 completion comments
                    </p>
                    <textarea
                      name=""
                      id=""
                      rows="10"
                      className="border-black rounded-md w-full  p-2 text-lg"
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

                {/* <div>
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
                          setDataForSAP({
                            ...dataForSAP,
                            goal3Completed: true,
                          });
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
                          setDataForSAP({
                            ...dataForSAP,
                            goal3Completed: false,
                          });
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
                      defaultValue={clientData.goal3CompletionComments}
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
              <p className="text-xl mb-7 font-medium">Progress Notes</p>
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
                defaultValue={clientData.progressNoteText}
              ></textarea>

              <div className="progressnotes-box">
                <p className="text-xl font-medium mb-3">
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
                      checked={clientData.HCWSignature === true}
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
                      checked={clientData.HCWSignature === false}
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
                      whichServiceBeenAded.slice(...e).map((service) => (
                        <>
                          <div
                            className={`${MSAStyles.formRowsContainer} ${service.row_color} flex gap-3 py-2 pl-2 mt-1`}
                          >
                            <label className="flex items-center gap-5">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                defaultChecked={service.value ? "checked" : ""}
                                // disabled={clientData[`${service.state_label}Date`] ? true : false} */

                                onChange={(e) => {
                                  //This logic will update services added to MSA apart from set the same services to
                                  // the progress note, progress note logic will have services setted to false in
                                  // every register
                                  if (msaData[service.state_label]) {
                                    if (
                                      new Date(
                                        msaData[`${service.state_label}Date`]
                                      )
                                        .toISOString()
                                        .split("T")[0] ===
                                      new Date().toISOString().split("T")[0]
                                    ) {
                                      let lastDateUpdatedFromDb =
                                        data[0][
                                          `${service.state_label}Date`.toLowerCase()
                                        ];
                                      let serviceStatusFromDb =
                                        data[0][
                                          service.state_label.toLowerCase()
                                        ] === "1"
                                          ? true
                                          : false;
                                      setMsaData({
                                        ...msaData,
                                        [service.state_label]:
                                          serviceStatusFromDb,
                                        [`${service.state_label}Date`]:
                                          lastDateUpdatedFromDb,
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
                                  } else {
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
                        </>
                      ))}
                  </div>
                ))}
              </div>{" "}
              {/* </div> */}
            </section>
          </section>

          <section id="save" className="my-10">
            {pnErrorMessage && (
              <p className="text-red-500 text-center my-3">{pnErrorMessage}</p>
            )}
            <div className="container mx-auto flex justify-center gap-x-10">
              <button
                className="btn-yellow hover:bg-yellow-100 flex items-center gap-5 px-5 py-2 rounded shadow-lg text-xl inline-block "
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
                  <button className="bg-black text-white flex items-center gap-3 px-5 hover:bg-gray-700  px-5 py-2 rounded shadow-xl text-lg inline-block ">
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
          </section>
        </div>

                  
              <div style={{display:'none'}}>
                <ProgressNoteToPrint ref={componentRef}  data={clientData}/>
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
    const [data, msa] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes/${clientid}/profile/${id}`
      ).then((data) => data.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/msa/${clientid}`
      ).then((data) => data.json()),
    ]);

    return { props: { data, id, msa } };
  },
});
