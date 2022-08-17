import { useMemo, useState } from "react";
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
  data
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
      <div
        className={`${
          MSAStyles.formRowsContainerDesFormEdit
        } justify-center items-center bg-light-purple grid gap-5 py-2 rounded-lg my-2 ${
          clientData[formString] ? "" : "pointer-events-none"
        }`}
      >
        <div className=""></div>

        <div>
          <p>{fieldName}</p>
        </div>
        <div className="text-center">
          <input
            type="date"
            id="SupportGroups"
            className={MSAStyles.inputDate}
            value={
              clientData[strings.formDate] &&
              clientData[strings.formDate].split("T")[0]
            }
            disabled={true}
            
          />
        </div>
        <div
          className={`${MSAStyles.dropboxFolderNames} text-center flex justify-center items-center border-l-dark-blue`}
        >
           <a
            href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""}
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
            id={formString}
            className={`${MSAStyles.inputDate}`}
            value={
              (clientData[strings.formUploadDate] &&
              clientData[strings.formUploadDate].split("T")[0]) || (clientData[strings.formDate] && clientData[strings.formDate].split("T")[0]) 
            }
            disabled={true}
          />
        </div>
        <div
          className="ml-1 text-center flex justify-center items-center" 
        >
          
          <input
            className="relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6"
            type="checkbox"
            name={strings.formPdf}
            id=""
            disabled={!clientData[formString]}
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
          className="ml-1 text-center flex justify-center items-center"
          
        >

          <input
            className="relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6"
            type="checkbox"
            name={strings.formScan}
            id=""
            disabled={!clientData[formString]}
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
    </>
  );
};
export default RowMsaFormDES;
