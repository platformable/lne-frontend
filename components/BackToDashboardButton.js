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
    className="bg-yellow hover:bg-blue-300 py-2 pl-5 pr-14 rounded text-black inline-block  flex  gap-x-5 items-center justify-start"
  >
    <img src="/dashboard_icon.svg" alt="" width={20} className="mr-5"/>
    Dashboard
  </button>
  )
}




