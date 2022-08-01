import React, { useState,useEffect, useMemo } from "react";
import MSAStyles from "../styles/MSA.module.css";

function iterateFormStringNames(raizName) {

  const date = raizName + "Date"
  const uploadDate = raizName + "UploadDate"
  const issues = raizName + "Issues";
  const reviewed = raizName + "Reviewed"

  return [date, uploadDate, issues, reviewed]
} 

const RowMsaFormSupervisor = ({
  fieldName,
  form,
  formDate,
  formUploadDate,
  formPDF,
  formReviewed,
  formIssues,
  formString,
  setClientData,
  onChangeInputCheckbox,
  folder_url,
  dependency_folder_url,
  setIssueFounded,
  setShowIssuesFoundModal,
  showIssuesFoundModal
}) => {


  const nameStrings = useMemo(() => iterateFormStringNames(formString), [])
  const [strings, setStrings] = useState({
    formDate: nameStrings[0],
    formUploadDate: nameStrings [1],
    formIssues: nameStrings[2],
    formReviewed: nameStrings[3],
  });
  useEffect(() => {
    console.log(nameStrings)
  } ,[]);

  const onChangeInputIssues = (e) => {
    setIssueFounded((previousState) => ({...previousState, field_title: e.target.name, date_updated: formUploadDate }))
    setShowIssuesFoundModal((previousState) => !previousState)
    onChangeInputCheckbox(strings.formIssues);
    onChangeInputCheckbox(strings.formReviewed);
  }

  return (
    <div
      className={`${
        MSAStyles.formRowsContainerDesFormEdit
      } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
        form ? "" : "pointer-events-none"
      }`}
    >
      <div
        className={`ml-1 text-center flex justify-center items-center `}
      >
        {/* <input  className={`bg-white rounded-md  h-6 w-6 `}
          type="checkbox"
          name=""
          id=""
          onClick={() => onChangeInputCheckbox(strings.form, strings.formDate, strings.formIssues)}
          checked={form ? "checked" : false}
          disabled={form ? true : false}  
        /> */}
      </div>

      <div>
        <p>
          {fieldName}
           {/* <span className="text-red-500">*</span> */}
        </p>
      </div>

      <div className="text-center">
        <input
          type="date"
          id={formString}
          className={MSAStyles.inputDate}
          value={
            formDate &&
            formDate.split("T")[0]
          }
          disabled={form ? true : false}
          onChange={(e) => {
            setClientData((prev) => ({
              ...prev,
              [formDateString]: e.target.value,
            }));
          }}
        />
      </div>
      <div
        className={`${MSAStyles.dropboxFolderNames}  text-center flex justify-center items-center border-l-dark-blue`}
      >
        <a
          href={
            dependency_folder_url ? folder_url : ""
          }
          id={formString}
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
          id={strings.formUploadDate}
          className={`${MSAStyles.inputDate} 
           ${
            formReviewed 
              ? ""
              : " border-2 border-dark-blue rounded-md p-px bg-white"
          }`}
          value={
            formUploadDate &&
            formUploadDate.split("T")[0]
          }
          disabled={formUploadDate ? true : false}
          onChange={(e) => {
            setClientData((prev) => ({
              ...prev,
              [strings.formUploadDate]: e.target.value,
            }));
          }}
        />
      </div>
        <div
        //handles the prohibition to change review`s input once was issue checked
        className={`ml-1 text-center flex justify-center items-center ${formIssues && "pointer-events-none"}`}> 
        <input
          className={`${
            !form && "pointer-events-none"
          } bg-white border-dark-blue rounded-md  h-6 w-6 `}
          type="checkbox"
          name={strings.formReviewed}
          id={strings.formReviewed}
          onChange={(e) => onChangeInputCheckbox(strings.formReviewed)}
          checked={
            formReviewed || formIssues ? "checked" : false
          }
          disabled={!form}
        />
      </div> 
      <div
        className={`ml-1 text-center flex justify-center items-center`}
      >
        
        <input
          className={`${
            formIssues && "pointer-events-none" 
          } bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
          type="checkbox"
          name={fieldName}
          id={strings.formIssues}
          onChange={(e) => onChangeInputIssues(e)}
          checked={formIssues ? "checked" : false}
          disabled={!form}
        />
      </div>
    </div>
  );
};

export default RowMsaFormSupervisor;
