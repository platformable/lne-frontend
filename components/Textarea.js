import React from "react";

export default function Textarea({ data, service,stateValue }) {

  const finalTitle= <p className="text-xl">Here are all services narrratives for <strong>{service}</strong> so that you can write a summary: </p>
  return (
    <>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-5 text-xl"
      >
        {finalTitle}
      </label>
      <div
        id="message"

        className="table-list reportTextarea block p-2.5 w-full text-sm  bg-blue-50 rounded-lg border border-gray-300  "
      >
      {data?.map((summary,index)=>summary[stateValue]===0 || summary[stateValue]=== '0' ? 'N/A' :<ul key={index}><li className="my-5">{summary[stateValue]}</li></ul>)}
      </div>
    </>
  );
}
