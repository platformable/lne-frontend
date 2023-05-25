import { data } from "autoprefixer";
import React from "react";

export default function ColumnsTable2({ title, datapoints }) {

  return (
    <div className="border-2 border-black divide-y-2 divide-black my-10">
      <div className="bg-gray-100"><h4 className="px-3 py-2 font-bold text-lg">{title}</h4></div>
      <div className="grid grid-cols-2 divide-x-2  divide-black">
        {datapoints && [[0, Math.ceil(datapoints.length / 2)], [Math.ceil(datapoints.length / 2)]].map((part, index) => (
           <div className="divide-y-2 divide-black" key={index}>
           {
             datapoints.slice(...part).map((item, i) => (
               <div
                 key={index * i}
                 className="grid divide-x-2  divide-black grid-cols-[5fr_1fr] "
               >
                {/* row title */}
                 <p className="py-2 px-3">{item[1].title}</p>

                {/* sum of numbers */}
                 <span className="py-2 text-center">{item[1].number}</span>
               </div>
             ))}
         </div>
        )
        )}
      </div>
    </div>
  );
}
