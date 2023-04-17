import React from "react";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();
  return (
    
    <button
    onClick={() => router.back()}
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
        <p className="text-lg"> Back</p>
    </div>
    <div></div>
  </button>
  );
};

export default BackButton;
