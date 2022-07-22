import React, { useState } from "react";
import BackupDataModal from "../components/BackupDataModal";
import backIcon from "../public/BACKicon.svg";
import Image from "next/image";
import Layout from "../components/Layout";
import Link from "next/link";
import UploadIncidentChecklistModal from "../components/UploadIncidentChecklistModal";

export default function Software() {
  const [dataBackup, setDataBackup] = useState(false);
  const  [uploadIncidentModal, setUploadIncidentModal] = useState(false);
  
  return (
    <>
      <Layout>
        <section className="bg-light-blue md:h-screen">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 py-5">
              <h1 className="font-bold px-2">Manage Software</h1>

              <Link href="/dashboard">
                <a
                  className="px-5 py-2 flex  items-center font-bold justify-self-end"
                  id="myBtn"
                >
                  <Image src={backIcon} alt="back arrow to homepage" />
                  <p className="ml-2">back to homepage</p>
                </a>
              </Link>
            </div>
          </div>
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
                <div className="supervisor-dashboard-top-bottom grid md:grid-cols-4 grid-cols-1 gap-1 bg-white">
                  <div className="supervisor-dashboard-top-bottom-box bg-white grid items-center">
                    <div className="px-4 flex py-5">
                      <img src="./supervisor/software/icon-backup-folder.svg"></img>
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
                      <img src="./supervisor/software/icon-security-incidents-folder.svg"></img>
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
                      src="/supervisor/software/backup-data-icon.svg"
                      className="mb-5"
                      alt="data backup"
                    ></img>
                    <figcaption className="font-bold text-xs text-center">
                      BACKUP DATA
                    </figcaption>
                  </figure>
                </div>
                <Link href="https://www.dropbox.com/sh/mezbgitgnspr8zo/AACi3MciNLcTaCRNj0pLzhT5a?dl=0"passHref >
                  <a target="_blank">
                  <div className="p-3 rounded-md bg-white shadow-md cursor-pointer">
                  <figure className="flex flex-col items-center">
                    <img
                      src="/supervisor/software/review-data-security-plan-icon.svg"
                      className="mb-5"
                      alt="review data security plan"
                    ></img>
                    <figcaption className="font-bold text-xs text-center">
                      REVIEW DATA SECURITY PLAN
                    </figcaption>
                  </figure>
                </div>
                  </a>
                
                </Link>
                <Link href="https://www.dropbox.com/sh/2wi3kpyifi4zo9f/AAAw0h4tG8J1wXTgPPOZ8Qpza?dl=0" passHref>
                <a target="_blank">
                <div className="p-3 rounded-md bg-white shadow-md cursor-pointer">
                  <figure className="flex flex-col items-center">
                    <img
                      src="/supervisor/software/complete-incident-icon.svg"
                      className="mb-3"
                      alt="complete incident response checklist"
                    ></img>
                    <figcaption className="font-bold text-xs text-center">
                      COMPLETE INCIDENT RESPONSE CHECKLIST
                    </figcaption>
                  </figure>
                </div>
                </a>
                </Link>
                
                <div className="p-3 rounded-md bg-white shadow-md cursor-pointer" onClick={() => setUploadIncidentModal(!uploadIncidentModal)}>
                  <figure className="flex flex-col items-center">
                    <img
                      src="/supervisor/software/icon-backup-folder.svg"
                      className="mb-3"
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
      {uploadIncidentModal && (<UploadIncidentChecklistModal setUploadIncidentModal={setUploadIncidentModal}/>)}
    </>
  );
}
