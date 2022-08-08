import React from "react";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="bg-yellow hover:bg-blue-300 px-5 py-2 rounded text-black inline-block  flex items-center font-black"
    >
      <svg
        width="24"
        height="24"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 6L9 12L15 18"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Back
    </button>
  );
};

export default BackButton;
