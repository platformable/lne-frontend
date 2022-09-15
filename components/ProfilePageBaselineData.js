import React from "react";

const ProfilePageBaselineData = ({ impactBaseline }) => {
  const tableLeftHeaders = {
    // impactFormStartDate: "state.impactformstartdate",
    barrierHIVPrimaryCare: "Barriers to accessing HIV primary care",
    // viralLoadCount: "Viral Load Count",
    CD4Count: "CD4 Count",
    unsafeSexualBehavior: "Engaging in unsafe sexual behavior",
    substanceAbuse: "Problems with substance use",
    legalIssues: "Legal and identity documentation issues",
    unstableEmployment: "Unstable employment situation",
    unstableHousing: "An unstable housing situation",
  };
  return (
    <>
      <div className="overflow-x-auto mx-auto container  shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left  dark:text-gray-400">
          <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="text-center py-3 px-6">
                Key outcomes
              </th>
              <th scope="col" className="text-center py-3 px-6">
                Baseline scores
              </th>
              <th scope="col" className="text-center py-3 px-6">
                Date: 1 September
              </th>
              {impactBaseline &&
                impactBaseline.map((track, index) => (
                  <>
                    <th scope="col" classNameName="text-center py-3 px-6">
                      Date: {new Date(track.impactformstartdate).toLocaleDateString('en',{year:'numeric',month:'numeric',day:'numeric'})} 
                    </th>
                  </>
                ))}
            </tr>
          </thead>
          <tbody>
            {/* {tableLeftHeaders && Object.values(tableLeftHeaders).map((key, index) => ( */}
                {/* // <> */}
                 <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium  whitespace-nowrap dark:text-white"
                    >
                      Barriers to accessing HIV primary care
                    </th>
                    
                    {impactBaseline && impactBaseline.map(e => (
                        <>
                        <td className="text-center text-base ">0</td>
                        <td className="text-center text-base ">No data</td>
                        <td className="text-center text-base ">{e.barrieraccessingmedications}</td>
                        </>
                    ))}

                  </tr>
                  
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium  whitespace-nowrap dark:text-white"
                    >
                      Viral Load Count
                    </th>
                    
                    {impactBaseline && impactBaseline.map(e => (
                        <>
                        <td className="text-center text-base ">0</td>
                        <td className="text-center text-base ">No data</td>
                        <td className="text-center text-base ">{e.cd4viralload}</td>
                        </>
                    ))}

                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium  whitespace-nowrap dark:text-white"
                    >
                      Engaging in unsafe sexual behavior
                    </th>
                    
                    {impactBaseline && impactBaseline.map(e => (
                        <>
                        <td className="text-center text-base ">0</td>
                        <td className="text-center text-base ">No data</td>
                        <td className="text-center text-base ">{e.unsafesexualbehavior === "0" ? "false" : "true"}</td>
                        </>
                    ))}

                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium  whitespace-nowrap dark:text-white"
                    >
                      Problems with substance use
                    </th>
                    
                    {impactBaseline && impactBaseline.map(e => (
                        <>
                        <td className="text-center text-base ">0</td>
                        <td className="text-center text-base ">No data</td>
                        <td className="text-center text-base ">{e.substanceabuse === "0" ? "false" : "true"}</td>
                        </>
                    ))}

                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium  whitespace-nowrap dark:text-white"
                    >
                      An unstable housing situation
                    </th>
                    
                    {impactBaseline && impactBaseline.map(e => (
                        <>
                        <td className="text-center text-base ">0</td>
                        <td className="text-center text-base ">No data</td>
                        <td className="text-center text-base ">{e.unstablehousing === "0" ? "false" : "true"}</td>
                        </>
                    ))}

                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium  whitespace-nowrap dark:text-white"
                    >
                      Legal and identity documentation issues
                    </th>
                    
                    {impactBaseline && impactBaseline.map(e => (
                        <>
                        <td className="text-center text-base ">0</td>
                        <td className="text-center text-base ">No data</td>
                        <td className="text-center text-base ">{e.legalissues === "0" ? "false" : "true"}</td>
                        </>
                    ))}

                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium  whitespace-nowrap dark:text-white"
                    >
                      Unstable employment situation
                    </th>
                    
                    {impactBaseline && impactBaseline.map(e => (
                        <>
                        <td className="text-center text-base ">0</td>
                        <td className="text-center text-base ">No data</td>
                        <td className="text-center text-base ">{e.unstableemployment === "0" ? "false" : "true"}</td>
                        </>
                    ))}

                  </tr>
                {/* </>
            ))} */}
            {/* {impactBaseline &&
              impactBaseline.map((track, index) => (
                <>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium whitespace-nowrap dark:text-white"
                    >
                    </>
                    <td className="text-center text-base ">0</td>
                  </tr>
                </>
              ))} */}

            {/* <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium  whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
            </tr>
            <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Google Pixel Phone
                </th>
            </tr>
            <tr>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple Watch 5
                </th>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProfilePageBaselineData;
