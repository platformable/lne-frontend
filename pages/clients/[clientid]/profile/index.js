import React from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Image from "next/image";

import infoIcon from "../../../../public/client/info-icon.svg"
import userIcon from "../../../../public/client/user-icon.svg"
import itemMenuActionsImg from "../../../../public/client/item-menu-actions.svg"



export default function ClientProfilePage({ data }) {
  console.log("data", data);
  return (
    <Layout>
      <section id="client-profile-page-client-information" className="my-10 container mx-auto px-8 md:px-12 lx:px-4 ">
        <div className='user-box-container p-3 flex justify-around items-center  font-bold'>
              <Image src={userIcon} className="mr-4"></Image>
              <p className='text-blue-500'>{data[0].clientid}</p>
        </div>
        <article className='container mx-auto border-2 border-blue-400 rounded-xl rounded-tl-none text-black md:grid md:grid-cols-2 font-bold shadow-xl'>
            
            <div className='grid  gap-2 font-semibold border-b border-b-blue-500 py-11 px-10 
             md:pl-7  md:border-b-0 md:border-r  md:border-r-blue-500 lg:pr-16'>
                    
                <div className='grid mt-4 grid-rows-2 md:flex md:items-center md:justify-between'>
                <p className="">Date Client Joined LNE</p>
                <p className='justify-self-end'>MM/DD/YY</p>
                </div>
                <hr className='border-blue-400'></hr>
                
                <div className='grid grid-rows-2 md:flex md:items-center md:justify-between'>
                <p  className="">Date Of Last Action</p>
                <p className='justify-self-end'>MM/DD/YY</p>
                </div>
                <hr className='border-blue-400 hidden md:block'></hr>

            </div>
            
            <div className='py-10 pl-4 md:pl-10  grid grid-rows-3 gap-5 items-center justify-items-start'>
                <div className='flex'>
                    <Image src={infoIcon} ></Image>
                    <p className='px-4 '>You need to complete x form</p>
                </div>
                <div className='flex'>
                    <Image src={infoIcon} ></Image>
                    <p className='px-4'>Service action plan (reminders)</p>
                </div>
                <div className='flex'>
                    <Image src={infoIcon} ></Image>
                    <p className='px-4'>Tickler style updates</p>
                </div>
            </div>   
        </article>
                {/* <div className="container mx-auto my-5 grid grid-cols-2 gap-5">

            <div className="text-center"> 
                  <h3>Client: {data[0].clientfirstname}{' '}{data[0].clientlastname.charAt(0)}</h3>
                  
                  </div>
                  <div className="text-center">
                  <h3>HCW:{data[0].clienthcwname}{' '} {data[0].clienthcwlastname}</h3>

                  </div>
                </div> */}
      </section>
      <section id="client-profile-page-navigation" className="mt-5 font-bold w-screen">
          
        <div className='text-black bg-light-blue py-12 px-10 md:px-0 lg:px-9 xl:px-20 w-full'>
            <h1 className='p-3  text-center md:text-left md:pl-12 lg:pl-4 '>What do you want to do today?</h1>
            <ul className='grid justify-center  mt-4
             text-center gap-8 md:grid-cols-3 md:border-0 lg:grid-cols-3 xl:grid-cols-6'>

                <li className=''>
                    <Link href={`/clients/${data[0].clientid}/service-action-plan`}>
                      <div className="w-36 shadow-2xl client-profile-page-navigation-icon-container boder-dark-blue bg-white cursor-pointer rounded-xl p-2 inline-block">
                        <Image src={itemMenuActionsImg}></Image>
                        <h6 className="text-center">
                          MSA <br /> DOCUMENTATION
                        </h6>
                      </div>
                    </Link>
                </li>

                <li className=''>
                    <Link href={`/clients/${data[0].clientid}/service-action-plan`}>
                      <div className="w-36 shadow-2xl client-profile-page-navigation-icon-container boder-dark-blue bg-white cursor-pointer rounded-xl py-2 px-5 inline-block">
                        <Image src={itemMenuActionsImg}></Image>
                        <h6 className="text-center">
                          IMPACT <br /> TRACKING
                        </h6>
                      </div>
                    </Link>
                </li>

                <li className=' '>
                    <Link href={`/clients/${data[0].clientid}/service-action-plan`}>
                      <div className="w-36 shadow-2xl client-profile-page-navigation-icon-container boder-dark-blue bg-white cursor-pointer rounded-xl py-2 px-5 inline-block">
                        <Image src={itemMenuActionsImg}></Image>
                        <h6 className="text-center">
                          ADD A <br /> PROGRESS NOTE
                        </h6>
                      </div>
                    </Link>
                </li>

                <li className=''>
                    <Link href={`/clients/${data[0].clientid}/service-action-plan`}>
                      <div className="w-36 shadow-2xl client-profile-page-navigation-icon-container boder-dark-blue bg-white cursor-pointer rounded-xl py-2 px-5 inline-block">
                        <Image src={itemMenuActionsImg}></Image>
                        <h6 className="text-center">
                          SERVICE <br /> ACTION PLAN
                        </h6>
                      </div>
                    </Link>
                </li>

                <li className=''>
                    <Link href={`/clients/${data[0].clientid}/service-action-plan`}>
                      <div className="w-36 shadow-2xl client-profile-page-navigation-icon-container boder-dark-blue bg-white cursor-pointer rounded-xl py-2 px-5 inline-block">
                        <Image src={itemMenuActionsImg}></Image>
                        <h6 className="text-center">
                          AIRS <br /> FORMS
                        </h6>
                      </div>
                    </Link>
                </li>
                
                <li className=''>
                    <Link href={`/clients/${data[0].clientid}/service-action-plan`}>
                      <div className="w-36 shadow-2xl client-profile-page-navigation-icon-container boder-dark-blue bg-white cursor-pointer rounded-xl py-2 px-5 inline-block">
                        <Image src={itemMenuActionsImg}></Image>
                        <h6 className="text-center">
                          LNE <br /> FORMS
                        </h6>
                      </div>
                    </Link>
                </li>
            </ul>
        </div>
          
          
          {/* <div className="client-profile-page-navigation-container">
            <Link href={`/clients/${data[0].clientid}/service-action-plan`}><div className="client-profile-page-navigation-icon-container boder-dark-blue bg-white cursor-pointer rounded-xl py-2 px-5 inline-block">
              <h4 className="text-center">
                Service <br /> Action Plan
              </h4>
              
            </div>
            </Link>
          </div> */}
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
