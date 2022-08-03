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
  folder_url,
  dependency_folder_url,
  setIssueFounded,
  setShowIssuesFoundModal,
  showIssuesFoundModal
}) => {

  const nameStrings = useMemo(() => iterateFormStringNames(formString), [])

  // names to use in the form  
  const [strings, setStrings] = useState({
    formDate: nameStrings[0],
    formUploadDate: nameStrings [1],
    formIssues: nameStrings[2],
    formReviewed: nameStrings[3],
  });
  // console.log("form : ",form);
  // console.log("form name: ", formString, formDate)
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
  const onChangeInputCheckbox = (e) => {
    !formUploadDate ?  
    setClientData((prevState) => ({
           ...prevState,
           [e.target.name]:
             !prevState[e.target.name],
           [strings.formUploadDate]: crearFecha()
    })) :
    setClientData((prevState) => ({
      ...prevState,
      [e.target.name]:
        !prevState[e.target.name],
      [strings.formUploadDate]: ""
}))

    
 }
  const onChangeInputIssues = (e) => {
    //set info to display in issue popup
    setIssueFounded((previousState) => ({...previousState,
      form_issues: strings.formIssues,
      form_reviewed: strings.formReviewed,
      form_uploadDate: strings.formUploadDate,
      msaform: e.target.name, 
      lastdateupdated: formUploadDate || crearFecha(),
       }));

    setShowIssuesFoundModal((previousState) => !previousState)
    setClientData(previousState => ({...previousState,
      [strings.formIssues]: true, 
      [strings.formReviewed]: true, 
      [strings.formUploadDate]: crearFecha()
    }));
  }

  return (  
    <div
      className={`${
        MSAStyles.formHeadTitlesSupervisor
      } justify-center items-center bg-light-blue grid gap-5 py-2 rounded-lg my-2 ${
        form  ? "" : "pointer-events-none"
      }`}
    >
      {/* 
      <div
        className={`ml-1 text-center flex justify-center items-center `}
      >
        <input  className={`bg-white rounded-md  h-6 w-6 `}
          type="checkbox"
          name=""
          id=""
          onClick={() => onChangeInputCheckbox()}
          checked={form ? "checked" : false}
          disabled={form ? true : false}  
      
      /> 
      </div>*/}
      

      <div>
        <p>
          {fieldName}
           {/* <span className="text-red-500">*</span> */}
        </p>
      </div>
       
      <div className="text-center">
      
        <input
          type="date"
          id={strings.formDate}
          className={MSAStyles.inputDate}
          value={
            formDate &&
            formDate.split("T")[0]
          }
          disabled={form ? true : false}
          onChange={(e) => {
            setClientData((prev) => ({
              ...prev,
              [strings.formDate]: e.target.value,
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
            formReviewed || !form
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
          onChange={(e) => onChangeInputCheckbox(e)}
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
