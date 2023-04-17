import React from 'react'
import BackButton from './BackButton'
import BackToDashboardButton from './BackToDashboardButton'
import Link from "next/link";
import { useRouter } from "next/router";


function SubHeader({pageTitle,sap,supportGroup,children}) {

  const router = useRouter();
  return (
    <section className="bg-white  pt-10 pb-3" id="subheader">
    <div className="container mx-auto">
      <div className="flex gap-x-3">
        <BackButton />
        <BackToDashboardButton />
      </div>

      <div className="flex items-center justify-between pt-10">


      <h1 className="font-bold text-4xl">{pageTitle}</h1>
      
      <div className="flex gap-x-5">
      {children}

      </div>
     
      {/* {
          sap ? (
            <button
                onClick={() =>
                  router.push(
                    `/clients/${data.client[0].clientid}/service-action-plan`
                  )
                }
                className="blue-btn hover:bg-blue-300 px-3 py-2 rounded text-black inline-block  flex items-center gap-x-3"
              >
                <img src="/sap/create_service_action_plan_icon.svg" alt="" width={24}/>
                Create Service Action Plan
              </button>
          ) :null
        }


        {
          supportGroup ? (
            <Link href="/supportGroups/pastEvents">
            <button className=" rounded bg-middle-purple text-center px-5 py-1 shadow-xl rounded-lg flex items-center block">
                    <img src="/supervisor/support_groups_icon.svg" alt="condoms distribution icon" width={18}/>
                    <p className="p-2 text-base">
                    Review past group events
                    </p>
              </button>
          </Link>
          ): null
        } */}

  

      </div>
{/*  */}
  </div>
  </section>
  )
}

export default SubHeader