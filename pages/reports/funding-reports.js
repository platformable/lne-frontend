import React, { useEffect, useState } from "react";

import Link from "next/link";

import Layout from "../../components/Layout";

import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

import BackToDashboardButton from "../../components/BackToDashboardButton";
import BackButton from "../../components/BackButton";


import Textarea from "../../components/Textarea";
import ColumnsTable2 from '../../components/2ColumnsTable'
import ThreeColumnsTable from '../../components/ThreeColumnsTable'
import DateRangeComponent from "../../components/DateRangeComponent";

const fundingReport = ({ clients, progressNotes,condomsDistributed,supportGroups }) => {
  
  return (
    <Layout>
      <div className="bg-white">
        <section className="container mx-auto shadow-inner">
          <div className="py-5 flex gap-x-5">
            <BackButton />
            <BackToDashboardButton />
          </div>

          <div className="grid grid-cols-2 py-5">
            <h1 className="font-bold px-2">Prepare Funding Reports</h1>
            <div className="flex justify-end self-end"></div>
          </div>
        </section>
   
      </div>


      <section className="my-10">
          <div className="container mx-auto grid-cols-1 gap-5">

        <DateRangeComponent />    
      
      <Textarea service={'Assitance with Benefits/Etitlements'}/>

      <ColumnsTable2 />
      <ThreeColumnsTable />


           
          </div>
        </section>
    </Layout>
  );
};

export default fundingReport;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const [clients, progressNotes,supportGroups,condomsDistributed] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`).then((r) =>
        r.json()
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/progress_notes`
      ).then((r) => r.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/support_groups`
      ).then((r) => r.json()),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supplies_distributed`
      ).then((r) => r.json()),
    ]);
    return { props: { clients: clients, progressNotes: progressNotes,supportGroups:supportGroups,condomsDistributed:condomsDistributed } };
  },
});
