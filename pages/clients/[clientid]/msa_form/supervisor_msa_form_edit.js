import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Styles from "../../../../styles/ServiceAP.module.css";
import MSAStyles from "../../../../styles/MSA.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import RowMsaFormSupervisor from "../../../../components/RowMsaFormSupervisor";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

import backIcon from "../../../../public/BACKicon.svg";
import checkUpdateicon from "../../../../public/check-save-and-finish.svg"

const EditSupervisorMSAFormPage = ({ data }) => {
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
    AIRSIntakeFormPDF:
      data[0].airsintakeformpdf === "0" || data[0].airsintakeformpdf === null
        ? false
        : true,
    AIRSIntakeFormScan:
      data[0].airsintakeformscan === "0" || data[0].airsintakeformscan === null
        ? false
        : true,
    AIRSIntakeFormReviewed:
      data[0].airsintakeformreviewed === "0" ||
      data[0].airsintakeformreviewed === null
        ? false
        : true,
    AIRSIntakeFormIssues:
      data[0].airsintakeformissues === "0" ||
      data[0].airsintakeformissues === null
        ? false
        : true,
    AIRSIntakeFormUploadDate: data[0].airsintakeformuploaddate || null,

    ComprehensiveRiskBehaviorAssessment:
      data[0].comprehensiveriskbehaviorassessment === "0" ||
      data[0].comprehensiveriskbehaviorassessment === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentDate:
      data[0].comprehensiveriskbehaviorassessmentdate,
    ComprehensiveRiskBehaviorAssessmentPDF:
      data[0].comprehensiveriskbehaviorassessmentpdf === "0" ||
      data[0].comprehensiveriskbehaviorassessmentpdf === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentScan:
      data[0].comprehensiveriskbehaviorassessmentscan === "0" ||
      data[0].comprehensiveriskbehaviorassessmentscan === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentIssues:
      data[0].comprehensiveriskbehaviorassessmentissues === "0" ||
      data[0].comprehensiveriskbehaviorassessmentissues === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentReviewed:
      data[0].comprehensiveriskbehaviorassessmentreviewed === "0" ||
      data[0].comprehensiveriskbehaviorassessmentreviewed === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentUploadDate:
      data[0].comprehensiveriskbehaviorassessmentuploaddate || null,

    ServiceActionPlan:
      data[0].serviceactionplan === "0" || data[0].serviceactionplan === null
        ? false
        : true,
    ServiceActionPlanDate: data[0].serviceactionplandate,
    // ServiceActionPlanPDF: data[0].serviceactionplanpdf === "0" ? true : false,
    ServiceActionPlanScan:
      data[0].serviceactionplanscan === "0" ||
      data[0].serviceactionplanscan === null
        ? false
        : true,
    ServiceActionPlanUploadDate: data[0].serviceactionplanuploaddate || null,
    ServiceActionPlanReviewed:
      data[0].serviceactionplanreviewed === "0" ||
      data[0].serviceactionplanreviewed === null
        ? false
        : true,
    ServiceActionPlanIssues:
      data[0].serviceactionplanissues === "0" ||
      data[0].serviceactionplanissues === null
        ? false
        : true,

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
    ProgressNoteReviewed:
      data[0].progressnotereviewed === "0" ||
      data[0].progressnotereviewed === null
        ? false
        : true,
    ProgressNoteIssues:
      data[0].progressnoteissues === "0" || data[0].progressnoteissues === null
        ? false
        : true,

    StatusChangesForm:
      data[0].statuschangesform === "0" || data[0].statuschangesform === null
        ? false
        : true,
    StatusChangesFormDate: data[0].statuschangesformdate,
    StatusChangesFormUploadDate: data[0].statuschangesformuploaddate,
    StatusChangesFormScan:
      data[0].statuschangesformscan === "0" ||
      data[0].statuschangesformscan === null
        ? false
        : true,
    StatusChangesFormPDF:
      data[0].statuschangesformpdf === "0" ||
      data[0].statuschangesformpdf === null
        ? false
        : true,
    StatusChangesFormReviewed:
      data[0].statuschangesformreviewed === "0" ||
      data[0].statuschangesformreviewed === null
        ? false
        : true,
    StatusChangesFormIssues:
      data[0].statuschangesformissues === "0" ||
      data[0].statuschangesformissues === null
        ? false
        : true,

    ComprehensiveRiskBehaviorAssessmentUpdates:
      data[0].comprehensiveriskbehaviorassessmentupdates === "0" ||
      data[0].comprehensiveriskbehaviorassessmentupdates === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentUpdatesDate:
      data[0].comprehensiveriskbehaviorassessmentdate,
    ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate:
      data[0].comprehensiveriskbehaviorassessmentuploaddate,
    ComprehensiveRiskBehaviorAssessmentUpdatesFormScan:
      data[0].comprehensiveriskbehaviorassessmentupdatesformscan === "0" ||
      data[0].comprehensiveriskbehaviorassessmentupdatesformscan === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentUpdatesPDF:
      data[0].comprehensiveriskbehaviorassessmentpdf === "0" ||
      data[0].comprehensiveriskbehaviorassessmentpdf === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentUpdatesReviewed:
      data[0].comprehensiveriskbehaviorassessmentreviewed === "0" ||
      data[0].comprehensiveriskbehaviorassessmentreviewed === null
        ? false
        : true,
    ComprehensiveRiskBehaviorAssessmentUpdatesFormIssues:
      data[0].comprehensiveriskbehaviorassessmentupdatesformissues === "0" ||
      data[0].comprehensiveriskbehaviorassessmentupdatesformissues === null
        ? false
        : true,

    M11QForm:
      data[0].m11qform === "0" || data[0].m11qform === null ? false : true,
    M11QFormDate: data[0].m11qformdate,
    M11QFormUploadDate: data[0].m11qformuploaddate,
    M11QFormScan:
      data[0].m11qformscan === "0" || data[0].m11qformscan === null
        ? false
        : true,
    M11QFormPDF:
      data[0].m11qformpdf === "0" || data[0].m11qformpdf === null
        ? false
        : true,
    M11QFormReviewed:
      data[0].m11qformreviewed === "0" || data[0].m11qformreviewed === null
        ? false
        : true,
    M11QFormIssues:
      data[0].m11qformissues === "0" || data[0].m11qformissues === null
        ? false
        : true,

    CD4VLReports:
      data[0].cd4vlreports === "0" || data[0].cd4vlreports === null
        ? false
        : true,
    CD4VLReportsDate: data[0].cd4vlreportsdate,
    CD4VLReportsUploadDate: data[0].cd4vlreportsuploaddate,
    CD4VLReportsScan:
      data[0].cd4vlreportsscan === "0" || data[0].cd4vlreportsscan === null
        ? false
        : true,
    CD4VLReportsPDF:
      data[0].cd4vlreportspdf === "0" || data[0].cd4vlreportspdf === null
        ? false
        : true,
    CD4VLReportsReviewed:
      data[0].cd4vlreportsreviewed === "0" ||
      data[0].cd4vlreportsreviewed === null
        ? false
        : true,
    CD4VLReportsIssues:
      data[0].cd4vlreportsissues === "0" || data[0].cd4vlreportsissues === null
        ? false
        : true,

    InitialTreatmentAdherenceIntake:
      data[0].initialtreatmentadherenceintake === "0" ||
      data[0].initialtreatmentadherenceintake === null
        ? false
        : true,
    InitialTreatmentAdherenceIntakeDate:
      data[0].initialtreatmentadherenceintakedate,
    InitialTreatmentAdherenceIntakeUploadDate:
      data[0].initialtreatmentadherenceintakeuploaddate,
    InitialTreatmentAdherenceIntakeScan:
      data[0].initialtreatmentadherenceintakescan === "0" ||
      data[0].initialtreatmentadherenceintakescan === null
        ? false
        : true,
    InitialTreatmentAdherenceIntakePDF:
      data[0].initialtreatmentadherenceintakepdf === "0" ||
      data[0].initialtreatmentadherenceintakepdf === null
        ? false
        : true,
    InitialTreatmentAdherenceIntakeReviewed:
      data[0].initialtreatmentadherenceintakereviewed === "0" ||
      data[0].initialtreatmentadherenceintakereviewed === null
        ? false
        : true,
    InitialTreatmentAdherenceIntakeIssues:
      data[0].initialtreatmentadherenceintakeissues === "0" ||
      data[0].initialtreatmentadherenceintakeissues === null
        ? false
        : true,

    TreatmentAdherenceUpdates:
      data[0].treatmentadherenceupdates === "0" ||
      data[0].treatmentadherenceupdates === null
        ? false
        : true,
    TreatmentAdherenceUpdatesDate: data[0].treatmentadherenceupdatesdate,
    TreatmentAdherenceUpdatesUploadDate:
      data[0].treatmentadherenceupdatesuploaddate,
    TreatmentAdherenceUpdatesScan:
      data[0].treatmentadherenceupdatesscan === "0" ||
      data[0].treatmentadherenceupdatesscan === null
        ? false
        : true,
    TreatmentAdherenceUpdatesPDF:
      data[0].treatmentadherenceupdatespdf === "0" ||
      data[0].treatmentadherenceupdatespdf === null
        ? false
        : true,
    TreatmentAdherenceUpdatesReviewed:
      data[0].treatmentadherenceupdatesreviewed === "0" ||
      data[0].treatmentadherenceupdatesreviewed === null
        ? false
        : true,
    TreatmentAdherenceUpdatesIssues:
      data[0].treatmentadherenceupdatesissues === "0" ||
      data[0].treatmentadherenceupdatesissues === null
        ? false
        : true,

    AIRSCollateralInformation:
      data[0].airscollateralinformation === "0" ||
      data[0].airscollateralinformation === null
        ? false
        : true,
    AIRSCollateralInformationDate: data[0].airscollateralinformationdate,
    AIRSCollateralInformationPDF:
      data[0].airscollateralinformationpdf === "0" ||
      data[0].airscollateralinformationpdf === null
        ? false
        : true,
    AIRSCollateralInformationScan:
      data[0].airscollateralinformationscan === "0" ||
      data[0].airscollateralinformationscan === null
        ? false
        : true,
    AIRSCollateralInformationUploadDate:
      data[0].airscollateralinformationuploaddate || null,
    AIRSCollateralInformationReviewed:
      data[0].airscollateralinformationreviewed === "0" ||
      data[0].airscollateralinformationreviewed === null
        ? false
        : true,
    AIRSCollateralInformationIssues:
      data[0].airscollateralinformationissues === "0" ||
      data[0].airscollateralinformationissues === null
        ? false
        : true,

    AIRSDrugRegimen:
      data[0].airsdrugregimen === "0" || data[0].airsdrugregimen === null
        ? false
        : true,
    AIRSDrugRegimenDate: data[0].airsdrugregimendate,
    AIRSDrugRegimenPDF:
      data[0].airsdrugregimenpdf === "0" || data[0].airsdrugregimenpdf === null
        ? false
        : true,
    AIRSDrugRegimenScan:
      data[0].airsdrugregimenscan === "0" ||
      data[0].airsdrugregimenscan === null
        ? false
        : true,
    AIRSDrugRegimenUploadDate: data[0].airsdrugregimenuploaddate || null,
    AIRSDrugRegimenReviewed:
      data[0].airsdrugregimenreviewed === "0" ||
      data[0].airsdrugregimenreviewed === null
        ? false
        : true,
    AIRSDrugRegimenIssues:
      data[0].airsdrugregimenissues === "0" ||
      data[0].airsdrugregimenissues === null
        ? false
        : true,

    AIRSFinancialInformation:
      data[0].airsfinancialinformation === "0" ||
      data[0].airsfinancialinformation === null
        ? false
        : true,
    AIRSFinancialInformationDate: data[0].airsfinancialinformationdate,
    AIRSFinancialInformationPDF:
      data[0].airsfinancialinformationpdf === "0" ||
      data[0].airsfinancialinformationpdf === null
        ? false
        : true,
    AIRSFinancialInformationScan:
      data[0].airsfinancialinformationscan === "0" ||
      data[0].airsfinancialinformationscan === null
        ? false
        : true,
    AIRSFinancialInformationUploadDate:
      data[0].airsfinancialinformationuploaddate || null,
    AIRSFinancialInformationReviewed:
      data[0].airsfinancialinformationreviewed === "0" ||
      data[0].airsfinancialinformationreviewed === null
        ? false
        : true,
    AIRSFinancialInformationIssues:
      data[0].airsfinancialinformationissues === "0" ||
      data[0].airsfinancialinformationissues === null
        ? false
        : true,

    AIRSHIVAIDSRiskHistory:
      data[0].airshivaidsriskhistory === "0" ||
      data[0].airshivaidsriskhistory === null
        ? false
        : true,
    AIRSHIVAIDSRiskHistoryDate: data[0].airshivaidsriskhistorydate,
    AIRSHIVAIDSRiskHistoryPDF:
      data[0].airshivaidsriskhistorypdf === "0" ||
      data[0].airshivaidsriskhistorypdf === null
        ? false
        : true,
    AIRSHIVAIDSRiskHistoryScan:
      data[0].airshivaidsriskhistoryscan === "0" ||
      data[0].airshivaidsriskhistoryscan === null
        ? false
        : true,
    AIRSHIVAIDSRiskHistoryUploadDate:
      data[0].airshivaidsriskhistoryuploaddate || null,
    AIRSHIVAIDSRiskHistoryReviewed:
      data[0].airshivaidsriskhistoryreviewed === "0" ||
      data[0].airshivaidsriskhistoryreviewed === null
        ? false
        : true,
    AIRSHIVAIDSRiskHistoryIssues:
      data[0].airshivaidsriskhistoryissues === "0" ||
      data[0].airshivaidsriskhistoryissues === null
        ? false
        : true,

    AIRSHIVMedicalProvider:
      data[0].airshivmedicalprovider === "0" ||
      data[0].airshivmedicalprovider === null
        ? false
        : true,
    AIRSHIVMedicalProviderDate: data[0].airshivmedicalproviderdate,
    AIRSHIVMedicalProviderPDF:
      data[0].airshivmedicalproviderpdf === "0" ||
      data[0].airshivmedicalproviderpdf === null
        ? false
        : true,
    AIRSHIVMedicalProviderScan:
      data[0].airshivaidsriskhistoryscan === "0" ||
      data[0].airshivmedicalproviderscan === null
        ? false
        : true,
    AIRSHIVMedicalProviderUploadDate:
      data[0].airshivmedicalprovideruploaddate || null,
    AIRSHIVMedicalProviderReviewed:
      data[0].airshivmedicalproviderreviewed === "0" ||
      data[0].airshivmedicalproviderreviewed === null
        ? false
        : true,
    AIRSHIVMedicalProviderIssues:
      data[0].airshivmedicalproviderissues === "0" ||
      data[0].airshivmedicalproviderissues === null
        ? false
        : true,

    AIRSHIVStatusHistory:
      data[0].airshivstatushistory === "0" ||
      data[0].airshivstatushistory === null
        ? false
        : true,
    AIRSHIVStatusHistoryDate: data[0].airshivstatushistorydate,
    AIRSHIVStatusHistoryPDF:
      data[0].airshivstatushistorypdf === "0" ||
      data[0].airshivstatushistorypdf === null
        ? false
        : true,
    AIRSHIVStatusHistoryScan:
      data[0].airshivstatushistoryscan === "0" ||
      data[0].airshivstatushistoryscan === null
        ? false
        : true,
    AIRSHIVStatusHistoryUploadDate:
      data[0].airshivstatushistoryuploaddate || null,
    AIRSHIVStatusHistoryReviewed:
      data[0].airshivstatushistoryreviewed === "0" ||
      data[0].airshivstatushistoryreviewed === null
        ? false
        : true,
    AIRSHIVStatusHistoryIssues:
      data[0].airshivstatushistoryissues === "0" ||
      data[0].airshivstatushistoryissues === null
        ? false
        : true,

    AIRSHCVHistory:
      data[0].airshcvhistory === "0" || data[0].airshcvhistory === null
        ? false
        : true,
    AIRSHCVHistoryDate: data[0].airshcvhistorydate,
    AIRSHCVHistoryPDF:
      data[0].airshcvhistorypdf === "0" || data[0].airshcvhistorypdf === null
        ? false
        : true,
    AIRSHCVHistoryScan:
      data[0].airshcvhistoryscan === "0" || data[0].airshcvhistoryscan === null
        ? false
        : true,
    AIRSHCVHistoryUploadDate: data[0].airshcvhistoryuploaddate || null,
    AIRSHCVHistoryReviewed:
      data[0].airshcvhistoryreviewed === "0" ||
      data[0].airshcvhistoryreviewed === null
        ? false
        : true,
    AIRSHCVHistoryIssues:
      data[0].airshcvhistoryissues === "0" ||
      data[0].airshcvhistoryissues === null
        ? false
        : true,

    AIRSHousingInformation:
      data[0].airshousinginformation === "0" ||
      data[0].airshousinginformation === null
        ? false
        : true,
    AIRSHousingInformationDate: data[0].airshousinginformationdate,
    AIRSHousingInformationPDF:
      data[0].airshousinginformationpdf === "0" ||
      data[0].airshousinginformationpdf === null
        ? false
        : true,
    AIRSHousingInformationScan:
      data[0].airshousinginformationscan === "0" ||
      data[0].airshousinginformationscan === null
        ? false
        : true,
    AIRSHousingInformationUploadDate:
      data[0].airshousinginformationuploaddate || null,
    AIRSHousingInformationReviewed:
      data[0].airshousinginformationreviewed === "0" ||
      data[0].airshousinginformationreviewed === null
        ? false
        : true,
    AIRSHousingInformationIssues:
      data[0].airshousinginformationissues === "0" ||
      data[0].airshousinginformationissues === null
        ? false
        : true,

    AIRSInsuranceInformation:
      data[0].airsinsuranceinformation === "0" ||
      data[0].airsinsuranceinformation === null
        ? false
        : true,
    AIRSInsuranceInformationDate: data[0].airsinsuranceinformationdate,
    AIRSInsuranceInformationPDF:
      data[0].airsinsuranceinformationpdf === "0" ||
      data[0].airsinsuranceinformationpdf === null
        ? false
        : true,
    AIRSInsuranceInformationScan:
      data[0].airsinsuranceinformationscan === "0" ||
      data[0].airsinsuranceinformationscan === null
        ? false
        : true,
    AIRSInsuranceInformationUploadDate:
      data[0].airsinsuranceinformationuploaddate || null,
    AIRSInsuranceInformationReviewed:
      data[0].airsinsuranceinformationreviewed === "0" ||
      data[0].airsinsuranceinformationreviewed === null
        ? false
        : true,
    AIRSInsuranceInformationIssues:
      data[0].airsinsuranceinformationissues === "0" ||
      data[0].airsinsuranceinformationissues === null
        ? false
        : true,

    AIRSSubstanceUseHistory:
      data[0].airssubstanceusehistory === "0" ||
      data[0].airssubstanceusehistory === null
        ? false
        : true,
    AIRSSubstanceUseHistoryDate: data[0].airssubstanceusehistorydate,
    AIRSSubstanceUseHistoryPDF:
      data[0].airssubstanceusehistorypdf === "0" ||
      data[0].airssubstanceusehistorypdf === null
        ? false
        : true,
    AIRSSubstanceUseHistoryScan:
      data[0].airssubstanceusehistoryscan === "0" ||
      data[0].airssubstanceusehistoryscan === null
        ? false
        : true,
    AIRSSubstanceUseHistoryUploadDate:
      data[0].airssubstanceusehistoryuploaddate || null,
    AIRSSubstanceUseHistoryReviewed:
      data[0].airssubstanceusehistoryreviewed === "0" ||
      data[0].airssubstanceusehistoryreviewed === null
        ? false
        : true,
    AIRSSubstanceUseHistoryIssues:
      data[0].airssubstanceusehistoryissues === "0" ||
      data[0].airssubstanceusehistoryissues === null
        ? false
        : true,

    LNEClientRights:
      data[0].lneclientrights === "0" || data[0].lneclientrights === null
        ? false
        : true,
    LNEClientRightsDate: data[0].lneclientrightsdate,
    LNEClientRightsPDF:
      data[0].lneclientrightspdf === "0" || data[0].lneclientrightspdf === null
        ? false
        : true,
    LNEClientRightsScan:
      data[0].lneclientrightsscan === "0" ||
      data[0].lneclientrightsscan === null
        ? false
        : true,
    LNEClientRightsUploadDate: data[0].lneclientrightsuploaddate || null,
    LNEClientRightsReviewed:
      data[0].lneclientrightsreviewed === "0" ||
      data[0].lneclientrightsreviewed === null
        ? false
        : true,
    LNEClientRightsIssues:
      data[0].lneclientrightsissues === "0" ||
      data[0].lneclientrightsissues === null
        ? false
        : true,

    LNEClientGrievancePolicyProcedure:
      data[0].lneclientgrievancepolicyprocedure === "0" ||
      data[0].lneclientgrievancepolicyprocedure === null
        ? false
        : true,
    LNEClientGrievancePolicyProcedureDate:
      data[0].lneclientgrievancepolicyproceduredate,
    LNEClientGrievancePolicyProcedurePDF:
      data[0].lneclientgrievancepolicyprocedurepdf === "0" ||
      data[0].lneclientgrievancepolicyprocedurepdf === null
        ? false
        : true,
    LNEClientGrievancePolicyProcedureScan:
      data[0].lneclientgrievancepolicyprocedurescan === "0" ||
      data[0].lneclientgrievancepolicyprocedurescan === null
        ? false
        : true,
    LNEClientGrievancePolicyProcedureUploadDate:
      data[0].lneclientgrievancepolicyprocedureuploaddate || null,
    LNEClientGrievancePolicyProcedureReviewed:
      data[0].lneclientgrievancepolicyprocedurereviewed === "0" ||
      data[0].lneclientgrievancepolicyprocedurereviewed === null
        ? false
        : true,
    LNEClientGrievancePolicyProcedureIssues:
      data[0].lneclientgrievancepolicyprocedureissues === "0" ||
      data[0].lneclientgrievancepolicyprocedureissues === null
        ? false
        : true,

    LNEProgramRules:
      data[0].lneprogramrules === "0" || data[0].lneprogramrules === null
        ? false
        : true,
    LNEProgramRulesDate: data[0].lneprogramrulesdate,
    LNEProgramRulesPDF:
      data[0].lneprogramrulespdf === "0" || data[0].lneprogramrulespdf === null
        ? false
        : true,
    LNEProgramRulesScan:
      data[0].lneprogramrulesscan === "0" ||
      data[0].lneprogramrulesscan === null
        ? false
        : true,
    LNEProgramRulesUploadDate: data[0].lneprogramrulesuploaddate || null,
    LNEProgramRulesReviewed:
      data[0].lneprogramrulesreviewed === "0" ||
      data[0].lneprogramrulesreviewed === null
        ? false
        : true,
    LNEProgramRulesIssues:
      data[0].lneprogramrulesissues === "0" ||
      data[0].lneprogramrulesissues === null
        ? false
        : true,

    LNEEmergencyContactConsent:
      data[0].lneemergencycontactconsent === "0" ||
      data[0].lneemergencycontactconsent === null
        ? false
        : true,
    LNEEmergencyContactConsentDate: data[0].lneemergencycontactconsentdate,
    LNEEmergencyContactConsentPDF:
      data[0].lneemergencycontactconsentpdf === "0" ||
      data[0].lneemergencycontactconsentpdf === null
        ? false
        : true,
    LNEEmergencyContactConsentScan:
      data[0].lneemergencycontactconsentscan === "0" ||
      data[0].lneemergencycontactconsentscan === null
        ? false
        : true,
    LNEEmergencyContactConsentUploadDate:
      data[0].lneemergencycontactconsentuploaddate || null,
    LNEEmergencyContactConsentReviewed:
      data[0].lneemergencycontactconsentreviewed === "0" ||
      data[0].lneemergencycontactconsentreviewed === null
        ? false
        : true,
    LNEEmergencyContactConsentIssues:
      data[0].lneemergencycontactconsentissues === "0" ||
      data[0].lneemergencycontactconsentissues === null
        ? false
        : true,

    LNEConsentForReleaseOfConfidentialInformation:
      data[0].lneconsentforreleaseofconfidentialinformation === "0" ||
      data[0].lneconsentforreleaseofconfidentialinformation === null
        ? false
        : true,
    LNEConsentForReleaseOfConfidentialInformationDate:
      data[0].lneconsentforreleaseofconfidentialinformationdate,
    LNEConsentForReleaseOfConfidentialInformationPDF:
      data[0].lneconsentforreleaseofconfidentialinformationpdf === "0" ||
      data[0].lneconsentforreleaseofconfidentialinformationpdf === null
        ? false
        : true,
    LNEConsentForReleaseOfConfidentialInformationScan:
      data[0].lneconsentforreleaseofconfidentialinformationscan === "0" ||
      data[0].lneconsentforreleaseofconfidentialinformationscan === null
        ? false
        : true,
    LNEConsentForReleaseOfConfidentialInformationUploadDate:
      data[0].lneconsentforreleaseofconfidentialinformationuploaddate || null,
    LNEConsentForReleaseOfConfidentialInformationReviewed:
      data[0].lneconsentforreleaseofconfidentialinformationreviewed === "0" ||
      data[0].lneconsentforreleaseofconfidentialinformationreviewed === null
        ? false
        : true,
    LNEConsentForReleaseOfConfidentialInformationIssues:
      data[0].lneconsentforreleaseofconfidentialinformationissues === "0" ||
      data[0].lneconsentforreleaseofconfidentialinformationissues === null
        ? false
        : true,

    HIPPAConsentForm:
      data[0].hippaconsentform === "0" || data[0].hippaconsentform === null
        ? false
        : true,
    HIPPAConsentFormDate: data[0].hippaconsentformdate,
    HIPPAConsentFormPDF:
      data[0].hippaconsentformpdf === "0" ||
      data[0].hippaconsentformpdf === null
        ? false
        : true,
    HIPPAConsentFormScan:
      data[0].hippaconsentformscan === "0" ||
      data[0].hippaconsentformscan === null
        ? false
        : true,
    HIPPAConsentFormUploadDate: data[0].hippaconsentformuploaddate || null,
    HIPPAConsentFormReviewed:
      data[0].hippaconsentformreviewed === "0" ||
      data[0].hippaconsentformreviewed === null
        ? false
        : true,
    HIPPAConsentFormIssues:
      data[0].hippaconsentformissues === "0" ||
      data[0].hippaconsentformissues === null
        ? false
        : true,

    NYCDOHMHNoticeOfPrivacyPractices:
      data[0].nycdohmhnoticeofprivacypractices === "0" ||
      data[0].nycdohmhnoticeofprivacypractices === null
        ? false
        : true,
    NYCDOHMHNoticeOfPrivacyPracticesDate:
      data[0].nycdohmhnoticeofprivacypracticesdate,
    NYCDOHMHNoticeOfPrivacyPracticesPDF:
      data[0].nycdohmhnoticeofprivacypracticespdf === "0" ||
      data[0].nycdohmhnoticeofprivacypracticespdf === null
        ? false
        : true,
    NYCDOHMHNoticeOfPrivacyPracticesScan:
      data[0].nycdohmhnoticeofprivacypracticesscan === "0" ||
      data[0].nycdohmhnoticeofprivacypracticesscan === null
        ? false
        : true,
    NYCDOHMHNoticeOfPrivacyPracticesUploadDate:
      data[0].nycdohmhnoticeofprivacypracticesuploaddate || null,
    NYCDOHMHNoticeOfPrivacyPracticesReviewed:
      data[0].nycdohmhnoticeofprivacypracticesreviewed === "0" ||
      data[0].nycdohmhnoticeofprivacypracticesreviewed === null
        ? false
        : true,
    NYCDOHMHNoticeOfPrivacyPracticesIssues:
      data[0].nycdohmhnoticeofprivacypracticesissues === "0" ||
      data[0].nycdohmhnoticeofprivacypracticesissues === null
        ? false
        : true,

    LinkageRetentionAdherenceForms:
      data[0].linkageretentionadherenceforms === "0" ||
      data[0].linkageretentionadherenceforms === null
        ? false
        : true,
    LinkageRetentionAdherenceFormsDate:
      data[0].linkageretentionadherenceformsdate,
    LinkageRetentionAdherenceFormsPDF:
      data[0].linkageretentionadherenceformspdf === "0" ||
      data[0].linkageretentionadherenceformspdf === null
        ? false
        : true,
    LinkageRetentionAdherenceFormsScan:
      data[0].linkageretentionadherenceformsscan === "0" ||
      data[0].linkageretentionadherenceformsscan === null
        ? false
        : true,
    LinkageRetentionAdherenceFormsUploadDate:
      data[0].linkageretentionadherenceformsuploaddate || null,
    LinkageRetentionAdherenceFormsReviewed:
      data[0].linkageretentionadherenceformsreviewed === "0" ||
      data[0].linkageretentionadherenceformsreviewed === null
        ? false
        : true,
    LinkageRetentionAdherenceFormsIssues:
      data[0].linkageretentionadherenceformsissues === "0" ||
      data[0].linkageretentionadherenceformsissues === null
        ? false
        : true,

    InternalReferralInformation:
      data[0].internalreferralinformation === "0" ||
      data[0].internalreferralinformation === null
        ? false
        : true,
    InternalReferralInformationDate: data[0].internalreferralinformationdate,
    InternalReferralInformationPDF:
      data[0].internalreferralinformationpdf === "0" ||
      data[0].internalreferralinformationpdf === null
        ? false
        : true,
    InternalReferralInformationScan:
      data[0].internalreferralinformationscan === "0" ||
      data[0].internalreferralinformationscan === null
        ? false
        : true,
    InternalReferralInformationUploadDate:
      data[0].internalreferralinformationuploaddate || null,
    InternalReferralInformationReviewed:
      data[0].internalreferralinformationreviewed === "0" ||
      data[0].internalreferralinformationreviewed === null
        ? false
        : true,
    InternalReferralInformationIssues:
      data[0].internalreferralinformationissues === "0" ||
      data[0].internalreferralinformationissues === null
        ? false
        : true,

    LNEClientReferralForm:
      data[0].lneclientreferralform === "0" ||
      data[0].lneclientreferralform === null
        ? false
        : true,
    LNEClientReferralFormDate: data[0].lneclientreferralformdate,
    LNEClientReferralFormPDF:
      data[0].lneclientreferralformpdf === "0" ||
      data[0].lneclientreferralformpdf === null
        ? false
        : true,
    LNEClientReferralFormScan:
      data[0].lneclientreferralformscan === "0" ||
      data[0].lneclientreferralformscan === null
        ? false
        : true,
    LNEClientReferralFormReviewed:
      data[0].lneclientreferralformreviewed === "0" ||
      data[0].lneclientreferralformreviewed === null
        ? false
        : true,
    LNEClientReferralFormIssues:
      data[0].lneclientreferralformissues === "0" ||
      data[0].lneclientreferralformissues === null
        ? false
        : true,
    LNEClientReferralFormUploadDate:
      data[0].lneclientreferralformuploaddate || null,

    LNEHNSEligibilityForm:
      data[0].hnseligibilityform === "0" || data[0].hnseligibilityform === null
        ? false
        : true,
    LNEHNSEligibilityFormDate: data[0].hnseligibilityformdate,
    LNEHNSEligibilityFormPDF:
      data[0].hnseligibilityformpdf === "0" ||
      data[0].hnseligibilityformpdf === null
        ? false
        : true,
    LNEHNSEligibilityFormScan:
      data[0].hnseligibilityformscan === "0" ||
      data[0].hnseligibilityformscan === null
        ? false
        : true,
    LNEHNSEligibilityFormUploadDate:
      data[0].hnseligibilityformuploaddate || null,

    HNSEligibilityForm:
      data[0].hnseligibilityform === "0" || data[0].hnseligibilityform === null
        ? false
        : true,
    HNSEligibilityFormDate: data[0].hnseligibilityformdate,
    HNSEligibilityFormPDF:
      data[0].hnseligibilityformpdf === "0" ||
      data[0].hnseligibilityformpdf === null
        ? false
        : true,
    HNSEligibilityFormScan:
      data[0].hnseligibilityformscan === "0" ||
      data[0].hnseligibilityformscan === null
        ? false
        : true,
    HNSEligibilityFormReviewed:
      data[0].hnseligibilityformreviewed === "0" ||
      data[0].hnseligibilityformreviewed === null
        ? false
        : true,
    HNSEligibilityFormIssues:
      data[0].hnseligibilityformissues === "0" ||
      data[0].hnseligibilityformissues === null
        ? false
        : true,
    HNSEligibilityFormUploadDate: data[0].hnseligibilityformuploaddate || null,

    HNSReadinessForm:
      data[0].hnsreadinessform === "0" || data[0].hnsreadinessform === null
        ? false
        : true,
    HNSReadinessFormDate: data[0].hnsreadinessformdate,
    HNSReadinessFormUploadDate: data[0].hnsreadinessformuploaddate || null,
    HNSReadinessFormScan:
      data[0].hnsreadinessformscan === "0" ||
      data[0].hnsreadinessformscan === null
        ? false
        : true,
    HNSReadinessFormReviewed:
      data[0].hnsreadinessformreviewed === "0" ||
      data[0].hnsreadinessformreviewed === null
        ? false
        : true,
    HNSReadinessFormIssues:
      data[0].hnsreadinessformissues === "0" ||
      data[0].hnsreadinessformissues === null
        ? false
        : true,
    HNSReadinessFormPDF:
      data[0].hnsreadinessformpdf === "0" ||
      data[0].hnsreadinessformpdf === null
        ? false
        : true,

    SupportGroups:
      data[0].supportgroups === "0" || data[0].supportgroups === null
        ? false
        : true,
    SupportGroupsDate: data[0].supportgroupsdate,
    SupportGroupsUploadDate: data[0].supportgroupsuploaddate,
    SupportGroupsScan:
      data[0].supportgroupsscan === "0" || data[0].supportgroupsscan === null
        ? false
        : true,
    SupportGroupsPDF:
      data[0].supportgroupspdf === "0" || data[0].supportgroupspdf === null
        ? false
        : true,
    SupportGroupsReviewed:
      data[0].supportgroupsreviewed === "0" ||
      data[0].supportgroupsreviewed === null
        ? false
        : true,
    SupportGroupsIssues:
      data[0].supportgroupsissues === "0" ||
      data[0].supportgroupsissues === null
        ? false
        : true,

    IDGForm: data[0].idgform === "0" || data[0].idgform === null ? false : true,
    IDGFormDate: data[0].idgformdate,
    IDGFormUploadDate: data[0].idgformuploaddate || null,
    IDGFormScan:
      data[0].idgformscan === "0" || data[0].idgformscan === null
        ? false
        : true,
    IDGFormPDF:
      data[0].idgformpdf === "0" || data[0].idgformpdf === null ? false : true,
    IDGFormReviewed:
      data[0].idgformreviewed === "0" || data[0].idgformreviewed === null
        ? false
        : true,
    IDGFormIssues:
      data[0].idgformissues === "0" || data[0].idgformissues === null
        ? false
        : true,
  });
  const todaysDate = new Date();

  console.log("airsintakeformuploaddate", clientData.airsintakeformuploaddate);
  console.log("clientData", clientData);

  //WORK IN PROGRESS, TRYING TO ITERATE THE STATE
  // [['AIRSIntakeForm', true], [...]...]
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

  const handleMsaform = () => {
    /*     notifyMessage()
          setTimeout(() => {
            router.push(`/clients/${clientData.clientId}/profile`)
          }, 2300) */

    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/msa_forms/${clientData.clientId}/update_supervisor_msa_form`,
        {
          clientData,
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.status === 200 || response.statusText === "Ok") {
          notifyMessage();
          setTimeout(() => {
            router.push(`/supervisorDashboard`);
          }, 2300);
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
          <h3 className="font-black text-center my-5">
            Supervisor Edit MSA FORM
          </h3>
        </div>

        <main className="container mx-auto">
          <div className="flex items-center justify-end">
          <button
            onClick={() => router.back()}
            className="py-1 flex items-center font-bold"
          >
            <Image src={backIcon} />
            <p className="ml-1">back to Dashboard</p>
            </button>
          </div>
          <section id="info" className="my-5">
            <div className="">
              <h6 className="font-black mt-5 mb-2 px-2 text-dark-blue">
                Information
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
                  <div className="flex gap-x-2 mb-5 items-center">
                    <img src="/client-icon.svg" width="24" />
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
                    <img src="/client-icon.svg" width="24" />
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
          <h6 className="font-black mt-5 mb-2 px-2 text-dark-blue">
            Indicate which of the following forms you have uploaded to the
            client&apos;s Dropbox
          </h6>
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
              <p className="text-center">Date added</p>
              <p className="text-center">Dropbox Folder</p>
              <p className="text-center">Date last updated</p>
              <div className="flex items-center">
                <svg
                  width="24"
                  height="24"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 font-black"
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
                <p className="text-start">Supervisor has reviewed</p>
              </div>
              <div className="flex items-center">
                <svg
                  width="24"
                  height="24"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 font-black"
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
                <p className="text-start">Issues found</p>
                {/* what about Original Version Scanned */}
              </div>
            </div>
            {/* {TABLE HEAD} */}

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.AIRSIntakeForm ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSIntakeForm ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.AIRSIntakeForm
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSIntakeForm: !formState.AIRSIntakeForm,
                        AIRSIntakeFormDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSIntakeForm: !formState.AIRSIntakeForm,
                        AIRSIntakeFormDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSIntakeForm ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>

                <input
                  className={`${
                    !clientData.AIRSIntakeForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => {
                    clientData.AIRSIntakeFormDate === "" ||
                    clientData.AIRSIntakeFormDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSIntakeForm: !clientData.AIRSIntakeForm,
                          AIRSIntakeFormDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSIntakeForm: !clientData.AIRSIntakeForm,
                          AIRSIntakeFormDate: "",
                        });
                  }}
                  checked={clientData.AIRSIntakeForm ? "checked" : false}
                  disabled={clientData.AIRSIntakeForm ? true : false}
                />
              </div>

              <div>
                <p>
                  AIRS Intake Form <span className="text-red-500">*</span>
                </p>
              </div>

              <div className="text-center">
                <input
                  type="date"
                  id="AIRSIntakeForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSIntakeFormDate &&
                    clientData.AIRSIntakeFormDate.split("T")[0]
                  }
                  disabled={clientData.AIRSIntakeForm ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSIntakeFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames}  text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/*  <p className="text-dark-blue underline">Intake</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSIntakeForm"
                  className={`${MSAStyles.inputDate} ${
                    clientData.AIRSIntakeForm
                      ? "border-2 border-dark-blue rounded-md p-px bg-white"
                      : ""
                  } ${
                    clientData.AIRSIntakeForm &&
                    clientData.AIRSIntakeFormPDF &&
                    clientData.AIRSIntakeFormIssues
                      ? ""
                      : " border-2 border-dark-blue rounded-md p-px bg-white"
                  }`}
                  value={
                    clientData.AIRSIntakeFormUploadDate &&
                    clientData.AIRSIntakeFormUploadDate.split("T")[0]
                  }
                  disabled={clientData.AIRSIntakeFormUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSIntakeFormUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSIntakeFormReviewed ? "pointer-events-none" : ""
                }`}
                onClick={(e) => {
                  clientData.AIRSIntakeFormReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSIntakeFormReviewed:
                          !formState.AIRSIntakeFormReviewed,
                        AIRSIntakeFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSIntakeFormReviewed:
                          !formState.AIRSIntakeFormReviewed,
                        AIRSIntakeFormUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.AIRSIntakeFormReviewed ||
                    clientData.AIRSIntakeFormIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSIntakeFormUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSIntakeFormReviewed ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSIntakeForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSIntakeFormUploadDate === "" ||
                    clientData.AIRSIntakeFormUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSIntakeFormReviewed:
                            !clientData.AIRSIntakeFormReviewed,
                          AIRSIntakeFormUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSIntakeFormReviewed:
                            !clientData.AIRSIntakeFormReviewed,
                        });
                  }}
                  checked={
                    clientData.AIRSIntakeFormReviewed ? "checked" : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSIntakeFormIssues ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.AIRSIntakeFormIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSIntakeFormIssues: !formState.AIRSIntakeFormIssues,
                        AIRSIntakeFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSIntakeFormIssues: !formState.AIRSIntakeFormIssues,
                        AIRSIntakeFormUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSIntakeFormReviewed ||
                    !clientData.AIRSIntakeFormIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSIntakeFormUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSIntakeFormIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSIntakeForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSIntakeFormUploadDate === "" ||
                    clientData.AIRSIntakeFormUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSIntakeFormIssues:
                            !clientData.AIRSIntakeFormIssues,
                          AIRSIntakeFormUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSIntakeFormIssues:
                            !clientData.AIRSIntakeFormIssues,
                        });
                  }}
                  checked={clientData.AIRSIntakeFormIssues ? "checked" : false}
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.ComprehensiveRiskBehaviorAssessment
                  ? ""
                  : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.ComprehensiveRiskBehaviorAssessment
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.ComprehensiveRiskBehaviorAssessment
                    ? setClientData((formState) => ({
                        ...formState,
                        ComprehensiveRiskBehaviorAssessment:
                          !formState.ComprehensiveRiskBehaviorAssessment,
                        ComprehensiveRiskBehaviorAssessmentDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        ComprehensiveRiskBehaviorAssessment:
                          !formState.ComprehensiveRiskBehaviorAssessment,
                        ComprehensiveRiskBehaviorAssessmentDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.ComprehensiveRiskBehaviorAssessment ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.ComprehensiveRiskBehaviorAssessment &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ComprehensiveRiskBehaviorAssessmentDate === "" ||
                    clientData.ComprehensiveRiskBehaviorAssessmentDate === null
                      ? setClientData({
                          ...clientData,
                          ComprehensiveRiskBehaviorAssessment:
                            !clientData.ComprehensiveRiskBehaviorAssessment,
                          ComprehensiveRiskBehaviorAssessmentDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          ComprehensiveRiskBehaviorAssessment:
                            !clientData.ComprehensiveRiskBehaviorAssessment,
                          ComprehensiveRiskBehaviorAssessmentDate: "",
                        });
                  }}
                  checked={
                    clientData.ComprehensiveRiskBehaviorAssessment
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div>
                <p>
                  Comprehensive Behavioral Risk Assessment{" "}
                  <span className="text-red-500">*</span>{" "}
                </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessment"
                  value={
                    clientData.ComprehensiveRiskBehaviorAssessmentDate &&
                    clientData.ComprehensiveRiskBehaviorAssessmentDate.split(
                      "T"
                    )[0]
                  }
                  disabled={
                    clientData.ComprehensiveRiskBehaviorAssessment
                      ? true
                      : false
                  }
                  className={`${MSAStyles.inputDate}`}
                  onChange={(e) => {
                    setClientData((prevDate) => ({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessmentDate:
                        prevDate.e.target.value,
                    }));
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.cbra_folder_url ? data[0]?.cbra_folder_url : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/*       <p className="text-dark-blue underline">CRBA</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessment"
                  className={`${MSAStyles.inputDate} {${
                    clientData.ComprehensiveRiskBehaviorAssessment
                      ? "border-2 border-dark-blue rounded-md p-px"
                      : ""
                  }`}
                  value={
                    clientData.ComprehensiveRiskBehaviorAssessmentUploadDate &&
                    clientData.ComprehensiveRiskBehaviorAssessmentUploadDate.split(
                      "T"
                    )[0]
                  }
                  disabled={
                    clientData.ComprehensiveRiskBehaviorAssessmentUploadDate
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessmentUploadDate:
                        e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.ComprehensiveRiskBehaviorAssessmentReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.ComprehensiveRiskBehaviorAssessmentReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        ComprehensiveRiskBehaviorAssessmentReviewed:
                          !formState.ComprehensiveRiskBehaviorAssessmentReviewed,
                        ComprehensiveRiskBehaviorAssessmentUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        ComprehensiveRiskBehaviorAssessmentReviewed:
                          !formState.ComprehensiveRiskBehaviorAssessmentReviewed,
                        ComprehensiveRiskBehaviorAssessmentUploadDate:
                          crearFecha(),
                      }));
                  if (
                    !clientData.ComprehensiveRiskBehaviorAssessmentReviewed ||
                    clientData.ComprehensiveRiskBehaviorAssessmentIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      ComprehensiveRiskBehaviorAssessmentUploadDate:
                        crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.ComprehensiveRiskBehaviorAssessmentReviewed
                      ? "3"
                      : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.ComprehensiveRiskBehaviorAssessment &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ComprehensiveRiskBehaviorAssessmentUploadDate ===
                      "" ||
                    clientData.ComprehensiveRiskBehaviorAssessmentUploadDate ===
                      null
                      ? setClientData({
                          ...clientData,
                          ComprehensiveRiskBehaviorAssessmentReviewed:
                            !clientData.ComprehensiveRiskBehaviorAssessmentReviewed,
                          ComprehensiveRiskBehaviorAssessmentUploadDate:
                            crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          ComprehensiveRiskBehaviorAssessmentReviewed:
                            !clientData.ComprehensiveRiskBehaviorAssessmentReviewed,
                        });
                  }}
                  disabled={
                    clientData.ComprehensiveRiskBehaviorAssessment
                      ? true
                      : false
                  }
                  checked={
                    clientData.ComprehensiveRiskBehaviorAssessmentReviewed
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.ComprehensiveRiskBehaviorAssessmentIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.ComprehensiveRiskBehaviorAssessmentIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        ComprehensiveRiskBehaviorAssessmentIssues:
                          !formState.ComprehensiveRiskBehaviorAssessmentIssues,
                        ComprehensiveRiskBehaviorAssessmentUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        ComprehensiveRiskBehaviorAssessmentIssues:
                          !formState.ComprehensiveRiskBehaviorAssessmentIssues,
                        ComprehensiveRiskBehaviorAssessmentUploadDate:
                          crearFecha(),
                      }));
                  if (
                    !clientData.ComprehensiveRiskBehaviorAssessmentIssues ||
                    clientData.ComprehensiveRiskBehaviorAssessmentReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      ComprehensiveRiskBehaviorAssessmentUploadDate:
                        crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.ComprehensiveRiskBehaviorAssessmentIssues
                      ? "3"
                      : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.ComprehensiveRiskBehaviorAssessment &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ComprehensiveRiskBehaviorAssessmentUploadDate ===
                      "" ||
                    clientData.ComprehensiveRiskBehaviorAssessmentUploadDate ===
                      null
                      ? setClientData({
                          ...clientData,
                          ComprehensiveRiskBehaviorAssessmentIssues:
                            !clientData.ComprehensiveRiskBehaviorAssessmentIssues,
                          ComprehensiveRiskBehaviorAssessmentUploadDate:
                            crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          ComprehensiveRiskBehaviorAssessmentIssues:
                            !clientData.ComprehensiveRiskBehaviorAssessmentIssues,
                        });
                  }}
                  checked={
                    clientData.ComprehensiveRiskBehaviorAssessmentIssues
                      ? "checked"
                      : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${
                clientData.ServiceActionPlan ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.ServiceActionPlan ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.ServiceActionPlan
                    ? setClientData((formState) => ({
                        ...formState,
                        ServiceActionPlan: !formState.ServiceActionPlan,
                        ServiceActionPlanDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        ServiceActionPlan: !formState.ServiceActionPlan,
                        ServiceActionPlanDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.ServiceActionPlan ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.ServiceActionPlan && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ServiceActionPlanDate === "" ||
                    clientData.ServiceActionPlanDate === null
                      ? setClientData({
                          ...clientData,
                          ServiceActionPlan: !clientData.ServiceActionPlan,
                          ServiceActionPlanDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          ServiceActionPlan: !clientData.ServiceActionPlan,
                          ServiceActionPlanDate: "",
                        });
                  }}
                  checked={clientData.ServiceActionPlan ? "checked" : false}
                />
              </div>
              <div>
                <p>Service Action Plan </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ServiceActionPlan"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.ServiceActionPlanDate &&
                    clientData.ServiceActionPlanDate.split("T")[0]
                  }
                  disabled={clientData.ServiceActionPlan ? true : false}
                  onChange={(e) => {
                    setClientData((prevDate) => ({
                      ...clientData,
                      ServiceActionPlanDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.action_plans_folder_url
                      ? data[0]?.action_plans_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ServiceActionPlan"
                  className={`${MSAStyles.inputDate} {${
                    clientData.ServiceActionPlan
                      ? "border-2 border-dark-blue rounded-md p-px"
                      : ""
                  }`}
                  value={
                    clientData.ServiceActionPlanUploadDate &&
                    clientData.ServiceActionPlanUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.ServiceActionPlanUploadDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      ServiceActionPlanUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.ServiceActionPlanReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.ServiceActionPlanReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        ServiceActionPlanReviewed:
                          !formState.ServiceActionPlanReviewed,
                        ServiceActionPlanUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        ServiceActionPlanReviewed:
                          !formState.ServiceActionPlanReviewed,
                        ServiceActionPlanUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.ServiceActionPlanReviewed ||
                    clientData.ServiceActionPlanReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      ServiceActionPlanUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.ServiceActionPlanReviewed ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.ServiceActionPlan && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ServiceActionPlanDate === "" ||
                    clientData.ServiceActionPlanDate === null
                      ? setClientData({
                          ...clientData,
                          ServiceActionPlan: !clientData.ServiceActionPlan,
                          ServiceActionPlanDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          ServiceActionPlan: !clientData.ServiceActionPlan,
                        });
                  }}
                  checked={
                    clientData.ServiceActionPlanReviewed ? "checked" : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.ServiceActionPlanIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.ServiceActionPlanIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        ServiceActionPlanIssues:
                          !formState.ServiceActionPlanIssues,
                        ServiceActionPlanUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        ServiceActionPlanIssues:
                          !formState.ServiceActionPlanIssues,
                        ServiceActionPlanUploadDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.ServiceActionPlanIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.ServiceActionPlan && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ServiceActionPlanUploadDate === "" ||
                    clientData.ServiceActionPlanUploadDate === null
                      ? setClientData({
                          ...clientData,
                          ServiceActionPlanIssues:
                            !clientData.ServiceActionPlanIssues,
                          ServiceActionPlanUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          ServiceActionPlanIssues:
                            !clientData.ServiceActionPlanIssues,
                        });
                  }}
                  checked={
                    clientData.ServiceActionPlanIssues ? "checked" : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${
                clientData.ProgressNote ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.ProgressNote ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.ProgressNote
                    ? setClientData((formState) => ({
                        ...formState,
                        ProgressNote: !formState.ProgressNote,
                        ProgressNoteDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        ProgressNote: !formState.ProgressNote,
                        ProgressNoteDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.ProgressNote ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.ProgressNote && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ProgressNoteDate === "" ||
                    clientData.ProgressNoteDate === null
                      ? setClientData({
                          ...clientData,
                          ProgressNote: !clientData.ProgressNote,
                          ProgressNoteDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          ProgressNote: !clientData.ProgressNote,
                          ProgressNoteDate: "",
                        });
                  }}
                  checked={clientData.ProgressNote ? "checked" : false}
                />
              </div>
              <div>
                <p>Progress Note</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ProgressNote"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.ProgressNoteDate &&
                    clientData.ProgressNoteDate.split("T")[0]
                  }
                  disabled={clientData.ProgressNote ? true : false}
                  onChange={(e) => {
                    setClientData((prevDate) => ({
                      ...clientData,
                      ProgressNoteDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.linkage_navigation_folder_url
                      ? data[0]?.action_plans_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ProgressNote"
                  className={`${MSAStyles.inputDate} {${
                    clientData.ProgressNote
                      ? "border-2 border-dark-blue rounded-md p-px"
                      : ""
                  }`}
                  value={
                    clientData.ProgressNoteUploadDate &&
                    clientData.ProgressNoteUploadDate.split("T")[0]
                  }
                  disabled={clientData.ProgressNoteUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      ProgressNoteUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.ProgressNoteReviewed ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.ProgressNoteReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        ProgressNoteReviewed: !formState.ProgressNoteReviewed,
                        ProgressNoteUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        ProgressNoteReviewed: !formState.ProgressNoteReviewed,
                        ProgressNoteUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.ProgressNoteReviewed ||
                    clientData.ProgressNoteReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      ProgressNoteUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.ProgressNoteReviewed ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.ProgressNote && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ProgressNoteDate === "" ||
                    clientData.ProgressNoteDate === null
                      ? setClientData({
                          ...clientData,
                          ProgressNote: !clientData.ProgressNote,
                          ProgressNoteDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          ProgressNote: !clientData.ProgressNote,
                        });
                  }}
                  checked={clientData.ProgressNoteReviewed ? "checked" : false}
                />
              </div>
              {clientData.ProgressNoteReviewed}
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.ProgressNoteIssues ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.ProgressNoteIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        ProgressNoteIssues: !formState.ProgressNoteIssues,
                        ProgressNoteUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        ProgressNoteIssues: !formState.ProgressNoteIssues,
                        ProgressNoteUploadDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.ProgressNoteIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.ProgressNote && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ProgressNoteUploadDate === "" ||
                    clientData.ProgressNoteUploadDate === null
                      ? setClientData({
                          ...clientData,
                          ProgressNoteIssues: !clientData.ProgressNoteIssues,
                          ProgressNoteUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          ProgressNoteIssues: !clientData.ProgressNoteIssues,
                        });
                  }}
                  checked={clientData.ProgressNoteIssues ? "checked" : false}
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.StatusChangesForm ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.StatusChangesForm ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.StatusChangesForm
                    ? setClientData((formState) => ({
                        ...formState,
                        StatusChangesForm: !formState.StatusChangesForm,
                        StatusChangesFormDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        StatusChangesForm: !formState.StatusChangesForm,
                        StatusChangesFormDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.StatusChangesForm ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.StatusChangesForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.StatusChangesFormDate === "" ||
                    clientData.StatusChangesFormDate === null
                      ? setClientData({
                          ...clientData,
                          StatusChangesForm: !clientData.StatusChangesForm,
                          StatusChangesFormDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          StatusChangesForm: !clientData.StatusChangesForm,
                          StatusChangesFormDate: "",
                        });
                  }}
                  checked={clientData.StatusChangesForm ? "checked" : false}
                />
              </div>
              <div>
                <p>Status Changes/Closure Forms</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="StatusChangeForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.StatusChangesFormDate &&
                    clientData.StatusChangesFormDate.split("T")[0]
                  }
                  disabled={clientData.StatusChangesForm ? true : false}
                  onChange={(e) => {
                    setClientData((prevDate) => ({
                      ...clientData,
                      StatusChangesFormDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.intake_folder_url
                      ? data[0]?.action_plans_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="StatusChangeForm"
                  className={`${MSAStyles.inputDate} {${
                    clientData.StatusChangesForm
                      ? "border-2 border-dark-blue rounded-md p-px"
                      : ""
                  }`}
                  value={
                    clientData.StatusChangesFormUploadDate &&
                    clientData.StatusChangesFormUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.StatusChangesFormUploadDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      StatusChangesFormUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.StatusChangesFormReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.StatusChangesFormReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        StatusChangesFormReviewed:
                          !formState.StatusChangesFormReviewed,
                        StatusChangesFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        StatusChangesFormReviewed:
                          !formState.StatusChangesFormReviewed,
                        StatusChangesFormUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.StatusChangesFormReviewed ||
                    clientData.StatusChangesFormReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      StatusChangesFormUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.StatusChangesFormReviewed ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.StatusChangesForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.StatusChangesFormDate === "" ||
                    clientData.StatusChangesFormDate === null
                      ? setClientData({
                          ...clientData,
                          StatusChangesForm: !clientData.StatusChangesForm,
                          StatusChangesFormDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          StatusChangesForm: !clientData.StatusChangesForm,
                        });
                  }}
                  checked={
                    clientData.StatusChangesFormReviewed ? "checked" : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.StatusChangesFormIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.StatusChangesFormIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        StatusChangesFormIssues:
                          !formState.StatusChangesFormIssues,
                        StatusChangesFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        StatusChangesFormIssues:
                          !formState.StatusChangesFormIssues,
                        StatusChangesFormUploadDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.StatusChangesFormIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.StatusChangesForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.StatusChangesFormUploadDate === "" ||
                    clientData.StatusChangesFormUploadDate === null
                      ? setClientData({
                          ...clientData,
                          StatusChangesFormIssues:
                            !clientData.StatusChangesFormIssues,
                          StatusChangeFormUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          StatusChangesFormIssues:
                            !clientData.StatusChangesFormIssues,
                        });
                  }}
                  checked={
                    clientData.StatusChangesFormIssues ? "checked" : false
                  }
                />
              </div>
            </div>
            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.ComprehensiveRiskBehaviorAssessmentUpdates
                  ? ""
                  : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.ComprehensiveRiskBehaviorAssessmentUpdates
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.ComprehensiveRiskBehaviorAssessmentUpdates
                    ? setClientData((formState) => ({
                        ...formState,
                        ComprehensiveRiskBehaviorAssessmentUpdates:
                          !formState.ComprehensiveRiskBehaviorAssessmentUpdates,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        ComprehensiveRiskBehaviorAssessmentUpdates:
                          !formState.ComprehensiveRiskBehaviorAssessmentUpdates,
                        ComprehensiveRiskBehaviorAssessmentUpdatesDate:
                          crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdates
                      ? "3"
                      : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.ComprehensiveRiskBehaviorAssessmentUpdates &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate ===
                      "" ||
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate ===
                      null
                      ? setClientData({
                          ...clientData,
                          ComprehensiveRiskBehaviorAssessmentUpdates:
                            !clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
                          ComprehensiveRiskBehaviorAssessmentUpdatesDate:
                            crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          ComprehensiveRiskBehaviorAssessmentUpdates:
                            !clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
                          ComprehensiveRiskBehaviorAssessmentUpdatesDate: "",
                        });
                  }}
                  checked={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdates
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div>
                <p>Comprehensive Behavioral Risk Assessment Updates</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate &&
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate.split(
                      "T"
                    )[0]
                  }
                  disabled={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdates
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData((prevDate) => ({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessmentUpdatesDate:
                        prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.cbra_folder_url
                      ? data[0]?.action_plans_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="ComprehensiveRiskBehaviorAssessmentUpdates"
                  className={`${MSAStyles.inputDate} {${
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdates
                      ? "border-2 border-dark-blue rounded-md p-px"
                      : ""
                  }`}
                  value={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate &&
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate.split(
                      "T"
                    )[0]
                  }
                  disabled={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate:
                        e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.ComprehensiveRiskBehaviorAssessmentUpdatesReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.ComprehensiveRiskBehaviorAssessmentUpdatesReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        ComprehensiveRiskBehaviorAssessmentUpdatesReviewed:
                          !formState.ComprehensiveRiskBehaviorAssessmentUpdatesReviewed,
                        ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate:
                          "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        ComprehensiveRiskBehaviorAssessmentUpdatesReviewed:
                          !formState.ComprehensiveRiskBehaviorAssessmentUpdatesReviewed,
                        ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate:
                          crearFecha(),
                      }));
                  if (
                    !clientData.ComprehensiveRiskBehaviorAssessmentUpdatesReviewed ||
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate:
                        crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesReviewed
                      ? "3"
                      : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.ComprehensiveRiskBehaviorAssessmentUpdates &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate ===
                      "" ||
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesDate ===
                      null
                      ? setClientData({
                          ...clientData,
                          ComprehensiveRiskBehaviorAssessmentUpdates:
                            !clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
                          ComprehensiveRiskBehaviorAssessmentUpdatesDate:
                            crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          ComprehensiveRiskBehaviorAssessmentUpdates:
                            !clientData.ComprehensiveRiskBehaviorAssessmentUpdates,
                        });
                  }}
                  checked={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesReviewed
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.ComprehensiveRiskBehaviorAssessmentUpdatesFormIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.ComprehensiveRiskBehaviorAssessmentUpdatesFormIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        ComprehensiveRiskBehaviorAssessmentUpdatesFormIssues:
                          !formState.ComprehensiveRiskBehaviorAssessmentUpdatesFormIssues,
                        ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate:
                          "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        ComprehensiveRiskBehaviorAssessmentUpdatesFormIssues:
                          !formState.ComprehensiveRiskBehaviorAssessmentUpdatesFormIssues,
                        ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate:
                          crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesFormIssues
                      ? "3"
                      : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.ComprehensiveRiskBehaviorAssessmentUpdates &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate ===
                      "" ||
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate ===
                      null
                      ? setClientData({
                          ...clientData,
                          ComprehensiveRiskBehaviorAssessmentUpdatesFormIssues:
                            !clientData.ComprehensiveRiskBehaviorAssessmentUpdatesFormIssues,
                          ComprehensiveRiskBehaviorAssessmentUpdatesUploadDate:
                            crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          ComprehensiveRiskBehaviorAssessmentUpdatesFormIssues:
                            !clientData.ComprehensiveRiskBehaviorAssessmentUpdatesFormIssues,
                        });
                  }}
                  checked={
                    clientData.ComprehensiveRiskBehaviorAssessmentUpdatesFormIssues
                      ? "checked"
                      : false
                  }
                />
              </div>
            </div>
            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.M11QForm ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.M11QForm ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.M11QForm
                    ? setClientData((formState) => ({
                        ...formState,
                        M11QForm: !formState.M11QForm,
                        M11QFormDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        M11QForm: !formState.M11QForm,
                        M11QFormDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.M11QForm ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.M11QForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.M11QFormDate === "" ||
                    clientData.M11QFormDate === null
                      ? setClientData({
                          ...clientData,
                          M11QForm: !clientData.M11QForm,
                          M11QFormDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          M11QForm: !clientData.M11QForm,
                          M11QFormDate: "",
                        });
                  }}
                  checked={clientData.M11QForm ? "checked" : false}
                />
              </div>
              <div>
                <p>M11Q</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="M11QForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.M11QFormDate &&
                    clientData.M11QFormDate.split("T")[0]
                  }
                  disabled={clientData.M11QForm ? true : false}
                  onChange={(e) => {
                    setClientData((prevDate) => ({
                      ...clientData,
                      M11QFormDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.medical_folder_url
                      ? data[0]?.action_plans_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="M11QForm"
                  className={`${MSAStyles.inputDate} {${
                    clientData.M11QForm
                      ? "border-2 border-dark-blue rounded-md p-px"
                      : ""
                  }`}
                  value={
                    clientData.M11QFormUploadDate &&
                    clientData.M11QFormUploadDate.split("T")[0]
                  }
                  disabled={clientData.M11QFormUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      M11QFormUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.M11QFormReviewed ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.M11QFormReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        M11QFormReviewed: !formState.M11QFormReviewed,
                        M11QFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        M11QFormReviewed: !formState.M11QFormReviewed,
                        M11QFormUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.M11QFormReviewed ||
                    clientData.M11QFormReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      M11QFormUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.M11QFormReviewed ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.M11QForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.M11QFormDate === "" ||
                    clientData.M11QFormDate === null
                      ? setClientData({
                          ...clientData,
                          M11QForm: !clientData.M11QForm,
                          M11QFormDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          M11QForm: !clientData.M11QForm,
                        });
                  }}
                  checked={clientData.M11QFormReviewed ? "checked" : false}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.M11QFormIssues ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.M11QFormIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        M11QFormIssues: !formState.M11QFormIssues,
                        M11QFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        M11QFormIssues: !formState.M11QFormIssues,
                        M11QFormUploadDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.M11QFormIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.M11QForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.M11QFormUploadDate === "" ||
                    clientData.M11QFormUploadDate === null
                      ? setClientData({
                          ...clientData,
                          M11QFormIssues: !clientData.M11QFormIssues,
                          M11QFormUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          M11QFormIssues: !clientData.M11QFormIssues,
                        });
                  }}
                  checked={clientData.M11QFormIssues ? "checked" : false}
                />
              </div>
            </div>
            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.CD4VLReports ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.CD4VLReports ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.CD4VLReports
                    ? setClientData((formState) => ({
                        ...formState,
                        CD4VLReports: !formState.CD4VLReports,
                        CD4VLReportsDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        CD4VLReports: !formState.CD4VLReports,
                        CD4VLReportsDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.CD4VLReports ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.CD4VLReports && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.CD4VLReportsDate === "" ||
                    clientData.CD4VLReportsDate === null
                      ? setClientData({
                          ...clientData,
                          CD4VLReports: !clientData.CD4VLReports,
                          CD4VLReportsDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          CD4VLReports: !clientData.CD4VLReports,
                          CD4VLReportsDate: "",
                        });
                  }}
                  checked={clientData.CD4VLReports ? "checked" : false}
                />
              </div>
              <div>
                <p>CD4/VL Check Reports</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="CD4VLReports"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.CD4VLReportsDate &&
                    clientData.CD4VLReportsDate.split("T")[0]
                  }
                  disabled={clientData.CD4VLReports ? true : false}
                  onChange={(e) => {
                    setClientData((prevDate) => ({
                      ...clientData,
                      CD4VLReportsDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.medical_folder_url
                      ? data[0]?.action_plans_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="CD4VLReports"
                  className={`${MSAStyles.inputDate} {${
                    clientData.CD4VLReports
                      ? "border-2 border-dark-blue rounded-md p-px"
                      : ""
                  }`}
                  value={
                    clientData.CD4VLReportsUploadDate &&
                    clientData.CD4VLReportsUploadDate.split("T")[0]
                  }
                  disabled={clientData.CD4VLReportsUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      CD4VLReportsUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.CD4VLReportsReviewed ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.CD4VLReportsReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        CD4VLReportsReviewed: !formState.CD4VLReportsReviewed,
                        CD4VLReportsUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        CD4VLReportsReviewed: !formState.CD4VLReportsReviewed,
                        CD4VLReportsUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.CD4VLReportsReviewed ||
                    clientData.CD4VLReportsReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      CD4VLReportsUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.CD4VLReportsReviewed ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.CD4VLReports && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.CD4VLReportsDate === "" ||
                    clientData.CD4VLReportsDate === null
                      ? setClientData({
                          ...clientData,
                          CD4VLReports: !clientData.CD4VLReports,
                          CD4VLReportsDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          CD4VLReports: !clientData.CD4VLReports,
                        });
                  }}
                  checked={clientData.CD4VLReportsReviewed ? "checked" : false}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.CD4VLReportsIssues ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.CD4VLReportsIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        CD4VLReportsIssues: !formState.CD4VLReportsIssues,
                        CD4VLReportsUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        CD4VLReportsIssues: !formState.CD4VLReportsIssues,
                        CD4VLReportsUploadDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.CD4VLReportsIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.CD4VLReports && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.CD4VLReportsUploadDate === "" ||
                    clientData.CD4VLReportsUploadDate === null
                      ? setClientData({
                          ...clientData,
                          CD4VLReportsIssues: !clientData.CD4VLReportsIssues,
                          CD4VLReportsUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          CD4VLReportsIssues: !clientData.CD4VLReportsIssues,
                        });
                  }}
                  checked={clientData.CD4VLReportsIssues ? "checked" : false}
                />
              </div>
            </div>
            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.InitialTreatmentAdherenceIntake
                  ? ""
                  : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.InitialTreatmentAdherenceIntake
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.InitialTreatmentAdherenceIntake
                    ? setClientData((formState) => ({
                        ...formState,
                        InitialTreatmentAdherenceIntake:
                          !formState.InitialTreatmentAdherenceIntake,
                        InitialTreatmentAdherenceIntakeDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        InitialTreatmentAdherenceIntake:
                          !formState.InitialTreatmentAdherenceIntake,
                        InitialTreatmentAdherenceIntakeDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.InitialTreatmentAdherenceIntake ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.InitialTreatmentAdherenceIntake &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.InitialTreatmentAdherenceIntakeDate === "" ||
                    clientData.InitialTreatmentAdherenceIntakeDate === null
                      ? setClientData({
                          ...clientData,
                          InitialTreatmentAdherenceIntake:
                            !clientData.InitialTreatmentAdherenceIntake,
                          InitialTreatmentAdherenceIntakeDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          InitialTreatmentAdherenceIntake:
                            !clientData.InitialTreatmentAdherenceIntake,
                          InitialTreatmentAdherenceIntakeDate: "",
                        });
                  }}
                  checked={
                    clientData.InitialTreatmentAdherenceIntake
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div>
                <p>Initial Treatment Adherence Intake</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="InitialTreatmentAdherenceIntake"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.InitialTreatmentAdherenceIntakeDate &&
                    clientData.InitialTreatmentAdherenceIntakeDate.split("T")[0]
                  }
                  disabled={
                    clientData.InitialTreatmentAdherenceIntake ? true : false
                  }
                  onChange={(e) => {
                    setClientData((prevDate) => ({
                      ...clientData,
                      InitialTreatmentAdherenceIntakeDate:
                        prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.medical_folder_url
                      ? data[0]?.action_plans_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="InitialTreatmentAdherenceIntake"
                  className={`${MSAStyles.inputDate} {${
                    clientData.InitialTreatmentAdherenceIntake
                      ? "border-2 border-dark-blue rounded-md p-px"
                      : ""
                  }`}
                  value={
                    clientData.InitialTreatmentAdherenceIntakeUploadDate &&
                    clientData.InitialTreatmentAdherenceIntakeUploadDate.split(
                      "T"
                    )[0]
                  }
                  disabled={
                    clientData.InitialTreatmentAdherenceIntakeUploadDate
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      InitialTreatmentAdherenceIntakeUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.InitialTreatmentAdherenceIntakeReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.InitialTreatmentAdherenceIntakeReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        InitialTreatmentAdherenceIntakeReviewed:
                          !formState.InitialTreatmentAdherenceIntakeReviewed,
                        InitialTreatmentAdherenceIntakeUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        InitialTreatmentAdherenceIntakeReviewed:
                          !formState.InitialTreatmentAdherenceIntakeReviewed,
                        InitialTreatmentAdherenceIntakeUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.InitialTreatmentAdherenceIntakeReviewed ||
                    clientData.InitialTreatmentAdherenceIntakeReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      InitialTreatmentAdherenceIntakeUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.InitialTreatmentAdherenceIntakeReviewed
                      ? "3"
                      : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.InitialTreatmentAdherenceIntake &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.InitialTreatmentAdherenceIntakeDate === "" ||
                    clientData.InitialTreatmentAdherenceIntakeDate === null
                      ? setClientData({
                          ...clientData,
                          InitialTreatmentAdherenceIntake:
                            !clientData.InitialTreatmentAdherenceIntake,
                          InitialTreatmentAdherenceIntakeDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          InitialTreatmentAdherenceIntake:
                            !clientData.InitialTreatmentAdherenceIntake,
                        });
                  }}
                  checked={
                    clientData.InitialTreatmentAdherenceIntakeReviewed
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.InitialTreatmentAdherenceIntakeIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.InitialTreatmentAdherenceIntakeIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        InitialTreatmentAdherenceIntakeIssues:
                          !formState.InitialTreatmentAdherenceIntakeIssues,
                        InitialTreatmentAdherenceIntakeUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        InitialTreatmentAdherenceIntakeIssues:
                          !formState.InitialTreatmentAdherenceIntakeIssues,
                        InitialTreatmentAdherenceIntakeUploadDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.InitialTreatmentAdherenceIntakeIssues ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.InitialTreatmentAdherenceIntake &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.InitialTreatmentAdherenceIntakeUploadDate ===
                      "" ||
                    clientData.InitialTreatmentAdherenceIntakeUploadDate ===
                      null
                      ? setClientData({
                          ...clientData,
                          InitialTreatmentAdherenceIntakeIssues:
                            !clientData.InitialTreatmentAdherenceIntakeIssues,
                          InitialTreatmentAdherenceIntakeUploadDate:
                            crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          InitialTreatmentAdherenceIntakeIssues:
                            !clientData.InitialTreatmentAdherenceIntakeIssues,
                        });
                  }}
                  checked={
                    clientData.InitialTreatmentAdherenceIntakeIssues
                      ? "checked"
                      : false
                  }
                />
              </div>
            </div>
            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.TreatmentAdherenceUpdates
                  ? ""
                  : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.InitialTreatmentAdherenceIntake
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.TreatmentAdherenceUpdates
                    ? setClientData((formState) => ({
                        ...formState,
                        TreatmentAdherenceUpdates:
                          !formState.TreatmentAdherenceUpdates,
                        TreatmentAdherenceUpdatesDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        TreatmentAdherenceUpdates:
                          !formState.TreatmentAdherenceUpdates,
                        TreatmentAdherenceUpdatesDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.TreatmentAdherenceUpdates ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.TreatmentAdherenceUpdates && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.TreatmentAdherenceUpdatesDate === "" ||
                    clientData.TreatmentAdherenceUpdatesDate === null
                      ? setClientData({
                          ...clientData,
                          TreatmentAdherenceUpdates:
                            !clientData.TreatmentAdherenceUpdates,
                          TreatmentAdherenceUpdatesDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          TreatmentAdherenceUpdates:
                            !clientData.TreatmentAdherenceUpdates,
                          TreatmentAdherenceUpdatesDate: "",
                        });
                  }}
                  checked={
                    clientData.TreatmentAdherenceUpdates ? "checked" : false
                  }
                />
              </div>
              <div>
                <p>Treatment Adherence Updates</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="TreatmentAdherenceUpdates"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.TreatmentAdherenceUpdatesDate &&
                    clientData.TreatmentAdherenceUpdatesDate.split("T")[0]
                  }
                  disabled={clientData.TreatmentAdherenceUpdates ? true : false}
                  onChange={(e) => {
                    setClientData((prevDate) => ({
                      ...clientData,
                      TreatmentAdherenceUpdatesDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>

              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.medical_folder_url
                      ? data[0]?.action_plans_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Action Plans</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="TreatmentAdherenceUpdates"
                  className={`${MSAStyles.inputDate} {${
                    clientData.TreatmentAdherenceUpdates
                      ? "border-2 border-dark-blue rounded-md p-px"
                      : ""
                  }`}
                  value={
                    clientData.TreatmentAdherenceUpdatesUploadDate &&
                    clientData.TreatmentAdherenceUpdatesUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.TreatmentAdherenceUpdatesUploadDate
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      TreatmentAdherenceUpdatesUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.TreatmentAdherenceUpdatesReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.TreatmentAdherenceUpdatesReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        TreatmentAdherenceUpdatesReviewed:
                          !formState.TreatmentAdherenceUpdatesReviewed,
                        TreatmentAdherenceUpdatesUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        TreatmentAdherenceUpdatesReviewed:
                          !formState.TreatmentAdherenceUpdatesReviewed,
                        TreatmentAdherenceUpdatesUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.TreatmentAdherenceUpdatesReviewed ||
                    clientData.TreatmentAdherenceUpdatesReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      TreatmentAdherenceUpdatesUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.TreatmentAdherenceUpdatesReviewed ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.TreatmentAdherenceUpdates && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.TreatmentAdherenceUpdatesDate === "" ||
                    clientData.TreatmentAdherenceUpdatesDate === null
                      ? setClientData({
                          ...clientData,
                          TreatmentAdherenceUpdates:
                            !clientData.TreatmentAdherenceUpdates,
                          TreatmentAdherenceUpdatesDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          TreatmentAdherenceUpdates:
                            !clientData.TreatmentAdherenceUpdates,
                        });
                  }}
                  checked={
                    clientData.TreatmentAdherenceUpdatesReviewed
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.TreatmentAdherenceUpdatesIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.TreatmentAdherenceUpdatesIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        TreatmentAdherenceUpdatesIssues:
                          !formState.TreatmentAdherenceUpdatesIssues,
                        TreatmentAdherenceUpdatesUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        TreatmentAdherenceUpdatesIssues:
                          !formState.TreatmentAdherenceUpdatesIssues,
                        TreatmentAdherenceUpdatesUploadDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.TreatmentAdherenceUpdatesIssues ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.TreatmentAdherenceUpdates && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.TreatmentAdherenceUpdatesUploadDate === "" ||
                    clientData.TreatmentAdherenceUpdatesUploadDate === null
                      ? setClientData({
                          ...clientData,
                          TreatmentAdherenceUpdatesIssues:
                            !clientData.TreatmentAdherenceUpdatesIssues,
                          TreatmentAdherenceUpdatesUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          TreatmentAdherenceUpdatesIssues:
                            !clientData.TreatmentAdherenceUpdatesIssues,
                        });
                  }}
                  checked={
                    clientData.TreatmentAdherenceUpdatesIssues
                      ? "checked"
                      : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.AIRSCollateralInformation
                  ? ""
                  : "pointer-events-none"
              }`}
            >
              <div className="ml-1 text-center flex justify-center items-center ">
                <div
                  className={`ml-1 text-center flex justify-center items-center ${
                    clientData.AIRSCollateralInformation
                      ? "pointer-events-none"
                      : ""
                  }`}
                  onClick={() => {
                    clientData.AIRSCollateralInformation
                      ? setClientData((formState) => ({
                          ...formState,
                          AIRSCollateralInformation:
                            !formState.AIRSCollateralInformation,
                          AIRSCollateralInformationDate: "",
                        }))
                      : setClientData((formState) => ({
                          ...formState,
                          AIRSCollateralInformation:
                            !formState.AIRSCollateralInformation,
                          AIRSCollateralInformationDate: crearFecha(),
                        }));
                  }}
                  disabled={clientData.AIRSCollateralInformation ? true : false}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute z-10 text-dark-blue h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={
                      clientData.AIRSCollateralInformation ? "3" : "0"
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <input
                    className={`${
                      !clientData.AIRSCollateralInformation && "bg-slate-300"
                    } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                    type="checkbox"
                    name=""
                    id=""
                    onChange={(e) => {
                      clientData.AIRSCollateralInformationDate === "" ||
                      clientData.AIRSCollateralInformationDate === null
                        ? setClientData({
                            ...clientData,
                            AIRSCollateralInformation:
                              !clientData.AIRSCollateralInformation,
                            AIRSCollateralInformationDate: crearFecha(),
                          })
                        : setClientData({
                            ...clientData,
                            AIRSCollateralInformation:
                              !clientData.AIRSCollateralInformation,
                            AIRSCollateralInformationDate: "",
                          });
                    }}
                    checked={
                      clientData.AIRSCollateralInformation ? "checked" : false
                    }
                    disabled={
                      clientData.AIRSCollateralInformation ? true : false
                    }
                  />
                </div>
                {/*  */}
              </div>
              <div>
                <p>AIRS Collateral Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSCollateralInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSCollateralInformationDate &&
                    clientData.AIRSCollateralInformationDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSCollateralInformationDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData((prevDate) => ({
                      ...clientData,
                      AIRSCollateralInformationDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.tickler_updates_folder_url
                      ? data[0]?.tickler_updates_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSCollateralInformation"
                  className={`${MSAStyles.inputDate} {${
                    clientData.AIRSCollateralInformation
                      ? "border-2 border-dark-blue rounded-md p-px"
                      : ""
                  }`}
                  value={
                    clientData.AIRSCollateralInformationUploadDate &&
                    clientData.AIRSCollateralInformationUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSCollateralInformationUploadDate
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSCollateralInformationUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSCollateralInformationReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSCollateralInformationReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSCollateralInformationReviewed:
                          !formState.AIRSCollateralInformationReviewed,
                        AIRSCollateralInformationUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSCollateralInformationReviewed:
                          !formState.AIRSCollateralInformationReviewed,
                        AIRSCollateralInformationUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSCollateralInformationIssues ||
                    !clientData.AIRSCollateralInformationReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSCollateralInformationUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSCollateralInformationReviewed ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSCollateralInformation && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSCollateralInformationUploadDate === "" ||
                    clientData.AIRSCollateralInformationUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSCollateralInformationReviewed:
                            !clientData.AIRSCollateralInformationReviewed,
                          AIRSCollateralInformationUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSCollateralInformationReviewed:
                            !clientData.AIRSCollateralInformationReviewed,
                        });
                  }}
                  checked={
                    clientData.AIRSCollateralInformationReviewed
                      ? "checked"
                      : false
                  }
                  disabled={
                    clientData.AIRSCollateralInformationReviewed ? true : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSCollateralInformationIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSCollateralInformationIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSCollateralInformationIssues:
                          !formState.AIRSCollateralInformationIssues,
                        AIRSCollateralInformationUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSCollateralInformationIssues:
                          !formState.AIRSCollateralInformationIssues,
                        AIRSCollateralInformationUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.AIRSCollateralInformationIssues ||
                    clientData.AIRSCollateralInformationReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSCollateralInformationUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSCollateralInformationIssues ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSCollateralInformation && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSCollateralInformationUploadDate === "" ||
                    clientData.AIRSCollateralInformationUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSCollateralInformationIssues:
                            !clientData.AIRSCollateralInformationIssues,
                          AIRSCollateralInformationUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSCollateralInformationIssues:
                            !clientData.AIRSCollateralInformationIssues,
                        });
                  }}
                  checked={
                    clientData.AIRSCollateralInformationIssues
                      ? "checked"
                      : false
                  }
                />
              </div>
            </div>
            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.AIRSDrugRegimen ? "" : "pointer-events-none"
              }`}
            >
              <div className="ml-1 text-center flex justify-center items-center ">
                <div
                  className={`ml-1 text-center flex justify-center items-center ${
                    clientData.AIRSDrugRegimen ? "pointer-events-none" : ""
                  }`}
                  onClick={() => {
                    clientData.AIRSDrugRegimen
                      ? setClientData((formState) => ({
                          ...formState,
                          AIRSDrugRegimen: !formState.AIRSDrugRegimen,
                          AIRSDrugRegimenDate: "",
                        }))
                      : setClientData((formState) => ({
                          ...formState,
                          AIRSDrugRegimen: !formState.AIRSDrugRegimen,
                          AIRSDrugRegimenDate: crearFecha(),
                        }));
                  }}
                  disabled={clientData.AIRSDrugRegimen ? true : false}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute z-10 text-dark-blue h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={clientData.AIRSDrugRegimen ? "3" : "0"}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <input
                    className={`${
                      !clientData.AIRSDrugRegimen && "bg-slate-300"
                    } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                    type="checkbox"
                    name=""
                    id=""
                    onChange={(e) => {
                      clientData.AIRSDrugRegimenDate === "" ||
                      clientData.AIRSDrugRegimenDate === null
                        ? setClientData({
                            ...clientData,
                            AIRSDrugRegimen: !clientData.AIRSDrugRegimen,
                            AIRSDrugRegimenDate: crearFecha(),
                          })
                        : setClientData({
                            ...clientData,
                            AIRSDrugRegimen: !clientData.AIRSDrugRegimen,
                            AIRSDrugRegimenDate: "",
                          });
                    }}
                    checked={clientData.AIRSDrugRegimen ? "checked" : false}
                    disabled={clientData.AIRSDrugRegimen ? true : false}
                  />
                </div>
                {/*  */}
              </div>
              <div>
                <p>AIRS Drug Regimen History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSCollateralInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSDrugRegimenDate &&
                    clientData.AIRSDrugRegimenDate.split("T")[0]
                  }
                  disabled={clientData.AIRSDrugRegimenDate ? true : false}
                  onChange={(e) => {
                    setClientData((prevDate) => ({
                      ...clientData,
                      AIRSDrugRegimenDate: prevDate.e.target.value,
                    }));
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.tickler_updates_folder_url
                      ? data[0]?.tickler_updates_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSCollateralInformation"
                  className={`${MSAStyles.inputDate} {${
                    clientData.AIRSDrugRegimen
                      ? "border-2 border-dark-blue rounded-md p-px"
                      : ""
                  }`}
                  value={
                    clientData.AIRSDrugRegimenUploadDate &&
                    clientData.AIRSDrugRegimenUploadDate.split("T")[0]
                  }
                  disabled={clientData.AIRSDrugRegimenUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSDrugRegimenUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSDrugRegimenReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSDrugRegimenReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSDrugRegimenReviewed:
                          !formState.AIRSDrugRegimenReviewed,
                        AIRSDrugRegimenUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSDrugRegimenReviewed:
                          !formState.AIRSDrugRegimenReviewed,
                        AIRSDrugRegimenUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSDrugRegimenIssues ||
                    !clientData.AIRSDrugRegimenReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSDrugRegimenUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSDrugRegimenReviewed ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSDrugRegimen && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSDrugRegimenUploadDate === "" ||
                    clientData.AIRSDrugRegimenUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSDrugRegimenReviewed:
                            !clientData.AIRSDrugRegimenReviewed,
                          AIRSDrugRegimenUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSDrugRegimenReviewed:
                            !clientData.AIRSDrugRegimenReviewed,
                        });
                  }}
                  checked={
                    clientData.AIRSDrugRegimenReviewed ? "checked" : false
                  }
                  /*  disabled={clientData.AIRSDrugRegimenReviewed ? true : false} */
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSDrugRegimenIssues ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.AIRSDrugRegimenIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSDrugRegimenIssues: !formState.AIRSDrugRegimenIssues,
                        AIRSDrugRegimenUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSDrugRegimenIssues: !formState.AIRSDrugRegimenIssues,
                        AIRSDrugRegimenUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.AIRSDrugRegimenIssues ||
                    clientData.AIRSDrugRegimenIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSDrugRegimenUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSDrugRegimenIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSDrugRegimen && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSDrugRegimenUploadDate === "" ||
                    clientData.AIRSDrugRegimenUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSDrugRegimenIssues:
                            !clientData.AIRSDrugRegimenIssues,
                          AIRSDrugRegimenUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSDrugRegimenIssues:
                            !clientData.AIRSDrugRegimenIssues,
                        });
                  }}
                  checked={clientData.AIRSDrugRegimenIssues ? "checked" : false}
                />
              </div>
            </div>
            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.AIRSFinancialInformation ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSFinancialInformation
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSFinancialInformation
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSFinancialInformation:
                          !formState.AIRSFinancialInformation,
                        AIRSFinancialInformationDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSFinancialInformation:
                          !formState.AIRSFinancialInformation,
                        AIRSFinancialInformationDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSFinancialInformation ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSFinancialInformation && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSFinancialInformationDate === "" ||
                    clientData.AIRSFinancialInformationDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSFinancialInformation:
                            !clientData.AIRSFinancialInformation,
                          AIRSFinancialInformationDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSFinancialInformation:
                            !clientData.AIRSFinancialInformation,
                        });
                  }}
                  checked={
                    clientData.AIRSFinancialInformation ? "checked" : false
                  }
                />
              </div>
              <div>
                <p>AIRS Financial Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSFinancialInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSFinancialInformationDate &&
                    clientData.AIRSFinancialInformationDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSFinancialInformationDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSFinancialInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.tickler_updates_folder_url
                      ? data[0]?.tickler_updates_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/*  <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSFinancialInformation"
                  className={`${MSAStyles.inputDate} {${
                    clientData.AIRSFinancialInformation &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.AIRSFinancialInformationUploadDate &&
                    clientData.AIRSFinancialInformationUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSFinancialInformationUploadDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSFinancialInformationUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSFinancialInformationReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSFinancialInformationReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSFinancialInformationReviewed:
                          !formState.AIRSFinancialInformationReviewed,
                        AIRSFinancialInformationUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSFinancialInformationReviewed:
                          !formState.AIRSFinancialInformationReviewed,
                        AIRSFinancialInformationUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSFinancialInformationIssues ||
                    !clientData.AIRSFinancialInformationReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSFinancialInformationUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSFinancialInformationReviewed ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSFinancialInformation && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSFinancialInformationUploadDate === "" ||
                    clientData.AIRSFinancialInformationUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSFinancialInformationReviewed:
                            !clientData.AIRSFinancialInformationReviewed,
                          AIRSFinancialInformationUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSFinancialInformationReviewed:
                            !clientData.AIRSFinancialInformationReviewed,
                        });
                  }}
                  checked={
                    clientData.AIRSFinancialInformationReviewed
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSFinancialInformationIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSFinancialInformationIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSFinancialInformationIssues:
                          !formState.AIRSFinancialInformationIssues,
                        AIRSFinancialInformationUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSFinancialInformationIssues:
                          !formState.AIRSFinancialInformationIssues,
                        AIRSFinancialInformationUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.AIRSFinancialInformationIssues ||
                    clientData.AIRSFinancialInformationReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSFinancialInformationUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSFinancialInformationIssues ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSFinancialInformation && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSFinancialInformationUploadDate === "" ||
                    clientData.AIRSFinancialInformationUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSFinancialInformationIssues:
                            !clientData.AIRSFinancialInformationIssues,
                          AIRSFinancialInformationUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSFinancialInformationIssues:
                            !clientData.AIRSFinancialInformationIssues,
                        });
                  }}
                  checked={
                    clientData.AIRSFinancialInformationIssues
                      ? "checked"
                      : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.AIRSHIVAIDSRiskHistory ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHIVAIDSRiskHistory ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.AIRSHIVAIDSRiskHistory
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHIVAIDSRiskHistory:
                          !formState.AIRSHIVAIDSRiskHistory,
                        AIRSHIVAIDSRiskHistoryDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHIVAIDSRiskHistory:
                          !formState.AIRSHIVAIDSRiskHistory,
                        AIRSHIVAIDSRiskHistoryDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSHIVAIDSRiskHistory ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHIVAIDSRiskHistory && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVAIDSRiskHistoryDate === "" ||
                    clientData.AIRSHIVAIDSRiskHistoryDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHIVAIDSRiskHistory:
                            !clientData.AIRSHIVAIDSRiskHistory,
                          AIRSHIVAIDSRiskHistoryDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHIVAIDSRiskHistory:
                            !clientData.AIRSHIVAIDSRiskHistory,
                        });
                  }}
                  checked={
                    clientData.AIRSHIVAIDSRiskHistory ? "checked" : false
                  }
                />
              </div>
              <div>
                <p>AIRS HIV AIDS Risk History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHIVAIDSRiskHistory"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSHIVAIDSRiskHistoryDate &&
                    clientData.AIRSHIVAIDSRiskHistoryDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSHIVAIDSRiskHistoryDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHIVAIDSRiskHistoryDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.tickler_updates_folder_url
                      ? data[0]?.tickler_updates_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHIVAIDSRiskHistory"
                  className={`${MSAStyles.inputDate} {${
                    clientData.AIRSHIVAIDSRiskHistory &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.AIRSHIVAIDSRiskHistoryUploadDate &&
                    clientData.AIRSHIVAIDSRiskHistoryUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSHIVAIDSRiskHistoryUploadDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHIVAIDSRiskHistoryUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHIVAIDSRiskHistoryReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSHIVAIDSRiskHistoryReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHIVAIDSRiskHistoryReviewed:
                          !formState.AIRSHIVAIDSRiskHistoryReviewed,
                        AIRSHIVAIDSRiskHistoryUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHIVAIDSRiskHistoryReviewed:
                          !formState.AIRSHIVAIDSRiskHistoryReviewed,
                        AIRSHIVAIDSRiskHistoryUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSHIVAIDSRiskHistoryIssues ||
                    !clientData.AIRSHIVAIDSRiskHistoryReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSHIVAIDSRiskHistoryUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSHIVAIDSRiskHistoryReviewed ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHIVAIDSRiskHistory && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVAIDSRiskHistoryUploadDate === "" ||
                    clientData.AIRSHIVAIDSRiskHistoryUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHIVAIDSRiskHistoryReviewed:
                            !clientData.AIRSHIVAIDSRiskHistoryReviewed,
                          AIRSHIVAIDSRiskHistoryUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHIVAIDSRiskHistoryReviewed:
                            !clientData.AIRSHIVAIDSRiskHistoryReviewed,
                        });
                  }}
                  checked={
                    clientData.AIRSHIVAIDSRiskHistoryReviewed
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHIVAIDSRiskHistoryIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSHIVAIDSRiskHistoryIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHIVAIDSRiskHistoryIssues:
                          !formState.AIRSHIVAIDSRiskHistoryIssues,
                        AIRSHIVAIDSRiskHistoryUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHIVAIDSRiskHistoryIssues:
                          !formState.AIRSHIVAIDSRiskHistoryIssues,
                        AIRSHIVAIDSRiskHistoryUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.AIRSHIVAIDSRiskHistoryIssues ||
                    clientData.AIRSHIVAIDSRiskHistoryReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSHIVAIDSRiskHistoryUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSHIVAIDSRiskHistoryIssues ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHIVAIDSRiskHistory && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVAIDSRiskHistoryUploadDate === "" ||
                    clientData.AIRSHIVAIDSRiskHistoryUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHIVAIDSRiskHistoryIssues:
                            !clientData.AIRSHIVAIDSRiskHistoryIssues,
                          AIRSHIVAIDSRiskHistoryUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHIVAIDSRiskHistoryIssues:
                            !clientData.AIRSHIVAIDSRiskHistoryIssues,
                        });
                  }}
                  checked={
                    clientData.AIRSHIVAIDSRiskHistoryIssues ? "checked" : false
                  }
                />
              </div>
            </div>
            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.AIRSHIVMedicalProvider ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHCVHistory ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.AIRSHIVMedicalProvider
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHIVMedicalProvider:
                          !formState.AIRSHIVMedicalProvider,
                        AIRSHIVMedicalProviderDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHIVMedicalProvider:
                          !formState.AIRSHIVMedicalProvider,
                        AIRSHIVMedicalProviderDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSHIVMedicalProvider ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHIVMedicalProvider && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVMedicalProviderDate === "" ||
                    clientData.AIRSHIVMedicalProviderDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHIVMedicalProvider:
                            !clientData.AIRSHIVMedicalProvider,
                          AIRSHIVMedicalProviderDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHIVMedicalProvider:
                            !clientData.AIRSHIVMedicalProvider,
                        });
                  }}
                  checked={
                    clientData.AIRSHIVMedicalProvider ? "checked" : false
                  }
                />
              </div>
              <div>
                <p>AIRS HIV Medical Provider History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSHIVMedicalProviderDate &&
                    clientData.AIRSHIVMedicalProviderDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSHIVMedicalProviderDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHIVMedicalProviderDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.tickler_updates_folder_url
                      ? data[0]?.tickler_updates_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  className={`${MSAStyles.inputDate} {${
                    clientData.AIRSHIVMedicalProvider &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.AIRSHIVMedicalProviderUploadDate &&
                    clientData.AIRSHIVMedicalProviderUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSHIVMedicalProviderUploadDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHIVMedicalProviderUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHIVMedicalProviderReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSHIVMedicalProviderReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHIVMedicalProviderReviewed:
                          !formState.AIRSHIVMedicalProviderReviewed,
                        AIRSHIVMedicalProviderUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHIVMedicalProviderReviewed:
                          !formState.AIRSHIVMedicalProviderReviewed,
                        AIRSHIVMedicalProviderUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSHIVMedicalProviderIssues ||
                    !clientData.AIRSHIVMedicalProviderReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSHIVMedicalProviderUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSHIVMedicalProviderReviewed ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHIVMedicalProvider && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVMedicalProviderUploadDate === "" ||
                    clientData.AIRSHIVMedicalProviderUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHIVMedicalProviderReviewed:
                            !clientData.AIRSHIVMedicalProviderReviewed,
                          AIRSHIVMedicalProviderUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHIVMedicalProviderReviewed:
                            !clientData.AIRSHIVMedicalProviderReviewed,
                        });
                  }}
                  checked={
                    clientData.AIRSHIVMedicalProviderReviewed
                      ? "checked"
                      : false
                  }
                />

                {/* {JSON.stringify(clientData.AirsHIVMedicalProviderReviewed)} */}
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHIVMedicalProviderIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSHIVMedicalProviderIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHIVMedicalProviderIssues:
                          !formState.AIRSHIVMedicalProviderIssues,
                        AIRSHIVMedicalProviderUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHIVMedicalProviderIssues:
                          !formState.AIRSHIVMedicalProviderIssues,
                        AIRSHIVMedicalProviderUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSHIVMedicalProviderReviewed ||
                    !clientData.AIRSHIVMedicalProviderIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSHIVMedicalProviderUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSHIVMedicalProviderIssues ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHIVMedicalProvider && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVMedicalProviderUploadDate === "" ||
                    clientData.AIRSHIVMedicalProviderUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHIVMedicalProviderIssues:
                            !clientData.AIRSHIVMedicalProviderIssues,
                          AIRSHIVMedicalProviderUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHIVMedicalProviderIssues:
                            !clientData.AIRSHIVMedicalProviderIssues,
                        });
                  }}
                  checked={
                    clientData.AIRSHIVMedicalProviderIssues ? "checked" : ""
                  }
                />
              </div>
            </div>
            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.AIRSHIVStatusHistory ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHIVStatusHistory ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.AIRSHIVStatusHistory
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHIVStatusHistory: !formState.AIRSHIVStatusHistory,
                        AIRSHIVStatusHistoryDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHIVStatusHistory: !formState.AIRSHIVStatusHistory,
                        AIRSHIVStatusHistoryDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSHIVStatusHistory ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHIVStatusHistory && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVStatusHistoryDate === "" ||
                    clientData.AIRSHIVStatusHistoryDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHIVStatusHistory:
                            !clientData.AIRSHIVStatusHistory,
                          AIRSHIVStatusHistoryDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHIVStatusHistory:
                            !clientData.AIRSHIVStatusHistory,
                        });
                  }}
                  checked={clientData.AIRSHIVStatusHistory ? "checked" : false}
                />
              </div>
              <div>
                <p>AIRS HIV Status History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSHIVStatusHistoryDate &&
                    clientData.AIRSHIVStatusHistoryDate.split("T")[0]
                  }
                  disabled={clientData.AIRSHIVStatusHistoryDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHIVStatusHistoryDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.tickler_updates_folder_url
                      ? data[0]?.tickler_updates_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  className={`${MSAStyles.inputDate} {${
                    clientData.AIRSHIVStatusHistory &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.AIRSHIVStatusHistoryUploadDate &&
                    clientData.AIRSHIVStatusHistoryUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSHIVStatusHistoryUploadDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHIVStatusHistoryUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHIVStatusHistoryReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSHIVStatusHistoryReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHIVStatusHistoryReviewed:
                          !formState.AIRSHIVStatusHistoryReviewed,
                        AIRSHIVStatusHistoryUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHIVStatusHistoryReviewed:
                          !formState.AIRSHIVStatusHistoryReviewed,
                        AIRSHIVStatusHistoryUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSHIVStatusHistoryIssues ||
                    !clientData.AIRSHIVStatusHistoryReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSHIVStatusHistoryUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSHIVStatusHistoryReviewed ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHIVStatusHistory && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVStatusHistoryUploadDate === "" ||
                    clientData.AIRSHIVStatusHistoryUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHIVStatusHistoryReviewed:
                            !clientData.AIRSHIVStatusHistoryReviewed,
                          AIRSHIVStatusHistoryUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHIVStatusHistoryReviewed:
                            !clientData.AIRSHIVStatusHistoryReviewed,
                        });
                  }}
                  checked={
                    clientData.AIRSHIVStatusHistoryReviewed ? "checked" : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHIVStatusHistoryIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSHIVStatusHistoryIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHIVStatusHistoryIssues:
                          !formState.AIRSHIVStatusHistoryIssues,
                        AIRSHIVStatusHistoryUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHIVStatusHistoryIssues:
                          !formState.AIRSHIVStatusHistoryIssues,
                        AIRSHIVStatusHistoryUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSHIVStatusHistoryIssues ||
                    !clientData.AIRSHIVStatusHistoryIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSHIVStatusHistoryUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSHIVStatusHistoryIssues ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHIVStatusHistory && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHIVStatusHistoryUploadDate === "" ||
                    clientData.AIRSHIVStatusHistoryUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHIVStatusHistoryIssues:
                            !clientData.AIRSHIVStatusHistoryIssues,
                          AIRSHIVStatusHistoryUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHIVStatusHistoryIssues:
                            !clientData.AIRSHIVStatusHistoryIssues,
                        });
                  }}
                  checked={
                    clientData.AIRSHIVStatusHistoryIssues ? "checked" : false
                  }
                />
              </div>
            </div>
            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.AIRSHCVHistory ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHCVHistory ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.AIRSHCVHistory
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHCVHistory: !formState.AIRSHCVHistory,
                        AIRSHCVHistoryDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHCVHistory: !formState.AIRSHCVHistory,
                        AIRSHCVHistoryDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSHCVHistory ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHCVHistory && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHCVHistoryDate === "" ||
                    clientData.AIRSHCVHistoryDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHCVHistory: !clientData.AIRSHCVHistory,
                          AIRSHCVHistoryDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHCVHistory: !clientData.AIRSHCVHistory,
                        });
                  }}
                  checked={clientData.AIRSHCVHistory ? "checked" : false}
                />
              </div>
              <div>
                <p>AIRS HCV History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSHCVHistoryDate &&
                    clientData.AIRSHCVHistoryDate.split("T")[0]
                  }
                  disabled={clientData.AIRSHCVHistoryDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHCVHistoryDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.tickler_updates_folder_url
                      ? data[0]?.tickler_updates_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHCVHistory"
                  className={`${MSAStyles.inputDate} {${
                    clientData.AIRSHCVHistory &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.AIRSHCVHistoryUploadDate &&
                    clientData.AIRSHCVHistoryUploadDate.split("T")[0]
                  }
                  disabled={clientData.AIRSHCVHistoryUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHCVHistoryUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHCVHistoryReviewed ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.AIRSHCVHistoryReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHCVHistoryReviewed:
                          !formState.AIRSHCVHistoryReviewed,
                        AIRSHCVHistoryUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHCVHistoryReviewed:
                          !formState.AIRSHCVHistoryReviewed,
                        AIRSHCVHistoryUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSHCVHistoryIssues ||
                    !clientData.AIRSHCVHistoryReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSHCVHistoryUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSHCVHistoryReviewed ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHCVHistory && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHCVHistoryUploadDate === "" ||
                    clientData.AIRSHCVHistoryUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHCVHistoryReviewed:
                            !clientData.AIRSHCVHistoryReviewed,
                          AIRSHCVHistoryUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHCVHistoryReviewed:
                            !clientData.AIRSHCVHistoryReviewed,
                        });
                  }}
                  checked={
                    clientData.AIRSHCVHistoryReviewed ? "checked" : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHCVHistoryIssues ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.AIRSHCVHistoryIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHCVHistoryIssues: !formState.AIRSHCVHistoryIssues,
                        AIRSHCVHistoryUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHCVHistoryIssues: !formState.AIRSHCVHistoryIssues,
                        AIRSHCVHistoryUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSHCVHistoryReviewed ||
                    !clientData.AIRSHCVHistoryIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSHCVHistoryUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSHCVHistoryIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHCVHistory && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHCVHistoryUploadDate === "" ||
                    clientData.AIRSHCVHistoryUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHCVHistoryIssues:
                            !clientData.AIRSHCVHistoryIssues,
                          AIRSHCVHistoryUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHCVHistoryIssues:
                            !clientData.AIRSHCVHistoryIssues,
                        });
                  }}
                  checked={clientData.AIRSHCVHistoryIssues ? "checked" : false}
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.AIRSHousingInformation ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHousingInformation ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.AIRSHousingInformation
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHousingInformation:
                          !formState.AIRSHousingInformation,
                        AIRSHousingInformationDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHousingInformation:
                          !formState.AIRSHousingInformation,
                        AIRSHousingInformationDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSHousingInformation ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHousingInformation && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHousingInformationDate === "" ||
                    clientData.AIRSHousingInformationDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHousingInformation:
                            !clientData.AIRSHousingInformation,
                          AIRSHousingInformationDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHousingInformation:
                            !clientData.AIRSHousingInformation,
                        });
                  }}
                  checked={
                    clientData.AIRSHousingInformation ? "checked" : false
                  }
                />
              </div>
              <div>
                <p>AIRS Housing Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHousingInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSHousingInformationDate &&
                    clientData.AIRSHousingInformationDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSHousingInformationDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHousingInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.tickler_updates_folder_url
                      ? data[0]?.tickler_updates_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/*  <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSHousingInformation"
                  className={`${MSAStyles.inputDate} {${
                    clientData.AIRSHousingInformation &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.AIRSHousingInformationUploadDate &&
                    clientData.AIRSHousingInformationUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSHousingInformationUploadDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSHousingInformationUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHousingInformationReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSHousingInformationReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHousingInformationReviewed:
                          !formState.AIRSHousingInformationReviewed,
                        AIRSHousingInformationUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHousingInformationReviewed:
                          !formState.AIRSHousingInformationReviewed,
                        AIRSHousingInformationUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSHousingInformationIssues ||
                    !clientData.AIRSHousingInformationReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSHousingInformationUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSHousingInformationReviewed ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHousingInformation && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHousingInformationUploadDate === "" ||
                    clientData.AIRSHousingInformationUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHousingInformationReviewed:
                            !clientData.AIRSHousingInformationReviewed,
                          AIRSHousingInformationUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHousingInformationReviewed:
                            !clientData.AIRSHousingInformationReviewed,
                        });
                  }}
                  checked={
                    clientData.AIRSHousingInformationReviewed
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSHousingInformationIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSHousingInformationIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSHousingInformationIssues:
                          !formState.AIRSHousingInformationIssues,
                        AIRSHousingInformationUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSHousingInformationIssues:
                          !formState.AIRSHousingInformationIssues,
                        AIRSHousingInformationUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSHousingInformationReviewed ||
                    !clientData.AIRSHousingInformationIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSHousingInformationUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSHousingInformationIssues ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSHousingInformation && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSHousingInformationUploadDate === "" ||
                    clientData.AIRSHousingInformationUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSHousingInformationIssues:
                            !clientData.AIRSHousingInformationIssues,
                          AIRSHousingInformationUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSHousingInformationIssues:
                            !clientData.AIRSHousingInformationIssues,
                        });
                  }}
                  checked={
                    clientData.AIRSHousingInformationIssues ? "checked" : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.AIRSInsuranceInformation ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSInsuranceInformation
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSInsuranceInformation
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSInsuranceInformation:
                          !formState.AIRSInsuranceInformation,
                        AIRSInsuranceInformationDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSInsuranceInformation:
                          !formState.AIRSInsuranceInformation,
                        AIRSInsuranceInformationDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSInsuranceInformation ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSInsuranceInformation && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSInsuranceInformationDate === "" ||
                    clientData.AIRSInsuranceInformationDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSInsuranceInformation:
                            !clientData.AIRSInsuranceInformation,
                          AIRSInsuranceInformationDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSInsuranceInformation:
                            !clientData.AIRSInsuranceInformation,
                        });
                  }}
                  checked={
                    clientData.AIRSInsuranceInformation ? "checked" : false
                  }
                />
              </div>
              <div>
                <p>AIRS Insurance Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSInsuranceInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSInsuranceInformationDate &&
                    clientData.AIRSInsuranceInformationDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSInsuranceInformationDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSInsuranceInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.tickler_updates_folder_url
                      ? data[0]?.tickler_updates_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSInsuranceInformation"
                  className={`${MSAStyles.inputDate} {${
                    clientData.AIRSInsuranceInformation &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.AIRSInsuranceInformationUploadDate &&
                    clientData.AIRSInsuranceInformationUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSInsuranceInformationUploadDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSInsuranceInformationUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSInsuranceInformationReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSInsuranceInformationReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSInsuranceInformationReviewed:
                          !formState.AIRSInsuranceInformationReviewed,
                        AIRSInsuranceInformationUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSInsuranceInformationReviewed:
                          !formState.AIRSInsuranceInformationReviewed,
                        AIRSInsuranceInformationUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSInsuranceInformationIssues ||
                    !clientData.AIRSInsuranceInformationReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSInsuranceInformationUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSInsuranceInformationReviewed ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSInsuranceInformation && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSInsuranceInformationUploadDate === "" ||
                    clientData.AIRSInsuranceInformationUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSInsuranceInformationReviewed:
                            !clientData.AIRSInsuranceInformationReviewed,
                          AIRSInsuranceInformationUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSInsuranceInformationReviewed:
                            !clientData.AIRSInsuranceInformationReviewed,
                        });
                  }}
                  checked={
                    clientData.AIRSInsuranceInformationReviewed
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSInsuranceInformationIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSInsuranceInformationIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSInsuranceInformationIssues:
                          !formState.AIRSInsuranceInformationIssues,
                        AIRSInsuranceInformationUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSInsuranceInformationIssues:
                          !formState.AIRSInsuranceInformationIssues,
                        AIRSInsuranceInformationUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.AIRSInsuranceInformationIssues ||
                    clientData.AIRSInsuranceInformationReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSInsuranceInformationUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSInsuranceInformationIssues ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSInsuranceInformation && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSInsuranceInformationUploadDate === "" ||
                    clientData.AIRSInsuranceInformationUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSInsuranceInformationIssues:
                            !clientData.AIRSInsuranceInformationIssues,
                          AIRSInsuranceInformationUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSInsuranceInformationIssues:
                            !clientData.AIRSInsuranceInformationIssues,
                        });
                  }}
                  checked={
                    clientData.AIRSInsuranceInformationIssues
                      ? "checked"
                      : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
                clientData.AIRSSubstanceUseHistory ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSSubstanceUseHistory
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSSubstanceUseHistory
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSSubstanceUseHistory:
                          !formState.AIRSSubstanceUseHistory,
                        AIRSSubstanceUseHistoryDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSSubstanceUseHistory:
                          !formState.AIRSSubstanceUseHistory,
                        AIRSSubstanceUseHistoryDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.AIRSSubstanceUseHistory ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSSubstanceUseHistory && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSSubstanceUseHistoryDate === "" ||
                    clientData.AIRSSubstanceUseHistoryDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSSubstanceUseHistory:
                            !clientData.AIRSSubstanceUseHistory,
                          AIRSSubstanceUseHistoryDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSSubstanceUseHistory:
                            !clientData.AIRSSubstanceUseHistory,
                        });
                  }}
                  checked={
                    clientData.AIRSSubstanceUseHistory ? "checked" : false
                  }
                />
              </div>
              <div>
                <p>AIRS Substance Use History </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSSubstanceUseHistory"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.AIRSSubstanceUseHistoryDate &&
                    clientData.AIRSSubstanceUseHistoryDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSSubstanceUseHistoryDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSSubstanceUseHistoryDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.tickler_updates_folder_url
                      ? data[0]?.tickler_updates_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="AIRSSubstanceUseHistory"
                  className={`${MSAStyles.inputDate} {${
                    clientData.AIRSSubstanceUseHistory &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.AIRSSubstanceUseHistoryUploadDate &&
                    clientData.AIRSSubstanceUseHistoryUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.AIRSSubstanceUseHistoryUploadDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      AIRSSubstanceUseHistoryUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSSubstanceUseHistoryReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSSubstanceUseHistoryReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSSubstanceUseHistoryReviewed:
                          !formState.AIRSSubstanceUseHistoryReviewed,
                        AIRSSubstanceUseHistoryUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSSubstanceUseHistoryReviewed:
                          !formState.AIRSSubstanceUseHistoryReviewed,
                        AIRSSubstanceUseHistoryUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.AIRSSubstanceUseHistoryReviewed ||
                    clientData.AIRSSubstanceUseHistoryIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSSubstanceUseHistoryUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSSubstanceUseHistoryReviewed ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSSubstanceUseHistory && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSSubstanceUseHistoryUploadDate === "" ||
                    clientData.AIRSSubstanceUseHistoryUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSSubstanceUseHistoryReviewed:
                            !clientData.AIRSSubstanceUseHistoryReviewed,
                          AIRSSubstanceUseHistoryUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSSubstanceUseHistoryReviewed:
                            !clientData.AIRSSubstanceUseHistoryReviewed,
                        });
                  }}
                  checked={
                    clientData.AIRSSubstanceUseHistoryReviewed
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.AIRSSubstanceUseHistoryIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.AIRSSubstanceUseHistoryIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        AIRSSubstanceUseHistoryIssues:
                          !formState.AIRSSubstanceUseHistoryIssues,
                        AIRSSubstanceUseHistoryUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        AIRSSubstanceUseHistoryIssues:
                          !formState.AIRSSubstanceUseHistoryIssues,
                        AIRSSubstanceUseHistoryUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.AIRSSubstanceUseHistoryReviewed ||
                    !clientData.AIRSSubstanceUseHistoryIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      AIRSSubstanceUseHistoryUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.AIRSSubstanceUseHistoryIssues ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.AIRSSubstanceUseHistory && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.AIRSSubstanceUseHistoryUploadDate === "" ||
                    clientData.AIRSSubstanceUseHistoryUploadDate === null
                      ? setClientData({
                          ...clientData,
                          AIRSSubstanceUseHistoryIssues:
                            !clientData.AIRSSubstanceUseHistoryIssues,
                          AIRSSubstanceUseHistoryUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          AIRSSubstanceUseHistoryIssues:
                            !clientData.AIRSSubstanceUseHistoryIssues,
                        });
                  }}
                  checked={
                    clientData.AIRSSubstanceUseHistoryIssues ? "checked" : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${
                clientData.LNEClientRights ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LNEClientRights ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.LNEClientRights
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEClientRights: !formState.LNEClientRights,
                        LNEClientRightsDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEClientRights: !formState.LNEClientRights,
                        LNEClientRightsDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.LNEClientRights ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEClientRights && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientRightsDate === "" ||
                    clientData.LNEClientRightsDate === null
                      ? setClientData({
                          ...clientData,
                          LNEClientRights: !clientData.LNEClientRights,
                          LNEClientRightsDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEClientRights: !clientData.LNEClientRights,
                        });
                  }}
                  checked={clientData.LNEClientRights ? "checked" : false}
                />
              </div>
              <div>
                <p>LNE Client Rights </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientRights"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEClientRightsDate &&
                    clientData.LNEClientRightsDate.split("T")[0]
                  }
                  disabled={clientData.LNEClientRightsDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientRightsDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.consent_folder_url
                      ? data[0]?.consent_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientRights"
                  className={`${MSAStyles.inputDate} {${
                    clientData.LNEClientRights &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.LNEClientRightsUploadDate &&
                    clientData.LNEClientRightsUploadDate.split("T")[0]
                  }
                  disabled={clientData.LNEClientRightsUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientRightsUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className="ml-1 text-center flex justify-center items-center "
                onClick={() => {
                  clientData.LNEClientRightsReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEClientRightsReviewed:
                          !formState.LNEClientRightsReviewed,
                        LNEClientRightsUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEClientRightsReviewed:
                          !formState.LNEClientRightsReviewed,
                        LNEClientRightsUploadDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.LNEClientRightsReviewed ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEClientRights && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    console.log(clientData.LNEClientRightsReviewed);
                    clientData.LNEClientRightsUploadDate === "" ||
                    clientData.LNEClientRightsUploadDate === null
                      ? setClientData({
                          ...clientData,
                          LNEClientRightsReviewed:
                            !clientData.LNEClientRightsReviewed,
                          LNEClientRightsUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEClientRightsReviewed:
                            !clientData.LNEClientRightsReviewed,
                        });
                  }}
                  checked={
                    clientData.LNEClientRightsReviewed ? "checked" : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LNEClientRightsIssues ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.LNEClientRightsIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEClientRightsIssues: !formState.LNEClientRightsIssues,
                        LNEClientRightsUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEClientRightsIssues: !formState.LNEClientRightsIssues,
                        LNEClientRightsUploadDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.LNEClientRightsIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEClientRights && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientRightsUploadDate === "" ||
                    clientData.LNEClientRightsUploadDate === null
                      ? setClientData({
                          ...clientData,
                          LNEClientRightsIssues:
                            !clientData.LNEClientRightsIssues,
                          LNEClientRightsUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEClientRightsIssues:
                            !clientData.LNEClientRightsIssues,
                        });
                  }}
                  checked={clientData.LNEClientRightsIssues ? "checked" : false}
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${
                clientData.LNEClientGrievancePolicyProcedure
                  ? ""
                  : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LNEClientGrievancePolicyProcedure
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.LNEClientGrievancePolicyProcedure
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEClientGrievancePolicyProcedure:
                          !formState.LNEClientGrievancePolicyProcedure,
                        LNEClientGrievancePolicyProcedureDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEClientGrievancePolicyProcedure:
                          !formState.LNEClientGrievancePolicyProcedure,
                        LNEClientGrievancePolicyProcedureDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.LNEClientGrievancePolicyProcedure ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEClientGrievancePolicyProcedure &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientGrievancePolicyProcedureDate === "" ||
                    clientData.LNEClientGrievancePolicyProcedureDate === null
                      ? setClientData({
                          ...clientData,
                          LNEClientGrievancePolicyProcedure:
                            !clientData.LNEClientGrievancePolicyProcedure,
                          LNEClientGrievancePolicyProcedureDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEClientGrievancePolicyProcedure:
                            !clientData.LNEClientGrievancePolicyProcedure,
                        });
                  }}
                  checked={
                    clientData.LNEClientGrievancePolicyProcedure
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div>
                <p>LNE Client Grievance Policy & Procedure </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEClientGrievancePolicyProcedureDate &&
                    clientData.LNEClientGrievancePolicyProcedureDate.split(
                      "T"
                    )[0]
                  }
                  disabled={
                    clientData.LNEClientGrievancePolicyProcedureDate
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientGrievancePolicyProcedureDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.consent_folder_url
                      ? data[0]?.consent_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientGrievancePolicyProcedure"
                  className={`${MSAStyles.inputDate} {${
                    clientData.LNEClientGrievancePolicyProcedure &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.LNEClientGrievancePolicyProcedureUploadDate &&
                    clientData.LNEClientGrievancePolicyProcedureUploadDate.split(
                      "T"
                    )[0]
                  }
                  disabled={
                    clientData.LNEClientGrievancePolicyProcedureUploadDate
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientGrievancePolicyProcedureUploadDate:
                        e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className="ml-1 text-center flex justify-center items-center "
                onClick={() => {
                  clientData.LNEClientGrievancePolicyProcedureReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEClientGrievancePolicyProcedureReviewed:
                          !formState.LNEClientGrievancePolicyProcedureReviewed,
                        LNEClientGrievancePolicyProcedureUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEClientGrievancePolicyProcedureReviewed:
                          !formState.LNEClientGrievancePolicyProcedureReviewed,
                        LNEClientGrievancePolicyProcedureUploadDate:
                          crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.LNEClientGrievancePolicyProcedureReviewed
                      ? "3"
                      : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEClientGrievancePolicyProcedure &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientGrievancePolicyProcedureDate === "" ||
                    clientData.LNEClientGrievancePolicyProcedureDate === null
                      ? setClientData({
                          ...clientData,
                          LNEClientGrievancePolicyProcedure:
                            !clientData.LNEClientGrievancePolicyProcedure,
                          LNEClientGrievancePolicyProcedureDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEClientGrievancePolicyProcedure:
                            !clientData.LNEClientGrievancePolicyProcedure,
                        });
                  }}
                  checked={
                    clientData.LNEClientGrievancePolicyProcedure
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LNEClientGrievancePolicyProcedureIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.LNEClientGrievancePolicyProcedureIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEClientGrievancePolicyProcedureIssues:
                          !formState.LNEClientGrievancePolicyProcedureIssues,
                        LNEClientGrievancePolicyProcedureUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEClientGrievancePolicyProcedureIssues:
                          !formState.LNEClientGrievancePolicyProcedureIssues,
                        LNEClientGrievancePolicyProcedureUploadDate:
                          crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.LNEClientGrievancePolicyProcedureIssues
                      ? "3"
                      : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEClientGrievancePolicyProcedure &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientGrievancePolicyProcedureUploadDate ===
                      "" ||
                    clientData.LNEClientGrievancePolicyProcedureUploadDate ===
                      null
                      ? setClientData({
                          ...clientData,
                          LNEClientGrievancePolicyProcedureIssues:
                            !clientData.LNEClientGrievancePolicyProcedureIssues,
                          LNEClientGrievancePolicyProcedureUploadDate:
                            crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEClientGrievancePolicyProcedureIssues:
                            !clientData.LNEClientGrievancePolicyProcedureIssues,
                        });
                  }}
                  checked={
                    clientData.LNEClientGrievancePolicyProcedureIssues
                      ? "checked"
                      : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${
                clientData.LNEProgramRules ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LNEProgramRules ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.LNEProgramRules
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEProgramRules: !formState.LNEProgramRules,
                        LNEProgramRulesDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEProgramRules: !formState.LNEProgramRules,
                        LNEProgramRulesDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.LNEProgramRules ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEProgramRules && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEProgramRulesDate === "" ||
                    clientData.LNEProgramRulesDate === null
                      ? setClientData({
                          ...clientData,
                          LNEProgramRules: !clientData.LNEProgramRules,
                          LNEProgramRulesDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEProgramRules: !clientData.LNEProgramRules,
                        });
                  }}
                  checked={clientData.LNEProgramRules ? "checked" : false}
                />
              </div>
              <div>
                <p>LNE Program Rules </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEProgramRules"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEProgramRulesDate &&
                    clientData.LNEProgramRulesDate.split("T")[0]
                  }
                  disabled={clientData.LNEProgramRulesDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEProgramRulesDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.consent_folder_url
                      ? data[0]?.miscellaneous_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/*  <p className="text-dark-blue underline">Miscellaneous</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEProgramRules"
                  className={`${MSAStyles.inputDate} {${
                    clientData.LNEProgramRules &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.LNEProgramRulesUploadDate &&
                    clientData.LNEProgramRulesUploadDate.split("T")[0]
                  }
                  disabled={clientData.LNEProgramRulesUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEProgramRulesUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className="ml-1 text-center flex justify-center items-center "
                onClick={() => {
                  clientData.LNEProgramRulesReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEProgramRulesReviewed:
                          !formState.LNEProgramRulesReviewed,
                        LNEProgramRulesUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEProgramRulesReviewed:
                          !formState.LNEProgramRulesReviewed,
                        LNEProgramRulesUploadDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.LNEProgramRulesReviewed ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEProgramRules && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEProgramRulesDate === "" ||
                    clientData.LNEProgramRulesDate === null
                      ? setClientData({
                          ...clientData,
                          LNEProgramRules: !clientData.LNEProgramRules,
                          LNEProgramRulesDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEProgramRules: !clientData.LNEProgramRules,
                        });
                  }}
                  checked={clientData.LNEProgramRules ? "checked" : false}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LNEProgramRulesIssues ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.LNEProgramRulesIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEProgramRulesIssues: !formState.LNEProgramRulesIssues,
                        LNEProgramRulesUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEProgramRulesIssues: !formState.LNEProgramRulesIssues,
                        LNEProgramRulesUploadDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.LNEProgramRulesIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEProgramRules && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEProgramRulesUploadDate === "" ||
                    clientData.LNEProgramRulesUploadDate === null
                      ? setClientData({
                          ...clientData,
                          LNEProgramRulesIssues:
                            !clientData.LNEProgramRulesIssues,
                          LNEProgramRulesUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEProgramRulesIssues:
                            !clientData.LNEProgramRulesIssues,
                        });
                  }}
                  checked={clientData.LNEProgramRulesIssues ? "checked" : false}
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${
                clientData.LNEEmergencyContactConsent
                  ? ""
                  : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LNEEmergencyContactConsent
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.LNEEmergencyContactConsent
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEEmergencyContactConsent:
                          !formState.LNEEmergencyContactConsent,
                        LNEEmergencyContactConsentDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEEmergencyContactConsent:
                          !formState.LNEEmergencyContactConsent,
                        LNEEmergencyContactConsentDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.LNEEmergencyContactConsent ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEEmergencyContactConsent && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEEmergencyContactConsentDate === "" ||
                    clientData.LNEEmergencyContactConsentDate === null
                      ? setClientData({
                          ...clientData,
                          LNEEmergencyContactConsent:
                            !clientData.LNEEmergencyContactConsent,
                          LNEEmergencyContactConsentDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEEmergencyContactConsent:
                            !clientData.LNEEmergencyContactConsent,
                        });
                  }}
                  checked={
                    clientData.LNEEmergencyContactConsent ? "checked" : false
                  }
                />
              </div>

              <div>
                <p>LNE Emergency Contact Consent </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEEmergencyContactConsent"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEEmergencyContactConsentDate &&
                    clientData.LNEEmergencyContactConsentDate.split("T")[0]
                  }
                  disabled={
                    clientData.LNEEmergencyContactConsentDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEEmergencyContactConsentDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.consent_folder_url
                      ? data[0]?.consent_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/*  <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEEmergencyContactConsent"
                  className={`${MSAStyles.inputDate} {${
                    clientData.LNEEmergencyContactConsent &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.LNEEmergencyContactConsentUploadDate &&
                    clientData.LNEEmergencyContactConsentUploadDate.split(
                      "T"
                    )[0]
                  }
                  disabled={
                    clientData.LNEEmergencyContactConsentUploadDate
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEEmergencyContactConsentUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className="ml-1 text-center flex justify-center items-center "
                onClick={() => {
                  clientData.LNEEmergencyContactConsentReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEEmergencyContactConsentReviewed:
                          !formState.LNEEmergencyContactConsentReviewed,
                        LNEEmergencyContactConsentUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEEmergencyContactConsentReviewed:
                          !formState.LNEEmergencyContactConsentReviewed,
                        LNEEmergencyContactConsentUploadDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.LNEEmergencyContactConsentReviewed ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEEmergencyContactConsent && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEEmergencyContactConsentDate === "" ||
                    clientData.LNEEmergencyContactConsentDate === null
                      ? setClientData({
                          ...clientData,
                          LNEEmergencyContactConsent:
                            !clientData.LNEEmergencyContactConsent,
                          LNEEmergencyContactConsentDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEEmergencyContactConsent:
                            !clientData.LNEEmergencyContactConsent,
                        });
                  }}
                  checked={
                    clientData.LNEEmergencyContactConsent ? "checked" : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LNEEmergencyContactConsentIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.LNEEmergencyContactConsentIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEEmergencyContactConsentIssues:
                          !formState.LNEEmergencyContactConsentIssues,
                        LNEEmergencyContactConsentUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEEmergencyContactConsentIssues:
                          !formState.LNEEmergencyContactConsentIssues,
                        LNEEmergencyContactConsentUploadDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.LNEEmergencyContactConsentIssues ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEEmergencyContactConsent && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEEmergencyContactConsentUploadDate === "" ||
                    clientData.LNEEmergencyContactConsentUploadDate === null
                      ? setClientData({
                          ...clientData,
                          LNEEmergencyContactConsentIssues:
                            !clientData.LNEEmergencyContactConsentIssues,
                          LNEEmergencyContactConsentUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEEmergencyContactConsentIssues:
                            !clientData.LNEEmergencyContactConsentIssues,
                        });
                  }}
                  checked={
                    clientData.LNEEmergencyContactConsentIssues
                      ? "checked"
                      : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2  ${
                clientData.LNEConsentForReleaseOfConfidentialInformation
                  ? ""
                  : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LNEConsentForReleaseOfConfidentialInformation
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.LNEConsentForReleaseOfConfidentialInformation
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEConsentForReleaseOfConfidentialInformation:
                          !formState.LNEConsentForReleaseOfConfidentialInformation,
                        LNEConsentForReleaseOfConfidentialInformationDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEConsentForReleaseOfConfidentialInformation:
                          !formState.LNEConsentForReleaseOfConfidentialInformation,
                        LNEConsentForReleaseOfConfidentialInformationDate:
                          crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.LNEConsentForReleaseOfConfidentialInformation
                      ? "3"
                      : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEConsentForReleaseOfConfidentialInformation &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate ===
                      "" ||
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate ===
                      null
                      ? setClientData({
                          ...clientData,
                          LNEConsentForReleaseOfConfidentialInformation:
                            !clientData.LNEConsentForReleaseOfConfidentialInformation,
                          LNEConsentForReleaseOfConfidentialInformationDate:
                            crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEConsentForReleaseOfConfidentialInformation:
                            !clientData.LNEConsentForReleaseOfConfidentialInformation,
                        });
                  }}
                  checked={
                    clientData.LNEConsentForReleaseOfConfidentialInformation
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div>
                <p>LNE Consent for Release of Confidential Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEConsentForReleaseOfConfidentialInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate &&
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate.split(
                      "T"
                    )[0]
                  }
                  disabled={
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEConsentForReleaseOfConfidentialInformationDate:
                        e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.consents_folder_url
                      ? data[0]?.consent_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEConsentForReleaseOfConfidentialInformation"
                  className={`${MSAStyles.inputDate} {${
                    clientData.LNEConsentForReleaseOfConfidentialInformation &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.LNEConsentForReleaseOfConfidentialInformationUploadDate &&
                    clientData.LNEConsentForReleaseOfConfidentialInformationUploadDate.split(
                      "T"
                    )[0]
                  }
                  disabled={
                    clientData.LNEConsentForReleaseOfConfidentialInformationUploadDate
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEConsentForReleaseOfConfidentialInformationUploadDate:
                        e.target.value,
                    });
                  }}
                />
              </div>
              {/* REVIEW HERE */}
              <div
                className="ml-1 text-center flex justify-center items-center "
                onClick={() => {
                  clientData.LNEConsentForReleaseOfConfidentialInformationReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEConsentForReleaseOfConfidentialInformationReviewed:
                          !formState.LNEConsentForReleaseOfConfidentialInformationReviewed,
                        LNEConsentForReleaseOfConfidentialInformationUploadDate:
                          "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEConsentForReleaseOfConfidentialInformationReviewed:
                          !formState.LNEConsentForReleaseOfConfidentialInformationReviewed,
                        LNEConsentForReleaseOfConfidentialInformationUploadDate:
                          crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.LNEConsentForReleaseOfConfidentialInformationReviewed
                      ? "3"
                      : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEConsentForReleaseOfConfidentialInformation &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate ===
                      "" ||
                    clientData.LNEConsentForReleaseOfConfidentialInformationDate ===
                      null
                      ? setClientData({
                          ...clientData,
                          LNEConsentForReleaseOfConfidentialInformation:
                            !clientData.LNEConsentForReleaseOfConfidentialInformation,
                          LNEConsentForReleaseOfConfidentialInformationDate:
                            crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEConsentForReleaseOfConfidentialInformation:
                            !clientData.LNEConsentForReleaseOfConfidentialInformation,
                        });
                  }}
                  checked={
                    clientData.LNEConsentForReleaseOfConfidentialInformation
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div
                className="ml-1 text-center flex justify-center items-center "
                onClick={() => {
                  clientData.LNEConsentForReleaseOfConfidentialInformationIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEConsentForReleaseOfConfidentialInformationIssues:
                          !formState.LNEConsentForReleaseOfConfidentialInformationIssues,
                        LNEConsentForReleaseOfConfidentialInformationUploadDate:
                          "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEConsentForReleaseOfConfidentialInformationIssues:
                          !formState.LNEConsentForReleaseOfConfidentialInformationIssues,
                        LNEConsentForReleaseOfConfidentialInformationUploadDate:
                          crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.LNEConsentForReleaseOfConfidentialInformationIssues
                      ? "3"
                      : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEConsentForReleaseOfConfidentialInformation &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEConsentForReleaseOfConfidentialInformationUploadDate ===
                      "" ||
                    clientData.LNEConsentForReleaseOfConfidentialInformationUploadDate ===
                      null
                      ? setClientData({
                          ...clientData,
                          LNEConsentForReleaseOfConfidentialInformationIssues:
                            !clientData.LNEConsentForReleaseOfConfidentialInformationIssues,
                          LNEConsentForReleaseOfConfidentialInformationUploadDate:
                            crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEConsentForReleaseOfConfidentialInformationIssues:
                            !clientData.LNEConsentForReleaseOfConfidentialInformationIssues,
                        });
                  }}
                  checked={
                    clientData.LNEConsentForReleaseOfConfidentialInformationIssues
                      ? "checked"
                      : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${
                clientData.HIPPAConsentForm ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.HIPPAConsentForm ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.HIPPAConsentForm
                    ? setClientData((formState) => ({
                        ...formState,
                        HIPPAConsentForm: !formState.HIPPAConsentForm,
                        HIPPAConsentFormDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        HIPPAConsentForm: !formState.HIPPAConsentForm,
                        HIPPAConsentFormDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.HIPPAConsentForm ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.HIPPAConsentForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HIPPAConsentFormDate === "" ||
                    clientData.HIPPAConsentFormDate === null
                      ? setClientData({
                          ...clientData,
                          HIPPAConsentForm: !clientData.HIPPAConsentForm,
                          HIPPAConsentFormDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          HIPPAConsentForm: !clientData.HIPPAConsentForm,
                        });
                  }}
                  checked={clientData.HIPPAConsentForm ? "checked" : false}
                />
              </div>
              <div>
                <p>HIPAA Consent Form (OCA Form 960)</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HIPPAConsentForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.HIPPAConsentFormDate &&
                    clientData.HIPPAConsentFormDate.split("T")[0]
                  }
                  disabled={clientData.HIPPAConsentFormDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      HIPPAConsentFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.consents_folder_url
                      ? data[0]?.consent_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HIPPAConsentForm"
                  className={`${MSAStyles.inputDate} {${
                    clientData.HIPPAConsentForm &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.HIPPAConsentFormUploadDate &&
                    clientData.HIPPAConsentFormUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.HIPPAConsentFormUploadDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      HIPPAConsentFormUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.HIPPAConsentFormReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.HIPPAConsentFormReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        HIPPAConsentFormReviewed:
                          !formState.HIPPAConsentFormReviewed,
                        HIPPAConsentFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        HIPPAConsentFormReviewed:
                          !formState.HIPPAConsentFormReviewed,
                        HIPPAConsentFormUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.HIPPAConsentFormIssues ||
                    !clientData.HIPPAConsentFormReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      HIPPAConsentFormUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.HIPPAConsentFormReviewed ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.HIPPAConsentForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HIPPAConsentFormUploadDate === "" ||
                    clientData.HIPPAConsentFormUploadDate === null
                      ? setClientData({
                          ...clientData,
                          HIPPAConsentFormReviewed:
                            !clientData.HIPPAConsentFormReviewed,
                          HIPPAConsentFormUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          HIPPAConsentFormReviewed:
                            !clientData.HIPPAConsentFormReviewed,
                        });
                  }}
                  checked={
                    clientData.HIPPAConsentFormReviewed ? "checked" : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.HIPPAConsentFormIssues ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.HIPPAConsentFormIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        HIPPAConsentFormIssues:
                          !formState.HIPPAConsentFormIssues,
                        HIPPAConsentFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        HIPPAConsentFormIssues:
                          !formState.HIPPAConsentFormIssues,
                        HIPPAConsentFormUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.HIPPAConsentFormReviewed ||
                    !clientData.HIPPAConsentFormIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      HIPPAConsentFormUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.HIPPAConsentFormIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.HIPPAConsentForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HIPPAConsentFormUploadDate === "" ||
                    clientData.HIPPAConsentFormUploadDate === null
                      ? setClientData({
                          ...clientData,
                          HIPPAConsentFormIssues:
                            !clientData.HIPPAConsentFormIssues,
                          HIPPAConsentFormUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          HIPPAConsentFormIssues:
                            !clientData.HIPPAConsentFormIssues,
                        });
                  }}
                  checked={
                    clientData.HIPPAConsentFormIssues ? "checked" : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-green grid gap-5 py-2 rounded-lg my-2 ${
                clientData.NYCDOHMHNoticeOfPrivacyPractices
                  ? ""
                  : "pointer-events-none"
              } `}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.NYCDOHMHNoticeOfPrivacyPractices
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.NYCDOHMHNoticeOfPrivacyPractices
                    ? setClientData((formState) => ({
                        ...formState,
                        NYCDOHMHNoticeOfPrivacyPractices:
                          !formState.NYCDOHMHNoticeOfPrivacyPractices,
                        NYCDOHMHNoticeOfPrivacyPracticesDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        NYCDOHMHNoticeOfPrivacyPractices:
                          !formState.NYCDOHMHNoticeOfPrivacyPractices,
                        NYCDOHMHNoticeOfPrivacyPracticesDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.NYCDOHMHNoticeOfPrivacyPractices ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.NYCDOHMHNoticeOfPrivacyPractices &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate === "" ||
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate === null
                      ? setClientData({
                          ...clientData,
                          NYCDOHMHNoticeOfPrivacyPractices:
                            !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                          NYCDOHMHNoticeOfPrivacyPracticesDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          NYCDOHMHNoticeOfPrivacyPractices:
                            !clientData.NYCDOHMHNoticeOfPrivacyPractices,
                        });
                  }}
                  checked={
                    clientData.NYCDOHMHNoticeOfPrivacyPractices
                      ? "checked"
                      : false
                  }
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
                  className={MSAStyles.inputDate}
                  value={
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate &&
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate.split(
                      "T"
                    )[0]
                  }
                  disabled={
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesDate
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      NYCDOHMHNoticeOfPrivacyPracticesDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.consents_folder_url
                      ? data[0]?.consent_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Consents</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="NYCDOHMHNoticeOfPrivacyPractices"
                  className={`${MSAStyles.inputDate} {${
                    clientData.NYCDOHMHNoticeOfPrivacyPractices &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate &&
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate.split(
                      "T"
                    )[0]
                  }
                  disabled={
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      NYCDOHMHNoticeOfPrivacyPracticesUploadDate:
                        e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.NYCDOHMHNoticeOfPrivacyPracticesReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.NYCDOHMHNoticeOfPrivacyPracticesReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        NYCDOHMHNoticeOfPrivacyPracticesReviewed:
                          !formState.NYCDOHMHNoticeOfPrivacyPracticesReviewed,
                        NYCDOHMHNoticeOfPrivacyPracticesUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        NYCDOHMHNoticeOfPrivacyPracticesReviewed:
                          !formState.NYCDOHMHNoticeOfPrivacyPracticesReviewed,
                        NYCDOHMHNoticeOfPrivacyPracticesUploadDate:
                          crearFecha(),
                      }));
                  if (
                    !clientData.NYCDOHMHNoticeOfPrivacyPracticesReviewed ||
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      NYCDOHMHNoticeOfPrivacyPracticesUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesReviewed
                      ? "3"
                      : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.NYCDOHMHNoticeOfPrivacyPractices &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate ===
                      "" ||
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate ===
                      null
                      ? setClientData({
                          ...clientData,
                          NYCDOHMHNoticeOfPrivacyPracticesReviewed:
                            !clientData.NYCDOHMHNoticeOfPrivacyPracticesReviewed,
                          NYCDOHMHNoticeOfPrivacyPracticesUploadDate:
                            crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          NYCDOHMHNoticeOfPrivacyPracticesReviewed:
                            !clientData.NYCDOHMHNoticeOfPrivacyPracticesReviewed,
                        });
                  }}
                  checked={
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesReviewed
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.NYCDOHMHNoticeOfPrivacyPracticesIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.NYCDOHMHNoticeOfPrivacyPracticesIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        NYCDOHMHNoticeOfPrivacyPracticesIssues:
                          !formState.NYCDOHMHNoticeOfPrivacyPracticesIssues,
                        NYCDOHMHNoticeOfPrivacyPracticesUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        NYCDOHMHNoticeOfPrivacyPracticesIssues:
                          !formState.NYCDOHMHNoticeOfPrivacyPracticesIssues,
                        NYCDOHMHNoticeOfPrivacyPracticesUploadDate:
                          crearFecha(),
                      }));
                  if (
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesReviewed ||
                    !clientData.NYCDOHMHNoticeOfPrivacyPracticesIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      NYCDOHMHNoticeOfPrivacyPracticesUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesIssues
                      ? "3"
                      : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.NYCDOHMHNoticeOfPrivacyPractices &&
                    "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate ===
                      "" ||
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesUploadDate ===
                      null
                      ? setClientData({
                          ...clientData,
                          NYCDOHMHNoticeOfPrivacyPracticesIssues:
                            !clientData.NYCDOHMHNoticeOfPrivacyPracticesIssues,
                          NYCDOHMHNoticeOfPrivacyPracticesUploadDate:
                            crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          NYCDOHMHNoticeOfPrivacyPracticesIssues:
                            !clientData.NYCDOHMHNoticeOfPrivacyPracticesIssues,
                        });
                  }}
                  checked={
                    clientData.NYCDOHMHNoticeOfPrivacyPracticesIssues
                      ? "checked"
                      : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-pink grid gap-5 py-2 rounded-lg my-2 ${
                clientData.LinkageRetentionAdherenceForms
                  ? ""
                  : "pointer-events-none"
              } `}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LinkageRetentionAdherenceForms
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.LinkageRetentionAdherenceForms
                    ? setClientData((formState) => ({
                        ...formState,
                        LinkageRetentionAdherenceForms:
                          !formState.LinkageRetentionAdherenceForms,
                        LinkageRetentionAdherenceFormsDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LinkageRetentionAdherenceForms:
                          !formState.LinkageRetentionAdherenceForms,
                        LinkageRetentionAdherenceFormsDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.LinkageRetentionAdherenceForms ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LinkageRetentionAdherenceForms && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LinkageRetentionAdherenceFormsDate === "" ||
                    clientData.LinkageRetentionAdherenceFormsDate === null
                      ? setClientData({
                          ...clientData,
                          LinkageRetentionAdherenceForms:
                            !clientData.LinkageRetentionAdherenceForms,
                          LinkageRetentionAdherenceFormsDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LinkageRetentionAdherenceForms:
                            !clientData.LinkageRetentionAdherenceForms,
                        });
                  }}
                  checked={
                    clientData.LinkageRetentionAdherenceForms
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div>
                <p>Linkage, Retention, & Adherence Forms</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LinkageRetentionAdherenceForms"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LinkageRetentionAdherenceFormsDate &&
                    clientData.LinkageRetentionAdherenceFormsDate.split("T")[0]
                  }
                  disabled={
                    clientData.LinkageRetentionAdherenceFormsDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LinkageRetentionAdherenceFormsDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.linkage_navigation_folder_url
                      ? data[0]?.linkage_navigation_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LinkageRetentionAdherenceForms"
                  className={`${MSAStyles.inputDate} {${
                    clientData.LinkageRetentionAdherenceForms &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.LinkageRetentionAdherenceFormsUploadDate &&
                    clientData.LinkageRetentionAdherenceFormsUploadDate.split(
                      "T"
                    )[0]
                  }
                  disabled={
                    clientData.LinkageRetentionAdherenceFormsUploadDate
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LinkageRetentionAdherenceFormsUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LinkageRetentionAdherenceFormsReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.LinkageRetentionAdherenceFormsReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        LinkageRetentionAdherenceFormsReviewed:
                          !formState.LinkageRetentionAdherenceFormsReviewed,
                        LinkageRetentionAdherenceFormsUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LinkageRetentionAdherenceFormsReviewed:
                          !formState.LinkageRetentionAdherenceFormsReviewed,
                        LinkageRetentionAdherenceFormsUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.LinkageRetentionAdherenceFormsIssues ||
                    !clientData.LinkageRetentionAdherenceFormsReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      LinkageRetentionAdherenceFormsUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.LinkageRetentionAdherenceFormsReviewed
                      ? "3"
                      : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LinkageRetentionAdherenceForms && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LinkageRetentionAdherenceFormsUploadDate ===
                      "" ||
                    clientData.LinkageRetentionAdherenceFormsUploadDate === null
                      ? setClientData({
                          ...clientData,
                          LinkageRetentionAdherenceFormsReviewed:
                            !clientData.LinkageRetentionAdherenceFormsReviewed,
                          LinkageRetentionAdherenceFormsUploadDate:
                            crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LinkageRetentionAdherenceFormsReviewed:
                            !clientData.LinkageRetentionAdherenceFormsReviewed,
                        });
                  }}
                  checked={
                    clientData.LinkageRetentionAdherenceFormsReviewed
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LinkageRetentionAdherenceFormsIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.LinkageRetentionAdherenceFormsIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        LinkageRetentionAdherenceFormsIssues:
                          !formState.LinkageRetentionAdherenceFormsIssues,
                        LinkageRetentionAdherenceFormsUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LinkageRetentionAdherenceFormsIssues:
                          !formState.LinkageRetentionAdherenceFormsIssues,
                        LinkageRetentionAdherenceFormsUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.LinkageRetentionAdherenceFormsReviewed ||
                    !clientData.LinkageRetentionAdherenceFormsIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      LinkageRetentionAdherenceFormsUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.LinkageRetentionAdherenceFormsIssues ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LinkageRetentionAdherenceForms && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LinkageRetentionAdherenceFormsUploadDate ===
                      "" ||
                    clientData.LinkageRetentionAdherenceFormsUploadDate === null
                      ? setClientData({
                          ...clientData,
                          LinkageRetentionAdherenceFormsIssues:
                            !clientData.LinkageRetentionAdherenceFormsIssues,
                          LinkageRetentionAdherenceFormsUploadDate:
                            crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LinkageRetentionAdherenceFormsIssues:
                            !clientData.LinkageRetentionAdherenceFormsIssues,
                        });
                  }}
                  checked={
                    clientData.LinkageRetentionAdherenceFormsIssues
                      ? "checked"
                      : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-pink grid gap-5 py-2 rounded-lg my-2 ${
                clientData.InternalReferralInformation
                  ? ""
                  : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.InternalReferralInformation
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.InternalReferralInformation
                    ? setClientData((formState) => ({
                        ...formState,
                        InternalReferralInformation:
                          !formState.InternalReferralInformation,
                        InternalReferralInformationDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        InternalReferralInformation:
                          !formState.InternalReferralInformation,
                        InternalReferralInformationDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.InternalReferralInformation ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.InternalReferralInformation && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.InternalReferralInformationDate === "" ||
                    clientData.InternalReferralInformationDate === null
                      ? setClientData({
                          ...clientData,
                          InternalReferralInformation:
                            !clientData.InternalReferralInformation,
                          InternalReferralInformationDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          InternalReferralInformation:
                            !clientData.InternalReferralInformation,
                        });
                  }}
                  checked={
                    clientData.InternalReferralInformation ? "checked" : false
                  }
                />
              </div>
              <div>
                <p>LNE Referral Information </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="InternalReferralInformation"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.InternalReferralInformationDate &&
                    clientData.InternalReferralInformationDate.split("T")[0]
                  }
                  disabled={
                    clientData.InternalReferralInformationDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      InternalReferralInformationDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.miscellaneous_folder_url
                      ? data[0]?.linkage_navigation_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="InternalReferralInformation"
                  className={`${MSAStyles.inputDate} {${
                    clientData.InternalReferralInformation &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.InternalReferralInformationUploadDate &&
                    clientData.InternalReferralInformationUploadDate.split(
                      "T"
                    )[0]
                  }
                  disabled={
                    clientData.InternalReferralInformationUploadDate
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      InternalReferralInformationUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.InternalReferralInformationReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.InternalReferralInformationReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        InternalReferralInformationReviewed:
                          !formState.InternalReferralInformationReviewed,
                        InternalReferralInformationUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        InternalReferralInformationReviewed:
                          !formState.InternalReferralInformationReviewed,
                        InternalReferralInformationUploadDate: crearFecha(),
                      }));
                  if (
                    clientData.InternalReferralInformationIssues ||
                    !clientData.InternalReferralInformationReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      InternalReferralInformationUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.InternalReferralInformationReviewed ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.InternalReferralInformation && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.InternalReferralInformationUploadDate === "" ||
                    clientData.InternalReferralInformationUploadDate === null
                      ? setClientData({
                          ...clientData,
                          InternalReferralInformationReviewed:
                            !clientData.InternalReferralInformationReviewed,
                          InternalReferralInformationUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          InternalReferralInformationReviewed:
                            !clientData.InternalReferralInformationReviewed,
                        });
                  }}
                  checked={
                    clientData.InternalReferralInformationReviewed
                      ? "checked"
                      : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.InternalReferralInformationIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.InternalReferralInformationIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        InternalReferralInformationIssues:
                          !formState.InternalReferralInformationIssues,
                        InternalReferralInformationUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        InternalReferralInformationIssues:
                          !formState.InternalReferralInformationIssues,
                        InternalReferralInformationUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.InternalReferralInformationIssues ||
                    !clientData.InternalReferralInformationReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      InternalReferralInformationUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.InternalReferralInformationIssues ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.InternalReferralInformation && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.InternalReferralInformationUploadDate === "" ||
                    clientData.InternalReferralInformationUploadDate === null
                      ? setClientData({
                          ...clientData,
                          InternalReferralInformationIssues:
                            !clientData.InternalReferralInformationIssues,
                          InternalReferralInformationUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          InternalReferralInformationIssues:
                            !clientData.InternalReferralInformationIssues,
                        });
                  }}
                  checked={
                    clientData.InternalReferralInformationIssues
                      ? "checked"
                      : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-pink grid gap-5 py-2 rounded-lg my-2 ${
                clientData.LNEClientReferralForm ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LNEClientReferralForm ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.LNEClientReferralForm
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEClientReferralForm: !formState.LNEClientReferralForm,
                        LNEClientReferralFormDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEClientReferralForm: !formState.LNEClientReferralForm,
                        LNEClientReferralFormDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.LNEClientReferralForm ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEClientReferralForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientReferralFormDate === "" ||
                    clientData.LNEClientReferralFormDate === null
                      ? setClientData({
                          ...clientData,
                          LNEClientReferralForm:
                            !clientData.LNEClientReferralForm,
                          LNEClientReferralFormDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEClientReferralForm:
                            !clientData.LNEClientReferralForm,
                        });
                  }}
                  checked={clientData.LNEClientReferralForm ? "checked" : false}
                />
              </div>
              <div>
                <p>Identification</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientReferralForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.LNEClientReferralFormDate &&
                    clientData.LNEClientReferralFormDate.split("T")[0]
                  }
                  disabled={clientData.LNEClientReferralFormDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientReferralFormDate: e.target.value,
                    });
                  }}
                />
              </div>

              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.miscellaneous_folder_url
                      ? data[0]?.miscellaneous_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="LNEClientReferralForm"
                  className={`${MSAStyles.inputDate} {${
                    clientData.LNEClientReferralForm &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.LNEClientReferralFormUploadDate &&
                    clientData.LNEClientReferralFormUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.LNEClientReferralFormUploadDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      LNEClientReferralFormUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LNEClientReferralFormReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.LNEClientReferralFormReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEClientReferralFormReviewed:
                          !formState.LNEClientReferralFormReviewed,
                        LNEClientReferralFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEClientReferralFormReviewed:
                          !formState.LNEClientReferralFormReviewed,
                        LNEClientReferralFormUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.LNEClientReferralFormReviewed ||
                    clientData.LNEClientReferralFormIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      LNEClientReferralFormUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.LNEClientReferralFormReviewed ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEClientReferralForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientReferralFormUploadDate === "" ||
                    clientData.LNEClientReferralFormUploadDate === null
                      ? setClientData({
                          ...clientData,
                          LNEClientReferralFormReviewed:
                            !clientData.LNEClientReferralFormReviewed,
                          LNEClientReferralFormUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEClientReferralFormReviewed:
                            !clientData.LNEClientReferralFormReviewed,
                        });
                  }}
                  checked={
                    clientData.LNEClientReferralFormReviewed ? "checked" : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.LNEClientReferralFormIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.LNEClientReferralFormIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        LNEClientReferralFormIssues:
                          !formState.LNEClientReferralFormIssues,
                        LNEClientReferralFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        LNEClientReferralFormIssues:
                          !formState.LNEClientReferralFormIssues,
                        LNEClientReferralFormUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.LNEClientReferralFormIssues ||
                    clientData.LNEClientReferralFormReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      LNEClientReferralFormUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.LNEClientReferralFormIssues ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.LNEClientReferralForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.LNEClientReferralFormUploadDate === "" ||
                    clientData.LNEClientReferralFormUploadDate === null
                      ? setClientData({
                          ...clientData,
                          LNEClientReferralFormIssues:
                            !clientData.LNEClientReferralFormIssues,
                          LNEClientReferralFormUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          LNEClientReferralFormIssues:
                            !clientData.LNEClientReferralFormIssues,
                        });
                  }}
                  checked={
                    clientData.LNEClientReferralFormIssues ? "checked" : false
                  }
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-purple grid gap-5 py-2 rounded-lg my-2 ${
                clientData.HNSEligibilityForm ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.HNSEligibilityForm ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.HNSEligibilityForm
                    ? setClientData((formState) => ({
                        ...formState,
                        HNSEligibilityForm: !formState.HNSEligibilityForm,
                        HNSEligibilityFormDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        HNSEligibilityForm: !formState.HNSEligibilityForm,
                        HNSEligibilityFormDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.HNSEligibilityForm ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.HNSEligibilityForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HNSEligibilityFormDate === "" ||
                    clientData.HNSEligibilityFormDate === null
                      ? setClientData({
                          ...clientData,
                          HNSEligibilityForm: !clientData.HNSEligibilityForm,
                          HNSEligibilityFormDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          HNSEligibilityForm: !clientData.HNSEligibilityForm,
                        });
                  }}
                  checked={clientData.HNSEligibilityForm ? "checked" : false}
                />
              </div>
              <div>
                <p>LNE HNS Eligibility Form </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HNSEligibilityForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.HNSEligibilityFormDate &&
                    clientData.HNSEligibilityFormDate.split("T")[0]
                  }
                  disabled={clientData.HNSEligibilityFormDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      HNSEligibilityFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.intake_folder_url
                      ? data[0]?.miscellaneous_folder_url
                      : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HNSEligibilityForm"
                  className={`${MSAStyles.inputDate} {${
                    clientData.HNSEligibilityForm &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.HNSEligibilityFormUploadDate &&
                    clientData.HNSEligibilityFormUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.HNSEligibilityFormUploadDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      HNSEligibilityFormUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.HNSEligibilityFormReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.HNSEligibilityFormReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        HNSEligibilityFormReviewed:
                          !formState.HNSEligibilityFormReviewed,
                        HNSEligibilityFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        HNSEligibilityFormReviewed:
                          !formState.HNSEligibilityFormReviewed,
                        HNSEligibilityFormUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.HNSEligibilityFormReviewed ||
                    clientData.HNSEligibilityFormIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      HNSEligibilityFormUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={
                    clientData.HNSEligibilityFormReviewed ? "3" : "0"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.HNSEligibilityForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HNSEligibilityFormUploadDate === "" ||
                    clientData.HNSEligibilityFormUploadDate === null
                      ? setClientData({
                          ...clientData,
                          HNSEligibilityFormReviewed:
                            !clientData.HNSEligibilityFormReviewed,
                          HNSEligibilityFormUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          HNSEligibilityFormReviewed:
                            !clientData.HNSEligibilityFormReviewed,
                        });
                  }}
                  checked={
                    clientData.HNSEligibilityFormReviewed ? "checked" : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.HNSEligibilityFormIssues
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.HNSEligibilityFormIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        HNSEligibilityFormIssues:
                          !formState.HNSEligibilityFormIssues,
                        HNSEligibilityFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        HNSEligibilityFormIssues:
                          !formState.HNSEligibilityFormIssues,
                        HNSEligibilityFormUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.HNSEligibilityFormIssues ||
                    clientData.HNSEligibilityFormReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      HNSEligibilityFormUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.HNSEligibilityFormIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.HNSEligibilityForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HNSEligibilityFormUploadDate === "" ||
                    clientData.HNSEligibilityFormUploadDate === null
                      ? setClientData({
                          ...clientData,
                          HNSEligibilityFormIssues:
                            !clientData.HNSEligibilityFormIssues,
                          HNSEligibilityFormUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          HNSEligibilityFormIssues:
                            !clientData.HNSEligibilityFormIssues,
                        });
                  }}
                  checked={
                    clientData.HNSEligibilityFormIssues ? "checked" : false
                  }
                />
              </div>
            </div>
            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-purple grid gap-5 py-2 rounded-lg my-2 ${
                clientData.HNSReadinessForm ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.HNSReadinessForm ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.HNSReadinessForm
                    ? setClientData((formState) => ({
                        ...formState,
                        HNSReadinessForm: !formState.HNSReadinessForm,
                        HNSReadinessFormDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        HNSReadinessForm: !formState.HNSReadinessForm,
                        HNSReadinessFormDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.HNSReadinessForm ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.HNSReadinessForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HNSReadinessFormDate === "" ||
                    clientData.HNSReadinessFormDate === null
                      ? setClientData({
                          ...clientData,
                          HNSReadinessForm: !clientData.HNSReadinessForm,
                          HNSReadinessFormDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          HNSReadinessForm: !clientData.HNSReadinessForm,
                        });
                  }}
                  checked={clientData.HNSReadinessForm ? "checked" : false}
                />
              </div>
              <div>
                <p>HNS Readiness Assessment </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HNSReadinessForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.HNSReadinessFormDate &&
                    clientData.HNSReadinessFormDate.split("T")[0]
                  }
                  disabled={clientData.HNSReadinessFormDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      HNSReadinessFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="HNSReadinessForm"
                  className={`${MSAStyles.inputDate} {${
                    clientData.HNSReadinessForm &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.HNSReadinessFormUploadDate &&
                    clientData.HNSReadinessFormUploadDate.split("T")[0]
                  }
                  disabled={
                    clientData.HNSReadinessFormUploadDate ? true : false
                  }
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      HNSReadinessFormUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.HNSReadinessFormReviewed
                    ? "pointer-events-none"
                    : ""
                }`}
                onClick={() => {
                  clientData.HNSReadinessFormReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        HNSReadinessFormReviewed:
                          !formState.HNSReadinessFormReviewed,
                        HNSReadinessFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        HNSReadinessFormReviewed:
                          !formState.HNSReadinessFormReviewed,
                        HNSReadinessFormUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.HNSReadinessFormReviewed ||
                    clientData.HNSReadinessFormIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      HNSReadinessFormUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.HNSReadinessFormReviewed ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.HNSReadinessForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HNSReadinessFormUploadDate === "" ||
                    clientData.HNSReadinessFormUploadDate === null
                      ? setClientData({
                          ...clientData,
                          HNSReadinessFormReviewed:
                            !clientData.HNSReadinessFormReviewed,
                          HNSReadinessFormUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          HNSReadinessFormReviewed:
                            !clientData.HNSReadinessFormReviewed,
                        });
                  }}
                  checked={
                    clientData.HNSReadinessFormReviewed ? "checked" : false
                  }
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.HNSReadinessFormIssues ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.HNSReadinessFormIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        HNSReadinessFormIssues:
                          !formState.HNSReadinessFormIssues,
                        HNSReadinessFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        HNSReadinessFormIssues:
                          !formState.HNSReadinessFormIssues,
                        HNSReadinessFormUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.HNSReadinessFormIssues ||
                    clientData.HNSReadinessFormReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      HNSReadinessFormUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.HNSReadinessFormIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.HNSReadinessForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.HNSReadinessFormUploadDate === "" ||
                    clientData.HNSReadinessFormUploadDate === null
                      ? setClientData({
                          ...clientData,
                          HNSReadinessFormIssues:
                            !clientData.HNSReadinessFormIssues,
                          HNSReadinessFormUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          HNSReadinessFormIssues:
                            !clientData.HNSReadinessFormIssues,
                        });
                  }}
                  checked={
                    clientData.HNSReadinessFormIssues ? "checked" : false
                  }
                />
              </div>
            </div>
            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-purple grid gap-5 py-2 rounded-lg my-2 ${
                clientData.SupportGroups ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.SupportGroups ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.SupportGroups
                    ? setClientData((formState) => ({
                        ...formState,
                        SupportGroups: !formState.SupportGroups,
                        SupportGroupsDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        SupportGroups: !formState.SupportGroups,
                        SupportGroupsDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.SupportGroups ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.SupportGroups && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.SupportGroupsDate === "" ||
                    clientData.SupportGroupsDate === null
                      ? setClientData({
                          ...clientData,
                          SupportGroups: !clientData.SupportGroups,
                          SupportGroupsDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          SupportGroups: !clientData.SupportGroups,
                        });
                  }}
                  checked={clientData.SupportGroups ? "checked" : false}
                />
              </div>
              <div>
                <p>Support Groups </p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="SupportGroups"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.SupportGroupsDate &&
                    clientData.SupportGroupsDate.split("T")[0]
                  }
                  disabled={clientData.SupportGroupsDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      SupportGroupsDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="SupportGroups"
                  className={`${MSAStyles.inputDate} {${
                    clientData.SupportGroups &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.SupportGroupsUploadDate &&
                    clientData.SupportGroupsUploadDate.split("T")[0]
                  }
                  disabled={clientData.SupportGroupsUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      SupportGroupsUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.SupportGroupsReviewed ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.SupportGroupsReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        SupportGroupsReviewed: !formState.SupportGroupsReviewed,
                        SupportGroupsUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        SupportGroupsReviewed: !formState.SupportGroupsReviewed,
                        SupportGroupsUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.SupportGroupsReviewed ||
                    clientData.SupportGroupsIssues
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      SupportGroupsUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.SupportGroupsReviewed ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.SupportGroups && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.SupportGroupsUploadDate === "" ||
                    clientData.SupportGroupsUploadDate === null
                      ? setClientData({
                          ...clientData,
                          SupportGroupsReviewed:
                            !clientData.SupportGroupsReviewed,
                          SupportGroupsUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          SupportGroupsReviewed:
                            !clientData.SupportGroupsReviewed,
                        });
                  }}
                  checked={clientData.SupportGroupsReviewed ? "checked" : false}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.SupportGroupsIssues ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.SupportGroupsIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        SupportGroupsIssues: !formState.SupportGroupsIssues,
                        SupportGroupsUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        SupportGroupsIssues: !formState.SupportGroupsIssues,
                        SupportGroupsUploadDate: crearFecha(),
                      }));
                  if (
                    !clientData.SupportGroupsIssues ||
                    clientData.SupportGroupsReviewed
                  ) {
                    setClientData((formState) => ({
                      ...formState,
                      SupportGroupsUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.SupportGroupsIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.SupportGroups && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.SupportGroupsUploadDate === "" ||
                    clientData.SupportGroupsUploadDate === null
                      ? setClientData({
                          ...clientData,
                          SupportGroupsIssues: !clientData.SupportGroupsIssues,
                          SupportGroupsUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          SupportGroupsIssues: !clientData.SupportGroupsIssues,
                        });
                  }}
                  checked={clientData.SupportGroupsIssues ? "checked" : false}
                />
              </div>
            </div>

            <div
              className={`${
                MSAStyles.formRowsContainerDesFormEdit
              } justify-center items-center bg-light-purple grid gap-5 py-2 rounded-lg my-2 ${
                clientData.IDGForm ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.IDGForm ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.IDGForm
                    ? setClientData((formState) => ({
                        ...formState,
                        IDGForm: !formState.IDGForm,
                        IDGFormDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        IDGForm: !formState.IDGForm,
                        IDGFormDate: crearFecha(),
                      }));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.IDGForm ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.IDGForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.IDGFormDate === "" ||
                    clientData.IDGFormDate === null
                      ? setClientData({
                          ...clientData,
                          IDGForm: !clientData.IDGForm,
                          IDGFormDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          IDGForm: !clientData.IDGForm,
                        });
                  }}
                  checked={clientData.IDGForm ? "checked" : false}
                />
              </div>
              <div>
                <p>IDG</p>
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="IDGForm"
                  className={MSAStyles.inputDate}
                  value={
                    clientData.IDGFormDate &&
                    clientData.IDGFormDate.split("T")[0]
                  }
                  disabled={clientData.IDGFormDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      IDGFormDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
              >
                <a
                  href={
                    data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={"/dropbox-folder.png"} alt="" width="34" />
                </a>
                {/* <p className="text-dark-blue underline">Medical</p> */}
              </div>
              <div className="text-center">
                <input
                  type="date"
                  id="IDGForm"
                  className={`${MSAStyles.inputDate} {${
                    clientData.IDGForm &&
                    "border-2 border-dark-blue rounded-md p-px"
                  }`}
                  value={
                    clientData.IDGFormUploadDate &&
                    clientData.IDGFormUploadDate.split("T")[0]
                  }
                  disabled={clientData.IDGFormUploadDate ? true : false}
                  onChange={(e) => {
                    setClientData({
                      ...clientData,
                      IDGFormUploadDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.IDGFormReviewed ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.IDGFormReviewed
                    ? setClientData((formState) => ({
                        ...formState,
                        IDGFormReviewed: !formState.IDGFormReviewed,
                        IDGFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        IDGFormReviewed: !formState.IDGFormReviewed,
                        IDGFormUploadDate: crearFecha(),
                      }));
                  if (!clientData.IDGFormReviewed || clientData.IDGFormIssues) {
                    setClientData((formState) => ({
                      ...formState,
                      IDGFormUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.IDGFormReviewed ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.IDGForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.IDGFormUploadDate === "" ||
                    clientData.IDGFormUploadDate === null
                      ? setClientData({
                          ...clientData,
                          IDGFormReviewed: !clientData.IDGFormReviewed,
                          IDGFormUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          IDGFormReviewed: !clientData.IDGFormReviewed,
                        });
                  }}
                  checked={clientData.IDGFormReviewed ? "checked" : false}
                />
              </div>
              <div
                className={`ml-1 text-center flex justify-center items-center ${
                  clientData.IDGFormIssues ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  clientData.IDGFormIssues
                    ? setClientData((formState) => ({
                        ...formState,
                        IDGFormIssues: !formState.IDGFormIssues,
                        IDGFormUploadDate: "",
                      }))
                    : setClientData((formState) => ({
                        ...formState,
                        IDGFormIssues: !formState.IDGFormIssues,
                        IDGFormUploadDate: crearFecha(),
                      }));
                  if (!clientData.IDGFormIssues || clientData.IDGFormReviewed) {
                    setClientData((formState) => ({
                      ...formState,
                      IDGFormUploadDate: crearFecha(),
                    }));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-10 text-dark-blue h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={clientData.IDGFormIssues ? "3" : "0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <input
                  className={`${
                    !clientData.IDGForm && "bg-slate-300"
                  } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
                  type="checkbox"
                  name=""
                  id=""
                  onChange={(e) => {
                    clientData.IDGFormUploadDate === "" ||
                    clientData.IDGFormUploadDate === null
                      ? setClientData({
                          ...clientData,
                          IDGFormIssues: !clientData.IDGFormIssues,
                          IDGFormUploadDate: crearFecha(),
                        })
                      : setClientData({
                          ...clientData,
                          IDGFormIssues: !clientData.IDGFormIssues,
                        });
                  }}
                  checked={clientData.IDGFormIssues ? "checked" : false}
                />
              </div>
            </div>
            {/* <RowMsaFormSupervisor
              form={clientData.IDGForm}
              formDate={clientData.IDGFormDate}
              formUploadDate={clientData.IDGFormUploadDate}
              formScan={clientData.IDGFormScan}
              setClientData={setClientData}
              clientData={clientData}
              crearFecha={crearFecha}
            /> */}
          </section>

          <section id="save" className="my-5">
            <div className="container mx-auto flex justify-center">
              <button
                className="btn-darkBlue hover:btn-blue px-5 py-1 rounded text-white flex items-center justify-between mr-5"
                onClick={() => handleMsaform()}
              >
                <Image src={checkUpdateicon} />
                <p className="ml-2">Save and Update</p>
              </button>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default EditSupervisorMSAFormPage;

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
