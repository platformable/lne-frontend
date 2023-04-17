import React, { useState } from "react";
import BackupDataModal from "../components/BackupDataModal";
import backIcon from "../public/BACKicon.svg";
import Image from "next/image";
import Layout from "../components/Layout";
import Link from "next/link";
import UploadIncidentChecklistModal from "../components/UploadIncidentChecklistModal";
import BackToDashboardButton from '../components/BackToDashboardButton'
import BackButton from '../components/BackButton'

export default function Software() {
  const [dataBackup, setDataBackup] = useState(false);
  const  [uploadIncidentModal, setUploadIncidentModal] = useState(false);
  
  return (
    <>
      <Layout>
      {/* <section className="bg-yellow grid text-center justify-center items-center py-10">

      <h3 className="font-bold uppercase">UNDER DEVELOPMENT</h3>
        <p>
These sections are in current development and are on the August - December 2022 Roadmap for feature enhancement.
</p>

</section> */}
        <section className="bg-light-blue md:h-screen">
          <div className="container mx-auto pt-10">
          <div className="flex gap-x-3">
            <BackButton />
            <BackToDashboardButton/>
          </div>

            <div className="grid grid-cols-2 py-5">
              <h1 className="font-bold px-2">Manage Software</h1>

              <div className="flex justify-end self-end">
          </div>
            </div>
          </div>
          <section id="dashboard-client-list">
            <div className="container mx-auto py-5">
              <section className=" border-2 border-white shadow mb-10">
                <div className="supervisor-dashboard-top-container  px-5 py-1 mb-1 bg-white">
                  <div className="supervisor-dashboard-top  grid md:grid-cols-2  grid-cols-1">
                    <div>
                      <h1 className="font-bold my-2">
                      Key metrics
                      </h1>
                    </div>
                    <div className="flex wrap justify-end items-center">
                      <div className="px-5 py-1 h-4/6 bg-middle-green w-40 mr-2 flex items-center justify-center">
                        on-track
                      </div>
                      <div className="px-5 py-1 h-4/6 bg-orange w-40 mr-2 flex items-center justify-center">
                        warning
                      </div>
                      <div className="px-5 py-1 h-4/6 bg-light-red w-40 flex items-center justify-center">
                        alert
                      </div>
                    </div>
                  </div>
                </div>
                <div className="supervisor-dashboard-top-bottom grid md:grid-cols-4 grid-cols-1 gap-1 bg-white">
                  <div className="supervisor-dashboard-top-bottom-box bg-white grid items-center">
                    <div className="px-4 flex py-5">
                      <img src="./supervisor/software/icon-backup-folder.svg"></img>
                      <p className="font-semibold text-lg  ml-3">
                        Days since last backup
                      </p>
                    </div>
                    <h1 className="w-full text-center font-bold py-5 bg-middle-green">
                      1
                    </h1>
                  </div>
                  <div className="supervisor-dashboard-top-bottom-box bg-white ">
                    <div className="px-4 flex py-5">
                      <img src="./supervisor/software/icon-security-incidents-folder.svg"></img>
                      <p className="font-semibold text-lg  ml-3">
                        Security incidents or data breaches
                      </p>
                    </div>
                    <h1 className="text-center font-bold py-5 bg-middle-green">
                      0
                    </h1>
                  </div>
                </div>
              </section>
              <h1 className="my-5 container mx-auto text-center md:text-left  lg:pl-0 font-bold">
                What do you want <span className="bg-yellow px-1"> to do</span>{" "}
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
                <Link href="https://www.dropbox.com/sh/bul54s5xa4qf7p3/AADykEZbJ41VOgOHcYRPt8I0a?dl=0"passHref >
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
                <Link href="https://www.dropbox.com/sh/lda1yph0sfzxz60/AAB0CdrliTfs9bg5gHqQndmAa?dl=0" passHref>
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
