import React from "react";
import MSAStyles from "../styles/MSA.module.css";

const RowMsaFormSupervisor = ({
  form,
  formDate,
  formUploadDate,
  formScan,
  formPDF,
  formReviewed,
  formIssues,
  setClientData,
  crearFecha,
  clientData,
}) => {
  return (
    <div
      className={`${
        MSAStyles.formRowsContainerDesFormEdit
      } justify-center items-center bg-light-purple grid gap-5 py-2 rounded-lg my-2 ${
        form ? "" : "pointer-events-none"
      }`}
    >
      <div
        className={`ml-1 text-center flex justify-center items-center ${
          form ? "pointer-events-none" : ""
        }`}
        onClick={() => {
          form
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
          strokeWidth={form ? "3" : "0"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <input
          className={`${
            !form && "bg-slate-300"
          } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
          type="checkbox"
          name=""
          id=""
          onChange={(e) => {
            formDate === "" || formDate === null
              ? setClientData({
                  ...clientData,
                  IDGForm: !form,
                  IDGFormDate: crearFecha(),
                })
              : setClientData({
                  ...clientData,
                  IDGForm: !form,
                });
          }}
          checked={form ? "checked" : false}
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
          value={formDate && formDate.split("T")[0]}
          disabled={formDate ? true : false}
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
        {/* <a
          href={data[0]?.intake_folder_url ? data[0]?.intake_folder_url : ""}
          target="_blank"
          rel="noreferrer"
        >
          <img src={"/dropbox-folder.png"} alt="" width="34" />
        </a> */}
        {/* <p className="text-dark-blue underline">Medical</p> */}
      </div>
      <div className="text-center">
        <input
          type="date"
          id="IDGForm"
          className={`${MSAStyles.inputDate} {${
            form && "border-2 border-dark-blue rounded-md p-px"
          }`}
          value={formUploadDate && formUploadDate.split("T")[0]}
          disabled={formUploadDate ? true : false}
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
          formReviewed ? "pointer-events-none" : ""
        }`}
        onClick={() => {
          formReviewed
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
          strokeWidth={formReviewed ? "3" : "0"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <input
          className={`${
            !form && "bg-slate-300"
          } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
          type="checkbox"
          name=""
          id=""
          onChange={(e) => {
            formUploadDate === "" || formUploadDate === null
              ? setClientData({
                  ...clientData,
                  IDGFormReviewed: !formReviewed,
                  IDGFormUploadDate: crearFecha(),
                })
              : setClientData({
                  ...clientData,
                  IDGFormReviewed: !formReviewed,
                });
          }}
          checked={formReviewed ? "checked" : false}
        />
      </div>
      <div
        className={`ml-1 text-center flex justify-center items-center ${
          formIssues ? "pointer-events-none" : ""
        }`}
        onClick={() => {
          formIssues
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
          strokeWidth={formIssues ? "3" : "0"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <input
          className={`${
            !form && "bg-slate-300"
          } appearance-none relative bg-white  border-2 border-dark-blue rounded-md  h-6 w-6 `}
          type="checkbox"
          name=""
          id=""
          onChange={(e) => {
            formUploadDate === "" || formUploadDate === null
              ? setClientData({
                  ...clientData,
                  IDGFormIssues: !formIssues,
                  IDGFormUploadDate: crearFecha(),
                })
              : setClientData({
                  ...clientData,
                  IDGFormIssues: !formIssues,
                });
          }}
          checked={formIssues ? "checked" : false}
        />
      </div>
    </div>
  );
};

export default RowMsaFormSupervisor;
