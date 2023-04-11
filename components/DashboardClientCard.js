import React from "react";
import Link from "next/link";

export default function DashboardClientCard({ client, index, loggedUserRole }) {
  const getDate = (date) => {
    const fecha = Date.parse(date);
    const newDate = new Date(fecha).toLocaleDateString("en", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const separatedDate = newDate.split("/");
    const finalDate = separatedDate.join("-");
    return newDate;
  };

  return (
    <Link
      href={
        loggedUserRole === "DES" && client.msaformid
          ? `/clients/${client.clientid}/msa_form/des_msa_form_edit/`
          : loggedUserRole === "DES"
          ? ""
          : `/clients/${client.clientid}/profile/`
      }
    >
      <a>
        <div className="dashboard-clients-box" key={index}>
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm ">
            <div className="grid dashboard-card-name-box gap-5 items-center">
              <img src="/client/client_information.svg" width="44" />

              <div>
                <h5 className="text-gray-900 text-2xl leading-tight font-bold">
                  {client.clientfirstname} {client.clientlastname.charAt(0)}
                </h5>
                <p className="text-dark-blue underline font-medium text-lg">
                  {client.clientid}
                </p>
              </div>
            </div>

            <div className="grid text-lg my-3 items-center bg-alert-green font-medium text-center py-1 rounded">
              Active
            </div>

            <div className="flex dashboard-card-name-box  items-center pl-2 justify-between mb-3">
              <div className="flex gap-2 items-center">
                <img
                  src="/client/last_update.svg"
                  alt="last updated icon"
                  width={19}
                  height={21}
                />
                <h6 className="text-md">Last Updated</h6>
              </div>

              <p className="text-md">{getDate(client.clientdatecreated)}</p>
            </div>

            <div className="">
              <button
                /* disabled={client?.msaformid ? loggedUserRole==='HCW'? false:true : true} */
                type="button"
                className={`${
                  !client?.msaformid && loggedUserRole === "DES"
                    ? "cursor-not-allowed"
                    : ""
                }  cursor-pointertext-xl mt-1 w-full flex items-center gap-x-2 justify-center px-6 py-3 btn-new-blue
                  font-medium text-lg leading-tight  rounded shadow-md hover-bg-dark-blue hover:shadow-lg  
                  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-500 active:shadow-lg transition 
                  duration-150 ease-in-out`}
              >
                {loggedUserRole === "DES" && !client.msaformid
                  ? "No MSA Form"
                  : "View Client"}
              </button>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
