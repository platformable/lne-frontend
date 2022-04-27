import React from 'react'
import Layout from '../../../../components/Layout'
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function ClientProfilePage({data}) {
    console.log("data",data)
  return (
     <Layout>
         <div className="container mx-auto my-5">
    <h3 className="font-black">Client Profile Page</h3>
    <h3>Client Name: {data[0].clientfirstname}</h3>
    <h3>Client Lastname: {data[0].clientlastname}</h3>
    </div>
    </Layout>
  )
}


export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
    
     let {clientid} = ctx.params
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients/${clientid}`);

      const data = await res.json();
      return { props: { data } };
    },
  });