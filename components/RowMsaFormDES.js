import { useMemo, useState,useEffect } from "react";
import MSAStyles from "../styles/MSA.module.css";

function iterateFormStringNames(raizName) {

  const date = raizName + "Date"
  const uploadDate = raizName + "UploadDate"
  const issues = raizName + "issues";
  const reviewed = raizName + "reviewed"
  const pdf = raizName + "PDF"
  const scan = raizName + "Scan"

  return [date, uploadDate, issues.toLowerCase(), reviewed.toLowerCase(), pdf, scan]
}; 

const RowMsaFormDES = ({
  fieldName,
  clientData,
  setClientData,
  formString,
  data,
  folderName,
  bgColor
}) => {



  

  const nameStrings = useMemo(() => iterateFormStringNames(formString), [])

  // names to use in the form  
  const [strings, setStrings] = useState({
    formDate: nameStrings[0],
    formUploadDate: nameStrings[1],
    formIssues: nameStrings[2],
    formReviewed: nameStrings[3],
    formPdf: nameStrings[4],
    formScan: nameStrings[5]
  });

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
      <div className="bg-white ">
      <div
        className={`${
          MSAStyles.formRowsContainerDesFormEdit
          }  justify-center   grid gap-1 divide border-white border-1 rounded-lg mt-1 ${
          clientData[formString] ? "" : "pointer-events-none"
        }`}
      >

        <div className={`px-5 py-3 ${bgColor} `}>
          <p className="text-lg font-medium">{fieldName}</p>
        </div>
        {/* <div className="text-center">
          <input
            type="date"
            id=""
            className={MSAStyles.inputDate}
            value={
              clientData[strings.formDate] &&
              clientData[strings.formDate].split("T")[0]
            }
            disabled={true}
            
          />
        </div> */}
        <div
          className={`${MSAStyles.dropboxFolderNames} ${bgColor} text-center flex justify-center items-center px-5 py-3 ${bgColor} `}
        >
           <a
            href={folderName ? folderName : ""}
            target="_blank"
            rel="noreferrer"
          >

            <img src={"/msa/dropbox_folder.svg"} alt="" width="34" />
          </a> 
          {/* <p className="text-dark-blue underline">Medical</p> */}
        </div>
        <div className={`flex items-center justify-center px-5 py-3 ${bgColor}`}>
          <input
            type="date"
            id={formString}
            className="pl-7 font-medium text-lg text-center"
            value={
              (clientData[strings.formUploadDate] &&
              clientData[strings.formUploadDate].split("T")[0]) || (clientData[strings.formDate] && clientData[strings.formDate].split("T")[0]) 
            }
            disabled={true}
          />
        </div>
        <div
          className={`text-center flex justify-center items-center px-5 py-3 ${bgColor}`} 
        >
          
          <input
            className="relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6"
            type="checkbox"
            name={strings.formPdf}
            id=""
            disabled={!clientData[strings.formDate]}
            onClick={() => {
              clientData[strings.formPdf]
                ? setClientData((formState) => ({
                    ...formState,
                    [strings.formPdf]: !formState[strings.formPdf],
                    [strings.formUploadDate]: !clientData[strings.formScan] ? data[0][strings.formUploadDate.toLowerCase()] || data[0][strings.formDate.toLowerCase()]: clientData[strings.formUploadDate] ,
                    [strings.formIssues]: data[0][strings.formIssues],
                    [strings.formReviewed]: data[0][strings.formReviewed],
                  }))
                : setClientData((formState) => ({
                    ...formState,
                    [strings.formPdf]: !formState[strings.formPdf],
                    [strings.formUploadDate]: crearFecha(),
                    [strings.formIssues]: false,
                    [strings.formReviewed]: false,
                  }));
             
            }}
          />
        </div>
        <div
          className={`text-center flex justify-center items-center px-5 py-3 ${bgColor}`}
          
        >

          <input
            className="relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6"
            type="checkbox"
            name={strings.formScan}
            id=""
            disabled={!clientData[strings.formDate]}
            onClick={() => {
              clientData[strings.formScan]
                ? setClientData((formState) => ({
                    ...formState,
                    [strings.formScan]: !formState[strings.formScan],
                    [strings.formUploadDate]: !clientData[strings.formPdf] ? data[0][strings.formUploadDate.toLowerCase()] || data[0][strings.formDate.toLowerCase()] : clientData[strings.formUploadDate],
                    [strings.formIssues]: data[0][strings.formIssues],
                    [strings.formReviewed]: data[0][strings.formReviewed],
                  }))
                : setClientData((formState) => ({
                    ...formState,
                    [strings.formScan]: !formState[strings.formScan],
                    [strings.formUploadDate]: crearFecha(),
                    [strings.formIssues]: false,
                    [strings.formReviewed]: false,
                  }));
             
            }}
          />
        </div>
      </div>


      </div>
    </>
  );
};
export default RowMsaFormDES;
