import React from 'react'
import Link from 'next/link'

export default function DashboardClientCard({client}) {
  return (
    <div className="dashboard-clients-box">
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm ">
      <div className="grid  dashboard-card-name-box gap-1 ">
        <svg
          width="24"
          height="24"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          xmlns="http://www.w3.org/2000/svg"
          className="font-black"
        >
          <path
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M4.271 18.3457C4.271 18.3457 6.50002 15.5 12 15.5C17.5 15.5 19.7291 18.3457 19.7291 18.3457"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <h5 className="text-gray-900 text-xl leading-tight font-black">
          {client.clientfirstname}{' '}{client.clientlastname}
        </h5>
      </div>
      
      <div className="grid dashboard-card-name-box gap-1 my-2">
        <svg
          width="24"
          height="24"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="font-black"
          stroke="black"
        >
          <path
            d="M2 9V5.6C2 5.26863 2.26863 5 2.6 5H21.4C21.7314 5 22 5.26863 22 5.6V9V18.4C22 18.7314 21.7314 19 21.4 19H2.6C2.26863 19 2 18.7314 2 18.4V9ZM2 9H16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <rect
            x="15"
            y="12"
            width="4"
            height="4"
            rx="0.6"
            fill="currentColor"
          />
        </svg>
        <p className=""><span className="font-black">Id:</span> {client.clientid}</p>
      </div>
      <div className="grid dashboard-card-name-box gap-1">
      <svg stroke="black" className="font-black" width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path strokeWidth="2" d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path strokeWidth="2" d="M3 10V6C3 4.89543 3.89543 4 5 4H7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path strokeWidth="2" d="M7 2V6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path strokeWidth="2" d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
        <p className=""><span className="font-black">Created:</span> 21/04/22</p>
      </div>
      <div className="grid dashboard-card-name-box gap-1 my-2">
        <svg
          width="24"
          height="24"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="font-black"
          stroke="black"
        >
          <path
            d="M2 9V5.6C2 5.26863 2.26863 5 2.6 5H21.4C21.7314 5 22 5.26863 22 5.6V9V18.4C22 18.7314 21.7314 19 21.4 19H2.6C2.26863 19 2 18.7314 2 18.4V9ZM2 9H16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <rect
            x="15"
            y="12"
            width="4"
            height="4"
            rx="0.6"
            fill="currentColor"
          />
        </svg>
        <p className=""><span className="font-black">HCW Id:</span> {client.clienthcwid.slice(-4)}</p>
      </div>

      <a href={`/clients/${client.clientid}`}><Link href={`/clients/${client.clientid}/profile/`}><button
        type="button"
        className="mt-5 inline-block px-6 py-1 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Client profile
      </button>
      </Link>
      </a>
    </div>
  </div>
  )
}
