import React from 'react'

export default function DateRangeComponent({startDate, finishDate,updateFunction}) {
  return (
    <div>
        <div className="grid md:grid-cols-3 items-center bg-white px-5 py-5 my-5 shadow-md">
            <div>Choose range</div>
            <div>dates here</div>
            <button
  
    className="bg-yellow py-2 w-60 rounded px-5 items-center grid grid-cols-3 shadow-lg"
  >
    <svg
        width="20"
        height="20"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 6L9 12L15 18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="">
        <p className="text-lg"> Generate Report</p>
    </div>
    <div></div>
  </button>

        </div>
    </div>
  )
}
