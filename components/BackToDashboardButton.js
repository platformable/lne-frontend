import React from 'react'
import { useRouter } from "next/router";

export default function BackToDashboardButton() {

    const router = useRouter();
  return (
    <button
    onClick={() => router.push('/dashboard')}
    className="bg-yellow hover:bg-blue-300 px-5 py-2 rounded text-black inline-block  flex items-center  gap-x-3"
  >
    <img src="/dashboard_icon.svg" alt="" />
    Back to homepage
  </button>
  )
}




