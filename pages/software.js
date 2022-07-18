import React, { useState } from "react";
import BackupDataModal from "../components/BackupDataModal";
import Layout from "../components/Layout";

export default function Software() {
  const [dataBackup, setDataBackup] = useState(false);


  return (
    <>
      <Layout>
        <section className="bg-light-blue md:h-screen">
          <section id="dashboard-client-list">
            <div className="container mx-auto py-5">
              <section className=" border-2 border-white shadow ">
                <div className="supervisor-dashboard-top-container  px-5 py-1 mb-1 bg-white">
                  <div className="supervisor-dashboard-top  grid md:grid-cols-2  grid-cols-1">
                    <div>
                      <h1 className="font-black my-2">
                        Here is a quick view of how things are doing
                      </h1>
                    </div>
                    <div className="flex wrap justify-end items-center">
                      <div className="px-5 py-1 h-4/6 bg-green-100 w-40 mr-2 flex items-center justify-center">
                        on-track
                      </div>
                      <div className="px-5 py-1 h-4/6 bg-orange-100 w-40 mr-2 flex items-center justify-center">
                        warning
                      </div>
                      <div className="px-5 py-1 h-4/6 bg-red-100 w-40 flex items-center justify-center">
                        alert
                      </div>
                    </div>
                  </div>
                </div>
                <div className="supervisor-dashboard-top-bottom grid md:grid-cols-4 grid-cols-1 gap-1">
                  <div className="supervisor-dashboard-top-bottom-box bg-white grid items-center">
                    <div className="px-4 flex py-5">
                      <img src="./supervisor/key-metrics.svg"></img>
                      <p className="font-semibold text-lg underline ml-3">
                        Days since last backup
                      </p>
                    </div>
                    <h1 className="w-full text-center font-black py-5 bg-middle-green">
                      1
                    </h1>
                  </div>
                  <div className="supervisor-dashboard-top-bottom-box bg-white ">
                    <div className="px-4 flex py-5">
                      <img src="./supervisor/key-metrics.svg"></img>
                      <p className="font-semibold text-lg underline ml-3">
                        Security incidents or data breaches
                      </p>
                    </div>
                    <h1 className="text-center font-black py-5 bg-middle-green">
                      0
                    </h1>
                  </div>
                </div>
              </section>
              <h1 className="font-bold px-2 md:px-0 py-5">
                What do you want <span className="bg-yellow px-2">to do</span>{" "}
                today?
              </h1>
              <div className="grid md:grid-cols-7 grid-cols-1 gap-5 px-5 md:px-0 pb-5">
                <div
                  className="p-3 rounded-md bg-white shadow-md cursor-pointer"
                  onClick={() => setDataBackup(!dataBackup)}
                >
                  <figure className="flex flex-col items-center">
                    <img
                      src="/supervisor/monitor-staff-progres.svg"
                      className="mb-5"
                      alt="data backup"
                    ></img>
                    <figcaption className="font-bold text-xs text-center">
                      BACKUP DATA
                    </figcaption>
                  </figure>
                </div>
                <div className="p-3 rounded-md bg-white shadow-md">
                  <figure className="flex flex-col items-center">
                    <img
                      src="/supervisor/monitor-staff-progres.svg"
                      className="mb-5"
                      alt="review data security plan"
                    ></img>
                    <figcaption className="font-bold text-xs text-center">
                      REVIEW DATA SECURITY PLAN
                    </figcaption>
                  </figure>
                </div>
                <div className="p-3 rounded-md bg-white shadow-md">
                  <figure className="flex flex-col items-center">
                    <img
                      src="/supervisor/monitor-impacts-icon.svg"
                      className="mb-1"
                      alt="complete incident response checklist"
                    ></img>
                    <figcaption className="font-bold text-xs text-center">
                      COMPLETE INCIDENT RESPONSE CHECKLIST
                    </figcaption>
                  </figure>
                </div>
                <div className="p-3 rounded-md bg-white shadow-md">
                  <figure className="flex flex-col items-center">
                    <img
                      src="/supervisor/monitor-quality-icon.svg"
                      className="mb-5"
                      alt="upload incident response checklist"
                    ></img>
                    <figcaption className="font-bold text-xs text-center">
                      UPLOAD INCIDENT RESPONSE CHECKLIST
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </section>
        </section>
      </Layout>
      {dataBackup && (
        <BackupDataModal
          dataBackup={dataBackup}
          setDataBackup={setDataBackup}
        />
      )}
    </>
  );
}
