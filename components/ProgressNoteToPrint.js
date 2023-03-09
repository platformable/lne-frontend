import React, { Component } from "react";
import Styles from "../styles/ServiceAP.module.css";
import ProgressNotesStyles from "../styles/ProgressNotes.module.css";
import MSAStyles from "../styles/MSA.module.css";

const ProgressNotesToPrint = React.forwardRef((props, ref) => {
  let { data } = props;


  const whichServiceBeenAded = [
    {
      value: data.LNEHNSEligibilityForm,
      state_label: "HNSEligibilityForm",
      row_color: "bg-light-blue",
      form_text: "HNS Eligibility Assessment",
    },
    // {value:data.HNSReadinessForm ,state_label: "HNSReadinessForm",row_color: "bg-light-blue", form_text: "HNS Readiness Assessment", },
    {
      value: data.StatusChangesForm,
      state_label: "StatusChangesForm",
      row_color: "bg-light-blue",
      form_text: "Status Changes/Closure Forms",
    },
    {
      value: data.ComprehensiveRiskBehaviorAssessmentUpdates,
      state_label: "ComprehensiveRiskBehaviorAssessmentUpdates",
      row_color: "bg-light-blue",
      form_text: "Comprehensive Behavioral Risk Assessment Updates",
    },
    {
      value: data.M11QForm,
      state_label: "M11QForm",
      row_color: "bg-light-blue",
      form_text: "M11Q",
    },
    {
      value: data.CD4VLReports,
      state_label: "CD4VLReports",
      row_color: "bg-light-blue",
      form_text: "CD4/VL Check Reports",
    },
    {
      value: data.InitialTreatmentAdherenceIntake,
      state_label: "InitialTreatmentAdherenceIntake",
      row_color: "bg-light-blue",
      form_text: "Initial Treatment Adherence Intake",
    },
    {
      value: data.TreatmentAdherenceUpdates,
      state_label: "TreatmentAdherenceUpdates",
      row_color: "bg-light-blue",
      form_text: "Treatment Adherence Updates",
    },
    {
      value: data.AIRSCollateralInformation,
      state_label: "AIRSCollateralInformation",
      row_color: "bg-light-blue",
      form_text: "AIRS Collateral Information",
    },
    {
      value: data.AIRSDrugRegimen,
      state_label: "AIRSDrugRegimen",
      row_color: "bg-light-blue",
      form_text: "AIRS Drug Regimen History",
    },
    {
      value: data.AIRSFinancialInformation,
      state_label: "AIRSFinancialInformation",
      row_color: "bg-light-blue",
      form_text: "AIRS Financial Information",
    },
    {
      value: data.AIRSHIVAIDSRiskHistory,
      state_label: "AIRSHIVAIDSRiskHistory",
      row_color: "bg-light-blue",
      form_text: "AIRS HIV AIDS Risk History",
    },
    {
      value: data.AIRSHIVMedicalProvider,
      state_label: "AIRSHIVMedicalProvider",
      row_color: "bg-light-blue",
      form_text: "AIRS HIV Medical Provider History",
    },
    {
      value: data.AIRSHIVStatusHistory,
      state_label: "AIRSHIVStatusHistory",
      row_color: "bg-light-blue",
      form_text: "AIRS HIV Status History",
    },
    {
      value: data.AIRSHCVHistory,
      state_label: "AIRSHCVHistory",
      row_color: "bg-light-blue",
      form_text: "AIRS HCV History",
    },
    {
      value: data.AIRSHousingInformation,
      state_label: "AIRSHousingInformation",
      row_color: "bg-light-blue",
      form_text: "AIRS Housing Information",
    },
    {
      value: data.AIRSInsuranceInformation,
      state_label: "AIRSInsuranceInformation",
      row_color: "bg-light-blue",
      form_text: "AIRS Insurance Information",
    },
    {
      value: data.AIRSSubstanceUseHistory,
      state_label: "AIRSSubstanceUseHistory",
      row_color: "bg-light-blue",
      form_text: "AIRS Substance Use History",
    },
    {
      value: data.LNEClientRights,
      state_label: "LNEClientRights",
      row_color: "bg-light-green",
      form_text: "LNE Client Rights",
    },
    {
      value: data.LNEClientGrievancePolicyProcedure,
      state_label: "LNEClientGrievancePolicyProcedure",
      row_color: "bg-light-green",
      form_text: "LNE Client Grievance Policy & Procedure",
    },
    {
      value: data.LNEProgramRules,
      state_label: "LNEProgramRules",
      row_color: "bg-light-green",
      form_text: "LNE Program Rules",
    },
    {
      value: data.LNEEmergencyContactConsent,
      state_label: "LNEEmergencyContactConsent",
      row_color: "bg-light-green",
      form_text: "LNE Emergency Contact Consent",
    },
    {
      value: data.LNEConsentForReleaseOfConfidentialInformation,
      state_label: "LNEConsentForReleaseOfConfidentialInformation",
      row_color: "bg-light-green",
      form_text: "LNE Consent for Release of Confidential Information",
    },
    {
      value: data.HIPPAConsentForm,
      state_label: "HIPPAConsentForm",
      row_color: "bg-light-green",
      form_text: "HIPAA Consent Form (OCA Form 960), ",
    },
    {
      value: data.NYCDOHMHNoticeOfPrivacyPractices,
      state_label: "NYCDOHMHNoticeOfPrivacyPractices",
      row_color: "bg-light-green",
      form_text:
        "NYC DOHMH Notice of Privacy Practices - Acknowledgement of Receipt",
    },
    {
      value: data.LNEOutreachRetentionTrackingForm,
      state_label: "LinkageRetentionAdherenceForms",
      row_color: "bg-light-pink",
      form_text: "Linkage, Retention, & Adherence Forms",
    },
    {
      value: data.LNEReferralInformation,
      state_label: "InternalReferralInformation",
      row_color: "bg-light-pink",
      form_text: "Internal Referral Information",
    },
    {
      value: data.LNEClientReferralForm,
      state_label: "LNEClientReferralForm",
      row_color: "bg-light-pink",
      form_text: "Identification",
    },
    {
      value: data.SupportGroups,
      state_label: "SupportGroups",
      row_color: "bg-light-pink",
      form_text: "Support Groups",
    },
    {
      value: data.IDGForm,
      state_label: "IDGForm",
      row_color: "bg-light-pink",
      form_text: "IDG",
    },
  ];

  return (
    <>
      <div ref={ref}>
        <div className="container mx-auto">
          <h3 className="font-black text-center my-5">Progress Notes </h3>
        </div>

        <main className="container mx-auto px-5">
          <section id="info" className="my-5">
            <div className="">
              <h3 className="font-black my-1 text-dark-blue">
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
                    <span className="">Progress note date</span>
                    <p className="">
                      {new Date(data.progressNoteDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "numeric", day: "numeric" }
                      )}
                    </p>
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
                        value={data.clientFirstName}
                        disabled
                      />
                    </label>
                    <label className="block">
                      <span className="">Last Name</span>
                      <input
                        type="text"
                        className="block w-full bg-blue-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                        value={data.clientLastName.charAt(0)}
                        disabled
                      />
                    </label>
                    <label className="block">
                      <span className="">Client ID</span>
                      <input
                        type="text"
                        className="block w-full bg-blue-50  p-2 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                        value={data.clientId}
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
                        value={data.userFirstName}
                        disabled
                      />
                    </label>
                    <label className="block">
                      <span className="">Last Name</span>
                      <input
                        type="text"
                        className="block w-full bg-yellow-50 rounded-md  p-2  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"
                        value={data.userLastName}
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
              {/* <div className="services-box grid gap-y-3 items-start justify-start"> */}
              <div className="flex items-center">
                <label className="flex items-center gap-x-5">
                  <input
                    type="checkbox"
                    defaultChecked={data.developmentActionPlan ? true : null}
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
                    defaultChecked={data.CD4VLLabReport ? true : null}
                  />
                  CD4/VL Lab Report Check
                  {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                </label>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-x-5">
                  <input
                    type="checkbox"
                    defaultChecked={
                      data.transportationCoordination ? true : null
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
                    defaultChecked={
                      data.translationInterpretation ? true : null
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
                    defaultChecked={
                      data.comprehensiveBehavioralRiskAssessment ? true : null
                    }
                  />
                  Comprehensive Behavioral Risk Assessment
                  {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                </label>
              </div>
              {/* </div> */}

              {/* <div className="services-box grid gap-y-3 items-start justify-start "> */}
              <div className="flex items-center">
                <label className="flex items-center gap-x-5">
                  <input
                    type="checkbox"
                    defaultChecked={data.ticklerUpdate ? true : null}
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
                    defaultChecked={data.treatmentEducation ? true : null}
                  />
                  Treatment Education and Adherence Counselling
                  {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                </label>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-x-5">
                  <input
                    type="checkbox"
                    defaultChecked={data.preventionCounselling ? true : null}
                  />
                  Prevention Counselling
                  {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                </label>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-x-5">
                  <input
                    type="checkbox"
                    defaultChecked={data.supportiveCounselling ? true : null}
                  />
                  Supportive Counselling
                  {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                </label>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-x-5">
                  <input
                    type="checkbox"
                    defaultChecked={data.escort ? true : null}
                  />
                  Escort
                  {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                </label>
              </div>
              {/* </div> */}

              {/* <div className="services-box grid grid-rows-5 gap-y-3 items-start justify-start"> */}
              <div className="flex items-center">
                <label className="flex items-center gap-x-5">
                  <input
                    type="checkbox"
                    defaultChecked={data.caseClosureDischarge ? true : null}
                  />
                  Case Closure/Discharge
                  {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                </label>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-x-5">
                  <input
                    type="checkbox"
                    defaultChecked={data.linkageToServices ? true : null}
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
                    defaultChecked={data.OtherAssistance ? true : null}
                  />
                  Other Form of Assistance
                  {/* <span className={`${ProgressNotesStyles.checkmark}`}></span> */}
                </label>
              </div>
              {/* </div> */}
            </div>
          </section>
          <div className="page-break"></div>

          <h3 className="font-black pt-10 pb-5 text-dark-blue">Goals</h3>

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
                      {new Date(data?.goal1targetdate).toLocaleDateString(
                        "en",
                        {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div className="goal-summary my-2">
                  <span className="">Summary</span>
                  <p className=" text-dark-blue ">{data?.goal1summary}</p>
                </div>
                <div className="">
                  <span className="">Goal 1 Progress Comments</span>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    className="border-black h-56 rounded-md w-full mt-1 p-1"
                    value={data.goal1ProgressComments}
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
                  <div>
                    <span className="">Target Date</span>
                    <p className="text-dark-blue ">
                      {new Date(data?.goal2targetdate).toLocaleDateString(
                        "en",
                        {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div className="goal-summary my-2">
                  <span className="">Summary</span>
                  <p className=" text-dark-blue">{data?.goal2summary}</p>
                </div>
                <div className="">
                  <span className="">Goal 2 Progress Comments</span>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    className="border-black h-56 rounded-md w-full mt-1 p-1"
                    value={data.goal2ProgressComments}
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
                  <div>
                    <span className="">Target Date</span>
                    <p className="text-dark-blue ">
                      {new Date(data?.goal3targetdate).toLocaleDateString(
                        "en",
                        {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div className="goal-summary my-2  ">
                  <span className="">Summary</span>
                  <p className=" text-dark-blue">{data?.goal3summary}</p>
                </div>
                <div className="">
                  <span className="">Goal 3 Progress Comments</span>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    className="border-black h-56 rounded-md w-full mt-1 p-1"
                    value={data.goal3ProgressComments}
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
                  <label className="flex items-center ">
                    <input
                      type="radio"
                      defaultChecked={data.goal1Progress ? "checked" : ""}
                      className="mr-2 ml-5"
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      defaultChecked={!data.goal1Progress ? "checked" : ""}
                      className="mr-2 ml-5"
                    />{" "}
                    No
                    {/* {data.goal1Progress? 'YES':'NO'} */}
                  </label>
                </div>
                <div className="flex gap-5 items-center">
                  <div className={`calendarIcon`}>
                    <img src="/date-calendar.svg" width={24} alt="" />
                  </div>
                  <h3 className="">Date</h3>
                  <p>
                    {data.goal1ProgressDate
                      ? new Date(data.goal1ProgressDate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "numeric", day: "numeric" }
                        )
                      : null}
                  </p>
                </div>
              </div>

              <div>
                <div className="workedGoals-box flex gap-5 ">
                  <p className="text-lg">Goal 2</p>
                  <label
                    className=""
                  >
                    <input
                      type="radio"
                      defaultChecked={data.goal2Progress ? "checked" : ""}
                      className="mr-2 ml-5"
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      defaultChecked={!data.goal2Progress ? "checked" : ""}
                      className="mr-2 ml-5"
                    />{" "}
                    No
                  </label>
                </div>
                <div className="flex gap-5 items-center">
                  <div className={`calendarIcon`}>
                    <img src="/date-calendar.svg" width={24} alt="" />
                  </div>
                  <h3 className="">Date</h3>
                  <p>
                    {data.goal2ProgressDate
                      ? new Date(data.goal2ProgressDate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "numeric", day: "numeric" }
                        )
                      : null}
                  </p>
                </div>
              </div>

              <div>
                <div className="workedGoals-box flex gap-5 ">
                  <p className="text-lg">Goal 3</p>
                  <label
                    className=""
                  >
                    <input
                      type="radio"
                      defaultChecked={data.goal3Progress ? "checked" : ""}
                      className="mr-2 ml-5"
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      defaultChecked={!data.goal3Progress ? "checked" : ""}
                      className="mr-2 ml-5"
                    />{" "}
                    No
                  </label>
                </div>
                <div className="flex gap-5 items-center">
                  <div className={`calendarIcon`}>
                    <img src="/date-calendar.svg" width={24} alt="" />
                  </div>
                  <h3 className="">Date</h3>
                  <p>
                    {data.goal3ProgressDate
                      ? new Date(data.goal3ProgressDate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "numeric", day: "numeric" }
                        )
                      : null}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="page-break"></div>

          <div className="flex items-center  pt-10 pb-5">
            <img src={"/goals-completed-icon.svg"} />
            <h3 className="font-black self-end ml-3 text-dark-blue">
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
                  >
                    <input
                      type="radio"
                      defaultChecked={data.goal1Completed ? "checked" : ""}
                      className="mr-2 ml-5"
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      defaultChecked={!data.goal1Completed ? "checked" : ""}
                      className="mr-2 ml-5"
                    />{" "}
                    No
                  </label>
                </div>
                <div className="flex gap-5 items-center">
                  <div className={`calendarIcon`}>
                    <img src="/date-calendar.svg" width={24} alt="" />
                  </div>
                  <h3 className="">Date</h3>
                  <p>
                    {data.goal1CompletedDate
                      ? new Date(data.goal1CompletedDate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "numeric", day: "numeric" }
                        )
                      : null}
                  </p>
                </div>
                <div className="my-5">
                  <span className="">Goal 1 Completion Comments</span>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    className="border-black h-56 rounded-md w-full mt-1 p-2"
                    value={data.goal1CompletionComments}
                  ></textarea>
                </div>
              </div>

              <div>
                <div className="workedGoals-box flex gap-5 ">
                  <p className="text-lg">Goal 2</p>
                  <label
                  >
                    <input
                      type="radio"
                      defaultChecked={data.goal2Completed ? "checked" : ""}
                      className="mr-2 ml-5"
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      defaultChecked={!data.goal2Completed ? "checked" : ""}
                      className="mr-2 ml-5"
                    />{" "}
                    No
                  </label>
                </div>
                <div className="flex gap-5 items-center">
                  <div className={`calendarIcon`}>
                    <img src="/date-calendar.svg" width={24} alt="" />
                  </div>
                  <h3 className="">Date</h3>
                  <p>
                    {data.goal2CompletedDate
                      ? new Date(data.goal2CompletedDate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "numeric", day: "numeric" }
                        )
                      : null}
                  </p>
                </div>
                <div className="my-5">
                  <span className="">Goal 2 Completion Comments</span>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    className="border-black h-56 rounded-md w-full mt-1 p-2"
                    value={data.goal2CompletionComments}
                  ></textarea>
                </div>
              </div>

              <div>
                <div className="workedGoals-box flex gap-5 ">
                  <p className="text-lg">Goal 3</p>
                  <label
                  >
                    <input
                      type="radio"
                      defaultChecked={data.goal3Completed ? "checked" : ""}
                      className="mr-2 ml-5"
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      defaultChecked={!data.goal3Completed ? "checked" : ""}
                      className="mr-2 ml-5"
                    />{" "}
                    No
                  </label>
                </div>
                <div className="flex gap-5 items-center">
                  <div className={`calendarIcon`}>
                    <img src="/date-calendar.svg" width={24} alt="" />
                  </div>
                  <h3 className="">Date</h3>
                  <p>
                    {data.goal3CompletedDate
                      ? new Date(data.goal3CompletedDate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "numeric", day: "numeric" }
                        )
                      : null}
                  </p>
                </div>
                <div className="my-5">
                  <span className="">Goal 3 Completion Comments</span>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    className="border-black h-56 rounded-md w-full mt-1 p-2"
                    value={data.goal3CompletionComments}
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
              value={data.progressNoteText}
            ></textarea>

            <div className="progressnotes-box flex gap-x-5">
              <p className="text-lg">Has the health care worker signed</p>
              <label >
                <input
                      type="radio"
                      defaultChecked={data.HCWSignature ? "checked" : ""}
                      className="mr-2 ml-5"
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      defaultChecked={!data.HCWSignature ? "checked" : ""}
                      className="mr-2 ml-5"
                    />{" "}
                    No
              </label>
            </div>
          </section>
          <div className="page-break"></div>

          <h3 className="font-black pt-10 pb-5 text-dark-blue">
            Were any additional forms added to the client´s profile?
          </h3>

          <section
            className="gap-x-5 border-dark-blue rounded-xl  mb-5 workedGoals mx-1"
            id="workedGoals"
          >
            <div className="additional-forms-container grid grid-cols-2  divide-blue-500 divide-x-4">
              <div className="additional-forms-box ">
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
                            checked={service.value ? "checked" : ""}
                            // disabled={data[`${service.state_label}Date`] ? true : false} */
                            onChange={(e) => {
                              data[service.state_label] === "" ||
                              data[`${service.state_label}Date`] === null
                                ? setdata({
                                    ...data,
                                    [service.state_label]: !service.value,
                                    [`${service.state_label}Date`]: new Date(),
                                  })
                                : setdata({
                                    ...data,
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
              {/* FIN DEL FORM BOX */}
              <div className="additional-form-box ">
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
                            checked={service.value ? "checked" : ""}
                            // disabled={data[`${service.state_label}Date`] ? true : false} */
                            onChange={(e) => {
                              data[service.state_label] === "" ||
                              data[`${service.state_label}Date`] === null
                                ? setdata({
                                    ...data,
                                    [service.state_label]: !service.value,
                                    [`${service.state_label}Date`]: new Date(),
                                  })
                                : setdata({
                                    ...data,
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
        </main>
      </div>
    </>
  );
});

ProgressNotesToPrint.displayName = "Progress notes";

export default ProgressNotesToPrint;

/* export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid } = ctx.params;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes/${clientid}`
    );
    const data = await response.json();
    return { props: { data } };
  },
}); */
