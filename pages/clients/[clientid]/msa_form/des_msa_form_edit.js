import React, { useState } from "react";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Styles from "../../../../styles/ServiceAP.module.css";
import MSAStyles from "../../../../styles/MSA.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackToDashboardButton from "../../../../components/BackToDashboardButton";
import RowMsaFormDES from "../../../../components/RowMsaFormDES";

const EditMsaFormPage = ({ data }) => {
  console.log("data", data);

  const router = useRouter();

  const notifyMessage = () => {
    toast.success("MSA Form updated!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const { user, error, isLoading } = useUser();
  const loggedUserRole =
    user && user["https://lanuevatest.herokuapp.com/roles"];

  const disableUserIfNotSupervisor = () =>
    loggedUserRole === "HCW" ? true : false;

  const [clientData, setClientData] = useState({
    dateFormReviewed: new Date(),
    clientId: data[0].clientid,
    clientFirstName: data[0].clientfirstname,
    clientLastName: data[0].clientlastname,
    clientHCWID: data[0].clienthcwid,
    planStartDate: "",
    userFirstName: data[0].userfirstname,
    userLastName: data[0].userlastname,

    AIRSIntakeForm:
      data[0].AIRSIntakeForm === "0" || data[0].AIRSIntakeForm === null
        ? false
        : true,
    AIRSIntakeFormDate: data[0].airsintakeformdate,
    AIRSIntakeFormPDF: false,
    AIRSIntakeFormScan: false,
    AIRSIntakeFormUploadDate: data[0].airsintakeformuploaddate || null,
    airsintakeformreviewed: data[0].airsintakeformreviewed,
    airsintakeformissues:data[0].airsintakeformreviewed,

    ComprehensiveRiskBehaviorAssessment:
      data[0].comprehensiveriskbehaviorassessment === "0" ||
      data[0].comprehensiveriskbehaviorassessment === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentDate:
      data[0].comprehensiveriskbehaviorassessmentdate,
    ComprehensiveRiskBehaviorAssessmentPDF: false,
    ComprehensiveRiskBehaviorAssessmentScan: false,
    ComprehensiveRiskBehaviorAssessmentUploadDate:
      data[0].comprehensiveriskbehaviorassessmentuploaddate || null,
      comprehensiveriskbehaviorassessmentreviewed:data[0].comprehensiveriskbehaviorassessmentreviewed,
      comprehensiveriskbehaviorissues:data[0].comprehensiveriskbehaviorissues,
    ServiceActionPlan:
      data[0].serviceactionplan === "0" || data[0].serviceactionplan === null
        ? false
        : true,
    ServiceActionPlanDate: data[0].sapplanstartdate,
    // ServiceActionPlanPDF: data[0].serviceactionplanpdf === "0" ? true : false,
    ServiceActionPlanScan:
      data[0].serviceactionplanscan === "0" ||
      data[0].serviceactionplanscan === null
        ? false
        : true,
    ServiceActionPlanUploadDate: data[0].serviceactionplanuploaddate || null,
    servicesactionreviewed:data[0].servicesactionplanreviewed,
    servicesactionplanissues:data[0].servicesactionplanissues,
    ServiceActionPlanPDF:false,
    ServiceActionPlanScan:false,

    ProgressNote:
      data[0].progressnoteid === "" || data[0].progressnoteid === null
        ? false
        : true,
    ProgressNoteDate: data[0].progressnotedate,
    ProgressNoteUploadDate: data[0].progressnoteuploaddate || null,
    ProgressNoteScan:
      data[0].progressnotescan || data[0].progressnotescan === null
        ? false
        : true,
    ProgressNotePDF:
      data[0].progressnotepdf || data[0].progressnotepdf === null
        ? false
        : true,
        progressnotesreviewed:data[0].progressnotereviewed,
        progressnoteissues:data[0].progressnoteissues,

    StatusChangesForm:
      data[0].statuschangesform === "0" || data[0].statuschangesform === null
        ? false
        : true,
    StatusChangesFormDate: data[0].statuschangesformdate,
    StatusChangesFormUploadDate: data[0].statuschangesformuploaddate,
    StatusChangesFormScan: false,
    StatusChangesFormPDF: false,
    statuschangesformreviewed:data[0].statuschangesformreviewed,
    statuschangesformissues:data[0].statuschangesformissues,

    ComprehensiveRiskBehaviorAssessmentUpdates:
      data[0].comprehensiveriskbehaviorassessmentupdates === "0" ||
      data[0].comprehensiveriskbehaviorassessmentupdates === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate:
      data[0].comprehensiveriskbehaviorassessmentdate,
    ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate:
      data[0].comprehensiveriskbehaviorassessmentuploaddate,
    ComprehensiveRiskBehaviorAssessmentUpdatesScan: false,
    ComprehensiveRiskBehaviorAssessmentUpdatesPDF: false,
    comprehensiveriskbehaviorassessmentupdatesreviewed:data[0].comprehensiveriskbehaviorassessmentupdatesreviewed,
    comprehensiveriskbehaviorassessmentupdatesissues:data[0].comprehensiveriskbehaviorassessmentupdatesissues,

    M11QForm:
      data[0].m11qform === "0" || data[0].m11qform === null ? false : true,
    M11QFormDate: data[0].m11qformdate,
    M11QFormUploadDate: data[0].m11qformuploaddate,
    M11QFormScan: false,
    M11QFormPDF: false,
    m11qformreviewed:data[0].m11qformreviewed,
    m11qformissues:data[0].m11qformissues,

    CD4VLReports:
      data[0].cd4vlreports === "0" || data[0].cd4vlreports === null
        ? false
        : true,
    CD4VLReportsDate: data[0].cd4vlreportsdate,
    CD4VLReportsUploadDate: data[0].cd4vlreportsuploaddate,
    CD4VLReportsScan: false,
    CD4VLReportsPDF: false,
    cd4vlreportsreviewed:data[0].cd4vlreportsreviewed,
    cd4vlreportsissues:data[0].cd4vlreportsissues,

    InitialTreatmentAdherenceIntake:
      data[0].initialtreatmentadherenceintake === "0" ||
      data[0].initialtreatmentadherenceintake === null
        ? false
        : true,
    InitialTreatmentAdherenceIntakeDate:
      data[0].initialtreatmentadherenceintakedate,
    InitialTreatmentAdherenceIntakeUploadDate:
      data[0].initialtreatmentadherenceintakeuploaddate,
    InitialTreatmentAdherenceIntakeScan: false,
    InitialTreatmentAdherenceIntakePDF: false,
    initialtreatmentadherenceintakereviewed:data[0].initialtreatmentadherenceintakereviewed,
    initialtreatmentadherenceintakeissues:data[0].initialtreatmentadherenceintakeissues,

    TreatmentAdherenceUpdates:
      data[0].treatmentadherenceupdates === "0" ||
      data[0].treatmentadherenceupdates === null
        ? false
        : true,
    TreatmentAdherenceUpdatesDate: data[0].treatmentadherenceupdatesdate,
    TreatmentAdherenceUpdatesUploadDate:
      data[0].treatmentadherenceupdatesuploaddate,
    TreatmentAdherenceUpdatesScan: false,
    TreatmentAdherenceUpdatesPDF: false,
    treatmentadherenceupdatesreviewed:data[0].treatmentadherenceupdatesreviewed,
    treatmentadherenceupdatesissues:data[0].treatmentadherenceupdatesissues,

    AIRSCollateralInformation:
      data[0].airscollateralinformation === "0" ||
      data[0].airscollateralinformation === null
        ? false
        : true,
    AIRSCollateralInformationDate: data[0].airscollateralinformationdate,
    AIRSCollateralInformationPDF: false,
    AIRSCollateralInformationScan: false,
    AIRSCollateralInformationUploadDate:data[0].airscollateralinformationuploaddate || null,
    airscollateralinformationreviewed:data[0].airscollateralinformationreviewed,
    airscollateralinformationissues:data[0].airscollateralinformationissues,

    AIRSDrugRegimen:
      data[0].airsdrugregimen === "0" || data[0].airsdrugregimen === null
        ? false
        : true,
    AIRSDrugRegimenDate: data[0].airsdrugregimendate,
    AIRSDrugRegimenPDF: false,
    AIRSDrugRegimenScan: false,
    AIRSDrugRegimenUploadDate: data[0].airsdrugregimenuploaddate || null,
    airsdrugregimenreviewed:data[0].airsdrugregimenreviewed,
    airsdrugregimenissues:data[0].airsdrugregimenissues,

    AIRSFinancialInformation:
      data[0].airsfinancialinformation === "0" ||
      data[0].airsfinancialinformation === null
        ? false
        : true,
    AIRSFinancialInformationDate: data[0].airsfinancialinformationdate,
    AIRSFinancialInformationPDF: false,
    AIRSFinancialInformationScan: false,
    AIRSFinancialInformationUploadDate:
      data[0].airsfinancialinformationuploaddate || null,
      airsfinancialinformationreviewed:data[0].airsfinancialinformationreviewed,
      airsfinancialinformationissues:data[0].airsfinancialinformationissues,

    AIRSHIVAIDSRiskHistory:
      data[0].airshivaidsriskhistory === "0" ||
      data[0].airshivaidsriskhistory === null
        ? false
        : true,
    AIRSHIVAIDSRiskHistoryDate: data[0].airshivaidsriskhistorydate,
    AIRSHIVAIDSRiskHistoryPDF: false,
    AIRSHIVAIDSRiskHistoryScan: false,
    AIRSHIVAIDSRiskHistoryUploadDate:
      data[0].airshivaidsriskhistoryuploaddate || null,
      airshivaidsriskhistoryreviewed:data[0].airshivaidsriskhistoryreviewed,
      airshivaidsriskhistoryissues:data[0].airshivaidsriskhistoryissues,

    AIRSHIVMedicalProvider:
      data[0].airshivmedicalprovider === "0" ||
      data[0].airshivmedicalprovider === null
        ? false
        : true,
    AIRSHIVMedicalProviderDate: data[0].airshivmedicalproviderdate,
    AIRSHIVMedicalProviderPDF: false,
    AIRSHIVMedicalProviderScan: false,
    AIRSHIVMedicalProviderUploadDate:
      data[0].airshivmedicalprovideruploaddate || null,
      airshivmedicalproviderreviewed:data[0].airshivmedicalproviderreviewed,
      airshivmedicalproviderissues:data[0].airshivmedicalproviderissues,

    AIRSHIVStatusHistory:
      data[0].airshivstatushistory === "0" ||
      data[0].airshivstatushistory === null
        ? false
        : true,
    AIRSHIVStatusHistoryDate: data[0].airshivstatushistorydate,
    AIRSHIVStatusHistoryPDF: false,
    AIRSHIVStatusHistoryScan: false,
    AIRSHIVStatusHistoryUploadDate:
      data[0].airshivstatushistoryuploaddate || null,
      airshivstatushistoryreviewed:data[0].airshivstatushistoryreviewed,
      airshivstatushistoryissues:data[0].airshivstatushistoryissues,

    AIRSHCVHistory:
      data[0].airshcvhistory === "0" || data[0].airshcvhistory === null
        ? false
        : true,
    AIRSHCVHistoryDate: data[0].airshcvhistorydate,
    AIRSHCVHistoryPDF: false,
    AIRSHCVHistoryScan: false,
    AIRSHCVHistoryUploadDate: data[0].airshcvhistoryuploaddate || null,
    airshcvhistoryreviewed:data[0].airshcvhistoryreviewed,
    airshcvhistoryissues:data[0].airshcvhistoryissues,

    AIRSHousingInformation:
      data[0].airshousinginformation === "0" ||
      data[0].airshousinginformation === null
        ? false
        : true,
    AIRSHousingInformationDate: data[0].airshousinginformationdate,
    AIRSHousingInformationPDF: false,
    AIRSHousingInformationScan: false,
    AIRSHousingInformationUploadDate:
      data[0].airshousinginformationuploaddate || null,
      airshousinginformationreviewed:data[0].airshousinginformationreviewed,
      airshousinginformationissues:data[0].airshousinginformationissues,

    AIRSInsuranceInformation:
      data[0].airsinsuranceinformation === "0" ||
      data[0].airsinsuranceinformation === null
        ? false
        : true,
    AIRSInsuranceInformationDate: data[0].airsinsuranceinformationdate,
    AIRSInsuranceInformationPDF: false,
    AIRSInsuranceInformationScan: false,
    AIRSInsuranceInformationUploadDate:
      data[0].airsinsuranceinformationuploaddate || null,
      airsinsuranceinformationreviewed:data[0].airsinsuranceinformationreviewed,
      airsinsuranceinformationissues:data[0].airsinsuranceinformationissues,

    AIRSSubstanceUseHistory:
      data[0].airssubstanceusehistory === "0" ||
      data[0].airssubstanceusehistory === null
        ? false
        : true,
    AIRSSubstanceUseHistoryDate: data[0].airssubstanceusehistorydate,
    AIRSSubstanceUseHistoryPDF: false,
    AIRSSubstanceUseHistoryScan: false,
    AIRSSubstanceUseHistoryUploadDate:
      data[0].airssubstanceusehistoryuploaddate || null,
      airssubstanceusehistoryreviewed:data[0].airssubstanceusehistoryreviewed,
      airssubstanceusehistoryissues:data[0].airssubstanceusehistoryissues,

    LNEClientRights:
      data[0].lneclientrights === "0" || data[0].lneclientrights === null
        ? false
        : true,
    LNEClientRightsDate: data[0].lneclientrightsdate,
    LNEClientRightsPDF: false,
    LNEClientRightsScan: false,
    LNEClientRightsUploadDate: data[0].lneclientrightsuploaddate || null,
    lneclientrightsreviewed:data[0].lneclientrightsreviewed,
    lneclientrightsissues:data[0].lneclientrightsissues,

    LNEClientGrievancePolicyProcedure:
      data[0].lneclientgrievancepolicyprocedure === "0" ||
      data[0].lneclientgrievancepolicyprocedure === null
        ? false
        : true,
    LNEClientGrievancePolicyProcedureDate:
      data[0].lneclientgrievancepolicyproceduredate,
    LNEClientGrievancePolicyProcedurePDF: false,
    LNEClientGrievancePolicyProcedureScan: false,
    LNEClientGrievancePolicyProcedureUploadDate:
      data[0].lneclientgrievancepolicyprocedureuploaddate || null,
      lneclientgrievancepolicyprocedurereviewed:data[0].lneclientgrievancepolicyprocedurereviewed,
      lneclientgrievancepolicyprocedureissues:data[0].lneclientgrievancepolicyprocedureissues,

    LNEProgramRules:
      data[0].lneprogramrules === "0" || data[0].lneprogramrules === null
        ? false
        : true,
    LNEProgramRulesDate: data[0].lneprogramrulesdate,
    LNEProgramRulesPDF: false,
    LNEProgramRulesScan: false,
    LNEProgramRulesUploadDate: data[0].lneprogramrulesuploaddate || null,
    lneprogramrulesreviewed:data[0].lneprogramrulesreviewed,
    lneprogramrulesissues:data[0].lneprogramrulesissues,

    LNEEmergencyContactConsent:
      data[0].lneemergencycontactconsent === "0" ||
      data[0].lneemergencycontactconsent === null
        ? false
        : true,
    LNEEmergencyContactConsentDate: data[0].lneemergencycontactconsentdate,
    LNEEmergencyContactConsentPDF: false,
    LNEEmergencyContactConsentScan: false,
    LNEEmergencyContactConsentUploadDate:
      data[0].lneemergencycontactconsentuploaddate || null,
      lneemergencycontactconsentreviewed:data[0].lneemergencycontactconsentreviewed,
      lneemergencycontactconsentissues:data[0].lneemergencycontactconsentissues,

    LNEConsentForReleaseOfConfidentialInformation:
      data[0].lneconsentforreleaseofconfidentialinformation === "0" ||
      data[0].lneconsentforreleaseofconfidentialinformation === null
        ? false
        : true,
    LNEConsentForReleaseOfConfidentialInformationDate:
      data[0].lneconsentforreleaseofconfidentialinformationdate,
    LNEConsentForReleaseOfConfidentialInformationPDF: false,
    LNEConsentForReleaseOfConfidentialInformationScan: false,
    LNEConsentForReleaseOfConfidentialInformationUploadDate:
      data[0].lneconsentforreleaseofconfidentialinformationuploaddate || null,
      lneconsentforreleaseofconfidentialinformationreviewed:data[0].lneconsentforreleaseofconfidentialinformationreviewed,
      lneconsentforreleaseofconfidentialinformationissues:data[0].lneconsentforreleaseofconfidentialinformationissues,

    HIPPAConsentForm:
      data[0].hippaconsentform === "0" || data[0].hippaconsentform === null
        ? false
        : true,
    HIPPAConsentFormDate: data[0].hippaconsentformdate,
    HIPPAConsentFormPDF: false,
    HIPPAConsentFormScan: false,
    HIPPAConsentFormUploadDate: data[0].hippaconsentformuploaddate || null,
    hippaconsentformreviewed:data[0].hippaconsentformreviewed,
    hippaconsentformissues:data[0].hippaconsentformissues,

    NYCDOHMHNoticeOfPrivacyPractices:
      data[0].nycdohmhnoticeofprivacypractices === "0" ||
      data[0].nycdohmhnoticeofprivacypractices === null
        ? false
        : true,
    NYCDOHMHNoticeOfPrivacyPracticesDate:
      data[0].nycdohmhnoticeofprivacypracticesdate,
    NYCDOHMHNoticeOfPrivacyPracticesPDF: false,
    NYCDOHMHNoticeOfPrivacyPracticesScan: false,
    NYCDOHMHNoticeOfPrivacyPracticesUploadDate:
      data[0].nycdohmhnoticeofprivacypracticesuploaddate || null,
      nycdohmhnoticeofprivacypracticesreviewed:data[0].nycdohmhnoticeofprivacypracticesreviewed,
      nycdohmhnoticeofprivacypracticesissues:data[0].nycdohmhnoticeofprivacypracticesissues,

    LinkageRetentionAdherenceForms:
      data[0].linkageretentionadherenceforms === "0" ||
      data[0].linkageretentionadherenceforms === null
        ? false
        : true,
    LinkageRetentionAdherenceFormsDate:
      data[0].linkageretentionadherenceformsdate,
    LinkageRetentionAdherenceFormsPDF: false,
    LinkageRetentionAdherenceFormsScan: false,
    LinkageRetentionAdherenceFormsUploadDate:
      data[0].linkageretentionadherenceformsuploaddate || null,
      linkageretentionadherenceformsreviewed:data[0].linkageretentionadherenceformsreviewed,
      linkageretentionadherenceformsissues:data[0].linkageretentionadherenceformsissues,

    InternalReferralInformation:
      data[0].internalreferralinformation === "0" ||
      data[0].internalreferralinformation === null
        ? false
        : true,
    InternalReferralInformationDate: data[0].internalreferralinformationdate,
    InternalReferralInformationPDF: false,
    InternalReferralInformationScan: false,
    InternalReferralInformationUploadDate:
      data[0].internalreferralinformationuploaddate || null,
      internalreferralinformationreviewed:data[0].internalreferralinformationreviewed,
      internalreferralinformationissues:data[0].internalreferralinformationissues,  

    LNEClientReferralForm:
      data[0].lneclientreferralform === "0" ||
      data[0].lneclientreferralform === null
        ? false
        : true,
    LNEClientReferralFormDate: data[0].lneclientreferralformdate,
    LNEClientReferralFormPDF: false,
    LNEClientReferralFormScan: false,
    LNEClientReferralFormUploadDate:
      data[0].lneclientreferralformuploaddate || null,
      lneclientreferralformreviewed:data[0].lneclientreferralformreviewed,
      lneclientreferralformissues:data[0].lneclientreferralformissues,

    LNEHNSEligibilityForm:
      data[0].hnseligibilityform === "0" || data[0].hnseligibilityform === null
        ? false
        : true,
    LNEHNSEligibilityFormDate: data[0].hnseligibilityformdate,
    LNEHNSEligibilityFormPDF: false,
    LNEHNSEligibilityFormScan: false,
    LNEHNSEligibilityFormUploadDate:
      data[0].hnseligibilityformuploaddate || null,
      lnehnseligibilityformreviewed:data[0].lnehnseligibilityformreviewed,
      lnehnseligibilityformissues:data[0].lnehnseligibilityformissues,  

    HNSEligibilityForm:
      data[0].hnseligibilityform === "0" || data[0].hnseligibilityform === null
        ? false
        : true,
    HNSEligibilityFormDate: data[0].hnseligibilityformdate,
    HNSEligibilityFormPDF: false,
    HNSEligibilityFormScan: false,
    HNSEligibilityFormUploadDate: data[0].hnseligibilityformuploaddate || null,
    hnseligibilityformreviewed:data[0].hnseligibilityformreviewed,
    hnseligibilityformissues:data[0].hnseligibilityformissues,

    HNSReadinessForm:
      data[0].hnsreadinessform === "0" || data[0].hnsreadinessform === null
        ? false
        : true,
    HNSReadinessFormDate: data[0].hnsreadinessformdate,
    HNSReadinessFormUploadDate: data[0].hnsreadinessformuploaddate || null,
    HNSReadinessFormScan: false,
    HNSReadinessFormPDF: false,
    hnsreadinessformreviewed:data[0].hnsreadinessformreviewed,
    hnsreadinessformissues:data[0].hnsreadinessformissues,

    SupportGroups:
      data[0].supportgroups === "0" || data[0].supportgroups === null
        ? false
        : true,
    SupportGroupsDate: data[0].supportgroupsdate,
    SupportGroupsUploadDate: data[0].supportgroupsuploaddate,
    SupportGroupsScan: false,
    SupportGroupsPDF: false,
    supportgroupsreviewed:data[0].supportgroupsreviewed,
    supportgroupsissues:data[0].supportgroupsissues,

    IDGForm: data[0].idgform === "0" || data[0].idgform === null ? false : true,
    IDGFormDate: data[0].idgformdate,
    IDGFormUploadDate: data[0].idgformuploaddate || null,
    IDGFormScan: false,
    IDGFormPDF: false,
    idgformreviewed:data[0].idgformreviewed,
    idgformissues:data[0].idgformissues,
    clientUniqueid:data[0]?.id
  });
  const todaysDate = new Date();

  const clientForms = Object.entries(clientData).slice(8);
  const FormTitles = clientForms.filter((form, i) => i % 5 === 0 && form[0]);
  const AirsIntakeForm = `${FormTitles[0][0].slice(
    0,
    4
  )} ${FormTitles[0][0].slice(4, 10)} ${FormTitles[0][0].slice(10, 15)}`;
  const CompRiskBehASS = `${FormTitles[1][0].slice(
    0,
    13
  )} ${FormTitles[1][0].slice(13, 17)} ${FormTitles[1][0].slice(
    17,
    25
  )} ${FormTitles[2][0].slice(25)}`;
  const ServActioPla = `${FormTitles[2][0].slice(
    0,
    7
  )} ${FormTitles[2][0].slice(7, 13)} ${FormTitles[2][0].slice(13, 17)}`;

  console.log("clientData", clientData);
  const handleMsaform = () => {
    /*     notifyMessage()
          setTimeout(() => {
            router.push(`/clients/${clientData.clientId}/profile`)
          }, 2300) */

    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientData.clientId}/update_des_msa_form`,
        {
          clientData,
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.status === 200 || response.statusText === "Ok") {
          notifyMessage();
          setTimeout(() => {
            router.push(`/dashboard`)
          }, 1300)
        }
      })
      .catch(function (error) {
        console.log(error);
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

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Layout>
        <div className="container mx-auto">
          <h1 className="font-black text-center my-5">DES Edit MSA FORM</h1>
        </div>
        {/*  <div className="container bg-blue-50 rounded-xl p-5 mx-auto">
          <div className="flex flex-col items-center max-w-fit">
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
            <p className="text-dark-blue">{clientData.clientId}</p>
            <button className="flex items-center bg-blue-500 hover:bg-blue-300 px-3 py-1 rounded text-white inline-block "
           onClick={() => router.push("/dashboard")}>
              <svg className="mr-1" width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 12H8M8 12L11.5 15.5M8 12L11.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>Dashboard
            </button>
          </div>
        </div> */}
        <main className="container mx-auto">
          <div className="flex gap-x-5">
          <BackToDashboardButton />
          <Link href={`/clients/${clientData.clientId}/service-action-plan/edit`}>
                 <div className="">
                   <div className="rounded bg-middle-purple text-center shadow-xl rounded-lg flex items-center justify-center px-5">
                     <button id="myBtn" className="flex  items-center justify-center">
                         <p className="p-2 text-base uppercase">
                       View Action Plan
                       </p>
                     </button>
                   </div>
                 </div>
               </Link>
          <Link href={`/clients/${clientData.clientId}/progress_note`}>
                 <div className="">
                   <div className="rounded bg-middle-purple text-center shadow-xl rounded-lg flex items-center justify-center px-5">
                     <button id="myBtn" className="flex  items-center justify-center">
                       {/* <img src="/supervisor/condoms_distributed_icon.svg" alt="condoms distribution icon" width={24}/> */}
                       <p className="p-2 uppercase">
                         Progress Note
                       </p>
                     </button>
                   </div>
                 </div>
               </Link>
          </div>

               

          <section id="info" className="my-5">
            <div className="">
              <h3 className="font-black mt-5 mb-2 px-2 text-dark-blue">
                Information
              </h3>
               <div
                className={`${Styles.serviceActionPlanPageInfoContainer} gap-x-5 items-center border-dark-blue rounded-xl p-5`}
              >
                <div className="service-action-plan-page-info-box md:my-1 my-5">
                  <h3 className="font-black ">Todays date</h3>

                  
                  <div className="flex gap-x-2 items-center">
                    <img src="/calendar-icon.svg" width="24"/>
                    <p className=" mt-2">{todaysDate.toLocaleDateString()}</p>
                  </div>

                </div>

                  <div className="service-action-plan-page-info-box md:my-0 my-5">
                  
                      <div className="grid grid-cols-3 gap-4">
                      <div className="flex gap-x-2 mb-1 items-end">
                        <img src="/client-icon.svg" width="24" />
                        <h3 className="font-black ">Client</h3>
                      </div>
                      <label className="block">
                        <span >Client Name</span>
                        <input
                          type="text"
                          className="block w-full bg-blue-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                          value={`${data[0].clientfirstname} ${data[0].clientlastname.charAt(0)}.`}
                          disabled
                        />
                      </label>
                    
                      <label className="block">
                        <span >Client ID</span>
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
                      <span >First Name</span>
                      <input
                        type="text"
                        className="block w-full bg-yellow-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                        value={clientData.userFirstName}
                        disabled
                      />
                    </label>
                    <label className="block">
                      <span >Last Name</span>
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
          <h3 className="font-black mt-5 mb-2 px-2 text-dark-blue">
            Indicate which of the following forms you have uploaded to the
            client&apos;s Dropbox
          </h3>
          <section
            id="form"
            className={`relative border-dark-blue rounded-xl mb-5`}
          >
            {/* {TABLE HEAD} */}
            {/* <div className={`${MSAStyles.line}`}></div> */}
            <div
              id="form-head"
              className={`${MSAStyles.formRowsContainerDesFormEdit} grid gap-5 justify-center items-end rounded-tl-lg rounded-tr-lg py-1 mx-1`}
            >
              <div></div>
              <div></div>
              {/* <p className="text-center">Date added</p> */}
              <p className="text-center">Dropbox Folder</p>
              <p className="text-center">Date last updated by DES</p>
              <div className="flex items-center">
                <p className="text-start">PDF version uploaded</p>
              </div>
              <div className="flex items-center">
                
                <p className="text-center">Scanned version uploaded</p>
                {/* what about Original Version Scanned */}
              </div>
            </div>
            {/* {TABLE HEAD} */}
            <RowMsaFormDES fieldName="AIRS Intake Form" clientData={clientData} setClientData={setClientData} formString="AIRSIntakeForm" data={data}/>

            
            <RowMsaFormDES fieldName="Comprehensive Risk Behavior Assessment" clientData={clientData} setClientData={setClientData} formString="ComprehensiveRiskBehaviorAssessment" data={data}/>


            <RowMsaFormDES fieldName="LNE HNS Eligibility Form" clientData={clientData} setClientData={setClientData} formString="HNSEligibilityForm" data={data}/>


            <RowMsaFormDES fieldName="Service Action Plan" clientData={clientData} setClientData={setClientData} formString="ServiceActionPlan" data={data}/>


            <RowMsaFormDES fieldName="Progress Note" clientData={clientData} setClientData={setClientData} formString="ProgressNote" data={data}/>


            <RowMsaFormDES fieldName="Status Changes/Closure Forms" clientData={clientData} setClientData={setClientData} formString="StatusChangesForm" data={data}/>


            <RowMsaFormDES fieldName="Comprehensive Behavioral Risk Assessment Updates" clientData={clientData} setClientData={setClientData} formString="ComprehensiveRiskBehaviorAssessmentUpdates" data={data}/>


            <RowMsaFormDES fieldName="M11Q" clientData={clientData} setClientData={setClientData} formString="M11QForm" data={data}/>


            <RowMsaFormDES fieldName="CD4/VL Check Reports" clientData={clientData} setClientData={setClientData} formString="CD4VLReports" data={data}/>

            <RowMsaFormDES fieldName="Initial Treatment Adherence Intake" clientData={clientData} setClientData={setClientData} formString="InitialTreatmentAdherenceIntake" data={data}/>

            
            <RowMsaFormDES fieldName="Treatment Adherence Updates" clientData={clientData} setClientData={setClientData} formString="TreatmentAdherenceUpdates" data={data}/>
            
            
            <RowMsaFormDES fieldName="AIRS Collateral Information" clientData={clientData} setClientData={setClientData} formString="AIRSCollateralInformation" data={data}/>

            
            <RowMsaFormDES fieldName="AIRS Drug Regimen History" clientData={clientData} setClientData={setClientData} formString="AIRSDrugRegimen" data={data}/>

            
            <RowMsaFormDES fieldName="AIRS Financial Information" clientData={clientData} setClientData={setClientData} formString="AIRSFinancialInformation" data={data}/>


            <RowMsaFormDES fieldName="AIRS HIV AIDS Risk History" clientData={clientData} setClientData={setClientData} formString="AIRSHIVAIDSRiskHistory" data={data}/>


            <RowMsaFormDES fieldName="AIRS HIV Medical Provider History" clientData={clientData} setClientData={setClientData} formString="AIRSHIVMedicalProvider" data={data}/>


            <RowMsaFormDES fieldName="AIRS HIV Status History" clientData={clientData} setClientData={setClientData} formString="AIRSHIVStatusHistory" data={data}/>


            <RowMsaFormDES fieldName="AIRS HCV History" clientData={clientData} setClientData={setClientData} formString="AIRSHCVHistory" data={data}/>


            <RowMsaFormDES fieldName="AIRS Housing Information" clientData={clientData} setClientData={setClientData} formString="AIRSHousingInformation" data={data}/>


            <RowMsaFormDES fieldName="AIRS Insurance Information" clientData={clientData} setClientData={setClientData} formString="AIRSInsuranceInformation" data={data}/>


            <RowMsaFormDES fieldName="AIRS Substance Use istory" clientData={clientData} setClientData={setClientData} formString="AIRSSubstanceUseHistory" data={data}/>
            

            <RowMsaFormDES fieldName="LNE Client Rights" clientData={clientData} setClientData={setClientData} formString="LNEClientRights" data={data}/>


            <RowMsaFormDES fieldName="LNE Client Grievance Policy & Procedure" clientData={clientData} setClientData={setClientData} formString="LNEClientGrievancePolicyProcedure" data={data}/>


            <RowMsaFormDES fieldName="LNE Program Rules" clientData={clientData} setClientData={setClientData} formString="LNEProgramRules" data={data}/>


            <RowMsaFormDES fieldName="LNE Emergency Contact Consent" clientData={clientData} setClientData={setClientData} formString="LNEEmergencyContactConsent" data={data}/>

            <RowMsaFormDES fieldName="LNE Consent for Release of Confidential Information" clientData={clientData} setClientData={setClientData} formString="LNEConsentForReleaseOfConfidentialInformation" data={data}/>


            <RowMsaFormDES fieldName="HIPAA Consent Form (OCA Form 960)" clientData={clientData} setClientData={setClientData} formString="HIPPAConsentForm" data={data}/>


            <RowMsaFormDES fieldName="NYC DOHMH Notice of Privacy Practices - Acknowledgement of Receipt" clientData={clientData} setClientData={setClientData} formString="NYCDOHMHNoticeOfPrivacyPractices" data={data}/>


            <RowMsaFormDES fieldName="Linkage, Retention, & Adherence Forms" clientData={clientData} setClientData={setClientData} formString="LinkageRetentionAdherenceForms" data={data}/>


            <RowMsaFormDES fieldName="LNE Referral Information" clientData={clientData} setClientData={setClientData} formString="InternalReferralInformation" data={data}/>


            <RowMsaFormDES fieldName="Identification" clientData={clientData} setClientData={setClientData} formString="LNEClientReferralForm" data={data}/>

            
            <RowMsaFormDES fieldName="HNS Readiness Assessment" clientData={clientData} setClientData={setClientData} formString="HNSReadinessForm" data={data}/>


            <RowMsaFormDES fieldName="Support Groups" clientData={clientData} setClientData={setClientData} formString="SupportGroups" data={data}/>


            <RowMsaFormDES fieldName="IDG" clientData={clientData} setClientData={setClientData} formString="IDGForm" data={data}/>

          

          </section>

          <section id="save" className="my-5">
            <div className="container mx-auto flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block  mr-5"
                onClick={() => handleMsaform()}
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
