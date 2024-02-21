import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import CondomsDistributionRowComponent from "../../../components/CondomsDistributionRowComponent";
/* import Styles from "../styles/ServiceAP.module.css";
import MSAStyles from "../styles/MSA.module.css"; */
import axios from "axios";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../../../components/BackButton";
import BackToDashboardButton from "../../../components/BackToDashboardButton";
import SubHeader from "../../../components/SubHeader";
import Link from "next/link";
import Loader from "../../../components/Loader";

const CondomsDistributedEdit = ({data}) => {
  const router = useRouter();
    // console.log("data", data)
  const [formData, setFormData] = useState({
    id: data?.id,
    date: data?.date?.split('T')[0],
    kitsDistributed: data?.kitsdistributed,
    extCondomsDistributed: data?.extcondomsdistributed,
    intCondomsDistributed: data?.intcondomsdistributed,
    oralCondomsDistributed: data?.oralcondomsdistributed,
    lubesDistributed: data?.lubesdistributed,
    dentalDamsDistributed: data?.dentaldamsdistributed,
    fingerCotsDistributed: data?.fingercotsdistributed,
    Men: data?.men,
    Women: data?.women,
    TransMen: data?.transmen,
    TransWomen: data?.transwomen,
    GenderNotSpecified: data?.gendernotspecified,
    Hispanic: data?.hispanic,
    AfricanAmerican: data?.africanamerican,
    Caucasian: data?.caucasian,
    Asian: data?.asian,
    RaceEthnicityNotSpecified: data?.raceethnicitynotspecified,
    Aged19_24: data?.aged19_24,
    Aged25_35: data?.aged25_35,
    Aged35_44: data?.aged35_44,
    Aged45: data?.aged45,
    AgeNotSpecified: data?.agenotspecified,
  });
  const [isSaving, setIsSaving] = useState(false)

  const notifyMessage = (status) => {
    if (status === 'ok') {
      toast.success("Form saved successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } 
    if (status === 'fail') {
      toast.error('Something went wrong try again',{
        position: toast.POSITION.TOP_CENTER,
      })
    }
    
  };
  const handleForm = () => {
    setIsSaving(true)

    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supplies_distributed`,
        formData
      )
      .then((data) => {

        if (data.status === 200) {

          notifyMessage('ok');
          setTimeout(() => {
            setIsSaving(false)

            router.back();
          }, 2500);
        }
        
      })
      .catch(function (error) {
        setIsSaving(false)
        notifyMessage('fail');

        console.log("error del server", error);
      });
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Layout>
      
        <SubHeader pageTitle={'Condoms Distribution'}>
        
        { <Link href="/condomsDistribution/pastEvents">
            <button className=" rounded bg-middle-purple text-center px-5 py-1 shadow-xl rounded-lg flex items-center block">
                    <img src="/search_icon.svg" alt="review past group event icon" width={27}/>
                    <p className="p-2 text-lg font-medium">
                    Review past condoms distributions
                    </p>
              </button>
          </Link>}
          </SubHeader> 

        <div className="bg-light-blue pt-5 shadow-inner h-100 pb-10">
          <section
            id="form"
            className="gap-x-5 shadow-lg bg-white  rounded p-5 mb-5 container mx-auto"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex gap-3 items-center ">
                <img
                  src="/condoms_distribution/Material_distributed.svg"
                  alt="material distribution icon"
                  title="material distributed"
                />
                <h3 className="font-bold text-3xl">Material Distributed</h3>
              </div>

              <div className="justify-self-end flex gap-x-5 items-end">
                <div>
                  <h3 className="font-bold text-lg">Date</h3>
                </div>
                <input
                  type="date"
                  name=""
                  id=""
                  value={formData?.date}
                  className="border-black rounded text-lg p-1 w-44"
                  onChange={(e) => {
                    setFormData({ ...formData, date: e.target.value });
                  }}
                />
              </div>
            </div>

            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Safe Sex kits distributed"}
              setFormData={setFormData}
              name={"kitsDistributed"}
              defaultValue={formData?.kitsDistributed}
            />

            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Condoms distributed outside of office"}
              setFormData={setFormData}
              name={"extCondomsDistributed"}
              defaultValue={formData?.extCondomsDistributed}
            />

            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Condoms distributed at LNE office"}
              setFormData={setFormData}
              name={"intCondomsDistributed"}
              defaultValue={formData?.intCondomsDistributed}
            />

            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Oral condoms distributed"}
              setFormData={setFormData}
              name={"oralCondomsDistributed"}
              defaultValue={formData?.oralCondomsDistributed}
            />

            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Lube satchets distributed"}
              setFormData={setFormData}
              name={"lubesDistributed"}
              defaultValue={formData?.lubesDistributed}
            />

            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Dental dams distributed"}
              setFormData={setFormData}
              name={"dentalDamsDistributed"}
              defaultValue={formData?.dentalDamsDistributed}
            />

            <div className="flex gap-3 items-center my-10">
              <img
                src="/condoms_distribution/People_seen.svg"
                alt="peolple seen icon"
                title="people seen"
              />
              <h3 className="font-bold text-3xl">People collecting safe sex resources</h3>
            </div>

            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Number of men seen"}
              setFormData={setFormData}
              name={"Men"}
              defaultValue={formData?.Men}
            />
            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Number of woman seen"}
              setFormData={setFormData}
              name={"Women"}
              defaultValue={formData?.Women}
            />
            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Number of trans men seen"}
              setFormData={setFormData}
              name={"TransMen"}
              defaultValue={formData?.TransMen}
            />
            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Number of trans woman seen"}
              setFormData={setFormData}
              name={"TransWomen"}
              defaultValue={formData?.TransWomen}
            />
            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Number of gender not specified seen"}
              setFormData={setFormData}
              name={"GenderNotSpecified"}
              defaultValue={formData?.GenderNotSpecified}
            />
            <hr className="my-4" />
            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Number of Hispanic seen"}
              setFormData={setFormData}
              name={"Hispanic"}
              defaultValue={formData?.Hispanic}
            />
            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Number of African-American seen"}
              setFormData={setFormData}
              name={"AfricanAmerican"}
              defaultValue={formData?.AfricanAmerican}
            />
            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Number of Caucasian seen"}
              setFormData={setFormData}
              name={"Caucasian"}
              defaultValue={formData?.Caucasian}
            />
            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Number of Asian seen"}
              setFormData={setFormData}
              name={"Asian"}
              defaultValue={formData?.Asian}
            />
            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Number of people race/ethnicity not specified seen"}
              setFormData={setFormData}
              name={"RaceEthnicityNotSpecified"}
              defaultValue={formData?.RaceEthnicityNotSpecified}
            />
            <hr className="my-4" />

            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Number of people aged 19-24 seen"}
              setFormData={setFormData}
              name={"Aged19_24"}
              defaultValue={formData?.Aged19_24}
            />
            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Number of people aged 25-34 seen"}
              setFormData={setFormData}
              name={"Aged25_35"}
              defaultValue={formData?.Aged25_35}
            />
            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Number of people aged 35-44 seen"}
              setFormData={setFormData}
              name={"Aged35_44"}
              defaultValue={formData?.Aged35_44}
            />
            <CondomsDistributionRowComponent
              bg={"extraLight"}
              title={"Number of people 45+ seen"}
              setFormData={setFormData}
              name={"Aged45"}
              defaultValue={formData?.Aged45}
            />
            <CondomsDistributionRowComponent
              bg={"light"}
              title={"Number of people age not specified seen"}
              setFormData={setFormData}
              name={"AgeNotSpecified"}
              defaultValue={formData?.AgeNotSpecified}
            />
          </section>

          <section id="save" className="my-5">
            <div className="container mx-auto flex justify-center">
            {!isSaving ? (
                <button
                className="grid grid-cols-3 w-60 text-medium items-center text-lg btn-yellow hover:btn-darkYellow px-4 py-2 rounded shadow-lg"
                onClick={() => handleForm()}
              >
                <img src="/client/Save.svg" alt="Save form icon" /> 
                Save
              </button>
            ) : (
              <Loader />
            )}
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default CondomsDistributedEdit;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
      let { id } = ctx.params;
      const  response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supplies_distributed/${id}`
      );
  
      const data = await  response.json();
      return { props: { data: data[0] } };
    },
});
