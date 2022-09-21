import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import CondomsDistributionRowComponent from "../components/CondomsDistributionRowComponent";
import Styles from "../styles/ServiceAP.module.css";
import MSAStyles from "../styles/MSA.module.css";
import axios from "axios";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../components/BackButton";
import BackToDashboardButton from "../components/BackToDashboardButton";

const CondomsDistributed = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    kitsDistributed: "0",
    extCondomsDistributed: "0",
    intCondomsDistributed: "0",
    oralCondomsDistributed: "0",
    lubesDistributed: "0",
    dentalDamsDistributed: "0",
    fingerCotsDistributed: "0",
    Men: "0",
    Women: "0",
    TransMen: "0",
    TransWomen: "0",
    GenderNotSpecified: "0",
    Hispanic: "0",
    AfricanAmerican: "0",
    Caucasian: "0",
    Asian: "0",
    RaceEthnicityNotSpecified: "0",
    Aged19_24: "0",
    Aged25_35: "0",
    Aged35_44: "0",
    Aged45: "0",
    AgeNotSpecified: "0",
  });

  const notifyMessage = () => {
    toast.success("Form saved successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleForm = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supplies_distributed`,
        formData
      )
      .then((data) => {
        notifyMessage();
        setTimeout(() => {
          router.back();
        }, 1500);
        router.back();
      })
      .catch(function (error) {
        console.log("error del server", error);
      });
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Layout>
        <div className="container mx-auto my-10">
          <div className="flex gap-x-5">
              <BackButton />
              <BackToDashboardButton />
              </div>
          <h1 className="font-black  my-5">
            Condoms distributed
          </h1>

          <div className="flex gap-x-5 items-center">
            <div>
              <h3 className="font-black">Date</h3>
            </div>
            <input
              type="date"
              name=""
              id=""
              value={formData?.date}
              className="border-dark-blue rounded p-1"
              onChange={(e) => {
                setFormData({ ...formData, date: e.target.value });
              }}
            />
          </div>
        </div>

        <main className="container mx-auto">
          <section
            id="form"
            className="gap-x-5 border-dark-blue rounded-xl p-5 mb-5"
          >
            <h3 className="text-dark-blue font-black">Material Distributed</h3>

            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Safe Sex kits distributed"}
              setFormData={setFormData}
              name={"kitsDistributed"}
            />

            <CondomsDistributionRowComponent
              bg={"light"}
              title={"External condoms distributed"}
              setFormData={setFormData}
              name={"extCondomsDistributed"}
            />

            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Internal condoms distributed"}
              setFormData={setFormData}
              name={"intCondomsDistributed"}
            />

            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Oral condoms distributed"}
              setFormData={setFormData}
              name={"oralCondomsDistributed"}
            />

            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Lube satchets distributed"}
              setFormData={setFormData}
              name={"lubesDistributed"}
            />

            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Dental dams distributed"}
              setFormData={setFormData}
              name={"dentalDamsDistributed"}
            />

            <h3 className="text-dark-blue font-black">People collecting safe sex resources</h3>

            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Men"}
              setFormData={setFormData}
              name={"Men"}
            />
            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Women"}
              setFormData={setFormData}
              name={"Women"}
            />
            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Trans men"}
              setFormData={setFormData}
              name={"TransMen"}
            />
            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Trans women"}
              setFormData={setFormData}
              name={"TransWomen"}
            />
            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"People accessing resources (gender not-specified)"}
              setFormData={setFormData}
              name={"GenderNotSpecified"}
            />
            <hr className="my-4"/>
            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Hispanic people"}
              setFormData={setFormData}
              name={"Hispanic"}
            />
            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"African-American people "}
              setFormData={setFormData}
              name={"AfricanAmerican"}
            />
            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Caucasian people"}
              setFormData={setFormData}
              name={"Caucasian"}
            />
            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Asian people"}
              setFormData={setFormData}
              name={"Asian"}
            />
            <CondomsDistributionRowComponent
              bg={"light"}
              title={"People accessing resources (race/ethnicity not specified)"}
              setFormData={setFormData}
              name={"RaceEthnicityNotSpecified"}
            />
            <hr className="my-4" />

            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"People aged 19-24"}
              setFormData={setFormData}
              name={"Aged19_24"}
            />
            <CondomsDistributionRowComponent
              bg={"light"}
              title={"People aged 25 - 34"}
              setFormData={setFormData}
              name={"Aged25_35"}
            />
            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"People aged 35 - 44"}
              setFormData={setFormData}
              name={"Aged35_44"}
            />
            <CondomsDistributionRowComponent
              bg={"light"}
              title={"People 45+"}
              setFormData={setFormData}
              name={"Aged45"}
            />
            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"People accessing resources (age not specified)"}
              setFormData={setFormData}
              name={"AgeNotSpecified"}
            />
          </section>

          <section id="save" className="my-5">
            <div className="container mx-auto flex justify-center">
              <button
                className="flex items-center gap-x-2 bg-blue-500 hover:bg-blue-300 px-5 py-1 rounded text-white inline-block  mr-5"
                onClick={() => handleForm()}
              >
                <img
                  src="/check-save-and-finish.svg"
                  alt="check and save icon"
                />
                Save
              </button>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default CondomsDistributed;

export const getServerSideProps = withPageAuthRequired({
  /* async getServerSideProps(ctx) {
      let { clientid } = ctx.params;
      const  response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/${clientid}`
      );
  
      const data = await  response.json();
      return { props: { data } };
    }, */
});
