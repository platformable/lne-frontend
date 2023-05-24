import React from "react";

export default function Textarea({ data, service }) {
  return (
    <>
      <label
        for="message"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {`Here are all services narrratives for ${service} so that you can write a summary`}
      </label>
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm  bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder=""
      >{data}</textarea>
    </>
  );
}
