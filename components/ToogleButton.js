import React, { useRef, useState } from "react";

const ToogleButton = ({ dataGraphicPeriod, setDataGraphicPeriod }) => {
  const toogleRef = useRef();

  const handleToogle = () => {
    toogleRef.current.innerText === "Month"
      ? (toogleRef.current.innerText = "Year")
      : (toogleRef.current.innerText = "Month");

    setDataGraphicPeriod(toogleRef.current.innerText);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <label htmlFor="toggleB" className="flex items-center cursor-pointer">
        <div className="mr-3 text-gray-700 font-medium">Data for the:</div>
        <div className="relative">
          <input
            type="checkbox"
            id="toggleB"
            className="button-toogle sr-only"
            onChange={(e) => handleToogle(e)}
          />
          <div className="flex justify-around items-center bg-gray-200 w-32 h-8 text-gray-500 font-semibold rounded-xl text-sm">
            <p>Month</p>
            <p>Year</p>
          </div>
          <div
            ref={toogleRef}
            className="dot absolute left-0 top-0 bg-black w-16 h-8 text-center font-semibold leading-8 text-white rounded-xl transition"
          >
            Month
          </div>
        </div>
      </label>
    </div>
  );
};

export default ToogleButton;
