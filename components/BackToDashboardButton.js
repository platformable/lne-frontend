import React from 'react'
import { useRouter } from "next/router";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function BackToDashboardButton() {

  const { user, error, isLoading } = useUser();
  const loggedUserRole = user && user["https://lanuevatest.herokuapp.com/roles"];
    const router = useRouter();
  return (
    <button
    onClick={() => loggedUserRole==='Supervisor' ?router.push('/supervisorDashboard') :router.push('/dashboard')}
    className="bg-yellow hover:bg-blue-300 px-5 py-1.5 rounded text-black inline-block  flex items-center  gap-x-3"
  >
    <img src="/dashboard_icon.svg" alt="" width={20}/>
    Dashboard
  </button>
  )
}




