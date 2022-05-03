import React from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default function ClientProfilePage({ data }) {
  console.log("data", data);
  return (
    <Layout>
      <section id="client-profile-page-client-information" className="my-5">
      <h3 className="font-black text-center">Client Profile</h3>
        <div className="container mx-auto my-5 grid grid-cols-2 gap-5">

    <div className="text-center"> 
          <h3>Client Name: {data[0].clientfirstname}</h3>
          <h3>Client Lastname: {data[0].clientlastname.charAt(0)}</h3>
          </div>
          <div className="text-center">
          <h3>HCW Name: {data[0].clienthcwlastname}</h3>
          <h3>HCW Lastname: {data[0].clienthcwname}</h3>
          </div>
        </div>
      </section>
      <section id="client-profile-page-navigation" className="my-5">
        <div className="container mx-auto bg-light-blue rounded-xl p-5">
          <div className="client-profile-page-navigation-container">
            <Link href={`/clients/${data[0].clientid}/service-action-plan`}><div className="client-profile-page-navigation-icon-container boder-dark-blue bg-white cursor-pointer rounded-xl py-2 px-5 inline-block">
              <h4 className="text-center">
                Service <br /> Action Plan
              </h4>
              <svg
                width="64"
                height="84"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 21.4V2.6C4 2.26863 4.26863 2 4.6 2H16.2515C16.4106 2 16.5632 2.06321 16.6757 2.17574L19.8243 5.32426C19.9368 5.43679 20 5.5894 20 5.74853V21.4C20 21.7314 19.7314 22 19.4 22H4.6C4.26863 22 4 21.7314 4 21.4Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 10L16 10"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 18L16 18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 14L12 14"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid } = ctx.params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/${clientid}`
    );

    const data = await res.json();
    return { props: { data } };
  },
});
