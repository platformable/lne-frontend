import React, { useState, useEffect } from "react";

export default function KeyMetricsSoftware({ clients, averageNumbers }) {
  

  return (
    <div className="key-metrics grid grid-cols-1 gap-2 mx-3 md:mx-0">
      <div className="grid grid-cols-2 rounded shadow gap-9 bg-white py-2 px-5">
        <div className="flex">
          <img src="/supervisor/key-metrics.svg" />
          <h2 className="font-bold ml-3">Key Metrics</h2>
        </div>
        <div className="grid grid-rows-3 md:grid-rows-none md:grid-cols-3 gap-2 md:w-4/6 md:justify-self-end">
          <div className="flex items-center justify-end gap-2">
            <div className="px-4 text-center py-2 rounded bg-middle-green"></div>
            <span className="font-medium">on track</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <div className="px-4 text-center py-2 rounded bg-orange"></div>
            <span className="font-medium">warning</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <div className="px-4 text-center py-2 rounded bg-light-red"></div>
            <span className="font-medium">alert</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2  .bg-middle-white ">
        <div className="flex flex-col items-center  gap-2 p-4 bg-white rounded shadow-md">
          <p
            className={`bg-middle-green flex items-center justify-center text-2xl font-bold py-5 rounded w-full`}
          >
            {"1"}
          </p>
          <p className="bg-white text-center py-12 md:py-0 flex items-center justify-center font-semibold text-lg p-4 py-5">
          Days since last backup
          </p>
          <img src="/supervisor/avrg_of_days.svg" alt="" />
         
        </div>
        <div className="flex flex-col items-center  gap-2 p-4 bg-white rounded shadow-md">
          <p
            className={`bg-middle-green flex items-center justify-center text-2xl font-bold py-5 rounded w-full`}
          >
            {"0"}
          </p>
          <p className="bg-white text-center py-12 md:py-0 flex items-center justify-center font-semibold text-lg p-4">
          Security incidents or data breaches
          </p>
          <img src="/supervisor/number_active_clients.svg" alt="" />
          
        </div>
     

      </div>
    </div>
  );
}
