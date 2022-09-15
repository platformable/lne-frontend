import React from "react";

const Tabla = ({clientBaselineTracking}) => {
    const impactTracking = {
        impactFormStartDate: null,
        barrierHIVPrimaryCare: null,
        viralLoadCount: null,
        CD4Count: null,
        unsafeSexualBehavior: null,
        substanceAbuse: null,
        legalIssues: null,
        unstableEmployment: null,
        unstableHousing: null,
    }
  return (
    <>
    <div className="overflow-x-auto mx-auto container  shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                Key outcomes
                </th>
                <th scope="col" className="py-3 px-6">
                Baseline scores
                </th>
                <th scope="col" className="py-3 px-6">
                Date: 1 September
                </th>
                {clientBaselineTracking && clientBaselineTracking.map((header, index) => (
              <>
                <th scope="col" classNameName="py-3 px-6">
                Date: {header.date}
                </th>
              </>
            ))}
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td className="py-4 px-6">
                    Sliver
                </td>
                <td className="py-4 px-6">
                    Laptop
                </td>
                <td className="py-4 px-6">
                    $2999
                </td>
                <td className="py-4 px-6">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="py-4 px-6">
                    White
                </td>
                <td className="py-4 px-6">
                    Laptop PC
                </td>
                <td className="py-4 px-6">
                    $1999
                </td>
                <td className="py-4 px-6">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium  whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="py-4 px-6">
                    Black
                </td>
                <td className="py-4 px-6">
                    Accessories
                </td>
                <td className="py-4 px-6">
                    $99
                </td>
                <td className="py-4 px-6">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Google Pixel Phone
                </th>
                <td className="py-4 px-6">
                    Gray
                </td>
                <td className="py-4 px-6">
                    Phone
                </td>
                <td className="py-4 px-6">
                    $799
                </td>
                <td className="py-4 px-6">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple Watch 5
                </th>
                <td className="py-4 px-6">
                    Red
                </td>
                <td className="py-4 px-6">
                    Wearables
                </td>
                <td className="py-4 px-6">
                    $999
                </td>
                <td className="py-4 px-6">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>

    </>

    
  );
};

export default Tabla;
