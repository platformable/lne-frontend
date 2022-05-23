import React from "react";
import Layout from "../../../../components/Layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Image from "next/image";

import infoIcon from "../../../../public/client/info-icon.svg"
import userIcon from "../../../../public/client/user-icon.svg"

import { useRouter } from "next/router";

export function getDate (string) {
    const date = new Date(string)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    const result = `${month}/${day}/${year}`
    return result
}


export default function ClientProfilePage({ data }) {
  console.log('data',data)

  const setLocaleDateString = (date) => {
     const fecha = Date.parse(date)
     const newDate=new Date(fecha).toLocaleDateString().replace('/”,“-').replace('/”,“-')
     const separatedDate=newDate.split('-')
     const finalDate=`${separatedDate[2]}-${separatedDate[1]?.length===1?`0${separatedDate[1]}`:separatedDate[1]}-${separatedDate[0]?.length===1?`0${separatedDate[0]}`:separatedDate[0]}`
     return finalDate
   }
  const clientJoinedDate = getDate(data[0].clientdatecreated)
  const cleanDate = setLocaleDateString(data[0].clientdatecreated)
  const { user, error, isLoading } = useUser();
  const loggedUserRole = user && user["https://lanuevatest.herokuapp.com/roles"];

  const router = useRouter()

  return (<>
    <Layout>
      <section id="client-profile-page-client-information" className="my-5">
      <h3 className="font-black text-center">Client Profile</h3>
      <div className="container mx-auto">
      <button 
        onClick={()=>router.push('/dashboard')}
        className="bg-black hover:bg-blue-300 px-5 py-1 rounded text-white inline-block text-xs mr-5 flex items-center">
        <svg className="mr-2" width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 12H8M8 12L11.5 15.5M8 12L11.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to dashboard
        </button>
        </div>
        <article className='container mx-auto border-2 border-blue-400 rounded-xl rounded-tl-none text-black md:grid md:grid-cols-2 font-bold shadow-xl'>
            
            <div className='grid  gap-2 font-semibold border-b border-b-blue-500 py-11 px-10 
             md:pl-7  md:border-b-0 md:border-r  md:border-r-blue-500 lg:pr-16'>
                    
                <div className='grid mt-4 grid-rows-2 md:flex md:items-center md:justify-between'>
                <p className="">Date Client Joined LNE</p>
                <p className='justify-self-end'>{clientJoinedDate}</p>
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
              
    </section>
    <section id="client-profile-page-navigation" className="mt-5 font-bold w-screen">
        <div className=" bg-light-blue  p-5 px-11 text-black ">
          <h1 className='py-3  text-center md:text-left md:pl-12 lg:pl-0 '>What do you want to do today?</h1>

          <div className="client-profile-page-navigation-container grid justify-center  mt-4
             text-center gap-8 md:grid-cols-3 md:border-0 lg:grid-cols-3 xl:grid-cols-6">

          </div>
        </div>
      </section>
      <section id="client-profile-page-navigation" className="my-5">
        <div className="container mx-auto bg-light-blue rounded-xl p-5">
          <div className="client-profile-page-navigation-container grid grid-cols-6 gap-5">
            {loggedUserRole==="DES" ? (
              <Link href={data[0]?.msa_form_id ?`/clients/${data[0]?.clientid}/msa_form/des_msa_form_edit`:`/clients/${data[0]?.clientid}/msa_form`}>
              <div className="client-profile-page-navigation-icon-container boder-dark-blue bg-white cursor-pointer rounded-xl py-2 px-5 inline-block">
              <div className="flex justify-center">
              <svg width="64" height="84" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 21.4V2.6C4 2.26863 4.26863 2 4.6 2H16.2515C16.4106 2 16.5632 2.06321 16.6757 2.17574L19.8243 5.32426C19.9368 5.43679 20 5.5894 20 5.74853V21.4C20 21.7314 19.7314 22 19.4 22H4.6C4.26863 22 4 21.7314 4 21.4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 10L16 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 18L16 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 14L12 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              </div>
              <h4 className="text-center">
                {data[0]?.msa_form_id ===undefined || data[0]?.msa_form_id==="" || data[0]?.msa_form_id===null ? (`Create MSA Form`) : 'Edit MSA Form' }
              </h4>
              </div>
              </Link>
            ):
            (
              <Link href={data[0]?.msa_form_id ?`/clients/${data[0]?.clientid}/msa_form/edit`:`/clients/${data[0]?.clientid}/msa_form`}>
              <div className="client-profile-page-navigation-icon-container boder-dark-blue bg-white cursor-pointer rounded-xl py-2 px-5 inline-block">
              <div className="flex justify-center">
              <svg width="64" height="84" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 21.4V2.6C4 2.26863 4.26863 2 4.6 2H16.2515C16.4106 2 16.5632 2.06321 16.6757 2.17574L19.8243 5.32426C19.9368 5.43679 20 5.5894 20 5.74853V21.4C20 21.7314 19.7314 22 19.4 22H4.6C4.26863 22 4 21.7314 4 21.4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 10L16 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 18L16 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 14L12 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              </div>
              <h4 className="text-center">
                {data[0]?.msa_form_id ===undefined || data[0]?.msa_form_id==="" || data[0]?.msa_form_id===null ? (`Create MSA Form`) : 'Edit MSA Form' }
              </h4>
              </div>
              </Link>
            )
            }

            
            
         

            {data[0]?.airsintakeform==="1" && data[0]?.comprehensiveriskbehaviorassessment==="1" ? 
           <Link href={data[0].serviceactionplan==="0" ?`/clients/${data[0]?.clientid}/service-action-plan` : `/clients/${data[0]?.clientid}/service-action-plan/edit`}>
           <div className="client-profile-page-navigation-icon-container boder-dark-blue bg-white cursor-pointer rounded-xl py-2 px-5 inline-block">
           
           <div className="flex justify-center">
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
           <h4 className="text-center">
           {data[0]?.serviceactionplan ==="0" ? "Create Service Action Plan" : `View Service Action Plan`}
           </h4>
         </div>
         </Link>  
          :""}
           
            
          </div>
        </div>
          
      </section>
    </Layout>

    
  

</>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    let { clientid } = ctx.params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/clients/${clientid}/profile`
    );

    const data = await res.json();
    return { props: { data } };
  },
});
