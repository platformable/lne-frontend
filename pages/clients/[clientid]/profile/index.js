import React from 'react'
import Layout from '../../../../components/Layout'
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function ClientProfilePage({data}) {
    console.log("data",data)
  return (
     <Layout>
    <div>Client Profile Page</div>
    </Layout>
  )
}


export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
    
     let {clientid} = ctx.params
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${clientid}`);

      const data = await res.json();
      return { props: { data } };
    },
  });