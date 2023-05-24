import { data } from "autoprefixer";
import React from "react";

export default function ColumnsTable2({ title, datapoints }) {
 console.log("datapoints", datapoints)
  return (
    <div className="border-2 border-black divide-y-2 divide-black ">
      <h4 className="px-3 py-2 font-medium">{title}</h4>
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
                 <p className="py-2 px-3">{item[0]}</p>

                {/* sum of numbers */}
                 <span className="py-2 text-center">{item[1]}</span>
               </div>
             ))}
         </div>
        )
        )}
      </div>
    </div>
  );
}
