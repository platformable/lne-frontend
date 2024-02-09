import React, { useState, useEffect, useMemo } from "react";
import MSAStyles from "../styles/MSA.module.css";

function iterateFormStringNames(raizName) {
  const date = raizName + "Date";
  const uploadDate = raizName + "UploadDate";
  const issues = raizName + "Issues";
  const reviewed = raizName + "Reviewed";

  return [date, uploadDate, issues, reviewed];
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
  showIssuesFoundModal,
  bgColor,
}) => {
  const nameStrings = useMemo(() => iterateFormStringNames(formString), []);

  // names to use in the form
  const [strings, setStrings] = useState({
    formDate: nameStrings[0],
    formUploadDate: nameStrings[1],
    formIssues: nameStrings[2],
    formReviewed: nameStrings[3],
  });
  console.log("strings ",strings);
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
    const todaysDate = new Date();
    const uploadDate = new Date(formUploadDate);
    const dateComparison = todaysDate.getDate() === uploadDate.getDate();

    dateComparison
      ? setClientData((prevState) => ({
          ...prevState,
          [e.target.name]: !prevState[e.target.name],
          [strings.formUploadDate]: formDate,
        }))
      : setClientData((prevState) => ({
          ...prevState,
          [e.target.name]: !prevState[e.target.name],
          [strings.formUploadDate]: crearFecha(),
        }));

    /*   formUploadDate ?  
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
})) */
  };
  const onChangeInputIssues = (e) => {
    //set info to display in issue popup
    setIssueFounded((previousState) => ({
      ...previousState,
      form_issues: strings.formIssues,
      form_reviewed: strings.formReviewed,
      form_uploadDate: strings.formUploadDate,
      msaform: e.target.name,
      lastdateupdated: formUploadDate || crearFecha(),
      formDate: formDate,
    }));

    setShowIssuesFoundModal((previousState) => !previousState);
    setClientData((previousState) => ({
      ...previousState,
      [strings.formIssues]: true,
      [strings.formReviewed]: true,
      [strings.formUploadDate]: crearFecha(),
    }));
  };

  return (
    <div
      className={`${
        MSAStyles.formHeadTitlesSupervisor
      } items-center  grid gap-1 rounded-sm bg-white ${
        // form ? "" : "pointer-events-none"""
        ""
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

      <div className={`${bgColor} px-3 h-full flex items-center `}>
        <p className="text-lg font-medium">{fieldName}</p>
      </div>

      <div className={`${bgColor} h-full flex items-center justify-center`}>
        {formDate ? (
          <p className="font-medium text-lg">
            {new Date(formDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </p>
        ) : (
          <p className="font-medium">-</p>
        )}
        
      </div>
      
      <div
        className={`${MSAStyles.dropboxFolderNames} ${bgColor}  flex justify-center items-center  h-full`}
      >
        <a
          href={dependency_folder_url ? folder_url : ""}
          id={formString}
          target="_blank"
          rel="noreferrer"
        >
          <img src={"/msa/dropbox_folder.svg"} alt="" width="35" height={35} />
        </a>
        {/*  <p className="text-dark-blue underline">Intake</p> */}
      </div>

      <div className={`text-center ${bgColor} h-full flex justify-center items-center`}>
        {formUploadDate ? (
          <p className="text-lg">
            {new Date(formUploadDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </p>
        ) : (
          <p className="font-medium">-</p>
        )}

       
      </div>

      <div
        //handles the prohibition to change review`s input once was issue checked
        className={`${bgColor} h-full py-1 text-center flex justify-center items-center  ${
          formIssues && "pointer-events-none"
        }`}
      >
        <input
          className={`${''
            //!form && "pointer-events-none"
          } bg-white   rounded-md  h-6 w-6 `}
          type="checkbox"
          name={strings.formReviewed}
          id={strings.formReviewed}
          onChange={(e) => onChangeInputCheckbox(e)}
          //checked={formReviewed || formIssues ? "checked" : false}
          //disabled={!formDate}
        />
      </div>

      <div
        className={`${bgColor} h-full py-1 text-center flex justify-center items-center`}
      >
        <input
          className={`${
            // formIssues && "pointer-events-none"
            ""
          } bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
          type="checkbox"
          name={fieldName}
          id={strings.formIssues}
          onChange={(e) => onChangeInputIssues(e)}
          //checked={formIssues ? "checked" : false}
          //disabled={!formDate}
        />
      </div>
    </div>
  );
};

export default RowMsaFormSupervisor;
