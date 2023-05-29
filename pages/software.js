import React, { useState } from "react";
import BackupDataModal from "../components/BackupDataModal";
import SubHeader from "../components/SubHeader";
import backIcon from "../public/BACKicon.svg";
import Image from "next/image";
import Layout from "../components/Layout";
import Link from "next/link";
import UploadIncidentChecklistModal from "../components/UploadIncidentChecklistModal";
import BackToDashboardButton from '../components/BackToDashboardButton'
import BackButton from '../components/BackButton'
import KeyMetricsSoftware from '../components/KeyMetricsSoftware'

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
        
        <SubHeader pageTitle={"Manage Software"} />
          <section id="dashboard-client-list" className="">
            <div className="container mx-auto py-10">

            <KeyMetricsSoftware />



             
              <h1 className="my-10 container mx-auto text-center md:text-left  lg:pl-0 font-bold">
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
