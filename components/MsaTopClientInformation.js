import React from "react";

export default function MsaTopClientInformation({
  data,
  clientData,
  setClientData,
}) {
  return (
    <section id="info" className="border-blue-bottom bg-white rounded-md ">
      <div className="container mx-auto">
        <div className="service-action-plan-page-info-box px-5 py-10 ">
          <div className="grid grid-cols-2 gap-x-5 mb-5">
            <div className="flex items-center gap-x-3  self-start ">
              <img
                src="/sap/client_information.svg"
                alt=""
                className="grid items-center self-start"
              />
              <h1 className="font-black">Client Information</h1>
            </div>

            <div className="flex items-center gap-x-3  self-start ">
              <img
                src="/sap/health_care_worker.svg"
                alt=""
                className="grid items-center self-start"
              />
              <h1 className="font-black">Health Care Worker</h1>
            </div>
          </div>

          <div className="sap-client-information-container grid grid-cols-2 gap-x-5">
            <div className="sap-client-information grid grid-cols-3 gap-x-5">
              <div>
                <p className=" text-lg">{`Today's date`}</p>
                <p className="bg-blue-50 rounded-md pl-2 pr-10 py-1 text-lg">{new Date().toLocaleDateString('en',{year:'numeric',month:'numeric',day:'numeric'})}</p>
              </div>

              <div>
                <p className="text-lg">Client name</p>
                <p className="bg-blue-50 rounded-md pl-2 pr-10 py-1 text-lg">
                  {data[0].clientfirstname} {data[0].clientlastname.charAt(0)}.
                </p>
              </div>

              <div>
                <p className="text-lg">Client ID</p>
                <p className="bg-blue-50 rounded-md pl-2  py-1 text-lg block w-2/4">
                  {" "}
                  {data?.[0]?.clientid}
                </p>
              </div>
            </div>

            <div className="sap-client-information grid grid-cols-3 gap-x-5">
              <div>
                <p className="text-lg">First name</p>
                <p className="bg-blue-50 rounded-md pl-2 pr-10 py-1 text-lg">
                  {clientData.userFirstName}
                </p>
              </div>

              <div>
                <p className="text-lg">Last name</p>
                <p className="bg-blue-50 rounded-md pl-2 pr-10 py-1 text-lg">
                  {" "}
                  {clientData.userLastName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
