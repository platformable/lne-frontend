import React from "react";

export default function SapClientInformation({
  data,
  clientData,
  setClientData,
}) {
  return (
    <section id="info" className="border-blue-bottom bg-white rounded-md ">
      <div className="container mx-auto">
        <div className="service-action-plan-page-info-box px-5 pt-5 pb-7">
          <div className="grid grid-cols-2 gap-x-5 mb-5">
            <div className="flex items-center gap-x-3  self-start ">
              <img
                src="/sap/client_information.svg"
                alt=""
                className="grid items-center self-start"
              />
              <h1 className="font-bold text-2xl">Client Information</h1>
            </div>

            <div className="flex items-center gap-x-3  self-start ">
              <img
                src="/sap/health_care_worker.svg"
                alt=""
                className="grid items-center self-start"
              />
              <h1 className="font-bold Client Information text-2xl">Health Care Worker</h1>
            </div>
          </div>

          <div className="sap-client-information-container grid grid-cols-2 gap-x-5">
            <div className="sap-client-information grid grid-cols-3 gap-x-5">
              <div>
                <p className="text-xl">Plan start date</p>
                <input
                  type="date"
                  value={clientData.planStartDate}
                  className="block bg-primary-light-blue w-full rounded-md  p-1  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                  onChange={(e) =>
                    setClientData({
                      ...clientData,
                      planStartDate: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <p className="text-xl">Client name</p>
                <p className="bg-blue-50 rounded-md pl-2 pr-10 py-1 text-lg">
                  {data[0].clientfirstname} {data[0].clientlastname.charAt(0)}.
                </p>
              </div>

              <div>
                <p className="text-xl">Client ID</p>
                <p className="bg-blue-50 rounded-md pl-2  py-1 text-lg block w-2/4">
                  {" "}
                  {data?.[0]?.clientid}
                </p>
              </div>
            </div>

            <div className="sap-client-information grid grid-cols-3 gap-x-5">
              <div>
                <p className="text-xl">First name</p>
                <p className="bg-blue-50 rounded-md pl-2 pr-10 py-1 text-lg">
                  {clientData.userFirstName}
                </p>
              </div>

              <div>
                <p className="text-xl">Last name</p>
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
