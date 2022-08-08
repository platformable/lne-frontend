import React from 'react'
import { useRouter } from "next/router";
const router = useRouter();

export default function BackToDashboardButton() {

    const router = useRouter();
  return (
    <button
    onClick={() => router.push('/dashboard')}
    className="bg-yellow hover:bg-blue-300 px-5 py-2 rounded text-black inline-block text-xs flex items-center font-black"
  >
    <img src="/dashboard_icon.svg" alt="" />
    Back to homepage
  </button>
  )
}




