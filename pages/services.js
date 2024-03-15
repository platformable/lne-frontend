import React, { useEffect, useState } from "react";
import backIcon from "../public/BACKicon.svg";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import ChartGraphic from "../components/ChartGraphic";
import ClientsEncounterCharts from "../components/ClientsEncounterCharts";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import ToogleButton from "../components/ToogleButton";
import BackToDashboardButton from "../components/BackToDashboardButton";
import BackButton from "../components/BackButton";
import KeyMetrics from "../components/KeyMetrics";

const Services = ({clients, msaFormsXClient, sapXClient, ProgressNotesXClient, clientSaps }) => {

 
  return (
    <Layout>
      <div className="bg-white">
        <section className="container mx-auto shadow-inner">
          <div className="py-5 flex gap-x-5">
            <BackButton />
            <BackToDashboardButton />
          </div>

          <div className="grid grid-cols-2 py-5">
            <h1 className="font-bold px-2">Manage Services</h1>
            <div className="flex justify-end self-end"></div>
          </div>
        </section>
        <section className="bg-light-blue py-10">
          <div className="container mx-auto grid-cols-1 gap-5">
            {/* KEY METRICS */}

            <KeyMetrics clients={clients} msaFormsXClient={msaFormsXClient} sapXClient={sapXClient} ProgressNotesXClient={ProgressNotesXClient} clientSaps={clientSaps}/>


        


            <h1 className="mb-4 my-10 container mx-auto text-center md:text-left lg:pl-0 font-bold">
              What do you want <span className="bg-yellow px-1"> to do</span>{" "}
              today?
            </h1>
            <div className="grid md:grid-cols-7 grid-cols-1 gap-5 px-5 md:px-0 pb-5 my-10">
              <div className="p-3 py-5 rounded-md bg-white shadow-md cursor-pointer">
                <Link href={"/monitorFunding"}>
                  <figure className="flex flex-col items-center">
                    <img
                      src="/supervisor/monitor_funding_requirements.svg"
                      className="mb-5"
                      alt="monitor STAFF PROGRESS"
                    ></img>
                    <figcaption className="font-bold  text-center">
                      Monitor <br/>
                      Funding <br/>
                      Requirements
                    </figcaption>
                  </figure>
                </Link>
              </div>
              <div className="p-3 py-5 rounded-md bg-white shadow-md cursor-pointer">
                <Link href={"/reports/funding-reports"}>
                  <figure className="flex flex-col items-center">
                    <img
                      src="/prepare_funding_report_icon.svg"
                      className="mb-5"
                      alt="monitor STAFF PROGRESS"
                    ></img>
                    <figcaption className="font-bold  text-center">
                      Prepare Funding <br/>
                      Report <br/>
                    
                    </figcaption>
                  </figure>
                </Link>
              </div>
            </div>
            {/* <div className="p-3 rounded-md bg-white shadow-md">
      <figure className="flex flex-col items-center">
        <img
          src="/supervisor/monitor-staff-progres.svg"
          className="mb-5"
          alt="monitor STAFF PROGRESS"
        ></img>
        <figcaption className="font-bold text-xs text-center">
          MONITOR STAFF PROGRESS
        </figcaption>
      </figure>
    </div> */}
            {/* <div className="p-3 rounded-md bg-white shadow-md">
      <figure className="flex flex-col items-center">
        <img
          src="/supervisor/monitor-impacts-icon.svg"
          className="mb-1"
          alt="monitor IMPACTS"
        ></img>
        <figcaption className="font-bold text-xs text-center">
          MONITOR IMPACTS
        </figcaption>
      </figure>
    </div> */}
            {/* <div className="p-3 rounded-md bg-white shadow-md">
      <figure className="flex flex-col items-center">
        <img
          src="/supervisor/monitor-quality-icon.svg"
          className="mb-5"
          alt="monitor QUALITY"
        ></img>
        <figcaption className="font-bold text-xs text-center">
          MONITOR QUALITY
        </figcaption>
      </figure>
    </div> */}
            {/*  <div className="p-3 rounded-md bg-white shadow-md">
      <figure className="flex flex-col items-center">
        <img
          src="/supervisor/plan-for-community-needs-icon.svg"
          className="mb-5"
          alt="monitor COMMUNITY NEEDS"
        ></img>
        <figcaption className="font-bold text-xs text-center">
          PLAN FOR COMMUNITY NEEDS
        </figcaption>
      </figure>
    </div> */}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Services;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const [clients, msaFormsXClient, sapXClient, ProgressNotesXClient, clientSaps] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`).then((r) =>
        r.json()
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/msa_forms`
      ).then((r) => r.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/monitor_funding/metrics/monitorFundingSap`
      ).then((r) => r.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/monitor_funding/metrics/monitorFundingProgressNotes`
      ).then((r) => r.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/monitor_funding/metrics/monitor_funding_allClients_Saps`
      ).then((r) => r.json()),
    ]);
    return {
      props: {
        clients,
        msaFormsXClient,
        sapXClient,
        ProgressNotesXClient,
        clientSaps
      },
    };
  },
});
